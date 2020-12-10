import React, { useCallback, useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Button, Classes, Dialog, FormGroup } from '@blueprintjs/core';
import { FormInputGroup } from '@app/component/Form';
import { getErc20Contract, getTreasuryContract } from '@app/web3/contracts';
import { getCurrentAddress } from '@app/web3/utils';
import { TREASURY_ADDRESS } from '@app/web3/constants/contracts/Treasury';
import { BigNumber } from 'ethers';
import { oneEther } from '@app/web3/constants';

export const DepositFunds = (props) => {
    const userAddress = getCurrentAddress();
    const { anchor, shouldShow, setShouldShow, tokenAddress } = props;
    const erc20 = getErc20Contract(tokenAddress);
    const treasury = getTreasuryContract();

    const [allowance, setAllowance] = useState(BigNumber.from(0));

    useEffect(() => {
        async function getApprovedAllowance(): Promise<void> {
            const allowance = await erc20.allowance(userAddress, TREASURY_ADDRESS);
            setAllowance(allowance);
        }

        getApprovedAllowance();
    }, [erc20, userAddress, setAllowance]);

    const approve = useCallback(
        (values) => {
            erc20.approve(TREASURY_ADDRESS, BigNumber.from(values.amount).mul(oneEther));
        },
        [erc20],
    );

    const deposit = useCallback(
        (values) => {
            treasury.deposit(tokenAddress, BigNumber.from(values.amount).mul(oneEther));
        },
        [treasury, tokenAddress],
    );

    return (
        <Dialog isOpen={shouldShow} usePortal={true} portalClassName={anchor} autoFocus={true} canEscapeKeyClose={true}>
            <div className={'row'}>
                <div className={'col-xs-12'}>
                    <Form
                        onSubmit={approve}
                        render={({ handleSubmit, values }) => {
                            return (
                                <form className={'allowance-form'} onSubmit={handleSubmit}>
                                    <div className={`${Classes.DIALOG_BODY}`}>
                                        <div className={'col-xs-12'}>
                                            <h3>Approved allowance: {allowance.toString()}</h3>
                                        </div>
                                        <div className={'col-xs-12'}>
                                            <FormGroup label={'Increase Allowance'} labelFor={'amount'}>
                                                <Field name={'amount'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className={`${Classes.DIALOG_FOOTER}`}>
                                        <Button onClick={handleSubmit}>Increase Allowance</Button>
                                    </div>
                                </form>
                            );
                        }}
                    />
                </div>
                <div className={'col-xs-12'}>
                    <Form
                        onSubmit={deposit}
                        render={({ handleSubmit, values }) => {
                            return (
                                <form className={'deposit-form'} onSubmit={handleSubmit}>
                                    <div className={`${Classes.DIALOG_BODY}`}>
                                        <div className={'col-xs-12'}>
                                            <FormGroup label={'Deposit to Treasury'} labelFor={'amount'}>
                                                <Field name={'amount'} component={FormInputGroup} />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className={`${Classes.DIALOG_FOOTER}`}>
                                        <Button onClick={handleSubmit}>Deposit</Button>

                                        <Button onClick={() => setShouldShow(false)} className={'bp3-intent-warning'}>
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
    );
};
