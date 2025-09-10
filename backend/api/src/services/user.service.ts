import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import { CreateUserRequest , UpdateUserRequest , UserData } from
'../types/user.types' ;

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


export async function getAllUsers(): Promise<UserData[]> {
 const users = await prisma.user.findMany({
 orderBy: { id: 'asc' },
 include: { career: true }
 });
 return users;
}


export async function getUserById(id: number): Promise<UserData> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { career: true}
  });
  if (!user) {
    const error = new Error('User not found');
    (error as any).statusCode = 404;
    throw error;
  }
  return user;
}

export async function createUser(data: CreateUserRequest):Promise<UserData> {
 const exists = await prisma.user.findUnique({ where: { email: data.email },});
 if (exists) {
 const error = new Error('Email already registered') as any;
 error.statusCode = 409;
 throw error;
 }
const { careerId, ...userData } = data;
 const hashedPassword = await bcrypt.hash(data.password, 10);
 const user = await prisma.user.create({
 data: {
  ...userData,
  password: hashedPassword,
  career: {
    connect: {
      id: careerId
    }
  }
 },
 });
 return user;
}


export async function updateUser(id: number, data: UpdateUserRequest ): Promise<UserData> {
 try {
   const updateData: Partial<UpdateUserRequest> = {...data };
   if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
   }else {
    delete (updateData as any).password;
   }
   return await prisma.user.update({
    where: { id },
    data: updateData,
   });
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
