import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, editProfile } from '../../actions/profileActions';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import Spinner from '../layout/Spinner';

export class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    profile: {
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: ''
    },
    errors: {}
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    if (!this.props.profile.profile) {
      return <Spinner />;
    }

    console.log(this.props.profile.profile);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  handleFormSubmit = e => {
    const {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    } = this.state.profile;

    e.preventDefault();

    const updProfile = {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    };

    this.props.editProfile(updProfile, this.props.history);
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
        value={this.state.profile.status}
        onChange={this.handleInputChange}
        options={options}
        error={this.state.errors.status}
        info="Give us an idea of where you are at in your career"
      />
    );
  };

  renderSocialInputs = () => {
    const {
      profile: { twitter, facebook, linkedin, youtube, instagram },
      errors
    } = this.state;

    return (
      <>
        <InputGroup
          placeholder="Add your Twitter url"
          name="twitter"
          icon={`fab fa-fw fa-twitter`}
          value={twitter}
          onChange={this.handleInputChange}
          errors={errors.twitter}
        />
        <InputGroup
          placeholder="Add your Facebook url"
          name="facebook"
          icon={`fab fa-fw fa-facebook`}
          value={facebook}
          onChange={this.handleInputChange}
          errors={errors.facebook}
        />
        <InputGroup
          placeholder="Add your Linkedin url"
          name="linkedin"
          icon={`fab fa-fw fa-linkedin`}
          value={linkedin}
          onChange={this.handleInputChange}
          errors={errors.linkedin}
        />
        <InputGroup
          placeholder="Add your Youtube url"
          name="youtube"
          icon={`fab fa-fw fa-youtube`}
          value={youtube}
          onChange={this.handleInputChange}
          errors={errors.youtube}
        />
        <InputGroup
          placeholder="Add your Instagram url"
          name="instagram"
          icon={`fab fa-fw fa-instagram`}
          value={instagram}
          onChange={this.handleInputChange}
          errors={errors.instagram}
        />
      </>
    );
  };

  render() {
    const { displaySocialInputs, errors } = this.state;
    const {
      handle,
      company,
      website,
      location,
      skills,
      githubusername,
      bio
    } = this.state.profile;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Your Profile</h1>

              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleFormSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={handle}
                  onChange={this.handleInputChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc."
                />
                {this.renderStatusOptions()}
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={this.handleInputChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={website}
                  onChange={this.handleInputChange}
                  error={errors.website}
                  info="Could be your own website or one you work for"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.handleInputChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Los Angeles, CA"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={skills}
                  onChange={this.handleInputChange}
                  error={errors.skills}
                  info="Please use comma to separate each skill (eg. HTML,CSS,Javascript"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={githubusername}
                  onChange={this.handleInputChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={bio}
                  onChange={this.handleInputChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
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

                {displaySocialInputs && this.renderSocialInputs()}

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

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, editProfile }
)(EditProfile);
