import type { Request, Response, NextFunction } from 'express';
import type { AuthenticationRequest } from '../middleware/authenticate.js';
import { PrismaClient } from '@prisma/client/extension';
const prisma = new PrismaClient();
export const getAllSuggestions = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const suggestions = await prisma.suggestion.findMany();
        res.status(200).json(suggestions);
    }
    catch (error) {
        next(error);
    }

};

export const generateSuggestion = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    const { categoryId } = req.body;
    try {
        if (!categoryId) {
            res.status(400).json({ error: 'Category ID is required' });
            return;
        }
        const newSuggestion = await prisma.suggestion.create({
            data: {
                categoryId,
                userId: req.user?.id || 0,
                accepted: false
            }
        });
        res.status(201).json(newSuggestion);
}    catch (error) {
        next(error);
    }
};

export const getSuggestionById = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const suggestion = await //haetaan databasesta id:n ja userId:n perusteella
        if (!suggestion.rows[0]) {
            res.status(404).json({ error: 'Suggestion not found' });
            return;
        }
        res.status(200).json(suggestion.rows[0]);
    }
    catch (error) {
        next(error);
    }
};

export const acceptSuggestion = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const suggestion = await //haetaan databasesta id:n ja userId:n perusteella
        if (!suggestion.rows[0]) {
            res.status(404).json({ error: 'Suggestion not found' });
            return;
        }
        if (suggestion.rows[0].accepted) {
            res.status(400).json({ error: 'Suggestion already accepted' });
            return;
        }
        await //päivitetään suggestionin accepted true
        const newActivity = await //luodaan uus activity databaseen suggestionin pohjalta
        res.status(201).json(newActivity.rows[0]);
    }
    catch (error) {
        next(error);
    }
};