import React, { useEffect, useState } from 'react';
import { runAudit, fetchReports, pingServer } from '../services/auditService';
import URLInput from '../components/URLInput';
import ReportCard from '../components/ReportCard';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const Home = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Ping the server
    pingServer()
      .then((res) => console.log(res.data))
      .catch((err) => console.error('Error connecting to backend:', err));

    // Fetch all past reports (history)
    fetchReports()
      .then((res) => {
        console.log("Backend response:", res.data);
        setReports(Array.isArray(res.data) ? res.data : []); // Ensure it's an array
      })
      .catch((err) => {
        console.error('Error fetching reports:', err);
        setReports([]); // Fallback to empty array in case of error
      });
  }, []);

  const handleAudit = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    try {
      const res = await runAudit(url);
      console.log("Response from backend:", res);
      setReports((prev) => [res?.data || res, ...prev]);
    } catch (err) {
      setError('Failed to audit URL.');
    } finally {
      setLoading(false);
    }
  };
  console.log("Reports state:", reports);
  return (
    <div className="container">
      <Link to="/history">🔍 View Full Audit History</Link>
      <h1>Accessibility Analyzer</h1>
      
      <URLInput url={url} setUrl={setUrl} handleAudit={handleAudit} />
      {loading && <Loader />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {Array.isArray(reports) && reports.length === 0 && !loading && <p>No reports found.</p>}
      {Array.isArray(reports) && reports.map((report, idx) => (
        <ReportCard key={idx} report={report} />
      ))}
    </div>
  );
};

export default Home;
