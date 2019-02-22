import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

export class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    socialInputs: {
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: ''
    },
    errors: {}
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();

    console.log('submit');
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderStatusOptions = () => {
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <SelectListGroup
        placeholder="status"
        name="status"
        value={this.state.status}
        onChange={this.handleInputChange}
        options={options}
        error={this.state.errors.status}
        info="Give us an idea of where you are at in your career"
      />
    );
  };

  renderSocialInputs = () => {
    const { socialInputs, errors } = this.state;
    const socialInputsList = Object.keys(socialInputs);

    if (this.state.displaySocialInputs) {
      return socialInputsList.map((socialInput, index) => (
        <InputGroup
          key={index}
          placeholder={`Add your ${socialInput} URL`}
          name={socialInput}
          icon={`fab fa-fw fa-${socialInput}`}
          value={socialInputs[socialInput]}
          onChange={e =>
            this.setState({ socialInputs: { [e.target.name]: e.target.value } })
          }
          errors={errors.socialInput}
        />
      ));
    }
  };

  render() {
    const { displaySocialInputs, socialInputs, errors } = this.state;
    const socialInputsList = Object.keys(socialInputs);

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleFormSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.handleInputChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc."
                />
                {this.renderStatusOptions()}
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleInputChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleInputChange}
                  error={errors.website}
                  info="Could be your own website or one you work for"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleInputChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Los Angeles, CA"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.handleInputChange}
                  error={errors.skills}
                  info="Please use comma to separate each skill (eg. HTML,CSS,Javascript"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.handleInputChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.handleInputChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    onClick={() =>
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }
                    className="btn btn-light">
                    Add Social Network Links
                  </button>{' '}
                  <small className="text-muted">Optional</small>
                </div>

                {displaySocialInputs &&
                  socialInputsList.map((socialInput, index) => (
                    <InputGroup
                      key={index}
                      placeholder={`Add your ${socialInput} URL`}
                      name={socialInput}
                      icon={`fab fa-fw fa-${socialInput}`}
                      value={socialInputs[socialInput]}
                      onChange={e =>
                        this.setState({
                          socialInputs: { [e.target.name]: e.target.value }
                        })
                      }
                      errors={errors.socialInput}
                    />
                  ))}

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
