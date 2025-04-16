import React from 'react';
import { Link } from 'react-router-dom';

const ReportCard = ({ report }) => {
  console.log("Report data in ReportCard:", report);
  if (!report) return null;
  const { _id, url, score, createdAt, audits } = report;

  const formattedScore = Math.round(score * 100);
  const formattedDate = new Date(createdAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const auditArray = Object.values(audits || {});
  const passedCount = auditArray.filter(a => a.score === 1).length;
  const totalCount = auditArray.length;

  const failingAudits = auditArray.filter(
    (item) => item.score !== 1 && item.score !== null
  );

  return (
    <div className="report-card" style={cardStyle}>
      <h3>{url || 'No URL'}</h3>
      <p><strong>Accessibility Score:</strong> {formattedScore}%</p>
      <p><strong>Generated At:</strong> {formattedDate}</p>
      <p><strong>✅ {passedCount} / {totalCount} checks passed</strong></p>

      {/* {failingAudits.length > 0 && (
        <>
          <h4>⚠️ Issues Found:</h4>
          <ul>
            {failingAudits.map((audit, idx) => (
              <li key={idx}>
                <strong>{audit.title}</strong>: {audit.description}
              </li>
            ))}
          </ul>
        </>
      )} */}

      {/* ✅ Add this Link button */}
      {(_id &&
        <Link to={`/report/${_id}`} style={linkStyle}>
          📄 View Full Report
        </Link>
      )}
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ccc',
  padding: '1rem',
  borderRadius: '10px',
  marginBottom: '1rem',
};
const linkStyle = {
  marginTop: '10px',
  display: 'inline-block',
  textDecoration: 'none',
  color: '#007bff',
  fontWeight: 'bold'
};

export default ReportCard;
