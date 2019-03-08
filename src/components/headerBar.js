const React = require("react");
const SemanticUIReact = require("semantic-ui-react");
const Log = require("../log");

const CredentialsButton = require("./credentialsButton").CredentialsButton;

const Menu = SemanticUIReact.Menu;

exports.HeaderBar = class HeaderBar extends React.Component {
  render() {
    Log.renderLog("Header Bar", this);
    return React.createElement(
      Menu,
      null,
      React.createElement(Menu.Item, { header: true }, "GS Log Viewer"),
      React.createElement(
        Menu.Item,
        {
          active: this.props.menuIndex === 1,
          onClick: () => this.props.onClick(1)
        },
        "Logs"
      ),
      React.createElement(
        Menu.Item,
        {
          disabled: true,
          active: this.props.menuIndex === 2,
          onClick: () => this.props.onClick(2)
        },
        "Game Data"
      ),
      React.createElement(CredentialsButton, this.props.credentialsButtonProps)
    );
  }
};
