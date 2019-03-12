const request = require("superagent");

function getAccessToken(credentials) {
  const url =
    "https://auth.gamesparks.net/restv2/auth/game/" +
    credentials.apiKey +
    "/jwt/nosql";

  console.log("logging in at", url);

  return request
    .post(url)
    .auth(credentials.username, credentials.password)
    .accept("application/json")
    .then(response => {
      credentials.token = response.body["X-GS-JWT"];
      console.log(
        "Setting GS API Token for",
        credentials.apiKey,
        "|",
        credentials.token
      );
      return credentials;
    });
}

exports.getAccessToken = getAccessToken;
