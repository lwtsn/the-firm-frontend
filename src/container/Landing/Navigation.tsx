import { Alignment, Button, Classes, Navbar, NavbarGroup } from '@blueprintjs/core';
import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useHistory } from 'react-router-dom';
import { Wallet } from '@app/component/Wallet';
import { Wrapper } from '@app/container/Landing/styled';

const Navigation: React.FC = () => {
    const { active } = useWeb3React<Web3Provider>();
    const [shouldShowConnectWallet, setShouldShowConnectWallet] = useState(false);
    const history = useHistory();

    return (
        <Navbar className={'mb-3'}>
            <NavbarGroup align={Alignment.LEFT}>
                <Button icon={'home'} onClick={() => history.push('/home')} className={Classes.MINIMAL}>
                    Home
                </Button>
                <Button icon={'dollar'} onClick={() => history.push('/schemes')} className={Classes.MINIMAL}>
                    Schemes
                </Button>
                <Button icon={'walk'} onClick={() => history.push('/train')} className={Classes.MINIMAL}>
                    Train
                </Button>
                <Button icon={'shop'} onClick={() => history.push('/shop')} className={Classes.MINIMAL}>
                    Shop
                </Button>
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <Button onClick={() => setShouldShowConnectWallet(true)} className={'mr-1'}>
                    {active ? 'Disconnect Wallet' : 'Connect Wallet'}
                </Button>
                <Button icon={'user'} onClick={() => history.push('/profile')} className={Classes.MINIMAL}>
                    Profile
                </Button>
            </NavbarGroup>
            <Wallet shouldShow={shouldShowConnectWallet} setShouldShowConnectWallet={setShouldShowConnectWallet} />
        </Navbar>
    );
};

export default Navigation;
