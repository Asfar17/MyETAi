const PERSONAS = [
  { value: 'Investor', emoji: '📈' },
  { value: 'Startup Founder', emoji: '🚀' },
  { value: 'Student', emoji: '🎓' },
]

const BUTTONS = [
  { key: 'feed', label: 'Personalized Feed', icon: '📰' },
  { key: 'briefing', label: 'AI Briefing', icon: '🧠' },
  { key: 'story', label: 'Track Story', icon: '🔍' },
]

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  )
}

function InputPanel({ persona, query, loading, onPersonaChange, onQueryChange, onFetchFeed, onFetchBrief, onFetchStory }) {
  const handlers = { feed: onFetchFeed, briefing: onFetchBrief, story: onFetchStory }

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
      {/* top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-red-700" />

      <div className="p-6 space-y-5">
        {/* inputs row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-52">
            <select
              value={persona}
              onChange={e => onPersonaChange(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white pl-3 pr-8 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
            >
              {PERSONAS.map(({ value, emoji }) => (
                <option key={value} value={value}>{emoji} {value}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>

          <input
            type="text"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            placeholder="Enter topic or query…"
            className="flex-1 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 placeholder-gray-400"
          />
        </div>

        {/* action buttons */}
        <div className="flex flex-wrap gap-2.5">
          {BUTTONS.map(({ key, label, icon }) => {
            const isLoading = loading[key]
            return (
              <button
                key={key}
                onClick={handlers[key]}
                disabled={isLoading}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                  ${isLoading
                    ? 'bg-red-500'
                    : 'bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 shadow-sm hover:shadow-md hover:shadow-red-900/20 active:scale-95'
                  }`}
              >
                {isLoading ? <Spinner /> : <span>{icon}</span>}
                {isLoading ? 'Loading…' : label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default InputPanel
