import { AuthorProfileResource } from '@app/repository/_resource/AuthorProfile';

export interface UserResource {
    id: number;
    name: string;
    email: string;
    author_profile: AuthorProfileResource;
}
