## Beer Recommender Website - Brew Bros

Users over 21 are able to fill out a form with parameters such as alcohol by volume, style, category, brewer, and country and our web application randomly selects a random beer that fits their preferences. We created a clean user interface that makes it easy to get a customized beer recommendation. Access to an open beer database allowed our team to fetch results given user preferences to get exactly what the user is craving. The website gives a recommendation(randomly chosen from the list of results) if one exists; however, in some cases we are not able to accommodate a specific taste because a beer of that nature does not exist. In the future, a possible option that would complete the application would be a link on where to buy the beer or where it is available locally for that user, in which case our application would be a one-stop-shop for beer enthusiasts.

## Team and Team Members
Team Brew-Bros
https://brew-bros.herokuapp.com/

Christopher Bell,
Jason King,
Kamil Gumienny

## Technical Achievements
- **Tech Achievement 1**: Submitting a form through an XMLHTTPRequest and getting results that populate the html page.
- **Tech Achievement 2**: Making a custom function call to an API based on form selection on the index page 
- **Tech Achievement 3**: Adding an Audio snippet in the baby.html page that plays on click.
- **Tech Achievement 4**: Added an age-gate popup that verifies a user's age
- **Tech Achievement 5**: Created a callback function in the server that contacts the beer database
- **Tech Achievement 6**: Routing multiple HTML pages

### Design/Evaluation Achievements
- **Design Achievement 1**: Javascript Animation that fills a beer and displays information
- **Design Achievement 2**: Consistent CSS color and design scheme
- **Design Achievement 3**: Creating a clickable image (beer tap and sippy cup) that calls a JS function
- **Design Achievement 4**: Additional page for users under the age of 21
- **Design Achievement 5**: Added a custom beer icon that displays in the tab header
- **Design Achievement 6**: Cursor becomes a loading icon to indicate the backend is processing to keep users from leaving the site because the API call is fairly slow

### Team Coordination Activities

We met up as a group on multiple occasions and discussed our vision for the webpage. In our groupchat we would allocate the work and ask questions as necessary. Together we were able to figure out how to send and recieve a JSON file using XMLHTTPRequests, populate a webpage with results that are returned from the server, select elements based on their ID's, assign css classes to elements in order to create a consistent theme throughout our web application, and making API calls to external databases. The hardest concept to grasp was getting form data and sending it over an XML request as opposed to letting the form submit with a method="post"or "get" in the form header. We also encountered some trouble when trying to display the data on the front-end. While we did get back a JSON object, we sometimes had difficulty parsing it correctly or pulling the correct information from it. The data from the form was manually pulled upon submission and added to a json object that was sent over to the backend. The reason we chose to do it this way was because an XML request allowed us to go obtain results after POSTing the data and update the webpage accordingly. Finally, we would like to make note of the beer database's occasionally deficient information. A good portion of the beers stored there do not have an alcohol percentage associated with them, and thus have 0 in that field. We decided to still allow them to be chosen, as the user can specifiy they want a beer above 0%.
