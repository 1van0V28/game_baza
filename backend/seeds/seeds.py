from backend.database.models import Store

def seed_stores(session):
    stores = [
        {"name": "Steam", "url": "https://store.steampowered.com"},
        {"name": "Gabe Store", "url": "https://gabestore.ru"},
        {"name": "Steam Buy", "url": "https://steambuy.com"},
        {"name": "PlayStation Store", "url": "https://store.playstation.com"},
        {"name": "Xbox Store", "url": "https://www.xbox.com/store"},
    ]

    for store in stores:
        session.merge(Store(**store))

    session.commit()
