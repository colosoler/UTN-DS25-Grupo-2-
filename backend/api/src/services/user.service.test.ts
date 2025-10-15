import { createUser } from './user.service'
import prisma from '../config/prisma';
import { CreateUserRequest } from '../types/user.types';

jest.mock('../config/prisma', () => ({
user: {
 findUnique: jest.fn(),
 create: jest.fn(),
 }
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword123'),
}));

describe('UserService - createUser', () => {
    const mockUserData: CreateUserRequest = { 
        name: 'Dante',
        surname: 'Barbé',
        careerId: 1,
        email: 'dante_0312@hotmail.com',
        password: 'Dante03',
        username: 'dantebarbe',
        role: 'USER',
    };
    beforeEach(() => {
        (prisma.user.findUnique as jest.Mock).mockClear();
        (prisma.user.create as jest.Mock).mockClear();
        (require('bcrypt').hash as jest.Mock).mockClear();
    });
    test('debe crear un usuario exitosamente', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        const mockCreatedUser = {
            id: 10,
            ...mockUserData,
            password: 'hashedPassword123',
            career: {id: 1, name: '...' }
        };

        (prisma.user.create as jest.Mock).mockResolvedValue(mockCreatedUser);

        const result = await createUser(mockUserData);

        expect(result).toEqual(mockCreatedUser);

        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: mockUserData.email } });

        expect(require('bcrypt').hash).toHaveBeenCalledWith(mockUserData.password, 10);

        expect(prisma.user.create).toHaveBeenCalledWith({
            data: {
                ...mockUserData,
                password: 'hashedPassword123',
            },
            include: { career: true },
        });
    });

    test('debe lanzar error 409 si el email ya esta registrado', async () => {
        const existingUser = { 
            id: 5, 
            name: 'Nestor',
            surname: 'Barbé',
            careerId: 1,
            email: 'dante_0312@hotmail.com',
            password: 'hashedPassword1234',
            username: 'nestorbarbe',
            role: 'USER'
        };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);

    await expect(createUser(existingUser as any)).rejects.toThrow('Email already registered');

    expect(prisma.user.findUnique).toHaveBeenCalled();
    expect(prisma.user.create).not.toHaveBeenCalled();
    expect(require('bcrypt').hash).not.toHaveBeenCalled();
    });
});
