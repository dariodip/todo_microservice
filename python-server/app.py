import os

import connexion
from injector import Module, singleton, provider, Injector
from services.storage import MongoFactory, TodoSearch

from flask_cors import CORS


class DatabaseModule(Module):

    @singleton
    @provider
    def provide_db_connection(self) -> TodoSearch:
        db_host = '127.0.0.1' if 'DB_HOST' not in os.environ else os.environ['DB_HOST']
        db_port = 27017 if 'DB_PORT' not in os.environ else int(os.environ['DB_PORT'])
        return TodoSearch(MongoFactory(db_host, db_port),'todo','todos')


injector = Injector([DatabaseModule()])
app = connexion.App(__name__)
CORS(app.app, methods=['POST', 'PUT', 'DELETE'], allow_headers=['Content-Type'])


@app.route('/')
def home():
    return "Welcome in TODO list", 200


if __name__ == '__main__':
    app.add_api('swagger/todo.yaml', arguments={'title': 'Simple todo list'})
    app.run(port=8080, server='gevent')
