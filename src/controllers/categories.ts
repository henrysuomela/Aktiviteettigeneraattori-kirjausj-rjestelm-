import type { Request, Response } from 'express';

export const getAllCategories = async (req: Request, res: Response) => {
  
};

export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;
};

export const getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
};