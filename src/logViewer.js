const adminlte = require("adminlte-reactjs");
const React = require("react");
const ReactDOM = require("react-dom");

var HeaderBar = require("./src/headerBar").HeaderBar;
var NavigationMenu = adminlte.NavigationMenu;

class LogViewer extends React.Component {
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
}

ReactDOM.render(
  React.createElement(LogViewer, null, null),
  document.getElementById("widgets-container")
);
