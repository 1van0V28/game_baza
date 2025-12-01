from backend.database.models import Store

def seed_stores(session):
    stores = [
        {"id": 1, "name": "Steam"},
        {"id": 2, "name": "Gabe Store"},
        {"id": 3, "name": "Steam Buy"},
        {"id": 4, "name": "PlayStation Store"},
        {"id": 5, "name": "Xbox Store"},
    ]

    for store in stores:
        session.merge(Store(**store))

    session.commit()
