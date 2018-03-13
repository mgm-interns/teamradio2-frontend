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
        index.tsx
        routes.ts
```
For the project to build, these files must exist with exact filenames:
- public/index.html is the page template;
- src/index.tsx is the TypeScript entry point.

You can delete or rename the other files.

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