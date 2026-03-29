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
  if (!data) {
    return {
      whatHappened: 'No briefing generated',
      whyItMatters: 'Try another query',
      marketImpact: 'No data',
      watchNext: 'No prediction available',
    }
  }

  // Support structured response with named fields
  if (data.whatHappened || data.what_happened) {
    return {
      whatHappened: data.whatHappened ?? data.what_happened ?? '',
      whyItMatters: data.whyItMatters ?? data.why_it_matters ?? '',
      marketImpact: data.marketImpact ?? data.market_impact ?? '',
      watchNext: data.watchNext ?? data.watch_next ?? '',
    }
  }

  // Fallback: put full briefing text in whatHappened
  return {
    whatHappened: data.briefing ?? data.summary ?? data.content ?? 'No briefing generated',
    whyItMatters: data.whyItMatters ?? data.why_it_matters ?? '',
    marketImpact: data.marketImpact ?? data.market_impact ?? '',
    watchNext: data.watchNext ?? data.watch_next ?? data.prediction ?? '',
  }
}

const transformStory = (data, topic) => {
  if (!data) return null

  // Support both { story: { ... } } and flat { events, prediction, ... }
  const story = data.story ?? data

  // Parse events array if present (structured format)
  let events = null
  let sentimentSeries = null

  if (Array.isArray(story.events) && story.events.length > 0) {
    events = story.events.map(e => ({
      date: e.date ?? e.timestamp ?? '',
      headline: e.headline ?? e.title ?? e.event ?? '',
      sentiment: typeof e.sentiment === 'number' ? e.sentiment : parseSentimentScore(e.sentiment),
    }))
    sentimentSeries = events.map(e => ({ date: e.date, sentiment: e.sentiment }))
  }

  return {
    topic: story.topic ?? topic,
    events,
    sentimentSeries,
    // Fallback text fields for when structured data isn't available
    timeline: events ? null : (story.timeline ?? null),
    sentiment: sentimentSeries ? null : (story.sentiment ?? null),
    prediction: story.prediction ?? null,
    confidence: typeof story.confidence === 'number' ? story.confidence : null,
  }
}

// Convert text sentiment labels to numeric scores
function parseSentimentScore(val) {
  if (typeof val === 'number') return val
  const map = { positive: 0.7, negative: -0.7, neutral: 0, bullish: 0.8, bearish: -0.8 }
  return map[String(val).toLowerCase()] ?? 0
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
