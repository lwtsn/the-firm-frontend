import React, { useEffect, useState } from 'react';
import { Wrapper } from '../styled';
import { getItemByAddress, getShopContract } from '@app/web3/contracts';
import { Button, Card, Classes, H4, H5 } from '@blueprintjs/core';
import { SingleItem } from '@app/model/shop/Item';
import { fromEtherToNumber } from '@app/lib/numbers';
import { useHistory } from 'react-router-dom';

const Item = (props) => {
    const { address } = props;
    const history = useHistory();

    const shopContract = getShopContract();
    const itemContract = getItemByAddress(address);

    const [shopItem, setShopItem] = useState<SingleItem>(undefined);
    const [itemName, setItemName] = useState<string>(undefined);

    useEffect(() => {
        async function getItem(): Promise<void> {
            await shopContract.itemStructs(address).then((item) => {
                setShopItem(item);
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

    if (undefined == shopItem) {
        return <div>Loading..</div>;
    }

    return (
        <Wrapper>
            <Card>
                <H4>Purchase {itemName}</H4>
                <H5>${fromEtherToNumber(shopItem.price)}</H5>
                <Button
                    icon={'eye-open'}
                    onClick={() => history.push(`/shop/item/${address}`)}
                    className={Classes.MINIMAL}
                >
                    View
                </Button>
            </Card>
        </Wrapper>
    );
};

export default Item;
