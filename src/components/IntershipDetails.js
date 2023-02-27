import React from 'react';
import Select from 'react-select';

const fields = [
  'Business Development',
  'PR & Marketing',
  'Education & Teaching',
  'Hospitality & Tourism',
  'NGO & Non-Profit',
  'Human Resources',
  'IT',
  'Real Estate',
  'Environmental',
  'Film & Photography',
  'Consulting',
  'International Finance',
  'Legal Affairs',
  'Art & Fashion',
  'Trading & Logistics',
  'Design',
  'Journalism',
  'Engineering',
];

class IntershipDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      internshipDetails: this.props.internshipDetails || {},
      errors: {},
      anyLocation: null,
    };
  }

  handleChange = (name, value) => {
    const internshipDetails = { ...this.state.internshipDetails };
    internshipDetails[name] = value;
    this.props.handleChange('internshipDetails', internshipDetails);
    this.setState({ internshipDetails });
  }

  handleInputChange = (e) => {
    this.handleChange(e.target.name, e.target.value);
  }

  handleCheckbox = (name) => {
    const internshipDetails = { ...this.state.internshipDetails };
    internshipDetails[name] = !internshipDetails[name];
    this.props.handleChange('internshipDetails', internshipDetails);
    this.setState({ internshipDetails });
  }

  validate = () => {
    const { internshipDetails } = this.state;
    const errors = { ...this.state.errors };
    let errorCount = 0;
    if (!internshipDetails.first_intership_choice) {
      errors.first_intership_choice = 'Required';
      errorCount += 1;
    } else {
      errors.first_intership_choice = '';
    }
    if (!internshipDetails.second_intership_choice) {
      errors.second_intership_choice = 'Required';
      errorCount += 1;
    } else {
      errors.second_intership_choice = '';
    }
    if (!internshipDetails.third_intership_choice) {
      errors.third_intership_choice = 'Required';
      errorCount += 1;
    } else {
      errors.third_intership_choice = '';
    }
    if (!internshipDetails.interview_tool) {
      errors.interview_tool = 'Required';
      errorCount += 1;
    } else {
      errors.interview_tool = '';
    }
    if (!internshipDetails.interview_tool_id) {
      errors.interview_tool_id = 'Required';
      errorCount += 1;
    } else {
      errors.interview_tool_id = '';
    }
    this.setState({ errors });
    if (errorCount > 0) return false;
    return true;
  }

  render() {
    const { internshipDetails, errors } = this.state;
    return (
      <div className="accomodation py-3">
        <div className="container">
          <div className="text-center py-3 main-text">Internship Details</div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <div className="row">
                  <div className="col-9">
                    <label className="form-control-label">First Internship Choice <span className="text-danger">*</span></label>
                  </div>
                  <div className="col-3 text-right">
                    <div className="text-danger">{errors.first_intership_choice}</div>
                  </div>
                </div>
                <Select
                  name="first_intership_choice"
                  valueKey="label"
                  labelKey="label"
                  placeholder="Choose your favorite"
                  clearable={false}
                  value={internshipDetails.first_intership_choice}
                  onChange={field => this.handleChange('first_intership_choice', field && field.label)}
                  options={fields
                    .filter(field => field !== internshipDetails.second_intership_choice && field !== internshipDetails.third_intership_choice)
                    .map(field => ({ label: field }))}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <div className="row">
                  <div className="col-9">
                    <label className="form-control-label">Second Internship Choice <span className="text-danger">*</span></label>
                  </div>
                  <div className="col-3 text-right">
                    <div className="text-danger">{errors.second_intership_choice}</div>
                  </div>
                </div>
                <Select
                  name="second_intership_choice"
                  valueKey="label"
                  labelKey="label"
                  placeholder="Choose a second choice"
                  clearable={false}
                  value={internshipDetails.second_intership_choice}
                  onChange={field => this.handleChange('second_intership_choice', field && field.label)}
                  options={fields
                    .filter(field => field !== internshipDetails.first_intership_choice && field !== internshipDetails.third_intership_choice)
                    .map(field => ({ label: field }))}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <div className="row">
                  <div className="col-9">
                    <label className="form-control-label">Third Internship Choice <span className="text-danger">*</span></label>
                  </div>
                  <div className="col-3 text-right">
                    <div className="text-danger">{errors.third_intership_choice}</div>
                  </div>
                </div>
                <Select
                  name="third_intership_choice"
                  valueKey="label"
                  labelKey="label"
                  placeholder="Choose a third choice"
                  clearable={false}
                  value={internshipDetails.third_intership_choice}
                  onChange={field => this.handleChange('third_intership_choice', field && field.label)}
                  options={fields
                    .filter(field => field !== internshipDetails.second_intership_choice && field !== internshipDetails.first_intership_choice)
                    .map(field => ({ label: field }))}
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-3">
            <label className="form-control-label mr-3">Are you open to other internship locations?</label>
            <label className="radio-inline">
              <input
                type="radio"
                className="mr-2"
                onChange={() => this.setState({ anyLocation: true })}
                checked={this.state.anyLocation === true}
              />
              Yes
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                className="mr-2"
                onChange={() => this.setState({ anyLocation: false })}
                checked={this.state.anyLocation === false}
              />
              No
            </label>
          </div>
          {this.state.anyLocation &&
          <div className="form-group mt-3">
            <label className="checkbox-inline">
              <input
                type="checkbox"
                checked={internshipDetails.love_all}
                onChange={() => this.handleCheckbox('love_all')}
                className="mr-2"
              />Anywhere in Japan
            </label>
            <label className="checkbox-inline">
              <input
                type="checkbox"
                checked={internshipDetails.love_Fukuoka}
                onChange={() => this.handleCheckbox('love_Fukuoka')}
                className="mr-2"
              />Fukuoka
            </label>
            <label className="checkbox-inline">
              <input
                type="checkbox"
                checked={internshipDetails.love_Tokyo}
                onChange={() => this.handleCheckbox('love_Tokyo')}
                className="mr-2"
              />Tokyo
            </label>
            <label className="checkbox-inline">
              <input
                type="checkbox"
                checked={internshipDetails.love_Kansai}
                onChange={() => this.handleCheckbox('love_Kansai')}
                className="mr-2"
              />Kansai Region
            </label>
          </div>
          }
          <div className="form-group mt-3">
            <label className="form-control-label mr-3">University Credit</label>
            <label className="radio-inline">
              <input
                type="radio"
                className="mr-2"
                onChange={() => this.handleChange('university_credit', true)}
                checked={internshipDetails.university_credit === true}
              />
              Yes
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                className="mr-2"
                onChange={() => this.handleChange('university_credit', false)}
                checked={internshipDetails.university_credit === false}
              />
              No
            </label>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="form-control-label">University</label>
                <input
                  type="text"
                  name="university"
                  className="form-control"
                  value={internshipDetails.university || ''}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <label className="form-control-label">Major</label>
                <input
                  type="text"
                  name="university_major"
                  className="form-control"
                  value={internshipDetails.university_major || ''}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="col-sm-5">
              <div className="form-group">
                <label className="form-control-label">For you interview <span className="text-danger">*</span></label>
                <div className="text-danger">{errors.interview_tool}</div>
                <label className="radio-inline">
                  <input
                    type="radio"
                    className="mr-2"
                    onChange={() => this.handleChange('interview_tool', 'Skype')}
                    checked={internshipDetails.interview_tool === 'Skype'}
                  />
                  Skype
                </label>
                <label className="radio-inline">
                  <input
                    type="radio"
                    className="mr-2"
                    onChange={() => this.handleChange('interview_tool', 'Google Hangouts')}
                    checked={internshipDetails.interview_tool === 'Google Hangouts'}
                  />
                  Google Hangouts
                </label>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="form-group">
                <label className="form-control-label">ID<span className="text-danger">*</span></label>
                <input
                  type="text"
                  name="interview_tool_id"
                  className="form-control"
                  value={internshipDetails.interview_tool_id || ''}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IntershipDetails;
