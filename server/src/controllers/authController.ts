import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel';
import { RegisterSchema, LoginSchema } from '../types/user';
import { AppError, asyncHandler } from '../middleware/errorHandler';

const generateToken = (id: number, email: string): string => {
  return jwt.sign(
    { id, email },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const validatedData = RegisterSchema.parse(req.body);

    const existingUser = await userModel.findByEmail(validatedData.email);
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    const user = await userModel.create(validatedData);
    const token = generateToken(user.id, user.email);

    res.status(201).json({
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      },
    });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const validatedData = LoginSchema.parse(req.body);

    const user = await userModel.findByEmail(validatedData.email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await userModel.verifyPassword(
      validatedData.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = generateToken(user.id, user.email);

    res.json({
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      },
    });
  }),
};
