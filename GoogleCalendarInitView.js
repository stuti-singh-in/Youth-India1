const {google} = require('googleapis');
const {OAuth2Client} = require('google-auth-library');

class GoogleCalendarInitView {
  async handle(req, res) {
    const CLIENT_ID = 'your_client_id';
    const CLIENT_SECRET = 'your_client_secret';
    const REDIRECT_URL = 'your_redirect_url';

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL
    );

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar'],
    });

    res.redirect(authUrl);
  }
}

module.exports = GoogleCalendarInitView;
