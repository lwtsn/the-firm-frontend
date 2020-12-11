import React, { useEffect, useState } from 'react';
import { Wrapper } from '../styled';
import { getScroungeForSatochisContract, getYieldFarmContract } from '@app/web3/contracts';
import { Button, Card, Classes, H5 } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';

const Schemes: React.FC = () => {
    const yieldFarmContract = getYieldFarmContract();
    const scroungeForSatochisContract = getScroungeForSatochisContract();
    const history = useHistory();

    const [yieldFarm, setYieldFarm] = useState(undefined);
    const [scroungeForSatochis, setScroungeForSatochis] = useState(undefined);

    useEffect(() => {
        async function getYieldFarm(): Promise<void> {
            await yieldFarmContract.getScheme().then(setYieldFarm);
        }

        getYieldFarm();
    }, [yieldFarmContract]);

    useEffect(() => {
        async function getScroungeForSatochis(): Promise<void> {
            await scroungeForSatochisContract.getScheme().then(setScroungeForSatochis);
        }

        getScroungeForSatochis();
    }, [scroungeForSatochisContract]);

    if (undefined == yieldFarm || undefined == scroungeForSatochis) {
        return <div>Loading schemes</div>;
    }

    return (
        <Wrapper>
            <Card>
                <H5>{yieldFarm._name}</H5>
                <p>Find the latest yield farming opportunity</p>
                <Button
                    onClick={() => history.push(`/scheme/1`)}
                    icon={'eye-open'}
                    text="Enter the farm"
                    className={Classes.BUTTON}
                />
            </Card>
        </Wrapper>
    );
};

export default Schemes;
