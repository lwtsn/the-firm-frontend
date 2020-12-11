import React, { useCallback } from 'react';
import { Wrapper } from '../styled';
import { getSchemesContract } from '@app/web3/contracts';
import { Button, Card, Classes, H5 } from '@blueprintjs/core';

const Single: React.FC = () => {
    const schemesContract = getSchemesContract();

    const startScheme = useCallback(() => {
        schemesContract.startScheme(1);
    }, [schemesContract]);

    return (
        <Wrapper>
            <Card>
                <H5>Yield Farm</H5>
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
