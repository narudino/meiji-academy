import React from 'react';
import Select from 'react-select';
import Datetime from 'react-datetime';
import DatePicker from 'components/DatePicker';

const accomodationTypes = [
  {
    id: 1,
    label: 'Not Needed',
    weekPrice: 0,
    dayPrice: 0,
  },
  {
    id: 4,
    label: 'Private apartment',
    weekPrice: 25000,
    dayPrice: 3800,
  },
  {
    id: 6,
    label: 'Flat share',
    weekPrice: 12000,
    dayPrice: 2400,
    minLength: 14,
  },
  {
    id: 5,
    label: 'Share house',
    weekPrice: 15000,
    dayPrice: 2800,
    minLength: 35,
  },
  {
    id: 2,
    label: 'Homestay',
    weekPrice: 22000,
    dayPrice: 3300,
    maxLength: 28,
  },
];

const pickupOptions = [
  {
    id: 1,
    label: 'Arrival',
  },
  {
    id: 2,
    label: 'Departure',
  },
  {
    id: 3,
    label: 'Arrival & Departure',
  },
];

class Accomodation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accomodationInfo: {},
      errors: {},
    };
  }

  handleChange = (name, value) => {
    const accomodationInfo = { ...this.state.accomodationInfo };
    accomodationInfo[name] = value;
    if (value && value.id === 2) {
      accomodationInfo.airport_pickup = true;
    }
    if (name === 'accomodation_type') {
      accomodationInfo.end_date = undefined;
    }
    this.props.handleChange('accomodationInfo', accomodationInfo);
    this.setState({ accomodationInfo }, () => console.log(this.state.accomodationInfo));
  }

  handleCheckboxChange = () => {
    const accomodationInfo = { ...this.state.accomodationInfo };
    accomodationInfo.airport_pickup = !accomodationInfo.airport_pickup;
    this.props.handleChange('accomodationInfo', accomodationInfo);
    this.setState({ accomodationInfo }, () => console.log(this.state.accomodationInfo));
  }

  validate = () => {
    const { accomodationInfo } = this.state;
    const errors = { ...this.state.errors };
    let errorCount = 0;
    if (!accomodationInfo.accomodation_type) {
      errors.accomodation_type = 'Required';
      errorCount += 1;
    } else {
      errors.accomodation_type = '';
    }
    if (accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id !== 1) {
      if (!accomodationInfo.start_date) {
        errors.start_date = 'Required';
        errorCount += 1;
      } else {
        errors.start_date = '';
      }
      if (!accomodationInfo.end_date) {
        errors.end_date = 'Required';
        errorCount += 1;
      } else {
        errors.end_date = '';
      }
    }
    if (accomodationInfo.airport_pickup && !accomodationInfo.pickup_info) {
      errors.pickup_info = 'Required';
      errorCount += 1;
    } else {
      errors.pickup_info = '';
    }
    this.setState({ errors });
    if (errorCount > 0) return false;
    return true;
  }

  render() {
    const { accomodationInfo, errors } = this.state;
    const minLength = accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.minLength;
    const maxLength = accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.maxLength;
    const validStartDate = current => current.isAfter(Datetime.moment()) &&
      (!accomodationInfo.end_date || current.isBefore(Datetime.moment(accomodationInfo.end_date, 'MMM Do YYYY')));
    let validEndDate = current => current.isAfter(Datetime.moment()) &&
      (!accomodationInfo.start_date || current.isAfter(Datetime.moment(accomodationInfo.start_date, 'MMM Do YYYY')));
    if (minLength) {
      validEndDate = current => current.isAfter(Datetime.moment(accomodationInfo.start_date, 'MMM Do YYYY').add(minLength - 1, 'days'));
    }
    if (maxLength) {
      validEndDate = current => current.isAfter(Datetime.moment()) &&
        (!accomodationInfo.start_date || current.isAfter(Datetime.moment(accomodationInfo.start_date, 'MMM Do YYYY'))) &&
        current.isBefore(Datetime.moment(accomodationInfo.start_date, 'MMM Do YYYY').add(maxLength - 1, 'days'));
    }
    return (
      <div className="accomodation py-3">
        <div className="container">
          <div className="text-center py-3 main-text">Accomodation (Fukuoka only)</div>
          <div className="row course calendar-container ">
            <div className="col-sm-8">
              <div className="form-group">
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-control-label">Type</label>
                  </div>
                  <div className="col-md-6 text-right">
                    <div className="text-danger">{errors.accomodation_type}</div>
                  </div>
                </div>
                <Select
                  name="accomodation_type"
                  valueKey="label"
                  labelKey="label"
                  value={accomodationInfo.accomodation_type}
                  placeholder="Choose a type"
                  options={accomodationTypes}
                  onChange={type => this.handleChange('accomodation_type', type)}
                  clearable={false}
                />
              </div>
            </div>
            {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id !== 1 &&
              <React.Fragment>
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-control-label">From</label>
                      </div>
                      <div className="col-md-6 text-right">
                        <div className="text-danger">{errors.start_date}</div>
                      </div>
                    </div>
                    <DatePicker
                      onChange={date => date.format && this.handleChange('start_date', date.format('MMM Do YYYY'))}
                      value={accomodationInfo.start_date}
                      viewMode="days"
                      timeFormat={false}
                      isValidDate={validStartDate}
                      clearButton={false}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-control-label">To</label>
                      </div>
                      <div className="col-md-6 text-right">
                        <div className="text-danger">{errors.end_date}</div>
                      </div>
                    </div>
                    <DatePicker
                      onChange={date => date.format && this.handleChange('end_date', date.format('MMM Do YYYY'))}
                      value={accomodationInfo.end_date}
                      viewMode="days"
                      timeFormat={false}
                      isValidDate={validEndDate}
                      clearButton={false}
                    />
                  </div>
                </div>
              </React.Fragment>
            }
          </div>
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 1 &&
            <p className="text-danger mt-3">*Are you sure? We have a large housing network and <a href="https://meijiacademy.com/accommodation/" target="_blank" rel="noopener noreferrer">very competitive prices.</a></p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 3 &&
            <p className="text-danger mt-3">*Check-In possible after 15h at any time</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 3 &&
            <p className="text-danger mt-3">*Furnished apartment with pocket Wi-Fi</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 3 &&
            <p className="text-danger mt-3">*20,000 JPY deposit required (fully refundable)</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 3 &&
            <p className="text-danger mt-3">*For detailed information, <a href="https://meijiacademy.com/accommodation/" target="_blank" rel="noopener noreferrer">Click here</a></p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 4 &&
            <p className="text-danger mt-3">*Check-In possible after 15h at any time</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 4 &&
            <p className="text-danger mt-3">*Furnished apartment with pocket Wi-Fi</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 4 &&
            <p className="text-danger mt-3">*20,000 JPY deposit required (fully refundable)</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 4 &&
            <p className="text-danger mt-3">*For detailed information, <a href="https://meijiacademy.com/accommodation/" target="_blank" rel="noopener noreferrer">Click here</a></p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 2 &&
            <p className="text-danger mt-3">*Maximum stay four weeks</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 2 &&
            <p className="text-danger mt-3">*Daily Breakfast is included (dinner for additional fees)</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 2 &&
            <p className="text-danger mt-3">*For Homestay Airport Pickup must be chosen, “Arrival” or “Arrival & Departure”</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 2 &&
            <p className="text-danger mt-3">*Please note that your first choice of accommodation might not be available. We will ask you for a second choice just in case</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 2 &&
            <p className="text-danger mt-3">*For detailed information, <a href="https://meijiacademy.com/accommodation/" target="_blank" rel="noopener noreferrer">Click here</a></p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 6 &&
            <p className="text-danger mt-3">*Minimum stay two weeks</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 6 &&
            <p className="text-danger mt-3">*Single or shared bedroom (female & male separated)</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 6 &&
            <p className="text-danger mt-3">*Please note that your first choice of accommodation might not be available. We will ask you for a second choice just in case</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 6 &&
            <p className="text-danger mt-3">*For detailed information, <a href="https://meijiacademy.com/accommodation/" target="_blank" rel="noopener noreferrer">Click here</a></p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 5 &&
            <p className="text-danger mt-3">*Minimum stay five weeks</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 5 &&
            <p className="text-danger mt-3">*Check-In between 15h and 21h</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 5 &&
            <p className="text-danger mt-3">*Please note that your first choice of accommodation might not be available. We will ask you for a second choice just in case</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 5 &&
            <p className="text-danger mt-3">*For detailed information, <a href="https://meijiacademy.com/accommodation/" target="_blank" rel="noopener noreferrer">Click here</a></p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 2 &&
            <p className="text-danger mt-3">*Students usually move in at least two days before the Course Start.</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 3 &&
            <p className="text-danger mt-3">*Students usually move in at least two days before the Course Start.</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 4 &&
            <p className="text-danger mt-3">*Students usually move in at least two days before the Course Start.</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 5 &&
            <p className="text-danger mt-3">*Students usually move in at least two days before the Course Start.</p>}
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 6 &&
            <p className="text-danger mt-3">*Students usually move in at least two days before the Course Start.</p>}
          <div className="form-group mt-3">
            <div className="checkbox">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={(accomodationInfo.accomodation_type
                    && accomodationInfo.accomodation_type.id === 2) ||
                    accomodationInfo.airport_pickup}
                  onChange={(accomodationInfo.accomodation_type
                    && accomodationInfo.accomodation_type.id === 2)
                    ? () => {} : this.handleCheckboxChange}
                  className="mr-2"
                />Airport pickup
              </label>
            </div>
          </div>
          <div className="text-danger">{errors.pickup_info}</div>
          {this.state.accomodationInfo.airport_pickup &&
            <div className="form-group mt-3">
              <label className="radio-inline">
                <input
                  type="radio"
                  className="mr-2"
                  onChange={() => this.handleChange('pickup_info', pickupOptions[0])}
                  checked={accomodationInfo.pickup_info
                    && accomodationInfo.pickup_info.id === pickupOptions[0].id}
                />
                Arrival
              </label>
              {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id !== 2 &&
              <label className="radio-inline">
                <input
                  type="radio"
                  className="mr-2"
                  onChange={() => this.handleChange('pickup_info', pickupOptions[1])}
                  checked={accomodationInfo.pickup_info
                    && accomodationInfo.pickup_info.id === pickupOptions[1].id}
                />
                Departure
              </label>
              }
              <label className="radio-inline">
                <input
                  type="radio"
                  className="mr-2"
                  onChange={() => this.handleChange('pickup_info', pickupOptions[2])}
                  checked={accomodationInfo.pickup_info
                    && accomodationInfo.pickup_info.id === pickupOptions[2].id}
                />
                Arrival & Departure
              </label>
              <p className="text-danger">
                *Airport pick-ups are only available on Thursdays between 11 am and 8 pm <br />
                *Additional charge of 2,500JPY for weekend pickups (Saturday & Sunday) <br />
                *If you arrive late, you have to stay the first night in a hotel. We can help with arrangements!
              </p>
            </div>
          }
          {accomodationInfo.accomodation_type && accomodationInfo.accomodation_type.id === 2 &&
            <p className="text-danger">For Homestay, “Arrival” or “Arrival & Departure” must be chosen</p>
          }
        </div>
      </div>
    );
  }
}

export default Accomodation;
