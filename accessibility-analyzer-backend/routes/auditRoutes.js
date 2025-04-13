import express from 'express';
import { runAudit, getAllReports } from '../controllers/auditController.js';

const router = express.Router();

router.get('/ping', (req, res) => res.send('Backend is alive!'));

router.post('/audit', runAudit);
router.get('/reports', getAllReports);

export default router;
