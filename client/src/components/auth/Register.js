import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

export class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.errors !== prevState.errors) {
  //     return { errors: nextProps.errors };
  //   }

  //   return null;
  // }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const { name, email, password, password2 } = this.state;

    const newUser = {
      name,
      email,
      password,
      password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      errors.name ? 'is-invalid' : null
                    }`}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={`form-control form-control-lg ${
                      errors.email ? 'is-invalid' : null
                    }`}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}

                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${
                      errors.password ? 'is-invalid' : null
                    }`}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${
                      errors.password2 ? 'is-invalid' : null
                    }`}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleInputChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
