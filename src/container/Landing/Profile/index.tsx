import React, { useEffect, useState } from 'react';
import { List, Wrapper } from './styled';
import { getPlayerContract, getPlayerStatsContract } from '@app/web3/contracts';
import { getCurrentAddress } from '@app/web3/utils';
import { PlayerStats } from '@app/model/player/PlayerStats';
import { PlayerBattleStats } from '@app/model/player/PlayerBattleStats';
import { BigNumber } from 'ethers';

const Profile: React.FC = () => {
    const address = getCurrentAddress();

    const playerContract = getPlayerContract();
    const playerStatsContract = getPlayerStatsContract();
    const [playerStats, setPlayerStats] = useState<PlayerStats>(undefined);
    const [playerBattleStats, setPlayerBattleStats] = useState<PlayerBattleStats>(undefined);
    const [playerBalance, setPlayerBalance] = useState<BigNumber>(BigNumber.from(0));

    useEffect(() => {
        playerStatsContract.getPlayerStats(address).then((playerStats: PlayerStats) => {
            setPlayerStats(playerStats);
        });
    }, [playerStatsContract, address]);

    useEffect(() => {
        playerStatsContract.getPlayerBattleStats(address).then((playerBattleStats: PlayerBattleStats) => {
            setPlayerBattleStats(playerBattleStats);
        });
    }, [playerStatsContract, address]);

    useEffect(() => {
        playerContract.getBalance(address).then(setPlayerBalance);
    }, [playerContract, address]);

    if (undefined == playerStats || undefined == playerBattleStats) {
        return <div>Loading..</div>;
    }

    return (
        <Wrapper>
            <h2>Your stats</h2>
            <List>
                <li>
                    Health: {playerStats.currentHealth.toString()}/{playerStats.baseHealth.toString()}
                </li>
                <li>Level: {playerStats.level.toString()}</li>
                <li>Experience: {playerStats.experience.toString()}</li>
                <li>&nbsp;</li>
                <li>Strength: {playerBattleStats.baseStrength.toString()}</li>
                <li>Dexterity: {playerBattleStats.baseDexterity.toString()}</li>
                <li>Defence: {playerBattleStats.baseDefence.toString()}</li>
                <li>Constitution: {playerBattleStats.baseConstitution.toString()}</li>
            </List>

            <p>You have ${playerBalance.toString()}</p>
        </Wrapper>
    );
};

export default Profile;
