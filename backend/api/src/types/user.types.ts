export interface User {
    id: number;
    name: string;
    surname: string;
    career: string;
    email: string;
    password: string;    
}

export interface CreateUserRequest {
    name: string;
    surname: string;
    career: string;
    email: string;
    password: string;
}

export interface UpdateUserRequest {
    name?: string;
    surname?: string;
    career?: string;
    email?: string;
    password?: string; 
}