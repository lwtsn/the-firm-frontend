import React, { useCallback, useEffect, useState } from 'react';
import { Wrapper } from './styled';
import { getCurrentAddress } from '@app/web3/utils';
import { getPlayerContract } from '@app/web3/contracts';
import { Button, Classes, NavbarGroup } from '@blueprintjs/core';

const Profile: React.FC = () => {
    const userAddress = getCurrentAddress();
    const playerContract = getPlayerContract();
    const [isPlayer, setIsPlayer] = useState(null);

    useEffect(() => {
        async function isPlayer(): Promise<void> {
            await playerContract.isPlayer(userAddress).then(setIsPlayer);
        }

        isPlayer();
    }, [userAddress, playerContract, setIsPlayer]);

    const createAccount = useCallback(async () => {
        await playerContract.create();
    }, [playerContract]);

    if (null == isPlayer) {
        return <div>Loading..</div>;
    }

    if (false == isPlayer) {
        return (
            <div>
                <Button onClick={createAccount}>Create</Button>
            </div>
        );
    }

    return <Wrapper>sup</Wrapper>;
};

export default Profile;
