import React, { useCallback, useEffect, useState } from 'react';
import { getSchemeContractByAddress, getSchemesContract } from '@app/web3/contracts';
import { OngoingScheme } from '@app/model/scheme/OngoingScheme';
import { Scheme } from '@app/model/scheme/Scheme';
import { Wrapper } from './styled';
import moment, { Duration } from 'moment';
import { Button, Classes } from '@blueprintjs/core';

export const Ongoing = (props: { ongoingScheme: OngoingScheme }) => {
    const { ongoingScheme } = props;

    const schemeContract = getSchemeContractByAddress(ongoingScheme._schemeAddress);
    const schemesContract = getSchemesContract();

    const [scheme, setScheme] = useState<Scheme>(undefined);
    const [remaining, setRemaining] = useState<Duration>(undefined);

    useEffect(() => {
        schemeContract.getScheme().then(setScheme);
    }, [schemeContract]);

    useEffect(() => {
        if (undefined == ongoingScheme) {
            return;
        }

        const completionTime = moment(ongoingScheme._timeCompleting.mul(1000).toNumber());

        const interval = setInterval(() => {
            const remaining: Duration = moment.duration(completionTime.diff(moment()));
            setRemaining(remaining);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [ongoingScheme]);

    const completeScheme = useCallback(() => {
        schemesContract.completeScheme();
    }, [schemesContract]);

    if (undefined == scheme || undefined == remaining) {
        return <div>Loading</div>;
    }

    if (0 > remaining.seconds()) {
        return (
            <div>
                <h3>Scheme finished</h3>
                <Button icon={'eye-open'} text="Complete" className={Classes.BUTTON} onClick={completeScheme} />
            </div>
        );
    }

    const startTime = moment(ongoingScheme._timeStarted.mul(1000).toNumber());
    const completionTime = moment(ongoingScheme._timeCompleting.mul(1000).toNumber());

    return (
        <Wrapper>
            <h2>{scheme['_name']} in progress</h2>
            <h3>Started: {startTime.format('MMMM Do YYYY, h:mm:ss a')}</h3>
            <h3>Completing: {completionTime.format('MMMM Do YYYY, h:mm:ss a')}</h3>
            <h3>
                Remaining: {remaining.days()} {'  '}
                {remaining.hours()}:{remaining.minutes()}:{remaining.seconds()}
            </h3>
        </Wrapper>
    );
};
