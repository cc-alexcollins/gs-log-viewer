const React = require("react");

exports.App = React.createClass({
  render() {
    return React.createElement(
      "div",
      { className: "wrapper" },
      React.createElement("p", null, "testtesttest")
    );
  }
});
