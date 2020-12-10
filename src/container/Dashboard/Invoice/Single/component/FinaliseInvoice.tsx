import React, { useCallback, useState } from 'react';

import { DAI_ADDRESS, oneEther } from '@app/web3/constants';

import { Field, Form } from 'react-final-form';
import { Button, Classes, Dialog, FormGroup } from '@blueprintjs/core';
import { FormInputGroup } from '@app/component/Form';
import { InvoiceItemResource } from '@app/repository/_resource/InvoiceItem';
import { getStreamManagerContract } from '@app/web3/contracts';
import { DateRange, DateRangePicker } from '@blueprintjs/datetime';
import { Wrapper } from '@app/container/Dashboard/Invoice/Single/component/styled';
import { MomentDateRange } from '@app/component/Form/MomentDate';
import { BigNumber } from 'ethers';

const dialogStyles = {
    width: 730,
} as React.CSSProperties;

const today: Date = new Date();

export const FinaliseInvoice = (props) => {
    const { invoice, anchor, shouldShow, setShouldShow } = props;
    const streamManager = getStreamManagerContract();
    const [dateRange, setDateRange] = useState({} as DateRange);

    const getTotalInvoiceValue = (items: InvoiceItemResource[]): number => {
        return items.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price_per_unit;
        }, 0);
    };

    const payInvoice = useCallback(
        (values) => {
            const amount = BigNumber.from(values.recipient_invoice_amount).mul(oneEther);

            const [startDate, endDate] = dateRange;

            const startTime = startDate.getTime() / 1000;
            const endTime = endDate.getTime() / 1000;

            streamManager.startStream(DAI_ADDRESS, values.recipient_ethereum_address, amount, startTime, endTime);
        },
        [streamManager, dateRange],
    );

    return (
        <Wrapper>
            <Dialog
                isOpen={shouldShow}
                usePortal={true}
                portalClassName={anchor}
                autoFocus={true}
                canEscapeKeyClose={true}
                style={dialogStyles}
            >
                <div className={'row'}>
                    <div className={'col-xs-12'}>
                        <Form
                            onSubmit={payInvoice}
                            render={({ handleSubmit, values }) => {
                                return (
                                    <form className={'invoice-form'} onSubmit={handleSubmit}>
                                        <div className={`${Classes.DIALOG_BODY}`}>
                                            <div className={'col-xs-12'}>
                                                <FormGroup
                                                    label={'Invoice amount'}
                                                    labelFor={'recipient_invoice_amount'}
                                                >
                                                    <Field
                                                        name={'recipient_invoice_amount'}
                                                        component={FormInputGroup}
                                                        defaultValue={getTotalInvoiceValue(invoice.items)}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className={'col-xs-12'}>
                                                <FormGroup
                                                    label={'Recipient address'}
                                                    labelFor={'recipient_ethereum_address'}
                                                >
                                                    <Field
                                                        defaultValue={'0xb041dfF14Ba9607d3f0B6fC61C79584d3BBE63C9'}
                                                        name={'recipient_ethereum_address'}
                                                        component={FormInputGroup}
                                                    />
                                                </FormGroup>
                                            </div>

                                            <div className={'col-xs-12'}>
                                                <DateRangePicker
                                                    {...props}
                                                    className={Classes.ELEVATION_1}
                                                    includeTime={true}
                                                    contiguousCalendarMonths={false}
                                                    highlightCurrentDay={true}
                                                    minDate={today}
                                                    onChange={(dates) => setDateRange(dates)}
                                                    timePickerProps={{ showArrowButtons: true }}
                                                />
                                                <MomentDateRange range={dateRange} />
                                            </div>
                                        </div>

                                        <div className={`${Classes.DIALOG_FOOTER}`}>
                                            <Button onClick={() => handleSubmit(invoice)}>Start Stream</Button>

                                            <Button
                                                onClick={() => setShouldShow(false)}
                                                className={'bp3-intent-warning'}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                );
                            }}
                        />
                    </div>
                </div>
            </Dialog>
        </Wrapper>
    );
};
