import { login } from './auth.service';
import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../config/prisma', () => ({
  user: {
    findUnique: jest.fn(),
  },
}));

//Mock de bcrypt
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

//Mock de jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

//Mock de variables de entorno
const mockJwtSecret = 'test_secret_key';
const mockJwtExpiresIn = 7200; // 1 hora
process.env.JWT_SECRET = mockJwtSecret;
process.env.JWT_EXPIRES_IN = String(mockJwtExpiresIn);

describe('AuthService - login', () => {

  const mockUserDb = {
    id: 1,
    email: 'test@example.com',
    password: 'Password123',
    role: 'USER',
    name: 'Test User',
  };
  
  const loginRequestData = {
    email: 'test@example.com',
    password: 'Password123',
  };

  const mockToken = 'mock_jwt_token_signed';

  // Limpia los mocks antes de cada test
  beforeEach(() => {
    jest.clearAllMocks();
  });

    //Login válido:
  test('debe retornar el usuario (sin password) y el token JWT si las credenciales son válidas', async () => {
    // ARRANGE
    const { password: _, ...userWithoutPassword } = mockUserDb;

    //Usuario encontrado en DB:
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUserDb);
    
    //Contraseña válida:
    (bcrypt.compare as jest.Mock).mockResolvedValue(true); 
    
    //Generación del token JWT: 
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    // ACT
    const result = await login(loginRequestData);

    // ASSERT
    expect(result).toEqual({
      user: userWithoutPassword,
      token: mockToken,
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: loginRequestData.email },
    });
    
    expect(bcrypt.compare).toHaveBeenCalledWith(
      loginRequestData.password, 
      mockUserDb.password 
    );

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockUserDb.id, email: mockUserDb.email, role: mockUserDb.role }, // Payload
      mockJwtSecret, // Secret
      { expiresIn: mockJwtExpiresIn } // Options
    );
  });

  //Usuario inválido: 
  test('debe lanzar error 401 si el usuario no existe', async () => {
    // ARRANGE
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    // ACT & ASSERT
    await expect(login(loginRequestData)).rejects.toThrow('Las credenciales ingresadas no son válidas');
    await expect(login(loginRequestData)).rejects.toHaveProperty('statusCode', 401);
    
    
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  //Contraseña inválida:
  test('debe lanzar error 401 si la contraseña es inválida', async () => {
    // ARRANGE
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUserDb);
    
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    // ACT & ASSERT
    await expect(login(loginRequestData)).rejects.toThrow('Las credenciales ingresadas no son válidas');
    await expect(login(loginRequestData)).rejects.toHaveProperty('statusCode', 401);

    expect(bcrypt.compare).toHaveBeenCalled();
    expect(jwt.sign).not.toHaveBeenCalled();
  });
});