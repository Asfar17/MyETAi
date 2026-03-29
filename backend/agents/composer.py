def composer_agent(state):
    return {
        "summary": state.get("personalized"),
        "briefing": state.get("briefing"),
        "story": state.get("story")
    }
