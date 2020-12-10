import { AxiosInstance } from 'axios';
import { RecipientResource } from '@app/repository/_resource/Recipient';
import { parseISO } from 'date-fns';
import { RecipientUpdateInput } from '@app/repository/Recipient/input';

class Single {
    private readonly BASE: string = 'api/participant/0';
    private http: AxiosInstance;
    private readonly recipientId: number;

    constructor(http: AxiosInstance, recipientId: number) {
        this.http = http;
        this.recipientId = recipientId;

        this.BASE = '/api/recipient/' + recipientId;
    }

    get = async (): Promise<RecipientResource> => {
        const { data } = await this.http.get(this.BASE);

        return {
            ...data,
            created_at: parseISO(data.created_at),
            updated_at: parseISO(data.updated_at),
            monthly_payment_amount: data.monthly_payment_amount / Math.pow(10, data.currency.unit_precision),
        };
    };

    update = async (input: RecipientUpdateInput): Promise<RecipientResource> => {
        const { data } = await this.http.put(this.BASE, {
            name: input.name,
            position: input.position,
            start_date: input.startDate,
            work_email: input.workEmail,
            personal_email: input.personalEmail,
            phone_number: input.phoneNumber,
            address_first_line: input.addressFirstLine,
            address_second_line: input.addressSecondLine,
            city_state: input.cityState,
            country_iso_code: input.countryIsoCode,
            postal_code: input.postalCode,
            bank_name: input.bankName,
            bank_account_name: input.bankAccountNumber,
            monthly_payment_amount: input.monthlyPaymentAmount,
            payment_period: input.paymentPeriod,
        });

        return {
            ...data,
            created_at: parseISO(data.created_at),
            updated_at: parseISO(data.updated_at),
        };
    };
}

export default Single;
