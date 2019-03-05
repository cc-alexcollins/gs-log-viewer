const React = require("react");

const HeaderBar = require("./headerBar").HeaderBar;
const SearchContainer = require("./searchContainer").SearchContainer;

const ApiWrapper = require("./api/apiWrapper");

const Constants = require("./constants");
const Log = require("./log");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIndex: 0,
      credentials: {
        username: "jeff@cloudcade.com",
        password: ".9L8kwHb",
        apiKey: "V369801KkvYT",
        stage: "preview",
        token: null
      },
      search: {
        collection: null,
        levels: [],
        categories: [],
        playerId: "",
        messageQuery: "",
        dataQuery: [],
        sort: null,
        fields: null,
        autoRefresh: false,
        active: false
      }
    };
  }

  componentDidMount() {
    this.setIndex(1);
    ApiWrapper.login(this.state.credentials).then(() => {
      this.setState({
        credentials: this.state.credentials
      });
    });
  }

  render() {
    Log.renderLog("App", this);

    var menuComponents = null;
    if (this.state.menuIndex === 1) {
      menuComponents = React.createElement(SearchContainer, {
        search: this.state.search,
        onSearchUpdated: search => this.updateSearch(search),
        onSearchAutoClicked: auto => {
          this.state.search.autoRefresh = auto;
          this.setState({ search: this.state.search });
        },
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
          collection: "script.log",
          levels: [Constants.LogLevels.Debug, Constants.LogLevels.Error],
          categories: [],
          playerId: "",
          messageQuery: "",
          dataQuery: [],
          sort:
            index === 1
              ? Constants.SortDefaults.TimestampLatest
              : Constants.SortDefaults.None,
          fields: Constants.FieldsDefaults.LogMessage,
          autoRefresh: true,
          active: false
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

  updateSearch(search) {
    this.cleanupSearch(search);
    this.setState({
      search: search
    });
  }

  cleanupSearch(search) {
    const ll = Object.values(Constants.LogLevels);
    search.levels.sort((x, y) => {
      return ll.indexOf(x) - ll.indexOf(y);
    });

    // Use alphanumeric sorting
    search.categories.sort();
  }

  search() {
    const search = this.state.search;

    // Build the query
    const query = search.dataQuery.reduce((query, element) => {
      const split = element.split(":", 2);
      const key = split[0];
      const value = JSON.parse(split[1]);
      const entry = {};
      entry[key] = value;
      const json = JSON.stringify(entry);

      const parsed = JSON.parse(json);
      const logKey = "log." + Object.keys(parsed)[0];
      query[logKey] = Object.values(parsed)[0];
      return query;
    }, {});

    if (search.levels && search.levels.length > 0) {
      query.level = {
        $in: search.levels.slice(0) // Shallow copy for the payload
      };
    }

    if (search.categories && search.categories.length > 0) {
      query["log.category"] = {
        $in: search.categories.slice(0) // Shallow copy for the payload
      };
    }

    if (search.playerId && search.playerId.length > 0) {
      query.playerId = search.playerId;
    }

    if (search.messageQuery && search.messageQuery.length > 0) {
      query["log.message"] = { $regex: search.messageQuery };
    }

    // Build the payload
    const payload = this.buildPayload(
      search.fields,
      100,
      query,
      0,
      search.sort
    );

    console.log("search for:", JSON.stringify(payload));

    Promise.resolve()
      .then(() => {
        this.state.search.active = true;
        this.setState({
          search: this.state.search
        });
      })
      .then(() => {
        return ApiWrapper.find(
          this.state.credentials,
          this.state.search.collection,
          payload
        );
      })
      .then(searchResultsArray => {
        console.log(
          "search complete! got " + searchResultsArray.length + " elements!"
        );

        this.state.search.active = false;
        this.setState({
          credentials: this.state.credentials,
          search: this.state.search
        });
      });
  }

  buildPayload(fields, limit, query, skip, sort) {
    return {
      fields: fields || {},
      limit: limit || 100,
      query: query || {},
      skip: skip || 0,
      sort: sort || {}
    };
  }
}

exports.App = App;
