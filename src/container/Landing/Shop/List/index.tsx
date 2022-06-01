import React, { useEffect, useState } from 'react';
import { Wrapper } from './styled';
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

    const renderItem = (id): JSX.Element => {
        return (
            <div key={id} className={'col-xs-4'}>
                <Item id={id} />
            </div>
        );
    };

    return (
        <Wrapper>
            <div className={'row mb-1'}>{items[0].map((id) => renderItem(id))}</div>
        </Wrapper>
    );
};

export default List;
