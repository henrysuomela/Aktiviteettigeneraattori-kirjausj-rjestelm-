import type { Request, Response } from 'express';

export const createActivity = async (req: Request, res: Response) => {
    const { name, categoryId } = req.body;
};

export const getAllActivities = async (req: Request, res: Response) => {

};

export const getActivityById = async (req: Request, res: Response) => {
    const { id } = req.params;
};

export const deleteActivity = async (req: Request, res: Response) => {
    const { id } = req.params;
}