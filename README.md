# Youth-India
For the Task 1 - Backend

In this assignment you have to implement google calendar integration using rest API. You need to
use the OAuth2 mechanism to get users calendar access. Below are detail of API endpoint and
corresponding views which you need to implement –
1) /rest/v1/calendar/init/ - GoogleCalendarInitView()
This view should start step 1 of the OAuth. Which will prompt the user for his/her credentials.
2) /rest/v1/calendar/redirect/ -> GoogleCalendarRedirectView()

Solution Implementation,
/rest/v1/calendar/init/ - GoogleCalendarInitView():
To begin,  you use the Google API Client Library for Node.js to initiate the OAuth flow and prompt the user to grant permission to access their Google Calendar. 
You can/should use the google-auth-library package to handle the OAuth flow and retrieve the access token. 

This implementation will redirect the user to the Google OAuth consent screen where they can grant permission to your application to access their Google Calendar.

Moving forward, /rest/v1/calendar/redirect/ -> GoogleCalendarRedirectView():
Once the user grants permission, they will be redirected to your redirect_uri with a code parameter that you can exchange for an access token.

This implementation will exchange the code parameter for an access token using the getToken() method of the oAuth2Client object. It will then set the access token on the oAuth2Client object and use it to fetch a list of the user's upcoming calendar events using the calendar.events.list() method of the google.calendar object.

Note: Make sure to replace your_client_id, your_client_secret, and your_redirect_url with the appropriate values from your Google Cloud Console


Task 2 - Frontend 
Create a React.Js application in which you will use any open API, E.g., Pokemon Api fetch its
data and paginate the result with a live search feature and also make another page in that
you have to use lazy load feature (i.e, initially it loads some results and as we reach the page
end it it fetches more results automatically and displays them) along with live search.

Solution Implementation:

1. first define the URL of the Pokemon API and the page size to be displayed at a time. 
2. define the App component, which consists of state variables for loading, error, and Pokemon data, as well as the current page number and search text.
3. define a function fetchPokemonData that fetches data from the Pokemon API using fetch and sets the pokemonData state.
4. define a function handleScroll that is called when the user scrolls to the bottom of the page and increments the current page number.
5. use useEffect hooks to attach an event listener for the scroll event, fetch Pokemon data on mount and when the current page changes, and filter the Pokemon data based on the search text. 
6. Now, ender the Pokemon list with a search input and loading/error messages.
  
  
Note: To display more information, you can modify the fetchPokemonData function to fetch the full details of each Pokemon and render them in the list items. Additionally, you can modify the handleScroll function to implement lazy loading and fetch more data
