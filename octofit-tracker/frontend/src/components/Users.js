import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const endpoint = `${API_BASE}/api/users/`;

  useEffect(() => {
    console.log('Users: fetching from', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Users: error', err);
        setError(err.message);
      });
  }, [endpoint]);

  if (error) return <div className="alert alert-danger mt-3"><strong>Error:</strong> {error}</div>;

  return (
    <div className="card octofit-card">
      <div className="card-header">&#x1F464; Users</div>
      <div className="card-body p-0">
        {users.length === 0 ? (
          <div className="text-center p-4 text-muted">No users found.</div>
        ) : (
          <table className="table table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id || i}>
                  <td><span className="badge bg-secondary">{i + 1}</span></td>
                  <td>
                    <span className="badge bg-dark me-2">&#x1F464;</span>
                    <strong>{u.username}</strong>
                  </td>
                  <td><a href={`mailto:${u.email}`} className="text-decoration-none">{u.email}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Users;
