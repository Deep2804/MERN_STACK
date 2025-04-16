import runLighthouseAudit from '../utils/runLighthouse.js';
import Report from '../models/Report.js';

export const runAudit = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const { score, audits } = await runLighthouseAudit(url);

    const newReport = await Report.create({ url, score, audits });

    res.status(200).json({
      message: 'Audit completed',
      data: {
        url,
        score,
        audits,
        createdAt: newReport.createdAt,
      },
    });
  } catch (err) {
    console.error('Audit failed:', err);
    res.status(500).json({ error: 'Audit failed. Make sure the URL is public and valid.' });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error('Fetching reports failed:', err);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID received:", id); // Add this for debugging
    const report = await Report.findById(id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


