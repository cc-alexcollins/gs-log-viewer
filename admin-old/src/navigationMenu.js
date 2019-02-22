const adminlte = require("adminlte-reactjs");
const React = require("react");

exports.NavigationMenu = React.createClass({
  render: function() {
    return React.createElement(
      "aside",
      { className: "main-sidebar" },
      // sidebar: style can be found in sidebar.less
      React.createElement(
        "section",
        { className: "sidebar" },
        // Sidebar user panel
        React.createElement(
          "div",
          { className: "user-panel" },
          React.createElement(
            "div",
            { className: "pull-left info" },
            React.createElement("p", null, "Card Brawl"),
            React.createElement(
              "a",
              {
                href: "#"
              },
              React.createElement("i", {
                className: "fa fa-circle text-success"
              }),
              "Online"
            )
          )
        ),
        // sidebar menu: : style can be found in sidebar.less
        React.createElement(
          "ul",
          { className: "sidebar-menu" },
          React.createElement("li", { className: "header" }, "MAIN NAVIGATION"),
          React.createElement(
            "li",
            { className: "active treeview" },
            React.createElement(
              "a",
              {
                href: "#"
              },
              React.createElement("i", { className: "fa fa-dashboard" }),
              React.createElement("span", null, "Logs"),
              React.createElement("i", {
                className: "fa fa-angle-left pull-right"
              })
            )
          )
        )
      )
    ); // End aside
  }
});
