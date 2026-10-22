/**
 * Interactive Hacker CLI Terminal
 * Handles shell commands, auto-completion, command history, and dynamic system output.
 */

class CyberTerminal {
  constructor() {
    this.history = [];
    this.historyIndex = -1;
    this.isOpen = false;
    this.commands = {
      help: this.cmdHelp.bind(this),
      about: this.cmdAbout.bind(this),
      'cat about.txt': this.cmdAbout.bind(this),
      skills: this.cmdSkills.bind(this),
      projects: this.cmdProjects.bind(this),
      exp: this.cmdExperience.bind(this),
      experience: this.cmdExperience.bind(this),
      contact: this.cmdContact.bind(this),
      whoami: this.cmdWhoami.bind(this),
      date: this.cmdDate.bind(this),
      clear: this.cmdClear.bind(this),
      cls: this.cmdClear.bind(this),
      sudo: this.cmdSudo.bind(this),
      matrix: this.cmdMatrix.bind(this),
      audio: this.cmdAudio.bind(this),
      theme: this.cmdTheme.bind(this),
      goto: this.cmdGoto.bind(this),
      exit: this.toggle.bind(this)
    };

    this.initDOM();
  }

  initDOM() {
    this.drawer = document.getElementById('terminalDrawer');
    this.screen = document.getElementById('terminalScreen');
    this.input = document.getElementById('terminalInput');
    this.toggleBtn = document.getElementById('terminalToggleBtn');
    this.closeBtn = document.getElementById('termCloseBtn');
    this.clearBtn = document.getElementById('termClearBtn');

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => {
        this.toggle();
        if (window.cyberAudio) window.cyberAudio.playClick();
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => {
        this.close();
        if (window.cyberAudio) window.cyberAudio.playClick();
      });
    }

    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => {
        this.cmdClear();
        if (window.cyberAudio) window.cyberAudio.playClick();
      });
    }

    if (this.input) {
      this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    // Keyboard shortcut '~' or '`' to toggle terminal
    window.addEventListener('keydown', (e) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.drawer) {
      this.drawer.classList.toggle('open', this.isOpen);
      if (this.isOpen && this.input) {
        setTimeout(() => this.input.focus(), 150);
      }
    }
  }

  open() {
    this.isOpen = true;
    if (this.drawer) {
      this.drawer.classList.add('open');
      if (this.input) setTimeout(() => this.input.focus(), 150);
    }
  }

  close() {
    this.isOpen = false;
    if (this.drawer) {
      this.drawer.classList.remove('open');
    }
  }

  handleKeyDown(e) {
    if (window.cyberAudio) window.cyberAudio.playKey();

    if (e.key === 'Enter') {
      const rawVal = this.input.value.trim();
      if (rawVal) {
        this.history.push(rawVal);
        this.historyIndex = this.history.length;
        this.executeCommand(rawVal);
      }
      this.input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      this.autoComplete();
    }
  }

  autoComplete() {
    const query = this.input.value.toLowerCase().trim();
    if (!query) return;
    const available = Object.keys(this.commands);
    const matched = available.find(c => c.startsWith(query));
    if (matched) {
      this.input.value = matched;
    }
  }

  executeCommand(cmdStr) {
    this.printPrompt(cmdStr);
    const args = cmdStr.split(' ');
    const primary = args[0].toLowerCase();

    // Check multi-word command like "cat about.txt"
    if (this.commands[cmdStr.toLowerCase()]) {
      this.commands[cmdStr.toLowerCase()](args.slice(1));
      return;
    }

    if (this.commands[primary]) {
      this.commands[primary](args.slice(1));
    } else {
      this.printLine(`Command not found: "${primary}". Type <span class="cyan">help</span> for list of commands.`, 'err');
      if (window.cyberAudio) window.cyberAudio.playError();
    }
    this.scrollToBottom();
  }

  printPrompt(cmdStr) {
    const div = document.createElement('div');
    div.className = 'terminal-entry';
    div.innerHTML = `<span class="prompt-user">guest@babu-node</span>:<span class="green">~</span>$ <span class="white">${this.escapeHTML(cmdStr)}</span>`;
    this.screen.appendChild(div);
  }

  printLine(html, className = '') {
    const p = document.createElement('div');
    p.className = `term-output ${className}`;
    p.innerHTML = html;
    this.screen.appendChild(p);
  }

  scrollToBottom() {
    if (this.screen) {
      this.screen.scrollTop = this.screen.scrollHeight;
    }
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // Commands Implementation
  cmdHelp() {
    const txt = `
<span class="green">AVAILABLE SYSTEM COMMANDS:</span>
  <span class="cyan">about</span>       - Print student profile and background
  <span class="cyan">skills</span>      - Display technical capabilities and stack
  <span class="cyan">projects</span>    - List high-impact security and systems projects
  <span class="cyan">experience</span>  - View hackathon, robotics, and academic logs
  <span class="cyan">contact</span>     - Display communications channels and links
  <span class="cyan">goto &lt;page&gt;</span> - Navigate to [home | about | skills | projects | experience | contact]
  <span class="cyan">theme</span>       - Toggle UI theme (Cyber Green / Electric Cyan)
  <span class="cyan">audio</span>       - Toggle synthesize sound effects [audio on | audio off]
  <span class="cyan">matrix</span>      - Trigger visual matrix breach sequence
  <span class="cyan">whoami</span>      - Display current identity and privileges
  <span class="cyan">date</span>        - Display current system UTC/IST timestamp
  <span class="cyan">clear</span>       - Clear the terminal console buffer
  <span class="cyan">exit</span>        - Close this terminal drawer (or press \`)
`;
    this.printLine(txt);
  }

  cmdAbout() {
    const txt = `
<span class="green">### IDENTITY OVERVIEW ###</span>
<span class="cyan">Name:</span> Babu
<span class="cyan">Education:</span> RV College of Engineering — Computer Science & Engineering (2025–2029)
<span class="cyan">Focus:</span> Software Development, Systems Engineering, Cybersecurity
<span class="cyan">Philosophy:</span> Passionate about understanding software internals, building resilient systems, and solving real-world challenges through code.
`;
    this.printLine(txt);
  }

  cmdSkills() {
    const txt = `
<span class="green">[SKILL MATRIX LOADED]</span>
- <span class="cyan">Languages:</span> C, C++, Python, Java, JavaScript
- <span class="cyan">Frameworks/Tools:</span> FastAPI, JavaFX, SQLite, PostgreSQL, Vite, Git, Linux, Docker, ROS 2
- <span class="cyan">Core CS:</span> DSA, OOP, Operating Systems, DBMS, Networks, Cybersecurity Fundamentals
- <span class="cyan">Domains:</span> ML, Robotics & Embedded, Reverse Engineering, Secure Software
`;
    this.printLine(txt);
  }

  cmdProjects() {
    const txt = `
<span class="green">[DEPLOYED & CONFIRMED PROJECTS]</span>
1. <span class="cyan">VaultDrop</span>: Secure Information-Sharing Platform (AES-256-GCM, Web Crypto, Zero-Knowledge)
   Repo: https://github.com/Babu556-tech/VaultDrop
2. <span class="cyan">DSA Visualizer</span>: Interactive Algorithm Learning (JavaFX, Sorting, Linear Search)
   Repo: https://github.com/Babu556-tech/dsa-visualizer
3. <span class="cyan">PyChat</span>: Real-Time Messaging Application (FastAPI, SQLite, WebSockets)
4. <span class="cyan">Bangalore Eco-Route Suggester</span>: ML route optimization based on traffic & pollution
`;
    this.printLine(txt);
  }

  cmdExperience() {
    const txt = `
<span class="green">[MISSION LOGS & FIELD OPERATIONS]</span>
- <span class="cyan">RVCE Coding Club & CloneFest 2.0:</span> Team VectorX / VaultDrop security architecture
- <span class="cyan">Robotics & Embedded Systems:</span> Line-following robots, PID control, ROS 2 & C++
- <span class="cyan">Academic Innovations:</span> Healthcare accessibility (56 surveys), Compiler Error Assistant, LabelLens
`;
    this.printLine(txt);
  }

  cmdContact() {
    const txt = `
<span class="green">[COMMUNICATION ENDPOINTS]</span>
- <span class="cyan">GitHub:</span> https://github.com/Babu556-tech
- <span class="cyan">Location:</span> Bengaluru, Karnataka, India
- <span class="cyan">Status:</span> Open to SWE Internships, Security Research & Collaborations
`;
    this.printLine(txt);
  }

  cmdWhoami() {
    this.printLine(`<span class="green">guest@babu-portfolio-terminal</span> (Role: Authorized Explorer, SEC_LEVEL: ALPHA)`);
  }

  cmdDate() {
    this.printLine(`<span class="cyan">${new Date().toUTCString()}</span> (System Local: ${new Date().toLocaleString()})`);
  }

  cmdClear() {
    this.screen.innerHTML = '';
  }

  cmdSudo() {
    if (window.cyberAudio) window.cyberAudio.playError();
    this.printLine(`<span class="err">ACCESS DENIED: User guest is not in the sudoers file. Incident reported to Babu.</span>`);
  }

  cmdMatrix() {
    this.printLine(`<span class="green">Waking up the matrix simulation...</span>`);
    if (window.triggerMatrixEffect) {
      window.triggerMatrixEffect();
    }
  }

  cmdAudio(args) {
    const opt = args[0] ? args[0].toLowerCase() : '';
    if (opt === 'off') {
      window.cyberAudio.muted = true;
      this.printLine(`Audio synthesized FX: <span class="amber">DISABLED</span>`);
    } else if (opt === 'on') {
      window.cyberAudio.muted = false;
      this.printLine(`Audio synthesized FX: <span class="green">ENABLED</span>`);
      window.cyberAudio.playSuccess();
    } else {
      const state = window.cyberAudio.toggleMute();
      this.printLine(`Audio synthesized FX: <span class="${state ? 'amber' : 'green'}">${state ? 'DISABLED' : 'ENABLED'}</span>`);
    }
  }

  cmdTheme() {
    document.body.classList.toggle('alt-theme');
    const isAlt = document.body.classList.contains('alt-theme');
    this.printLine(`Theme switched to: <span class="cyan">${isAlt ? 'Electric Cyan HUD' : 'Terminal Emerald'}</span>`);
    if (window.cyberAudio) window.cyberAudio.playSuccess();
  }

  cmdGoto(args) {
    const target = args[0] ? args[0].toLowerCase() : '';
    const valid = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    if (valid.includes(target)) {
      if (window.switchView) {
        window.switchView(target);
        this.printLine(`Navigating interface to: <span class="green">${target.toUpperCase()}</span>`);
        if (window.cyberAudio) window.cyberAudio.playAccessGranted();
      }
    } else {
      this.printLine(`Target view not found. Available views: ${valid.join(', ')}`, 'err');
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.cyberTerminal = new CyberTerminal();
});
