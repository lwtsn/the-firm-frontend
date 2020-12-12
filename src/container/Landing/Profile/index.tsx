import React, { useEffect, useState } from 'react';
import { List, Wrapper } from './styled';
import { getPlayerStatsContract } from '@app/web3/contracts';
import { getCurrentAddress } from '@app/web3/utils';
import { PlayerStats } from '@app/model/player/PlayerStats';
import { PlayerBattleStats } from '@app/model/player/PlayerBattleStats';

const Profile: React.FC = () => {
    const address = getCurrentAddress();
    const playerStatsContract = getPlayerStatsContract();
    const [playerStats, setPlayerStats] = useState<PlayerStats>(undefined);
    const [playerBattleStats, setPlayerBattleStats] = useState<PlayerBattleStats>(undefined);

    useEffect(() => {
        playerStatsContract.getPlayerStats(address).then((playerStats: PlayerStats) => {
            setPlayerStats(playerStats);
        });
    }, [playerStatsContract, address, setPlayerStats]);

    useEffect(() => {
        playerStatsContract.getPlayerBattleStats(address).then((playerBattleStats: PlayerBattleStats) => {
            setPlayerBattleStats(playerBattleStats);
        });
    }, [playerStatsContract, address, setPlayerBattleStats]);

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
        </Wrapper>
    );
};

export default Profile;
