import React from "react";
import PropTypes from "prop-types";
import { stepMapping } from "../../constants";

export default class StepOne extends React.Component {
  render() {
    const {
      onAction,
      wizardContext: { from }
    } = this.props;
    return (
      <div className="form-inline">
        <h4>Enter From Address</h4>
        <div className="row">
          <div className="col-lg-12 form-group">
            <label>Name</label>
            <input
              className="form-control"
              placeholder="Name"
              data-id="name"
              data-step={stepMapping.from}
              type="text"
              onChange={onAction}
              value={from.name}
              autoFocus
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 form-group">
            <label>Street</label>
            <input
              className="form-control"
              placeholder="Street"
              data-id="street"
              data-step={stepMapping.from}
              type="text"
              onChange={onAction}
              value={from.street}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label>City</label>
            <input
              className="form-control"
              placeholder="City"
              data-id="city"
              data-step={stepMapping.from}
              type="text"
              onChange={onAction}
              value={from.city}
            />
            </div>
            <div className="col-md-4">
            <label>State </label>
            <input
              className="form-control"
              placeholder="state"
              data-id="state"
              data-step={stepMapping.from}
              type="text"
              onChange={onAction}
              value={from.state}
            />
            </div>
            <div className="col-md-4">
            <label>Zip</label>
            <input
              className="form-control"
              placeholder="zip"
              data-id="zip"
              data-step={stepMapping.from}
              type="text"
              onChange={onAction}
              value={from.zip}
            />
          </div>
        </div>
      </div>
    );
  }
}

StepOne.propTypes = {
  wizardContext: PropTypes.object.isRequired,
  onAction: PropTypes.func.isRequired
};
