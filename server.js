const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

app.post('/generateIdeas', (req, res) => {
    const userInput = req.body.input;
    const ideas = [
        `Idea based on ${userInput} - 1`,
        `Idea based on ${userInput} - 2`,
        `Idea based on ${userInput} - 3`
    ];
    res.json({ ideas });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

