import React from 'react';

const URLInput = ({ url, setUrl, handleAudit }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleAudit}>Run Audit</button>
    </div>
  );
};

export default URLInput;
