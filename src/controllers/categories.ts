import type { Request, Response, NextFunction } from 'express';

export const getAllCategories = async (req: Request, res: Response) => {
  
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(404).json({ error: 'Name is required' });
            return;
        }
        const newCategory = await //luodaan kategoria databaseen
        res.status(201).json(newCategory.rows[0]);
    }
    catch (error) {
        next(error);
    }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await //haetaan databasesta
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