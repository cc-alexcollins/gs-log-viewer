const adminlte = require("adminlte-reactjs");
const React = require("react");
const ReactDOM = require("react-dom");

var HeaderBar = adminlte.HeaderBar;
var NavigationMenu = adminlte.NavigationMenu;

class LogViewer extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <HeaderBar />
        <NavigationMenu />
      </div>
    );
  }
}

ReactDOM.render(<LogViewer />, document.getElementById("widgets-container"));
