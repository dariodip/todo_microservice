from pymongo import MongoClient


class MongoFactory(object):

    def __init__(self, host: str, port: int):
        self.host = host
        self.port = port

    def create(self) -> MongoClient:
        return MongoClient(
            host=self.host,
            port=self.port
        )


class TodoSearch(object):

    def __init__(self, mongo_factory: MongoFactory, collection: str, db_name: str):
        self.mongo_factory = mongo_factory
        self.collection = collection
        self.db_name = db_name
        self.instance = None

    def connection(self) -> MongoClient:
        if not self.instance:
            self.instance = self.mongo_factory.create()
        return self.instance[self.db_name]

    def find_all(self, query=None) -> list:
        db = self.connection()
        collection = self.collection
        todos = db[collection].find(query if query is not None else {}, {'_id': False})
        return todos

    def find_by_id(self, query: dict) -> list:
        db = self.connection()
        collection = self.collection
        return self.connection()[collection].find_one(query, {'_id': False})

    def update_or_create(self, query, object) -> bool:
        db = self.connection()
        collection = self.collection
        update_result = self.connection()[collection].replace_one(query, object, upsert=True)
        return update_result.matched_count == 1

    def delete_one(self, query) -> bool:
        db = self.connection()
        collection = self.collection
        deleted_result = self.connection()[collection].delete_one(query)
        return deleted_result.deleted_count == 1
