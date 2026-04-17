import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(404).json({ error: 'Username and password are required' });
            return;
        }

        const existingUser = await //haetaan databasesta käyttäjä samalla usernamella
        if (existingUser.rows[0]) {
            res.status(404).json({ error: 'Username already in use' });
            return;
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = await //lisätään käyttäjä databaseen
        res.status(201).json(newUser.rows[0]);
    }
    catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Username and password are required' });
            return;
        }

        const user = await //haetaan databasesta usernamella
        if (!user.rows[0]) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const validPass = await bcrypt.compare(password, user.rows[0].password);
        if (!validPass) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { id: user.rows[0].id, username: user.rows[0].username },
            process.env.JWT_SECRET as string, //tää pitää lisätä .enviin
            { expiresIn: '24h' }
        );

        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
};

