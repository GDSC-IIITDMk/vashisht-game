import './navbar.css'
import React, { useState } from 'react';

const logout = () => {
  window.open(`http://localhost:8080/auth/logout`, "_self");
};

function Navbar(userdata) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
    const user = (userdata)?userdata.user:null;
  

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="navbar">
      <div className="left">
        <span className="company-name">GDSC Games</span>
      </div>
      <div className="right">
        {
            user ?
            <div className="profile" onClick={toggleDropdown}>
          <img src={user.picture} alt="profile" className="profile-img" />
          <div className="profile-details">
            <span className="name">{user.name}</span>
            <span className="email">{user.email}</span>
          </div>
          {
            dropdownVisible ?
            <img className="profile-img smaller-img rotated" src='https://cdn-icons-png.flaticon.com/512/2985/2985150.png'/>
        :
        <img className="profile-img smaller-img " src='https://cdn-icons-png.flaticon.com/512/2985/2985150.png'/>

        }
          {dropdownVisible && (
            <div className="dropdown">
              <button className='button-75' onClick={logout}>Log Out</button>
            </div>
          )
          }
        </div>
        :
        <div></div>
        }
        
      </div>
    </div>
  );
}

export default Navbar;
