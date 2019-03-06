const React = require("react");
const SemanticUIReact = require("semantic-ui-react");

const Accordion = SemanticUIReact.Accordion;
const Icon = SemanticUIReact.Icon;
const Item = SemanticUIReact.Item;
const Label = SemanticUIReact.Label;
const List = SemanticUIReact.List;

const KEY_COLOR = "black";
const TYPE_COLORS = {
  object: "black",
  string: "orange",
  number: "red",
  boolean: "green"
};
const DEPTH_SPACING = 20;

exports.JsonAccordion = class JsonAccordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  render() {
    let data = this.props.json.data;
    let dataType = typeof data;
    if (dataType === "object") {
      let arrow = this.state.active ? "triangle down" : "triangle right";
      let nameText = "object { " + Object.keys(data).length + " }";
      if (Array.isArray(data)) {
        nameText = "array [ " + data.length + " ]";
        data = data.reduce((obj, element, index) => {
          obj[index] = element;
          return obj;
        }, {});
      }

      let name = React.createElement(
        Label,
        { basic: true, horizontal: true, color: TYPE_COLORS[dataType] }, // "object"
        nameText
      );

      const children = Object.keys(data).reduce((children, key) => {
        const element = data[key];
        const path = this.props.json.path + "." + key;
        if (this.props.blackList.includes(path)) return children;

        children.push(
          React.createElement(exports.JsonAccordion, {
            key: path,
            json: {
              key: key,
              data: element,
              path: path,
              depth: this.props.json.depth + 1
            },
            blackList: this.props.blackList
          })
        );
        return children;
      }, []);

      return React.createElement(
        Accordion,
        {
          fluid: true,
          exclusive: false,
          style: {
            marginTop: 0,
            paddingLeft: this.props.json.depth > 0 ? DEPTH_SPACING : 0
          }
        },
        React.createElement(
          Accordion.Title,
          {
            active: this.state.active,
            onClick: () => this.setState({ active: !this.state.active }),
            style: {
              paddingTop: 5,
              paddingBottom: 5
            }
          },
          React.createElement(
            Item,
            null,
            React.createElement(Icon, { name: arrow }),
            React.createElement(
              Label,
              { color: KEY_COLOR, horizontal: true },
              this.props.json.key
            ),
            ": ",
            this.state.active ? "" : name
          )
        ),
        React.createElement(Accordion.Content, {
          active: this.state.active,
          children: children
        })
      );
    }

    return React.createElement(
      Item,
      {
        style: {
          paddingLeft: DEPTH_SPACING,
          paddingTop: 3,
          paddingBottom: 3
        }
      },
      React.createElement(Icon, null),
      React.createElement(
        Label,
        { color: "black", horizontal: true },
        this.props.json.key
      ),
      ": ",
      React.createElement(
        Label,
        {
          color: TYPE_COLORS[dataType] || "black",
          horizontal: true,
          basic: true
        },
        data
      )
    );
  }
};
