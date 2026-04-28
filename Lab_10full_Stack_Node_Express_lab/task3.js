const express = require('express');
const app = express();
const port = 3000;

// PROFESSIONAL LAYOUT ENGINE (Updated for Task 3)
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
                font-family: 'Inter', system-ui, sans-serif;
                background-color: var(--bg);
                color: var(--text);
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }
            nav {
                background: rgba(30, 41, 59, 0.8);
                backdrop-filter: blur(10px);
                padding: 1rem 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #334155;
            }
            nav .logo { font-weight: 800; font-size: 1.5rem; color: var(--primary); }
            main {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 2rem;
            }
            .user-card {
                background: var(--card-bg);
                padding: 4rem 3rem;
                border-radius: 24px;
                text-align: center;
                width: 100%;
                max-width: 500px;
                border: 1px solid #334155;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
            .avatar {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, var(--primary), var(--accent));
                border-radius: 50%;
                margin: 0 auto 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                font-weight: bold;
                color: white;
            }
            h1 { font-size: 2.5rem; margin: 0; color: var(--text); }
            p { color: var(--text-muted); font-size: 1.1rem; margin-top: 10px; }
            .badge {
                display: inline-block;
                margin-top: 20px;
                padding: 5px 15px;
                background: rgba(56, 189, 248, 0.1);
                color: var(--primary);
                border-radius: 20px;
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
        </style>
    </head>
    <body>
        <nav>
            <div class="logo">DevPortal</div>
        </nav>

        <main>
            <div class="user-card">
                <div class="avatar">${heading.charAt(0)}</div>
                <h1>Hello, ${heading}!</h1>
                <p>${content}</p>
                <div class="badge">Verified Student</div>
            </div>
        </main>
    </body>
    </html>
    `;
};

// Task 3: Dynamic Route
// The ":name" acts as a placeholder for any string entered in the URL
app.get('/user/:name', (req, res) => {
    const userName = req.params.name;
    
    // Capitalize the first letter for a cleaner look
    const capitalizedName = userName.charAt(0).toUpperCase() + userName.slice(1);
    
    res.send(renderPage(
        `User: ${capitalizedName}`, 
        capitalizedName, 
        "Welcome back to your personalized dashboard. Your Node.js environment is configured and ready."
    ));
});

app.listen(port, () => {
    console.log(`Task 3 running at http://localhost:${port}/user/Ali`);
});