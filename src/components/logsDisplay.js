const React = require("react");
const SemanticUIReact = require("semantic-ui-react");

const Constants = require("../constants");
const Log = require("../log");

exports.LogsDisplay = class LogsDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement("p", null, JSON.stringify(this.props.elements));
  }
};
