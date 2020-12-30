import React from 'react';
import { Wrapper } from '../styled';
import Industry from '@app/container/Landing/Jobs/IndustryList/Industry';
import { IndustryList } from '@app/model/implementation/job';

const Industries: React.FC = () => {
    const industries = IndustryList.industries;

    const industryJsx = [];

    for (const key in industries) {
        industryJsx.push(
            <div key={key} className={'col-xs-4'}>
                <Industry id={key} />
            </div>,
        );
    }

    return (
        <Wrapper>
            <div className={'row mb-1'}>{industryJsx}</div>
        </Wrapper>
    );
};

export default Industries;
