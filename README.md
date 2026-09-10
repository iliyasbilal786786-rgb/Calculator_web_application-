# Calculator App

A simple, modern, responsive calculator built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no backend, no dependencies.

## Features
- Addition, subtraction, multiplication, division, percentage
- Decimal numbers, positive/negative toggle
- Clear (AC) and backspace
- Continuous (chained) calculations
- Division-by-zero and invalid-input handling
- Full keyboard support (0–9, + - * /, Enter, Backspace, Escape, %, .)
- Dark/light mode toggle (saved in local storage)
- Responsive layout for desktop and mobile

## Project Structure
```
calculator-app/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run Locally
Just open `index.html` in any web browser. No build step or server required.

## Deploy on Render (Static Site) — Free

1. **Create a GitHub repository** and push these files (`index.html`, `style.css`, `script.js`, `README.md`) to it.
2. **Go to** [render.com](https://render.com) and sign in / sign up.
3. Click **New +** → **Static Site**.
4. **Connect your GitHub repository** containing this project.
5. **Build Command:** leave blank — no build step is required (plain static files).
6. **Publish Directory:** `.` (the root of the repo, since `index.html` is at the top level).
7. Click **Create Static Site**. Render will deploy automatically.
8. Once deployed, Render provides a live URL like:
   `https://your-app-name.onrender.com`
   Open it in your browser to use the calculator. Any future push to the connected branch will auto-redeploy.

## How It Works
- **index.html** defines the display and button layout.
- **style.css** handles the responsive grid layout, styling, and dark/light theme variables.
- **script.js** manages calculator state (current value, previous value, pending operator) and updates the display on every button click or key press. Calculations are done with plain arithmetic (no `eval()`), and errors (like division by zero) are caught and shown as "Error" on the display.
