Team Radio is an open source application for sharing and listening music in realtime like a live radio.
The frontend is using ReactJS, Bootstrap 4, Webpack.
This project was bootstrapped with [CoreUI-React](https://github.com/mrholek/CoreUI-React/tree/master/React_Starter).

# Folder Structure
```
team-radio/
    README.md
    node_modules/
    package.json
    webpack.config.js
    env
        ...
    .env
    public
        img
            …
        index.html
        favicon.ico
    scss
        …
    src
        Components
            …Common Components
        Containers
            FullLayout
        Models
            User
            Station
            Setting
        Helpers
            …
        Services
            Http
                User
                Station
                ...
            Web Socket
                Station
                ...
        Modules
            User
                Components
                    Login
                    Register
                    ...
                Actions
                    ...
                Reducers
                    ...
            Station
                Components
                    ...
                Actions
                    ...
                Reducers
                    ...
        Pages
            Login
            Sign up
            Home
            Station
            ...
        index.js
        routes.js
```
For the project to build, these files must exist with exact filenames:
- public/index.html is the page template;
- src/index.js is the JavaScript entry point.

You can delete or rename the other files.

We use package.json instead of index.js, so the file name looks friendly.