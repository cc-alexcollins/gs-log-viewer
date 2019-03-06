const React = require("react");
const SemanticUIReact = require("semantic-ui-react");
const util = require("util");

const CCUtils = require("../ccUtils");
const Constants = require("../constants");
const JsonAccordion = require("./jsonAccordion").JsonAccordion;
const Log = require("../log");

const Accordion = SemanticUIReact.Accordion;
const Card = SemanticUIReact.Card;
const Divider = SemanticUIReact.Divider;
const Grid = SemanticUIReact.Grid;
const Header = SemanticUIReact.Header;
const Icon = SemanticUIReact.Icon;
const List = SemanticUIReact.List;

exports.LogsDisplay = class LogsDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
          const error = element.contents.level === "ERROR";

          return React.createElement(
            Card,
            {
              key: index,
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
                key: "Contents",
                json: {
                  key: "Contents",
                  data: element.contents,
                  path: "obj",
                  depth: 0
                },
                blackList: ["obj.ts", "obj.log.category"]
              })
            )
          );
        })
      : [];

    return React.createElement(
      "div",
      null,
      React.createElement(Divider, null),
      React.createElement(
        Header,
        { as: "h3", block: true },
        "Displaying " + cards.length + " Elements"
      ),
      React.createElement(Card.Group, {
        children: cards
      })
    );
  }
};
