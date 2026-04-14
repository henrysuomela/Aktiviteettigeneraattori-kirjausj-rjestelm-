import express from 'express';
import activitiesRouter from './routes/activities.js';
import categoriesRouter from './routes/categories.js';
import suggestionsRouter from './routes/suggestions.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Request, Response, NextFunction } from 'express';
const app : express.Application = express();

app.use(express.json());

/*app.use('/activities', activitiesRouter);
app.use('/categories', categoriesRouter);
app.use('/suggestions', suggestionsRouter);*/
const __filename : string = fileURLToPath(import.meta.url);
const __dirname : string = path.dirname(__filename);
const routesPath : string = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(async file => {
  if (file.endsWith(".js")) {
    const routeName : string = "/" + file.replace(".js", "");
    const routeFilePath : string = path.join(routesPath, file);
    const route : any = await import(new URL(`file://${routeFilePath}`).href);
    app.use(routeName, route.default);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;