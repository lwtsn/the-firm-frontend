export interface RecipientCreateInput {
    name: string;
    currencyId: number;
}

export interface RecipientUpdateInput {
    name: string | null;
    position: string | null;
    startDate: Date | null;
    workEmail: string | null;
    personalEmail: string | null;
    phoneNumber: string | null;
    addressFirstLine: string | null;
    addressSecondLine: string | null;
    cityState: string | null;
    countryIsoCode: string | null;
    postalCode: string | null;
    bankName: string | null;
    bankAccountNumber: string | null;
    monthlyPaymentAmount: number | null;
    paymentPeriod: number | null;
}
