import { BigNumber } from 'ethers';

export interface OngoingScheme {
    _isOngoing: boolean;
    _schemeId: BigNumber;
    _schemeAddress: string;
    _timeStarted: BigNumber;
    _timeCompleting: BigNumber;
}
