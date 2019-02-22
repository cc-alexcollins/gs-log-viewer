const React = require("react");
const adminlte = require("adminlte-reactjs");

var HeaderBar = require("./headerBar").HeaderBar;
var NavigationMenu = adminlte.NavigationMenu;

exports.LogViewer = React.createClass({
  render() {
    return React.createElement(
      "div",
      { className: "wrapper" },
      React.createElement(HeaderBar, null, null)
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
