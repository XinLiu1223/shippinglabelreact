import React from 'react';
import Wizard from './components/wizard/wizard';
import shippingObj from './components/shippingObj';
import Header from './components/header';
import steps from './components/features/steps/index';
import ShippingLabel from './components/features/shpping-label';

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
