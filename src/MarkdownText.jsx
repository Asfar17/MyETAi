// Lightweight markdown renderer — no external deps needed
// Handles: **bold**, *italic*, `code`, # headings, - lists, numbered lists, line breaks

function MarkdownText({ content, className = '' }) {
  if (!content) return null

  const lines = String(content).split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Blank line
    if (!line.trim()) { i++; continue }

    // Headings
    const h3 = line.match(/^###\s+(.+)/)
    const h2 = line.match(/^##\s+(.+)/)
    const h1 = line.match(/^#\s+(.+)/)
    if (h1) { elements.push(<h1 key={i} className="text-base font-bold text-gray-900 dark:text-white mt-3 mb-1">{inline(h1[1])}</h1>); i++; continue }
    if (h2) { elements.push(<h2 key={i} className="text-sm font-bold text-gray-800 dark:text-gray-100 mt-2 mb-1">{inline(h2[1])}</h2>); i++; continue }
    if (h3) { elements.push(<h3 key={i} className="text-xs font-bold text-gray-700 dark:text-gray-200 mt-2 mb-0.5 uppercase tracking-wide">{inline(h3[1])}</h3>); i++; continue }

    // Unordered list
    if (/^[-*]\s/.test(line)) {
      const items = []
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(<li key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{inline(lines[i].replace(/^[-*]\s/, ''))}</li>)
        i++
      }
      elements.push(<ul key={`ul-${i}`} className="list-disc list-inside space-y-0.5 my-1">{items}</ul>)
      continue
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(<li key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{inline(lines[i].replace(/^\d+\.\s/, ''))}</li>)
        i++
      }
      elements.push(<ol key={`ol-${i}`} className="list-decimal list-inside space-y-0.5 my-1">{items}</ol>)
      continue
    }

    // Paragraph
    elements.push(<p key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{inline(line)}</p>)
    i++
  }

  return <div className={`space-y-1.5 ${className}`}>{elements}</div>
}

// Inline formatting: **bold**, *italic*, `code`
function inline(text) {
  const parts = []
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g
  let last = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    if (match[2]) parts.push(<strong key={match.index} className="font-semibold text-gray-900 dark:text-white">{match[2]}</strong>)
    else if (match[3]) parts.push(<em key={match.index} className="italic">{match[3]}</em>)
    else if (match[4]) parts.push(<code key={match.index} className="bg-gray-100 dark:bg-gray-700 text-red-600 dark:text-red-400 px-1 py-0.5 rounded text-xs font-mono">{match[4]}</code>)
    last = match.index + match[0].length
  }

  if (last < text.length) parts.push(text.slice(last))
  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts
}

export default MarkdownText
