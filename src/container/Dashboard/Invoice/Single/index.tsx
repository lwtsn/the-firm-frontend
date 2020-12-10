import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Button, Classes, FormGroup, HTMLTable, Intent, NonIdealState } from '@blueprintjs/core';
import { useHistory, useParams } from 'react-router-dom';
import { Wrapper } from './styled';
import { useStore } from 'effector-react';
import { $single, fetchSingle } from '@app/container/Dashboard/Invoice/Single/store';
import { FormDate, FormInputGroup, FormSelect } from '@app/component/Form';
import CountryISOCodes from '@app/data/CountryISOCodes';
import repository from '@app/repository';
import { AppToaster } from '@app/lib/toaster';
import { InvoiceItemResource } from '@app/repository/_resource/InvoiceItem';
import { FinaliseInvoice } from '@app/container/Dashboard/Invoice/Single/component/FinaliseInvoice';

const Single: React.FC = () => {
    const history = useHistory();
    const { invoice } = useParams<{ invoice: string }>();
    const [shouldFinaliseInvoiceShow, setShouldFinaliseInvoiceShow] = useState(false);

    const routeInvoiceId = parseInt(invoice);
    if (!routeInvoiceId) {
        history.replace('/dashboard/invoice');
    }

    const isLoading = useStore(fetchSingle.pending);
    useEffect(() => {
        fetchSingle({ id: routeInvoiceId });
    }, [routeInvoiceId]);

    const item = useStore($single);

    if (isLoading || !item) return null;

    const handleInvoiceUpdate = (values) => {
        let dueDate = null;
        if (values.due_date) {
            dueDate = new Date(values.due_date);
        }

        AppToaster.show({
            intent: Intent.PRIMARY,
            message: 'Saving invoice...',
        });
        return new Promise((resolve, reject) => {
            repository
                .invoice(routeInvoiceId)
                .update({
                    title: values.title,
                    triggerFinalizeAt: null,
                    dueDate: dueDate,
                    authorName: values.author_name,
                    authorAddressFirstLine: values.author_address_first_line,
                    authorAddressSecondLine: values.author_address_second_line,
                    authorCityState: values.author_city_state,
                    authorCountryIsoCode: values.author_country_iso_code,
                    authorPostalCode: values.author_postal_code,
                    authorRegistrationNumber: values.author_registration_number,
                    recipientName: values.recipient_name,
                    recipientPosition: values.recipient_position,
                    recipientWorkEmail: values.recipient_work_email,
                    recipientPersonalEmail: values.recipient_personal_email,
                    recipientPhoneNumber: values.recipient_phone_number,
                    recipientAddressFirstLine: values.recipient_address_first_line,
                    recipientAddressSecondLine: values.recipient_address_second_line,
                    recipientCityState: values.recipient_city_state,
                    recipientCountryIsoCode: values.recipient_country_iso_code,
                    recipientPostalCode: values.recipient_postal_code,
                    recipientBankName: values.recipient_bank_name,
                    recipientBankAccountNumber: values.recipient_bank_account_number,
                })
                .then(() => {
                    AppToaster.show({
                        intent: Intent.SUCCESS,
                        message: 'Invoice updated',
                    });
                    fetchSingle({ id: routeInvoiceId });
                    resolve();
                });
        });
    };

    const renderActionButtons = (saveFunction, isSubmitting: boolean) => {
        if (item.finalized_at) {
            return null;
        } else {
            return (
                <div>
                    <Button
                        onClick={() => setShouldFinaliseInvoiceShow(true)}
                        loading={isSubmitting}
                        className={'mr-1'}
                        icon={'lock'}
                        minimal
                        intent={Intent.PRIMARY}
                    >
                        Finalize invoice
                    </Button>
                    <Button onClick={saveFunction} loading={isSubmitting} icon={'tick'} intent={Intent.SUCCESS}>
                        Save changes
                    </Button>
                </div>
            );
        }
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

    const renderItemList = (items: InvoiceItemResource[]) => {
        if (items.length === 0) {
            return <NonIdealState title={'No Items'} />;
        }

        const sum = items.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price_per_unit;
        }, 0);

        const getCurrencyValue = (input: number, unitPrecision: number = 2): string => {
            return Math.ceil(input / Math.pow(10, unitPrecision)).toFixed(unitPrecision);
        };
        return (
            <>
                <HTMLTable
                    style={{ width: '100%', opacity: isLoading ? '0.5' : '1', transition: 'opacity 0.25s' }}
                    className={`${Classes.HTML_TABLE_STRIPED} mb-1`}
                >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price per unit</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((listItem) => (
                            <tr key={`item-${listItem.id}`}>
                                <td className={'fit-content'}>{listItem.id}</td>
                                <td>{listItem.name}</td>
                                <td>{listItem.quantity}</td>
                                <td>
                                    {getCurrencyValue(
                                        listItem.price_per_unit * listItem.quantity,
                                        item.currency.unit_precision,
                                    )}{' '}
                                    {item.currency.symbol}
                                </td>
                                <td>
                                    {getCurrencyValue(
                                        listItem.price_per_unit * listItem.quantity,
                                        item.currency.unit_precision,
                                    )}{' '}
                                    {item.currency.symbol}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </HTMLTable>
                <div>
                    <h4 className={Classes.HEADING}>
                        Total: {getCurrencyValue(sum, item.currency.unit_precision)}
                        {item.currency.symbol} ({item.currency.name})
                    </h4>
                </div>
            </>
        );
    };

    return (
        <Wrapper>
            <Form
                onSubmit={handleInvoiceUpdate}
                initialValues={item}
                render={({ handleSubmit, pristine, form, submitting, values }) => {
                    return (
                        <form onSubmit={handleSubmit} className={'invoice-form'}>
                            <div className={'row'}>
                                <div
                                    className={'col-xs-12 mb-1'}
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <h2 className={Classes.HEADING}>
                                        #{item.id}: {item.title}
                                    </h2>
                                    {renderActionButtons(handleSubmit, submitting)}
                                </div>
                            </div>

                            <div className={'row'}>
                                <div className={'col-xs-12 mb-1'}>
                                    <h3 className={Classes.HEADING}>Base information</h3>
                                    <div className={'row'}>
                                        <div className={'col-xs-9'}>
                                            <FormGroup label={'Title'} labelFor={'title'}>
                                                <Field name={'title'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-3'}>
                                            <FormGroup label={'Due date'} labelFor={'due_date'}>
                                                <Field
                                                    className={Classes.INPUT}
                                                    name={'due_date'}
                                                    type={'date'}
                                                    component={FormDate}
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={'row'}>
                                <div className="col-xs-6 mb-1">
                                    <h3 className={Classes.HEADING}>Recipient info</h3>
                                    <div className={'row'}>
                                        <div className={'col-xs-12'}>
                                            <FormGroup label={'Recipient name'} labelFor={'recipient_name'}>
                                                <Field name={'recipient_name'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup label={'Recipient position'} labelFor={'recipient_position'}>
                                                <Field name={'recipient_position'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup label={'Recipient work email'} labelFor={'recipient_work_email'}>
                                                <Field name={'recipient_work_email'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup
                                                label={'Recipient personal email'}
                                                labelFor={'recipient_personal_email'}
                                            >
                                                <Field name={'recipient_personal_email'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup
                                                label={'Recipient phone number'}
                                                labelFor={'recipient_phone_number'}
                                            >
                                                <Field name={'recipient_phone_number'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup
                                                label={'Recipient address (1st line)'}
                                                labelFor={'recipient_address_first_line'}
                                            >
                                                <Field
                                                    name={'recipient_address_first_line'}
                                                    component={FormInputGroup}
                                                />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup
                                                label={'Recipient address (2nd line)'}
                                                labelFor={'recipient_address_second_line'}
                                            >
                                                <Field
                                                    name={'recipient_address_second_line'}
                                                    component={FormInputGroup}
                                                />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup
                                                label={'Recipient city, state'}
                                                labelFor={'recipient_city_state'}
                                            >
                                                <Field name={'recipient_city_state'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup label="Recipient country" labelFor="recipient_country_iso_code">
                                                <Field name={'recipient_country_iso_code'} component={FormSelect}>
                                                    {renderCountrySelectOptions()}
                                                </Field>
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup
                                                label={'Recipient postal code'}
                                                labelFor={'recipient_postal_code'}
                                            >
                                                <Field name={'recipient_postal_code'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup label={'Recipient bank name'} labelFor={'recipient_bank_name'}>
                                                <Field name={'recipient_bank_name'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup
                                                label={'Recipient bank account number'}
                                                labelFor={'recipient_bank_account_number'}
                                            >
                                                <Field
                                                    name={'recipient_bank_account_number'}
                                                    component={FormInputGroup}
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>
                                </div>

                                <div className={'col-xs-6 mb-1'}>
                                    <h3 className={Classes.HEADING}>Author info</h3>
                                    <div className={'row'}>
                                        <div className={'col-xs-12'}>
                                            <FormGroup label={'Author name'} labelFor={'author_name'}>
                                                <Field name={'author_name'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup
                                                label={'Author address (1st line)'}
                                                labelFor={'author_address_first_line'}
                                            >
                                                <Field name={'author_address_first_line'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup
                                                label={'Author address (2nd line)'}
                                                labelFor={'author_address_second_line'}
                                            >
                                                <Field name={'author_address_second_line'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup label={'Author city, state'} labelFor={'author_city_state'}>
                                                <Field name={'author_city_state'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup label="Author country" labelFor="author_country_iso_code">
                                                <Field name={'author_country_iso_code'} component={FormSelect}>
                                                    {renderCountrySelectOptions()}
                                                </Field>
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup label={'Author postal code'} labelFor={'author_postal_code'}>
                                                <Field name={'author_postal_code'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>

                                        <div className={'col-xs-12'}>
                                            <FormGroup
                                                label={'Author registration number'}
                                                labelFor={'author_registration_number'}
                                            >
                                                <Field name={'author_registration_number'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    );
                }}
            />
            <div className={'row'}>
                <div className={'col-xs-12'} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 className={Classes.HEADING}>Items</h3>
                </div>
            </div>

            <div className={'row'}>
                <div className={'col-xs-12'}>{renderItemList(item.items)}</div>
            </div>

            <FinaliseInvoice
                invoice={item}
                anchor={'invoice-form'}
                shouldShow={shouldFinaliseInvoiceShow}
                setShouldShow={setShouldFinaliseInvoiceShow}
            />
        </Wrapper>
    );
};

export default Single;
