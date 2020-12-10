import { Erc20TokenResource } from '@app/repository/_resource/Erc20Token';
import { AxiosInstance } from 'axios';
import { PagedResponse } from '@app/repository/_resource/Pagination';

class Collection {
    private BASE = '/api/token';

    private http: AxiosInstance;

    constructor(http: AxiosInstance) {
        this.http = http;
    }

    get = async (page = 1, numOnPage = 15): Promise<PagedResponse<Erc20TokenResource>> => {
        const { data } = await this.http.get(this.BASE + `?page=${page}&num_on_page=${numOnPage}`);

        return {
            records: data.records.map((record) => ({
                ...record,
            })),
            pagination: {
                ...data.pagination,
            },
        };
    };
}

export default Collection;
