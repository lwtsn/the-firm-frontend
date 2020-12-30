import React, { useCallback, useEffect, useState } from 'react';
import { getItemByAddress, getShopContract } from '@app/web3/contracts';
import { Wrapper } from './styled';
import { Button, Classes } from '@blueprintjs/core';
import { useParams } from 'react-router-dom';
import { Item, ShopItem } from '@app/model/shop/Item';

import { fromEtherToNumber } from '@app/lib/numbers';
import { findItemByAddress } from '@app/model/implementation/item';

export const Single = () => {
    const { address } = useParams<{ address: string }>();

    const shopContract = getShopContract();
    const itemContract = getItemByAddress(address);

    const [item, setItem] = useState<ShopItem>(undefined);
    const [itemName, setItemName] = useState<string>(undefined);

    useEffect(() => {
        async function getItem(): Promise<void> {
            await shopContract.itemStructs(address).then((item) => {
                setItem(item);
            });
        }

        getItem();
    }, [shopContract, address]);

    useEffect(() => {
        async function getItem(): Promise<void> {
            await itemContract.name().then(setItemName);
        }

        getItem();
    }, [itemContract]);

    const purchase = useCallback(() => {
        shopContract.purchase(address, 1).then(console.log);
    }, [shopContract, address]);

    if (undefined == itemName || undefined == item) {
        return <div>Loading..</div>;
    }

    const itemDetails: Item = findItemByAddress(address);

    return (
        <Wrapper>
            <div className={'row mb-1'}>
                <div className={'col-xs-12'}>
                    <h2>{itemName}</h2>
                    <h3>${fromEtherToNumber(item.price)}</h3>
                </div>
                <div className={'col-xs-3'}>
                    <img src={itemDetails.image} width={300} />
                </div>
                <div className={'col-xs-9'}>
                    <p>{itemDetails.description}</p>
                    <Button icon={'eye-open'} text="Purchase" className={Classes.BUTTON} onClick={purchase} />
                </div>
            </div>
        </Wrapper>
    );
};
