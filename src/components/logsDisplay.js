const React = require("react");
const SemanticUIReact = require("semantic-ui-react");
const util = require("util");

const Constants = require("../constants");
const Log = require("../log");
const LogsEntry = require("./logsEntry").LogsEntry;

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
          return React.createElement(LogsEntry, {
            key: index,
            element: element
          });
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
