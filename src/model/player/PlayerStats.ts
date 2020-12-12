import { BigNumber } from 'ethers';

export interface PlayerStats {
    isPlayer: boolean;
    baseHealth: BigNumber;
    currentHealth: BigNumber;
    experience: BigNumber;
    level: BigNumber;
}
