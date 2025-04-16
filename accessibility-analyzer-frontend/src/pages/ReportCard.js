import React from 'react';

const ReportCard = ({ report }) => {
  return (
    <div className="report-card">
      <p><strong>URL:</strong> {report.url}</p>
      <p><strong>Score:</strong> {report.score}</p>
      <p><strong>Date:</strong> {new Date(report.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default ReportCard;
