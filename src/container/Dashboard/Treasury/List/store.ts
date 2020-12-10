import { createDomain } from 'effector';
import repository from '@app/repository';
import { Erc20TokenResource } from '@app/repository/_resource/Erc20Token';
import { PagedResponse } from '@app/repository/_resource/Pagination';

const treasury = createDomain('tokens');

if (process.env.NODE_ENV === 'development') {
    import('effector-logger/attach').then((module) => module.attachLogger(treasury));
}

export const $tokenList = treasury.createStore<PagedResponse<Erc20TokenResource>>({
    records: [],
    pagination: {
        total: 0,
        num_on_page: 1,
        page: 1,
    },
});

export const fetchTokenList = treasury.createEffect<{ page: number }, PagedResponse<Erc20TokenResource>>({
    async handler({ page }) {
        return await repository.tokens().get(page);
    },
});

$tokenList.on(fetchTokenList.doneData, (_, data) => data);
