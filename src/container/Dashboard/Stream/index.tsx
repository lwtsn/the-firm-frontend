import React from 'react';
import { Wrapper } from './styled';
import { Route, Switch } from 'react-router-dom';

// Nested
import List from './List';
import Single from '@app/container/Dashboard/Stream/Single';

const Dashboard: React.FC = () => {
    return (
        <Wrapper>
            <Switch>
                <Route exact path={'/dashboard/stream'} component={List} />
                <Route path={'/dashboard/stream/:streamId'} component={Single} />
            </Switch>
        </Wrapper>
    );
};

export default Dashboard;
