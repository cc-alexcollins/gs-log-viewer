const adminlte = require("adminlte-reactjs");
const React = require("react");

exports.HeaderBar = React.createClass({
  pushMenu: function() {
    var body = document.body;
    if (body.clientWidth > 768) {
      if (body.className.indexOf("sidebar-collapse") === -1) {
        body.className += " sidebar-collapse";
      } else {
        body.className = body.className.replace(" sidebar-collapse", "");
      }
    } else {
      if (body.className.indexOf("sidebar-open") === -1) {
        body.className += " sidebar-open";
      } else {
        body.className = body.className.replace(" sidebar-open", "");
      }
    }
  },

  render: function() {
    return React.createElement(
      "header",
      { className: "main-header" },
      // Logo
      React.createElement(
        "a",
        { href: "index2.html", className: "logo" },
        // Mini logo for sidebar mini 50x50 pixels
        React.createElement(
          "span",
          { className: "logo-mini" },
          React.createElement("b", null, "GSLV")
        ),
        // Logo for regular state and mobile devices
        React.createElement(
          "span",
          { className: "logo-lg" },
          React.createElement("b", null, "GS Log Viewer")
        )
      ),
      // Header Navbar: style can be found in header.less
      React.createElement(
        "nav",
        {
          className: "navbar navbar-static-top",
          role: "navigation"
        },
        // Sidebar toggle button
        React.createElement(
          "a",
          {
            href: "#",
            className: "sidebar-toggle",
            "data-toggle": "offcanvas",
            role: "button",
            onClick: this.pushMenu
          },
          React.createElement(
            "span",
            { className: "sr-only" },
            "Toggle navigation"
          )
        ),
        // Navigation menu
        React.createElement(
          "div",
          {
            className: "navbar-custom-menu"
          },
          React.createElement(
            "ul",
            {
              className: "nav navbar-nav"
            }
            /* Put custom nav bar elements here like this
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                {
                  href: "#",
                  "data-toggle": "control-sidebar"
                },
                React.createElement("i", {
                  className: "fa fa-gears"
                })
              )
            ) */
          )
        )
      ) // End nav
    ); // End header
  } // End render function
}); // End create class
