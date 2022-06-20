import { Asset, Collection } from "../opensea";

export interface Nft extends Asset {
    address: string;
    tokenId: string;
    amount: number;
    contractType: string;
    name: string;
    symbol: string;
    image?: string;
    tokenUri: string;
    metadata: string;
}

export interface NftPayload {
    token_address: string;
    token_id: string;
    contract_type: string;
    owner_of: string;
    block_number: string;
    block_number_minted: string;
    token_uri: string;
    metadata: string;
    synced_at: string;
    amount: string;
    name: string;
    symbol: string;
    image?: string;
}

export interface NftCollection extends Collection {
    assets?: Nft[];
}

export interface NftState {
    nfts: {
        loading: boolean;
        data: Nft[];
        error: boolean;
    };
}
