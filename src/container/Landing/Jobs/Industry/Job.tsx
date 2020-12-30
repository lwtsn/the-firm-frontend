import React from 'react';
import { Wrapper } from '../styled';
import { Card, H3 } from '@blueprintjs/core';
import { IndustryList } from '@app/model/implementation/job';
import { Job as JobModel } from '@app/model/job/Job';

const Job = (props) => {
    const { industryName, jobId } = props;

    const job: JobModel = IndustryList.industries[industryName].jobs[jobId];

    return (
        <Wrapper>
            <Card>
                <H3>{job.name}</H3>
                <p>{job.description}</p>
                <p>Salary: {job.salary}</p>
            </Card>
        </Wrapper>
    );
};

export default Job;
