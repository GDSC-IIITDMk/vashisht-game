import React, { useEffect, useState } from 'react';
import Leaderboard from '../../components/Leaderboard';
import styles from "../Home/styles.module.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {formatDate,calculateDateDifference} from '../../components/utils'
import ButtonGroup from '../../components/buttongroup';
import CustomSnackbar from '../../components/customSnackBar'
const Dashboard = (userDetails) => {

  return (
    <div>
    <h2 style={{position: "relative",left: "40px",top: "30px"}}>Your Balance:  <div style={{position: "relative", left: "50px"}}>₹50</div></h2>
    <div>
      <Leaderboard />
    </div>
    </div>
    
    
  );
};

export default Dashboard;
