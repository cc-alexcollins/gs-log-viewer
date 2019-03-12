const { BrowserWindow } = require("electron").remote;
const React = require("react");
const util = require("util");

const Constants = require("../constants");
const Log = require("../log");

const {
  Accordion,
  Button,
  Card,
  Divider,
  Grid,
  Header,
  Icon
} = require("semantic-ui-react");
const { LogsEntry } = require("./logsEntry");

exports.LogsDisplay = class LogsDisplay extends React.Component {
  constructor(props) {
    super(props);
    console.log("BrowserWindow", BrowserWindow);
  }

  render() {
    Log.renderLog("Logs Display", this);

    if (!this.props.elements) {
      return React.createElement(
        Header,
        {
          block: true,
          style: {
            marginTop: "14px"
          }
        },
        React.createElement("h3", null, "Ready to search")
      );
    } else if (this.props.elements.length === 0) {
      return React.createElement(
        Header,
        {
          block: true,
          style: {
            marginTop: "14px"
          }
        },
        React.createElement("h3", null, "No Results Found!")
      );
    }

    let closeAll = this.props.search.forceDisplayActive !== undefined;

    const cards = this.props.elements
      ? this.props.elements.map((element, index) => {
          return React.createElement(LogsEntry, {
            key: index,
            element: element,
            forceClose: closeAll
          });
        })
      : [];

    const headerText =
      "Displaying Elements " +
      (this.props.search.lastSkip + 1) +
      " - " +
      (this.props.search.lastSkip + cards.length);

    const moreElements = cards.length === this.props.search.pageSize;

    const skipButtons = [];
    if (this.props.search.skip > this.props.search.pageSize) {
      skipButtons.push(
        React.createElement(
          Button,
          {
            key: "first-button",
            color: "grey",
            disabled: !this.props.search.canSkip || !moreElements,
            loading: this.props.search.active && this.props.search.canSkip,
            onClick: () => {
              if (this.props.search.skip > this.props.search.pageSize) {
                this.handleSearchReset();
              }
            }
          },
          React.createElement(Icon, {
            name: "repeat"
          }),
          "Reset"
        )
      );
    }

    if (this.props.search.skip > 0) {
      skipButtons.push(
        React.createElement(
          Button,
          {
            key: "back-button",
            color: "grey",
            disabled: !this.props.search.canSkip || !moreElements,
            loading: this.props.search.active && this.props.search.canSkip,
            onClick: () => {
              if (this.props.search.skip > 0) this.handleSearchSkip(false);
            }
          },
          React.createElement(Icon, {
            name: "left arrow"
          }),
          "Back"
        )
      );
    }

    skipButtons.push(
      React.createElement(
        Button,
        {
          key: "next-button",
          color: "grey",
          disabled: !this.props.search.canSkip || !moreElements,
          loading: this.props.search.active && this.props.search.canSkip,
          onClick: () => {
            if (moreElements) this.handleSearchSkip(true);
          }
        },
        moreElements ? "Next" : "All elements loaded",
        React.createElement(Icon, {
          name: moreElements ? "right arrow" : "check"
        })
      )
    );

    return React.createElement(
      "div",
      null,
      React.createElement(Divider, null),
      React.createElement(
        Header,
        {
          block: true,
          style: {
            marginTop: "14px"
          }
        },
        React.createElement(
          Grid,
          {
            columns: "equal"
          },
          React.createElement(
            Grid.Column,
            {
              textAlign: "left",
              verticalAlign: "middle"
            },
            React.createElement("h3", null, headerText)
          ),
          React.createElement(Grid.Column, {
            textAlign: "right",
            verticalAlign: "middle",
            children: skipButtons
          })
        )
      ),
      React.createElement(Card.Group, {
        children: cards
      }),
      React.createElement(
        Header,
        {
          block: true,
          style: {
            marginTop: "14px"
          }
        },
        React.createElement(
          Grid,
          {
            columns: "equal"
          },
          React.createElement(Grid.Column, {
            textAlign: "center",
            verticalAlign: "middle",
            children: skipButtons
          })
        )
      )
    );
  }

  handleSearchReset() {
    this.handleSetSkip(0);
  }

  handleSearchSkip(forward) {
    const search = this.props.search;
    const newSkip =
      search.skip + (forward ? search.pageSize : -search.pageSize);
    this.handleSetSkip(newSkip);
  }

  handleSetSkip(skip) {
    const search = this.props.search;
    search.skip = skip;
    search.onSearchUpdated(search);
    search.onSearchClicked();

    if (window) {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
      });
    }
  }
};
