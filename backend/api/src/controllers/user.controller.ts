import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export async function getAllUsers(req: Request, res:Response, next: NextFunction) {
 try {
 const users = await userService.getAllUsers();
 res.json({ success: true, data: users });
 } catch (error) {
 next(error);
 }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
 try {
 const id = parseInt(req.params.id);
 const user = await userService.getUserById(id);
 res.json({ success: true, data: user });
 } catch (error) {
 next(error);
 }
}

export async function createUser(req: Request, res: Response, next: NextFunction){
 try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ success: true, message: 'User created successfully.', data: newUser});
 } catch (error) {
 next(error);
 }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
 try {
    const id = parseInt(req.params.id);
    const updatedUser = await userService.updateUser(id, req.body);
    res.json({ success: true, message: 'User updated successfully.', data: updatedUser });
 } catch (error) {
    next(error);
 }
}

export async function deleteUser(req: Request, res: Response,
next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    await userService.deleteUser(id);
    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
}
