const express = require('express');
const app = express();
const port = 3000;

// Task 1: Data stored in an array
const students = ["Ali", "Musab", "Hassan", "Tayyab", "Ahmad"];

app.get('/', (req, res) => {
    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Student Directory | DevPortal</title>
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
            .directory-card {
                background: var(--card-bg);
                padding: 2.5rem;
                border-radius: 24px;
                width: 100%;
                max-width: 400px;
                border: 1px solid #334155;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
            h1 { 
                font-size: 2rem; 
                margin-bottom: 1.5rem; 
                text-align: center;
                background: linear-gradient(to right, var(--primary), var(--accent));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .student-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .student-item {
                background: rgba(255, 255, 255, 0.03);
                margin: 8px 0;
                padding: 12px 20px;
                border-radius: 12px;
                border: 1px solid #334155;
                display: flex;
                align-items: center;
                transition: all 0.3s ease;
            }
            .student-item:hover {
                background: rgba(56, 189, 248, 0.1);
                border-color: var(--primary);
                transform: translateX(5px);
            }
            .dot {
                height: 8px;
                width: 8px;
                background-color: var(--primary);
                border-radius: 50%;
                margin-right: 15px;
                box-shadow: 0 0 10px var(--primary);
            }
        </style>
    </head>
    <body>
        <nav>
            <div class="logo">DevPortal</div>
        </nav>

        <main>
            <div class="directory-card">
                <h1>Student List</h1>
                <ul class="student-list">
                    ${students.map(name => `
                        <li class="student-item">
                            <span class="dot"></span>
                            ${name}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </main>
    </body>
    </html>
    `;
    res.send(htmlResponse);
});

app.listen(port, () => {
    console.log(`Task 1 Theme updated at http://localhost:${port}`);
});