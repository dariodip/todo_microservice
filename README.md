# Todo_microservice
A simple microservice in Python using Flask, connexion, MongoDB, Injection and Angular 4 as front-end.

This project is fully developed using [Microservice Pattern](http://microservices.io/patterns/microservices.html). 

## Run the application

Simply run `docker-compose up --build` in the directory containing `docker-compose.yml`.

## TODO Server

The server dealing with the TODO list is developed using:
- Flask (as framework);
- connextion (for generate routes and Swagger docs);
- MongoDB (as a data source).

### Setup

See [here](https://github.com/dariodip/Todo_microservice/blob/master/todo-server/README.md).

### Architecture

We generated routes and Swagger docs using [connexion](https://github.com/zalando/connexion). The full swagger specification can be found [here](https://github.com/dariodip/Todo_microservice/blob/master/todo-server/swagger/todo.yaml).

We used a [Repository Pattern](https://msdn.microsoft.com/en-us/library/ff649690.aspx) in order to manage data source and dependency injection using [injector](https://pypi.python.org/pypi/injector/0.12.1), so you can
easily change the db, without chaning uppermost layers (e.g. [business layer](https://github.com/dariodip/Todo_microservice/blob/master/todo-server/api/todo.py)).

## TODO Client

TODO :-P
