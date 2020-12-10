import React, { useState } from 'react';
import { Wrapper } from './styled';
import { Switch, useHistory } from 'react-router-dom';
import { Alignment, Button, Classes, Navbar, NavbarGroup } from '@blueprintjs/core';
import { Wallet } from '@app/component/Wallet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Time from '@app/component/Time';

const Landing: React.FC = () => {
    const { active } = useWeb3React<Web3Provider>();
    const [shouldShowConnectWallet, setShouldShowConnectWallet] = useState(false);
    const history = useHistory();

    return (
        <Wrapper>
            <h1 className={`${Classes.HEADING} mb-2`}>Invoice Service Dashboard</h1>
            <Time />
            <Navbar className={'mb-3'}>
                <NavbarGroup align={Alignment.LEFT}>
                    <Button
                        icon={'new-grid-item'}
                        onClick={() => history.push('/dashboard/invoice')}
                        className={Classes.MINIMAL}
                    >
                        Invoices
                    </Button>
                    <Button
                        icon={'inherited-group'}
                        onClick={() => history.push('/dashboard/recipient')}
                        className={Classes.MINIMAL}
                    >
                        Recipients
                    </Button>
                    <Button
                        icon={'bank-account'}
                        onClick={() => history.push('/dashboard/treasury')}
                        className={Classes.MINIMAL}
                    >
                        Treasury
                    </Button>
                    <Button
                        icon={'random'}
                        onClick={() => history.push('/dashboard/stream')}
                        className={Classes.MINIMAL}
                    >
                        Streams
                    </Button>
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Button onClick={() => setShouldShowConnectWallet(true)} className={'mr-1'}>
                        {active ? 'Disconnect Wallet' : 'Connect Wallet'}
                    </Button>
                </NavbarGroup>
            </Navbar>
            <Switch></Switch>
            <Wallet shouldShow={shouldShowConnectWallet} setShouldShowConnectWallet={setShouldShowConnectWallet} />
        </Wrapper>
    );
};

export default Landing;
