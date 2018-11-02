## Kamil Gumienny | a3-meals-for-the-week
https://a3-meals-for-the-week.herokuapp.com/

## Description
The goal of my project was to take a mundane task of writing out the meals for the week on the whiteboard in my fraternity's dining room and making an online application for it. I spent many hours watching Andrew Mead's Node.js course on Udemy and implementing some of his steps. Because my applciation involved a lot of experimentation, the design isn't as consistent as I would have wished but there is a simple user interface. Users are able to update the meals for the week, rate the cooks, and add requests for shopping trips. All data is stored in a MongoDB database provided by heroku.

## Technical Achievements
- **Tech Achievement 1**: Added event listeners to many of the buttons on the page, including the x button alongside the meals that deletes them from the database and a keypress event that detects "enter/return" and sends data to the server that updates the DB.
- **Tech Achievement 2**: Traversed the DOM tree. In the request table, every time an element is deleted, the parent DIV holding all the rows updates the table to maintain the alternating color scheme.
- **Tech Achievement 3**: Used Mongoose as opposed to Mongo to complete some operations quicker. For example, when adding a meal or up/downvoting a cook, the server is able to findOneAndUpdate as opposed to looking for document and if it does not exist creating it.
- **Tech Achievement 4**: Utilized promises in the code to prevent callbacks and starting a callback hell.
- **Tech Achievement 5**: Utilized XMLHttpRequests for every function in the front end and communicated with the server with JSON to prevent any kind of reloading of the webpage, no matter what the operation is.


### Design/Evaluation Achievements
- **Design Achievement 1**: Tables and Cooks have hover events on top of the elements that: 
allows users to navigate around the tables better
allows users to vote on their favorite cooks as well as showing their approval rating.
- **Design Achievement 2**: Cook names change based on their approval rating. The higher the rating, the brighter green abd the lower the rating, the darker the red.
- **Design Achievement 3**: Table for meal requests incorporates a scroll function to keep the size of it to a minimum.
- **Design Achievement 4**: Public files are in their own folder to comply with good programming principles
- **Design Achievement 5**: Created Mongoose schemas before beginning project and required certain variables to make sure the code was consistent and the databases maintained consistency. 
- **Design Achievement 6**: Text from request table is cleared. Because the webpage never reloads, something was needed to indicate that the query was sent to the backend.
- **Design Achievement 7**: The background in the meals for the week table turns green for 500 ms by using setTimeout before turning white again to inndicate query was sent to backend.
