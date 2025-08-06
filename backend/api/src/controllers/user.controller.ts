import { Request, Response, NextFunction } from 'express';
import { User, CreateUserRequest, UpdateUserRequest,
UserResponse, UsersListResponse } from '../types/user.types';
import * as userService from '../services/user.service';

export async function getAllUsers(req: Request, res:Response<UsersListResponse>, next: NextFunction) {
 try {
 const users = await userService.getAllUsers();
 res.json({
 users,
 total: users.length
 });
 } catch (error) {
 next(error);
 }
}

export async function getUserById(req: Request, res: Response<UserResponse>, next: NextFunction) {
 try {
 const { id } = req.params;
 const user = await userService.getUserById(parseInt(id));
 res.json({
 user,
 message: 'User finded.'
 });
 } catch (error) {
 next(error);
 }
}

export async function createUser(req: Request<{}, UserResponse, CreateUserRequest>, res: Response<UserResponse>, next: NextFunction){
 try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({
        user: newUser,
        message: 'User created.'
    });
 } catch (error) {
 next(error);
 }
}

export async function updateUser(req: Request<{ id: string }, UserResponse , UpdateUserRequest >, res: Response<UserResponse>, next: NextFunction) {
 try {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(parseInt(id), req.body);
    res.json({
        user: updatedUser,
        message: 'User updated.'
    });
 } catch (error) {
    next(error);
 }
}

export async function deleteUser(req: Request<{ id: string }>, res: Response<{ message: string }>,
next: NextFunction) {
  try {
    const { id } = req.params;
    await userService.deleteUser(parseInt(id));

    res.json({
      message: 'User deleted.'
    });
  } catch (error) {
    next(error);
  }
}