from datetime import datetime
from connexion import NoContent
from app import injector
from injector import inject
from services.storage import PetSearch

PETS = {}


class Pet(object):

    @inject
    def __init__(self, db: PetSearch):
        self._db = db

    def get_pets(self, limit, animal_type=None):
        if animal_type is not None:
            pets = self._db.find_all({'animal_type': animal_type})
        else:
            pets = self._db.find_all()
        return [pet for pet in pets][:limit]

    def get_pet(self, pet_id):
        pet = self._db.find_by_id({'id': pet_id})
        return pet or ('Not found', 404)

    def put_pet(self, pet_id, pet):
        pet['id'] = pet_id
        if 'created' not in pet:
            pet['created'] = datetime.utcnow()
        exists = self._db.update_or_create({'id': pet_id}, pet)
        return NoContent, (200 if exists else 201)

    def delete_pet(self, pet_id):
        was_deleted = self._db.delete_one({'id': pet_id})
        if was_deleted:
            return NoContent, 204
        else:
            return NoContent, 404


class_instance = injector.get(Pet)
