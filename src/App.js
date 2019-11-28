import React from "react";
import Wizard from "./components/wizard";
import shippingObj from "./utils/shippingObj";
import Header from "./components/header";
import steps from "./components/steps/index";
import ShippingLabel from "./components/shpping-label";

export default class ShippingLabelMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelReady: false,
      wizardContext: shippingObj
    };
    this.createLabel = this.createLabel.bind(this);
  }

  createLabel(val) {
    this.setState({
      labelReady: true,
      wizardContext: val
    });
  }

  render() {
    return (
      <div>
        {this.state.labelReady ? (
          <ShippingLabel info={this.state.wizardContext} />
        ) : (
          <Wizard
            header={Header}
            steps={steps}
            wizardContext={this.state.wizardContext}
            onComplete={this.createLabel}
          />
        )}
      </div>
    );
  }
}
