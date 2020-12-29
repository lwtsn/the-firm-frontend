import React, { useEffect, useState } from 'react';
import { Wrapper } from '../styled';
import Item from '@app/container/Landing/Shop/List/Item';
import { getShopContract } from '@app/web3/contracts';

const List: React.FC = () => {
    const shopContract = getShopContract();

    const [items, setItems] = useState(undefined);

    useEffect(() => {
        async function getItems(): Promise<void> {
            await shopContract.getItems().then(setItems);
        }

        getItems();
    }, [shopContract, setItems]);

    if (undefined == items) {
        return <div>Loading..</div>;
    }

    const renderItem = (itemAddress): JSX.Element => {
        return <Item key={itemAddress} address={itemAddress} />;
    };

    return <Wrapper>{items[0].map((itemAddress) => renderItem(itemAddress))}</Wrapper>;
};

export default List;
