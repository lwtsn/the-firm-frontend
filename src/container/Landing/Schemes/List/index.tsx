import React from 'react';
import { Wrapper } from '../styled';
import Scheme from '@app/container/Landing/Schemes/List/Scheme';

const Schemes: React.FC = () => {
    return (
        <Wrapper>
            {/*<Scheme id={1} />*/}
            {/*<Scheme id={2} />*/}
            <Scheme id={3} />
        </Wrapper>
    );
};

export default Schemes;
