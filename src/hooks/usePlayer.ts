import { useMemo, useState } from 'react';
import { getPlayerContract } from '@app/web3/contracts';
import { getCurrentAddress } from '@app/web3/utils';

export const usePlayer = (): boolean => {
    const playerContract = getPlayerContract();
    const userAddress = getCurrentAddress();

    const [isPlayer, setIsPlayer] = useState(null);

    useMemo(() => {
        async function isPlayer(): Promise<void> {
            playerContract.isPlayer(userAddress).then(console.log);
            await playerContract.isPlayer(userAddress).then(setIsPlayer);
        }

        if (userAddress !== '' && playerContract?.signer?._isSigner) {
            isPlayer();
        }
    }, [userAddress, playerContract]);

    return isPlayer;
};
