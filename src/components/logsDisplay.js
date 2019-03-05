const React = require("react");
const SemanticUIReact = require("semantic-ui-react");

const Constants = require("../constants");
const Log = require("../log");

const Accordion = SemanticUIReact.Accordion;
const Divider = SemanticUIReact.Divider;
const Grid = SemanticUIReact.Grid;
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

    const gridElements = this.props.elements
      ? this.props.elements.map((element, index) => {
          return React.createElement(
            Grid.Row,
            { key: index },
            React.createElement(
              Grid.Column,
              null,
              React.createElement(Accordion, {
                fluid: true,
                panels: [
                  {
                    key: element.key,
                    title:
                      element.contents.log.message + " -- " + element.isNew,
                    content: React.createElement(
                      Accordion.Content,
                      null,
                      React.createElement(
                        "p",
                        null,
                        element.contents.log.category
                      )
                    )
                  }
                ]
              })
            )
          );

          const x = {};
        })
      : [];

    return React.createElement(
      "div",
      null,
      React.createElement(Divider, null),
      React.createElement(
        Header,
        { as: "h3", block: true },
        "Displaying " + gridElements.length + " Elements"
      ),
      React.createElement(Grid, {
        divided: "vertically",
        overflow: "scroll",
        children: gridElements
      })
    );
  }
};
