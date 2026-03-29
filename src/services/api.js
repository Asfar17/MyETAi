const API_BASE = '/api'

async function safeFetch(url, body) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      console.error('API ERROR:', res.status)
      return null
    }
    return await res.json()
  } catch (err) {
    console.error('FETCH FAILED:', err)
    return null
  }
}

const transformFeed = (data, query) => {
  if (!data || !data.summary) {
    return [{
      id: 1,
      title: query || 'No Topic',
      summary: 'No data received from AI',
      impact: 'Neutral',
      impactColor: 'bg-gray-200 text-gray-700',
    }]
  }
  return [{
    id: 1,
    title: query,
    summary: data.summary,
    impact: 'High Impact',
    impactColor: 'bg-red-100 text-red-700',
  }]
}

const transformBrief = (data) => {
  if (!data || !data.briefing) {
    return {
      whatHappened: 'No briefing generated',
      whyItMatters: 'Try another query',
      marketImpact: 'No data',
      watchNext: 'No prediction available',
    }
  }
  return {
    whatHappened: data.briefing,
    whyItMatters: 'AI analyzed key business implications.',
    marketImpact: 'Potential shifts in market trends.',
    watchNext: 'Monitor upcoming developments.',
  }
}

const transformStory = (data, topic) => {
  if (!data?.story) return null
  return {
    topic,
    timeline: data.story.timeline,
    sentiment: data.story.sentiment,
    prediction: data.story.prediction,
  }
}

export const fetchFeed = async ({ persona, query }) => {
  const data = await safeFetch(`${API_BASE}/feed`, { topic: query, persona })
  console.log('RAW FEED:', data)
  return transformFeed(data, query)
}

export const fetchBrief = async ({ query }) => {
  const data = await safeFetch(`${API_BASE}/brief`, { topic: query })
  console.log('RAW BRIEF:', data)
  return transformBrief(data)
}

export const fetchStory = async ({ query }) => {
  const data = await safeFetch(`${API_BASE}/track`, { topic: query })
  console.log('RAW STORY:', data)
  return transformStory(data, query)
}

export const fetchTTS = async ({ text }) => {
  if (!('speechSynthesis' in window)) {
    console.warn('TTS not supported')
    return
  }
  const utterance = new SpeechSynthesisUtterance(text)
  window.speechSynthesis.speak(utterance)
  return { status: 'playing' }
}
