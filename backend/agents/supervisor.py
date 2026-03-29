def supervisor(state):
    query = state.get("input", "").lower()

    if "track" in query:
        route = "story_tracker"
    elif "brief" in query:
        route = "briefing"
    else:
        route = "personalization"

    return {
        **state,
        "route": route   # MUST return dict
    }