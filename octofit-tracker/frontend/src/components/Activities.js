import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const endpoint = `${API_BASE}/api/activities`;

  useEffect(() => {
    console.log('Activities: fetching from', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Activities: error', err);
        setError(err.message);
      });
  }, [endpoint]);

  if (error) return <div className="alert alert-danger mt-3"><strong>Error:</strong> {error}</div>;

  return (
    <div className="card octofit-card">
      <div className="card-header">&#x1F3C3; Activities</div>
      <div className="card-body p-0">
        {activities.length === 0 ? (
          <div className="text-center p-4 text-muted">No activities found.</div>
        ) : (
          <table className="table table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a, i) => (
                <tr key={a.id || i}>
                  <td><span className="badge bg-secondary">{i + 1}</span></td>
                  <td>{a.user}</td>
                  <td><span className="badge bg-primary">{a.type}</span></td>
                  <td>{a.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Activities;
