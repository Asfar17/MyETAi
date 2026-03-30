# 🚀 My ET AI

![Status](https://img.shields.io/badge/status-active-success)
![AI](https://img.shields.io/badge/AI-LangGraph-blue)
![License](https://img.shields.io/badge/license-MIT-green)

### AI-Native Personalized News Platform

 **“From reading news → to understanding impact → to making decisions.”**

---

## 📌 Overview

**My ET AI** reimagines how business news is consumed.
Instead of static articles, users receive **personalized insights, structured briefings, and predictive story intelligence** powered by AI.

---

## 🎯 Problem

Business news today is:

* Static and one-size-fits-all
* Time-consuming to consume
* Lacking actionable insights

Users must read multiple articles to understand impact.

---

## 💡 Solution

My ET AI transforms news into:

* 🧠 **Personalized Insights** (based on user persona)
* 📊 **AI Briefings** (structured summaries)
* 🔥 **Story Arc Tracker** (timeline + sentiment + prediction)
* 🔊 **Audio Briefing (TTS)**

---

## 🏗️ System Architecture

```
Frontend (React + Vite, Vercel)
        ↓
Backend (FastAPI, GCP VM)
        ↓
Agents (Personalization / Brief / LangGraph)
        ↓
LLM (Groq - LLaMA 3.1)
        ↓
Structured Response → UI
```

---

## 🤖 Agentic Design

### 🔹 Personalization Agent

* Tailors news for specific personas (Investor, Founder, Student)

### 🔹 Briefing Agent

* Converts news into structured insights:

  * What happened
  * Why it matters
  * Market impact
  * What next

### 🔥 Story Tracker (LangGraph)

Multi-step reasoning pipeline:

```
Timeline → Sentiment → Prediction → Final Output
```

---

## ⚙️ Tech Stack

| Layer           | Technology                          |
| --------------- | ----------------------------------- |
| Frontend        | React (Vite), Tailwind CSS          |
| Backend         | FastAPI                             |
| Deployment      | Vercel (Frontend), GCP VM (Backend) |
| AI Model        | Groq (LLaMA 3.1)                    |
| Agent Framework | LangGraph (Hybrid Architecture)     |

---

## 🚀 Features

* 🔥 AI-powered personalized news feed
* 📊 Interactive intelligence briefings
* 📈 Story arc tracking with predictions
* ⚡ Real-time AI responses
* 🎯 Persona-based customization

---

## 🌐 Live Demo

👉 https://my-et-ai.vercel.app/

---

## 🧠 Innovation

* AI-native news experience
* Hybrid agent + LangGraph architecture
* Real-time personalization
* Predictive storytelling

---

## 💼 Business Impact

* ⏱️ Reduces news consumption time by ~80%
* 📊 Converts information into decision-ready insights
* 🎯 Useful for investors, founders, and students

---

## ⚡ Performance

* Ultra-fast inference using Groq
* Low latency (<2 seconds response time)
* Scalable REST API architecture

---

## ⚠️ Limitations

* Depends on LLM-generated outputs
* No real-time financial API integration

---

## 🔮 Future Work

* Portfolio-based personalization
* Real-time stock & market data integration
* Multi-language support
* Mobile application

---

## 🏆 Hackathon Context

Built for **Economic Times Agentic AI Hackathon**

---

## 👨‍💻 Author

**Asfar M**

---

## 📌 Version

`v1.0.0` — Initial Prototype Release
