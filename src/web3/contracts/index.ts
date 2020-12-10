import { useContract } from '@app/web3/hooks/useContract';
import { Contract } from 'ethers';
import { PLAYER_ABI, PLAYER_ADDRESS } from '@app/web3/constants/contracts/Player';

export function getPlayerContract(): Contract | null {
    return useContract(PLAYER_ADDRESS, PLAYER_ABI.abi, true);
}
