import redis
import json


class RedisFactory(object):

    def __init__(self, host: str, port: int, db: str):
        self.host = host
        self.port = port
        self.db = db

    def create(self) -> redis.Redis:
        return redis.Redis(
            host=self.host,
            port=self.port,
            db=self.db
        )


class UserStorage(object):

    def __init__(self, redis_factory: RedisFactory, db: str):
        self.redis_factory = redis_factory
        self.db = db
        self.instance = None

    def connection(self) -> redis.Redis:
        if not self.instance:
            self.instance = self.redis_factory.create()
        return self.instance

    def __to_str(self, d:dict) -> str:
        return json.dumps(d)

    def __to_dict(self, s: str) -> dict:
        return json.loads(s)

    def create_user(self, id, user, password):
        # TODO encrypt password
        user = {
            'id': id,
            'user': user,
            'password': password
        }
        self.connection().append(id, self.__to_str(user))
        self.connection().append(user, self.__to_str(user))

    def find_user_by_id(self, id: str) -> dict:
        return self.__to_dict(self.connection().get(id))

    def find_user_by_name(self, name: str) -> dict:
        return self.__to_dict(self.connection().get(name))
