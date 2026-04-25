import type { Response, NextFunction } from 'express';
import type { AuthenticationRequest } from '../middleware/authenticate.js';
import { prisma } from '../lib/prisma.js';
export const createActivity = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const { name, categoryId } = req.body;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        if (!name || !categoryId) {
            res.status(400).json({ error: 'Name and categoryId are required' });
            return;
        }
        const activity = await prisma.activity.create({
            data: {
                name,
                categoryId,
                userId
            }
        });
        res.status(201).json(activity);
    }
    catch (error) {
        next(error);
    }
};

export const getAllActivities = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const activities = await prisma.activity.findMany();
        res.status(200).json(activities);
    }
    catch (error) {
        next(error);
    }
};

export const getActivityById = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const parsedId = parseInt(id as string);
        const activity = await prisma.activity.findFirst({
            where: { id: parsedId, userId }
        });
        if (!activity) {
            res.status(404).json({ error: 'Activity not found' });
            return;
        }
        res.status(200).json(activity);
    }
    catch (error) {
        next(error);
    }
};

export const deleteActivity = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const parsedId = parseInt(id as string);
        const activity = await prisma.activity.findFirst({
            where: { id: parsedId, userId }
        });
        if (!activity) {
            res.status(404).json({ error: 'Activity not found' });
            return;
        }
        await prisma.activity.delete({
            where: { id: parsedId }
        });
        res.status(200).json({ message: 'Activity deleted succesfully' });
    }
    catch (error) {
        next(error);
    }
};