import React, { useCallback, useEffect, useState } from 'react';
import { Wrapper } from './styled';
import { Route, Switch } from 'react-router-dom';
import { Button, Classes } from '@blueprintjs/core';
import Navigation from '@app/container/Landing/Navigation';
import Profile from './Profile';
import { getCurrentAddress } from '@app/web3/utils';
import { getPlayerContract } from '@app/web3/contracts';
import Home from '@app/container/Landing/Home';
import Schemes from '@app/container/Landing/Schemes';
import Training from '@app/container/Landing/Training';
import ShopFront from '@app/container/Landing/Shop';
import Jobs from '@app/container/Landing/Jobs';

const Landing: React.FC = () => {
    const userAddress = getCurrentAddress();
    const playerContract = getPlayerContract();

    const [isPlayer, setIsPlayer] = useState(null);

    useEffect(() => {
        async function isPlayer(): Promise<void> {
            await playerContract.isPlayer(userAddress).then(setIsPlayer);
        }

        isPlayer();
    }, [userAddress, playerContract, setIsPlayer]);

    if (isPlayer == false) {
        playerContract.once('PlayerCreated', () => {
            window.location.reload();
        });
    }

    const createAccount = useCallback(async () => {
        await playerContract.create();
    }, [playerContract]);

    if (null == isPlayer) {
        return (
            <Wrapper>
                <h1 className={`${Classes.HEADING} mb-2`}>The Firm</h1>
                <Navigation />
                Loading...
            </Wrapper>
        );
    }

    if (false == isPlayer) {
        return (
            <Wrapper>
                <h1 className={`${Classes.HEADING} mb-2`}>The Firm</h1>
                <Navigation />
                <Button onClick={createAccount}>Create</Button>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h1 className={`${Classes.HEADING} mb-2`}>The Firm</h1>
            <Navigation />
            <Switch>
                <Route path={'/home'} component={Home} />
                <Route path={'/profile'} component={Profile} />
                <Route path={'/scheme'} component={Schemes} />
                <Route path={'/training'} component={Training} />
                <Route path={'/shop'} component={ShopFront} />
                <Route path={'/job'} component={Jobs} />
            </Switch>
        </Wrapper>
    );
};

export default Landing;
