// SATARK SVG & Canvas Chart Rendering Utilities

export function renderBidSpreadChart(containerId, bids) {
  const container = document.getElementById(containerId);
  if (!container || !bids || bids.length === 0) return;

  const maxVal = Math.max(...bids.map(b => b.rawAmount));
  const minVal = Math.min(...bids.map(b => b.rawAmount));
  const range = maxVal - minVal || 1;

  let html = `
    <div class="bid-chart-wrap">
      <div class="bid-chart-header">
        <span class="title"><i class="ph-chart-bar"></i> Bid Spread & Price Distribution Analysis</span>
        <span class="subtitle">L1 vs Competitor Margin Spread</span>
      </div>
      <div class="bid-bars-container">
  `;

  bids.forEach((bid, idx) => {
    // Relative height percentage (min 35%, max 100%)
    const pct = 35 + ((bid.rawAmount / maxVal) * 65);
    const isL1 = bid.pos === 'L1';
    const isL2 = bid.pos === 'L2';
    
    // Variance from L1 calculation
    const l1Amt = bids[0].rawAmount;
    const diffPct = idx === 0 ? "0.0%" : `+${(((bid.rawAmount - l1Amt) / l1Amt) * 100).toFixed(1)}%`;
    const isSuspicious = isL2 && (((bid.rawAmount - l1Amt) / l1Amt) * 100) < 1.0;

    html += `
      <div class="bid-bar-col ${isSuspicious ? 'suspicious' : ''}">
        <div class="bid-val-tag">${bid.amount}</div>
        <div class="bid-diff-tag ${idx === 0 ? 'l1-tag' : (isSuspicious ? 'alert-tag' : '')}">${diffPct}</div>
        <div class="bid-bar-track">
          <div class="bid-bar-fill ${isL1 ? 'l1' : (isL2 && isSuspicious ? 'alert' : 'normal')}" style="height:${pct}%;">
            <span class="bar-pos">${bid.pos}</span>
          </div>
        </div>
        <div class="bid-company-name" title="${bid.company}">${bid.company}</div>
        ${bid.ip ? `<div class="bid-ip-badge"><i class="ph-pulse"></i> ${bid.ip}</div>` : ''}
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
}

export function renderPriceComparisonChart(containerId, history) {
  const container = document.getElementById(containerId);
  if (!container || !history || history.length === 0) return;

  const maxAmt = Math.max(...history.map(h => h.amount));

  let html = `
    <div class="price-chart-wrap">
      <div class="price-chart-legend">
        <span class="leg-item current"><span class="box"></span> Current Tender Estimate</span>
        <span class="leg-item hist"><span class="box"></span> Historical Procurements</span>
        <span class="leg-item benchmark"><span class="box"></span> Avg Industry Benchmark</span>
      </div>
      <div class="price-bars">
  `;

  history.forEach(item => {
    const isCurrent = item.label.includes('Current');
    const isBenchmark = item.label.includes('Benchmark');
    const pct = (item.amount / maxAmt) * 100;

    html += `
      <div class="price-col">
        <div class="price-val">₹${item.amount.toFixed(1)} Cr</div>
        <div class="price-bar-track">
          <div class="price-bar-fill ${isCurrent ? 'current-bar' : (isBenchmark ? 'benchmark-bar' : 'hist-bar')}" style="height:${pct}%;"></div>
        </div>
        <div class="price-label">${item.tender}</div>
        <div class="price-sublabel">${item.year}</div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
}

export function renderCollusionGraph(containerId, graphData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!graphData || !graphData.nodes || graphData.nodes.length === 0) {
    container.innerHTML = `<div class="empty-note">No collusion network indicators detected for this tender.</div>`;
    return;
  }

  // Render SVG interactive node network
  const width = container.clientWidth || 650;
  const height = 320;
  const centerX = width / 2;
  const centerY = height / 2;

  // Simple deterministic radial placement for demonstration clarity
  const nodeCoords = {};
  const total = graphData.nodes.length;
  
  graphData.nodes.forEach((node, i) => {
    const angle = (i / total) * 2 * Math.PI - (Math.PI / 2);
    const radius = node.type === 'vendor' ? 120 : (node.type === 'director' ? 70 : 130);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    nodeCoords[node.id] = { x, y, ...node };
  });

  let svg = `
    <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" class="collusion-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9aa7b8"/>
        </marker>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.15"/>
        </filter>
      </defs>
  `;

  // Draw Links
  graphData.links.forEach(link => {
    const source = nodeCoords[link.source];
    const target = nodeCoords[link.target];
    if (source && target) {
      const midX = (source.x + target.x) / 2;
      const midY = (source.y + target.y) / 2;
      svg += `
        <line x1="${source.x}" y1="${source.y}" x2="${target.x}" y2="${target.y}" 
              stroke="#a01e1e" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#arrow)" />
        <rect x="${midX - 55}" y="${midY - 10}" width="110" height="18" rx="3" fill="#ffffff" stroke="#cdd5df" opacity="0.95"/>
        <text x="${midX}" y="${midY + 2}" font-size="10" font-family="sans-serif" fill="#a01e1e" text-anchor="middle" font-weight="600">${link.relation}</text>
      `;
    }
  });

  // Draw Nodes
  Object.values(nodeCoords).forEach(node => {
    const icon = node.type === 'vendor' ? '🏢' : (node.type === 'director' ? '👤' : (node.type === 'tech' ? '💻' : '📍'));
    svg += `
      <g class="graph-node-group" transform="translate(${node.x},${node.y})" filter="url(#shadow)">
        <circle r="24" fill="${node.color}" stroke="#ffffff" stroke-width="3" />
        <text y="5" font-size="16" text-anchor="middle" fill="#ffffff">${icon}</text>
        <rect x="-70" y="28" width="140" height="20" rx="3" fill="#081f3d" opacity="0.9"/>
        <text x="0" y="42" font-size="11" font-weight="700" font-family="sans-serif" fill="#ffffff" text-anchor="middle">${node.label}</text>
      </g>
    `;
  });

  svg += `</svg>`;

  container.innerHTML = `
    <div class="graph-wrapper">
      <div class="graph-info-banner">
        <span><strong style="color:var(--high);">ALERT:</strong> Entity Cross-Linkage Detected</span>
        <span>Connected IP Addresses, Directorships & Shared Addresses</span>
      </div>
      ${svg}
    </div>
  `;
}

export function renderRiskScoreGauge(containerId, score) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const color = score >= 75 ? '#a01e1e' : (score >= 50 ? '#e08b1d' : '#0a7a3d');
  const riskClass = score >= 75 ? 'HIGH RISK' : (score >= 50 ? 'MEDIUM RISK' : 'LOW RISK');

  container.innerHTML = `
    <div class="gauge-card">
      <div class="gauge-ring">
        <svg viewBox="0 0 100 100" class="gauge-svg">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#eef1f5" stroke-width="10" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="${color}" stroke-width="10"
                  stroke-dasharray="${(score / 100) * 264} 264" stroke-dashoffset="0"
                  transform="rotate(-90 50 50)" stroke-linecap="round" />
        </svg>
        <div class="gauge-val-box">
          <span class="score-num" style="color:${color};">${score}</span>
          <span class="score-max">/100</span>
        </div>
      </div>
      <div class="gauge-details">
        <div class="risk-title" style="color:${color};">${riskClass}</div>
        <div class="risk-desc">Computed by SATARK Risk Analysis Engine v2.4</div>
      </div>
    </div>
  `;
}
