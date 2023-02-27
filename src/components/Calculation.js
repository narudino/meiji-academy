import React from 'react';
import moment from 'moment';
import { numberWithCommas } from 'utils/number';

const getStudyCourseFee = course => course.prices[0] * course.length;

const getIntershipCourseFee = (course) => {
  let price = 0;
  if (course.length < 3) {
    price = course.prices[0];
  } else if (course.length < 5) {
    price = course.prices[1];
  } else if (course.length < 9) {
    price = course.prices[2];
  } else if (course.length < 13) {
    price = course.prices[3];
  } else if (course.length < 17) {
    price = course.prices[4];
  } else {
    price = course.prices[5];
  }
  return price;
};

const Calculation = (props) => {
  const registrationFee = 20000;
  const accomodationArrangementFee = (props.accomodationInfo && props.accomodationInfo.accomodation_type.id) !== 1 ? 9600 : 0;
  const extraClassesLength = props.courses
    .filter(course => course.type === 1)
    .reduce((acc, course) => acc + course.length, 0);
  const coursesFee = props.courses
    .filter(course => course.type === 1)
    .reduce((acc, course) => acc + getStudyCourseFee(course), 0);
  const internshipFee = props.courses
    .filter(course => course.type === 2)
    .reduce((acc, course) => acc + getIntershipCourseFee(course), 0);
  console.log('Course fee', coursesFee);
  console.log('Internship fee', internshipFee);
  const studyFee = (coursesFee || 0) + (internshipFee || 0);
  const extraClassesFee = props.extraClasses ?
    ((props.extraClasses.private_classes || 0) * extraClassesLength * 4000) +
      ((props.extraClasses.kanji_classes || 0) * extraClassesLength * 3500)
    : 0;
  const accomodationLength = (props.accomodationInfo && props.accomodationInfo.accomodation_type.id !== 1) ?
    (moment(props.accomodationInfo.end_date, 'MMM Do YYYY')
      .diff(moment(props.accomodationInfo.start_date, 'MMM Do YYYY'), 'days'))
    : 0;
  const accomodationLengthWeek = Math.floor(accomodationLength / 7);
  const accomodationLengthDay = accomodationLength % 7;
  console.log('Accomodation Length', accomodationLength);
  const accomodationFee = (props.accomodationInfo && props.accomodationInfo.accomodation_type.id !== 1) ?
    ((accomodationLengthDay * props.accomodationInfo.accomodation_type.dayPrice) +
      (accomodationLengthWeek * props.accomodationInfo.accomodation_type.weekPrice))
    : 0;
  const airportPickupFee = props.accomodationInfo.airport_pickup
    ? ([1, 2].includes(props.accomodationInfo.pickup_info.id) ? 6000 : 12000)
    : 0;
  const subTotal = registrationFee + accomodationArrangementFee + studyFee + extraClassesFee + accomodationFee + airportPickupFee;
  const starndardCourses = props.courses && props.courses.filter(course => course.course === 'Standard Course (1-24 weeks)');
  const hasStandardCourses = starndardCourses && starndardCourses.length > 0;
  const standardCoursesLength = hasStandardCourses ?
    starndardCourses.reduce((acc, course) => acc + (course.length), 0) : 0;
  const standardCoursesFee = starndardCourses.reduce((acc, course) => acc + (course.prices[0] * course.length), 0);
  const discount = standardCoursesLength > 12 ? ((standardCoursesFee / standardCoursesLength) * (standardCoursesLength - 12)) * 0.2 : 0;
  const total = subTotal - discount;
  return (
    <div className="container mt-5 mb-4">
      <table className="table table-striped">
        <tbody>
          <tr>
            <td><b>Application fee</b></td>
            <td></td>
            <td>¥ {numberWithCommas(registrationFee)}</td>
          </tr>
          <tr>
            <td><b>Course Fee</b></td>
            <td>
              {props.courses.map((course, index) => (
                <div key={course.id}>
                  {course.course} - {course.length} week(s) <br />
                  Start date: {course.start_date} <br />
                  End date: {course.end_date} <br />
                  Fee: {course.type === 1
                    ? `¥ ${numberWithCommas(getStudyCourseFee(course))}`
                    : `¥ ${numberWithCommas(getIntershipCourseFee(course))}`}
                  {index < props.courses.length - 1 && <hr />}
                </div>
              ))}
            </td>
            <td>¥ {numberWithCommas(studyFee)}</td>
          </tr>
          <tr>
            <td><b>Extra Classes</b></td>
            <td>
              {props.extraClasses &&
              <div>
                Private Class {props.extraClasses.private_classes || 0} classes/week {extraClassesLength} week(s) <br />
                Kanji Class {props.extraClasses.kanji_classes || 0} classes/week {extraClassesLength} week(s)
              </div>
              }
            </td>
            <td>¥ {numberWithCommas(extraClassesFee)}</td>
          </tr>
          <tr>
            <td><b>Accomodation arrangement Fee</b></td>
            <td></td>
            <td>¥ {numberWithCommas(accomodationArrangementFee)}</td>
          </tr>
          <tr>
            <td><b>Accommodation Fee</b></td>
            <td>
              {props.accomodationInfo && props.accomodationInfo.accomodation_type.id !== 1 &&
              <div>
                {props.accomodationInfo.accomodation_type
                  && props.accomodationInfo.accomodation_type.label} - {accomodationLengthWeek} week(s) {accomodationLengthDay} nights <br />
                Check-in: {props.accomodationInfo.start_date} <br />
                Check-out: {props.accomodationInfo.end_date}
              </div>
              }
            </td>
            <td>¥ {numberWithCommas(accomodationFee)}</td>
          </tr>
          <tr>
            <td><b>Airport Pickup Fee</b></td>
            <td>{(props.accomodationInfo && props.accomodationInfo.airport_pickup) ? 'Yes' : 'No'}</td>
            <td>¥ {numberWithCommas(airportPickupFee)}</td>
          </tr>
          <tr>
            <td style={{ borderTop: 'none' }}></td>
            <td style={{ borderTop: 'none' }}><hr /></td>
            <td style={{ borderTop: 'none' }}></td>
          </tr>
          <tr>
            <td><b>Subtotal</b></td>
            <td></td>
            <td>¥ {numberWithCommas(subTotal)}</td>
          </tr>
          <tr>
            <td><b>Discount</b></td>
            <td></td>
            <td className="text-danger">- ¥ {numberWithCommas(discount)}</td>
          </tr>
          <tr>
            <td><b>TOTAL</b></td>
            <td></td>
            <td><b>¥ {numberWithCommas(total)}</b></td>
          </tr>
        </tbody>
      </table>
      <div className="my-2">
        <b>
          Additional discounts up to 20% might apply. For more information, <a href="https://meijiacademy.com/discount-information/" target="_blank" rel="noopener noreferrer">Click Here.</a>
        </b>
        <br />
        <b>
          All prices already include VAT (Consumption Tax).
        </b>
      </div>
    </div>
  );
};

export default Calculation;
