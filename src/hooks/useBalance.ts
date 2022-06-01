import { useCallback, useMemo, useState } from 'react';
import { getCashContract } from '@app/web3/contracts';
import { BigNumber } from 'ethers';
import { getCurrentAddress } from '@app/web3/utils';
import { INFINITE_APPROVE } from '@app/web3/constants';

export const useBalance = (): { balance: BigNumber } => {
    const cashContract = getCashContract();

    const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
    const userAddress = getCurrentAddress();

    useMemo(() => {
        async function getBalance(): Promise<void> {
            await cashContract.balanceOf(userAddress).then(setBalance);
        }

        if (undefined != cashContract) {
            getBalance();
        }
    }, [cashContract, userAddress]);

    return {
        balance: balance,
    };
};

export const useAllowance = (who: string): { allowance: BigNumber; approve: Function } => {
    const cashContract = getCashContract();

    const [allowance, setAllowance] = useState<BigNumber>(BigNumber.from(0));
    const userAddress = getCurrentAddress();

    useMemo(() => {
        async function getAllowance(): Promise<void> {
            await cashContract.allowance(userAddress, who).then(setAllowance);
        }

        if (undefined != cashContract) {
            getAllowance();
        }
    }, [cashContract, userAddress, who]);

    const approve = useCallback(async () => {
        await cashContract.approve(who, INFINITE_APPROVE);
    }, [cashContract, who]);

    return {
        allowance: allowance,
        approve: approve,
    };
};
