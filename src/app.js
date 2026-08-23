// SATARK — Smart Procurement Monitoring & Risk Review System
// Main Application Engine & Controller

import { initialTenders, initialAuditLogs, initialMyActions } from './tendersData.js';
import { renderBidSpreadChart, renderPriceComparisonChart, renderCollusionGraph, renderRiskScoreGauge } from './charts.js';

class SatarkApp {
  constructor() {
    this.tenders = JSON.parse(localStorage.getItem('satark_tenders')) || initialTenders;
    this.auditLogs = JSON.parse(localStorage.getItem('satark_audit_logs')) || initialAuditLogs;
    this.myActions = JSON.parse(localStorage.getItem('satark_my_actions')) || initialMyActions;
    
    this.currentTenderNo = "2026/GEM/1148";
    this.activeView = "home";
    this.isLoggedIn = false;
    this.theme = localStorage.getItem('satark_theme') || 'light';
    this.reviewCounter = Math.floor(1000 + Math.random() * 9000);

    this.initTheme();
  }

  saveState() {
    localStorage.setItem('satark_tenders', JSON.stringify(this.tenders));
    localStorage.setItem('satark_audit_logs', JSON.stringify(this.auditLogs));
    localStorage.setItem('satark_my_actions', JSON.stringify(this.myActions));
    localStorage.setItem('satark_theme', this.theme);
  }

  initTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.initTheme();
    this.saveState();
    this.showToast(`Switched to ${this.theme.toUpperCase()} mode`);
  }

  showToast(message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="ph-info"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  login(officerId, password) {
    this.isLoggedIn = true;
    const headerAuthBtnText = document.getElementById('headerAuthBtnText');
    if (headerAuthBtnText) headerAuthBtnText.textContent = "Demo Officer (Logout)";
    this.goto('home');
    this.showToast("Logged in as Demo Procurement Officer");
  }

  logout() {
    this.isLoggedIn = false;
    document.getElementById('app-shell').style.display = 'none';
    document.getElementById('view-login').style.display = 'block';
    
    // Deactivate all views
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-login').classList.add('active');

    const headerAuthBtnText = document.getElementById('headerAuthBtnText');
    if (headerAuthBtnText) headerAuthBtnText.textContent = "Login / Sign In ▼";

    this.showToast("Logged out successfully");
  }

  goto(viewId, tenderNo = null) {
    if (tenderNo) {
      this.currentTenderNo = tenderNo;
    }

    // 1. Hide login screen and show main application shell
    const loginView = document.getElementById('view-login');
    const appShell = document.getElementById('app-shell');
    
    if (loginView) {
      loginView.style.display = 'none';
      loginView.classList.remove('active');
    }
    if (appShell) {
      appShell.style.display = 'block';
    }

    // 2. Hide all view containers
    document.querySelectorAll('.view').forEach(v => {
      v.classList.remove('active');
      v.style.display = 'none';
    });

    // 3. Show target view container
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
      targetView.style.display = 'block';
      targetView.classList.add('active');
      this.activeView = viewId;
    }

    // 4. Highlight active nav button
    document.querySelectorAll('#mainNav button, .gem-sub-nav button').forEach(btn => {
      if (btn.getAttribute('data-view') === viewId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 5. Render specific view contents
    switch (viewId) {
      case 'home':
        this.renderHome();
        break;
      case 'monitoring':
        this.renderMonitoring();
        break;
      case 'review-list':
        this.renderReviewList();
        break;
      case 'search':
        this.renderSearchDefault();
        break;
      case 'details':
        this.renderDetails();
        break;
      case 'document':
        this.renderDocument();
        break;
      case 'bids':
        this.renderBids();
        break;
      case 'participation':
        this.renderParticipation();
        break;
      case 'comparison':
        this.renderComparison();
        break;
      case 'officer-review':
        this.renderOfficerReview();
        break;
      case 'audit':
        this.renderAudit();
        break;
      case 'my-actions':
        this.renderMyActions();
        break;
      case 'previous':
        this.renderPrevious();
        break;
      case 'reports':
        this.renderReports();
        break;
      case 'help':
        break;
    }
  }

  setFontSize(level) {
    if (level === 'small') {
      document.body.style.fontSize = '12px';
      this.showToast("Font size: Small (12px)");
    } else if (level === 'large') {
      document.body.style.fontSize = '16px';
      this.showToast("Font size: Large (16px)");
    } else {
      document.body.style.fontSize = '14px';
      this.showToast("Font size: Standard (14px)");
    }
  }

  showLanguageModal() {
    let modal = document.getElementById('langModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'langModal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content" style="max-width:400px;">
          <div class="modal-header">
            <h3>🌐 Select Portal Language / भाषा चुनें</h3>
            <button class="btn secondary small" onclick="document.getElementById('langModal').remove()">✕</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">
            <button class="btn secondary" onclick="app.selectLanguage('English (IN)')" style="justify-content:flex-start;">✓ English (Indian Portal Standard)</button>
            <button class="btn secondary" onclick="app.selectLanguage('हिंदी (Hindi)')" style="justify-content:flex-start;">🇮🇳 हिंदी (Hindi)</button>
            <button class="btn secondary" onclick="app.selectLanguage('मराठी (Marathi)')" style="justify-content:flex-start;">🇮🇳 मराठी (Marathi)</button>
            <button class="btn secondary" onclick="app.selectLanguage('ગુજરાતી (Gujarati)')" style="justify-content:flex-start;">🇮🇳 ગુજરાતી (Gujarati)</button>
            <button class="btn secondary" onclick="app.selectLanguage('தமிழ் (Tamil)')" style="justify-content:flex-start;">🇮🇳 தமிழ் (Tamil)</button>
            <button class="btn secondary" onclick="app.selectLanguage('తెలుగు (Telugu)')" style="justify-content:flex-start;">🇮🇳 తెలుగు (Telugu)</button>
            <button class="btn secondary" onclick="app.selectLanguage('বাংলা (Bengali)')" style="justify-content:flex-start;">🇮🇳 বাংলা (Bengali)</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
  }

  selectLanguage(lang) {
    document.getElementById('langModal')?.remove();
    this.showToast(`Portal Language set to ${lang}`);
  }

  showRaiseTicketModal() {
    let modal = document.getElementById('ticketModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'ticketModal';
      modal.className = 'modal-overlay';
      const ticketId = `GEM-SATARK-${Math.floor(10000 + Math.random()*90000)}`;
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3>🎫 Raise a Helpdesk / Vigilance Support Ticket</h3>
            <button class="btn secondary small" onclick="document.getElementById('ticketModal').remove()">✕</button>
          </div>
          <div class="field" style="margin-bottom:10px;">
            <label>Generated Ticket Reference ID</label>
            <input type="text" value="${ticketId}" readonly style="font-weight:700;color:var(--gem-blue);">
          </div>
          <div class="field" style="margin-bottom:10px;">
            <label>Issue Category</label>
            <select id="tCategory">
              <option>Tender Risk Score Inquiry</option>
              <option>Technical Specification Lock-in Query</option>
              <option>Bidder IP Subnet Anomaly Report</option>
              <option>System Access & Authorization Support</option>
            </select>
          </div>
          <div class="field" style="margin-bottom:14px;">
            <label>Detailed Problem Description</label>
            <textarea id="tDesc" placeholder="Provide tender reference number and observations..."></textarea>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:10px;">
            <button class="btn secondary" onclick="document.getElementById('ticketModal').remove()">Cancel</button>
            <button class="btn" onclick="app.submitTicket('${ticketId}')">Submit Ticket</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
  }

  submitTicket(ticketId) {
    document.getElementById('ticketModal')?.remove();
    this.showToast(`Support Ticket ${ticketId} created & assigned to Helpdesk!`);
  }

  /* ================= VIEW RENDERING ================= */
  renderHome() {
    const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    const todayEl = document.getElementById('todayDate');
    if (todayEl) todayEl.textContent = todayStr;

    const tickerDate = document.getElementById('tickerDateStr');
    if (tickerDate) tickerDate.textContent = todayStr;

    // Table of attention tenders
    const highAndMed = Object.keys(this.tenders).filter(no => this.tenders[no].priority !== 'Low');
    this.renderTenderTable('homeTenderTable', highAndMed, true);

    // Update badge count in navbar
    const pendingReviewCount = Object.values(this.tenders).filter(t => t.priority !== 'Low' && t.status !== 'Completed').length;
    const reviewNavBadge = document.getElementById('navReviewBadge');
    if (reviewNavBadge) {
      reviewNavBadge.textContent = pendingReviewCount;
    }
  }

  renderMonitoring() {
    this.renderTenderTable('monitoringTable', Object.keys(this.tenders), true);
  }

  renderReviewList() {
    const flagged = Object.keys(this.tenders).filter(no => this.tenders[no].priority !== 'Low');
    this.renderTenderTable('reviewListTable', flagged, true);
  }

  renderSearchDefault() {
    this.renderTenderTable('searchResultsTable', Object.keys(this.tenders), true);
  }

  runSearch() {
    const tno = (document.getElementById('sTenderNo')?.value || '').toLowerCase().trim();
    const dept = document.getElementById('sDept')?.value || 'All';
    const cat = document.getElementById('sCat')?.value || 'All';
    const status = document.getElementById('sStatus')?.value || 'All';
    const priority = document.getElementById('sPriority')?.value || 'All';

    let list = Object.values(this.tenders);

    if (tno) {
      list = list.filter(t => t.no.toLowerCase().includes(tno) || t.subject.toLowerCase().includes(tno));
    }
    if (dept !== 'All' && dept !== 'All Departments') {
      list = list.filter(t => t.dept.toLowerCase().includes(dept.toLowerCase()));
    }
    if (cat !== 'All' && cat !== 'All Categories') {
      list = list.filter(t => t.category === cat);
    }
    if (status !== 'All') {
      list = list.filter(t => t.status === status);
    }
    if (priority !== 'All') {
      list = list.filter(t => t.priority === priority);
    }

    this.renderTenderTable('searchResultsTable', list.map(t => t.no), true);
    this.showToast(`Search completed: ${list.length} matching tender(s) found.`);
  }

  renderTenderTable(elId, keysList, withAction) {
    const container = document.getElementById(elId);
    if (!container) return;

    if (keysList.length === 0) {
      container.innerHTML = `<tr><td colspan="8" class="empty-note" style="text-align:center;padding:20px;">No tenders matching criteria.</td></tr>`;
      return;
    }

    const head = `
      <thead>
        <tr>
          <th>Tender Number</th>
          <th>Department</th>
          <th>Subject / Title</th>
          <th style="text-align:right;">Est. Value</th>
          <th>Risk Score</th>
          <th>Priority</th>
          <th>Status</th>
          ${withAction ? '<th>Action</th>' : ''}
        </tr>
      </thead>
    `;

    const body = "<tbody>" + keysList.map(no => {
      const t = this.tenders[no];
      if (!t) return '';
      const pClass = t.priority.toLowerCase();
      const scoreColor = t.overallScore >= 75 ? 'var(--high)' : (t.overallScore >= 50 ? 'var(--medium)' : 'var(--low)');

      return `
        <tr>
          <td><strong style="color:var(--gem-navy-header);">${t.no}</strong></td>
          <td>${t.dept}</td>
          <td>${t.subject}</td>
          <td style="text-align:right;font-weight:700;">${t.value}</td>
          <td><span style="font-weight:800;color:${scoreColor};">${t.overallScore || 50}/100</span></td>
          <td><span class="badge ${pClass}">${t.priority}</span></td>
          <td><span class="badge status">${t.status}</span></td>
          ${withAction ? `<td><button class="btn small" onclick="app.goto('details', '${t.no}')">Review</button></td>` : ''}
        </tr>
      `;
    }).join("") + "</tbody>";

    container.innerHTML = head + body;
  }

  renderDetails() {
    const t = this.tenders[this.currentTenderNo];
    if (!t) return;

    document.getElementById('detailsTenderNo').textContent = `Tender No.: ${t.no} (${t.subject})`;

    // Journey Stepper
    const steps = [
      { id: 'details', label: '1. Risk Details' },
      { id: 'document', label: '2. Clause Review' },
      { id: 'bids', label: '3. Bid Analysis' },
      { id: 'participation', label: '4. Vendor History' },
      { id: 'comparison', label: '5. Price Baseline' },
      { id: 'officer-review', label: '6. Officer Action' }
    ];

    const journeySteps = document.getElementById('journeySteps');
    if (journeySteps) {
      journeySteps.innerHTML = steps.map(s => `
        <div class="step ${s.id === 'details' ? 'current' : ''}" onclick="app.goto('${s.id}')">
          ${s.label}
        </div>
      `).join('');
    }

    // Tender Info Grid
    const infoGrid = document.getElementById('tenderInfoGrid');
    if (infoGrid) {
      infoGrid.innerHTML = `
        <div class="row"><span class="k">Procuring Department</span><span class="v">${t.dept}</span></div>
        <div class="row"><span class="k">Tender Category</span><span class="v">${t.category || 'General'}</span></div>
        <div class="row"><span class="k">Estimated Value</span><span class="v">${t.value}</span></div>
        <div class="row"><span class="k">Quantity / Scope</span><span class="v">${t.qty}</span></div>
        <div class="row"><span class="k">Publication Date</span><span class="v">${t.pubDate}</span></div>
        <div class="row"><span class="k">Submission Deadline</span><span class="v">${t.deadline}</span></div>
        <div class="row"><span class="k">Bidders Participated</span><span class="v">${t.biddersCount} Bidders</span></div>
        <div class="row"><span class="k">Current Status</span><span class="v">${t.status}</span></div>
      `;
    }

    // Priority Block
    const pBlock = document.getElementById('priorityBlock');
    if (pBlock) {
      pBlock.className = `priority-block ${t.priority.toLowerCase()}`;
      document.getElementById('priorityTag').textContent = `${t.priority.toUpperCase()} PRIORITY REVIEW`;
      document.getElementById('priorityText').textContent = t.priorityText;
    }

    // Gauge Score
    renderRiskScoreGauge('riskGaugeContainer', t.overallScore || 75);

    // Findings List
    const fList = document.getElementById('findingsList');
    if (fList) {
      if (!t.findings || t.findings.length === 0) {
        fList.innerHTML = `<div class="empty-note">No specific findings flagged for this tender. It meets standard benchmark criteria.</div>`;
      } else {
        fList.innerHTML = t.findings.map(f => `
          <div class="finding">
            <h4>${f.title} <span class="badge high">${f.badge || 'Flagged'}</span></h4>
            <p>${f.text}</p>
            <div class="btnrow">
              <button class="btn secondary small" onclick="app.goto('${f.view}')">${f.btnText}</button>
            </div>
          </div>
        `).join('');
      }
    }
  }

  renderDocument() {
    const t = this.tenders[this.currentTenderNo];
    if (!t) return;

    const docTextEl = document.getElementById('docText');
    if (docTextEl && t.documentText) {
      let text = t.documentText;
      text = text.replace(/\[FLAGGED CLAUSE ([\d\.]+)\]/g, '<mark class="flagged-clause" onclick="alert(\'Clause $1 flagged by SATARK Rule Engine.\')">[FLAGGED CLAUSE $1]</mark>');
      docTextEl.innerHTML = text.replace(/\n/g, '<br>');
    }
  }

  renderBids() {
    const t = this.tenders[this.currentTenderNo];
    if (!t) return;

    renderBidSpreadChart('bidChartContainer', t.bids);

    const tableEl = document.getElementById('bidsTableBody');
    if (tableEl && t.bids) {
      tableEl.innerHTML = t.bids.map(b => `
        <tr>
          <td><strong>${b.company}</strong></td>
          <td>${b.amount}</td>
          <td><span class="badge ${b.pos === 'L1' ? 'low' : 'status'}">${b.pos}</span></td>
          <td>${b.ip ? `<span style="font-family:monospace;color:var(--high);">${b.ip}</span>` : '10.0.1.12'}</td>
          <td>${b.status}</td>
        </tr>
      `).join('');
    }
  }

  renderParticipation() {
    const t = this.tenders[this.currentTenderNo];
    if (!t) return;

    renderCollusionGraph('collusionGraphContainer', t.collusionNetwork);
  }

  renderComparison() {
    const t = this.tenders[this.currentTenderNo];
    if (!t) return;

    renderPriceComparisonChart('priceChartContainer', t.comparableHistory);
  }

  renderOfficerReview() {
    const t = this.tenders[this.currentTenderNo];
    if (!t) return;

    document.getElementById('orTenderNo').textContent = t.no;
    document.getElementById('orPriority').textContent = `${t.priority} Priority (${t.overallScore}/100 Risk Score)`;
    document.getElementById('orFindings').textContent = `${t.findings ? t.findings.length : 0} Risk Indicators Flagged`;
  }

  generateAIRemarks() {
    const t = this.tenders[this.currentTenderNo];
    if (!t) return;

    const action = document.querySelector('input[name="action"]:checked')?.value || 'Seek Clarification';

    let remarks = `OFFICIAL MEMORANDUM — SATARK VIGILANCE AUDIT\nRef: ${t.no} (${t.dept})\nDecision: ${action}\n\n`;

    if (action === 'Seek Clarification') {
      remarks += `Pursuant to automated procurement risk indicators flagged by SATARK, official clarification is requested from the procuring entity regarding:\n`;
      t.findings.forEach(f => {
        remarks += `• ${f.title}: ${f.text}\n`;
      });
      remarks += `Response requested within 7 working days prior to financial tender award.`;
    } else if (action === 'Refer for Further Examination') {
      remarks += `Case referred to Chief Vigilance Officer (CVO) for detailed forensic examination due to multi-indicator collusion risk, bid proximity, and vendor rotation patterns.`;
    } else if (action === 'No Further Action') {
      remarks += `Reviewed officer observations and technical justification. Specifications and cost estimate are verified as reasonable under GFR 2017 rules. Case closed.`;
    } else {
      remarks += `Forwarded to Departmental Procurement Board for executive determination.`;
    }

    const remarksEl = document.getElementById('orRemarks');
    if (remarksEl) {
      remarksEl.value = remarks;
      this.showToast("SATARK AI Remarks generated!");
    }
  }

  submitReview() {
    const t = this.tenders[this.currentTenderNo];
    if (!t) return;

    const action = document.querySelector('input[name="action"]:checked')?.value || 'Seek Clarification';
    const remarks = document.getElementById('orRemarks')?.value || 'Review recorded.';

    const refNo = `SATARK/REV/2026/09${this.reviewCounter++}`;
    const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    t.status = action === 'No Further Action' ? 'Completed' : 'Under Review';
    if (action === 'No Further Action') t.priority = 'Low';

    const auditEntry = {
      id: `aud-${Date.now()}`,
      timestamp: `${dateStr}, ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`,
      tenderNo: t.no,
      action: `Officer Action: ${action}`,
      officer: "Demo Procurement Officer",
      status: t.status,
      ip: "10.24.8.192"
    };
    this.auditLogs.unshift(auditEntry);

    const actionEntry = {
      refNo: refNo,
      tenderNo: t.no,
      actionTaken: action,
      date: dateStr,
      status: "Submitted",
      remarks: remarks
    };
    this.myActions.unshift(actionEntry);

    this.saveState();

    document.getElementById('cfTenderNo').textContent = t.no;
    document.getElementById('cfAction').textContent = action;
    document.getElementById('cfDate').textContent = dateStr;
    document.getElementById('cfRef').textContent = refNo;

    this.goto('confirmation');
    this.showToast(`Review submitted. Reference: ${refNo}`);
  }

  renderAudit() {
    const container = document.getElementById('auditTable');
    if (!container) return;

    const head = `<thead><tr><th>Timestamp</th><th>Tender No</th><th>Activity / Event</th><th>Officer / System</th><th>IP Address</th><th>Status</th></tr></thead>`;
    const body = "<tbody>" + this.auditLogs.map(a => `
      <tr>
        <td>${a.timestamp}</td>
        <td><strong>${a.tenderNo}</strong></td>
        <td>${a.action}</td>
        <td>${a.officer}</td>
        <td style="font-family:monospace;font-size:11.5px;">${a.ip || '10.24.8.192'}</td>
        <td><span class="badge status">${a.status}</span></td>
      </tr>
    `).join('') + "</tbody>";

    container.innerHTML = head + body;
  }

  renderMyActions() {
    const container = document.getElementById('myActionsTable');
    if (!container) return;

    const head = `<thead><tr><th>Ref No</th><th>Tender No</th><th>Action Taken</th><th>Date</th><th>Status</th><th>Officer Remarks</th></tr></thead>`;
    const body = "<tbody>" + this.myActions.map(m => `
      <tr>
        <td><strong style="color:var(--gem-blue);">${m.refNo}</strong></td>
        <td>${m.tenderNo}</td>
        <td><strong>${m.actionTaken}</strong></td>
        <td>${m.date}</td>
        <td><span class="badge low">${m.status}</span></td>
        <td style="font-size:12px;color:var(--text-muted);">${m.remarks.substring(0, 90)}...</td>
      </tr>
    `).join('') + "</tbody>";

    container.innerHTML = head + body;
  }

  renderPrevious() {}

  renderReports() {}

  showAddTenderModal() {
    let modal = document.getElementById('addTenderModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'addTenderModal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3><i class="ph-plus-circle"></i> Input Custom Tender for SATARK AI Analysis</h3>
            <button class="btn secondary small" onclick="document.getElementById('addTenderModal').remove()">✕</button>
          </div>
          <div class="field" style="margin-bottom:10px;">
            <label>Tender Number</label>
            <input type="text" id="newTNo" value="2026/GEM/${Math.floor(2000 + Math.random()*8000)}">
          </div>
          <div class="field" style="margin-bottom:10px;">
            <label>Department</label>
            <input type="text" id="newDept" value="Department of Urban Development">
          </div>
          <div class="field" style="margin-bottom:10px;">
            <label>Tender Title / Subject</label>
            <input type="text" id="newSubject" value="Procurement of Smart Waste Management Sensors">
          </div>
          <div class="field" style="margin-bottom:10px;">
            <label>Estimated Contract Value (₹)</label>
            <input type="text" id="newValue" value="₹15.00 Cr">
          </div>
          <div class="field" style="margin-bottom:14px;">
            <label>Turnover Requirement Clause</label>
            <input type="text" id="newTurnover" value="Turnover requirement: ₹150 Cr (10x contract value)">
          </div>
          <div style="display:flex;justify-content:flex-end;gap:10px;">
            <button class="btn secondary" onclick="document.getElementById('addTenderModal').remove()">Cancel</button>
            <button class="btn" onclick="app.processCustomTender()">Run SATARK Risk Analysis</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
  }

  processCustomTender() {
    const no = document.getElementById('newTNo').value || '2026/GEM/9999';
    const dept = document.getElementById('newDept').value || 'General Dept';
    const subject = document.getElementById('newSubject').value || 'Procurement Item';
    const value = document.getElementById('newValue').value || '₹10.00 Cr';
    const turnover = document.getElementById('newTurnover').value || 'Standard turnover';

    const newTender = {
      no: no,
      dept: dept,
      subject: subject,
      value: value,
      qty: "100 Units",
      pubDate: "24 Aug 2026",
      deadline: "15 Sep 2026",
      biddersCount: 3,
      status: "Pending",
      priority: "High",
      overallScore: 84,
      category: "IT & Electronics",
      fy: "2026-27",
      assignedOfficer: "Demo Procurement Officer",
      priorityText: "CUSTOM TENDER ANALYZED: Flagged for high turnover lock-in and potential specification restriction.",
      findings: [
        {
          id: "f1",
          title: "1. Excessive Turnover Barrier",
          text: turnover,
          btnText: "Inspect Tender Document",
          view: "document",
          badge: "High Risk",
          clauseRef: "Clause 4.1"
        }
      ],
      bids: [
        { company: "Vendor Alpha Ltd", amount: value, rawAmount: 100000000, pos: "L1", status: "Qualified" },
        { company: "Vendor Beta Systems", amount: "₹10.05 Cr", rawAmount: 100500000, pos: "L2", status: "Qualified" }
      ],
      documentText: `CUSTOM TENDER ANALYSIS - ${no}\n${subject}\n\n${turnover}`,
      collusionNetwork: { nodes: [], links: [] },
      comparableHistory: [
        { tender: "Current", year: "2026", amount: 15.0, label: "Current" },
        { tender: "Historical Baseline", year: "2025", amount: 12.0, label: "Baseline" }
      ]
    };

    this.tenders[no] = newTender;
    this.saveState();
    document.getElementById('addTenderModal')?.remove();
    this.showToast(`Custom Tender ${no} analyzed & added to Review Queue!`);
    this.goto('details', no);
  }
}

// Global Instant Instance & Window Binding
const app = new SatarkApp();
window.app = app;

window.doLogin = () => app.login(document.getElementById('officerId')?.value, document.getElementById('password')?.value);
window.doLogout = () => app.logout();
window.goto = (v, t) => app.goto(v, t);
window.runSearch = () => app.runSearch();
window.submitReview = () => app.submitReview();
window.generateAIRemarks = () => app.generateAIRemarks();

// Universal Global Event Delegation Listener for All Navigation & Action Buttons
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-view], [onclick^="goto"]');
  if (btn) {
    const view = btn.getAttribute('data-view');
    if (view) {
      e.preventDefault();
      app.goto(view);
    }
  }
});

// DOM Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Always render initial view on load
  app.goto('home');
});

export default app;
