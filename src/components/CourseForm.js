import React from 'react';
import moment from 'moment';
import Select from 'react-select';
import Datetime from 'react-datetime';
import DatePicker from 'components/DatePicker';

const courses = [
  {
    label: 'Standard Course (1-24 weeks)',
    prices: [28000],
    minTime: 1,
    maxTime: 24,
    type: 1,
  },
  {
    label: 'Standard Course + Intensive Japanese (1-24 weeks)',
    prices: [40000],
    minTime: 1,
    maxTime: 24,
    type: 1,
  },
  {
    label: 'Standard Course + Japanese Business (1-4 weeks)',
    prices: [40000],
    minTime: 1,
    maxTime: 4,
    type: 1,
  },
  {
    label: 'Standard Course + Traditional Culture (1-4 weeks)',
    prices: [38000],
    minTime: 1,
    maxTime: 4,
    type: 1,
  },
  {
    label: 'Standard Course + Pop Culture (1-2 weeks)',
    prices: [38000],
    minTime: 1,
    maxTime: 2,
    type: 1,
  },
];

const makeLengthOptions = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i += 1) {
    result.push({
      label: i === 1 ? `${i} week` : `${i} weeks`,
      value: i,
    });
  }
  return result;
};

const courseTransform = courseProps => ({
  id: courseProps.id,
  course: courses.filter(course => course.label === courseProps.label)[0],
  length: courseProps.length,
});

class CourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInfo: courseTransform(this.props.course),
      errors: {},
    };
  }

  handleChange = (name, value) => {
    const courseInfo = { ...this.state.courseInfo };
    courseInfo[name] = value;
    this.props.onChange({
      id: courseInfo.id,
      course: courseInfo.course && courseInfo.course.label,
      prices: courseInfo.course && courseInfo.course.prices,
      type: courseInfo.course && courseInfo.course.type,
      length: courseInfo.length,
      start_date: courseInfo.start_date,
      end_date: courseInfo.start_date && courseInfo.length &&
        moment(courseInfo.start_date, 'MMM Do YYYY').add(courseInfo.length, 'weeks').subtract(3, 'days').format('MMM Do YYYY'),
    });
    this.setState({ courseInfo });
  }

  validate = () => {
    const { courseInfo } = this.state;
    const errors = { ...this.state.errors };
    let errorCount = 0;
    if (!courseInfo.course || !courseInfo.course.label) {
      errors.course = 'Required';
      errorCount += 1;
    } else {
      errors.course = '';
    }
    if (!courseInfo.length) {
      errors.length = 'Required';
      errorCount += 1;
    } else {
      errors.length = '';
    }
    if (!courseInfo.start_date) {
      errors.start_date = 'Required';
      errorCount += 1;
    } else {
      errors.start_date = '';
    }
    this.setState({ errors });
    if (errorCount > 0) return false;
    return true;
  }

  render() {
    const { courseInfo, errors } = this.state;
    const valid = current => current.isAfter(Datetime.moment()) && current.days() === 1;
    return (
      <React.Fragment>
        <div className="row course calendar-container">
          {this.props.canRemove &&
            <div
              className="btn-delete"
              onClick={() => this.props.onRemove(this.props.course.id)}
            >
              <span>x</span>
            </div>
          }
          <div className="col-sm-8">
            <div className="form-group">
              <div className="row">
                <div className="col-md 6">
                  <label className="form-control-label">Course</label>
                </div>
                <div className="col-md-6 text-right">
                  <span className="text-danger">{errors.course}</span>
                </div>
              </div>
              <Select
                name="course"
                valueKey="label"
                labelKey="label"
                value={courseInfo.course}
                options={courses}
                placeholder="Search a course"
                onChange={course => this.handleChange('course', course)}
                clearable={false}
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="row">
                <div className="col-md-8">
                  <label className="form-control-label">Length (weeks)</label>
                </div>
                <div className="col-md-4 text-right">
                  <span className="text-danger">{errors.length}</span>
                </div>
              </div>
              <Select
                name="length"
                valueKey="value"
                labelKey="label"
                value={courseInfo.length}
                placeholder="Course length"
                options={courseInfo.course
                  && makeLengthOptions(courseInfo.course.minTime, courseInfo.course.maxTime)}
                onChange={length => this.handleChange('length', length && length.value)}
                clearable={false}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <div className="row">
                <div className="col-md 6">
                  <label className="form-control-label">Start date</label>
                </div>
                <div className="col-md-6 text-right">
                  <span className="text-danger">{errors.start_date}</span>
                </div>
              </div>
              <DatePicker
                onChange={date => date.format && this.handleChange('start_date', date.format('MMM Do YYYY'))}
                value={courseInfo.start_date}
                viewMode="days"
                timeFormat={false}
                isValidDate={valid}
                clearButton={false}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <div className="row">
                <div className="col-md 6">
                  <label className="form-control-label">End date</label>
                </div>
                <div className="col-md-6 text-right">
                  <span className="text-danger">{errors.end_date}</span>
                </div>
              </div>
              <DatePicker
                value={courseInfo.start_date && courseInfo.length &&
                  moment(courseInfo.start_date, 'MMM Do YYYY').add(courseInfo.length, 'weeks').subtract(3, 'days').format('MMM Do YYYY')}
                viewMode="days"
                timeFormat={false}
                inputProps={{ placeholder: 'Choose start date and coure length', disabled: true }}
                clearButton={false}
              />
            </div>
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default CourseForm;
