import { useState } from 'react'
import { fetchFeed, fetchBrief, fetchStory } from './services/api'
import Header from './Header'
import InputPanel from './InputPanel'
import NewsFeed from './NewsFeed'
import Briefing from './Briefing'
import StoryTracker from './StoryTracker'
import TTSPlayer from './TTSPlayer'

function Dashboard({ darkMode, toggleDarkMode }) {
  const [persona, setPersona] = useState('Investor')
  const [query, setQuery] = useState('')

  const [feedData, setFeedData] = useState(null)
  const [briefingData, setBriefingData] = useState(null)
  const [storyData, setStoryData] = useState(null)
  const [ttsText, setTtsText] = useState('')
  const [ttsEnabled, setTtsEnabled] = useState(false)

  const [loading, setLoading] = useState({
    feed: false,
    briefing: false,
    story: false,
    tts: false,
  })

  async function handleFetchFeed() {
    setLoading(prev => ({ ...prev, feed: true }))
    const data = await fetchFeed({ persona, query })
    setFeedData(data)
    setLoading(prev => ({ ...prev, feed: false }))
  }

  async function handleFetchBrief() {
    setLoading(prev => ({ ...prev, briefing: true }))
    const data = await fetchBrief({ persona, query })
    setBriefingData(data)
    setTtsText(data?.whatHappened || data?.summary || '') //setTtsText(data?.whatHappened ?? '')
    setLoading(prev => ({ ...prev, briefing: false }))
  }

  async function handleFetchStory() {
    setLoading(prev => ({ ...prev, story: true }))
    const data = await fetchStory({ persona, query })
    setStoryData(data)
    setLoading(prev => ({ ...prev, story: false }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        <section>
          <InputPanel
            persona={persona}
            query={query}
            loading={loading}
            onPersonaChange={setPersona}
            onQueryChange={setQuery}
            onFetchFeed={handleFetchFeed}
            onFetchBrief={handleFetchBrief}
            onFetchStory={handleFetchStory}
          />
        </section>
        <section id="feed">
          <div className="section-divider">
            <h2 className="text-sm font-bold text-red-700 dark:text-red-400 uppercase tracking-widest">
              📰 Personalized Feed
            </h2>
          </div>
          <NewsFeed cards={feedData} loading={loading.feed} />
        </section>
        <section id="briefing">
          <Briefing data={briefingData} loading={loading.briefing} />
        </section>
        <section id="story-tracker">
          <StoryTracker data={storyData} loading={loading.story} />
        </section>
        <section id="audio">
          <TTSPlayer
            text={ttsText}
            enabled={ttsEnabled}
            onToggle={() => setTtsEnabled(prev => !prev)}
            persona={persona}
            query={query}
          />
        </section>
      </main>
    </div>
  )
}

export default Dashboard
