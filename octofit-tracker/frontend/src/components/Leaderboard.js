import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const medals = ['&#x1F947;', '&#x1F948;', '&#x1F949;'];

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const endpoint = `${API_BASE}/api/leaderboard`;

  useEffect(() => {
    console.log('Leaderboard: fetching from', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard: fetched data', data);
        const list = Array.isArray(data) ? data : data.results || [];
        setEntries([...list].sort((a, b) => b.points - a.points));
      })
      .catch(err => {
        console.error('Leaderboard: error', err);
        setError(err.message);
      });
  }, [endpoint]);

  if (error) return <div className="alert alert-danger mt-3"><strong>Error:</strong> {error}</div>;

  return (
    <div className="card octofit-card">
      <div className="card-header">&#x1F3C6; Leaderboard</div>
      <div className="card-body p-0">
        {entries.length === 0 ? (
          <div className="text-center p-4 text-muted">No leaderboard data found.</div>
        ) : (
          <table className="table table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={e.id || i}>
                  <td>
                    {i < 3
                      ? <span dangerouslySetInnerHTML={{ __html: medals[i] }} />
                      : <span className="badge bg-secondary">{i + 1}</span>}
                  </td>
                  <td><strong>{e.user}</strong></td>
                  <td><span className="badge bg-success">{e.points} pts</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
