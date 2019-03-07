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
      (this.props.search.skip + 1) +
      " - " +
      cards.length;

    return React.createElement(
      "div",
      null,
      React.createElement(Divider, null),
      React.createElement(
        Header,
        { as: "h3", block: true },
        headerText,
        React.createElement(Button)
      ),
      React.createElement(Card.Group, {
        children: cards
      })
    );
  }
};
