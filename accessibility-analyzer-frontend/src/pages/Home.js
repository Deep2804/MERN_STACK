  // src/pages/Home.js
  import axios from 'axios';
  import { useEffect, useState } from 'react';



  const Home = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [error, setError] = useState('');
    const [history, setHistory] = useState([]);


    useEffect(() => {
      axios.get("http://localhost:5000/ping")
        .then((res) => {
          console.log(res.data); // "Backend is alive!"
        })
        .catch((err) => {
          console.error("Error connecting to backend:", err);
        });

        axios.get("http://localhost:5000/api/reports")
        .then((res) => {
          setHistory(res.data);
        })
        .catch((err) => {
          console.error("Error fetching history:", err);
        });
    }, []);

    const handleAudit = async () => {
      setLoading(true);
      setError('');
      setReport(null);

      try {
        const res = await axios.post("http://localhost:5000/api/audit", { url })
  ;
        setReport(res.data);
      } catch (err) {
        console.error(err);
        setError('Audit failed. Please check the URL.');
      }

      setLoading(false);
    };

    return (
      <div className="flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-6">Accessibility Analyzer</h1>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL (e.g., https://example.com)"
          className="border border-gray-300 rounded p-2 w-full max-w-md mb-4"
        />

        <button
          onClick={handleAudit}
          disabled={loading || !url}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full max-w-md"
        >
          {loading ? 'Auditing...' : 'Run Audit'}
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {report && (
          <div className="bg-gray-100 p-4 rounded mt-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-2 text-green-700">
              Accessibility Score: {(report.score * 100).toFixed(0)}%
            </h2>

            <h3 className="text-lg font-bold mb-2">Audit Details:</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {Object.values(report.audits).map((audit) => {
                // Skip audits with no score or not applicable
                if (audit.score === null || audit.scoreDisplayMode === 'notApplicable') return null;

                return (
                  <div
                    key={audit.id}
                    className={`p-3 rounded shadow ${
                      audit.score >= 0.9
                        ? 'bg-green-100 text-green-800'
                        : audit.score >= 0.5
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    <h4 className="font-semibold">{audit.title}</h4>
                    <p className="text-sm">{audit.description}</p>
                    <p className="text-xs italic">Score: {(audit.score * 100).toFixed(0)}%</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}


        {history.length > 0 && (
          <div className="mt-10 w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">Audit History</h2>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {history.map((item, index) => (
                <div key={index} className="p-3 border rounded bg-white shadow">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">URL:</span> {item.url}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Score:</span> {(item.score * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Date:</span> {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}



      </div>
    );
  };

  export default Home;
