import { createDomain } from 'effector';
import repository from '@app/repository';
import { UserErc20TokenResource } from '@app/repository/_resource/Erc20Token';

const tokenApi = createDomain('treasury-user');

if (process.env.NODE_ENV === 'development') {
    import('effector-logger/attach').then((module) => module.attachLogger(tokenApi));
}

export const $userToken = tokenApi.createStore<UserErc20TokenResource>({
    name: null,
    image: null,
    address: null,
});

export const fetchToken = tokenApi.createEffect<{ tokenAddress: string }, UserErc20TokenResource>({
    async handler({ tokenAddress }) {
        return await repository.userTokens('').getToken(tokenAddress);
    },
});
$userToken.on(fetchToken.doneData, (_, token) => token);
