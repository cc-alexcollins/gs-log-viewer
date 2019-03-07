const React = require("react");

const ApiWrapper = require("./api/apiWrapper");

const HeaderBar = require("./components/headerBar").HeaderBar;
const SearchContainer = require("./components/searchContainer").SearchContainer;
const LogsDisplay = require("./components/logsDisplay").LogsDisplay;

const Constants = require("./constants");
const Log = require("./log");

const PAGE_SIZE = 50;

const DEFAULT_SEARCH = {
  collection: null,
  levels: [],
  categories: [],
  playerId: "",
  messageQuery: "",
  dataQuery: [],
  sort: null,
  fields: null,
  skip: 0,
  autoRefresh: false,
  active: false,
  forceDisplayActive: false
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIndex: 0,
      reopenSearch: false,
      credentials: {
        username: "jeff@cloudcade.com",
        password: ".9L8kwHb",
        apiKey: "h348516i1zcM",
        stage: "preview",
        token: null,
        loading: false
      },
      search: DEFAULT_SEARCH,
      display: {
        elements: null
      }
    };
  }

  componentDidMount() {
    this.setIndex(1, true);
    this.updateCredentials(this.state.credentials);
  }

  render() {
    Log.renderLog("App", this);

    var menuComponents = null;
    if (this.state.menuIndex === 1) {
      menuComponents = React.createElement(
        "div",
        null,
        React.createElement(SearchContainer, {
          search: this.state.search,
          onSearchUpdated: search => this.updateSearch(search),
          onSearchAutoClicked: auto => {
            this.state.search.autoRefresh = auto;
            this.setState({ search: this.state.search });
          },
          onSearchClicked: () => this.search(),
          canSearch: this.state.credentials.token !== null
        }),
        React.createElement(LogsDisplay, {
          search: this.state.search,
          elements: this.state.display.elements
        })
      );
    }

    return React.createElement(
      "div",
      { className: "app" },
      React.createElement(
        HeaderBar,
        {
          menuIndex: this.state.menuIndex,
          onClick: index => this.setIndex(index, false),
          credentialsButtonProps: {
            credentials: this.state.credentials,
            onCredentialsUpdated: credentials =>
              this.updateCredentials(credentials)
          }
        },
        null
      ),
      menuComponents
    );
  }

  setIndex(index, force) {
    if (this.state.menuIndex !== index || force) {
      const search = DEFAULT_SEARCH;
      search.collection = "script.log";
      search.levels = [Constants.LogLevels.Debug, Constants.LogLevels.Error];
      search.sort = Constants.SortDefaults.TimestampLatest;
      search.fields = Constants.FieldsDefaults.LogMessage;
      search.forceDisplayActive = true;

      this.setState({
        menuIndex: index,
        search: search,
        display: {
          elements: null
        }
      });
    }
  }

  updateCredentials(credentials) {
    Promise.resolve()
      .then(() => {
        // Get a new token
        credentials.token = null;
        credentials.loading = true;
        this.setState({
          credentials: credentials
        });
      })
      .then(() => {
        return ApiWrapper.login(this.state.credentials).then(credentials => {
          credentials.loading = false;
          this.setState({
            credentials: credentials
          });
          this.setIndex(this.state.menuIndex, true);
        });
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
      PAGE_SIZE,
      query,
      search.skip,
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
        const prev = this.state.display.elements;
        this.state.display.elements = searchResultsArray.map(res => {
          const id = res._id.$oid;
          delete res._id;
          return {
            key: id,
            contents: res,
            expanded: false,
            isNew: prev && !prev.find(e => e.key === id)
          };
        });

        this.state.search.active = false;
        this.state.search.forceDisplayActive =
          this.state.display.elements.length === 0;

        this.setState({
          credentials: this.state.credentials,
          search: this.state.search,
          display: this.state.display
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
