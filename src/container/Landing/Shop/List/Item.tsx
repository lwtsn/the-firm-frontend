import React from 'react';
import { ItemWrapper } from './styled';
import { Button, Card, Classes, H4, H5 } from '@blueprintjs/core';
import { fromEtherToNumber } from '@app/lib/numbers';
import { useHistory } from 'react-router-dom';
import { useItem } from '@app/hooks/useItem';

const Item = (props): JSX.Element => {
    const { id } = props;
    const history = useHistory();

    const { shopItem, item } = useItem(id);

    if (undefined == shopItem || undefined == item) {
        return <div>Loading..</div>;
    }
    console.log(item);
    return (
        <ItemWrapper>
            <Card>
                <H4>{item.name}</H4>
                <H5>${fromEtherToNumber(shopItem.price)}</H5>
                <Button icon={'eye-open'} onClick={() => history.push(`/shop/item/${id}`)} className={Classes.MINIMAL}>
                    View
                </Button>
            </Card>
        </ItemWrapper>
    );
};

export default Item;
