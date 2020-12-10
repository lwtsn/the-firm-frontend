import React, { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Button, Classes, Dialog } from '@blueprintjs/core';

export const injectedConnector = new InjectedConnector({
    supportedChainIds: [
        1, // Mainet
        3, // Ropsten
        4, // Rinkeby
        5, // Goerli
        42, // Kovan
        31337, // Hardhat
    ],
});

export const Wallet = (props) => {
    const { shouldShow, setShouldShowConnectWallet } = props;
    const { activate, active, deactivate } = useWeb3React<Web3Provider>();

    const connect = useCallback(async () => {
        await activate(injectedConnector);
        setShouldShowConnectWallet(false);
    }, [activate, setShouldShowConnectWallet]);

    const disconnect = useCallback(async () => {
        await deactivate();
        setShouldShowConnectWallet(false);
    }, [deactivate, setShouldShowConnectWallet]);

    if (active) {
        return (
            <Dialog
                isOpen={shouldShow}
                usePortal={true}
                portalClassName={'invoice-form'}
                autoFocus={true}
                canEscapeKeyClose={true}
                canOutsideClickClose={true}
            >
                <div className={`${Classes.DIALOG_BODY}`}>
                    <Button type="button" onClick={disconnect}>
                        Disconnect
                    </Button>
                </div>
            </Dialog>
        );
    }

    return (
        <Dialog
            isOpen={shouldShow}
            usePortal={true}
            portalClassName={'invoice-form'}
            autoFocus={true}
            canEscapeKeyClose={true}
            isCloseButtonShown={true}
        >
            <div className={`${Classes.DIALOG_BODY}`}>
                <Button type="button" onClick={connect}>
                    Connect
                </Button>
            </div>
        </Dialog>
    );
};
