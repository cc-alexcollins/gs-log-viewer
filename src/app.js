const React = require("react");
const HeaderBar = require("./headerBar").HeaderBar;
const SearchContainer = require("./searchContainer").SearchContainer;
const Constants = require("./constants");
const Log = require("./log");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIndex: 0,
      credentials: {
        show: false,
        token: "token",
        loading: false
      },
      search: {
        levels: [],
        categories: [],
        playerId: "",
        dataQuery: "",
        sort: ""
      }
    };
  }

  componentDidMount() {
    this.setIndex(1);
  }

  render() {
    Log.renderLog("App", this);

    var menuComponents = null;
    if (this.state.menuIndex === 1) {
      menuComponents = React.createElement(SearchContainer, {
        onSearchClicked: () => this.search()
      });
    }

    return React.createElement(
      "div",
      { className: "app" },
      React.createElement(
        HeaderBar,
        {
          menuIndex: this.state.menuIndex,
          onClick: index => this.setIndex(index),
          credentialsButtonProps: {
            credentials: this.state.credentials
          }
        },
        null
      ),
      menuComponents
    );
  }

  setIndex(index) {
    if (this.state.menuIndex !== index) {
      this.setState({
        menuIndex: index,
        search: {
          levels: [Constants.LogLevels.Debug, Constants.LogLevels.Error],
          categories: [],
          playerId: "",
          dataQuery: "",
          sort:
            index === 1
              ? Constants.SortDefaults.TimestampLatest
              : Constants.SortDefaults.None
        }
      });
    }
  }

  updateCredentials(credentials) {
    credentials.show = false;
    this.setState({
      credentials: credentials
    });
  }

  search() {}
}

exports.App = App;
