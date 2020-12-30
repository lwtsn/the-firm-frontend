import React from 'react';
import { Wrapper } from '../styled';
import { Button, Card, Classes, H4 } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import { IndustryList } from '@app/model/implementation/job';
import { Industry as IndustryModel } from '@app/model/job/Job';

const Industry = (props) => {
    const { id } = props;
    const history = useHistory();

    const industry: IndustryModel = IndustryList.industries[id];

    return (
        <Wrapper>
            <Card>
                <H4>{industry.name}</H4>
                <p>{industry.description}</p>
                <Button
                    onClick={() => history.push(`/job/${industry.name.toLowerCase()}`)}
                    text="View roles"
                    className={Classes.BUTTON}
                />
            </Card>
        </Wrapper>
    );
};

export default Industry;
