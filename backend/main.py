from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from agents.personalization import personalization_agent
from agents.briefing import briefing_agent
from story_graph import story_graph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "MyET AI Backend Running 🚀"}

@app.post("/feed")
def feed(data: dict):
    return personalization_agent({
        "input": data["topic"],
        "persona": data.get("persona", "general")
    })

@app.post("/brief")
def brief(data: dict):
    return briefing_agent({
        "input": data["topic"]
    })

@app.post("/track")
def track(data: dict):
    return story_graph.invoke({
        "input": data["topic"]
    })