import axios from 'axios';
import { User } from './interfaces/user.interface';
import { Post } from './interfaces/post.interface';
import { UserWithPosts } from './interfaces/user-with-posts.interface';
import { createLogger } from '../utils/logger.util';

export class ReportGenerator{
    private readonly urlUsers: string = "https://jsonplaceholder.typicode.com/users";
    private readonly urlPosts: string = "https://jsonplaceholder.typicode.com/posts";

    private fetchLogger = createLogger('fetchData');
    private reportLogger = createLogger('generateReport');

    private async fetchData<T>(url: string): Promise<T>{
        try {
            this.fetchLogger(`Start fetching from ${url}`);
            const res = await axios.get<T>(url);
            this.fetchLogger(`Successfully fetched data from ${url}`);
            return res.data;
        } catch(error) {
            this.fetchLogger("Fetch failed: " + (error as Error).message);
            throw new Error("Fetch failed: " + (error as Error).message);
        }
    }

    private fetchUsers(): Promise<User[]> {
        return this.fetchData<User[]>(this.urlUsers);
    }
    private fetchPosts(): Promise<Post[]> {
        return this.fetchData<Post[]>(this.urlPosts);
    }

    public async generateReport(limit?: number): Promise<UserWithPosts[]> {

        this.reportLogger("Start generatting...");
        const users = await this.fetchUsers();
        const posts = await this.fetchPosts();
        const limitedUsers = limit && limit > 0 ? users.slice(0, limit) : users;

        this.reportLogger("Fill report for " + limit + " users");

        const report: UserWithPosts[] = limitedUsers.map((u) => {
            const oneUserPosts = posts.filter((p) => p.userId === u.id);
            return {
                id: u.id,
                name: u.name,
                username: u.username,
                email: u.email,
                posts: oneUserPosts,
              }
            });
            this.reportLogger("Generatting report ended!");
            return report;
    }
}