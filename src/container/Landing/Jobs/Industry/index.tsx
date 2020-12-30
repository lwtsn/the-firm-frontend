import React from 'react';
import { Wrapper } from '../styled';
import { useParams } from 'react-router-dom';
import Job from '@app/container/Landing/Jobs/Industry/Job';
import { IndustryList } from '@app/model/implementation/job';

const Industry: React.FC = (props) => {
    const { industryName } = useParams<{ industryName: string }>();

    const industry = IndustryList.industries[industryName];

    const jobsJsx = [];

    for (const key in industry.jobs) {
        jobsJsx.push(
            <div key={key} className={'col-xs-4'}>
                <Job industryName={industryName} jobId={key} />
            </div>,
        );
    }

    return (
        <Wrapper>
            <h1>{industry.name} jobs</h1>
            <div className={'row mb-1'}>{jobsJsx}</div>
        </Wrapper>
    );
};

export default Industry;
