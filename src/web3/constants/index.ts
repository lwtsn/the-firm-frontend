import { BigNumber } from 'ethers';

export enum ChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GÖRLI = 5,
    KOVAN = 42,
}

export const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

export const oneEther = BigNumber.from(1).mul(BigNumber.from(10).pow(18));

export const NetworkContextName = 'NETWORK';
