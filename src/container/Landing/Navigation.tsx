import { Alignment, Button, Classes, Navbar, NavbarGroup } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useHistory } from 'react-router-dom';
import { Wallet } from '@app/component/Wallet';
import { getCashContract } from '@app/web3/contracts';
import { BigNumber, ethers } from 'ethers';
import { getCurrentAddress } from '@app/web3/utils';

const Navigation: React.FC = () => {
    const { active } = useWeb3React<Web3Provider>();
    const [shouldShowConnectWallet, setShouldShowConnectWallet] = useState(false);
    const history = useHistory();
    const address = getCurrentAddress();

    const cashContract = getCashContract();

    const [balance, setBalance] = useState(BigNumber.from(0));

    useEffect(() => {
        async function getBalance(): Promise<void> {
            await cashContract.balanceOf(address).then(setBalance);
        }

        getBalance();
    }, [cashContract, address]);

    return (
        <Navbar className={'mb-3'}>
            <NavbarGroup align={Alignment.LEFT}>
                <Button icon={'home'} onClick={() => history.push('/home')} className={Classes.MINIMAL}>
                    Home
                </Button>
                <Button icon={'dollar'} onClick={() => history.push('/scheme')} className={Classes.MINIMAL}>
                    Schemes
                </Button>
                <Button icon={'walk'} onClick={() => history.push('/training')} className={Classes.MINIMAL}>
                    Train
                </Button>
                <Button icon={'briefcase'} onClick={() => history.push('/job')} className={Classes.MINIMAL}>
                    Job
                </Button>
                <Button icon={'shop'} onClick={() => history.push('/shop')} className={Classes.MINIMAL}>
                    Shop
                </Button>
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <Button className={'mr-1'} minimal={true} icon={'bank-account'}>
                    ${ethers.utils.formatEther(balance)}
                </Button>
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
