/**
 * Babu Cyber Portfolio - Main Application Logic
 * Implements telemetry, interactive project demos, routing, filters, and matrix animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTelemetryClock();
  initMetricsSimulation();
  initRouting();
  initSkillsFilter();
  initModals();
  initContactForm();
  initClipboardButtons();
  initControlBarButtons();
  initMatrixCanvas();
});

/* -------------------------------------------------------------
   TELEMETRY & SYSTEM STATUS
---------------------------------------------------------------- */
function initTelemetryClock() {
  const clockEl = document.getElementById('utcClock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');
    clockEl.textContent = `${utcHours}:${utcMinutes}:${utcSeconds} UTC`;
  }
  update();
  setInterval(update, 1000);
}

function initMetricsSimulation() {
  const cpuEl = document.getElementById('cpuMetric');
  const ramEl = document.getElementById('ramMetric');
  const pingEl = document.getElementById('pingMetric');

  setInterval(() => {
    if (cpuEl) {
      const cpu = (Math.random() * 8 + 12).toFixed(1);
      cpuEl.textContent = `${cpu}%`;
    }
    if (ramEl) {
      const ram = (Math.random() * 0.2 + 1.4).toFixed(2);
      ramEl.textContent = `${ram} GB`;
    }
    if (pingEl) {
      const ping = Math.floor(Math.random() * 4 + 14);
      pingEl.textContent = `${ping}ms`;
    }
  }, 3000);
}

/* -------------------------------------------------------------
   ROUTING & VIEW MANAGEMENT
---------------------------------------------------------------- */
function initRouting() {
  const navLinks = document.querySelectorAll('.nav-link, .nav-action-route');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('data-view');
      if (target) {
        e.preventDefault();
        window.switchView(target);
        if (window.cyberAudio) window.cyberAudio.playClick();
      }
    });
  });

  // Handle URL Hash navigation (e.g., #projects, #about)
  function handleHash() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const defaultView = document.body.getAttribute('data-default-view') || 'home';
    const validViews = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    if (validViews.includes(hash)) {
      window.switchView(hash, false);
    } else {
      window.switchView(defaultView, false);
    }
  }

  window.addEventListener('hashchange', handleHash);
  if (window.location.hash) {
    handleHash();
  }

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      if (window.cyberAudio) window.cyberAudio.playClick();
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

window.switchView = function(viewId, updateHistory = true) {
  const sections = document.querySelectorAll('.view-section');
  const navLinks = document.querySelectorAll('.nav-link');

  sections.forEach(sec => {
    if (sec.id === `view-${viewId}`) {
      sec.classList.add('active');
    } else {
      sec.classList.remove('active');
    }
  });

  navLinks.forEach(link => {
    if (link.getAttribute('data-view') === viewId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  if (updateHistory) {
    window.location.hash = viewId;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* -------------------------------------------------------------
   SKILLS BENTO FILTERING
---------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      if (window.cyberAudio) window.cyberAudio.playClick();
    });
  });
}

/* -------------------------------------------------------------
   INTERACTIVE DEMOS MODAL SYSTEM
---------------------------------------------------------------- */
function initModals() {
  const modalOverlay = document.getElementById('demoModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!modalOverlay) return;

  closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    if (window.cyberAudio) window.cyberAudio.playClick();
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  // Attach triggers
  const demoButtons = document.querySelectorAll('.demo-trigger-btn');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const demoType = btn.getAttribute('data-demo');
      openDemoModal(demoType);
      if (window.cyberAudio) window.cyberAudio.playAccessGranted();
    });
  });

  function openDemoModal(demoType) {
    if (demoType === 'vaultdrop') {
      modalTitle.innerHTML = `<span class="icon">🔒</span> VaultDrop — Live Web Crypto AES-256 Simulation`;
      modalBody.innerHTML = `
        <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1rem;">
          Simulate client-side zero-knowledge encryption using the browser's native <code style="color:var(--accent-green)">Web Crypto API</code> before secure dispatch to MinIO/PostgreSQL.
        </div>
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <label style="font-size:0.8rem; color:var(--accent-cyan);">Secret Payload to Encrypt:</label>
          <input type="text" id="cryptoInput" value="Confidential RVCE Research Key #4092" class="cyber-input" />
          
          <div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
            <button id="btnEncrypt" class="cyber-btn cyber-btn-primary" style="padding:0.4rem 1rem; font-size:0.8rem;">
              ⚡ Encrypt (AES-256-GCM)
            </button>
            <button id="btnDecrypt" class="cyber-btn cyber-btn-secondary" style="padding:0.4rem 1rem; font-size:0.8rem;">
              🔓 Decrypt Payload
            </button>
          </div>

          <div style="margin-top:1rem; background:rgba(0,0,0,0.5); padding:1rem; border-radius:4px; border:1px solid rgba(255,255,255,0.08);">
            <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">INITIALIZATION VECTOR (IV) & CIPHERTEXT:</div>
            <div id="cryptoOutput" style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-green); word-break:break-all;">
              Ready for client-side encryption...
            </div>
          </div>
        </div>
      `;

      let simulatedCipher = '';
      let simulatedIV = '';
      const cryptoInput = document.getElementById('cryptoInput');
      const cryptoOutput = document.getElementById('cryptoOutput');
      const btnEncrypt = document.getElementById('btnEncrypt');
      const btnDecrypt = document.getElementById('btnDecrypt');

      btnEncrypt.addEventListener('click', () => {
        const val = cryptoInput.value || 'Default Secret';
        simulatedIV = Array.from(crypto.getRandomValues(new Uint8Array(12)))
          .map(b => b.toString(16).padStart(2, '0')).join('');
        const fakeCipher = Array.from(val).map(c => (c.charCodeAt(0) ^ 0x5f).toString(16).padStart(2, '0')).join('');
        simulatedCipher = `${simulatedIV}::${fakeCipher}::AUTH_TAG_9A1F`;
        cryptoOutput.innerHTML = `<span style="color:var(--accent-cyan);">[CIPHERTEXT]:</span> ${simulatedCipher}`;
        if (window.cyberAudio) window.cyberAudio.playSuccess();
      });

      btnDecrypt.addEventListener('click', () => {
        if (!simulatedCipher) {
          cryptoOutput.textContent = 'Please encrypt a message first!';
          return;
        }
        cryptoOutput.innerHTML = `<span style="color:var(--accent-green);">[DECRYPTED PLAINTEXT]:</span> ${cryptoInput.value} <span style="color:var(--text-muted);">(Integrity Verified ✅)</span>`;
        if (window.cyberAudio) window.cyberAudio.playSuccess();
      });

    } else if (demoType === 'dsa') {
      modalTitle.innerHTML = `<span class="icon">📊</span> DSA Visualizer — Bubble Sort Micro-Engine`;
      modalBody.innerHTML = `
        <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1rem;">
          Micro-demonstration of algorithmic step execution inspired by the JavaFX DSA Visualizer.
        </div>
        <div id="sortContainer" style="display:flex; align-items:flex-end; justify-content:center; gap:8px; height:130px; background:rgba(0,0,0,0.4); padding:10px; border-radius:4px; border:1px solid rgba(255,255,255,0.08);">
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem;">
          <div style="display:flex; gap:0.5rem;">
            <button id="btnRunSort" class="cyber-btn cyber-btn-primary" style="padding:0.4rem 1rem; font-size:0.8rem;">
              ▶ Run Bubble Sort
            </button>
            <button id="btnResetSort" class="cyber-btn cyber-btn-secondary" style="padding:0.4rem 1rem; font-size:0.8rem;">
              ↺ Shuffle Array
            </button>
          </div>
          <div id="sortStatus" style="font-size:0.8rem; color:var(--accent-cyan); font-family:var(--font-mono);">
            Status: Ready
          </div>
        </div>
      `;

      let arr = [65, 25, 88, 12, 45, 92, 33, 50];
      const sortContainer = document.getElementById('sortContainer');
      const sortStatus = document.getElementById('sortStatus');
      const btnRunSort = document.getElementById('btnRunSort');
      const btnResetSort = document.getElementById('btnResetSort');

      function renderBars(activeIndices = [], sortedIndices = []) {
        sortContainer.innerHTML = '';
        arr.forEach((val, idx) => {
          const bar = document.createElement('div');
          bar.style.height = `${val}%`;
          bar.style.width = '24px';
          bar.style.display = 'flex';
          bar.style.alignItems = 'flex-end';
          bar.style.justifyContent = 'center';
          bar.style.fontSize = '10px';
          bar.style.color = '#000';
          bar.style.fontWeight = 'bold';
          bar.style.borderRadius = '2px 2px 0 0';
          bar.style.transition = 'height 0.2s ease, background 0.2s';
          bar.textContent = val;

          if (sortedIndices.includes(idx)) {
            bar.style.background = 'var(--accent-green)';
          } else if (activeIndices.includes(idx)) {
            bar.style.background = 'var(--accent-cyan)';
          } else {
            bar.style.background = 'rgba(255,255,255,0.3)';
          }
          sortContainer.appendChild(bar);
        });
      }

      renderBars();

      btnResetSort.addEventListener('click', () => {
        arr = arr.sort(() => Math.random() - 0.5);
        renderBars();
        sortStatus.textContent = 'Status: Shuffled';
        if (window.cyberAudio) window.cyberAudio.playClick();
      });

      let sorting = false;
      btnRunSort.addEventListener('click', async () => {
        if (sorting) return;
        sorting = true;
        btnRunSort.disabled = true;
        sortStatus.textContent = 'Status: Sorting...';

        const len = arr.length;
        const sorted = [];
        for (let i = 0; i < len; i++) {
          for (let j = 0; j < len - i - 1; j++) {
            renderBars([j, j + 1], sorted);
            if (window.cyberAudio) window.cyberAudio.playKey();
            await new Promise(r => setTimeout(r, 180));

            if (arr[j] > arr[j + 1]) {
              const temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp;
              renderBars([j, j + 1], sorted);
              await new Promise(r => setTimeout(r, 180));
            }
          }
          sorted.push(len - i - 1);
        }
        renderBars([], Array.from({ length: len }, (_, i) => i));
        sortStatus.textContent = 'Status: Sorted in O(N²)';
        sorting = false;
        btnRunSort.disabled = false;
        if (window.cyberAudio) window.cyberAudio.playSuccess();
      });

    } else if (demoType === 'pychat') {
      modalTitle.innerHTML = `<span class="icon">💬</span> PyChat — Real-Time WebSocket Prototype`;
      modalBody.innerHTML = `
        <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.75rem;">
          Simulation of client-server persistent messaging built on FastAPI & SQLite.
        </div>
        <div id="chatLog" style="height:150px; overflow-y:auto; background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.08); padding:0.75rem; border-radius:4px; font-size:0.8rem; display:flex; flex-direction:column; gap:6px;">
          <div style="color:var(--text-muted); font-size:0.72rem;">[SYS]: Connection authenticated via JWT token.</div>
          <div style="color:var(--accent-cyan);"><span style="color:var(--accent-green);">Babu:</span> Welcome to the real-time chat demo!</div>
        </div>
        <div style="display:flex; gap:0.5rem; margin-top:0.75rem;">
          <input type="text" id="chatInput" placeholder="Send broadcast message..." class="cyber-input" style="flex:1;" />
          <button id="btnSendChat" class="cyber-btn cyber-btn-primary" style="padding:0.4rem 1rem; font-size:0.8rem;">Send</button>
        </div>
      `;

      const chatInput = document.getElementById('chatInput');
      const chatLog = document.getElementById('chatLog');
      const btnSendChat = document.getElementById('btnSendChat');

      function sendMsg() {
        const text = chatInput.value.trim();
        if (!text) return;
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = `<span style="color:var(--accent-amber);">Guest:</span> ${escapeHTML(text)}`;
        chatLog.appendChild(msgDiv);
        chatInput.value = '';
        chatLog.scrollTop = chatLog.scrollHeight;
        if (window.cyberAudio) window.cyberAudio.playKey();

        // Automated bot response simulation
        setTimeout(() => {
          const reply = document.createElement('div');
          reply.innerHTML = `<span style="color:var(--accent-green);">Server Bot:</span> Message persisted to SQLite DB. Broadcasted to peers.`;
          chatLog.appendChild(reply);
          chatLog.scrollTop = chatLog.scrollHeight;
          if (window.cyberAudio) window.cyberAudio.playSuccess();
        }, 600);
      }

      btnSendChat.addEventListener('click', sendMsg);
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMsg();
      });

    } else if (demoType === 'ecoroute') {
      modalTitle.innerHTML = `<span class="icon">🌿</span> Bangalore Eco-Route Suggester`;
      modalBody.innerHTML = `
        <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1rem;">
          Analyzes traffic congestion indices and PM2.5 AQI levels across Bengaluru sectors using Scikit-Learn models.
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div>
            <label style="font-size:0.75rem; color:var(--accent-cyan);">Origin Sector:</label>
            <select class="cyber-input" style="width:100%; margin-top:4px;">
              <option>RVCE / Mysuru Road</option>
              <option>Silk Board / Electronic City</option>
              <option>Indiranagar / MG Road</option>
            </select>
          </div>
          <div>
            <label style="font-size:0.75rem; color:var(--accent-cyan);">Destination Sector:</label>
            <select class="cyber-input" style="width:100%; margin-top:4px;">
              <option>Koramangala 5th Block</option>
              <option>Whitefield Tech Park</option>
              <option>Hebbal Outer Ring Road</option>
            </select>
          </div>
        </div>
        <div style="margin-top:1rem; padding:0.75rem; background:rgba(0,255,157,0.06); border:1px solid var(--accent-green); border-radius:4px;">
          <div style="font-size:0.8rem; color:var(--accent-green); font-weight:bold;">🌿 Recommended Eco-Path: Sector B-14 Corridor</div>
          <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:4px;">
            Estimated Air Quality Index: <strong>72 (Moderate)</strong> vs Standard Route: <strong>148 (Unhealthy)</strong>. Emission Reduction: <strong>34.2%</strong>.
          </div>
        </div>
      `;
    }

    modalOverlay.classList.add('active');
  }
}

/* -------------------------------------------------------------
   CONTACT FORM & TRANSMISSION SIMULATION
---------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('transmissionForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const msgInput = document.getElementById('contactMessage');
    const submitBtn = document.getElementById('btnSubmitTransmission');

    if (!nameInput.value || !emailInput.value || !msgInput.value) {
      showToast('⚠️ Please fill out all transmission fields.', 'err');
      if (window.cyberAudio) window.cyberAudio.playError();
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>⏳ Encrypting & Dispatching...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      nameInput.value = '';
      emailInput.value = '';
      msgInput.value = '';

      const checksum = Math.random().toString(36).substring(2, 10).toUpperCase();
      showToast(`Transmission dispatched to Babu! [CRC32: ${checksum}]`);
      if (window.cyberAudio) window.cyberAudio.playSuccess();
    }, 1200);
  });
}

/* -------------------------------------------------------------
   CLIPBOARD & TOAST NOTIFICATIONS
---------------------------------------------------------------- */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const copyVal = btn.getAttribute('data-copy');
      if (copyVal) {
        navigator.clipboard.writeText(copyVal).then(() => {
          showToast(`Copied to clipboard: "${copyVal}"`);
          if (window.cyberAudio) window.cyberAudio.playClick();
        }).catch(() => {
          showToast(`Value: ${copyVal}`);
        });
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('cyberToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cyberToast';
    toast.className = 'cyber-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span style="color:var(--accent-green);">[SYS]</span> ${message}`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* -------------------------------------------------------------
   CONTROL BAR (AUDIO, SCANLINES, THEME TOGGLES)
---------------------------------------------------------------- */
function initControlBarButtons() {
  const audioToggle = document.getElementById('audioToggleBtn');
  const scanToggle = document.getElementById('scanlineToggleBtn');
  const themeToggle = document.getElementById('themeToggleBtn');
  const scanlinesEl = document.getElementById('scanlinesOverlay');

  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      const isMuted = window.cyberAudio.toggleMute();
      audioToggle.innerHTML = isMuted ? `🔇 Audio: OFF` : `🔊 Audio: ON`;
      audioToggle.classList.toggle('active', !isMuted);
      showToast(isMuted ? 'Synthesizer FX Muted' : 'Synthesizer FX Enabled');
    });
  }

  if (scanToggle && scanlinesEl) {
    scanToggle.addEventListener('click', () => {
      scanlinesEl.classList.toggle('off');
      const isOff = scanlinesEl.classList.contains('off');
      scanToggle.classList.toggle('active', !isOff);
      scanToggle.textContent = isOff ? `📺 CRT: OFF` : `📺 CRT: ON`;
      if (window.cyberAudio) window.cyberAudio.playClick();
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('alt-theme');
      const isAlt = document.body.classList.contains('alt-theme');
      themeToggle.textContent = isAlt ? `🎨 HUD: Cyan` : `🎨 HUD: Emerald`;
      if (window.cyberAudio) window.cyberAudio.playClick();
    });
  }
}

/* -------------------------------------------------------------
   MATRIX CANVAS RAIN EFFECT
---------------------------------------------------------------- */
function initMatrixCanvas() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*<>{}[]~=+';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array.from({ length: columns }, () => Math.random() * -50);
  let active = false;

  window.triggerMatrixEffect = function() {
    active = !active;
    canvas.style.display = active ? 'block' : 'none';
    if (active) {
      showToast('Matrix simulation online. Run "matrix" in CLI to toggle off.');
    }
  };

  function draw() {
    if (!active) {
      requestAnimationFrame(draw);
      return;
    }
    ctx.fillStyle = 'rgba(7, 10, 15, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff9d';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  draw();
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
