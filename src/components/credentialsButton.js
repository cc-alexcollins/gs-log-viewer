const React = require("react");

const Constants = require("../constants");
const Log = require("../log");

const {
  Button,
  Dropdown,
  Icon,
  Input,
  Label,
  Menu
} = require("semantic-ui-react");

exports.CredentialsButton = class CredentialsButton extends React.Component {
  setContainer(apiKey) {
    const credentialsState = this.props.credentials;
    if (apiKey === credentialsState.apiKey) return;

    credentialsState.apiKey = apiKey;
    credentialsState.token = null;
    this.props.onCredentialsUpdated(credentialsState);
  }

  render() {
    Log.renderLog("Credentials Button", this);
    let loading = this.props.credentials.loading;
    let loggedIn = this.props.credentials.token !== null;
    let loggedInText = loggedIn ? "Logged In!" : "Invalid Credentials";

    return React.createElement(
      Menu.Item,
      { position: "right" },
      React.createElement(
        Button,
        {
          as: "div",
          animated: "fade",
          loading: loading,
          positive: loggedIn && !loading,
          negative: !loggedIn && !loading,
          style: {
            overflow: "visible"
          }
        },
        React.createElement(
          Button.Content,
          {
            visible: true
          },
          React.createElement(Icon, { name: loggedIn ? "check" : "close" }),
          loggedInText
        ),
        React.createElement(
          Button.Content,
          {
            hidden: true
          },
          React.createElement(Dropdown, {
            text: Object.keys(Constants.Containers).find(
              c => Constants.Containers[c] === this.props.credentials.apiKey
            ),
            onChange: (e, props) => {
              if (!loading) {
                this.setContainer(props.value);
              }
            },
            options: Object.keys(Constants.Containers).map(c => {
              return {
                key: c,
                text: c,
                value: Constants.Containers[c]
              };
            }),
            value: this.props.credentials.apiKey
          })
        )
      )
    );
  }
};

/*
React.createElement(
  Button,
  {
    as: "div",
    animated: "fade",
    loading: this.props.credentials.loading,
    positive: loggedIn && !loading,
    negative: !loggedIn && !loading
  },
  React.createElement(
    Button.Content,
    {
      visible: true
    },
    React.createElement(Icon, { name: loggedIn ? "check" : "close" }),
    loggedInText
  ),
  React.createElement(
    Button.Content,
    {
      hidden: true
    },
    React.createElement(Dropdown, {
      text: Object.keys(Constants.Containers).find(
        c => Constants.Containers[c] === this.props.credentials.apiKey
      ),
      onChange: (e, props) => {
        if (!loading) {
          this.setContainer(props.value);
        }
      },
      options: Object.keys(Constants.Containers).map(c => {
        return {
          key: c,
          text: c,
          value: Constants.Containers[c]
        };
      }),
      value: this.props.credentials.apiKey
    })
  )
)

 React.createElement(Dropdown, {
   text: Object.keys(Constants.Containers).find(
     c => Constants.Containers[c] === this.props.credentials.apiKey
   ),
   onChange: (e, props) => {
     if (!loading) {
       this.setContainer(props.value);
     }
   },
   options: Object.keys(Constants.Containers).map(c => {
     return {
       key: c,
       text: c,
       value: Constants.Containers[c]
     };
   }),
   value: this.props.credentials.apiKey
 })

 React.createElement(
   Button,
   {
     as: "div",
     loading: this.props.credentials.loading,
     positive: loggedIn && !loading,
     negative: !loggedIn && !loading
   },
   React.createElement(Icon, { name: loggedIn ? "check" : "close" }),
   React.createElement(Dropdown, {
     text: loggedInText,
     onChange: (e, props) => {
       if (!loading) {
         this.setContainer(props.value);
       }
     },
     options: Object.keys(Constants.Containers).map(c => {
       return {
         key: c,
         text: c,
         value: Constants.Containers[c]
       };
     }),
     value: this.props.credentials.apiKey
   })
 )
  */
