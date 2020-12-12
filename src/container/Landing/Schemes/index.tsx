import React, { useCallback, useEffect, useState } from 'react';
import { Wrapper } from './styled';
import { Route, Switch } from 'react-router-dom';
// Nested
import List from './List';
import Single from '@app/container/Landing/Schemes/Single';
import { getSchemesContract } from '@app/web3/contracts';
import { getCurrentAddress } from '@app/web3/utils';
import moment from 'moment';

const SchemeWrapper: React.FC = () => {
    const schemesContract = getSchemesContract();
    const address = getCurrentAddress();

    const [ongoingScheme, setOngoingScheme] = useState(undefined);
    const [scheme, setScheme] = useState(undefined);

    useEffect(() => {
        schemesContract.getOngoingScheme(address).then(setOngoingScheme);
    }, [schemesContract, address]);

    // useEffect(() => {
    //     if (hasOngoingScheme && undefined != ongoingScheme) {
    //         schemesContract.schemes(ongoingScheme.scheme).then(setScheme);
    //     }
    // }, [schemesContract, ongoingScheme, hasOngoingScheme]);
    //

    if (undefined == ongoingScheme) {
        return <div>Loading..</div>;
    }

    if (ongoingScheme._isOngoing) {
        const startTime = moment(ongoingScheme._timeStarted.mul(1000).toNumber());
        const completionTime = moment(ongoingScheme._timeCompleting.mul(1000).toNumber());

        return (
            <div>
                <p>Start time: {startTime.toDate().toString()}</p>
                <p>Completion time: {completionTime.toDate().toString()}</p>
            </div>
        );
    }

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
