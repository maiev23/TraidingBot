import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../src/component/Login';
import Signup from '../src/component/Singup';
import  Home  from '../src/component/Home';

class App extends React.Component {
  state = {
    isLogin: false,
    userinfo: {}
  };
  

  handleIsLoginChange() {
    this.setState({ isLogin: true });
  }
  handleIsReverseLoginChange() {
    this.setState({ isLogin: false });
  }

  render() {
    const { isLogin, userinfo } = this.state;
    return (
      <div>
        <Switch>
          <Route
            path="/login"
            render={() => (
              <Login
                isLogin={isLogin}
                handleIsLoginChange={this.handleIsLoginChange.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup isLogin={isLogin} />}
          />
          <Route
            exact
            path="/home"
            render={() => <Home isLogin={isLogin} userinfo={userinfo} 
            handleIsReverseLoginChange={this.handleIsReverseLoginChange.bind(this)} />}
          />
          <Route
            path="/"
            render={() => {
              if (isLogin) {
                return <Redirect to="/home" />;
              }
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default App;