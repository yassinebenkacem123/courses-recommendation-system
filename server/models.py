from typing import Optional

from pydantic import BaseModel, Field


# Le modèle Course
class Course(BaseModel):
    mongo_id: Optional[str] = Field(default=None, alias="_id", description="MongoDB document ID as string")
    id: Optional[str] = None
    title: Optional[str] = None
    is_paid: Optional[str] = None
    price: Optional[str] = None
    headline: Optional[str] = None
    num_subscribers: Optional[str] = None
    avg_rating: Optional[str] = None
    num_reviews: Optional[str] = None
    num_comments: Optional[str] = None
    num_lectures: Optional[str] = None
    content_length_min: Optional[str] = None
    published_time: Optional[str] = None
    last_update_date: Optional[str] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    topic: Optional[str] = None
    language: Optional[str] = None
    course_url: Optional[str] = None
    instructor: Optional[str] = None
    level: Optional[str] = None
    description: Optional[str] = None
    description_clean: Optional[str] = None


# Nettoyage des documents MongoDB
def course_entity(document: dict) -> dict:

    if not document:
        return {}

    data = {key: document.get(key) for key in [
        "id",
        "title",
        "is_paid",
        "price",
        "headline",
        "num_subscribers",
        "avg_rating",
        "num_reviews",
        "num_comments",
        "num_lectures",
        "content_length_min",
        "published_time",
        "last_update_date",
        "category",
        "subcategory",
        "topic",
        "language",
        "course_url",
        "instructor",
        "level",
        "description",
        "description_clean",
    ]}

    mongo_id = document.get("_id")
    if mongo_id is not None:
        data["_id"] = str(mongo_id)

    return data
