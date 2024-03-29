import React from "react";
import PropTypes from "prop-types";
import Navigation from "./navigation";
import ProgressBar from "./progressbar";
import { stepMapping } from "../utils/constants";
import { validatorObj } from "../utils/utils";

export default class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreviousBtn: false,
      showNextBtn: true,
      showConfirm: false,
      compState: 1, //our starting step
      showNavigation: true,
      wizardContext: this.props.wizardContext,
      errorObj: {}
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleNested = this.handleNested.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  checkNavState(next) {
    if (next < 2) {
      this.setState({
        showPreviousBtn: false
      });
    }
  }

  /* We call this function as a middleware to see what appropriate function to invoke */
  handleFilter(event) {
    const typeOfComponenent = event.target.getAttribute("data-step");
    if (
      typeOfComponenent === stepMapping.from ||
      typeOfComponenent === stepMapping.to
    ) {
      this.handleNested(event);
    } else if (typeOfComponenent === stepMapping.confirm) {
      this.props.onComplete(this.state.wizardContext);
    } else if (
      typeOfComponenent === stepMapping.weight ||
      typeOfComponenent === stepMapping.shipping
    ) {
      //weight and shipping steps
      this.handleState(event);
    }
  }

  handleState(event) {
    const key = event.target.getAttribute("data-id"),
      value = event.target.value;
    this.setState({
      wizardContext: { ...this.state.wizardContext, [key]: value }
    });
  }

  handleNested(event) {
    const key = event.target.getAttribute("data-id"),
      stage = event.target.getAttribute("data-step"),
      value = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      wizardContext: {
        ...prevState.wizardContext,
        [stage]: {
          ...prevState.wizardContext[stage],
          [key]: value
        }
      }
    }));
  }

  next() {
    const { wizardContext } = this.state;
    this.setState({
      errorObj: {}
    });
    /* validation of form for each step */
    const currentComponentStep = Object.keys(validatorObj)[
      this.state.compState - 1
    ];
    if (validatorObj[currentComponentStep]) {
      const errors = validatorObj[currentComponentStep](
        wizardContext[currentComponentStep]
      );
      if (Object.keys(errors).length) {
        this.setState({
          errorObj: errors
        });
        return false;
      }
    }
    this.setState((prevState, props) => {
      return {
        compState: prevState.compState + 1,
        showPreviousBtn: true,
        showNextBtn:
          prevState.compState + 1 === props.steps.length ? false : true
      };
    });
  }

  previous() {
    this.setState({
      errorObj: {}
    });
    if (this.state.compState > 1) {
      this.setState({
        compState: this.state.compState - 1,
        showNextBtn: true
      });
    }
    this.checkNavState(this.state.compState - 1);
  }

  render() {
    const Header = this.props.header;
    const ActiveComponent = this.props.steps[this.state.compState - 1];
    return (
      <div className="container">
        <div className="page-header">
          <Header />
        </div>
        <ProgressBar
          step={this.state.compState}
          length={this.props.steps.length}
        />
        <ActiveComponent
          onAction={this.handleFilter}
          wizardContext={this.state.wizardContext}
        />
        <Navigation
          showPrev={this.state.showPreviousBtn}
          showNext={this.state.showNextBtn}
          next={this.next}
          prev={this.previous}
          show={this.state.showNavigation}
        />
        {Object.keys(this.state.errorObj).length > 0 && (
          <div className="alert alert-danger">
            {Object.keys(this.state.errorObj).map((key, index) => {
              const error =
                key === "state"
                  ? "You need two letters for state"
                  : "You have " + key + " error";
              return <p key={index}> {error} </p>;
            })}
          </div>
        )}
      </div>
    );
  }
}

Wizard.propTypes = {
  header: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  wizardContext: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired
};
