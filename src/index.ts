import 'dotenv/config';
import { env } from 'process';
import app from './server.js'

const port: number = parseInt(env.PORT || '3000');

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});