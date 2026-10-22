# ⚡ Cyberpunk Systems Portfolio — Babu S Gouri

[![GitHub repo](https://img.shields.io/badge/GitHub-Babu556--tech%2Fportfolio-10b981?style=for-the-badge&logo=github)](https://github.com/Babu556-tech/portfolio)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-3b82f6?style=for-the-badge)](https://github.com/Babu556-tech/portfolio)
[![Focus](https://img.shields.io/badge/Focus-Systems%20%26%20Security-emerald?style=for-the-badge)](#)
[![Status](https://img.shields.io/badge/Status-Active%20Deployment-00f0ff?style=for-the-badge)](#)

A futuristic, cyberpunk-themed personal portfolio and terminal workstation engineered for **Babu S Gouri**, Computer Science and Engineering student at **RV College of Engineering (RVCE)**, Bengaluru.

Designed around a cyber-security and systems operations HUD aesthetic, this web portfolio combines responsive design with interactive hacking simulations, an embedded CLI terminal, telemetry status monitoring, and synthesized Web Audio FX.

---

## 🖥️ Live Highlights & Features

- **Interactive CLI Terminal (`~` or HUD button)**: Embedded Linux-style hacker terminal with custom command parsing (`help`, `about`, `skills`, `projects`, `contact`, `matrix`, `clear`).
- **Live Telemetry & Status HUD**: Real-time UTC clock with dynamic telemetry metrics (CPU load, memory usage, latency simulation).
- **Matrix Digital Rain Overlay**: Fullscreen Matrix rain canvas simulation toggleable via the CLI command `matrix`.
- **CRT Scanline & Glow Effects**: Authentic retro-futuristic CRT scanline filter and ambient glow lighting with on/off controls.
- **Web Audio FX Synthesis**: Native Web Audio API procedural sound synthesizer producing sci-fi beeps, clicks, and terminal hums without external audio assets.
- **Interactive Project Simulation Modals**:
  - **VaultDrop**: Interactive client-side encryption simulation.
  - **DSA Visualizer**: Step-by-step algorithmic tracing simulation.
  - **PyChat**: Live client-server socket communication demo.
  - **Eco-Route Suggester**: Traffic emission and pollution route modeler.
- **Dual Architecture**: Works seamlessly both as a single-page interactive app (`index.html`) and as standalone modular pages (`about.html`, `skills.html`, `projects.html`, `experience.html`, `contact.html`).

---

## 🗂️ Project Structure

```text
portfolio/
├── index.html          # Main single-page interactive portal & HUD
├── about.html          # Engineering philosophy, background & education
├── skills.html         # Core competencies (Systems, Backend, Security, Tools)
├── projects.html       # Featured project repositories & interactive demos
├── experience.html     # Academic milestones, roles & certifications
├── contact.html        # Secure transmission dispatch & social uplinks
├── css/
│   └── style.css       # Complete cyber-HUD styling, scanlines, animations & themes
├── js/
│   ├── app.js          # Core UI interaction, view navigation, and modal logic
│   ├── terminal.js     # Interactive shell command engine & Matrix canvas
│   └── audio.js        # Procedural Web Audio API sound FX generator
└── README.md           # Repository documentation
```

---

## 🛠️ Tech Stack

- **Markup & Layout**: Semantic HTML5 with accessible metadata and OpenGraph tags
- **Styling**: Vanilla CSS3 (Custom properties / CSS variables, Grid, Flexbox, Keyframe animations, Scanline shaders)
- **Scripting & Engine**: Modern Vanilla JavaScript (ES6+), Canvas API, Web Audio API
- **Zero Heavy Dependencies**: Pure frontend with fast load times and no bloated frameworks

---

## 🚀 Featured Projects Showcased

1. **[VaultDrop](https://github.com/Babu556-tech/VaultDrop)**
   - Secure Information-Sharing Platform
   - *Tech:* Go, Vite, PostgreSQL, MinIO, Web Crypto API (AES-256-GCM)
2. **[DSA Visualizer](https://github.com/Babu556-tech/dsa-visualizer)**
   - Step-by-step algorithm and data structures visualizer
   - *Tech:* Java, JavaFX, Data Structures & Algorithms
3. **PyChat**
   - Real-time client-server socket messaging system with persistent storage
   - *Tech:* Python, FastAPI, WebSockets, SQLite
4. **Bangalore Eco-Route Suggester**
   - Environmental traffic navigation and air-quality index exposure modeler
   - *Tech:* Python, Scikit-learn, Pandas

---

## ⚡ Quick Start / Local Setup

No build step or package manager required. You can run it directly with any local static HTTP server:

### Option 1: VS Code Live Server
1. Clone this repository:
   ```bash
   git clone https://github.com/Babu556-tech/portfolio.git
   cd portfolio
   ```
2. Open with VS Code:
   ```bash
   code .
   ```
3. Right-click on `index.html` and click **"Open with Live Server"**.

### Option 2: Python HTTP Server
```bash
# Python 3.x
python -m http.server 8000
```
Open your browser and navigate to `http://localhost:8000`.

### Option 3: Node.js (npx serve)
```bash
npx serve .
```

---

## ⌨️ CLI Terminal Commands

Inside the portfolio, click **`>_ CLI TERMINAL`** or press the **`~` (tilde)** key to open the interactive console. Try running:

| Command | Action |
| :--- | :--- |
| `help` | Display list of all available terminal commands |
| `projects` | List all featured engineering projects |
| `skills` | Output technical skill inventory |
| `about` | Display background and academic bio |
| `matrix` | Toggle the digital Matrix rain overlay |
| `clear` | Clear the terminal display output |
| `exit` | Close the CLI drawer |

---

## 👤 Author & Uplinks

**Babu S Gouri**  
*Computer Science and Engineering Undergraduate*  
*RV College of Engineering (RVCE), Bengaluru, India*  

- **GitHub**: [@Babu556-tech](https://github.com/Babu556-tech)
- **Repository**: [github.com/Babu556-tech/portfolio](https://github.com/Babu556-tech/portfolio)
- **Location**: Bengaluru, Karnataka, India

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).