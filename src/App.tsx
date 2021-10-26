import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Top from './components/pages/Top';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import HealthColumnPage from './components/pages/HealthColumnPage';


class App extends React.Component {

  constructor(props: any) {
    super(props);
  }

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/Top" component={Top} />
          <Route exact path="/Mainpage" component={MainPage} />
          <Route exact path="/HealthColumnPage" component={HealthColumnPage} />
          // <Redirect to="/" />    //マッチするパスがなかった場合のリダイレクト先
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
