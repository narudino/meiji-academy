import React from 'react';
import Datetime from 'react-datetime';

class DatePicker extends React.Component {
  onClear() {
    this.props.onClear();
  }

  renderInput = (props, openCalendar) => {
    const clear = () => {
      props.onChange({ target: { value: '' } });
      this.onClear();
    };

    return (
      <div className="input-group">
        <span className="input-group-addon">
          <i className="fa fa-calendar cursor-pointer" />
        </span>
        <input
          {...props}
          placeholder={props.placeholder || 'Click to pick the date'}
          className="form-control"
          onClick={openCalendar}
        />
        {this.props.clearButton
        ?
          <div className="input-group-addon" onClick={clear}>
            <i className="fa fa-times cursor-pointer" />
          </div>
        : ''
        }
      </div>
    );
  }

  render() {
    return <Datetime {...this.props} renderInput={this.renderInput} />;
  }
}

export default DatePicker;
