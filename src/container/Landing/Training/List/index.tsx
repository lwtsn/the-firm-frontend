import React from 'react';
import { Wrapper } from '../styled';
import Stat from '@app/container/Landing/Training/List/Stat';

const List: React.FC = () => {
    return (
        <Wrapper>
            <Stat id={1} />
            <Stat id={2} />
            <Stat id={3} />
            <Stat id={4} />
        </Wrapper>
    );
};

export default List;
