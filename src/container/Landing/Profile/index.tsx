import React, { useEffect, useState } from 'react';
import { List, Wrapper } from './styled';
import { getPlayerContract, getPlayerStatsContract, getTreasuryContract } from '@app/web3/contracts';
import { getCurrentAddress } from '@app/web3/utils';
import { PlayerStats } from '@app/model/player/PlayerStats';
import { PlayerBattleStats } from '@app/model/player/PlayerBattleStats';
import { BigNumber } from 'ethers';
import { fromEtherToNumber, fromEtherToNumberWithPlaces } from '@app/lib/numbers';

const Profile: React.FC = () => {
    const address = getCurrentAddress();

    const playerContract = getPlayerContract();
    const playerStatsContract = getPlayerStatsContract();
    const treasuryContract = getTreasuryContract();

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
        treasuryContract.balances(address).then(setPlayerBalance);
    }, [treasuryContract, address]);

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
                <li>Strength: {fromEtherToNumberWithPlaces(playerBattleStats.baseStrength, 2)}</li>
                <li>Dexterity: {fromEtherToNumberWithPlaces(playerBattleStats.baseDexterity, 2)}</li>
                <li>Defence: {fromEtherToNumberWithPlaces(playerBattleStats.baseDefence, 2)}</li>
                <li>Constitution: {fromEtherToNumberWithPlaces(playerBattleStats.baseConstitution, 2)}</li>
            </List>

            <p>You have ${playerBalance.toString()}</p>
        </Wrapper>
    );
};

export default Profile;
