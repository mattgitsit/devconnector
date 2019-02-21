import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

export class Navbar extends Component {
  renderLinks = () => {
    const { isAuthenticated, user } = this.props.auth;

    if (!isAuthenticated) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Sign up
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a href="!#" onClick={this.handleLogoutClick} className="nav-link">
              <img
                src={user.avatar}
                alt={user.name}
                title="You must have a Gravatar connected to your email to display an image"
                className="rounded-circle"
                style={{ width: '25px', marginRight: '5px' }}
              />
              Logout
            </a>
          </li>
        </ul>
      );
    }
  };

  handleLogoutClick = e => {
    e.preventDefault();

    this.props.clearCurrentProfile();
    this.props.logoutUser(this.props.history);
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Dev Connector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  Developers
                </Link>
              </li>
            </ul>
            {this.renderLinks()}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const navbarWithRouter = withRouter(Navbar);

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(navbarWithRouter);
