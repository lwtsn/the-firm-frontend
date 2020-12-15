import React, { useEffect, useState } from 'react';
import { Wrapper } from './styled';
import { Route, Switch } from 'react-router-dom';
// Nested
import List from './List';
import Single from '@app/container/Landing/Schemes/Single';
import { getSchemesContract } from '@app/web3/contracts';
import { getCurrentAddress } from '@app/web3/utils';
import { Ongoing } from './Ongoing';
import { OngoingScheme } from '@app/model/scheme/OngoingScheme';

const SchemeWrapper: React.FC = () => {
    const schemesContract = getSchemesContract();
    const address = getCurrentAddress();

    const [ongoingScheme, setOngoingScheme] = useState<OngoingScheme>(undefined);

    useEffect(() => {
        schemesContract.getOngoingScheme(address).then(setOngoingScheme);
    }, [schemesContract, address]);

    if (undefined == ongoingScheme) {
        return <div>Loading..</div>;
    }

    if (ongoingScheme._isOngoing) {
        return <Ongoing ongoingScheme={ongoingScheme} />;
    }

    return (
        <Wrapper>
            <Switch>
                <Route exact path={'/scheme'} component={List} />
                <Route path={'/scheme/:schemeId/:schemeAddress'} component={Single} />
            </Switch>
        </Wrapper>
    );
};

export default SchemeWrapper;
