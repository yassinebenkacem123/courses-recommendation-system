from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import courses_collection
from models import Course, course_entity

app = FastAPI(title="Rassil Courses API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can replace this with the exact frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/test")
async def health_check():
    return {"message": "FastAPI server is running"}


@app.get("/courses", response_model=List[Course])
async def get_courses():
    try:
        cursor = courses_collection.find().limit(20)
        courses = [course_entity(doc) async for doc in cursor]
        return courses
    except Exception as exc:  
        raise HTTPException(status_code=500, detail="Internal server error") from exc


#  here how you can run the server 😺
# uvicorn main:app --reload --port 8080
