import type { Request, Response, NextFunction } from 'express';

export const createActivity = async (req: Request, res: Response) => {
    const { name, categoryId } = req.body;
};

export const getAllActivities = async (req: Request, res: Response) => {

};

export const getActivityById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const activity = await //haetaan databasesta
        if (!activity.rows[0]) {
            res.status(404).json({ error: 'Activity not found' });
            return;
        }
        res.status(200).json(activity.rows[0]);
    }
    catch (error) {
        next(error);
    }
};

export const deleteActivity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const activity = await //haetaan databasesta
        if (!activity.rows[0]) {
            res.status(404).json({ 'Activity not found' });
            return;
        }
        res.status(200).json({ message: 'Activity deleted succesfully' });
    }
    catch (error) {
        next(error);
    }
};