import React from 'react';
import { Wrapper } from './styled';
import { Route, Switch } from 'react-router-dom';
import { Single } from '@app/container/Landing/Shop/Single';
import List from '@app/container/Landing/Shop/List';

const ShopFront: React.FC = () => {
    return (
        <Wrapper>
            <Switch>
                <Route exact path={'/shop'} component={List} />
                <Route exact path={'/shop/item/:id'} component={Single} />
            </Switch>
        </Wrapper>
    );
};

export default ShopFront;
