import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const difficultyColor = (level) => {
  switch ((level || '').toLowerCase()) {
    case 'easy':   return 'success';
    case 'medium': return 'warning';
    case 'hard':   return 'danger';
    default:       return 'secondary';
  }
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const endpoint = `${API_BASE}/api/workouts`;

  useEffect(() => {
    console.log('Workouts: fetching from', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Workouts: error', err);
        setError(err.message);
      });
  }, [endpoint]);

  if (error) return <div className="alert alert-danger mt-3"><strong>Error:</strong> {error}</div>;

  return (
    <div className="card octofit-card">
      <div className="card-header">&#x1F4AA; Workouts</div>
      <div className="card-body p-0">
        {workouts.length === 0 ? (
          <div className="text-center p-4 text-muted">No workouts found.</div>
        ) : (
          <table className="table table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Workout</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((w, i) => (
                <tr key={w.id || i}>
                  <td><span className="badge bg-secondary">{i + 1}</span></td>
                  <td><strong>{w.name}</strong></td>
                  <td>
                    <span className={`badge bg-${difficultyColor(w.difficulty)}`}>
                      {w.difficulty}
                    </span>
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

export default Workouts;
