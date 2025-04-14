import React, { useEffect, useState } from 'react';
import { fetchReports } from '../services/auditService';
import ReportCard from '../components/ReportCard';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const History = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchReports();
        console.log("Fetched reports:", data);
        setReports(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load reports');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  return (
    <div className="container">
      <Link to="/" className="back-link">⬅ Back to Home</Link>
      <h1 className="page-title">📜 Audit History</h1>

      {loading && <Loader />}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && reports.length === 0 && (
        <p className="no-reports-msg">No reports found.</p>
      )}

      <div className="report-grid">
        {reports.map((report, idx) => (
          <ReportCard key={idx} report={report} />
        ))}
      </div>
    </div>
  );
};

export default History;
