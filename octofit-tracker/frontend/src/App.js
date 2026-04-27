import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.png';
import './App.css';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container">
          <span className="navbar-brand">
            <img src={logo} alt="OctoFit Logo" />
            OctoFit Tracker
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {[
                { path: '/activities', label: 'Activities' },
                { path: '/leaderboard', label: 'Leaderboard' },
                { path: '/teams', label: 'Teams' },
                { path: '/users', label: 'Users' },
                { path: '/workouts', label: 'Workouts' },
              ].map(({ path, label }) => (
                <li className="nav-item" key={path}>
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link' + (isActive ? ' active' : '')
                    }
                    to={path}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="octofit-hero">
          <h1>Welcome to OctoFit Tracker</h1>
          <p>Track your activities, compete with your team, and crush your fitness goals!</p>
        </div>
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

