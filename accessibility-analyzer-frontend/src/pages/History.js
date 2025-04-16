import React, { useEffect, useState } from 'react';
import { fetchReports } from '../services/auditService';
import ReportCard from '../components/ReportCard';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const History = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');

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

  const filterAndSortReports = () => {
    return reports
      .filter((report) => {
        const score = Math.round(report.score * 100);
        if (filter === 'low') return score <= 50;
        if (filter === 'medium') return score > 50 && score <= 90;
        if (filter === 'high') return score > 90;
        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
  };

  return (
    <div className="container">
      <Link to="/" className="back-link">⬅ Back to Home</Link>
      <h1 className="page-title">📜 Audit History</h1>

       {/* Filters & Sorting UI */}
       <div className="filters-container">
        <label>Filter by Score: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="low">0–50 (Low)</option>
          <option value="medium">51–90 (Medium)</option>
          <option value="high">91–100 (High)</option>
        </select>

        <label style={{ marginLeft: '1rem' }}>Sort by: </label>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="desc">Latest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {loading && <Loader />}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && filterAndSortReports().length === 0 && (
        <p className="no-reports-msg">No reports found.</p>
      )}

      <div className="report-grid">
        {filterAndSortReports().map((report, idx) => (
          <ReportCard key={idx} report={report} />
        ))}
      </div>
    </div>
  );
};

export default History;
