import React, { useEffect, useState } from 'react';
import { Wrapper } from './styled';
import { getSchemesContract } from '@app/web3/contracts';
import { BigNumber } from 'ethers';

const Schemes: React.FC = () => {
    const schemesContract = getSchemesContract();

    const [schemes, setSchemes] = useState();

    useEffect(() => {
        async function getSchemes(): Promise<void> {
            await schemesContract.listActivities().then(setSchemes);
        }

        getSchemes();
    }, [schemesContract]);

    if (undefined == schemes) {
        return <div>No schemes</div>;
    }

    const renderStreamList = (schemes: any[]): any => {
        return schemes.map((scheme: BigNumber, key) => {
            return <div key={key}>{scheme.toString()}hello</div>;
        });
    };

    return <Wrapper>{renderStreamList(schemes)}</Wrapper>;
};

export default Schemes;
