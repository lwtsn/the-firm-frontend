import React, { useEffect } from 'react';
import { $single, fetchProfile } from './store';
import { useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';
import { AppToaster } from '@app/lib/toaster';
import { Button, Classes, FormGroup, Intent } from '@blueprintjs/core';
import repository from '@app/repository';
import CountryISOCodes from '@app/data/CountryISOCodes';
import { Wrapper } from './styled';
import { Field, Form } from 'react-final-form';
import { FormInputGroup, FormSelect } from '@app/component/Form';

const AuthorProfile: React.FC = () => {
    const history = useHistory();
    const isLoading = useStore(fetchProfile.pending);

    useEffect(() => {
        fetchProfile();
    }, []);
    const item = useStore($single);

    if (isLoading || !item) return null;

    const handleProfileUpdate = (values) => {
        AppToaster.show({
            intent: Intent.PRIMARY,
            message: 'Saving profile info',
        });
        return new Promise((resolve, reject) => {
            repository
                .me()
                .authorProfile()
                .update({
                    name: values.name,
                    addressFirstLine: values.address_first_line,
                    addressSecondLine: values.address_second_line,
                    countryIsoCode: values.country_iso_code,
                    cityState: values.city_state,
                    postalCode: values.postal_code,
                })
                .then(() => {
                    AppToaster.show({ intent: Intent.SUCCESS, message: 'Saved' });
                    resolve();
                })
                .catch(reject);
        });
    };

    const renderActionButtons = (saveFunction, isSubmitting: boolean) => {
        return (
            <div>
                <Button loading={isSubmitting} icon={'tick'} intent={Intent.SUCCESS} onClick={saveFunction}>
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

    return (
        <Wrapper>
            <Form
                onSubmit={handleProfileUpdate}
                initialValues={item}
                render={({ handleSubmit, pristine, form, submitting, values }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div
                                    className="col-xs-12 mb-1"
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <h2 className={Classes.HEADING}>Author profile</h2>
                                    {renderActionButtons(handleSubmit, submitting)}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xs-12 mb-1">
                                    <FormGroup label={'Organization Name'} labelFor={'name'}>
                                        <Field name={'name'} component={FormInputGroup} />
                                    </FormGroup>
                                </div>

                                <div className="col-xs-12 mb-1">
                                    <FormGroup label={'Address first line'} labelFor={'address_first_line'}>
                                        <Field name={'address_first_line'} component={FormInputGroup} />
                                    </FormGroup>
                                </div>

                                <div className="col-xs-12 mb-1">
                                    <FormGroup label={'Address second line'} labelFor={'address_second_line'}>
                                        <Field name={'address_second_line'} component={FormInputGroup} />
                                    </FormGroup>
                                </div>

                                <div className="col-xs-12 mb-1">
                                    <FormGroup label={'City, state'} labelFor={'city_state'}>
                                        <Field name={'city_state'} component={FormInputGroup} />
                                    </FormGroup>
                                </div>

                                <div className="col-xs-12 mb-1">
                                    <FormGroup label="Recipient country" labelFor="country_iso_code">
                                        <Field name={'country_iso_code'} component={FormSelect}>
                                            {renderCountrySelectOptions()}
                                        </Field>
                                    </FormGroup>
                                </div>

                                <div className="col-xs-12 mb-1">
                                    <FormGroup label={'Postal code'} labelFor={'postal_code'}>
                                        <Field name={'postal_code'} component={FormInputGroup} />
                                    </FormGroup>
                                </div>
                            </div>
                        </form>
                    );
                }}
            />
        </Wrapper>
    );
};

export default AuthorProfile;
