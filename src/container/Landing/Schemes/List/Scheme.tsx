import React from 'react';
import { Wrapper } from '../styled';
import { Button, Card, Classes, H5 } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import { useScheme } from '@app/hooks/useScheme';

const Scheme = (props: { id: number; address: string }): JSX.Element => {
    const { id, address } = props;
    const history = useHistory();

    const { scheme } = useScheme(address);

    if (undefined == scheme) {
        return <div>Scheme not found</div>;
    }

    return (
        <Wrapper>
            <Card>
                <H5>{scheme._name}</H5>
                <p>Test scheme</p>
                <Button
                    onClick={() => history.push(`/scheme/${id}/${address}`)}
                    icon={'eye-open'}
                    text="Enter the farm"
                    className={Classes.BUTTON}
                />
            </Card>
        </Wrapper>
    );
};

export default Scheme;
