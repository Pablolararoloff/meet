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
