import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

import Spinner from '../layout/Spinner';

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  renderDashboardContent = () => {
    const { profile, loading } = this.props.profile;
    if (profile === null || loading) {
      return <Spinner />;
    }

    return this.renderUserProfile(profile);
  };

  renderUserProfile = profile => {
    const { user } = this.props.auth;

    if (Object.keys(profile).length <= 0) {
      return (
        <>
          <p className="lead text-muted">Welcome, {user.name}!</p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </>
      );
    }

    return <h4>DISPLAY PROFILE</h4>;
  };

  render() {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {this.renderDashboardContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
