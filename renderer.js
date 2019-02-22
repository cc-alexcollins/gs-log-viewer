/**
 * @module Renderer
 *
 * @description Renderer entrypoint that displays the log viewer in the window
 */

const React = require("react");
const ReactDOM = require("react-dom");

var LogViewer = require("./src/logViewer").LogViewer;

ReactDOM.render(
  React.createElement(LogViewer, null, null),
  document.getElementById("widgets-container")
);
