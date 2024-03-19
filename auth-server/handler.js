'use strict'; // Always use strict mode to avoid bugs

const { google } = require("googleapis"); // Import googleapis
const calendar = google.calendar("v3"); // Import google calendar v3
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"]; // Define the scopes for the calendar so that we can access the calendar events
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ["https://pablocubo.github.io/meet/"]; // The redirect URI is the URL where the user will be redirected after the authorization


const oAuth2Client = new google.auth.OAuth2( // Create a new OAuth2Client
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);
// This function will be called when the user clicks on the "Authorize" button
module.exports.getAuthURL = async () => {

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    /**
     *  Exchange authorization code for access token with a “callback” after the exchange,
     *  The callback in this case is an arrow function with the results as parameters: “error” and “response”
     */
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
.then((results) => {

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Constrol-Allow-Credentials': true,
      },
      body: JSON.stringify(results),
    };
  })
  .catch ((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
}