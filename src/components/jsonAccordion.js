const React = require("react");
const { clipboard } = require("electron");
const {
  Accordion,
  Button,
  Icon,
  Item,
  Label,
  List,
  Popup
} = require("semantic-ui-react");

const KEY_COLOR = "black";
const TYPE_COLORS = {
  object: "black",
  string: "orange",
  number: "red",
  boolean: "green"
};

const COLON = ":  ";

const PADDING = 3;
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

      let childCount = 0;
      const children = Object.keys(data).reduce((children, key) => {
        const element = data[key];
        const path = this.props.json.path + "." + key;
        if (this.props.blackList.includes(path)) return children;
        childCount++;
        if (!this.state.active) return children;

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

      let nameText = "object { " + childCount + " }";
      if (this.props.displayOverride) {
        nameText = this.props.displayOverride(data);
      } else if (Array.isArray(data)) {
        nameText = "array [ " + childCount + " ]";
      }

      let name = React.createElement(
        Label,
        { basic: true, horizontal: true, color: TYPE_COLORS[dataType] }, // "object"
        nameText
      );

      let accordionContentNode = null;

      if (childCount > 0) {
        accordionContentNode = React.createElement(Accordion.Content, {
          active: this.state.active,
          style: {
            paddingTop: 0
          },
          children: children
        });
      } else {
        accordionContentNode = React.createElement("div", null);
      }

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
              paddingTop: PADDING,
              paddingBottom: PADDING
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
            COLON,
            this.state.active ? "" : name
          )
        ),
        accordionContentNode
      );
    }

    return React.createElement(
      Item,
      {
        style: {
          paddingLeft: this.props.json.depth > 0 ? DEPTH_SPACING : 0,
          paddingTop: PADDING,
          paddingBottom: PADDING
        }
      },
      React.createElement(Icon, null),
      React.createElement(
        Label,
        { color: KEY_COLOR, horizontal: true },
        this.props.json.key
      ),
      COLON,
      React.createElement(
        Popup,
        {
          position: "right center",
          hideOnScroll: true,
          on: "hover",
          trigger: React.createElement(
            Label,
            {
              as: "a",
              color: TYPE_COLORS[dataType] || "black",
              horizontal: true,
              basic: true,
              onClick: () => clipboard.writeText(data.toString())
            },
            data
          )
        },
        React.createElement(
          Popup.Content,
          null,
          React.createElement(Icon, { name: "copy" }),
          "Copy"
        )
      )
    );
  }
};
