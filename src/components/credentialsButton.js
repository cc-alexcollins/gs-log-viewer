const React = require("react");
const SemanticUIReact = require("semantic-ui-react");

const Constants = require("../constants");
const Log = require("../log");

const Button = SemanticUIReact.Button;
const Dropdown = SemanticUIReact.Dropdown;
const Icon = SemanticUIReact.Icon;
const Input = SemanticUIReact.Input;
const Label = SemanticUIReact.Label;
const Menu = SemanticUIReact.Menu;

exports.CredentialsButton = class CredentialsButton extends React.Component {
  setContainer(apiKey) {
    const credentialsState = this.props.credentials;
    credentialsState.apiKey = apiKey;
    this.props.onCredentialsUpdated(credentialsState);
  }

  render() {
    Log.renderLog("Credentials Button", this);
    let loading = this.props.credentials.loading;
    let loggedIn = this.props.credentials.token !== null;
    let loggedInText = loggedIn ? "Logged In!" : "Invalid Credentials";

    return React.createElement(
      Menu.Item,
      { position: "right" },
      React.createElement(
        Button,
        {
          as: "div",
          loading: this.props.credentials.loading,
          positive: loggedIn && !loading,
          negative: !loggedIn && !loading
        },
        React.createElement(Icon, { name: loggedIn ? "check" : "close" }),
        React.createElement(Dropdown, {
          text: loggedInText,
          onChange: (e, props) => {
            if (!loading) {
              this.setContainer(props.value);
            }
          },
          options: Object.keys(Constants.Containers).map(c => {
            return {
              key: c,
              text: c,
              value: Constants.Containers[c]
            };
          }),
          value: this.props.credentials.apiKey
        })
      )
    );
  }
};
