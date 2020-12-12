import React, { useEffect, useState } from 'react';
import { Wrapper } from './styled';
import { getPlayerStatsContract } from '@app/web3/contracts';
import { getCurrentAddress } from '@app/web3/utils';

const Profile: React.FC = () => {
    const address = getCurrentAddress();
    const playerStatsContract = getPlayerStatsContract();
    const [playerStats, setPlayerStats] = useState(undefined);

    useEffect(() => {
        playerStatsContract.getPlayerStats(address).then(setPlayerStats);
    }, [playerStatsContract, address, setPlayerStats]);
    console.log(address);
    if (undefined == playerStats) {
        return <div>Loading../</div>;
    }
    console.log(playerStats);
    return <Wrapper>sup</Wrapper>;
};

export default Profile;
