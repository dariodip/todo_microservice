import os
import connexion

from injector import Module, singleton, provider, Injector
from services.storage import MongoFactory, PetSearch


class DatabaseModule(Module):

    @singleton
    @provider
    def provide_db_connection(self) -> PetSearch:
        return PetSearch(
            MongoFactory(
                os.environ['DB_HOST'],
                int(os.environ['DB_PORT'])
            )
            ,'pets'
            ,'pet_store'
        )

injector = Injector([DatabaseModule()])

if __name__ == '__main__':
    app = connexion.App(__name__)
    app.add_api('swagger/pet.yaml', arguments={'title': 'Simple pet shop'})
    app.run(port=8080, server='gevent')
