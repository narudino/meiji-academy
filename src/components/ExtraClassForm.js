import React from 'react';
import Select from 'react-select';

const makeClassesOptions = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i += 1) {
    result.push({
      label: i === 1 ? `${i} class` : `${i} classes`,
      value: i,
    });
  }
  return result;
};

class ExtraClassForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extraClasses: this.props.extraClasses,
    };
  }

  handleChange = (name, value) => {
    const { extraClasses } = this.state;
    extraClasses[name] = value;
    this.props.onChange(extraClasses);
    this.setState({ extraClasses });
  }

  render() {
    const { extraClasses } = this.state;
    return (
      <React.Fragment>
        <div className="row course">
          <div
            className="btn-delete"
            onClick={this.props.onRemove}
          >
            <span>x</span>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="form-control-label">Private classes (per week)</label>
              <Select
                name="private_classes"
                valueKey="value"
                labelKey="label"
                value={extraClasses.private_classes}
                options={makeClassesOptions(1, 5)}
                onChange={length => this.handleChange('private_classes', length && length.value)}
                clearable
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="form-control-label">Kanji classes (per week)</label>
              <Select
                name="kanji_classes"
                valueKey="value"
                labelKey="label"
                value={extraClasses.kanji_classes}
                options={makeClassesOptions(1, 5)}
                onChange={length => this.handleChange('kanji_classes', length && length.value)}
                clearable
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ExtraClassForm;
