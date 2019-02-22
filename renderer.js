/**
 * @module Renderer
 *
 * @description Renderer entrypoint that displays the log viewer in the window
 */

const React = require("react");
const ReactDOM = require("react-dom");

var App = require("./src/app").App;
const MOUNT_NODE = document.getElementById("root");

ReactDOM.render(React.createElement(App, null, null), MOUNT_NODE);
