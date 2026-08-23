// SATARK - Smart Procurement Monitoring & Risk Review System
// Data Store with rich demo tenders, collusion graphs, historical baselines, and initial audit logs

export const initialTenders = {
  "2026/GEM/1148": {
    no: "2026/GEM/1148",
    dept: "Department of Public Works & Infrastructure",
    subject: "Procurement of Enterprise Data Center IT Equipment & Storage Systems",
    value: "₹9.00 Cr",
    rawValue: 90000000,
    qty: "120 Units",
    pubDate: "02 Aug 2026",
    deadline: "30 Aug 2026",
    biddersCount: 3,
    status: "Pending",
    priority: "High",
    overallScore: 87, // Risk score out of 100
    category: "IT Equipment",
    fy: "2026-27",
    assignedOfficer: "Demo Procurement Officer",
    riskBreakdown: {
      restrictiveSpecs: 85,
      bidCollusion: 92,
      priceInflation: 78,
      patternRotation: 90
    },
    priorityText: "CRITICAL ALERT: Identified for mandatory review due to severe turnover restriction, suspicious L1-L2 bid proximity (0.4%), historical bid rotation patterns, and estimate deviation (+15.3%).",
    findings: [
      {
        id: "f1",
        title: "1. Restrictive Eligibility Turnover Requirement",
        text: "Tender Clause 4.2 requires minimum annual turnover of ₹90 Cr (10x contract value) for past 3 years. Standard GeM guidelines recommend 1x-3x value.",
        btnText: "Inspect Tender Document",
        view: "document",
        badge: "High Severity",
        clauseRef: "Clause 4.2"
      },
      {
        id: "f2",
        title: "2. Suspicious Bid Proximity & Clustering",
        text: "L1 (TechCorp India) ₹10.00 Cr and L2 (Nexus Solutions) ₹10.04 Cr show a variance of only 0.4% (₹4 Lakhs), indicating possible tacit price coordination.",
        btnText: "Analyze Bid Submissions",
        view: "bids",
        badge: "Collusion Risk",
        clauseRef: "Schedule B - Financial Bids"
      },
      {
        id: "f3",
        title: "3. Recurrent Alternating Bidder Pattern",
        text: "TechCorp India and Nexus Solutions have appeared together in 5 previous tenders, alternating L1 status across FY 2024-2026 with consistent 95%+ win rate.",
        btnText: "View Vendor History & Network",
        view: "participation",
        badge: "Rotation Pattern",
        clauseRef: "Historical Vendor Matrix"
      },
      {
        id: "f4",
        title: "4. Estimate Value Deviation vs Benchmarks",
        text: "Estimated value ₹9.00 Cr is 15.3% above historical baseline (avg ₹7.8 Cr - ₹8.1 Cr for identical hardware specs in Department B & C).",
        btnText: "Compare Price History",
        view: "comparison",
        badge: "Price Inflation",
        clauseRef: "Estimation Memo Annexure 1"
      }
    ],
    bids: [
      { company: "TechCorp India Pvt Ltd", amount: "₹10.00 Cr", rawAmount: 100000000, pos: "L1", status: "Qualified", pan: "AAACT1234F", gst: "07AAACT1234F1Z2", ip: "192.168.4.12" },
      { company: "Nexus Solutions Ltd", amount: "₹10.04 Cr", rawAmount: 100400000, pos: "L2", status: "Qualified", pan: "AAACN5678K", gst: "07AAACN5678K1Z5", ip: "192.168.4.15" },
      { company: "Vanguard Systems Pvt Ltd", amount: "₹12.80 Cr", rawAmount: 128000000, pos: "L3", status: "Qualified", pan: "AAACV9012M", gst: "27AAACV9012M1Z8", ip: "10.0.1.88" }
    ],
    documentText: `GOVERNMENT OF INDIA - DEPARTMENT OF PUBLIC WORKS & INFRASTRUCTURE
TENDER DOCUMENT NO: 2026/GEM/1148
SUBJECT: PROCUREMENT OF ENTERPRISE DATA CENTER IT EQUIPMENT & STORAGE SYSTEMS

SECTION I: INVITATION FOR BIDS
The Department invites e-tenders from eligible OEM/authorized partners for supply and deployment of server racks, storage SAN nodes, and high-speed switches.

SECTION II: ELIGIBILITY & QUALIFICATION CRITERIA
[FLAGGED CLAUSE 4.2] 4.2 Financial Standing: The bidder must have an average annual turnover of not less than INR 90.00 Crores during the last three financial years (FY 2023-24, 2024-25, 2025-26). Certified balance sheets signed by Chartered Accountant must be uploaded.
Note: Joint ventures are NOT permitted.

[FLAGGED CLAUSE 7.1] 7.1 Technical OEM Mandate: Bidder must possess exclusive single-entity authorization specific to this tender reference code issued by the OEM within 5 days prior to bid release date.

SECTION III: FINANCIAL BIDDING & EVALUATION
Evaluation shall be carried out on L1 total price basis inclusive of 5 years comprehensive warranty and on-site support.

SECTION IV: SPECIAL CONDITIONS OF CONTRACT
Delivery schedule: 45 days from issuance of PO. Penalty clause applies for delayed delivery at 0.5% per week.`,
    collusionNetwork: {
      nodes: [
        { id: "TechCorp", label: "TechCorp India", type: "vendor", color: "#e08b1d" },
        { id: "Nexus", label: "Nexus Solutions", type: "vendor", color: "#e08b1d" },
        { id: "Vanguard", label: "Vanguard Systems", type: "vendor", color: "#1d5aa3" },
        { id: "DirectorA", label: "Dir. Rajesh Kumar", type: "director", color: "#a01e1e" },
        { id: "SubnetX", label: "Shared IP 192.168.4.x", type: "tech", color: "#a01e1e" },
        { id: "AddressY", label: "Common Registered Reg. Office (Okhla Phase III)", type: "address", color: "#a01e1e" }
      ],
      links: [
        { source: "TechCorp", target: "DirectorA", relation: "Former Board Member (2023)" },
        { source: "Nexus", target: "DirectorA", relation: "Current Director" },
        { source: "TechCorp", target: "SubnetX", relation: "Bid Uploaded from IP" },
        { source: "Nexus", target: "SubnetX", relation: "Bid Uploaded from IP" },
        { source: "TechCorp", target: "AddressY", relation: "Billing Address" },
        { source: "Nexus", target: "AddressY", relation: "Branch Address" }
      ]
    },
    comparableHistory: [
      { tender: "Current Tender (2026/GEM/1148)", year: "2026", amount: 9.0, label: "Current Est." },
      { tender: "2024/GEM/0014 (Dept B)", year: "2024", amount: 7.8, label: "Hist #1" },
      { tender: "2024/GEM/0871 (Dept C)", year: "2024", amount: 8.1, label: "Hist #2" },
      { tender: "2025/GEM/0342 (Dept A)", year: "2025", amount: 8.2, label: "Hist #3" },
      { tender: "2025/GEM/1029 (Dept B)", year: "2025", amount: 8.3, label: "Hist #4" },
      { tender: "Industry Benchmark Range", year: "2026", amount: 8.0, label: "Avg Benchmark" }
    ]
  },

  "2026/GEM/1097": {
    no: "2026/GEM/1097",
    dept: "Department of Telecommunications",
    subject: "Procurement of High-Capacity Fiber Optical Switches & Routers",
    value: "₹6.40 Cr",
    rawValue: 64000000,
    qty: "40 Units",
    pubDate: "14 Aug 2026",
    deadline: "05 Sep 2026",
    biddersCount: 4,
    status: "Pending",
    priority: "High",
    overallScore: 79,
    category: "Networking Equipment",
    fy: "2026-27",
    assignedOfficer: "Demo Procurement Officer",
    riskBreakdown: {
      restrictiveSpecs: 94,
      bidCollusion: 45,
      priceInflation: 62,
      patternRotation: 50
    },
    priorityText: "HIGH RISK: Restrictive technical specifications engineered around a single proprietary OEM chipset.",
    findings: [
      {
        id: "f1",
        title: "1. Single Proprietary Chipset Specification",
        text: "Tender Clause 3.1 mandates custom protocol compliance exclusively manufactured by Vendor X, disqualifying standard open-source optical protocols.",
        btnText: "Inspect Tender Document",
        view: "document",
        badge: "Restrictive Spec",
        clauseRef: "Clause 3.1"
      },
      {
        id: "f2",
        title: "2. Unusually High Warranty & Lock-in Penalties",
        text: "Requires 10-year upfront mandatory SLA maintenance lock-in bundled into initial capex.",
        btnText: "Inspect Tender Document",
        view: "document",
        badge: "Lock-in Risk",
        clauseRef: "Clause 8.4"
      }
    ],
    bids: [
      { company: "NetTech Solutions", amount: "₹6.38 Cr", rawAmount: 63800000, pos: "L1", status: "Qualified" },
      { company: "OptiWave Networks", amount: "₹6.85 Cr", rawAmount: 68500000, pos: "L2", status: "Qualified" },
      { company: "CyberGrid India", amount: "₹7.10 Cr", rawAmount: 71000000, pos: "L3", status: "Qualified" },
      { company: "InfraLink Systems", amount: "₹7.45 Cr", rawAmount: 74500000, pos: "L4", status: "Disqualified" }
    ],
    documentText: `GOVERNMENT OF INDIA - DEPARTMENT OF TELECOMMUNICATIONS
TENDER REF: 2026/GEM/1097
PROCUREMENT OF HIGH-CAPACITY OPTICAL SWITCHES

[FLAGGED CLAUSE 3.1] 3.1 Technical Specs: Optical router architecture must incorporate proprietary Matrix-9 ASIC hardware acceleration with native X-Protocol support. Generic SFP+ interfaces without proprietary firmware key certification will be rejected.

[FLAGGED CLAUSE 8.4] 8.4 Maintenance Period: 10 Years mandatory Comprehensive AMC bundled in initial bid. Non-compliance results in immediate forfeiture of EMD.`,
    collusionNetwork: {
      nodes: [
        { id: "NetTech", label: "NetTech Solutions", type: "vendor", color: "#e08b1d" },
        { id: "OEM_X", label: "Proprietary OEM Chipmaker", type: "oem", color: "#a01e1e" }
      ],
      links: [
        { source: "NetTech", target: "OEM_X", relation: "Exclusive Authorization Holder" }
      ]
    },
    comparableHistory: [
      { tender: "Current (2026/GEM/1097)", year: "2026", amount: 6.4, label: "Current" },
      { tender: "2025/GEM/0912", year: "2025", amount: 5.8, label: "Hist 1" },
      { tender: "2025/GEM/0441", year: "2025", amount: 5.9, label: "Hist 2" }
    ]
  },

  "2026/GEM/1223": {
    no: "2026/GEM/1223",
    dept: "Ministry of Health & Family Welfare",
    subject: "Supply & Commissioning of Advanced Medical Imaging & Ultrasound Scanners",
    value: "₹11.00 Cr",
    rawValue: 110000000,
    qty: "25 Units",
    pubDate: "10 Aug 2026",
    deadline: "01 Sep 2026",
    biddersCount: 5,
    status: "Under Review",
    priority: "Medium",
    overallScore: 64,
    category: "Medical Equipment",
    fy: "2026-27",
    assignedOfficer: "Demo Procurement Officer",
    riskBreakdown: {
      restrictiveSpecs: 40,
      bidCollusion: 72,
      priceInflation: 48,
      patternRotation: 60
    },
    priorityText: "MEDIUM RISK: Bid clustering noticed between top 3 vendors (under 1.2% price variance). Currently under examination.",
    findings: [
      {
        id: "f1",
        title: "1. Tight Bid Spread Among Top Bidders",
        text: "L1 ₹11.10 Cr, L2 ₹11.18 Cr, L3 ₹11.23 Cr (less than 1.2% total variance across top 3 bidders).",
        btnText: "Analyze Bid Submissions",
        view: "bids",
        badge: "Bid Spread",
        clauseRef: "Financial Evaluation"
      }
    ],
    bids: [
      { company: "MediHealth Tech", amount: "₹11.10 Cr", rawAmount: 111000000, pos: "L1", status: "Qualified" },
      { company: "BioMed Instruments", amount: "₹11.18 Cr", rawAmount: 111800000, pos: "L2", status: "Qualified" },
      { company: "Pulse Care Care Sys", amount: "₹11.23 Cr", rawAmount: 112300000, pos: "L3", status: "Qualified" },
      { company: "Apex Medicare", amount: "₹12.90 Cr", rawAmount: 129000000, pos: "L4", status: "Qualified" },
      { company: "CareLine Global", amount: "₹13.40 Cr", rawAmount: 134000000, pos: "L5", status: "Qualified" }
    ],
    documentText: `MINISTRY OF HEALTH & FAMILY WELFARE
TENDER 2026/GEM/1223: ULTRASOUND & MEDICAL IMAGING EQUIPMENT

SECTION 1: SPECIFICATIONS
High-resolution 4D Color Doppler Ultrasound units with cardiac probes and AI auto-measure software.

SECTION 2: WARRANTY & AMC
5 Years comprehensive warranty followed by 5 years CAMC.`,
    collusionNetwork: {
      nodes: [
        { id: "MediHealth", label: "MediHealth Tech", type: "vendor", color: "#1d5aa3" },
        { id: "BioMed", label: "BioMed Instruments", type: "vendor", color: "#1d5aa3" }
      ],
      links: [
        { source: "MediHealth", target: "BioMed", relation: "Shared Consortium Agreement" }
      ]
    },
    comparableHistory: [
      { tender: "Current (2026/GEM/1223)", year: "2026", amount: 11.0, label: "Current" },
      { tender: "2025/GEM/0199", year: "2025", amount: 10.5, label: "Hist 1" },
      { tender: "2024/GEM/0882", year: "2024", amount: 10.2, label: "Hist 2" }
    ]
  },

  "2026/GEM/1305": {
    no: "2026/GEM/1305",
    dept: "Ministry of New & Renewable Energy",
    subject: "Turnkey Solar Street Lighting & Microgrid Installation",
    value: "₹18.50 Cr",
    rawValue: 185000000,
    qty: "5,000 Poles",
    pubDate: "08 Aug 2026",
    deadline: "28 Aug 2026",
    biddersCount: 6,
    status: "Pending",
    priority: "High",
    overallScore: 82,
    category: "Civil & Electrical Works",
    fy: "2026-27",
    assignedOfficer: "Demo Procurement Officer",
    riskBreakdown: {
      restrictiveSpecs: 55,
      bidCollusion: 88,
      priceInflation: 84,
      patternRotation: 75
    },
    priorityText: "HIGH RISK: Estimated cost 32% higher than state benchmark indices. Bid submission timestamps within 120 seconds.",
    findings: [
      {
        id: "f1",
        title: "1. Severe Price Estimate Inflation (+32%)",
        text: "Unit rate ₹37,000/pole benchmarked vs MNRE approved standard rate ₹28,000/pole.",
        btnText: "Compare Price History",
        view: "comparison",
        badge: "Inflation Risk",
        clauseRef: "Rate Analysis Annexure C"
      },
      {
        id: "f2",
        title: "2. Synchronized Submission Timestamps",
        text: "Bids from 3 competing firms were submitted within 118 seconds on GeM portal from identical IP subnet.",
        btnText: "Inspect Bid Metadata",
        view: "bids",
        badge: "Timestamp Anomaly",
        clauseRef: "Audit Log Metadata"
      }
    ],
    bids: [
      { company: "SunPower Technologies", amount: "₹18.20 Cr", rawAmount: 182000000, pos: "L1", status: "Qualified", ip: "182.72.11.4" },
      { company: "Solaris Green Energy", amount: "₹18.35 Cr", rawAmount: 183500000, pos: "L2", status: "Qualified", ip: "182.72.11.4" },
      { company: "EcoGrid Solutions", amount: "₹18.42 Cr", rawAmount: 184200000, pos: "L3", status: "Qualified", ip: "182.72.11.6" }
    ],
    documentText: `MINISTRY OF RENEWABLE ENERGY - TENDER 2026/GEM/1305
SOLAR LIGHTING & MICROGRID INSTALLATION

Rate analysis based on local regional rates. Battery specification mandatory LiFePO4 12.8V 50Ah.`,
    collusionNetwork: {
      nodes: [
        { id: "SunPower", label: "SunPower Tech", type: "vendor", color: "#a01e1e" },
        { id: "Solaris", label: "Solaris Green", type: "vendor", color: "#a01e1e" },
        { id: "IP_Gateway", label: "Gateway 182.72.11.4", type: "tech", color: "#a01e1e" }
      ],
      links: [
        { source: "SunPower", target: "IP_Gateway", relation: "Submitted Bid at 14:02:11" },
        { source: "Solaris", target: "IP_Gateway", relation: "Submitted Bid at 14:03:09" }
      ]
    },
    comparableHistory: [
      { tender: "Current (2026/GEM/1305)", year: "2026", amount: 18.5, label: "Current" },
      { tender: "MNRE Benchmark", year: "2026", amount: 14.0, label: "Standard Benchmark" }
    ]
  },

  "2026/PROC/1021": {
    no: "2026/PROC/1021",
    dept: "Department of Administrative Reforms",
    subject: "Supply of Ergonomic Modular Office Furniture & Workstations",
    value: "₹1.20 Cr",
    rawValue: 12000000,
    qty: "300 Sets",
    pubDate: "05 Aug 2026",
    deadline: "20 Aug 2026",
    biddersCount: 6,
    status: "Completed",
    priority: "Low",
    overallScore: 18,
    category: "Office Supplies",
    fy: "2026-27",
    assignedOfficer: "Demo Procurement Officer",
    riskBreakdown: {
      restrictiveSpecs: 15,
      bidCollusion: 12,
      priceInflation: 20,
      patternRotation: 10
    },
    priorityText: "LOW RISK: Passed all vigilance indicators. Competitive bid spread with broad vendor participation.",
    findings: [],
    bids: [
      { company: "ErgoDesign Ltd", amount: "₹1.08 Cr", rawAmount: 10800000, pos: "L1", status: "Qualified" },
      { company: "Urban Space Furniture", amount: "₹1.18 Cr", rawAmount: 11800000, pos: "L2", status: "Qualified" },
      { company: "Comfort Workstation Pvt Ltd", amount: "₹1.25 Cr", rawAmount: 12500000, pos: "L3", status: "Qualified" }
    ],
    documentText: `DEPARTMENT OF ADMINISTRATIVE REFORMS
TENDER NO: 2026/PROC/1021 - ERGONOMIC WORKSTATIONS
Standard BIS / BIFMA certified furniture specifications. Open bidding on GeM portal.`,
    collusionNetwork: { nodes: [], links: [] },
    comparableHistory: [
      { tender: "Current", year: "2026", amount: 1.2, label: "Current" },
      { tender: "2025 Baseline", year: "2025", amount: 1.15, label: "Baseline" }
    ]
  }
};

export const initialAuditLogs = [
  { id: "aud-101", timestamp: "24 Aug 2026, 14:15", tenderNo: "2026/GEM/1148", action: "Officer Review Submitted", officer: "Demo Procurement Officer", status: "Seek Clarification", ip: "10.24.8.192" },
  { id: "aud-100", timestamp: "24 Aug 2026, 11:30", tenderNo: "2026/GEM/1305", action: "Flagged by AI Engine", officer: "SATARK Automated Guard", status: "High Priority Alert", ip: "System" },
  { id: "aud-99", timestamp: "24 Aug 2026, 09:42", tenderNo: "2026/GEM/1097", action: "Document Inspection", officer: "Demo Procurement Officer", status: "In Progress", ip: "10.24.8.192" },
  { id: "aud-98", timestamp: "23 Aug 2026, 16:20", tenderNo: "2026/GEM/1223", action: "Status Updated", officer: "Vigilance Audit Team B", status: "Under Review", ip: "10.24.12.44" },
  { id: "aud-97", timestamp: "22 Aug 2026, 11:05", tenderNo: "2026/PROC/1021", action: "Review Completed", officer: "Senior Officer C", status: "No Action", ip: "10.24.5.11" }
];

export const initialMyActions = [
  { refNo: "SATARK/REV/2026/09412", tenderNo: "2026/GEM/1148", actionTaken: "Seek Clarification", date: "24 Aug 2026", status: "Submitted", remarks: "Clarification sought regarding turnover requirement of 10x value (Clause 4.2) and suspicious 0.4% bid variance between L1 and L2." }
];
