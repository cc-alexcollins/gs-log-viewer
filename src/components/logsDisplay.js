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
  }

  render() {
    Log.renderLog("Logs Display", this);

    if (!this.props.elements) {
      return React.createElement(Header, null, "Ready to search");
    } else if (this.props.elements.length === 0) {
      return React.createElement(
        "div",
        null,
        React.createElement(
          Header,
          { as: "h2", className: "dividing" },
          "No Results Found!"
        )
      );
    }

    const cards = this.props.elements
      ? this.props.elements.map((element, index) => {
          return React.createElement(LogsEntry, {
            key: index,
            element: element
          });
        })
      : [];

    const headerText =
      "Displaying Elements " +
      (this.props.search.lastSkip + 1) +
      " - " +
      (this.props.search.lastSkip + cards.length);

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
          React.createElement(
            Grid.Column,
            {
              textAlign: "right",
              verticalAlign: "middle"
            },
            React.createElement(
              Button,
              {
                color: "grey",
                disabled: !this.props.search.canSkip,
                loading: this.props.search.active && this.props.search.canSkip,
                onClick: () => this.handleSearchNext()
              },
              "Load " + this.props.search.pageSize + " more",
              React.createElement(Icon, { name: "right arrow" })
            )
          )
        )
      ),
      React.createElement(Card.Group, {
        children: cards
      })
    );
  }

  handleSearchNext() {
    const search = this.props.search;
    search.skip += search.pageSize;
    search.onSearchUpdated(search);
    search.onSearchClicked();
  }
};
