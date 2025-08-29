import prisma from '../config/prisma';
import { User } from '../generated/prisma';

/*
let users: User[] = [
  { id: 1, name: 'Santiago', surname: 'Andrada', career: 'Ingeniería en Sistemas', email: 'santiagoandrada@gmail.com', password: '1234' },
  { id: 2, name: 'Franco', surname: 'Arce', career: 'Ingeniería Mecánica', email: 'arcefranco@gmail.com', password: '1234' },
  { id: 3, name: 'Dante', surname: 'Barbé', career: 'Ingeniería en Sistemas', email: 'barbedante@gmail.com', password: '1234' },
  { id: 4, name: 'Nicolas', surname: 'Diez', career: 'Ingeniería Civil', email: 'dieznicolas@gmail.com', password: '1234' },
  { id: 5, name: 'Ramiro', surname: 'Gil', career: 'Ingeniería Eléctrica', email: 'gilramiro@gmail.com', password: '1234' },
  { id: 6, name: 'Tomas', surname: 'Soler', career: 'Ingeniería Química', email: 'solertomas@gmail.com', password: '1234' }
];
*/

export async function getAllUsers(): Promise<User[]> {
 const users = await prisma.user.findMany({
 orderBy: { id: 'asc' },
 include: { materiales: true }
 });
 return users;
}

export async function getUserById(id: number): Promise<User> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { materiales: true }
  });

  if (!user) {
    const error = new Error('User not found');
    (error as any).statusCode = 404;
    throw error;
  }
  return user;
}

export async function createUser(data: {name: string, surname: string, email: string, username: string, password: string}):Promise<User> {
 return prisma.user.create({data});
}

export async function updateUser(id: number, data: Partial<User> ): Promise<User> {

 try {
   return await prisma.user.update({ where: { id }, data });
 } catch (e: any) {
   if (e.code === 'P2025') {
     const error = new Error('User not found' ) as any;
     error.statusCode  = 404;
     throw error;
   }
   throw e;
 }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('User not found');
      (error as any).statusCode = 404;
      throw error;
    }
    throw e;
  }
}