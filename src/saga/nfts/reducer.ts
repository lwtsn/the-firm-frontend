import { NftsActions } from './actions';
import { Nft, NftState } from './types';
import { CUSTO_DEFI_NFTS_DATA, CUSTO_DEFI_NFTS_RESET } from './constants';

export const initialNftState: NftState = {
    nfts: {
        loading: true,
        data: [],
        error: false,
    },
};

export const nftsReducer = (state = initialNftState, action: NftsActions): NftState => {
    switch (action.type) {
        case CUSTO_DEFI_NFTS_DATA:
            let nfts: Array<Nft> = [];

            action.payload.forEach(async (nft: any) => {
                nfts[nft.token_address + '_' + nft.token_id] = {
                    tokenId: nft.token_id,
                    address: nft.token_address,
                    amount: nft.amount,
                    contractType: nft.contract_type,
                    metadata: nft.metadata,
                    tokenUri: nft.token_uri,
                    name: nft.name,
                    symbol: nft.symbol,
                };
            });

            return {
                ...state,
                nfts: {
                    loading: false,
                    data: nfts,
                    error: false,
                }
            };
        case CUSTO_DEFI_NFTS_RESET:
            return {
                ...state,
                nfts: {
                    loading: true,
                    data: [],
                    error: false,
                }
            };
        default:
            return state;
    }
};
