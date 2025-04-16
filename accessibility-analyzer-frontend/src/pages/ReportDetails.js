import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const ReportDetails = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/report/${id}`);
        setReport(res.data);
      } catch (err) {
        setError('Failed to load report');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!report) return <p>Report not found</p>;

  return (
    <div className="container">
      <Link to="/history">← Back to History</Link>
      <h1>Detailed Report</h1>
      <p><strong>URL:</strong> {report.url}</p>
      <p><strong>Score:</strong> {report.score}</p>
      <p><strong>Created:</strong> {new Date(report.createdAt).toLocaleString()}</p>
      
      <h3>Audit Insights</h3>
      <ul>
        {Object.entries(report.audits).map(([key, audit]) => (
          <li key={key}>
            <strong>{audit.title}:</strong> {audit.score !== null ? audit.score : 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportDetails;
