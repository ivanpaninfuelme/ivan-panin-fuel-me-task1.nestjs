export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    website: string;
    company: Company;
}

