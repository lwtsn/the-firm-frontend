import { useContract } from '@app/web3/hooks/useContract';
import { Contract } from 'ethers';
import { PLAYER_ABI, PLAYER_ADDRESS } from '@app/web3/constants/contracts/Player';
import { SCHEMES_ABI, SCHEMES_ADDRESS } from '@app/web3/constants/contracts/Schemes';

export function getPlayerContract(): Contract | null {
    return useContract(PLAYER_ADDRESS, PLAYER_ABI.abi, true);
}

export function getSchemesContract(): Contract | null {
    return useContract(SCHEMES_ADDRESS, SCHEMES_ABI.abi, true);
}
