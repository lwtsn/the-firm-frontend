import React, { useEffect, useState } from 'react';
import { Wrapper } from './styled';
import { Button, Classes, HTMLTable } from '@blueprintjs/core';
import { getStreamContract } from '@app/web3/contracts';
import { getCurrentAddress } from '@app/web3/utils';
import { BigNumber } from 'ethers';
import { oneEther } from '@app/web3/constants';
import { useHistory } from 'react-router-dom';

const List: React.FC = () => {
    const streamContract = getStreamContract();
    const address = getCurrentAddress();
    const history = useHistory();

    const [streamIds, setStreamIds] = useState([]);
    const [streams, setStreams] = useState([]);

    useEffect(() => {
        async function getStreams(): Promise<void> {
            const streams = await streamContract.getStreamsForAddress(address);
            setStreamIds(streams);
        }

        getStreams();
    }, [streamContract, address]);

    useEffect(() => {
        async function getStreams(): Promise<void> {
            streamIds.map(async (streamId: BigNumber) => {
                let stream = await streamContract.getStream(streamId);
                const startDate = new Date(stream.startTime * 1000);
                stream = { ...stream, id: streamId, start: startDate };

                setStreams((streams) => [...streams, stream]);
            });
        }

        getStreams();
    }, [streamContract, streamIds, setStreams]);

    const renderStreamList = (streams: any[]): any => {
        return streams.map((stream) => (
            <tr key={stream.id}>
                <td>{stream.id.toString()}</td>
                <td>{stream.deposit.div(oneEther).toString()}</td>
                <td>{stream.tokenAddress}</td>
                <td>
                    {stream.start.getDate()}/{stream.start.getMonth()}/{stream.start.getFullYear()}
                </td>
                <td>
                    <Button onClick={() => history.push(`/dashboard/stream/${stream.id.toString()}`)} icon={'eye-open'}>
                        Details
                    </Button>
                </td>
            </tr>
        ));
    };

    return (
        <Wrapper>
            <div className={'row'}>
                <div className={'col-xs-12'}>
                    <h3 className={`${Classes.HEADING}`}>Your streams</h3>
                    <HTMLTable style={{ width: '100%' }} className={Classes.HTML_TABLE_STRIPED}>
                        <thead>
                            <tr>
                                <th>Stream</th>
                                <th>Amount</th>
                                <th>Token</th>
                                <th>Start time</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>{renderStreamList(streams)}</tbody>
                    </HTMLTable>
                </div>
            </div>
        </Wrapper>
    );
};

export default List;
