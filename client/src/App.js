import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { createStore, applyMiddleware, compose } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';

// import setAuthToken from './utils/setAuthToken';
// import jwt_decode from 'jwt-decode';
// import { logoutUser, setCurrentUser } from './actions/authActions';
// import { clearCurrentProfile } from './actions/profileActions';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';

import RequireAuth from './components/common/RequireAuth';

import './App.css';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

// // check for token
// if (localStorage.jwtToken) {
//   // set auth token header auth
//   setAuthToken(localStorage.jwtToken);

//   // decode token and get user info and exp
//   const decoded = jwt_decode(localStorage.jwtToken);

//   // set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));

//   // check for expired token
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     // logout user
//     store.dispatch(logoutUser());
//     // clear current profile
//     store.dispatch(clearCurrentProfile());

//     // redirect to login
//     window.location.href = '/login';
//   }
// }

class App extends Component {
  render() {
    return (
      // <Provider store={store}>
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
              <Route
                exact
                path="/edit-profile"
                component={RequireAuth(EditProfile)}
              />
              <Footer />
            </Fragment>
          </Switch>
        </div>
      </Router>
      // </Provider>
    );
  }
}

export default App;
