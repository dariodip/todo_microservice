import os
import connexion

from injector import Module, singleton, provider, Injector
from services.storage import MongoFactory, TodoSearch


class DatabaseModule(Module):

    @singleton
    @provider
    def provide_db_connection(self) -> TodoSearch:
        return TodoSearch(
            MongoFactory(
                os.environ['DB_HOST'],
                int(os.environ['DB_PORT'])
            )
            ,'todo'
            ,'todos'
        )

injector = Injector([DatabaseModule()])
app = connexion.App(__name__)


@app.route('/')
def home():
    return "Welcome in TODO list", 200

if __name__ == '__main__':
    app.add_api('swagger/todo.yaml', arguments={'title': 'Simple todo list'})
    app.run(port=8080, server='gevent')
