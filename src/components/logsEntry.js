const React = require("react");
const util = require("util");

const Constants = require("../constants");
const Log = require("../log");

const { Card, Icon, Grid } = require("semantic-ui-react");
const { JsonAccordion } = require("./jsonAccordion");

exports.LogsEntry = class LogsEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    Log.renderLog("Logs Entry", this);

    const element = this.props.element;
    const error = element.contents.level === "ERROR";

    const topLevelDisplay = [];

    // Always include the meta
    topLevelDisplay.push(
      React.createElement(
        Card.Meta,
        {
          key: "meta" // child key
        },
        util.format(
          "%s | %s",
          element.contents.log.category,
          new Date(
            parseInt(element.contents.ts.$date.$numberLong)
          ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })
        )
      )
    );

    topLevelDisplay.push(
      React.createElement(JsonAccordion, {
        key: "playerId", // child key
        json: {
          key: "playerId",
          data: element.contents.playerId,
          path: "playerId",
          depth: 0
        },
        blackList: []
      })
    );

    // If it exists, add the exception next
    if (element.contents.log.exception) {
      topLevelDisplay.push(
        React.createElement(JsonAccordion, {
          key: "exception", // child key
          json: {
            key: "exception",
            data: element.contents.log.exception,
            path: "exception",
            depth: 0
          },
          blackList: []
        })
      );
    }

    // Then include all of the data
    topLevelDisplay.push(
      React.createElement(JsonAccordion, {
        key: "data", // child key
        json: {
          key: "data",
          data: element.contents.log.data,
          path: "data",
          depth: 0
        },
        blackList: ["data.combatInstance._id"]
      })
    );

    // Finally, put the stack at the bottom
    topLevelDisplay.push(
      React.createElement(JsonAccordion, {
        key: "stackTrace", // child key
        json: {
          key: "stackTrace",
          data: element.contents.stackTrace,
          path: "stackTrace",
          depth: 0
        },
        blackList: []
      })
    );

    return React.createElement(
      Card,
      {
        fluid: true,
        color: error ? "red" : undefined,
        style: {
          marginTop: "0.5em",
          marginBottom: "0.5em",
          marginRight: "1em",
          marginLeft: "1em"
        }
      },
      React.createElement(
        Card.Content,
        null,
        React.createElement(Icon, {
          name: error ? "exclamation" : "info",
          color: error ? "red" : undefined,
          circular: true
        }),
        "   ",
        React.createElement("b", null, element.contents.log.message)
      ),
      React.createElement(Card.Content, {
        children: topLevelDisplay
      })
    );
  }
};
