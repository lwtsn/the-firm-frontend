import { Industry, Job } from '@app/model/job/Job';

const VideoGamer: Job = {
    salary: 200,
    description: "It doesn't pay anything, but your mum gives you some pocket money for tendies.",
    name: 'Video gamer',
};

const LarpOnTwitter: Job = {
    salary: 750,
    description:
        "Donning your favourite pepe meme, you spend your days shilling shit coins from your mums basement. It ain't much, but it's dishonest work.",
    name: 'Twitter Larper',
};

const FastFoodWorker: Job = {
    salary: 1500,
    description:
        "It doesn't pay much but at least mum wont kick you out the house. Plus you can make a few extra bucks selling your coworkers sess weed.",
    name: 'Fast food worker',
};

const DayTrader: Job = {
    salary: 4500,
    description:
        "You've joined dozens of telegram groups, you watch the markets 24/7 and to be honest, you're quite good.",
    name: 'Day Trading',
};

const CorporateSales: Job = {
    salary: 10000,
    description:
        "It's a step up from your other jobs, uncle Jim took pity on you and gave you a job selling insurance.",
    name: 'Corporate Sales',
};

const Executive: Job = {
    salary: 25000,
    description:
        "Everyone knows you didn't earn this job on merit. Doesn't stop you spending most of the day hitting on the receptionists and taking 3 hour lunch breaks.",
    name: 'Executive',
};

export const Degenerate: Industry = {
    description: 'Only for the biggest Chads around, high risk jobs lead to high reward',
    jobs: [VideoGamer, LarpOnTwitter, FastFoodWorker, DayTrader, CorporateSales, Executive],
    name: 'Degenerate',
};
