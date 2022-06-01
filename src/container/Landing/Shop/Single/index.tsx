import React from 'react';
import { Wrapper } from './styled';
import { Button, Classes } from '@blueprintjs/core';
import { useHistory, useParams } from 'react-router-dom';

import { fromEtherToNumber } from '@app/lib/numbers';
import { useItem } from '@app/hooks/useItem';
import { useAllowance } from '@app/hooks/useBalance';
import { SHOP_ADDRESS } from '@app/web3/constants/contracts/Shop';
import { BigNumber } from 'ethers';
import { TREASURY_ADDRESS } from '@app/web3/constants/contracts/Player';

export const Single = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const { allowance, approve } = useAllowance(TREASURY_ADDRESS);
    const { item, shopItem, purchase } = useItem(id);

    if (undefined == id) {
        history.push('/');
    }

    if (undefined == shopItem || undefined == item) {
        return <div>Loading..</div>;
    }

    function getCallToAction(): JSX.Element {
        if (allowance.gt(BigNumber.from(0))) {
            return <Button icon={'eye-open'} text="Purchase" className={Classes.BUTTON} onClick={() => purchase()} />;
        } else {
            return <Button icon={'eye-open'} text="Allow" className={Classes.BUTTON} onClick={() => approve()} />;
        }
    }

    return (
        <Wrapper>
            <div className={'row mb-1'}>
                <div className={'col-xs-12'}>
                    <h2>{item.name}</h2>
                    <h3>${fromEtherToNumber(shopItem.price)}</h3>
                </div>
                <div className={'col-xs-3'}>{/*<img src={itemDetails.image} width={300} />*/}</div>
                <div className={'col-xs-9'}>
                    {/*<p>{itemDetails.description}</p>*/}
                    {getCallToAction()}
                </div>
            </div>
        </Wrapper>
    );
};
