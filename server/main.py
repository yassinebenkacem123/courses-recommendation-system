from typing import List, Optional

from fastapi import FastAPI, HTTPException, Query, Path as ApiPath
from fastapi.middleware.cors import CORSMiddleware

from database import courses_collection
from models import Course, course_entity

from pathlib import Path
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI(title="Rassil Courses API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


_RECOMMENDER_MODEL = None
_RECOMMENDER_IDS = None
_RECOMMENDER_INDEX = None


def _load_recommender_model() -> None:
    global _RECOMMENDER_MODEL, _RECOMMENDER_IDS, _RECOMMENDER_INDEX
    if _RECOMMENDER_MODEL is not None and _RECOMMENDER_IDS is not None and _RECOMMENDER_INDEX is not None:
        return

    model_path = Path(__file__).parent / "course_recommender.pkl"
    if not model_path.exists():
        return

    with open(model_path, "rb") as f:
        data = pickle.load(f)

    matrix = data.get("matrix")
    vectorizer = data.get("vectorizer")
    course_ids = data.get("course_ids")

    if matrix is None or vectorizer is None or not course_ids:
        return

    _RECOMMENDER_MODEL = {"matrix": matrix, "vectorizer": vectorizer}
    _RECOMMENDER_IDS = np.array(course_ids, dtype=str)
    _RECOMMENDER_INDEX = {str(cid): idx for idx, cid in enumerate(_RECOMMENDER_IDS)}


_load_recommender_model()


@app.get("/test")
async def health_check():
    return {"message": "FastAPI server is running"}


@app.get("/courses", response_model=List[Course])
async def get_courses(
    category: Optional[str] = Query(default=None, description="Filter by course category (case-insensitive, partial)"),
    level: Optional[str] = Query(default=None, description="Filter by course level (case-insensitive, partial)"),
    topic: Optional[str] = Query(default=None, description="Filter by topic (partial, case-insensitive)"),
    language: Optional[str] = Query(default=None, description="Filter by language"),
    is_paid: Optional[str] = Query(default=None, description="Filter by paid status (e.g. 'True' or 'False')"),
    max_price: Optional[float] = Query(default=None, description="Filter by maximum price"),
    limit: int = Query(default=20, ge=1, le=100, description="Maximum number of courses to return"),
):
    try:
        query: dict = {}

        if category:
            query["category"] = {"$regex": category, "$options": "i"}
        if level:
            query["level"] = {"$regex": level, "$options": "i"}
        if language:
            query["language"] = language
            if is_paid is not None:
                normalized_paid = str(is_paid).strip().lower()
                if normalized_paid in {"true", "1", "yes"}:
                    query["is_paid"] = {"$in": [True, "True", "true", 1, "1"]}
                elif normalized_paid in {"false", "0", "no"}:
                    query["is_paid"] = {"$in": [False, "False", "false", 0, "0"]}
                else:
                    query["is_paid"] = is_paid
        if topic:
            query["topic"] = {"$regex": topic, "$options": "i"}

        cursor = courses_collection.find(query).limit(limit)
        courses = [course_entity(doc) async for doc in cursor]

        if max_price is not None:
            def _parse_price(raw_price: Optional[str]) -> Optional[float]:
                if raw_price is None:
                    return None
                try:
                    return float(raw_price)
                except (TypeError, ValueError):
                    return None

            courses = [
                course
                for course in courses
                if _parse_price(course.get("price")) is not None
                and _parse_price(course.get("price")) <= max_price
            ]

        return courses
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Internal server error") from exc


@app.get("/courses/{course_id}", response_model=Course)
async def get_course_by_id(
    course_id: str = ApiPath(..., description="Course identifier as stored in the database"),
):
    try:
        document = await courses_collection.find_one({"id": course_id})
        if not document:
            raise HTTPException(status_code=404, detail="Course not found")

        return course_entity(document)
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Internal server error") from exc


@app.get("/recommendations", response_model=List[Course])
async def get_recommendations(
    q: Optional[str] = Query(default=None, description="Free-text search query"),
    category: Optional[str] = Query(default=None, description="Preferred category"),
    level: Optional[str] = Query(default=None, description="Preferred level"),
    topic: Optional[str] = Query(default=None, description="Preferred topic"),
    limit: int = Query(default=9, ge=1, le=30, description="Number of recommended courses"),
):
    if _RECOMMENDER_MODEL is None or _RECOMMENDER_IDS is None:
        raise HTTPException(status_code=503, detail="Recommendation model not available")

    try:
        query_parts = []
        if q:
            query_parts.append(q)
        if category:
            query_parts.append(category)
        if level:
            query_parts.append(level)
        if topic:
            query_parts.append(topic)

        if not query_parts:
            cursor = courses_collection.find().limit(limit)
            courses = [course_entity(doc) async for doc in cursor]
            return courses

        text_query = " ".join(query_parts)

        vectorizer = _RECOMMENDER_MODEL["vectorizer"]
        matrix = _RECOMMENDER_MODEL["matrix"]

        query_vec = vectorizer.transform([text_query])
        similarities = cosine_similarity(query_vec, matrix)[0]

        top_indices = np.argsort(similarities)[::-1]

        selected_ids: list[str] = []
        for idx in top_indices:
            course_id = _RECOMMENDER_IDS[idx]
            if course_id and course_id not in selected_ids:
                selected_ids.append(str(course_id))
            if len(selected_ids) >= limit:
                break

        if not selected_ids:
            cursor = courses_collection.find().limit(limit)
            courses = [course_entity(doc) async for doc in cursor]
            return courses

        cursor = courses_collection.find({"id": {"$in": selected_ids}})
        docs = [course_entity(doc) async for doc in cursor]

        by_id = {str(doc.get("id")): doc for doc in docs}
        ordered_courses = [by_id[cid] for cid in selected_ids if cid in by_id]

        if not ordered_courses:
            return docs[:limit]

        return ordered_courses
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Failed to compute recommendations") from exc


@app.get("/courses/{course_id}/recommendations", response_model=List[Course])
async def get_course_recommendations(
    course_id: str = ApiPath(..., description="Base course ID to recommend from"),
    limit: int = Query(default=9, ge=1, le=30, description="Number of recommended courses"),
):
    if _RECOMMENDER_MODEL is None or _RECOMMENDER_IDS is None or _RECOMMENDER_INDEX is None:
        raise HTTPException(status_code=503, detail="Recommendation model not available")

    try:
        base_doc = await courses_collection.find_one({"id": course_id})
        if not base_doc:
            raise HTTPException(status_code=404, detail="Course not found")

        idx = _RECOMMENDER_INDEX.get(str(course_id))

        # Fallback: if the course is not in the recommender index, use its title-based text query
        if idx is None:
            base_course = course_entity(base_doc)
            title = base_course.get("title") or ""
            category = base_course.get("category") or ""
            level = base_course.get("level") or ""
            topic = base_course.get("topic") or ""

            text_query = " ".join(part for part in [title, category, level, topic] if part)
            if not text_query:
                cursor = courses_collection.find().limit(limit)
                return [course_entity(doc) async for doc in cursor]

            vectorizer = _RECOMMENDER_MODEL["vectorizer"]
            matrix = _RECOMMENDER_MODEL["matrix"]

            query_vec = vectorizer.transform([text_query])
            similarities = cosine_similarity(query_vec, matrix)[0]

            top_indices = np.argsort(similarities)[::-1]
            selected_ids: list[str] = []
            for i in top_indices:
                cid = _RECOMMENDER_IDS[i]
                if str(cid) == str(course_id):
                    continue
                if cid and cid not in selected_ids:
                    selected_ids.append(str(cid))
                if len(selected_ids) >= limit:
                    break
        else:
            matrix = _RECOMMENDER_MODEL["matrix"]
            base_vec = matrix[idx : idx + 1]
            similarities = cosine_similarity(base_vec, matrix)[0]

            top_indices = np.argsort(similarities)[::-1]
            selected_ids = []
            for i in top_indices:
                if i == idx:
                    continue
                cid = _RECOMMENDER_IDS[i]
                if cid and cid not in selected_ids:
                    selected_ids.append(str(cid))
                if len(selected_ids) >= limit:
                    break

        if not selected_ids:
            cursor = courses_collection.find().limit(limit)
            return [course_entity(doc) async for doc in cursor]

        cursor = courses_collection.find({"id": {"$in": selected_ids}})
        docs = [course_entity(doc) async for doc in cursor]

        by_id = {str(doc.get("id")): doc for doc in docs}
        ordered_courses = [by_id[cid] for cid in selected_ids if cid in by_id]

        if not ordered_courses:
            return docs[:limit]

        return ordered_courses
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Failed to compute recommendations") from exc


#  here how you can run the server 😺
# uvicorn main:app --reload --port 8080
