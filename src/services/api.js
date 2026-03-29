const API_BASE = '/api'

// 🔹 COMMON FETCH WRAPPER (IMPORTANT)
async function safeFetch(url, body) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error("API ERROR:", res.status);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("FETCH FAILED:", err);
    return null;
  }
}

// 🔹 Transform Feed
const transformFeed = (data, query) => {
  if (!data || !data.summary) {
    return [
      {
        id: 1,
        title: query || "No Topic",
        summary: "No data received from AI",
        impact: "Neutral",
        impactColor: "bg-gray-200 text-gray-700",
      },
    ];
  }

  return [
    {
      id: 1,
      title: query,
      summary: data.summary,
      impact: "High Impact",
      impactColor: "bg-red-100 text-red-700",
    },
  ];
};

// 🔹 Transform Briefing
const transformBrief = (data) => {
  if (!data || !data.briefing) {
    return {
      whatHappened: "No briefing generated",
      whyItMatters: "Try another query",
      marketImpact: "No data",
      watchNext: "No prediction available",
    };
  }

  return {
    whatHappened: data.briefing,
    whyItMatters: "AI analyzed key business implications.",
    marketImpact: "Potential shifts in market trends.",
    watchNext: "Monitor upcoming developments.",
  };
};

// 🔹 Transform Story
const transformStory = (data, topic) => {
  if (!data?.story) return null;

  return {
    topic,
    timeline: data.story.timeline,
    sentiment: data.story.sentiment,
    prediction: data.story.prediction
  };
};

// 🔹 API CALLS

export const fetchFeed = async ({ persona, query }) => {
  const data = await safeFetch(`${API_BASE}/feed`, {
    topic: query,
    persona,
  });

  console.log("RAW FEED:", data);

  return transformFeed(data, query);
};

export const fetchBrief = async ({ query }) => {
  const data = await safeFetch(`${API_BASE}/brief`, {
    topic: query,
  });

  console.log("RAW BRIEF:", data);

  return transformBrief(data);
};

export const fetchStory = async ({ query }) => {
  const data = await safeFetch(`${API_BASE}/track`, {
    topic: query,
  });

  console.log("RAW STORY:", data);

  return transformStory(data, query);
};

// 🔥 TTS (FRONTEND ONLY — FIXED)
export const fetchTTS = async ({ text }) => {
  if (!("speechSynthesis" in window)) {
    console.warn("TTS not supported");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);

  return { status: "playing" };
};
// const BASE_URL = import.meta.env.VITE_API_BASE_URL

// // Mock data constants

// export const MOCK_FEED = [
//   {
//     id: '1',
//     title: 'RBI Holds Repo Rate at 6.5% Amid Inflation Concerns',
//     summary: 'The Reserve Bank of India maintained its benchmark interest rate, citing persistent food inflation and global uncertainty. Analysts expect a rate cut in Q2 2025 if CPI moderates.',
//     impact: 'Fixed income portfolios remain stable; watch for bond yield movements.',
//     impactColor: 'bg-amber-100 text-amber-800',
//     source: 'Economic Times',
//     publishedAt: '2025-03-27T09:30:00Z',
//   },
//   {
//     id: '2',
//     title: 'Tata Motors Reports Record EV Sales in Q4',
//     summary: 'Tata Motors sold over 25,000 electric vehicles in Q4 FY25, capturing 62% of the domestic EV market. The Nexon EV and Punch EV led volumes.',
//     impact: 'Positive signal for EV supply chain stocks and battery manufacturers.',
//     impactColor: 'bg-green-100 text-green-800',
//     source: 'Mint',
//     publishedAt: '2025-03-26T14:00:00Z',
//   },
//   {
//     id: '3',
//     title: 'Infosys Wins $2B Multi-Year Cloud Deal with European Bank',
//     summary: 'Infosys secured a landmark cloud transformation contract with a major European financial institution, boosting its BFSI vertical outlook for FY26.',
//     impact: 'Strong revenue visibility for Infosys; IT sector sentiment improves.',
//     impactColor: 'bg-blue-100 text-blue-800',
//     source: 'Business Standard',
//     publishedAt: '2025-03-25T11:15:00Z',
//   },
//   {
//     id: '4',
//     title: 'India GDP Growth Forecast Revised to 7.2% for FY26',
//     summary: 'The IMF upgraded India\'s growth forecast citing robust domestic consumption, infrastructure spending, and a resilient services sector despite global headwinds.',
//     impact: 'Broad market rally expected; cyclical sectors likely to outperform.',
//     impactColor: 'bg-purple-100 text-purple-800',
//     source: 'Reuters',
//     publishedAt: '2025-03-24T08:00:00Z',
//   },
// ]

// export const MOCK_BRIEFING = {
//   whatHappened: 'The Reserve Bank of India held its repo rate steady at 6.5% in its March 2025 monetary policy meeting. The MPC voted 4-2 in favour of the hold, citing elevated food prices driven by unseasonal rains and a cautious global outlook following renewed US tariff threats.',
//   whyItMatters: 'Interest rate decisions directly influence borrowing costs for businesses and consumers. A hold signals the RBI\'s commitment to inflation control over growth stimulus, which affects everything from home loan EMIs to corporate capex plans. For investors, it shapes expectations around bond yields and equity valuations.',
//   marketImpact: 'The Nifty 50 ended flat post-announcement while the 10-year G-Sec yield dipped 4 bps to 7.08%. Banking stocks saw mild selling pressure as rate-cut hopes were deferred. The rupee strengthened marginally against the dollar on reduced carry-trade outflow risk.',
//   watchNext: 'Monitor the April CPI print due on May 12 — a reading below 4.5% could open the door for a June rate cut. Also watch the US Fed\'s May meeting and any escalation in India-Pakistan trade tensions that could affect commodity imports.',
// }

// export const MOCK_STORY = {
//   topic: 'India-US Trade Tariff Negotiations',
//   events: [
//     { date: '2025-01-10', headline: 'US announces 25% tariff on Indian steel and aluminium exports', sentiment: -0.8 },
//     { date: '2025-01-28', headline: 'India retaliates with counter-tariffs on select US agricultural goods', sentiment: -0.6 },
//     { date: '2025-02-14', headline: 'Bilateral trade talks resume in Washington; both sides signal flexibility', sentiment: 0.3 },
//     { date: '2025-02-28', headline: 'India offers to reduce tariffs on US electronics in exchange for steel exemption', sentiment: 0.5 },
//     { date: '2025-03-15', headline: 'US grants 90-day tariff pause for India pending formal agreement', sentiment: 0.7 },
//     { date: '2025-03-27', headline: 'Joint statement issued; framework deal expected by June 2025', sentiment: 0.85 },
//   ],
//   sentimentSeries: [
//     { date: 'Jan 10', sentiment: -0.8 },
//     { date: 'Jan 28', sentiment: -0.6 },
//     { date: 'Feb 14', sentiment: 0.3 },
//     { date: 'Feb 28', sentiment: 0.5 },
//     { date: 'Mar 15', sentiment: 0.7 },
//     { date: 'Mar 27', sentiment: 0.85 },
//   ],
//   prediction: 'A formal trade framework agreement between India and the US is likely by Q2 2025, with India securing steel tariff exemptions in exchange for opening its electronics and agricultural markets.',
//   confidence: 72,
// }

// export const MOCK_TTS = {
//   text: 'Here is your MyET AI briefing. The Reserve Bank of India held its repo rate at six point five percent, citing persistent food inflation. Tata Motors reported record electric vehicle sales, capturing sixty-two percent of the domestic EV market. Infosys won a two billion dollar cloud deal with a European bank, strengthening its financial services outlook. India\'s GDP growth forecast was revised upward to seven point two percent for the next fiscal year. Stay informed, stay ahead.',
// }

// // API functions with mock fallback

// export async function fetchFeed({ persona, query }) {
//   if (!BASE_URL) return MOCK_FEED
//   try {
//     const res = await fetch(`${BASE_URL}/feed`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ persona, query }),
//     })
//     if (!res.ok) throw new Error(`HTTP ${res.status}`)
//     return await res.json()
//   } catch {
//     return MOCK_FEED
//   }
// }

// export async function fetchBrief({ persona, query }) {
//   if (!BASE_URL) return MOCK_BRIEFING
//   try {
//     const res = await fetch(`${BASE_URL}/brief`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ persona, query }),
//     })
//     if (!res.ok) throw new Error(`HTTP ${res.status}`)
//     return await res.json()
//   } catch {
//     return MOCK_BRIEFING
//   }
// }

// export async function fetchStory({ persona, query }) {
//   if (!BASE_URL) return MOCK_STORY
//   try {
//     const res = await fetch(`${BASE_URL}/story`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ persona, query }),
//     })
//     if (!res.ok) throw new Error(`HTTP ${res.status}`)
//     return await res.json()
//   } catch {
//     return MOCK_STORY
//   }
// }

// export async function fetchTTS({ persona, query }) {
//   if (!BASE_URL) return MOCK_TTS
//   try {
//     const res = await fetch(`${BASE_URL}/tts`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ persona, query }),
//     })
//     if (!res.ok) throw new Error(`HTTP ${res.status}`)
//     return await res.json()
//   } catch {
//     return MOCK_TTS
//   }
// }
