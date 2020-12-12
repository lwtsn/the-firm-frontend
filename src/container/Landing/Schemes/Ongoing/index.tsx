import React, { useEffect, useState } from 'react';
import { getSchemeContractByAddress } from '@app/web3/contracts';
import { OngoingScheme } from '@app/model/scheme/OngoingScheme';
import { Scheme } from '@app/model/scheme/Scheme';
import { Wrapper } from './styled';
import moment, { Duration } from 'moment';

export const Ongoing = (props: { ongoingScheme: OngoingScheme }) => {
    const { ongoingScheme } = props;

    const schemeContract = getSchemeContractByAddress(ongoingScheme._schemeAddress);

    const [scheme, setScheme] = useState<Scheme>(undefined);
    const [remaining, setRemaining] = useState<Duration>(undefined);

    useEffect(() => {
        schemeContract.getScheme().then(setScheme);
    }, [schemeContract]);

    useEffect(() => {
        if (undefined == ongoingScheme) {
            return;
        }

        console.log(`initializing interval`);
        const completionTime = moment(ongoingScheme._timeCompleting.mul(1000).toNumber());

        const interval = setInterval(() => {
            const remaining: Duration = moment.duration(completionTime.diff(moment()));
            setRemaining(remaining);
        }, 1000);

        return () => {
            console.log(`clearing interval`);
            clearInterval(interval);
        };
    }, [ongoingScheme]); // has no dependency - this will be called on-component-mount

    if (undefined == scheme || undefined == remaining) {
        return <div>Loading</div>;
    }

    const startTime = moment(ongoingScheme._timeStarted.mul(1000).toNumber());
    const completionTime = moment(ongoingScheme._timeCompleting.mul(1000).toNumber());
    // let remaining: Duration = moment.duration(completionTime.diff(moment()));

    // setInterval(() => {
    //     console.log('ok');
    //     remaining = moment.duration(completionTime.diff(moment()));
    // }, 1000);

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

    // const [ongoingScheme, setOngoingScheme] = useState(undefined);
    //
    // useEffect(() => {
    //     schemesContract.getOngoingScheme(address).then(setOngoingScheme);
    // }, [schemesContract, address]);
    //
    //
    // return (
    //     <div>
    //         <p>Start time: {startTime.toDate().toString()}</p>
    //         <p>Completion time: {completionTime.toDate().toString()}</p>
    //     </div>
    // );
};
