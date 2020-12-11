import React from 'react';
import { Wrapper } from './styled';
import { Route, Switch } from 'react-router-dom';
// Nested
import List from './List';
import Single from '@app/container/Landing/Schemes/Single';

const SchemeWrapper: React.FC = () => {
    return (
        <Wrapper>
            <Switch>
                <Route exact path={'/scheme'} component={List} />
                <Route path={'/scheme/:streamId'} component={Single} />
            </Switch>
        </Wrapper>
    );
};

export default SchemeWrapper;
