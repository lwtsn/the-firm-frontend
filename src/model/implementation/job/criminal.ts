import { Industry, Job } from '@app/model/job/Job';

const StealFromMumsPurse: Job = {
    salary: 200,
    description: "Mum's always leaving money in her purse, well clearly you need it more than she does.",
    name: 'Steal from mums purse',
};

const SellWeed: Job = {
    salary: 750,
    description:
        "Your 'friend' has recently 'acquired' a rather notable amount of weed, you spend your day selling it out your Subaru Impreza to teenagers.",
    name: 'Sell weed',
};

const RugPull: Job = {
    salary: 1500,
    description:
        "Your evenings are spent making elaborate rug-pull schemes, you've even got some of twitters top influencers involved.",
    name: 'Rug Pull',
};

const SomethingShitty: Job = {
    salary: 1500,
    description: "I can't be bothered to think of more roles.",
    name: 'change this',
};

const SomethingEvenShittier: Job = {
    salary: 1500,
    description: "I can't be bothered to think of more roles.",
    name: 'change this',
};

const Politician: Job = {
    salary: 1500,
    description:
        "You used to be such a nice kid, now your mum hardly recognises you. You've turned into a real piece of shit.",
    name: 'Politician',
};

export const Criminal: Industry = {
    description: 'Fuck everyone, as long as you get rich',
    jobs: [StealFromMumsPurse, SellWeed, RugPull, SomethingShitty, SomethingEvenShittier, Politician],
    name: 'Criminal',
};
