import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const runLighthouseAudit = async (url) => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['accessibility'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);
  const reportJson = JSON.parse(runnerResult.report);
  await chrome.kill();

  return {
    score: reportJson.categories.accessibility.score,
    audits: reportJson.audits,
  };
};

export default runLighthouseAudit;
