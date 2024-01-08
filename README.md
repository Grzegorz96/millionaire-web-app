![logo frontend](https://github.com/Grzegorz96/millionaire-web-app/assets/129303867/609cef58-7234-4025-a068-92302835e51d)

# MILLIONAIRE web.app

The MILLIONAIRE web.app is my original creation, serving as a clone of the popular TV game show "Who Wants to Be a Millionaire." Users can assume the role of a player and compete with other participants in a points-based ranking system. All data-related operations are conducted through a dedicated API interface and a database. The application is hosted on Netlify, with the backend and database situated on PythonAnywhere servers. Thanks to carefully implemented responsive design, the program is accessible on all devices with internet access, allowing users to engage with it from any location. Additionally, the program has been designed to enable users to log in during sessions that persist until logout or automatic session expiration, ensuring convenience and security in using the application.

## Description of the modules

The program consists of 11 modules, each of which plays a unique role in the functioning of the application. Below is a brief description of each module:

index.js:
- The index.js module acts as a connector between modules. It is imported directly into the HTML file, and the rest of the modules are imported there. This assigns functions to the window object, allowing you to use them directly from the HTML file. Furthermore, this module is responsible for performing the program setup functions.

config.js:
- config.js contains objects such as user, game, sounds, elementsOfHtml, and mixer, which are used in other modules. This is the place for program configuration objects.
