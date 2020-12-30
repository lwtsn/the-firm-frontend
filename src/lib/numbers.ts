import { BigNumber } from 'ethers';

export const oneEther = BigNumber.from(10).pow(18);
export const MAX_INT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export function fromEtherToNumber(number: BigNumber): string {
    return number.div(oneEther).toString();
}

export function fromEtherToNumberWithPlaces(number: BigNumber, decimalPlaces: number): number {
    return number.div(BigNumber.from(10).pow(16)).toNumber() / 100;
}
