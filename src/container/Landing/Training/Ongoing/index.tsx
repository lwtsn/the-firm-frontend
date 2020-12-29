import React, { useCallback, useEffect, useState } from 'react';
import { getTrainingContract } from '@app/web3/contracts';
import { Wrapper } from './styled';
import moment, { Duration } from 'moment';
import { Button, Classes } from '@blueprintjs/core';
import { Training } from '@app/model/player/Training';

export const Ongoing = (props: { training: Training }) => {
    const { training } = props;

    const trainingContract = getTrainingContract();

    const [remaining, setRemaining] = useState<Duration>(undefined);

    useEffect(() => {
        if (undefined == training) {
            return;
        }

        const completionTime = moment(training.stopTime.mul(1000).toNumber());

        const interval = setInterval(() => {
            const remaining: Duration = moment.duration(completionTime.diff(moment()));
            setRemaining(remaining);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [training]);

    const finishTraining = useCallback(() => {
        trainingContract.skipFinish().then(console.log);
    }, [trainingContract]);

    if (undefined == training || undefined == remaining) {
        return <div>Loading</div>;
    }

    if (0 > remaining.seconds()) {
        return <Button icon={'eye-open'} text="Complete" className={Classes.BUTTON} onClick={finishTraining} />;
    }

    const startTime = moment(training.startTime.mul(1000).toNumber());
    const completionTime = moment(training.stopTime.mul(1000).toNumber());

    return (
        <Wrapper>
            <h3>Started: {startTime.format('MMMM Do YYYY, h:mm:ss a')}</h3>
            <h3>Completing: {completionTime.format('MMMM Do YYYY, h:mm:ss a')}</h3>
            <h3>
                Remaining: {remaining.days()} {'  '}
                {remaining.hours()}:{remaining.minutes()}:{remaining.seconds()}
            </h3>

            <Button icon={'eye-open'} text="Skip" className={Classes.BUTTON} onClick={finishTraining} />
        </Wrapper>
    );
};
