import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const teamColors = ['primary', 'danger', 'success', 'warning', 'info'];

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const endpoint = `${API_BASE}/api/teams`;

  useEffect(() => {
    console.log('Teams: fetching from', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Teams: error', err);
        setError(err.message);
      });
  }, [endpoint]);

  if (error) return <div className="alert alert-danger mt-3"><strong>Error:</strong> {error}</div>;

  return (
    <div className="card octofit-card">
      <div className="card-header">&#x1F91D; Teams</div>
      <div className="card-body p-0">
        {teams.length === 0 ? (
          <div className="text-center p-4 text-muted">No teams found.</div>
        ) : (
          <table className="table table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Team Name</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((t, i) => (
                <tr key={t.id || i}>
                  <td><span className="badge bg-secondary">{i + 1}</span></td>
                  <td>
                    <span className={`badge bg-${teamColors[i % teamColors.length]} me-2`}>&#x1F3C6;</span>
                    <strong>{t.name}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Teams;
