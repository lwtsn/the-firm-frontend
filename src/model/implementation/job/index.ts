import { Industries, Industry } from '@app/model/job/Job';
import { Degenerate } from '@app/model/implementation/job/degenerate';

const Legitimate: Industry = {
    description: 'Always looking to innovate and provide value to  the community',
    jobs: [],
    name: 'Legitimate',
};

const Criminal: Industry = {
    description: 'Fuck everyone, as long as you get rich',
    jobs: [],
    name: 'Criminal',
};

export const IndustryList: Industries = {
    industries: {
        legitimate: Legitimate,
        degenerate: Degenerate,
        criminal: Criminal,
    },
};
