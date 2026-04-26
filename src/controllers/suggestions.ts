import type { Response, NextFunction } from 'express';
import type { AuthenticationRequest } from '../middleware/authenticate.js';
import { prisma } from '../lib/prisma.js';
export const getAllSuggestions = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const suggestions = await prisma.suggestion.findMany({
            where: { userId }
        });
        res.status(200).json(suggestions);
    }
    catch (error) {
        next(error);
    }

};

export const generateSuggestion = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const { categoryId } = req.body;
        const parsedCategoryId = Number(categoryId);
        if (!categoryId || Number.isNaN(parsedCategoryId)) {
            res.status(400).json({ error: 'Category ID is required' });
            return;
        }

        // Aktiviteettien määrä annetussa kategoriassa
        const count = await prisma.suggestion.count({
            where: { categoryId: parsedCategoryId, userId: null }
        });

        if (count === 0) {
            res.status(404).json({ error: 'No suggestions available for this category' });
            return;
        }

        // Valitaan aktiviteetti randomilla
        const randomSkip = Math.floor(Math.random() * count);
        const poolSuggestion = await prisma.suggestion.findFirst({
            where: { categoryId: parsedCategoryId, userId: null },
            skip: randomSkip
        });

        const newSuggestion = await prisma.suggestion.create({
            data: {
                name: poolSuggestion!.name,
                categoryId: parsedCategoryId,
                userId,
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
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const { id } = req.params;
        const parsedId = parseInt(id as string);
        if (Number.isNaN(parsedId)) {
            res.status(400).json({ error: 'Invalid suggestion id' });
            return;
        }
        const suggestion = await prisma.suggestion.findFirst({
            where: { id: parsedId, userId }
        });
        if (!suggestion) {
            res.status(404).json({ error: 'Suggestion not found' });
            return;
        }
        res.status(200).json(suggestion);
    }
    catch (error) {
        next(error);
    }
};

export const acceptSuggestion = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const { id } = req.params;
        const parsedId = parseInt(id as string);
        if (Number.isNaN(parsedId)) {
            res.status(400).json({ error: 'Invalid suggestion id' });
            return;
        }
        const suggestion = await prisma.suggestion.findFirst({
            where: { id: parsedId, userId }
        });
        if (!suggestion) {
            res.status(404).json({ error: 'Suggestion not found' });
            return;
        }
        if (suggestion.accepted) {
            res.status(400).json({ error: 'Suggestion already accepted' });
            return;
        }
        await prisma.suggestion.update({
            where: { id: parsedId },
            data: { accepted: true }
        });
        const newActivity = await prisma.activity.create({
            data: {
                name: suggestion.name,
                categoryId: suggestion.categoryId,
                userId
            }
        });
        res.status(201).json(newActivity);
    }
    catch (error) {
        next(error);
    }
};