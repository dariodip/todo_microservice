from datetime import datetime
from connexion import NoContent
from app import injector
from injector import inject
from services.storage import TodoSearch


class Todo(object):

    @inject
    def __init__(self, db: TodoSearch):
        self._db = db

    def get_todos(self, limit, status=None, sort=None):
        if status is not None:
            todos = self._db.find_all({'status': status})
        else:
            todos = self._db.find_all()
        limited_todos = [todo for todo in todos][:limit]
        if sort is not None:
            limited_todos.sort(key=lambda x: x['id'], reverse=sort == 'desc')
        return limited_todos

    def get_todo(self, todo_id):
        todo = self._db.find_by_id({'id': todo_id})
        return todo or ('Not found', 404)

    def put_todo(self, todo_id, todo):
        todo['id'] = todo_id
        if 'created' not in todo:
            todo['created'] = datetime.utcnow()
        exists = self._db.update_or_create({'id': todo_id}, todo)
        return NoContent, (200 if exists else 201)

    def delete_todo(self, todo_id):
        was_deleted = self._db.delete_one({'id': todo_id})
        if was_deleted:
            return NoContent, 204
        else:
            return NoContent, 404


class_instance = injector.get(Todo)
