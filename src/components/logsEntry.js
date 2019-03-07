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

    const children = Object.keys(element.contents).map((key, index) => {
      if (key === "ts") return;

      return React.createElement(JsonAccordion, {
        key: index,
        json: {
          key: key,
          data: element.contents[key],
          path: element.contents[key],
          depth: 0
        },
        blackList: ["log.category"]
      });
    });

    children.unshift(
      React.createElement(
        Card.Meta,
        { key: "meta" },
        util.format(
          "%s | %s",
          element.contents.log.category,
          new Date(element.contents.ts.$numberLong).toString()
        )
      )
    );

    return React.createElement(
      Card,
      {
        fluid: true,
        color: error ? "red" : undefined
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
      React.createElement(Card.Content, {
        children: children
      })
    );
  }
};
