export interface User {
    id: number;
    name: string;
    surname: string;
    careerId: number;
    email: string;
    password: string;    
}

export interface UserData extends Omit<User, 'password'> {}

export interface CreateUserRequest {
    name: string;
    surname: string;
    careerId: number;
    email: string;
    password: string;
    username: string;
}


export interface UpdateUserRequest {
    name?: string;
    surname?: string;
    careerId?: number;
    email?: string;
    password?: string;
    username?: string;
}
