const express = require('express');
const app = express();
const port = 3000;

// PROFESSIONAL LAYOUT ENGINE
// This function wraps our content in a consistent Shell (Header, Nav, Footer)
const renderPage = (title, heading, content) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} | DevPortal</title>
        <style>
            :root {
                --bg: #0f172a;
                --card-bg: #1e293b;
                --primary: #38bdf8;
                --accent: #818cf8;
                --text: #f1f5f9;
                --text-muted: #94a3b8;
            }
            body {
                margin: 0;
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                background-color: var(--bg);
                color: var(--text);
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }
            /* Navigation Bar */
            nav {
                background: rgba(30, 41, 59, 0.8);
                backdrop-filter: blur(10px);
                padding: 1rem 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #334155;
                position: sticky;
                top: 0;
            }
            nav .logo { font-weight: 800; font-size: 1.5rem; color: var(--primary); }
            nav ul { list-style: none; display: flex; gap: 20px; margin: 0; padding: 0; }
            nav a { text-decoration: none; color: var(--text-muted); font-weight: 500; transition: 0.3s; }
            nav a:hover { color: var(--primary); }
            
            /* Main Content Area */
            main {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 2rem;
            }
            .hero-card {
                background: var(--card-bg);
                padding: 3rem;
                border-radius: 24px;
                text-align: center;
                max-width: 600px;
                border: 1px solid #334155;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
            h1 { font-size: 3rem; margin: 0; background: linear-gradient(to right, var(--primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            p { color: var(--text-muted); font-size: 1.2rem; line-height: 1.6; }
            
            /* Footer */
            footer {
                text-align: center;
                padding: 2rem;
                font-size: 0.9rem;
                color: var(--text-muted);
                border-top: 1px solid #334155;
            }
        </style>
    </head>
    <body>
        <nav>
            <div class="logo">DevPortal</div>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>

        <main>
            <div class="hero-card">
                <h1>${heading}</h1>
                <p>${content}</p>
            </div>
        </main>

        <footer>
            &copy; 2026 Full Stack Lab_10 | Developed by your Student ID
        </footer>
    </body>
    </html>
    `;
};

// Task 2: Define Routes 
app.get('/home', (req, res) => {
    res.send(renderPage("Home", "Welcome Home", "Experience the next generation of web architecture with our Express-powered backend."));
});

app.get('/about', (req, res) => {
    res.send(renderPage("About", "Our Mission", "We leverage non-blocking I/O and asynchronous JavaScript to build scalable web services."));
});

app.get('/contact', (req, res) => {
    res.send(renderPage("Contact", "Get in Touch", "Have questions about Node.js? Reach out to our engineering team anytime."));
});

app.listen(port, () => {
    console.log(`Task 2 Professional Site running at http://localhost:${port}/home`);
});