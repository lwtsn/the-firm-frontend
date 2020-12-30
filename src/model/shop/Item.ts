import { BigNumber } from 'ethers';

export interface ShopItem {
    price: BigNumber;
    listPointer: BigNumber;
}

export interface Item {
    image: string;
    description: string;
}
