export interface Industries {
    industries: {
        [key: string]: Industry;
    };
}

export interface Industry {
    name: string;
    description: string;
    jobs: Job[];
}

export interface Job {
    name: string;
    description: string;
    salary: number;
}
