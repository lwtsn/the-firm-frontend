import { Industries } from '@app/model/job/Job';
import { Degenerate } from '@app/model/implementation/job/degenerate';
import { Legitimate } from '@app/model/implementation/job/legitimate';
import { Criminal } from '@app/model/implementation/job/criminal';

export const IndustryList: Industries = {
    industries: {
        legitimate: Legitimate,
        degenerate: Degenerate,
        criminal: Criminal,
    },
};
