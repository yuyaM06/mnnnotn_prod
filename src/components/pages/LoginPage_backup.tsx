import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import './css/LoginPage.css';
import { useHistory } from 'react-router-dom';

// おかんりロゴ
import OkanriLOGO from '../img/okanri_logo.png'

import { Typography, TextField, Button, CssBaseline, Container } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

const LoginPage: React.FC = () => {

  const history = useHistory();

  const handleClick = () => {
    history.push('/MainPage');
  };

  return (
    <Container maxWidth="sm" >
      <CssBaseline />
      <br />
      <Typography variant="h5" align="center"><img src={OkanriLOGO} style={{width: '20vw'}} /></Typography>
      <Typography variant="h5" align="center">おかんり</Typography>
      <Typography variant="h5" align="center">〜足りない一品をあなたに〜</Typography>
      <Typography variant="subtitle2" align="center">produced by みんなのおとん</Typography>
      <form>
        <TextField
          label="UserID"
          name="name"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal" />
        <TextField
          label="Password"
          name="Password"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal" />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClick}
          component={Link}
          to="/MainPage"
          >
          LOGIN
        </Button>
      </form>
    </Container>
  );
}


export default LoginPage;
