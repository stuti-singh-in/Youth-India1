const {google} = require('googleapis');
const {OAuth2Client} = require('google-auth-library');

class GoogleCalendarRedirectView {
  async handle(req, res) {
    const CLIENT_ID = 'your_client_id';
    const CLIENT_SECRET = 'your_client_secret';
    const REDIRECT_URL = 'your_redirect_url';

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL
    );

    const code = req.query.code;

    const {tokens} = await oAuth2Client.getToken(code);

    oAuth2Client.setCredentials(tokens);

    const calendar = google.calendar({version: 'v3', auth: oAuth2Client});

    calendar.events.list(
      {
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      },
      (err, res) => {
        if (err) return console.log(`The API returned an error: ${err}`);

        const events = res.data.items;

        if (events.length) {
          console.log('Upcoming 10 events:');
          events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
          });
        } else {
          console.log('No upcoming events found.');
        }
      }
    );
  }
}

module.exports = GoogleCalendarRedirectView;
