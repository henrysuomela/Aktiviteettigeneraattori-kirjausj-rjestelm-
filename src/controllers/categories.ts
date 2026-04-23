import type { Request, Response, NextFunction } from 'express';
import type { AuthenticationRequest } from '../middleware/authenticate.js';
import {PrismaClient} from '@prisma/client/extension';
const prisma = new PrismaClient();
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
        const userId = req.user?.id;
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Name is required' });
            return;
        }
        const newCategory = await //luodaan kategoria databaseen userId:lle
        res.status(201).json(newCategory.rows[0]);
    }
    catch (error) {
        next(error);
    }
};

export const getCategoryById = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const category = await //haetaan databasesta id:n ja userId:n perusteella
        if (!category.rows[0]) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.status(200).json(category.rows[0]);
    }
    catch (error) {
        next(error);
    }
};