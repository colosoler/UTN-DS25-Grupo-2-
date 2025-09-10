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


export async function createUser(req: Request< {}, {}, CreateUserRequest>, res: Response<UserData>, next: NextFunction){
 try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
 } catch (error) {
 next(error);
 }
}


export async function updateUser(req: Request<{ id: string }, {}, UpdateUserRequest>, res: Response<UserData>, next: NextFunction) {
 try {
    const id = parseInt(req.params.id);
    const updatedUser = await userService.updateUser(id, req.body);
    res.json( updatedUser);
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
