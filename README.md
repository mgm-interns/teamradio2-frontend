Team Radio is an open source application for sharing and listening music in realtime like a live radio.

Now we just support Youtube video. All members of team can watch a video at the same time.

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
        BaseComponents
        Components
            …Common Components
        Configuration
            DependencyInjection
            Redux
            ServiceWorker
        Containers
            FullLayout
        Models
            User
            Station
            Song
        Helpers
            …
        Services
            Http
                UserServices
                StationServices
                ...
            SSE
                StationChatSSEService
                StationPlaylistSSEService
                ...
        Modules
            User
                Components
                    Login
                    Register
                    ...
                Redux
                  Actions
                    ...
                  Constants
                    ...
                  Types
                    ...
                  Reducers
                    ...
            Station
                Components
                    ...
                Redux
                  Actions
                    ...
                  Constants
                    ...
                  Types
                    ...
                  Reducers
                    ...
        Pages
            ForgotPassword
            Help
            Home
            Login
            Profile
            Register
            ResetPassword
            Station
            ...
        index.tsx
        routes.ts
```
For the project to build, these files must exist with exact filenames:
- public/index.html is the page template;
- src/index.tsx is the TypeScript entry point.

You can delete or rename the other files.

In folder Pages, each page is just the combination of many modules. It defines position and custom style for module. So it's easy to change structure of a page, you just need to put a module into the right position.

# How to name a folder and a file?
- Folder name: <component name>.
Ex: Aside
- File name: should be <component name>.<ext>.
Ex: Aside.tsx, Aside.scss

# How to write css for each component?
- Create a css file. Ex: Aside.scss.
- Import to tsx file
```
Aside.tsx

import './Aside.scss'
```

# How to import and export module?
- Export: recommend Named Export
```
export class Aside {
}
```
Each component has index.ts/index.tsx file
```
export * from './Aside';
```
- Import:
```
//import every thing
import * as React from 'react';
import * as ReactDOM from 'react-dom';

//for default export
import { default as AMeaningName } from './AClass'

//for named export
import { SidebarFooter } from '../SidebarFooter';
import { Aside, Header, Sidebar, Breadcrumb, Footer } from '../../Components/'; //recommended
```

# How to use template?
- Find example codes [here](https://github.com/mrholek/CoreUI-React/tree/master/React_Full_Project)
- Find all components on [reactstrap documentation](http://reactstrap.github.io/components/)

# How to add new Environment Variables
- evn template: in folder env. You have to create file .env and copy content of one env.
- In .env file define new variable with prefix REACT_APP
```
REACT_APP_HTTP_END_POINT=https://www.teamrad.io/api
```
- Remember to update env for dev and prod
