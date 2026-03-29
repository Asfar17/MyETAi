from langgraph.graph import StateGraph
from services.llm import call_llm

# Agent 1: Timeline Builder
def timeline_agent(state):
    topic = state.get("input")

    prompt = f"""
    Build a timeline of key events for:
    {topic}
    """

    result = call_llm(prompt)

    return {
        **state,
        "timeline": result
    }

#  Agent 2: Sentiment Analysis
def sentiment_agent(state):
    topic = state.get("input")

    prompt = f"""
    Analyze sentiment trend for:
    {topic}

    Give positive/negative trend explanation.
    """

    result = call_llm(prompt)

    return {
        **state,
        "sentiment": result
    }
# Agent 3: Prediction Engine
def prediction_agent(state):
    topic = state.get("input")

    prompt = f"""
    Predict what will happen next for:
    {topic}
    """

    result = call_llm(prompt)

    return {
        **state,
        "prediction": result
    }

# Final Composer
def final_agent(state):
    return {
        "story": {
            "timeline": state.get("timeline"),
            "sentiment": state.get("sentiment"),
            "prediction": state.get("prediction")
        }
    }

# BUILD GRAPH
graph = StateGraph(dict)

graph.add_node("timeline", timeline_agent)
graph.add_node("sentiment", sentiment_agent)
graph.add_node("prediction", prediction_agent)
graph.add_node("final", final_agent)

graph.set_entry_point("timeline")

graph.add_edge("timeline", "sentiment")
graph.add_edge("sentiment", "prediction")
graph.add_edge("prediction", "final")

graph.set_finish_point("final")

story_graph = graph.compile()