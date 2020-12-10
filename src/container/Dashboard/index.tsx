import React, { useEffect, useState } from 'react';
import { Wrapper } from './styled';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Alignment, Button, Classes, Navbar, NavbarGroup, Spinner } from '@blueprintjs/core';
import Invoice from './Invoice';
import Recipient from './Recipient';
import Stream from './Stream';
import Treasury from './Treasury';
import AuthorProfile from './Me/AuthorProfile';
import { $user, fetchAuthUser, setAuthUser } from '@app/shared/store';
import { fetchCurrencyList } from './store';
import { useStore } from 'effector-react';
import { Wallet } from '@app/component/Wallet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Time from '@app/component/Time';

const Dashboard: React.FC = () => {
    const authUser = useStore($user);
    const { active } = useWeb3React<Web3Provider>();

    const [isAuthPassed, setIsAuthPassed] = useState(false);
    const [shouldShowConnectWallet, setShouldShowConnectWallet] = useState(false);
    const history = useHistory();

    useEffect(() => {
        fetchCurrencyList();
        fetchAuthUser().then((user) => {
            if (!user) {
                return history.replace('/login');
            }
            setIsAuthPassed(true);
        });
    }, []);

    const performLogout = () => {
        localStorage.removeItem('auth');
        setAuthUser({
            name: '',
            email: '',
            id: 0,
        });
        history.replace('/login');
    };

    if (!isAuthPassed) {
        return <Spinner />;
    }

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
                    <Button
                        className={'mr-1'}
                        icon={'user'}
                        onClick={() => history.push('/dashboard/me/author-profile')}
                        minimal
                    >
                        {authUser.name}
                    </Button>
                    <Button onClick={() => setShouldShowConnectWallet(true)} className={'mr-1'}>
                        {active ? 'Disconnect Wallet' : 'Connect Wallet'}
                    </Button>
                    <Button onClick={performLogout} icon={'disable'}>
                        Logout
                    </Button>
                </NavbarGroup>
            </Navbar>
            <Switch>
                <Route path={'/dashboard/invoice'} component={Invoice} />
                <Route path={'/dashboard/recipient'} component={Recipient} />
                <Route path={'/dashboard/treasury'} component={Treasury} />
                <Route path={'/dashboard/stream'} component={Stream} />
                <Route path={'/dashboard/me/author-profile'} component={AuthorProfile} />
            </Switch>
            <Wallet shouldShow={shouldShowConnectWallet} setShouldShowConnectWallet={setShouldShowConnectWallet} />
        </Wrapper>
    );
};

export default Dashboard;
