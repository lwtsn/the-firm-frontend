import React, { useCallback, useState } from 'react';
import { oneEther } from '@app/web3/constants';
import { Field, Form } from 'react-final-form';
import { Button, Classes, Dialog, FormGroup } from '@blueprintjs/core';
import { FormInputGroup } from '@app/component/Form';
import { getStreamManagerContract } from '@app/web3/contracts';
import { Wrapper } from '@app/container/Dashboard/Invoice/Single/component/styled';
import { BigNumber } from 'ethers';
import { getCurrentAddress } from '@app/web3/utils';

const dialogStyles = {
    width: 730,
} as React.CSSProperties;

export const Withdraw = (props) => {
    const { stream, anchor, shouldShow, setShouldShow } = props;
    const streamManager = getStreamManagerContract();
    const address = getCurrentAddress();

    const withdrawFromStream = useCallback(
        (values) => {
            const amount = BigNumber.from(values.withdrawal_amount).mul(oneEther);
            streamManager.withdrawFromStream(stream.id, amount, address);
        },
        [streamManager, stream, address],
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
                            onSubmit={withdrawFromStream}
                            render={({ handleSubmit, values }) => {
                                return (
                                    <form className={'stream-withdraw-form'} onSubmit={handleSubmit}>
                                        <div className={`${Classes.DIALOG_BODY}`}>
                                            <div className={'col-xs-12'}>
                                                <FormGroup label={'Amount to withdraw'} labelFor={'withdrawal_amount'}>
                                                    <Field name={'withdrawal_amount'} component={FormInputGroup} />
                                                </FormGroup>
                                            </div>
                                        </div>

                                        <div className={`${Classes.DIALOG_FOOTER}`}>
                                            <Button onClick={handleSubmit}>Withdraw</Button>

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
