![logo frontend](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/609cef58-7234-4025-a068-92302835e51d)

# MILLIONAIRE web.app

The MILLIONAIRE web.app is my original creation, serving as a clone of the popular TV game show "Who Wants to Be a Millionaire." Users can assume the role of a player and compete with other participants in a points-based ranking system. All data-related operations are conducted through a dedicated API interface and a database. The application is hosted on Netlify, with the backend and database situated on PythonAnywhere servers. Thanks to carefully implemented responsive design, the program is accessible on all devices with internet access, allowing users to engage with it from any location. Additionally, the program has been designed to enable users to log in during sessions that persist until logout or automatic session expiration, ensuring convenience and security in using the application thanks to JSON Web Tokens.

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
- The addQuestions.js module is responsible for displaying the question addition panel and sending new questions to the API.

generalFunctions.js:
- The last module, generalFunctions.js, contains functions used in other modules, such as changing navigation buttons, displaying and removing popups, checking user sessions, functions responsible for playing sound in the program, and other general-purpose functions.

The entire structure of the program is located in one HTML file called index.html, on the HTML side there is also validation of data entered by the user, while the application styles are described in the style.css file, which covers both styling of elements and aspects of application responsiveness.


## Features

- Two-step login verification:
###### - Getting access token, refresh token and user id.
###### - Getting informations about user using tokens and id.
- User logout.
- Three-step registration verification:
###### - Checking if the user is not already in the database.
###### - Email confirmation by the user with an activation code.
###### - Placing validated user data in the database.
- Deleting account.
- JSON Web Token for user authentication.
- Sending emails with an activation number to the account.
- Adding your own questions by the user.
- Updating and displaying logged in user.
- Displaying scores of top players.
- Adding scores of top players.
- Automatic refresh of JWT access tokens.
- Automatic verification of the current user session.
- Automatic login of a user with an active session.
- Download questions from the database and randomizing questions to the user, taking into account the current level.
- Sounds system.
- Sound controller that allows to mute, unmute and change the sound volume.
- Random rejection of two incorrect answers. 
- System of points.
- Ending the game with a guaranteed amount during a wrong answer, arbitrarily withdrawing from the game or by answering all questions correctly.
- Validation of entered data.
- Handling response errors from the server.
- Dynamic highlighting of the guaranteed amounts earned and the current amount.
- Automatic replenishment of the question list when the questions run out.
- Responsive appearance of the application, it can be used on all devices.
- Information pop-up system.
- Dropdown menu.
- Automatic closing dropdown Menu.


## Technology used
**Client:** 
- Languages: JavaScript, CSS, HTML
- Hosting for web application: www.netlify.com

**Server:** 
- Languages: Python, SQL
- Third Party Libraries: Flask, PyJWT, mysql-connector-python, python-dotenv
- Hosting for API: www.pythonanywhere.com
- Hosting for MySQL database: www.pythonanywhere.com


## Installation

### To quickly launch the Millionaire web application:
- Enter the link: https://millionaire-web-app.netlify.app

### For manually launching the application on the IDE:
#### Requirements:
##### Programs:
- Web browser.
- IDE, for example Visual Studio Code.

#### Instruction:
- Download millionaire-web-app repository:
```bash
 git clone https://github.com/Grzegorz96/millionaire-web-app.git
```
- Go to the millionaire-web-app directory.
- Open the millionaire-web-app on your IDE.
- To run the project on a local server on port 5500 using Visual Studio Code:
###### Download the "Live Server" extension:
- Go to the "Extensions" tab (Ctrl+Shift+X).
- Search for "Live Server."
- Install the extension named "Live Server" by Ritwick Dey.
###### Launch the "Live Server" extension:
- Locate the HTML file or any other file you want to run.
- Right-click on the file and choose "Open with Live Server" from the context menu.
- Alternatively, open the file and press the key combination Alt+L, Alt+O, or click "Go Live" on the bottom navigation bar.
###### Check the local server:
- After completing the above steps, the project will be running on a local server on the default port 5500.
- In your browser, open the address http://localhost:5500 to view your application.


