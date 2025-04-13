import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import auditRoutes from './routes/auditRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Accessibility Analyzer API');
});

app.use('/api', auditRoutes);

export default app;
