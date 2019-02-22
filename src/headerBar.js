const React = require("react");
const SemanticUIReact = require("semantic-ui-react");

console.log(React);

const Header = SemanticUIReact.Header;
const Icon = SemanticUIReact.Icon;

class HeaderBar extends React.Component {
  render() {
    return React.createElement(
      Header,
      { as: "h2" },
      React.createElement(Header.Content, null, "Gamesparks Log Viewer")
    );
  }
}

exports.HeaderBar = HeaderBar;
