import {CommonError} from "src/modules/types";
import {
    CUSTO_DEFI_NFTS_DATA,
    CUSTO_DEFI_NFTS_ERROR,
    CUSTO_DEFI_NFTS_FETCH,
    CUSTO_DEFI_NFTS_RESET
} from "src/modules/custo_defi/nfts/constants";
import {NftPayload} from "src/modules/custo_defi/nfts/types";

export interface NftsFetch {
    type: typeof CUSTO_DEFI_NFTS_FETCH;
    payload: {
        address: string;
    };
}

export interface NftsData {
    type: typeof CUSTO_DEFI_NFTS_DATA;
    payload: NftPayload[];
}

export interface NftsReset {
    type: typeof CUSTO_DEFI_NFTS_RESET;
}

export interface NftsError {
    type: typeof CUSTO_DEFI_NFTS_ERROR;
    error: CommonError;
}

export type NftsActions = NftsFetch
    | NftsReset
    | NftsError
    | NftsData;

export const nftsFetch = (payload: NftsFetch['payload']): NftsFetch => ({
    type: CUSTO_DEFI_NFTS_FETCH,
    payload: payload
});

export const nftsData = (payload: NftsData['payload']): NftsData => ({
    type: CUSTO_DEFI_NFTS_DATA,
    payload: payload
});

export const nftsReset = (): NftsReset => ({
    type: CUSTO_DEFI_NFTS_RESET,
});

export const nftsError = (error: CommonError): NftsError => ({
    type: CUSTO_DEFI_NFTS_ERROR,
    error
});
