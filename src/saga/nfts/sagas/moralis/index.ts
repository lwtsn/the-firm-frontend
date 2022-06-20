import { takeLeading } from 'redux-saga/effects';
import { CUSTO_DEFI_NFTS_FETCH } from '../../constants';
import { fetchSomething } from './fetchSomething';

export function* rootNftSaga() {
    yield takeLeading(CUSTO_DEFI_NFTS_FETCH, fetchSomething);
}
