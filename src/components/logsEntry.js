const React = require("react");
const SemanticUIReact = require("semantic-ui-react");
const util = require("util");

const Constants = require("../constants");
const JsonAccordion = require("./jsonAccordion").JsonAccordion;
const Log = require("../log");

const Card = SemanticUIReact.Card;
const Icon = SemanticUIReact.Icon;

exports.LogsEntry = class LogsEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const element = this.props.element;
    const error = element.contents.level === "ERROR";

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
        React.createElement(
          Card.Header,
          null,
          React.createElement(Icon, {
            name: error ? "exclamation" : "info",
            color: error ? "red" : undefined,
            circular: true
          }),
          "  ",
          element.contents.log.message
        )
      ),
      React.createElement(
        Card.Content,
        null,
        React.createElement(
          Card.Meta,
          null,
          util.format(
            "%s | %s",
            element.contents.log.category,
            new Date(element.contents.ts.$numberLong).toString()
          )
        ),
        React.createElement(JsonAccordion, {
          json: {
            key: "playerId",
            data: element.contents.playerId,
            path: "playerId",
            depth: 0
          },
          blackList: []
        }),
        React.createElement(JsonAccordion, {
          json: {
            key: "data",
            data: element.contents.log.data,
            path: "log.data",
            depth: 0
          },
          blackList: []
        }),
        React.createElement(JsonAccordion, {
          json: {
            key: "stackTrace",
            data: element.contents.stackTrace,
            path: "stackTrace",
            depth: 0
          },
          blackList: [],
          displayOverride: data => {
            const notLogIndex = data.findIndex(l => !l.includes("log"));
            if (notLogIndex >= 0) {
              return (
                data[notLogIndex] +
                " + " +
                (data.length - notLogIndex - 1) +
                " more"
              );
            }

            console.log("no log found!");
            return data[0];
          }
        })
      )
    );
  }
};
