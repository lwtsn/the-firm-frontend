import { useContract } from '@app/web3/hooks/useContract';
import { Contract } from 'ethers';
import {
    PLAYER_ABI,
    PLAYER_ADDRESS,
    PLAYER_STATS_ABI,
    PLAYER_STATS_ADDRESS,
    TREASURY_ABI,
    TREASURY_ADDRESS,
} from '@app/web3/constants/contracts/Player';

import {
    BASE_SCHEME_ABI,
    SCHEME_MANAGER_ABI,
    SCHEME_MANAGER_ADDRESS,
    SCROUNGE_FOR_SATOCHIS_ABI,
    SCROUNGE_FOR_SATOCHIS_ADDRESS,
    YIELD_FARM_ABI,
    YIELD_FARM_ADDRESS,
} from '@app/web3/constants/contracts/Schemes';
import { CASH_ABI, CASH_ADDRESS } from '@app/web3/constants/contracts/Cash';
import { TRAINING_ABI, TRAINING_ADDRESS } from '@app/web3/constants/contracts/Training';
import { BASE_WEAPON_ABI, SHOP_ABI, SHOP_ADDRESS } from '@app/web3/constants/contracts/Shop';

export function getCashContract(): Contract | null {
    return useContract(CASH_ADDRESS, CASH_ABI, true);
}

export function getPlayerContract(): Contract | null {
    return useContract(PLAYER_ADDRESS, PLAYER_ABI, true);
}

export function getPlayerStatsContract(): Contract | null {
    return useContract(PLAYER_STATS_ADDRESS, PLAYER_STATS_ABI, true);
}

export function getSchemesContract(): Contract | null {
    return useContract(SCHEME_MANAGER_ADDRESS, SCHEME_MANAGER_ABI, true);
}

export function getSchemeContractByAddress(address: string): Contract | null {
    return useContract(address, BASE_SCHEME_ABI, true);
}

export function getScroungeForSatochisContract(): Contract | null {
    return useContract(SCROUNGE_FOR_SATOCHIS_ADDRESS, SCROUNGE_FOR_SATOCHIS_ABI, true);
}

export function getYieldFarmContract(): Contract | null {
    return useContract(YIELD_FARM_ADDRESS, YIELD_FARM_ABI, true);
}

export function getTreasuryContract(): Contract | null {
    return useContract(TREASURY_ADDRESS, TREASURY_ABI, true);
}

export function getTrainingContract(): Contract | null {
    return useContract(TRAINING_ADDRESS, TRAINING_ABI, true);
}

export function getShopContract(): Contract | null {
    return useContract(SHOP_ADDRESS, SHOP_ABI, true);
}

export function getItemByAddress(address: string): Contract | null {
    return useContract(address, BASE_WEAPON_ABI, true);
}
