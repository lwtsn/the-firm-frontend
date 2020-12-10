import { createDomain } from 'effector';
import { AuthorProfileResource } from '@app/repository/_resource/AuthorProfile';
import repository from '@app/repository';

const domain = createDomain('author-profile');

if (process.env.NODE_ENV === 'development') {
    import('effector-logger/attach').then((module) => module.attachLogger(domain));
}

export const $single = domain.createStore<AuthorProfileResource>(null);
export const fetchProfile = domain.createEffect<void, AuthorProfileResource>({
    async handler() {
        return await repository.me().authorProfile().get();
    },
});

$single.on(fetchProfile.doneData, (_, data) => data);
