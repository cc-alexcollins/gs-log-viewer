const React = require("react");
const SemanticUIReact = require("semantic-ui-react");

const Constants = require("../constants");
const Log = require("../log");

const Accordion = SemanticUIReact.Accordion;
const Button = SemanticUIReact.Button;
const Dropdown = SemanticUIReact.Dropdown;
const Header = SemanticUIReact.Header;
const Form = SemanticUIReact.Form;
const Input = SemanticUIReact.Input;
const Item = SemanticUIReact.Item;
const Menu = SemanticUIReact.Menu;
const Visibility = SemanticUIReact.Visibility;

exports.SearchContainer = class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stuck: false,
      active: true,
      lastDataFailed: false
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

    if (this.props.search.reOpen) {
      this.state.active = true; // temp state update
    }

    return React.createElement(
      Visibility,
      {
        onBottomPassed: () => this.setState({ stuck: true }),
        onBottomVisible: () => this.setState({ stuck: false }),
        once: false
      },
      React.createElement(
        Menu,
        { borderless: true, fixed: this.state.stuck ? "top" : undefined },
        React.createElement(
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
              React.createElement(
                Header,
                { className: "dividing", as: "h4" },
                "Refresh"
              ),
              React.createElement(
                Form.Group,
                { inline: true },
                React.createElement(
                  Form.Button,
                  {
                    onClick: () =>
                      this.props.onSearchAutoClicked(
                        !this.props.search.autoRefresh
                      ),
                    label: "Auto-Refresh",
                    toggle: true,
                    active: this.props.search.autoRefresh
                  },
                  this.props.search.autoRefresh ? "On" : "Off"
                ),
                React.createElement(
                  Form.Button,
                  {
                    onClick: () => {
                      if (!this.props.search.active) {
                        this.props.onSearchClicked();
                      }
                    },
                    positive: true,
                    loading: this.props.search.active,
                    disabled: !this.props.canSearch
                  },
                  "Search Now"
                )
              )
            )
          )
        )
      )
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.search.forceDisplayActive !== undefined) {
      this.setState({
        active: this.props.search.forceDisplayActive
      });

      const searchState = this.props.search;
      searchState.forceDisplayActive = undefined;
      this.props.onSearchUpdated(searchState);
    }
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
