const React = require("react");
const SemanticUIReact = require("semantic-ui-react");

const Constants = require("./constants");
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
      active: !this.state.active,
      lastDataFailed: false
    });
  }

  handleLogLevelChange(newValue) {
    const searchState = this.props.search;
    searchState.levels = newValue;
    this.props.onSearchUpdated(searchState);
  }

  handleCategoryChange(newValue) {
    const searchState = this.props.search;
    searchState.categories = newValue;
    this.props.onSearchUpdated(searchState);
  }

  handlePlayerIdChange(newValue) {
    const searchState = this.props.search;
    searchState.playerId = newValue;
    this.props.onSearchUpdated(searchState);
  }

  handleMessageQueryChange(newValue) {
    const searchState = this.props.search;
    searchState.messageQuery = newValue;
    this.props.onSearchUpdated(searchState);
  }

  handleDataQueryChange(newValue) {
    const pass = newValue.every(element => {
      try {
        const split = element.split(":", 2);
        const key = split[0];
        const value = JSON.parse(split[1]);
        const entry = {};
        entry[key] = value;
        const json = JSON.stringify(entry);

        const parsed = JSON.parse(json);
        console.log(json, parsed);
      } catch (ex) {
        console.log("failed:", element);
        return false;
      }
      return true;
    });

    this.setState({
      lastDataFailed: !pass
    });

    if (!pass) {
      return;
    }

    const searchState = this.props.search;
    searchState.dataQuery = newValue;
    this.props.onSearchUpdated(searchState);
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
            Form.Group,
            { widths: "equal" },
            React.createElement(Form.Dropdown, {
              onChange: (e, p) => this.handleLogLevelChange(p.value),
              label: "Log Level",
              placeholder: "All",
              fluid: true,
              multiple: true,
              selection: true,
              value: this.props.search.levels,
              options: Object.keys(Constants.LogLevels).map(key => {
                return {
                  key: key,
                  text: key,
                  value: Constants.LogLevels[key]
                };
              })
            }),
            React.createElement(Form.Dropdown, {
              onChange: (e, p) => this.handleCategoryChange(p.value),
              label: "Category",
              placeholder: "All",
              fluid: true,
              multiple: true,
              selection: true,
              value: this.props.search.categories,
              options: Object.keys(Constants.Category).map(key => {
                return {
                  key: key,
                  text: key,
                  value: Constants.Category[key]
                };
              })
            }),
            React.createElement(Form.Input, {
              onChange: (e, p) => this.handlePlayerIdChange(p.value),
              label: "Player Id",
              placeholder: "Any",
              fluid: true,
              value: this.props.search.playerId
            })
          ),
          React.createElement(
            Form.Group,
            { widths: "equal" },
            React.createElement(Form.Input, {
              onChange: (e, p) => this.handleMessageQueryChange(p.value),
              label: "Message Query",
              value: this.props.search.messageQuery,
              fluid: true,
              width: 6
            }),
            React.createElement(Form.Dropdown, {
              onChange: (e, p) => this.handleDataQueryChange(p.value),
              label: this.state.lastDataFailed
                ? "Data Query -- Invalid JSON Entered"
                : "Data Query",
              placeholder: "None",
              error: this.state.lastDataFailed,
              fluid: true,
              multiple: true,
              selection: true,
              allowAdditions: true,
              search: true,
              value: this.props.search.dataQuery,
              options: this.props.search.dataQuery.map(key => {
                return {
                  key: key,
                  text: key,
                  value: key
                };
              })
            })
          ),
          React.createElement(Button, {
            onClick: () => this.props.onSearchClicked()
          })
        )
      )
    );
  }
};

/*

React.createElement(
  Form,
  null,
  React.createElement(
    "div",
    { className: "three fields" },
    React.createElement(Form.Input, {
      label: "levels",
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
)

*/
