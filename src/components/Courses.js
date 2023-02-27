import React from 'react';
import uuid from 'uuid/v4';
import CourseForm from 'components/CourseForm';
// import Packages from 'components/Packages';
import ExtraClassForm from 'components/ExtraClassForm';

const meijiPackages = [
  {
    courses: [{
      id: uuid(),
      label: 'Crash Course Nippon (2 weeks)',
      length: 2,
    }],
  },
  {
    courses: [{
      id: uuid(),
      label: 'Master Japanese (4 weeks)',
      length: 4,
    }],
  },
  {
    courses: [{
      id: uuid(),
      label: 'Spring Program (4 weeks)',
      length: 4,
    }],
  },
];

const Course = () => ({
  id: uuid(),
  course: null,
  length: null,
  start_date: null,
  end_date: null,
});

class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.CourseForm = [];
    this.state = {
      courses: [Course()],
      extraClasses: null,
      noStudyCourseError: false,
    };
  }

  onCourseChange = (courseInfo) => {
    this.setState({
      courses: this.state.courses.map((course) => {
        if (course.id === courseInfo.id) return courseInfo;
        return course;
      }),
      noStudyCourseError: false,
    }, () => this.props.handleChange('courses', this.state.courses));
  }

  onExtraClassesChange = (extraClasses) => {
    this.setState({ extraClasses }, () => this.props.handleChange('extraClasses', this.state.extraClasses));
  }

  addCourse = () => {
    this.setState({
      courses: [...this.state.courses, Course()],
    }, () => this.props.handleChange('courses', this.state.courses));
  }

  removeCourse = (id) => {
    this.setState({
      courses: this.state.courses.filter(course => course.id !== id),
    }, () => this.props.handleChange('courses', this.state.courses));
  }

  addExtraClass = () => {
    if (this.state.courses.map(course => course.type).includes(1)) {
      this.setState({
        extraClasses: { private_classes: null, kanji_classes: null },
      }, () => this.props.handleChange('extraClasses', this.state.extraClasses));
    } else {
      this.setState({ noStudyCourseError: true });
    }
  }

  removeExtraClass = () => {
    this.setState({
      extraClasses: null,
    }, () => this.props.handleChange('extraClasses', this.state.extraClasses));
  }

  handlePackageChosen = (index) => {
    this.setState({
      courses: meijiPackages[index].courses,
      extraClasses: meijiPackages[index].extraClasses,
    }, () => this.props.handlePackageChosen(
      meijiPackages[index].courses,
      meijiPackages[index].extraClasses,
      meijiPackages[index].packageFee
    ));
  }

  validate() {
    const courseValidations = this.CourseForm.filter(form => form).map(form => form.validate());
    if (courseValidations.includes(false)) return false;
    return true;
  }

  render() {
    return (
      <React.Fragment>
        {/* <Packages onChoosePackage={this.handlePackageChosen} /> */}
        <div className="container mb-4">
          <div className="text-center pt-1 pb-4 main-text">COURSES</div>
          {this.state.courses.map((course, index) => (
            <CourseForm
              ref={ref => this.CourseForm[index] = ref}
              key={course.id}
              course={course}
              onChange={this.onCourseChange}
              onRemove={this.removeCourse}
              canRemove={this.state.courses.length > 1}
            />
          ))}
          {this.state.courses.map(course => course.course).includes('Standard Course (1-24 weeks)') &&
          <p className="text-danger">*BIG Discounts for Long Term Studies (13 weeks or longer)</p>
          }
          <p className="text-danger">*Courses can start on any Monday and end on any given Friday</p>
          <p className="text-danger">*Apply at least one month before your intended start date</p>
          <p className="text-danger">*Please do not choose 2 courses overriding each other</p>
          <div className="my-3">
            <button className="btn btn-add" type="button" onClick={this.addCourse}>
              Add Courses +
            </button>
          </div>
          {this.state.extraClasses ?
            <ExtraClassForm
              {...this.state.extraClasses}
              onChange={this.onExtraClassesChange}
              onRemove={this.removeExtraClass}
              extraClasses={this.state.extraClasses}
            />
            :
            <div className="my-3">
              <button className="btn btn-add" type="button" onClick={this.addExtraClass}>
                Add Extra Classes +
              </button>
              {this.state.noStudyCourseError &&
              <p className="text-danger mt-2">*Please choose at least 1 study course to add extra classes</p>
              }
            </div>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default Courses;
