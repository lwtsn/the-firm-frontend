import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $userToken, fetchToken } from '@app/container/Dashboard/Treasury/Single/store';
import { Button, Classes, HTMLTable } from '@blueprintjs/core';
import { Wrapper } from '@app/container/Dashboard/Treasury/Single/styled';
import { getCurrentAddress } from '@app/web3/utils';
import { BigNumber } from 'ethers';
import { oneEther } from '@app/web3/constants';
import { getErc20Contract, getTreasuryContract } from '@app/web3/contracts';
import { DepositFunds } from '@app/container/Dashboard/Treasury/Single/component/DepositFunds';
import { WithdrawFunds } from '@app/container/Dashboard/Treasury/Single/component/WithdrawFunds';

const Single: React.FC = () => {
    const userToken = useStore($userToken);
    const history = useHistory();
    const { tokenAddress } = useParams<{ tokenAddress: string }>();
    const userAddress = getCurrentAddress();

    if (!tokenAddress) {
        history.replace('/dashboard/treasury');
    }

    const [treasuryBalance, setTreasuryBalance] = useState(BigNumber.from(0));
    const [walletBalance, setWalletBalance] = useState(BigNumber.from(0));
    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);

    const treasury = getTreasuryContract();
    const erc20 = getErc20Contract(tokenAddress);

    useEffect(() => {
        async function getBalance(): Promise<void> {
            await treasury.viewAvailableBalance(tokenAddress, userAddress).then((balance) => {
                setTreasuryBalance(balance);
            });
        }

        getBalance();
    }, [userAddress, tokenAddress, treasury]);

    useEffect(() => {
        async function getBalance(): Promise<void> {
            await erc20.balanceOf(userAddress).then((balance) => {
                setWalletBalance(balance);
            });
        }

        getBalance();
    }, [userAddress, erc20]);

    useEffect(() => {
        fetchToken({ tokenAddress: tokenAddress });
    }, [tokenAddress, userAddress]);

    const deposit = useCallback(() => {
        treasury.deposit(tokenAddress, 22);
    }, [tokenAddress, treasury]);

    if (null == userAddress) {
        return <div>Please connect wallet</div>;
    }

    if (userToken == null || tokenAddress == null) {
        return <div>Loading </div>;
    }

    return (
        <Wrapper>
            <div className={'row treasury-anchor'}>
                <div className={'col-xs-2'}>
                    <img src={userToken.image} height={100} />
                </div>
                <div className={'col-xs-10'}>
                    <div className={'row'}>
                        <div className={'col-xs-12'}>
                            <h2 className={Classes.HEADING}>{userToken.name}</h2>
                        </div>
                        <HTMLTable style={{ width: '100%' }} className={Classes.HTML_TABLE_STRIPED}>
                            <thead>
                                <tr>
                                    <th>Deposited balance</th>
                                    <th>Available balance</th>
                                    <th>&nbsp;</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{treasuryBalance.div(oneEther).toString()}</td>
                                    <td>{walletBalance.div(oneEther).toString()}</td>
                                    <td>
                                        <Button icon="small-plus" onClick={() => setShowDeposit(true)} />
                                    </td>
                                    <td>
                                        <Button icon="small-minus" onClick={() => setShowWithdraw(true)} />
                                    </td>
                                </tr>
                            </tbody>
                        </HTMLTable>
                    </div>
                </div>
            </div>
            <DepositFunds
                anchor={'treasury-anchor'}
                shouldShow={showDeposit}
                setShouldShow={setShowDeposit}
                tokenAddress={tokenAddress}
            />
            <WithdrawFunds
                anchor={'treasury-anchor'}
                shouldShow={showWithdraw}
                setShouldShow={setShowWithdraw}
                tokenAddress={tokenAddress}
            />
        </Wrapper>
    );
};

export default Single;
