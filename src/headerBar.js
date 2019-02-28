const React = require("react");
const SemanticUIReact = require("semantic-ui-react");

const Menu = SemanticUIReact.Menu;

exports.HeaderBar = class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.menuIndex,
      activeIndexSetter: props.onClick
    };
  }

  render() {
    console.log("header bar:", this.props);
    return React.createElement(
      Menu,
      {},
      React.createElement(Menu.Item, { header: true }, "Gamesparks Log Viewer"),
      React.createElement(
        Menu.Item,
        {
          active: this.props.menuIndex === 1,
          onClick: () => this.props.onClick(1)
        },
        "Logs"
      ),
      React.createElement(
        Menu.Item,
        {
          disabled: true,
          active: this.props.menuIndex === 2,
          onClick: () => this.props.onClick(2)
        },
        "Game Data"
      )
    );
  }
};
