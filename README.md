# 🚀 Om Sonawane — Advanced Student Developer Portfolio

[![Live Site](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)](https://omsonawane0250.github.io/)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blue)](index.html)
[![License](https://img.shields.io/badge/License-MIT-purple)](#license)

> A premium, futuristic, and responsive single-page Developer Portfolio engineered for **Om Sonawane**, 3rd Year B.Tech Information Technology student at **Indira College of Engineering and Management, Pune** (Savitribai Phule Pune University).

---

## 🎯 Project Objective

This portfolio was developed as a college practical submission and professional engineering showcase meeting the practical requirement:
> *"Create a website containing your portfolio. Take a domain and web space from a free provider and host your website."*

The website moves beyond basic academic templates to deliver a modern, SaaS-inspired developer aesthetic with dark glassmorphism, responsive architecture, interactive developer tooling, and strict adherence to pure web fundamentals.

---

## ⚡ Technology Stack (Zero-Build Vanilla Architecture)

In accordance with strict project constraints, no frontend frameworks or build tools (such as React, Vue, Angular, Tailwind, Bootstrap, Node runtime, or Express backend) were used for the portfolio site itself.

- **Markup:** Semantic HTML5 with complete ARIA accessibility standards and Open Graph SEO metadata.
- **Styling:** Modern CSS3 featuring CSS Custom Properties (Design Tokens), Glassmorphism backdrop filters, Flexbox, CSS Grid, and responsive clamp typography.
- **Scripting:** Vanilla JavaScript (ES6+) with zero compilation or runtime overhead.
- **Icons & Fonts:** Font Awesome Free CDN & Google Fonts (*Inter*, *Space Grotesk*, *JetBrains Mono*).

---

## 📁 File Structure

```text
omPortfolio/
├── index.html                   # Main semantic HTML5 single-page document
├── style.css                    # Comprehensive CSS3 stylesheet (Dark & Light themes)
├── script.js                    # Vanilla JavaScript logic, controllers & animations
├── README.md                    # Complete project documentation & hosting guide
└── assets/
    ├── icons/
    │   └── favicon.svg          # Modern gradient code-bracket favicon
    ├── images/
    │   ├── pawcare-preview.svg  # High-fidelity SVG mockup for PawCare (Full Stack)
    │   ├── spotify-preview.svg  # High-fidelity SVG mockup for Spotify Clone (Frontend)
    │   ├── newstimes-preview.svg# High-fidelity SVG mockup for News Times AI
    │   └── hero-avatar.svg      # Futuristic developer avatar badge
    └── certificates/
        ├── google-cloud-genai-preview.svg # SmartBridge Google Cloud GenAI certificate
        └── oasis-offer-preview.svg        # Oasis Infobyte official offer letter
```

---

## ✨ Key Features & Interactions

### 1. 🌌 Futuristic Dark Glassmorphism UI
- Deep cosmic slate background (`#070b14`, `#0d1322`) accented with electric blue (`#4f8cff`), ultraviolet (`#8b5cf6`), and cyan (`#38bdf8`) glows.
- Dynamic **Light / Dark Mode** switch with carefully tuned contrasting palettes and persistent storage via `localStorage`.

### 2. ⌨️ Interactive Developer Terminal
- Embedded shell emulator with live command execution (`whoami`, `role`, `skills`, `projects`, `experience`, `education`, `goal`, `contact`, `clear`, `date`).
- Interactive command chips for single-click execution on mobile and desktop.

### 3. 🔍 Command Palette (`Ctrl + K` / `Cmd + K`)
- Spotlight-style modal search with instant section jumping, external profile links, theme toggling, and keyboard navigation (Arrow Up, Down, Enter, Esc).

### 4. 📂 Project Showcase & Modal Viewer
- Filtering tabs for **All**, **Frontend**, **Full Stack**, and **AI** projects.
- In-depth modal dialogs detailing architecture, key features, technology badges, GitHub repository links, and staging status.
  - **PawCare:** Full-stack pet care management platform (Node.js, Express, MongoDB).
  - **Spotify Clone:** Modern frontend audio player interface.
  - **News Times AI:** Real-time news reader powered by News API and OpenAI summaries.

### 5. 📜 Verified Experience & Credentials
- **Google Cloud Generative AI Virtual Internship:** Completed via SmartBridge & SmartInternz (Sep–Oct 2025).
- **Web Development & Designing Internship:** Selected / Offer received from Oasis Infobyte (Commencing Sep 2026).
- High-resolution SVG preview modal for certificates and official offer letters.

### 6. 🌐 Live GitHub API with Graceful Fallback
- Safely queries the public GitHub API (`omsonawane0250`) to display public repositories without exposing private tokens.
- Gracefully falls back to cached verified statistics if offline or rate-limited.

### 7. 📬 Client-Side Validated Contact Form
- Real-time inline field validation (name, email format, message length).
- Dispatches a prefilled `mailto:` message directly to `omsonawane0250@gmail.com`.

### 8. 📄 Smart Resume Download Handler
- Intelligently checks for `assets/Om_Sonawane_Resume.pdf`.
- If the file is not yet deployed, displays a non-breaking toast notification: *"Resume will be available soon."*

---

## 🚀 How to Run Locally

Because this project is built entirely on native web standards, it does not require `npm install` or any build process.

### Method 1: Direct File Launch
Double-click `index.html` in your file explorer to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Method 2: Local Static Server (Optional)
If you prefer running a local HTTP server:

```powershell
# Using Python
python -m http.server 8000

# Using Node (npx)
npx serve .
```
Then visit `http://localhost:8000` in your browser.

---

## 🌐 Free Hosting Guide (College Practical Submission)

You can host this website completely free of cost on any of the following platforms:

### Option 1: GitHub Pages (Recommended)
1. Initialize a Git repository and push this directory to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Om Sonawane portfolio"
   git branch -M main
   git remote add origin https://github.com/omsonawane0250/omsonawane0250.github.io.git
   git push -u origin main
   ```
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your website will be live at: `https://omsonawane0250.github.io/`

### Option 2: Netlify (Drag & Drop)
1. Go to [Netlify](https://www.netlify.com/) and create a free account.
2. In the Netlify dashboard, drag and drop the `omPortfolio` folder into the deploy area.
3. Your site is instantly assigned a free public URL (e.g., `om-sonawane-portfolio.netlify.app`).

### Option 3: Vercel
1. Go to [Vercel](https://vercel.com/) and link your GitHub repository.
2. Deploy as "Other / Static Site" with root directory set to `.`.
3. Your site is live with global CDN edge caching.

---

## 👤 Developer Profile

- **Name:** Om Sonawane
- **Degree:** B.Tech — Information Technology (3rd Year, 5th Semester)
- **Institution:** Indira College of Engineering and Management (ICEM), Pune
- **Location:** Parandwadi, Pune, Maharashtra, India
- **Email:** [omsonawane0250@gmail.com](mailto:omsonawane0250@gmail.com)
- **Phone:** +91 8080559353
- **GitHub:** [@omsonawane0250](https://github.com/omsonawane0250)
- **LinkedIn:** [Om Sonawane](https://www.linkedin.com/in/om-sonawane-aa323b340)
- **LeetCode:** [@om_sonawane_7](https://leetcode.com/u/om_sonawane_7/)

---

## ⚖️ License
This project is open source and available under the [MIT License](LICENSE).
