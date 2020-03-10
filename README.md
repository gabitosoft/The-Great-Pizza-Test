# The-Great-Pizza-Test
An interesting web application developed in Angular and NodeJS for listing pizzas and select topping on these.

# Installation
In order to deploy the application it's necesary to have installed the next applications:

* NodeJS - https://nodejs.org/es/download/

* Angular - npm install -g @angular/cli

* SQLite - https://www.sqlite.org/download.html


Currently the application are handled by two layers, the UI layer and the services layer, the first one it was developed using Angular and Angular Material for components styles. In the service layer the application is running using NodeJS and Sequalize to interact with the small database created with SQLite.

# Deployment Web Service
In order to get running the web service it's necessary to perform the next commands on your terminal.

1.- Once the project has been cloned, you need to locate inside the folder `The-Great-Pizza-Test`.
2.- Go to web-service folder and run the service application, using the next command.

```sh
cd web-service
npm install
npm start
```

The `npm start` command by the general perform a conversion of the files in the project using babel, this process took a couple of minutes. Once the application is running a message similar to this, it will be displayed in the terminal.

```sh
Server running on http://localhost:9000
Database connected
```

Now you can use any tool to perform request against the web service through the next URL:
http://localhost:9000

The list of endpoints defined for the application can be found in the folder `web-service/routes`

# Deployment Web Application
The deployment of the web application is similar to the web service, but in this case we need to go to the `web-app` folder in our copy of the project.

1.- Go to `web-app/great-pizza` folder.
2.- Perform the next commands in your terminal.

```sh
cd web-app/great-pizza
npm install
ng serve --open
```

Once the compilation is completed a message similar to this it will be displayed in the terminal:

`i [wdm] Compiled successfully.`

And also the browser automatically it will be opened with the application running in the next URL.
`http://localhost:4200/`

# Database
The database is stored as a single file, so you can find the database stored in the file `web-service/db.great-pizza.sqlite`. All the information generated is located in this file.
