![logo frontend](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/609cef58-7234-4025-a068-92302835e51d)

# MILLIONAIRE web.app

The MILLIONAIRE web.app is my original creation, serving as a clone of the popular TV game show "Who Wants to Be a Millionaire." Users can assume the role of a player and compete with other participants in a points-based ranking system. All data-related operations are conducted through a dedicated API interface and a database. The application is hosted on Netlify, with the backend and database situated on PythonAnywhere servers. Thanks to carefully implemented responsive design, the program is accessible on all devices with internet access, allowing users to engage with it from any location. Additionally, the program has been designed to enable users to log in during sessions that persist until logout or automatic session expiration, ensuring convenience and security in using the application.

## Description of the modules

The program consists of 11 modules, each of which plays a unique role in the functioning of the application. Below is a brief description of each module:

index.js:
- The index.js module acts as a connector between modules. It is imported directly into the HTML file, and the rest of the modules are imported there. This assigns functions to the window object, allowing you to use them directly from the HTML file. Furthermore, this module is responsible for performing the program setup functions.

config.js:
- The config.js contains objects such as user, game, sounds, elementsOfHtml, and mixer, which are used in other modules. This is the place for program configuration objects.

dropDownMenu.js:
- The dropDownMenu.js module is responsible for the function of the toggleBtn button, which opens and closes the dropdown menu, ensuring interactivity of the user interface. It also has an automatic closing dropdown menu feature.

requests.js:
- The requests.js is responsible for creating queries and sending them to the server, as well as returning responses to parent functions. In this way, the module manages communication between the frontend and backend.

game.js:
- The game.js module is responsible for all functions related to the game, from its display, through logic, to functions making requests to the API.

login.js:
- The login.js module is responsible for displaying the login panel and handling the user login and logout process.

register.js:
- The register.js module is responsible for displaying the registration panel, handling the registration process and user activation.

userPanel.js:
- The userPanel.js module is responsible for displaying the user panel, retrieving user information, updating user data and deleting a user.

bestScores.js:
- The bestScores.js module takes care of fetching the list of top players and dynamically rendering and displaying it on the UI.

addQuestions.js:
The addQuestions.js module is responsible for displaying the question addition panel and sending new questions to the API.

generalFunctions.js:
- The last module, generalFunctions.js, contains functions used in other modules, such as changing navigation buttons, displaying and removing popups, checking user sessions, functions responsible for playing sound in the program, and other general-purpose functions.

- The entire structure of the program is located in one HTML file called index.html, on the HTML side there is also validation of data entered by the user, while the application styles are described in the style.css file, which covers both styling of elements and aspects of application responsiveness.
