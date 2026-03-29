

const SECTIONS = [
  {
    key: 'whatHappened',
    label: 'What Happened',
    icon: '📌',
    border: 'border-red-500',
    bg: 'bg-red-50 dark:bg-red-900/10',
    labelColor: 'text-red-600 dark:text-red-400',
  },
  {
    key: 'whyItMatters',
    label: 'Why It Matters',
    icon: '💡',
    border: 'border-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/10',
    labelColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    key: 'marketImpact',
    label: 'Market Impact',
    icon: '📊',
    border: 'border-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    labelColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    key: 'watchNext',
    label: 'What to Watch Next',
    icon: '🔭',
    border: 'border-green-500',
    bg: 'bg-green-50 dark:bg-green-900/10',
    labelColor: 'text-green-600 dark:text-green-400',
  },
]

function LoadingDots() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-10 flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {['-0.3s', '-0.15s', '0s'].map(delay => (
          <span
            key={delay}
            className="w-3 h-3 rounded-full bg-red-600 animate-bounce"
            style={{ animationDelay: delay }}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">🧠 AI is analyzing…</p>
    </div>
  )
}

function Briefing({ data, loading }) {
  if (loading) return <LoadingDots />

  const briefing = data ?? {}

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* header bar */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
        <span className="text-lg">🧠</span>
        <h2 className="text-lg font-bold text-red-700 dark:text-red-400">AI Briefing</h2>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTIONS.map(({ key, label, icon, border, bg, labelColor }) => (
          <div
            key={key}
            className={`${bg} border-l-4 ${border} rounded-xl p-4 transition-all duration-200 hover:shadow-sm`}
          >
            <p className={`text-xs font-bold uppercase tracking-wider ${labelColor} mb-2 flex items-center gap-1.5`}>
              <span>{icon}</span>{label}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{briefing[key]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Briefing
