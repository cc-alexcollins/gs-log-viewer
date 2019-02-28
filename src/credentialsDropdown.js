const React = require("react");
const SemanticUIReact = require("semantic-ui-react");
const Log = require("./log");

const Dropdown = SemanticUIReact.Dropdown;
const Item = SemanticUIReact.Item;
const Menu = SemanticUIReact.Menu;

exports.CredentialsDropdown = class CredentialsDropdown extends React.Component {
  render() {
    Log.renderLog("Credentials Dropdown", this);
    return React.createElement(
      "a",
      { className: "ui dropdown item" },
      "Credentials",
      React.createElement("i", { className: "dropdown icon" }),
      React.createElement(
        "div",
        { className: "menu" },
        React.createElement(Item, null, "Item1"),
        React.createElement(Item, null, "Item2")
      )
    );
  }
};
