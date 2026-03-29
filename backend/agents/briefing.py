from services.llm import call_llm

def briefing_agent(state):
    topic = state.get("input")

    prompt = f"""
    Create a business briefing for: {topic}

    Format:
    - What happened
    - Why it matters
    - Market impact
    - What next
    """

    result = call_llm(prompt)

    return {
        "briefing": result
    }