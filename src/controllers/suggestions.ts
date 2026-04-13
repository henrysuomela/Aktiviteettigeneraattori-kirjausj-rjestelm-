import type { Request, Response } from 'express';

export const getAllSuggestions = async (req: Request, res: Response) => {

};

export const generateSuggestion = async (req: Request, res: Response) => {
    const { categoryId } = req.body;
};

export const getSuggestionById = async (req: Request, res: Response) => {
    const { id } = req.params;
};

export const acceptSuggestion = async (req: Request, res: Response) => {
    const { id } = req.params;
};