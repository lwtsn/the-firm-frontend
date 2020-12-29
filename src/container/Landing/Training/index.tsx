import React, { useEffect, useState } from 'react';
// Nested
import { getTrainingContract } from '@app/web3/contracts';
import { getCurrentAddress } from '@app/web3/utils';
import { Training } from '@app/model/player/Training';
import { Wrapper } from './styled';
import { Route, Switch } from 'react-router-dom';
import { Ongoing } from './Ongoing';
import List from '@app/container/Landing/Training/List';

const TrainingWrapper: React.FC = () => {
    const trainingContract = getTrainingContract();
    const address = getCurrentAddress();

    const [training, setTraining] = useState<Training>(undefined);

    useEffect(() => {
        trainingContract.trainingMapping(address).then((training) => {
            setTraining(training);
        });
    }, [trainingContract, address]);

    if (undefined == training) {
        return <div>Loading..</div>;
    }

    if (training.isTraining) {
        return <Ongoing training={training} />;
    }

    return (
        <Wrapper>
            <Switch>
                <Route exact path={'/training'} component={List} />
            </Switch>
        </Wrapper>
    );
};

export default TrainingWrapper;
