const BACKEND = 'http://34.70.153.209:8000'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await fetch(`${BACKEND}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })

    if (!response.ok) {
      return res.status(response.status).json({ error: `Backend error: ${response.status}` })
    }

    const data = await response.json()
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(200).json(data)
  } catch (err) {
    console.error('[proxy/track]', err)
    return res.status(500).json({ error: 'Proxy request failed' })
  }
}
