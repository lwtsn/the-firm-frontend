import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@app/web3/connectors/NetworkConnector';

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL;
console.log(NETWORK_URL);
console.log(NETWORK_URL);
console.log(NETWORK_URL);
console.log(NETWORK_URL);
console.log(NETWORK_URL);
export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1');

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

export const network = new NetworkConnector({
    urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
});
