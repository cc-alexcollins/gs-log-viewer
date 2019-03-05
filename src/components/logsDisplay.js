const React = require("react");
const SemanticUIReact = require("semantic-ui-react");

const Constants = require("../constants");
const Log = require("../log");

const Accordion = SemanticUIReact.Accordion;
const Header = SemanticUIReact.Header;

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

    const panels = this.props.elements
      ? this.props.elements.map(element => {
          return {
            key: element.key,
            title: element.contents.log.message,
            content: React.createElement(
              Accordion.Content,
              null,
              React.createElement("p", null, element.contents.log.category)
            )
          };
        })
      : [];

    return React.createElement(
      "div",
      null,
      React.createElement(
        Header,
        { as: "h3", className: "dividing" },
        "Displaying " + panels.length + " Elements"
      ),
      React.createElement(Accordion, {
        styled: true,
        fluid: true,
        panels: panels
      })
    );
  }
};
