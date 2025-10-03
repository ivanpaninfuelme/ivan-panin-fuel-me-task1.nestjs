import { User } from './user.interface';
import { Post } from './post.interface';

export interface UserWithPosts {
    id: number;
    name: string;
    username: string;
    email: string;
    posts: Post[];
}
