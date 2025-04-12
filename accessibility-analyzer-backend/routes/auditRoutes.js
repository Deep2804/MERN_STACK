import express from 'express';
import cors from 'cors';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
  res.send("Backend is alive!");
});

app.post('/audit', async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: 'URL is required' });

  console.log("URL received for audit:", url);

  let chrome;
  try {
    console.log("Launching Chrome...");
    chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['accessibility'],
      port: chrome.port
    };

    const runnerResult = await lighthouse(url, options);
    const reportJson = JSON.parse(runnerResult.report);
    const accessibilityScore = reportJson.categories.accessibility.score;

    res.json({
      score: accessibilityScore,
      audits: reportJson.audits
    });

    await chrome.kill();
  } catch (error) {
    console.error('Error during audit:', error);
    if (chrome) await chrome.kill();
    res.status(500).json({ error: 'Failed to run audit. Make sure the URL is correct and publicly accessible.' });
  }
});

export default app;
