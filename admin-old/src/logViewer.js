const React = require("react");
const adminlte = require("adminlte-reactjs");

var HeaderBar = require("./headerBar").HeaderBar;
var NavigationMenu = require("./navigationMenu").NavigationMenu;

exports.LogViewer = React.createClass({
  render() {
    return React.createElement(
      "div",
      { className: "wrapper" },
      React.createElement(HeaderBar, null, null),
      React.createElement(NavigationMenu, null, null)
    );
    /*
    return (
      <div className="wrapper">
        <div className="test">"test1"</div>
        <div className="content-wrapper">
          <NavigationMenu />
        </div>
      </div>
    );
     */
  }
});
