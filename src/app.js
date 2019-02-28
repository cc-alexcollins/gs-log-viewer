const React = require("react");
const HeaderBar = require("./headerBar").HeaderBar;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIndex: 1
    };
  }

  render() {
    return React.createElement(
      "div",
      { className: "app" },
      React.createElement(
        HeaderBar,
        {
          menuIndex: this.state.menuIndex,
          onClick: index => this.setIndex(index)
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
}

exports.App = App;
