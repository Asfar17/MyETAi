import {
  LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer,
} from 'recharts'
import MarkdownText from './MarkdownText'

const DEFAULT_STORY = {
  topic: 'India-US Trade Tariff Negotiations',
  events: [
    { date: 'Jan 10', headline: 'US announces 25% tariff on Indian steel and aluminium exports', sentiment: -0.8 },
    { date: 'Jan 28', headline: 'India retaliates with counter-tariffs on select US agricultural goods', sentiment: -0.6 },
    { date: 'Feb 14', headline: 'Bilateral trade talks resume in Washington; both sides signal flexibility', sentiment: 0.3 },
    { date: 'Feb 28', headline: 'India offers to reduce tariffs on US electronics in exchange for steel exemption', sentiment: 0.5 },
    { date: 'Mar 15', headline: 'US grants 90-day tariff pause for India pending formal agreement', sentiment: 0.7 },
    { date: 'Mar 27', headline: 'Joint statement issued; framework deal expected by June 2025', sentiment: 0.85 },
  ],
  sentimentSeries: [
    { date: 'Jan 10', sentiment: -0.8 },
    { date: 'Jan 28', sentiment: -0.6 },
    { date: 'Feb 14', sentiment: 0.3 },
    { date: 'Feb 28', sentiment: 0.5 },
    { date: 'Mar 15', sentiment: 0.7 },
    { date: 'Mar 27', sentiment: 0.85 },
  ],
  prediction: 'A formal trade framework agreement between India and the US is likely by Q2 2025, with India securing steel tariff exemptions in exchange for opening its electronics and agricultural markets.',
  confidence: 72,
}



function LoadingState() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-4">
      <div className="flex items-center gap-3">
        <span className="animate-bounce text-xl">⚡</span>
        <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse font-medium">
          🤖 AI is analyzing the story…
        </p>
      </div>
      <div className="space-y-3 animate-pulse">
        <div className="h-28 bg-gray-100 dark:bg-gray-700 rounded-xl" />
        <div className="h-28 bg-gray-100 dark:bg-gray-700 rounded-xl" />
        <div className="h-28 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl" />
      </div>
    </div>
  )
}

function Timeline({ events }) {
  if (!events?.length) return null
  return (
    <div className="relative">
      <div className="absolute left-3.5 top-2 bottom-2 w-px bg-gradient-to-b from-red-300 via-gray-200 to-transparent dark:from-red-700 dark:via-gray-600" />
      <ul className="space-y-5">
        {events.map((event, i) => (
          <li key={i} className="relative flex gap-4 pl-10">
            <span className={`absolute left-0 top-1 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shadow-sm
              ${event.sentiment >= 0
                ? 'bg-green-100 border-green-400 text-green-700 dark:bg-green-900/50 dark:border-green-500 dark:text-green-300'
                : 'bg-red-100 border-red-400 text-red-700 dark:bg-red-900/50 dark:border-red-500 dark:text-red-300'
              }`}
            >
              {i + 1}
            </span>
            <div>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-0.5 font-medium">{event.date}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{event.headline}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SentimentChart({ sentimentSeries }) {
  if (!sentimentSeries?.length) return null
  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sentimentSeries} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis domain={[-1, 1]} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '10px', color: '#f9fafb', fontSize: '11px' }}
            cursor={{ stroke: '#dc2626', strokeWidth: 1, strokeDasharray: '4 2' }}
          />
          <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="4 2" />
          <Line type="monotone" dataKey="sentiment" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 3.5, fill: '#dc2626', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#dc2626' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function StoryTracker({ data, loading }) {
  if (loading) return <LoadingState />

  const story = data ?? DEFAULT_STORY
  const hasEvents = Array.isArray(story.events) && story.events.length > 0
  const hasSentiment = Array.isArray(story.sentimentSeries) && story.sentimentSeries.length > 0

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* header */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
        <span className="text-lg">🔍</span>
        <div>
          <h2 className="text-lg font-bold text-red-700 dark:text-red-400 leading-none">Story Tracker</h2>
          {story.topic && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{story.topic}</p>}
        </div>
      </div>

      <div className="p-6 space-y-4">

        {/* Timeline card */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-100 dark:border-gray-600">
          <h3 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            📍 Timeline
          </h3>
          {hasEvents
            ? <Timeline events={story.events} />
            : story.timeline
              ? <MarkdownText content={story.timeline} />
              : <p className="text-xs text-gray-400">No timeline data available.</p>
          }
        </div>

        {/* Sentiment card */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            📊 Sentiment Trend
          </h3>
          {hasSentiment
            ? <SentimentChart sentimentSeries={story.sentimentSeries} />
            : story.sentiment
              ? <MarkdownText content={story.sentiment} />
              : <p className="text-xs text-gray-400">No sentiment data available.</p>
          }
        </div>

        {/* Prediction card */}
        <div className="bg-amber-50 dark:bg-amber-900/15 rounded-xl p-4 border border-amber-200 dark:border-amber-700/40">
          <h3 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            🔮 AI Prediction
          </h3>
          <MarkdownText content={story.prediction} className="mb-3" />
          {story.confidence != null && (
            <div className="mt-3">
              <div className="flex justify-between text-[11px] text-gray-500 dark:text-gray-400 mb-1.5">
                <span className="font-medium">Confidence</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{story.confidence}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-700"
                  style={{ width: `${story.confidence}%` }}
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default StoryTracker
