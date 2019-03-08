const React = require("react");

const Constants = require("../constants");
const Log = require("../log");
const Timer = require("../timer");

const {
  Accordion,
  Button,
  Checkbox,
  Dropdown,
  Grid,
  Header,
  Form,
  Input,
  Item,
  Menu,
  Visibility
} = require("semantic-ui-react");

exports.SearchContainer = class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stuck: false,
      active: true,
      lastDataFailed: false,
      timeToUpdate: 0
    };
  }

  handleAccordionClick() {
    this.setState({
      active: !this.state.active,
      lastDataFailed: false
    });
  }

  handleLogLevelChange(level, add) {
    const index = this.props.search.levels.indexOf(level);
    if (add && index < 0) {
      this.props.search.levels.push(level);
    } else if (!add && index >= 0) {
      this.props.search.levels.splice(index, 1);
    }

    this.pushSearchUpdate();
  }

  handleCategoryChange(newValue) {
    this.props.search.categories = newValue;
    this.pushSearchUpdate();
  }

  handlePlayerIdChange(newValue) {
    this.props.search.playerId = newValue;
    this.pushSearchUpdate();
  }

  handleMessageQueryChange(newValue) {
    this.props.search.messageQuery = newValue;
    this.pushSearchUpdate();
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

    this.props.search.dataQuery = newValue;
    this.pushSearchUpdate();
  }

  pushSearchUpdate() {
    const searchState = this.props.search;
    searchState.skip = 0;
    searchState.canSkip = false;
    this.props.search.onSearchUpdated(searchState);
  }

  render() {
    Log.renderLog("Search Container", this);

    if (this.props.search.forceDisplayActive !== undefined) {
      // temp state update -- update happens in component did update
      this.state.active = this.props.search.forceDisplayActive;
    }

    const createCheckbox = level => {
      return React.createElement(
        Form.Field,
        null,
        React.createElement(
          Grid,
          null,
          React.createElement(
            Grid.Column,
            {
              textAlign: "center"
            },
            React.createElement(Checkbox, {
              checked: this.props.search.levels.includes(level),
              toggle: true,
              onChange: (e, props) =>
                this.handleLogLevelChange(level, props.checked)
            }),
            level
          )
        )
      );
    };

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
            Timer.active()
              ? "Search (Refreshing In " + Math.round(Timer.timeLeft()) + "s)"
              : "Search"
          ),
          React.createElement(
            Accordion.Content,
            { active: this.state.active },
            React.createElement(
              Form,
              null,
              React.createElement(
                Header,
                { className: "dividing", as: "h4" },
                "Parameters"
              ),
              React.createElement(
                Form.Group,
                { widths: "equal" },
                React.createElement(
                  Form.Field,
                  {
                    label: "Log Levels",
                    control: "div"
                  },
                  React.createElement(
                    Form.Group,
                    { widths: "equal" },
                    createCheckbox(Constants.LogLevels.Debug),
                    createCheckbox(Constants.LogLevels.Error),
                    createCheckbox(Constants.LogLevels.Exception)
                  )
                  /*,

                  React.createElement(
                    Grid,
                    null,
                    createCheckbox(Constants.LogLevels.Debug),
                    createCheckbox(Constants.LogLevels.Error),
                    createCheckbox(Constants.LogLevels.Exception)
                  ) */
                ),
                /*
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
                }), */
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
                  this.props.search.autoRefresh
                    ? Timer.active()
                      ? "On"
                      : "On (Paused)"
                    : "Off"
                ),
                React.createElement(
                  Form.Button,
                  {
                    onClick: () => {
                      if (!this.props.search.active) {
                        this.props.search.onSearchClicked();
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
      this.props.search.onSearchUpdated(searchState);
    }

    Timer.update("searchContainer", () => {
      this.setState({
        timeToUpdate: Timer.timeLeft()
      });
    });
  }
};
