from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from pymongo import DESCENDING


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
            self.instance[self.db_name][self.collection].create_index('id', unique=True)
        return self.instance[self.db_name]

    def create(self, obj: dict) -> dict:
        db = self.connection()

        while True:

            collection = db[self.collection]
            cursor = collection.find(
                {},
                {'id': 1}
            ).sort('id', direction=DESCENDING).limit(1)

            if cursor.count() == 0:
                obj['id'] = 1
            else:
                obj['id'] = cursor.next()['id'] + 1

            try:
                collection.insert_one(obj)
                obj.pop('_id', None)  # _id is not serializable!!!!
            except DuplicateKeyError:
                continue

            break

        return obj

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

    def find_by_tags(self, tags: list) -> list:
        db = self.connection()
        collection = self.collection
        todos_with_tags = self.connection()[collection].find(
            {
            'tags.name': {'$in': tags, '$exists': True}
            },
            {'_id': False}
        )
        if todos_with_tags.count() <= 0:
            return []
        return [todo for todo in todos_with_tags]

    def find_by_status(self, statuses: list) -> list:
        db = self.connection()
        collection = self.collection
        todos_with_statuses = self.connection()[collection].find(
            {
                'status': {'$in': statuses}
            },
            {'_id': False}
        )
        if todos_with_statuses.count() <= 0:
            return []
        return [todo for todo in todos_with_statuses]
