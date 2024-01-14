![logo frontend](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/609cef58-7234-4025-a068-92302835e51d)

# MILLIONAIRE.webapp

The MILLIONAIRE.webapp is my original creation, a web application version, serving as a clone of the popular TV game show "Who Wants to Be a Millionaire." Users can assume the role of a player and compete with other participants in a points-based ranking system. All data-related operations are conducted through a dedicated API interface and a database. The application is hosted on Netlify, with the backend and database situated on PythonAnywhere servers. Thanks to carefully implemented responsive design, the program is accessible on all devices with internet access, allowing users to engage with it from any location. Additionally, the program has been designed in such a way that upon user login, a session is automatically created, lasting until logout or automatic expiration, ensuring convenience and security in using the application through the use of JSON Web Tokens.

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
- In your browser, open the address http://127.0.0.1:5500 to view your application.

Program MILLIONAIRE.webapp connects to the enpoints on the cloud server, you don't need to create a local backend server.


## Lessons Learned

While working on this project, I acquired the skill of integrating programs running on different servers and delved into issues related to CORS policy. To enhance user convenience, I devised a session system where user JWT tokens are stored in the local browser memory. Through this mechanism, the program analyzes effective ways to manage interactions with the user, allowing them to remain logged in even after leaving the application. Throughout the creation process, I also focused on ensuring an aesthetic and modern appearance for the application, introducing responsive design to make it accessible on any device. When developing the web version of the "Who Wants to Be a Millionaire" game, I deepened my knowledge of CSS and HTML, which proved to be extensive. In the course of the project, I refined elements from the previous desktop version of the "Who Wants to Be a Millionaire" game. I implemented proper validation at the web application level while maintaining data validation on the backend. JWT access tokens are automatically refreshed and overwritten in the browser's memory. I also added security measures, including user activation before creating an account, to prevent the creation of fake profiles. Additionally, I introduced a sound controller, allowing users to adjust the volume of sounds in the application. The game received an attractive appearance, and the automatic updating of the question list ensures that users will never run out of questions. The knowledge gained taught me the importance of considering user experience during application development, translating into attractiveness and usability for the user. In summary, during the work on this project, I honed my skills in creating web applications, transitioning from previous experience in developing desktop applications. I also gained an awareness of the importance of data security, leading to the implementation of additional safeguards both in the server-side API and the application itself. At this stage of programming, the key challenge is not only creating functions and code but also ensuring they are secure and meet specified standards.


## Features to be implemented
- The function of adding more questions from a .json file after prior validation. There is already such a function on the backend.
- The function of resetting the password to the account via a code sent to the e-mail.
- The function of restoring a deleted account via a code sent to an e-mail.
- Questions added should not go directly to the "questions" table, but first to a substitute table, and only after the administrator's verification should they be transferred to the main table.
 
 
## Authors

[@Grzegorz96](https://www.github.com/Grzegorz96)


## Contact

E-mail: grzesstrzeszewski@gmail.com


## License

[MIT](https://github.com/Grzegorz96/millionaire-web-app/blob/master/LICENSE.md)


## Screnshoots
### View for desktop and laptop screens:
##### Screenshot of the enter app panel
![enter_app](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/6c33cf71-27c2-4a3e-8d40-e03f8f48d0e9)
##### Screenshot of the start panel
![start_panel](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/388e4555-21c7-4736-a92b-9a1a81e49441)
##### Screenshot of the login panel
![login_panel](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/325c7cf6-25e8-488d-a0aa-ba0480b03ef7)
##### Screenshot of the register panel
![register_panel](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/b80d30fd-5b28-4503-8455-1a247e4bac0d)
##### Screenshot of the account activation panel
![auth_panel](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/b93940d3-07dd-4ee4-bbe0-eec3556d1a76)
##### Screenshot of the add question panel
![add_question](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/8401444f-bd4e-4d61-ba3e-c30b54cc2083)
##### Screenshot of the user panel
![user_panel](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/4d8fd01d-1138-4a65-bf32-9dc061585429)
##### Screenshot of selecting answer in game panel
![select_answer](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/10cf9675-882e-44cb-9325-e65f58d9f644)
##### Screenshot of selecting right answer in game panel
![right_answer](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/a4a6556e-3631-485e-bc11-238acdbaed85)
##### Screenshot of using the fifty-fifty function
![fifty_fifty](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/c904f89d-1bbe-40dc-b498-3424a587752b)
##### Screenshot of selecting wrong answer in game panel
![wrong_answer](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/4ec52510-b513-4116-b04e-7b216c770555)
##### Screenshot of the end game panel
![end_game_panel](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/e2ecfcb5-b260-4935-98df-fe676f183da0)
##### Screenshot of the best scores panel
![best_scores](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/2f97b2c4-0521-45eb-b8df-dec41fa855ad)
##### Screenshot of one of the information pop-ups
![popup_enter_app](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/229e0962-2039-429c-878d-8894d953db7c)

### View for mobile devices:
##### Screenshot of the enter app panel
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/d4d3ca0d-9bd2-487f-a3d0-7fa3d798556e" width="400">

##### Screenshot of the start panel
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/efff8982-90dd-4b3e-b619-941c2d577c15" width="400"> 

##### Screenshot of the login panel
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/0cadf033-db7b-4edc-8b3a-0e8fd8ec32e7" width="400"> 

##### Screenshot of the register panel
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/aaa8b8ff-bb66-478e-a00d-be6a83ce7ffa" width="400"> 

##### Screenshot of the account activation panel
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/1c7d9615-4f06-457e-8df8-f2fe9851a00d" width="400"> 

##### Screenshot of the add question panel
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/3793bb10-4662-4150-b6cf-bbd102ce101b" width="400"> 

##### Screenshot of the user panel
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/087337ec-9e84-4c51-896d-691e3a5ab828" width="400"> 

##### Screenshot of selecting answer in game panel
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/2ff9c8ac-a50e-49a3-8e17-6962d2ab6bce" width="400"> 

##### Screenshot of selecting right answer in game panel
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/43c833bb-3f4e-44cd-9046-1b1cdf1f3074" width="400">

##### Screenshot of using the fifty-fifty function
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/2d64b2bb-0f0b-4d2e-905b-8f45da29f8cc" width="400">

##### Screenshot of selecting wrong answer in game panel
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/1688c47c-e8bc-4736-af33-f37445b998aa" width="400">

##### Screenshot of the end game panel
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/064854b5-8a44-477d-898c-2a75bf820b82" width="400">

##### Screenshot of the best scores panel
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/965b96c4-4a43-4534-8f94-2a34207823f6" width="400">

##### Screenshot of one of the information pop-ups
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/8e622b10-8a22-4a05-8455-562d5d8b20cf" width="400">

##### Screenshot of the drop-down menu while logged in
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/cd716c2e-15f6-4e46-8aa1-94a060255cb1" width="400">

##### Screenshot of the drop-down menu while logged out
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/c3b4b5dd-de89-4911-b534-a091f915ac3d" width="400">

##### Screenshot of in game panel for tablets
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/b3afab61-d36f-45d9-aa29-67295fe20a24" width="400">

##### Screenshot of in game panel for smaller mobile devices
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/6150292b-2a0d-4dfc-a0dd-09ef96b551a0" width="400">

##### Screenshot of the message with activation number
<img src="https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/25810b36-d6fe-4475-9d13-971d5b1a55fb" width="400">
