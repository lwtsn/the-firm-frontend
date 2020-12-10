import { UserResource } from './User';
import { CurrencyResource } from '@app/repository/_resource/Currency';
import { InvoiceItemResource } from '@app/repository/_resource/InvoiceItem';
import { RecipientResource } from '@app/repository/_resource/Recipient';

export interface InvoiceResource {
    id: number;
    created_at: Date;
    updated_at: Date;
    recipient: RecipientResource | null;
    currency: CurrencyResource;
    trigger_finalize_at: Date | null;
    finalized_at: Date | null;
    paid_at: Date | null;
    title: string;
    due_date: Date | null;
    author_name: string;
    author_address_first_line: string;
    author_address_second_line: string;
    author_city_state: string;
    author_country_iso_code: string;
    author_postal_code: string;
    author_registration_number: string;
    recipient_name: string;
    recipient_position: string;
    recipient_work_email: string;
    recipient_personal_email: string;
    recipient_phone_number: string;
    recipient_address_first_line: string;
    recipient_address_second_line: string;
    recipient_city_state: string;
    recipient_country_iso_code: string;
    recipient_postal_code: string;
    recipient_bank_name: string;
    recipient_bank_account_number: string;
    items: InvoiceItemResource[];
}

export interface InvoiceListItemResource {
    id: number;
    created_at: Date;
    updated_at: Date;
    recipient: RecipientResource | null;
    currency: CurrencyResource;
    trigger_finalize_at: Date | null;
    finalized_at: Date | null;
    paid_at: Date | null;
    title: string;
    due_date: Date | null;
    author_name: string;
    recipient_name: string;
}
