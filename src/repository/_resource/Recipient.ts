import { CurrencyResource } from '@app/repository/_resource/Currency';

export interface RecipientResource {
    id: number;
    created_at: Date;
    updated_at: Date;
    currency: CurrencyResource;
    is_enabled: boolean;
    name: string;
    position: string;
    start_date: Date;
    work_email: string;
    personal_email: string;
    phone_number: string;
    address_first_line: string;
    address_second_line: string;
    city_state: string;
    country_code_iso: string;
    postal_code: string;
    bank_name: string;
    bank_account_number: string;
    monthly_payment_amount: number;
    payment_period: number;
}

export interface RecipientListItemResource {
    id: number;
    created_at: Date;
    updated_at: Date;
    currency: CurrencyResource;
    is_enabled: boolean;
    name: string;
    position: string;
    work_email: string;
    personal_email: string;
}
