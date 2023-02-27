import React from 'react';
import Select from 'react-select';
import { countryList, countryCodes } from 'config';
import Datetime from 'react-datetime';
import DatePicker from 'components/DatePicker';

class ContactInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactInfo: this.props.contactInfo || {},
      errors: {},
    };
  }

  handleChange = (name, value) => {
    const contactInfo = { ...this.state.contactInfo };
    contactInfo[name] = value;
    this.props.handleChange('contactInfo', contactInfo);
    this.setState({ contactInfo });
  }

  handleInputChange = (e) => {
    this.handleChange(e.target.name, e.target.value);
  }

  validate() {
    const { contactInfo } = this.state;
    const errors = { ...this.state.errors };
    let errorCount = 0;
    if (!contactInfo.first_name) {
      errors.first_name = 'Required';
      errorCount += 1;
    } else {
      errors.first_name = '';
    }
    if (!contactInfo.last_name) {
      errors.last_name = 'Required';
      errorCount += 1;
    } else {
      errors.last_name = '';
    }
    if (!contactInfo.email) {
      errors.email = 'Required';
      errorCount += 1;
    } else {
      errors.email = '';
    }
    // if (!contactInfo.country_code || !contactInfo.phone) {
    //   errors.phone = 'Required';
    //   errorCount += 1;
    // } else {
    //   errors.phone = '';
    // }
    if (!contactInfo.birth_day) {
      errors.birth_day = 'Required';
      errorCount += 1;
    } else {
      errors.birth_day = '';
    }
    if (!contactInfo.gender) {
      errors.gender = 'Required';
      errorCount += 1;
    } else {
      errors.gender = '';
    }
    if (!contactInfo.nationality) {
      errors.nationality = 'Required';
      errorCount += 1;
    } else {
      errors.nationality = '';
    }
    if (!contactInfo.resident_country) {
      errors.resident_country = 'Required';
      errorCount += 1;
    } else {
      errors.resident_country = '';
    }
    this.setState({ errors });
    if (errorCount > 0) return false;
    return true;
  }

  render() {
    const { contactInfo, errors } = this.state;
    const valid = current => current.isBefore(Datetime.moment());
    return (
      <div className="container mb-4">
        <div className="text-center pt-3 pb-4 main-text">CONTACT INFORMATION</div>
        <div className="row calendar-container">
          <div className="col-sm-6">
            <div className="form-group">
              <div className="row">
                <div className="col-9">
                  <label className="form-control-label">First name <span className="text-danger">*</span></label>
                </div>
                <div className="col-3 text-right">
                  <div className="text-danger">{errors.first_name}</div>
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={contactInfo.first_name || ''}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <div className="row">
                <div className="col-9">
                  <label className="form-control-label">Last name <span className="text-danger">*</span></label>
                </div>
                <div className="col-3 text-right">
                  <div className="text-danger">{errors.last_name}</div>
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={contactInfo.last_name || ''}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <div className="row">
                <div className="col-9">
                  <label className="form-control-label">Email <span className="text-danger">*</span></label>
                </div>
                <div className="col-3 text-right">
                  <div className="text-danger">{errors.email}</div>
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                name="email"
                value={contactInfo.email || ''}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <div className="row">
                <div className="col-9">
                  <label className="form-control-label">Mobile number</label>
                </div>
                <div className="col-3 text-right">
                  <div className="text-danger">{errors.phone}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 pr-0">
                  <Select
                    name="country_code"
                    valueKey="code"
                    labelKey="label"
                    placeholder="Country code"
                    clearable={false}
                    value={contactInfo.country_code && contactInfo.country_code.code}
                    onChange={code => this.handleChange('country_code', code)}
                    options={countryCodes.map(countryCode => ({ ...countryCode, label: `${countryCode.name} ${countryCode.code}` }))}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={contactInfo.phone || ''}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group datetime-input-group">
              <div className="row">
                <div className="col-9">
                  <label className="form-control-label">Date of birth <span className="text-danger">*</span></label>
                </div>
                <div className="col-3 text-right">
                  <div className="text-danger">{errors.birth_day}</div>
                </div>
              </div>
              <DatePicker
                onChange={date => date.format && this.handleChange('birth_day', date.format('MMM Do YYYY'))}
                value={contactInfo.birth_day}
                viewMode="years"
                timeFormat={false}
                isValidDate={valid}
                clearButton={false}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="form-control-label">Gender <span className="text-danger">*</span></label>
              <div className="text-danger">{errors.gender}</div>
              <label className="radio-inline">
                <input
                  type="radio"
                  className="mr-2"
                  onChange={() => this.handleChange('gender', 'Male')}
                  checked={contactInfo.gender === 'Male'}
                />
                Male
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  className="mr-2"
                  onChange={() => this.handleChange('gender', 'Female')}
                  checked={contactInfo.gender === 'Female'}
                />
                Female
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  className="mr-2"
                  onChange={() => this.handleChange('gender', 'Other')}
                  checked={contactInfo.gender === 'Other'}
                />
                Other
              </label>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <div className="row">
                <div className="col-9">
                  <label className="form-control-label">Nationality <span className="text-danger">*</span></label>
                </div>
                <div className="col-3 text-right">
                  <div className="text-danger">{errors.nationality}</div>
                </div>
              </div>
              <Select
                name="nationality"
                valueKey="label"
                labelKey="label"
                placeholder="Type to search for country"
                clearable={false}
                value={contactInfo.nationality}
                onChange={nationality => this.handleChange('nationality', nationality && nationality.label)}
                options={countryList.map(country => ({ label: country }))}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <div className="row">
                <div className="col-9">
                  <label className="form-control-label">Current residence in <span className="text-danger">*</span></label>
                </div>
                <div className="col-3 text-right">
                  <div className="text-danger">{errors.resident_country}</div>
                </div>
              </div>
              <Select
                name="resident_country"
                valueKey="label"
                labelKey="label"
                placeholder="Type to search for country"
                clearable={false}
                value={contactInfo.resident_country}
                onChange={residentCountry => this.handleChange('resident_country', residentCountry && residentCountry.label)}
                options={countryList.map(country => ({ label: country }))}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactInformation;
