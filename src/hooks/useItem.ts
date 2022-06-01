import { useCallback, useMemo, useState } from 'react';
import { getItemContract, getShopContract } from '@app/web3/contracts';
import { Item, ShopItem } from '@app/model/shop/Item';

export const useItem = (id: string): { shopItem: ShopItem; item: Item; purchase: Function } => {
    const shopContract = getShopContract();
    const itemContract = getItemContract();

    const [shopItem, setShopItem] = useState<ShopItem>(undefined);
    const [item, setItem] = useState<Item>(undefined);

    useMemo(() => {
        async function getItem(): Promise<void> {
            await shopContract.itemStructs(id).then(setShopItem);
            console.log(itemContract);
            await itemContract.viewItem(id).then(setItem);
        }

        if (undefined != id && undefined != shopContract && undefined != itemContract) {
            getItem();
        }
    }, [shopContract, itemContract, id]);

    const purchase = useCallback(async () => {
        await shopContract.purchase(id, 1).then(console.log);
    }, [shopContract, id]);

    return {
        shopItem: shopItem,
        item: item,
        purchase: purchase,
    };
};
