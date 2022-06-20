import React from 'react';
import { Wrapper } from './styled';
import { Button, Classes } from '@blueprintjs/core';
import { useHistory, useParams } from 'react-router-dom';

import { fromEtherToNumber } from '@app/lib/numbers';
import { useItem } from '@app/hooks/useItem';
import { useAllowance } from '@app/hooks/useBalance';
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
                    <h1>{item.name}</h1>
                    <h2>${fromEtherToNumber(shopItem.price)}</h2>
                </div>
                <div className={'col-xs-6'}>
                    <div className={'col-xs-12'}>{<img src={'/shared/product.jpeg'} width={300} />}</div>
                    <div className={'col-xs-12'}>{getCallToAction()}</div>
                </div>
                <div className={'col-xs-6'}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae lorem sed justo porta
                        dapibus quis vitae magna. Aenean auctor, mi commodo egestas maximus, ligula turpis posuere
                        justo, a malesuada quam libero id ante. Duis pulvinar condimentum libero, vitae dignissim sem
                        iaculis vel. Vestibulum ac faucibus nulla, ac molestie enim. Integer ornare posuere posuere.
                        Duis congue mauris ante, sed aliquam urna auctor quis. Fusce volutpat, nisl nec auctor
                        condimentum, velit est finibus arcu, quis feugiat nulla eros eu tortor. Nam finibus nibh justo,
                        non ultrices nisl volutpat vel. Ut a sollicitudin arcu, non lobortis sapien. Pellentesque sed
                        lectus sed nisi accumsan condimentum. Fusce hendrerit metus at cursus laoreet. Donec sed mollis
                        tellus. Curabitur ultrices ligula cursus dolor lobortis iaculis. Nunc dignissim consequat
                        sollicitudin.
                    </p>
                </div>
                {/*<div className={'col-xs-3'}>{<img src={`/images/item/${id}`} width={300} />}</div>*/}
            </div>
        </Wrapper>
    );
};
