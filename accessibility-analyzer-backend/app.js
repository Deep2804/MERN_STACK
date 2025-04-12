// app.js
import express from 'express';
import cors from 'cors';
import auditRouter from './routes/auditRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Accessibility Analyzer API');
});

// Health check
app.get('/ping', (req, res) => {
  res.send("Backend is alive!");
});

// Use audit routes
app.use('/api', auditRouter);

export default app;
