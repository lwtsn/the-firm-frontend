import React from 'react';
import { Wrapper } from '../styled';
import Scheme from '@app/container/Landing/Schemes/List/Scheme';
import { useSchemes } from '@app/hooks/useScheme';

const Schemes: React.FC = () => {
    const { schemeList } = useSchemes();

    const renderSchemes = (): JSX.Element[] => {
        console.log(schemeList);
        return schemeList.map((isScheme: boolean, key) => {
            const schemeAddress = schemeList[key][key];

            if (isScheme) {
                return <Scheme key={key} id={key} address={schemeAddress} />;
            }
        });
    };

    return <Wrapper>{renderSchemes()}</Wrapper>;
};

export default Schemes;
