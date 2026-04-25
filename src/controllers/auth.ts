import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Username and password are required' });
            return;
        }

        const existingUser = await prisma.user.findUnique({
            where: { username }
        });
        if (existingUser) {
            res.status(400).json({ error: 'Username already in use' });
            return;
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPass
            },
            select: { // ei salasanaa responseen
                id: true,
                username: true,
                createdAt: true
            }
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Username and password are required' });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { username }
        });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET as string, //tää pitää lisätä .enviin
            { expiresIn: '24h' }
        );

        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
};

