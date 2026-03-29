const BACKEND = 'http://34.70.153.209:8000'

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const body = req.body ?? {}
    console.log('[track] sending to backend:', JSON.stringify(body))

    const response = await fetch(`${BACKEND}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const text = await response.text()
    console.log('[track] backend status:', response.status, 'body:', text.slice(0, 200))

    let data
    try { data = JSON.parse(text) } catch { data = { raw: text } }

    return res.status(response.status).json(data)
  } catch (err) {
    console.error('[track] error:', err.message)
    return res.status(500).json({ error: err.message })
  }
}
