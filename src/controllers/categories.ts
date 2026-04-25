import type { Request, Response, NextFunction } from 'express';
import type { AuthenticationRequest } from '../middleware/authenticate.js';
import { prisma } from '../lib/prisma.js';
export const getAllCategories = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    }
    catch (error) {
        next(error);
    }
};

export const createCategory = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Name is required' });
            return;
        }
        const newCategory = await prisma.category.create({
            data: { name }
        });
        res.status(201).json(newCategory);
    }
    catch (error) {
        next(error);
    }
};

export const getCategoryById = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const parsedId = parseInt(id as string);
        const category = await prisma.category.findFirst({
            where: { id: parsedId }
        });
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.status(200).json(category);
    }
    catch (error) {
        next(error);
    }
};