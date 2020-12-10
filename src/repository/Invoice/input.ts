export interface InvoiceCreateInput {
    title: string;
    currencyId: number;
}

export interface InvoiceUpdateInput {
    title: string | null;
    triggerFinalizeAt: Date | null;
    dueDate: Date | null;
    authorName: string | null;
    authorAddressFirstLine: string | null;
    authorAddressSecondLine: string | null;
    authorCityState: string | null;
    authorCountryIsoCode: string | null;
    authorPostalCode: string | null;
    authorRegistrationNumber: string | null;
    recipientName: string | null;
    recipientPosition: string | null;
    recipientWorkEmail: string | null;
    recipientPersonalEmail: string | null;
    recipientPhoneNumber: string | null;
    recipientAddressFirstLine: string | null;
    recipientAddressSecondLine: string | null;
    recipientCityState: string | null;
    recipientCountryIsoCode: string | null;
    recipientPostalCode: string | null;
    recipientBankName: string | null;
    recipientBankAccountNumber: string | null;
}
