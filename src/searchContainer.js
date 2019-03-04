const React = require("react");
const SemanticUIReact = require("semantic-ui-react");
const Log = require("./log");

const Accordion = SemanticUIReact.Accordion;
const Button = SemanticUIReact.Button;
const Dropdown = SemanticUIReact.Dropdown;
const Form = SemanticUIReact.Form;
const Input = SemanticUIReact.Input;
const Item = SemanticUIReact.Item;
const Transition = SemanticUIReact.Transition;

exports.SearchContainer = class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  handleAccordionClick() {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    Log.renderLog("Search Container", this);
    return React.createElement(
      Accordion,
      { styled: true, fluid: true },
      React.createElement(
        Accordion.Title,
        {
          active: this.state.active,
          onClick: () => this.handleAccordionClick()
        },
        React.createElement("i", { className: "dropdown icon" }),
        "Search"
      ),
      React.createElement(
        Accordion.Content,
        { active: this.state.active },
        React.createElement(
          Form,
          null,
          React.createElement(
            "div",
            { className: "three fields" },
            React.createElement(Form.Input, {
              label: "username",
              type: "text"
            }),
            React.createElement(Form.Input, {
              label: "password",
              type: "password"
            }),
            React.createElement(Form.Input, {
              label: "secret",
              type: "password"
            })
          )
        ),
        React.createElement(
          Button,
          { positive: true, onClick: this.props.onSearchClicked },
          "Search"
        )
      )
    );
  }
};
