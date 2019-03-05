const request = require("superagent");
const util = require("util");

const Auth = require("./auth");

if (!request.Request.prototype.setHeaders) {
  request.Request.prototype.setGSHeaders = function(credentials) {
    return this.set("X-GS-JWT", credentials.token)
      .type("application/json")
      .accept("application/json");
  };
}

function login(credentials) {
  if (!credentials.token) {
    return Auth.getAccessToken(credentials);
  }

  return Promise.resolve();
}

async function find(credentials, collection, payload) {
  if (!validateCredentials(credentials)) {
    console.error("Invalid credentials!", credentials);
    return [];
  }

  const path = util.format(
    "%s/restv2/game/%s/mongo/collection/%s/find",
    baseURL(credentials),
    credentials.apiKey,
    collection
  );

  return request
    .post(path)
    .setGSHeaders(credentials)
    .send(payload)
    .then(response => {
      return response.body;
    })
    .catch(err => {
      console.log("find error", JSON.stringify(err));
      return [];
    });
}

//--- Helpers ---//

function baseURL(credentials) {
  return `https://${credentials.apiKey}.${
    credentials.stage
  }.cluster.gamesparks.net`;
}

function validateCredentials(credentials) {
  if (!credentials.apiKey) {
    return false;
  }

  if (!credentials.token) {
    return false;
  }

  return true;
}

exports.login = login;
exports.find = find;
