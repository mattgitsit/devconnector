import React, { Component } from 'react';

export class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
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

export default Login;
