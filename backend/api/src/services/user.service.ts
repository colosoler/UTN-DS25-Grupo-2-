import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import { CreateUserRequest , UpdateUserRequest , UserData } from
'../types/user.types' ;
import cloudinary from '../config/cloudinary';

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
    select: {
      id: true,
      name: true,
      surname: true,
      username: true,
      email: true,
      careerId: true,
      career: true,
      createdAt: true,
      updatedAt: true,
      profilePicture: true,
    }
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
 const hashedPassword = await bcrypt.hash(data.password, 10);
 const user = await prisma.user.create({
 data: {
  ...data,
  password: hashedPassword,
  careerId: data.careerId,
 },
 include: {
  career: true,
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
    data: {
      ...updateData,
      careerId: data.careerId, 
    },
    include: {
      career: true,
    }
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

export async function updateUserProfilePicture(id: number, imageUrl: string) {
  return prisma.user.update({
    where: { id },
    data: { profilePicture: imageUrl },
  });
}

export async function deleteUserProfilePicture(id: number) {
  // Primero obtenemos la URL actual
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');

  // Si la URL existe y es de Cloudinary, borramos la imagen
  if (user.profilePicture) {
    try {
      const publicIdMatch = user.profilePicture.match(/\/([^\/]+)\.[a-zA-Z]+$/);
      if (publicIdMatch) {
        const publicId = publicIdMatch[1];
        await cloudinary.uploader.destroy(publicId);
      }
    } catch (error) {
      console.error('Error al borrar la imagen de Cloudinary', error);
    }
  }

  // Borramos la URL de la DB
  return prisma.user.update({
    where: { id },
    data: { profilePicture: null },
  });
}

