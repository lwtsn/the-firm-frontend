import React, { useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import { Button, Classes, FormGroup, Intent } from '@blueprintjs/core';
import { useHistory, useParams } from 'react-router-dom';
import { Wrapper } from './styled';
import { useStore } from 'effector-react';
import { $single, fetchSingle } from './store';
import { FormDate, FormInputGroup, FormSelect } from '@app/component/Form';
import CountryISOCodes from '@app/data/CountryISOCodes';
import repository from '@app/repository';
import { AppToaster } from '@app/lib/toaster';
import { $currencyList } from '@app/container/Dashboard/store';

const Single: React.FC = () => {
    const history = useHistory();
    const currencies = useStore($currencyList);
    const { recipient } = useParams<{ recipient: string }>();
    const routeRecipientId = parseInt(recipient);
    if (!routeRecipientId) {
        history.replace('/dashboard/recipient');
    }

    const isLoading = useStore(fetchSingle.pending);
    useEffect(() => {
        fetchSingle({ id: routeRecipientId });
    }, []);
    const item = useStore($single);

    if (isLoading || !item) return null;

    const handleRecipientUpdate = (values) => {
        let startDate = null;
        if (values.start_date) {
            startDate = new Date(values.start_date);
        }

        if (values.monthly_payment_amount) {
            values.monthly_payment_amount = values.monthly_payment_amount * Math.pow(10, item.currency.unit_precision);
        }

        AppToaster.show({
            intent: Intent.PRIMARY,
            message: 'Saving recipient...',
        });
        return new Promise((resolve, reject) => {
            repository
                .recipient(routeRecipientId)
                .update({
                    name: values.name,
                    position: values.position,
                    startDate: startDate,
                    workEmail: values.work_email,
                    personalEmail: values.personal_email,
                    phoneNumber: values.phone_number,
                    addressFirstLine: values.address_first_line,
                    addressSecondLine: values.address_second_line,
                    cityState: values.city_state,
                    countryIsoCode: values.country_iso_code,
                    postalCode: values.postal_code,
                    bankName: values.bank_name,
                    bankAccountNumber: values.bank_account_number,
                    paymentPeriod: values.payment_period,
                    monthlyPaymentAmount: parseInt(values.monthly_payment_amount),
                })
                .then(() => {
                    AppToaster.show({
                        intent: Intent.SUCCESS,
                        message: 'Recipient data updated',
                    });
                    fetchSingle({ id: routeRecipientId });
                    resolve();
                });
        });
    };

    const renderActionButtons = (saveFunction, isSubmitting: boolean) => {
        return (
            <div>
                <Button onClick={saveFunction} icon={'tick'} intent={Intent.SUCCESS}>
                    Save changes
                </Button>
            </div>
        );
    };

    const renderCountrySelectOptions = () => {
        const output = [
            <option key="country-iso-unknown" value={''}>
                Select a country
            </option>,
        ];
        for (const isoCode in CountryISOCodes) {
            if (!CountryISOCodes.hasOwnProperty(isoCode)) continue;
            output.push(
                <option key={`country-iso-${isoCode}`} value={isoCode.toLocaleLowerCase()}>
                    {CountryISOCodes[isoCode]}
                </option>,
            );
        }
        return output;
    };

    const renderPaymentPeriodOptions = () => {
        return [
            <option value="1" key={'pp-month'}>
                Monthly (end of the month)
            </option>,
            <option value="2" key={'pp-bimonth'}>
                Bi-Monthly (every half a month)
            </option>,
        ];
    };

    return (
        <Wrapper>
            <Form
                onSubmit={handleRecipientUpdate}
                initialValues={item}
                render={({ handleSubmit, pristine, form, submitting, values }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className={'row'}>
                                <div
                                    className={'col-xs-12 mb-1'}
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <h2 className={Classes.HEADING}>
                                        #{item.id}: {item.name}
                                    </h2>
                                    {renderActionButtons(handleSubmit, submitting)}
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-xs-12 mb-1'}>
                                    <h3 className={Classes.HEADING}>Main information</h3>
                                    <div className={'row'}>
                                        <div className={'col-xs-4'}>
                                            <FormGroup label={'Name'} labelFor={'name'}>
                                                <Field name={'name'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-4'}>
                                            <FormGroup label={'Position'} labelFor={'position'}>
                                                <Field name={'position'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-4'}>
                                            <FormGroup label={'Working since'} labelFor={'start_date'}>
                                                <Field
                                                    className={Classes.INPUT}
                                                    name={'start_date'}
                                                    type={'date'}
                                                    component={FormDate}
                                                />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-4'}>
                                            <FormGroup label={'Work email'} labelFor={'work_email'}>
                                                <Field name={'work_email'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-4'}>
                                            <FormGroup label={'Personal email'} labelFor={'personal_email'}>
                                                <Field name={'personal_email'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-4'}>
                                            <FormGroup label={'Phone number'} labelFor={'phone_number'}>
                                                <Field name={'phone_number'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={'row'}>
                                <div className={'col-xs-12 mb-1'}>
                                    <h3 className={Classes.HEADING}>Address information</h3>
                                    <div className={'row'}>
                                        <div className={'col-xs-12'}>
                                            <FormGroup label={'Address (1st line)'} labelFor={'address_first_line'}>
                                                <Field name={'address_first_line'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup label={'Address (2nd line)'} labelFor={'address_second_line'}>
                                                <Field name={'address_second_line'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-4'}>
                                            <FormGroup label={'City, State'} labelFor={'city_state'}>
                                                <Field name={'city_state'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-4'}>
                                            <FormGroup label="Country" labelFor="country_iso_code">
                                                <Field name={'country_iso_code'} component={FormSelect}>
                                                    {renderCountrySelectOptions()}
                                                </Field>
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-4'}>
                                            <FormGroup label={'Postal code'} labelFor={'postal_code'}>
                                                <Field name={'postal_code'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={'row'}>
                                <div className={'col-xs-12 mb-1'}>
                                    <h3 className={Classes.HEADING}>Payment information</h3>
                                    <div className={'row'}>
                                        <div className={'col-xs-12'}>
                                            <FormGroup label={'Bank name'} labelFor={'bank_name'}>
                                                <Field name={'bank_name'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup label={'Bank account number'} labelFor={'bank_account_number'}>
                                                <Field name={'bank_account_number'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-6'}>
                                            <FormGroup
                                                label={'Monthly payment amount'}
                                                labelFor={'monthly_payment_amount'}
                                            >
                                                <Field name={'monthly_payment_amount'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-6'}>
                                            <FormGroup label="Payment period" labelFor="payment_period">
                                                <Field name={'payment_period'} component={FormSelect}>
                                                    {renderPaymentPeriodOptions()}
                                                </Field>
                                            </FormGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    );
                }}
            />
        </Wrapper>
    );
};

export default Single;
