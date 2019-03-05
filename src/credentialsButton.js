const React = require("react");
const SemanticUIReact = require("semantic-ui-react");
const Log = require("./log");

const Button = SemanticUIReact.Button;
const Icon = SemanticUIReact.Icon;
const Input = SemanticUIReact.Input;
const Menu = SemanticUIReact.Menu;

exports.CredentialsButton = class CredentialsButton extends React.Component {
  render() {
    Log.renderLog("Credentials Button", this);
    let loading = this.props.credentials.loading;
    let loggedIn = this.props.credentials.token !== null;
    return React.createElement(
      Menu.Item,
      { position: "right" },
      React.createElement(
        Button,
        {
          className: "right labeled icon",
          loading: this.props.credentials.loading,
          positive: loggedIn && !loading,
          negative: !loggedIn && !loading,
          onClick: this.props.showCredentials
        },
        React.createElement(Icon, {
          name: loggedIn ? "check" : "close"
        }),
        loggedIn ? "Logged In!" : "Invalid Credentials"
      )
    );
  }
};
