import { AxiosInstance } from 'axios';
import { UserErc20TokenResource } from '@app/repository/_resource/Erc20Token';

class Collection {
    private BASE = '/api/token/';

    private readonly userAddress: string;
    private http: AxiosInstance;

    constructor(http: AxiosInstance, userAddress: string) {
        this.http = http;
        this.userAddress = userAddress;
    }

    getToken = async (tokenAddress: string): Promise<UserErc20TokenResource> => {
        const { data } = await this.http.get(this.BASE + tokenAddress);
        return data;
    };
}

export default Collection;
