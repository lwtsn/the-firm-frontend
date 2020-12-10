import { useMemo } from 'react';
import { getContract } from '@app/web3/utils';
import { useActiveWeb3React } from '@app/web3/hooks/index';
import { Contract } from 'ethers';

// returns null on errors
export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
    const { library, account } = useActiveWeb3React();

    return useMemo(() => {
        if (!address || !ABI || !library) return null;
        try {
            return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
        } catch (error) {
            console.error('Failed to get contract', error);
            return null;
        }
    }, [address, ABI, library, withSignerIfPossible, account]);
}
