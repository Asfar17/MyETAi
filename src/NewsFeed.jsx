

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 animate-pulse border border-gray-100 dark:border-gray-700">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-1/4 mb-3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-full mb-1.5" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6 mb-4" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3" />
    </div>
  )
}

function NewsCard({ card }) {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 card-hover overflow-hidden">
      {/* left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-red-400 rounded-l-2xl" />

      <div className="pl-2">
        {/* source + date */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">
            {card.source}
          </span>
          {card.publishedAt && (
            <span className="text-[11px] text-gray-400 dark:text-gray-500">
              {new Date(card.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </span>
          )}
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-snug text-sm group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors duration-200">
          {card.title}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 mb-4 text-xs leading-relaxed">{card.summary}</p>

        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${card.impactColor}`}>
          ⚡ {card.impact}
        </span>
      </div>
    </div>
  )
}

function NewsFeed({ cards, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
      </div>
    )
  }

  const displayCards = (!cards || cards.length === 0) ? [] : cards

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayCards.map(card => <NewsCard key={card.id} card={card} />)}
    </div>
  )
}

export default NewsFeed
