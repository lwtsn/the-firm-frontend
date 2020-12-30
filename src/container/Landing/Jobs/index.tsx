import React from 'react';
import { Wrapper } from './styled';
import { Route, Switch } from 'react-router-dom';

import Industries from '@app/container/Landing/Jobs/IndustryList';
import Industry from '@app/container/Landing/Jobs/Industry';

const SchemeWrapper: React.FC = () => {
    return (
        <Wrapper>
            <Switch>
                <Route exact path={'/job'} component={Industries} />
                <Route path={'/job/:industryName'} component={Industry} />
            </Switch>
        </Wrapper>
    );
};

export default SchemeWrapper;
