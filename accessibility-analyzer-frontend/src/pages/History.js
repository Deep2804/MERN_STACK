import React, { useEffect, useState } from 'react';
import { fetchReports } from '../services/auditService';
import ReportCard from '../components/ReportCard';
import Loader from '../components/Loader';

const History = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchReports();
        console.log("Fetched reports:", data);
        setReports(Array.isArray(data) ? data : []);  // ✅ Ensuring it's always an array
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
      <h1>Audit History</h1>
      {loading && <Loader />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && reports.length === 0 && <p>No reports found.</p>}
      {reports.map((report, idx) => (
        <ReportCard key={idx} report={report} />
      ))}
    </div>
  );
};

export default History;
