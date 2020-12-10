import { useContract } from '@app/web3/hooks/useContract';
import { Contract } from 'ethers';
import { TREASURY_ABI, TREASURY_ADDRESS } from '@app/web3/constants/contracts/Treasury';
import { STREAM_MANAGER_ABI, STREAM_MANAGER_ADDRESS } from '@app/web3/constants/contracts/StreamManager';
import { ERC20_ABI } from '@app/web3/constants/contracts/Erc20';
import { STREAM_ABI, STREAM_ADDRESS } from '@app/web3/constants/contracts/Stream';
import { FUND_MANAGER_ABI, FUND_MANAGER_ADDRESS } from '@app/web3/constants/contracts/FundManager';

export function getTreasuryContract(): Contract | null {
    return useContract(TREASURY_ADDRESS, TREASURY_ABI.abi, true);
}

export function getErc20Contract(contractAddress: string): Contract | null {
    return useContract(contractAddress, ERC20_ABI, true);
}

export function getStreamManagerContract(): Contract | null {
    return useContract(STREAM_MANAGER_ADDRESS, STREAM_MANAGER_ABI.abi, true);
}

export function getStreamContract(): Contract | null {
    return useContract(STREAM_ADDRESS, STREAM_ABI.abi, true);
}

export function getFundManager(): Contract | null {
    return useContract(FUND_MANAGER_ADDRESS, FUND_MANAGER_ABI.abi, true);
}
