import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import './css/MainPage.css';
import WorkerInfoCharts from "../organisms/WorkerInfoCharts"
import RecommendProducts from "../organisms/RecommendProducts"

import { Typography } from '@material-ui/core';

const MainPage: React.FC = () => {

  let position: string

  const { state } = useLocation();
  switch(state) {
    case "f1111" :
      position = "総合職"
      break
    case "f2222" :
      position = "副主任"
      break
    case "f3333" :
      position = "GM"
      break
    default:
      position = "default"
  }

  return (
    <div style={{margin: '10px'}}>
      <header>
        <Typography variant="h6" align="right">userID: {state}</Typography>
        <Typography variant="h6" align="right">役職: {position}</Typography>
      </header>
      <WorkerInfoCharts />
      <br />
      <br />
      <br />
      <RecommendProducts />
      <br />
      <br />
      <Link to="/">Loginページに戻る</Link>
    </div>
  );
};

export default MainPage;
