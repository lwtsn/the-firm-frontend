import React, { useEffect, useState } from 'react';
import { getStreamManagerContract } from '@app/web3/contracts';
import moment from 'moment';

const Time: React.FC = () => {
    const [blockTime, setBlockTime] = useState(moment());
    const streamManager = getStreamManagerContract();

    useEffect(() => {
        async function getTime(): Promise<void> {
            const time = await streamManager.blockTime();
            setBlockTime(moment.unix(time.toNumber()));
        }

        getTime();
    }, [streamManager]);

    return <p>Block time: {blockTime.format('MMMM Do YYYY, h:mm:ss a')}</p>;
};

export default Time;
