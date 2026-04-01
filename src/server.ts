import express from 'express';
import activitiesRouter from './routes/activities.js';
import categoriesRouter from './routes/categories.js';
import suggestionsRouter from './routes/suggestions.js';

const app = express();

app.use(express.json());

app.use('/activities', activitiesRouter);
app.use('/categories', categoriesRouter);
app.use('/suggestions', suggestionsRouter);

export default app;