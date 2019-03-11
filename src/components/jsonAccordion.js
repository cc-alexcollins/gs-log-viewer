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
  boolean: "blue"
};

const COLON = ":  ";

const PADDING = 3;
const DEPTH_SPACING = 20;

function stackTraceNameDisplay(stackArray) {
  // Remove the first log entry for clarity
  const notLogIndex = stackArray.findIndex(l => l.search(/log:/gi) === -1);
  if (notLogIndex >= 0) {
    return (
      stackArray[notLogIndex] +
      (stackArray.length - notLogIndex - 1 > 0
        ? " + " + (stackArray.length - notLogIndex - 1) + " more"
        : "")
    );
  }

  return stackArray[0];
}

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
    const hasValue = data !== null && data !== undefined;

    // Check for a long tag first
    if (dataType === "object" && hasValue) {
      if (data.$numberLong !== undefined) {
        data = parseInt(data.$numberLong);
        dataType = "number";
      }
    }

    // Display the object as an expandable accordion
    if (dataType === "object" && hasValue) {
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
        if (this.props.json.key.includes("stack")) {
          nameText = stackTraceNameDisplay(data);
        } else {
          nameText = "array [ " + childCount + " ]";
        }
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

    // Display the value as a copiable field
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
          disabled: !hasValue,
          on: "hover",
          trigger: React.createElement(
            Label,
            {
              as: "a",
              color: TYPE_COLORS[dataType] || "black",
              horizontal: true,
              basic: true,
              onClick: () => {
                if (hasValue) clipboard.writeText(data.toString());
              }
            },
            hasValue ? data.toString() : "null"
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

exports.stackTraceNameDisplay = stackTraceNameDisplay;
