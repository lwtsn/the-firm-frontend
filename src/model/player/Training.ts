import { BigNumber } from 'ethers';

export enum StatMapping {
    NONE,
    STRENGTH,
    DEXTERITY,
    DEFENCE,
    CONSTITUTION,
}

export interface Training {
    duration: BigNumber;
    isTraining: boolean;
    startTime: BigNumber;
    stopTime: BigNumber;
    stat: StatMapping;
}
