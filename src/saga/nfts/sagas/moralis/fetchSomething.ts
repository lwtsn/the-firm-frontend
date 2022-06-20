import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../api';
import { tokenBalanceError, tokenBalanceReset } from 'src/modules/custo_defi/balance';

const moralisOptions = (): RequestOptions => {
    return {
        apiVersion: 'moralis',
        headers: { 'X-API-Key': config.moralis.apiKey },
    };
};

export function* fetchSomething(action: NftsFetch) {
    try {
        if (action.payload.address) {
            const nfts = yield call(
                API.get(moralisOptions()),
                `/${action.payload.address}/nft?chain=0x${config.chainId}`,
            );

            yield put(nftsData(nfts.result));
        }
    } catch (error) {
        yield put(
            tokenBalanceError({
                code: 1337,
                message: ['Unable to fetch NFTs'],
            }),
        );
    }
}

export function* resetCustoDefiUser() {
    yield put(tokenBalanceReset());
}
