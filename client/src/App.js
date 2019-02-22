import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';

import RequireAuth from './components/common/RequireAuth';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Fragment>
              <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/dashboard"
                component={RequireAuth(Dashboard)}
              />
              <Route
                exact
                path="/create-profile"
                component={RequireAuth(CreateProfile)}
              />
              <Footer />
            </Fragment>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
