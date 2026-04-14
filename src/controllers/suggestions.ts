import type { Request, Response, NextFunction } from 'express';

export const getAllSuggestions = async (req: Request, res: Response) => {

};

export const generateSuggestion = async (req: Request, res: Response) => {
    const { categoryId } = req.body;
};

export const getSuggestionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const suggestion = await //haetaan databasesta
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

export const acceptSuggestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const suggestion = await //haetaan databasesta
        if (!suggestion.rows[0]) {
            res.status(404).json({ error: 'Suggestion not found' });
            return;
        }
        if (suggestion.rows[0].accepted) {
            res.status(400).json({ error: 'Suggestion already accepted' });
        }
        await //päivitetään suggestionin accepted true
        const newActivity = await //luodaan uus activity databaseen suggestionin pohjalta
        res.status(201).json(newActivity.rows[0]);
    }
    catch (error) {
        next(error);
    }
};