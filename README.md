# SATARK — Smart Procurement Monitoring & Risk Review System

![SIH 2026 Prototype](https://img.shields.io/badge/SIH%202026-Prototype-orange?style=for-the-badge)
![Vercel Status](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-Government%20Demo-blue?style=for-the-badge)

> **SATARK** (*Smart Procurement Monitoring & Risk Review System*) is an AI-assisted public procurement vigilance and anomaly detection platform designed for the Government of India. It helps procurement and vigilance officers identify restrictive eligibility criteria, collusive bidding patterns, vendor rotation networks, and price inflation early in the tender lifecycle.

---

## 🌐 Live Application & Links

- **Production Live URL**: [https://satark2.vercel.app](https://satark2.vercel.app)
- **GitHub Repository**: [https://github.com/pk1305/Satark](https://github.com/pk1305/Satark)
- **Vercel Inspector**: [https://vercel.com/pooja-kumaris-projects-5d057f17/satark2](https://vercel.com/pooja-kumaris-projects-5d057f17/satark2)

---

## 🎯 Problem Statement & Objective

Public procurement systems handle large volumes of government expenditure. Traditional manual vigilance checks often detect anomalies post-award, leading to missed indicators during the bidding phase. 

**SATARK** solves this challenge by delivering:
1. **Early Vigilance Alerts**: Real-time scoring of active tenders before award.
2. **Algorithmic Anomaly Detection**: Identifying suspiciously close bid margins and synchronized submission metadata.
3. **Graph Network Analysis**: Uncovering hidden vendor rotation and cross-entity directorships.
4. **Transparent Governance**: Enforcing immutable audit trails and standardized officer review memorandums under **GFR 2017** guidelines.

---

## ✨ Key Features & Capabilities

### 1. 🛡️ Automated Risk Engine & Scoring Gauge
Computes a multi-factor Risk Score (**0–100**) for every tender across four risk dimensions:
- **Restrictive Specifications Risk**: Detects turnover requirements exceeding recommended 1x–3x contract value.
- **Collusion & Cartelization Risk**: Highlights tight bid clustering and matching IP subnets.
- **Price Inflation Risk**: Compares estimated value against historical baseline procurements.
- **Vendor Rotation Score**: Identifies recurring alternating L1/L2 winner patterns across fiscal years.

### 2. 📄 Interactive Document Clause Inspector
- Dual-pane document viewer with dynamic clause highlighting.
- Flags problematic clauses (e.g., Clause 4.2 requiring ₹90 Cr turnover for a ₹9.0 Cr tender).
- Allows officers to inspect clauses, mark items verified, or append exception notes.

### 3. 📊 Bid Spread & Proximity Anomaly Analyzer
- Rendered SVG charts illustrating L1 vs. competitor price distribution.
- Alerts officers when L1 and L2 bids exhibit suspicious proximity (e.g. 0.4% variance) or uploaded within seconds from identical IP subnets.

### 4. 🕸️ Entity Collusion Network Graph
- Interactive SVG node-link graph mapping connections between bidding entities.
- Exposes shared directorships, common registered office addresses, and cross-guarantees.
- Includes a historical alternating winner matrix tracking vendor rotation over 3 fiscal years.

### 5. 📈 Historical Price Baseline Comparison
- Visual benchmark bar charts comparing current tender estimates against past comparable procurements (+15.3% estimate deviation alert).

### 6. 🤖 SATARK AI Remarks Assistant
- One-click official memorandum draft generator that synthesizes flagged findings into formal government observations under GFR 2017 rules.

### 7. 📜 Immutable Audit Trail & Memorandum Reference Generator
- Generates official memorandum reference IDs (`SATARK/REV/2026/XXXXX`).
- Maintains an immutable event log tracking timestamp, tender ID, action type, officer name, and IP address with CSV export support.

### 8. 🧪 Custom Tender Risk Analysis Tester
- Allows officers or hackathon evaluators to input custom tender parameters (Value, Department, Turnover Clause) and execute instant live risk scoring.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    SATARK Web Application                       │
│      (HTML5 Shell + Responsive Government Design System)        │
└─────────────────────────────────────────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌──────────────────────────────┐              ┌──────────────────────────────┐
│  State & Controller Engine   │              │  Visualization Engine        │
│  (src/app.js)                │              │  (src/charts.js)             │
│  - View Routing              │              │  - SVG Bid Distribution      │
│  - Navigation State          │              │  - Price Comparison Bars     │
│  - AI Remarks Generator      │              │  - Collusion Node Graph      │
│  - LocalStorage Persistence  │              │  - Risk Gauge Meters         │
└──────────────────────────────┘              └──────────────────────────────┘
               │                                             │
               └───────────────────────┬─────────────────────┘
                                       ▼
                     ┌───────────────────────────────────┐
                     │ Data Store & Audit Ledger         │
                     │ (src/tendersData.js)              │
                     │ - Active Monitored Tenders        │
                     │ - Historical Procurement Data     │
                     │ - Chronological Audit Logs        │
                     └───────────────────────────────────┘
```

---

## 📁 Repository Directory Structure

```
Satark/
├── index.html           # Main Single-Page HTML Shell & Portal Views
├── vercel.json          # Vercel Deployment & Rewrite Configuration
├── package.json         # Project Dependencies & Build Scripts
├── README.md            # Project Documentation
├── .gitignore           # Version Control Exclusions
├── public/              # Static Assets & Hero Parliament Photo
│   ├── parliament_hero.png
│   └── india_flag_graphic.jpg
└── src/
    ├── app.js           # Core Application Logic, Router & State Management
    ├── style.css        # Government Design System & CSS Styling
    ├── tendersData.js   # Tenders Master Data & Audit Ledger Store
    └── charts.js        # SVG & Canvas Chart Rendering Utilities
```

---

## 🚀 Local Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **NPM**: v9.0.0 or higher

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/pk1305/Satark.git
   cd Satark
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000/`.

4. **Build for Production**
   ```bash
   npm run build
   ```
   Production bundle will be compiled into the `dist/` directory.

---

## 🏛️ Compliance & Governance Standards

SATARK alignment includes:
- **GFR 2017 (General Financial Rules)**: Standard turnover and qualification rules (Rule 144).
- **CVC Vigilance Guidelines**: Fair competition, prevention of cartelization, and objective evaluation.
- **GeM Guidelines**: Automated vigilance monitoring for transparent public procurement.

---

## 📄 License & Disclaimer

This prototype was developed for demonstration purposes under **Smart India Hackathon 2026 (SIH 2026)**. All dataset entries represent synthetic test data and do not reflect live government statistics or official procurement records.
