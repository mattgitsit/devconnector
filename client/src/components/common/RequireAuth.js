import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default RequireAuth => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway = () => {
      if (!this.props.auth.isAuthenticated) {
        this.props.history.push('/login');
      }
    };

    render() {
      return <RequireAuth {...this.props} />;
    }
  }

  ComposedComponent.propTypes = {
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });

  return connect(mapStateToProps)(ComposedComponent);
};
