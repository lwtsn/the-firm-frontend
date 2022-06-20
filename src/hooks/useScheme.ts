import { getSchemeContractByAddress, getSchemesContract } from '@app/web3/contracts';
import { useMemo, useState } from 'react';
import { Scheme } from '@app/model/scheme/Scheme';

export const useSchemes = (): { schemeList: [] } => {
    const schemesContract = getSchemesContract();
    const [schemes, setSchemes] = useState<[]>([]);

    useMemo(() => {
        async function getSchemes(): Promise<void> {
            await schemesContract.listSchemes().then(setSchemes);
        }

        if (undefined != schemesContract) {
            getSchemes();
        }
    }, [schemesContract]);

    return {
        schemeList: schemes,
    };
};

export const useScheme = (address: string): { scheme: Scheme } => {
    const schemeContract = getSchemeContractByAddress(address);

    const [scheme, setScheme] = useState<Scheme>(undefined);

    useMemo(() => {
        async function getScheme(): Promise<void> {
            await schemeContract.getScheme().then(setScheme);
        }

        if (undefined != schemeContract) {
            getScheme();
        }
    }, [schemeContract]);

    return {
        scheme: scheme,
    };
};
