import React, { useEffect, useState } from 'react';
import { Wrapper } from '../styled';
import { getSchemesContract } from '@app/web3/contracts';
import { BigNumber } from 'ethers';

const Scheme = (props) => {
    const { id } = props;

    const schemesContract = getSchemesContract();

    const [scheme, setScheme] = useState();

    useEffect(() => {
        async function getScheme(): Promise<void> {
            await schemesContract.schemes(id).then(setScheme);
        }

        getScheme();
    }, [schemesContract, setScheme, id]);

    useEffect(() => {
        async function getScheme(): Promise<void> {
            await schemesContract.schemes(id).then(setScheme);
        }

        getScheme();
    }, [schemesContract, setScheme, id]);

    if (undefined == scheme) {
        return <div>Scheme not found</div>;
    }

    return <Wrapper>Scheme baby</Wrapper>;
};

export default Scheme;
