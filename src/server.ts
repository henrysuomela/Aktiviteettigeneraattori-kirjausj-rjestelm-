import express from 'express';
import activitiesRouter from './routes/activities.js';
import categoriesRouter from './routes/categories.js';
import suggestionsRouter from './routes/suggestions.js';
import authRouter from './routes/auth.js';
import { authenticate } from './middleware/authenticate.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Request, Response, NextFunction } from 'express';
const app : express.Application = express();

app.use(express.json());

app.use('/auth', authRouter);
/*app.use('/activities', activitiesRouter);
app.use('/categories', categoriesRouter);
app.use('/suggestions', suggestionsRouter);*/
const __filename : string = fileURLToPath(import.meta.url);
const __dirname : string = path.dirname(__filename);
const routesPath : string = path.join(__dirname, 'routes');
const files = fs.readdirSync(routesPath);
for (const file of files) {
  if (file.endsWith('.ts') && file !== 'auth.ts') {
    const routeName = '/' + file.replace('.ts', '');
    const routeFilePath = path.join(routesPath, file);
    const route = await import(new URL(`file://${routeFilePath}`).href);
    app.use(routeName, authenticate, route.default);
  }
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;