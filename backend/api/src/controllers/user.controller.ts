import { Request, Response, NextFunction } from 'express';
import { CreateUserRequest, UpdateUserRequest, UserData} from '../types/user.types';
import * as userService from '../services/user.service';


export async function getAllUsers(req: Request, res:Response<UserData[]>, next: NextFunction) {
 try {
 const users = await userService.getAllUsers();
 res.json(users);
 } catch (error) {
 next(error);
 }
}


export async function getUserById(req: Request<{id: string}>, res: Response<UserData>, next: NextFunction) {
 try {
 const id = parseInt(req.params.id);
 const user = await userService.getUserById(id);
 res.json(user)
 } catch (error) {
 next(error);
 }
}


export async function createUser(req: Request, res: Response, next: NextFunction){
  console.log("Controller - req.body:", req.body);
 try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      data: user
    });
 } catch (error) {
 next(error);
 }
}


export async function updateUser(req: Request, res: Response, next: NextFunction) {
 try {
    const id = parseInt(req.params.id);
    const user = await userService.updateUser(id, req.body);
    res.status(200).json({
      success: true,
      data: user,
    });
 } catch (error) {
    next(error);
 }
}


export async function deleteUser(req: Request<{ id: string }>, res: Response,
next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    await userService.deleteUser(id);
    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
}

export async function updateProfilePicture(
  req: Request<{ id: string }>,
  res: Response<{ success: boolean; data?: UserData; message?: string }>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const file = req.file as any; 

    if (!file || !file.path) {
      return res.status(400).json({ success: false, message: 'No se envió ninguna imagen' });
    }

    console.log("req.file:", req.file);
    const updatedUser = await userService.updateUserProfilePicture(Number(id), file.path);

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: 'Foto de perfil actualizada correctamente',
    });
  } catch (error) {
    next(error);
  }
}


export async function deleteProfilePicture(
  req: Request<{ id: string }>,
  res: Response<{ success: boolean; message?: string; data?: UserData }>,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const updatedUser = await userService.deleteUserProfilePicture(id);

    res.status(200).json({
      success: true,
      message: 'Foto de perfil eliminada correctamente',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}