import React, { useEffect, useState } from 'react';
import { Wrapper } from '../styled';
import { getSchemesContract } from '@app/web3/contracts';
import { ListedScheme } from '@app/model/scheme/ListedScheme';
import { Button, Card, Classes, H5 } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';

const Scheme = (props) => {
    const { id } = props;
    const history = useHistory();

    const schemesContract = getSchemesContract();
    const [scheme, setScheme] = useState<ListedScheme>(undefined);

    useEffect(() => {
        async function getScheme(): Promise<void> {
            await schemesContract.schemes(id).then(setScheme);
        }

        getScheme();
    }, [id, schemesContract]);

    if (undefined == scheme) {
        return <div>Scheme not found</div>;
    }

    return (
        <Wrapper>
            <Card>
                <H5>Test scheme</H5>
                <p>Test scheme</p>
                <Button
                    onClick={() => history.push(`/scheme/${id}/${scheme.schemeAddress}`)}
                    icon={'eye-open'}
                    text="Enter the farm"
                    className={Classes.BUTTON}
                />
            </Card>
        </Wrapper>
    );
};

export default Scheme;
