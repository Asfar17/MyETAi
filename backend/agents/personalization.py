from services.llm import call_llm

def personalization_agent(state):
    topic = state.get("input")
    persona = state.get("persona", "general")

    prompt = f"""
    Explain this news topic for a {persona}:
    {topic}

    Focus on relevance and impact.
    """

    result = call_llm(prompt)

    return {
        "summary": result
    }