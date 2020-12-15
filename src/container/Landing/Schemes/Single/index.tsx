import React, { useCallback, useEffect, useState } from 'react';
import { Wrapper } from '../styled';
import { getSchemeContractByAddress, getSchemesContract } from '@app/web3/contracts';
import { Button, Card, Classes, H5 } from '@blueprintjs/core';
import { useParams } from 'react-router-dom';

const Single: React.FC = () => {
    const { schemeAddress, schemeId } = useParams<{ schemeAddress: string; schemeId: string }>();

    const schemesContract = getSchemesContract();
    const schemeContract = getSchemeContractByAddress(schemeAddress);

    const [scheme, setScheme] = useState(undefined);

    useEffect(() => {
        async function getScheme(): Promise<void> {
            await schemeContract.getScheme().then(setScheme);
        }

        getScheme();
    }, [schemeAddress, schemeContract]);

    const startScheme = useCallback(() => {
        schemesContract.startScheme(schemeId);
    }, [schemesContract, schemeId]);

    if (undefined == scheme) {
        return <div>Loading schemes</div>;
    }

    console.log(scheme._duration.toString());

    return (
        <Wrapper>
            <Card>
                <H5>{scheme._name}</H5>
                <p>Find the latest yield farming opportunity</p>
                <Button
                    onClick={() => startScheme()}
                    icon={'eye-open'}
                    text="Let the farming begin"
                    className={Classes.BUTTON}
                />
            </Card>
        </Wrapper>
    );
};

export default Single;
