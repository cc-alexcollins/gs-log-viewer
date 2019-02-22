const React = require("react");
const HeaderBar = require("./headerBar").HeaderBar;

class App extends React.Component {
  render() {
    return React.createElement(
      "div",
      { className: "wrapper" },
      React.createElement(HeaderBar, null, null)
    );
  }
}

exports.App = App;
