import { BigNumber } from 'ethers';
import { Duration, Moment } from 'moment';

export interface StreamChainResource {
    recipient: string;
    deposit: BigNumber;
    tokenAddress: string;
    startTime: BigNumber;
    stopTime: BigNumber;
    remainingBalance: BigNumber;
    ratePerSecond: BigNumber;
    balanceAccrued: BigNumber;
}

export interface StreamResource {
    id: any;
    recipient: string;
    deposit: BigNumber;
    tokenAddress: string;
    start: Moment;
    end: Moment;
    remainingBalance: BigNumber;
    ratePerSecond: BigNumber;
    balanceAccrued: BigNumber;
    percentageComplete: any;
    timeRemaining: Duration;
}
