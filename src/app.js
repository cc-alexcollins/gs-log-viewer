const React = require("react");
const HeaderBar = require("./headerBar").HeaderBar;
const Log = require("./log");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIndex: 1,
      credentials: {
        token: "token",
        loading: false
      }
    };
  }

  render() {
    Log.renderLog("App", this);
    return React.createElement(
      "div",
      { className: "app" },
      React.createElement(
        HeaderBar,
        {
          menuIndex: this.state.menuIndex,
          onClick: index => this.setIndex(index),
          credentialsButtonProps: {
            credentials: this.state.credentials,
            showCredentials: () => this.showCredentials()
          }
        },
        null
      )
    );
  }

  setIndex(index) {
    if (this.state.menuIndex !== index) {
      this.setState({
        menuIndex: index
      });
    }
  }

  showCredentials() {
    this.setState({
      credentials: {
        token: "token",
        loading: !this.state.credentials.loading
      }
    });
  }
}

exports.App = App;
