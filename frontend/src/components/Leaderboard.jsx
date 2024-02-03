// Leaderboard.jsx

import React, { useState, useEffect } from 'react';
import '../Leaderboard.css'; // Import the CSS file for styling

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    fetch('http://localhost:8080/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <div className="leaderboard-list">
        {users.map((user, index) => (
          <div key={user._id} className={`leaderboard-entry ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <span className="rank">{index + 1}</span>
            <span className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-balance">Balance: {user.balance}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
