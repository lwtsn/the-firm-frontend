import React, { useCallback, useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Button, Classes, Dialog, FormGroup, Tooltip } from '@blueprintjs/core';
import { FormInputGroup } from '@app/component/Form';
import { getFundManager, getTreasuryContract } from '@app/web3/contracts';
import { getCurrentAddress } from '@app/web3/utils';
import { BigNumber } from 'ethers';
import { oneEther } from '@app/web3/constants';

export const WithdrawFunds = (props) => {
    const userAddress = getCurrentAddress();
    const { anchor, shouldShow, setShouldShow, tokenAddress } = props;
    const fundManager = getFundManager();
    const treasury = getTreasuryContract();
    const [treasuryBalance, setTreasuryBalance] = useState(BigNumber.from(0));

    const withdraw = useCallback(
        (values) => {
            fundManager.withdrawTokensToAccount(tokenAddress, userAddress, BigNumber.from(values.amount).mul(oneEther));
        },
        [fundManager, userAddress, tokenAddress],
    );

    useEffect(() => {
        async function getBalance(): Promise<void> {
            await treasury.viewAvailableBalance(tokenAddress, userAddress).then((balance) => {
                setTreasuryBalance(balance.div(oneEther));
            });
        }

        getBalance();
    }, [userAddress, tokenAddress, treasury]);

    return (
        <Dialog isOpen={shouldShow} usePortal={true} portalClassName={anchor} autoFocus={true} canEscapeKeyClose={true}>
            <div className={'row'}>
                <div className={'col-xs-12'}>
                    <Form
                        onSubmit={withdraw}
                        render={({ handleSubmit, values }) => {
                            return (
                                <form className={'withdraw-funds-form'} onSubmit={handleSubmit}>
                                    <div className={`${Classes.DIALOG_BODY}`}>
                                        <div className={'col-xs-12'}>
                                            <h3>Available balance: {treasuryBalance.toString()}</h3>
                                        </div>
                                        <div className={'col-xs-12'}>
                                            <FormGroup label={'Withdraw Funds'} labelFor={'amount'}>
                                                <Tooltip content="Amount to withdraw">
                                                    <Field name={'amount'} component={FormInputGroup} />
                                                </Tooltip>
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className={`${Classes.DIALOG_FOOTER}`}>
                                        <Button onClick={handleSubmit}>Withdraw</Button>
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
