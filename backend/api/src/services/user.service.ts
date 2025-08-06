import { User, CreateUserRequest, UpdateUserRequest } from '../types/user.types';

let users: User[] = [
  { id: 1, name: 'Santiago', surname: 'Andrada', career: 'Ingeniería en Sistemas', email: 'santiagoandrada@gmail.com', password: '1234' },
  { id: 2, name: 'Franco', surname: 'Arce', career: 'Ingeniería Mecánica', email: 'arcefranco@gmail.com', password: '1234' },
  { id: 3, name: 'Dante', surname: 'Barbé', career: 'Ingeniería en Sistemas', email: 'barbedante@gmail.com', password: '1234' },
  { id: 4, name: 'Nicolas', surname: 'Diez', career: 'Ingeniería Civil', email: 'dieznicolas@gmail.com', password: '1234' },
  { id: 5, name: 'Ramiro', surname: 'Gil', career: 'Ingeniería Eléctrica', email: 'gilramiro@gmail.com', password: '1234' },
  { id: 6, name: 'Tomas', surname: 'Soler', career: 'Ingeniería Química', email: 'solertomas@gmail.com', password: '1234' }
];


export async function getAllUsers(): Promise<User[]> {
  return users;
}

export async function getUserById(id: number): Promise<User> {
  const user = users.find(user => user.id === id);
  if (!user) {
    const error = new Error('User not found');
    (error as any).statusCode = 404;
    throw error;
  }
  return user;
}

export async function createUser(userData: CreateUserRequest): 
Promise<User> {
 //Reglas de negocio:
 if (userData.password.length < 8) {
   const error = new Error('Password must be more than 8 characters long');
   (error as any).statusCode = 400;
   throw error;
 }
 const newUser: User = {
   id: users.length ? Math.max(...users.map(user => user.id)) + 1 : 1,
   ...userData,
 };
 users.push(newUser);
 return newUser;
}

export async function updateUser(id: number, updateData: 
UpdateUserRequest): Promise<User> {
 const userIndex = users.findIndex(user => user.id === id);
 if (userIndex === -1) {
   const error = new Error('User not found');
   (error as any).statusCode = 404;
   throw error;
 }
 // Validar contraseña si viene en el update
 if (updateData.password !== undefined && updateData.password.length < 8) {
   const error = new Error('Password must be more than 8 characters long');
   (error as any).statusCode = 400;
   throw error;
 }
 users[userIndex] = { ...users[userIndex], ...updateData };
 return users[userIndex];
}

export async function deleteUser(id: number): Promise<void> {
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    const error = new Error('User not found');
    (error as any).statusCode = 404;
    throw error;
  }
  users.splice(userIndex, 1); 
}