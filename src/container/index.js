import React from 'react';
import axios from 'axios';
import Courses from 'components/Courses';
import Accomodation from 'components/Accomodation';
import ContactInfomation from 'components/ContactInfomation';
import IntershipDetails from 'components/IntershipDetails';
import Calculation from 'components/Calculation';
import LoadingIndicator from 'components/LoadingIndicator';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCalculation: false,
      submitting: false,
      formData: {},
      canCalculate: true,
      successModal: false,
      acceptedTos: false,
    };
  }

  showCalculation = () => {
    if (this.Courses.validate() && this.Accomodation.validate()) {
      this.setState({ hasCalculation: true, canCalculate: true });
    } else {
      this.setState({ canCalculate: false });
    }
  }

  handleChange = (name, value) => {
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formData }, () => console.log(formData));
    if (this.state.hasCalculation && ['accomodationInfo', 'courses', 'extraClasses'].includes(name)) {
      this.setState({ hasCalculation: false, canCalculate: true, errorTos: '' });
    }
  }

  handlePackageChosen = (courses, extraClasses, packageFee) => {
    const formData = { ...this.state.formData };
    formData.courses = courses;
    formData.extraClasses = extraClasses;
    formData.packageFee = packageFee;
    this.setState({
      formData,
      hasCalculation: false,
      canCalculate: true,
      errorTos: '',
    }, () => console.log(formData));
  }

  handleCheckboxChange = () => {
    this.setState({ acceptedTos: !this.state.acceptedTos, errorTos: '' });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    if (this.validate()) {
      this.setState({ hasError: false });
      if (this.state.acceptedTos) {
        this.setState({ submitting: true, hasError: false });
        axios({
          method: 'post',
          url: 'https://meijiinternships.tk/free-estimate',
          // url: 'http://localhost:3001/free-estimate',
          data: this.state.formData,
        }).then((res) => {
          if (res.data && res.data.success) {
            window.location.href = 'https://meijiacademy.com/thank-you/';
          } else {
            this.setState({ submitting: false });
          }
        }).catch(() => {
          this.setState({ submitting: false });
        });
      } else {
        this.setState({
          errorTos: "Haven't accepted the terms and conditions",
        });
      }
    } else {
      this.setState({ hasError: true });
    }
  }

  validate() {
    return this.ContactInfomation.validate() && (!this.IntershipDetails || this.IntershipDetails.validate());
  }

  render() {
    const { formData } = this.state;
    const hasIntershipInCourses = formData.courses && formData.courses.filter(course => course.type === 2).length > 0;
    return (
      <div className="main-container mb-5 pb-5">
        <form onSubmit={this.handleSubmit}>
          <Courses
            ref={ref => this.Courses = ref}
            handleChange={this.handleChange}
            handlePackageChosen={this.handlePackageChosen}
          />
          <Accomodation
            ref={ref => this.Accomodation = ref}
            handleChange={this.handleChange}
          />
          <div className="container">
            <div className="text-left text-danger mt-3">
              {!this.state.canCalculate && 'Please complete the required field'}
            </div>
          </div>
          <div className="text-center my-4">
            <button
              className="btn btn-main"
              type="button"
              onClick={this.showCalculation}
            >
              Calculate
            </button>
          </div>
          {this.state.hasCalculation &&
          <React.Fragment>
            <Calculation {...formData} />
            <ContactInfomation
              ref={ref => this.ContactInfomation = ref}
              handleChange={this.handleChange}
              contactInfo={formData.contactInfo}
            />
            {hasIntershipInCourses &&
            <IntershipDetails
              ref={ref => this.IntershipDetails = ref}
              handleChange={this.handleChange}
              internshipDetails={formData.internshipDetails}
            />
            }
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group my-4">
                    <textarea
                      className="form-textarea"
                      name="comments"
                      placeholder="Any comments / questions?"
                      onChange={e => this.handleChange(e.target.name, e.target.value)}
                      value={formData.comments}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="text-left text-danger my-2">
                {this.state.hasError && 'Please complete the required field'}
              </div>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.acceptedTos}
                  onChange={this.handleCheckboxChange}
                  className="mr-2"
                />
                I have read and accept Meiji Academy’s <a href="https://meijiacademy.com/terms-conditions/" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                <div className="mt-2 text-danger">{this.state.errorTos}</div>
              </label>
            </div>
            <div className="text-center my-4">
              <button className="btn btn-main" type="submit" disabled={this.state.submitting}>
                {this.state.submitting ? <LoadingIndicator /> : 'Submit'}
              </button>
            </div>
          </React.Fragment>
          }
        </form>
        {this.state.successModal &&
        <div className="overlay-background">
          <div className="success-modal">
            <h2 className="pt-1 pb-4 main-text">THANK YOU!</h2>
            <p className="my-4">After we receive your form we will contact you within 48 hours and follow up on your application.</p>
            <a href="https://meijiacademy.com/">Back to home page</a>
          </div>
        </div>
        }
      </div>
    );
  }
}

export default Container;
