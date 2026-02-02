import os

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConfigurationError

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI is not defined in environment variables")

client = AsyncIOMotorClient(MONGODB_URI)

try:
    db = client.get_default_database()
except ConfigurationError:
    db_name = os.getenv("MONGODB_DB_NAME", "test")
    db = client[db_name]

courses_collection = db["courses"]
