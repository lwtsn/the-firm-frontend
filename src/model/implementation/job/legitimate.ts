import { Industry, Job } from '@app/model/job/Job';

const HouseChores: Job = {
    salary: 50,
    description: 'You keep your room clean and wash your own clothes, mum gives you a reasonable allowance.',
    name: 'House Chores',
};

const PaperDelivery: Job = {
    salary: 200,
    description: "You have to wake up early morning, rain or shine to deliver these papers. It's a tough grind.",
    name: 'Paper Delivery',
};

const Busser: Job = {
    salary: 750,
    description: 'Your first weekend job. Clearing tables at your local cafe.',
    name: 'Busser',
};

const WebDeveloper: Job = {
    salary: 2000,
    description:
        "Mum's friends found out you are quite good with computer, they've tasked you with building them a website.",
    name: 'Web Developer',
};

const Programmer: Job = {
    salary: 2000,
    description:
        "You've moved on from building websites for local business and secured a role working for a large financial institution.",
    name: 'Programmer',
};

const SmartContractEngineer: Job = {
    salary: 2000,
    description: 'You spend your days writing smart contracts for the future of finance.',
    name: 'Smart contract engineer',
};

export const Legitimate: Industry = {
    description: 'Always looking to innovate and provide value to  the community',
    jobs: [HouseChores, PaperDelivery, Busser, WebDeveloper, Programmer, SmartContractEngineer],
    name: 'Legitimate',
};
