const express = require('express');
const app = express();
const port = 3000;

// Task 4: Professional HTML Renderer
app.get('/', (req, res) => {
    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Main Portal | Lab 10 Task 4</title>
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
                line-height: 1.6;
            }
            .container {
                max-width: 800px;
                margin: 100px auto;
                padding: 40px;
                background: var(--card-bg);
                border-radius: 24px;
                border: 1px solid #334155;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
            h1 {
                font-size: 3rem;
                margin-bottom: 0.5rem;
                background: linear-gradient(to right, var(--primary), var(--accent));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            p {
                font-size: 1.2rem;
                color: var(--text-muted);
                margin-bottom: 2rem;
            }
            .feature-list {
                list-style: none;
                padding: 0;
            }
            .feature-item {
                display: flex;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                margin: 10px 0;
                padding: 15px 20px;
                border-radius: 12px;
                border: 1px solid #334155;
            }
            .icon {
                color: var(--primary);
                margin-right: 15px;
                font-weight: bold;
            }
            footer {
                margin-top: 30px;
                text-align: center;
                font-size: 0.8rem;
                color: #475569;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>DevPortal Architecture</h1>
            <p>This page is rendered directly by the Express.js server. It demonstrates the ability to serve complex HTML structures, CSS styling, and dynamic content without the need for external static files.</p>
            
            <ul class="feature-list">
                <li class="feature-item"><span class="icon">✓</span> Node.js Runtime Environment</li>
                <li class="feature-item"><span class="icon">✓</span> Express.js Middleware Routing</li>
                <li class="feature-item"><span class="icon">✓</span> Dynamic HTML Generation</li>
                <li class="feature-item"><span class="icon">✓</span> Non-blocking I/O Performance</li>
            </ul>

            <footer>
                Lab 10 Task 4 - Structured HTML Rendering
            </footer>
        </div>
    </body>
    </html>
    `;
    
    res.send(htmlResponse);
});

app.listen(port, () => {
    console.log(`Task 4 is live at http://localhost:${port}`);
});