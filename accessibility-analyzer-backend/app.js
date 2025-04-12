// app.js
import express from 'express';
import cors from 'cors';
import auditRouter from './routes/auditRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected!"))
.catch((err) => console.error("MongoDB connection error:", err));

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
