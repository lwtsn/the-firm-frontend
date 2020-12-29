import React, { useCallback } from 'react';
import { Wrapper } from '../styled';
import { getTrainingContract } from '@app/web3/contracts';
import { Button, Card, Classes, H5 } from '@blueprintjs/core';
import { StatMapping } from '@app/model/player/Training';

const Stat = (props) => {
    const { id } = props;

    const trainingContract = getTrainingContract();

    const startTraining = useCallback(
        (duration: number) => {
            trainingContract.start(id, duration);
        },
        [trainingContract, id],
    );

    if (undefined == trainingContract) {
        return <div>Loading..</div>;
    }

    const name = StatMapping[id];

    return (
        <Wrapper>
            <Card>
                <H5>Start training {name}</H5>
                <Button icon={'time'} text="One hour" className={Classes.BUTTON} onClick={() => startTraining(0)} />
                <Button icon={'time'} text="Two hours" className={Classes.BUTTON} onClick={() => startTraining(1)} />
                <Button icon={'time'} text="Four hours" className={Classes.BUTTON} onClick={() => startTraining(2)} />
                <Button icon={'time'} text="Eight hours" className={Classes.BUTTON} onClick={() => startTraining(3)} />
                <Button icon={'time'} text="Twelve hours" className={Classes.BUTTON} onClick={() => startTraining(4)} />
                <Button icon={'time'} text="One day" className={Classes.BUTTON} onClick={() => startTraining(5)} />
                <Button icon={'time'} text="Two days" className={Classes.BUTTON} onClick={() => startTraining(6)} />
                <Button icon={'time'} text="Four days" className={Classes.BUTTON} onClick={() => startTraining(7)} />
                <Button icon={'time'} text="One Week" className={Classes.BUTTON} onClick={() => startTraining(8)} />
            </Card>
        </Wrapper>
    );
};

export default Stat;
