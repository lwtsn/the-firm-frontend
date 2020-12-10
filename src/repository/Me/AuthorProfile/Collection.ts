import { AxiosInstance } from 'axios';
import { AuthorProfileResource } from '@app/repository/_resource/AuthorProfile';
import { AuthorProfileUpdateInput } from '@app/repository/Me/AuthorProfile/input';

class Collection {
    private BASE = '/api/me/author-profile';

    private http: AxiosInstance;

    constructor(http: AxiosInstance) {
        this.http = http;
    }

    get = async (): Promise<AuthorProfileResource> => {
        const { data } = await this.http.get(this.BASE);
        return data;
    };

    update = async (input: AuthorProfileUpdateInput): Promise<AuthorProfileResource> => {
        const { data } = await this.http.put(this.BASE, {
            name: input.name,
            address_first_line: input.addressFirstLine,
            address_second_line: input.addressSecondLine,
            city_state: input.cityState,
            country_iso_code: input.countryIsoCode,
            postal_code: input.postalCode,
        });
        return data;
    };
}

export default Collection;
