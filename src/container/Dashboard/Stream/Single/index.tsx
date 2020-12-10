import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Classes, HTMLTable } from '@blueprintjs/core';
import { Wrapper } from '@app/container/Dashboard/Treasury/Single/styled';
import { Progress } from 'react-sweet-progress';

import { getStreamContract } from '@app/web3/contracts';
import { oneEther } from '@app/web3/constants';
import { Withdraw } from './component/Withdraw';
import { StreamChainResource, StreamResource } from '@app/repository/_resource/Stream';
import moment from 'moment';

const Single: React.FC = () => {
    const history = useHistory();
    const { streamId } = useParams<{ streamId: string }>();
    const streamContract = getStreamContract();
    const [stream, setStream] = useState(null);
    const [shouldShowWithdraw, setShouldShowWithdraw] = useState(false);

    if (!streamId) {
        history.replace('/dashboard/stream');
    }

    useEffect(() => {
        async function getStream(): Promise<void> {
            const streamFromChain: StreamChainResource = await streamContract.getStream(streamId);

            const startDate = moment.unix(streamFromChain.startTime.toNumber());
            const endDate = moment.unix(streamFromChain.stopTime.toNumber());

            const balanceAccrued = streamFromChain.balanceAccrued.div(oneEther).toNumber();
            const deposit = streamFromChain.deposit.div(oneEther).toNumber();

            const percentageComplete = balanceAccrued == 0 ? 0 : ((balanceAccrued / deposit) * 100).toFixed(2);

            const stream: StreamResource = {
                ...streamFromChain,
                id: streamId,
                start: startDate,
                end: endDate,
                percentageComplete: percentageComplete,
                timeRemaining: moment.duration(endDate.diff(moment())),
            };

            setStream(stream);
        }
        getStream();
    }, [streamContract, streamId]);

    if (stream == null || stream.remainingBalance == null || stream.deposit == null) {
        return <div>Loading stream..</div>;
    }

    return (
        <Wrapper>
            <div className={'row stream-withdraw-anchor'}>
                <div className={'col-xs-2'}>
                    <h4 className={Classes.HEADING}>Stream completion</h4>
                    <Progress percent={stream.percentageComplete} type="circle" />
                </div>
                <div className={'col-xs-10'}>
                    <div className={'row'}>
                        <HTMLTable style={{ width: '100%' }} className={Classes.HTML_TABLE_STRIPED}>
                            <thead>
                                <tr>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Time Remaining</th>
                                    <th>Amount</th>
                                    <th>Balance Remaining</th>
                                    <th>Balance Accrued</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{stream.start.format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    <td>{stream.end.format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    <td>
                                        {stream.timeRemaining.get('days')} Days {stream.timeRemaining.get('hours')}:
                                        {stream.timeRemaining.get('minutes')}:{stream.timeRemaining.get('seconds')}
                                    </td>
                                    <td>{stream.deposit.div(oneEther).toString()}</td>
                                    <td>{stream.remainingBalance.div(oneEther).toString()}</td>
                                    <td>{stream.balanceAccrued.div(oneEther).toString()}</td>
                                    <td>
                                        {stream.balanceAccrued > 0 && (
                                            <Button icon={'cloud-upload'} onClick={() => setShouldShowWithdraw(true)}>
                                                Withdraw
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </HTMLTable>
                    </div>
                </div>
            </div>
            <Withdraw
                anchor={'stream-withdraw-anchor'}
                stream={stream}
                shouldShow={shouldShowWithdraw}
                setShouldShow={setShouldShowWithdraw}
            />
        </Wrapper>
    );
};

export default Single;
