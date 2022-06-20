import { RootState } from '../../';
import { NftState } from 'src/modules/custo_defi/nfts/types';

export const selectUserNfts = (state: RootState): NftState['nfts'] => state.custodialDefi.nfts?.nfts;
