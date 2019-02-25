#DoctorsPatients

#Overview
DoctorsPatients is an applicaiton that allows users to log in as either doctors or patients.

When a doctor logs in, they are then brought to their home page which displays a list of the patients that are assigned to them. Within that list they can click 'view details' to be shown a modal with extended patient information.

When a patient logs in, they are show their patient information page. They can then choose to edit their information if desired.

#FrontEnd
The front end is built using React, Redux, Semantic UI. The home page conditionally renders the correct user page based on traits associated with the logged in user. The NavBar is persistent throughout each view and offers a quick link to logout/login page.

CombineReducer and connect is used with redux to separate out the added functionality that doctors have and to create a more organized store. Within the redux dispatches,axios is used for HTTP requests to the server

Semantic UI was used for quick and professional styling and component based design.

#Server
The server is built in Node.js using express. The inital user log in route is via /auth. Passport is used to handle sessions.

All data routes are via /api. The /api/doctors route provides any information for the doctor front end components. I initially created other routes for doctor info and single patients, but decided they were not needed in the finished version.

The api/patients route provides endpoints for getting a single patient and updating a single patient. These are protected by comparing the current user and selected ID. If the matching user isn't logged in, they will receive an error preventing them from accessing the user data. Additionally, for updating the user some protection is used by extrapolating out the user info from the body to prevent incorrect/nefarious traits to be send to the database. Given more time, some form validation could be added on the front end forms to ensure only desired information gets through.

#databse
There is only one model in the database. For the length of this project I felt it was most straightforward to keep all users under the same table and create the 'isDoctor' trait to check if the user is a doctor or patient. I think for scalability and more robust options I would have created multiple tables with more complex associations, possible extracting user info to one table and creating doctors and patients that associate with userId as foreign keys and then a relationship between doctors and patients. I initally went down that route but decided against it for sake of completion.

#deployment
The app is deployed on heroku with a seeded database at doctorspatients.herokuapp.com

#things to improve/change
Testing - given a full fledged project test specs would need to be included to ensure scalability and functionality as changes happen.
ContinuousIntegration - along with testing, CI would ensure little to no downtime for a deployed and scaled project and given a wider window and more personal time would have included a test suite.
User Updating - I think the only real bug that came up towards teh end and just had to pass through. When updating a user information a refresh is needed to display the newly updated information correctly on the user home page. Handling the update process in redux differently with rendering the state/props would be able to display the correctly updated information without a manual refresh.
Codebase - while i tried to stick with DRY principles, I know there are a few areas that were duplicated and could be pulled out into individual components.
Organization - I fought with what direction to head in regards to doctors/patients db definitions and as a results this left refactoring code and some of it needs a second (or third) clean sweep.

#conclusion
This project was completed in the confines of a day. Even though the project was sat on for about a week, personal constraints left limited time to tackle it. I think in the process it definitely opened up the thought of handling how to verify and manage users with very different use goals ( doctors to view all their patients, extended info vs. users updating informatin and only viewing personal). I can see many use cases for created more robust schema to potentially offer uses to select doctors based on type, track appointments, and follow up information. Overall this was a good challenge to build out a full stack application using React,Redux, Node, Express, and PostGres and demonstrate those abilities. 

#walkthrough

1.  go to doctorspatients.herokuapp.com
2.  log in with username: cody@email.com password: 12345xx
3.  this will then display the doctor home page
4.  patients are displayed in a list format
5.  clicking the 'more details' button will display a modal with more information for that patient
6.  logout by clicking the navbar 'logout' tab
7.  log in with username: cory@email.com password: 123
8.  this will display the user
