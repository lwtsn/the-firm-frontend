import React from 'react';

import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { ThemeProvider } from 'styled-components';
import { theme } from '@app/shared/style/theme';
import { GlobalStyle } from '@app/shared/style/global';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Classes } from '@blueprintjs/core';

import './css/flexboxgrid.min.css';
import getLibrary from '@app/web3/utils/getLibrary';
import Web3ReactManager from '@app/component/Web3ReactManager';
import { NetworkContextName } from '@app/web3/constants';
import Landing from '@app/container/Landing';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

if ('ethereum' in window) {
    // @ts-ignore
    (window.ethereum as any).autoRefreshOnNetworkChange = false;
}

const App: React.FC = () => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <BrowserRouter>
                        <Web3ReactManager>
                            <div className={`${Classes.DARK} container`}>
                                <Switch>
                                    <Route path={['/', '/home']} component={Landing} />
                                </Switch>
                            </div>
                        </Web3ReactManager>
                    </BrowserRouter>
                </ThemeProvider>
            </Web3ProviderNetwork>
        </Web3ReactProvider>
    );
};

export default App;
