const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/generateIdeas', (req, res) => {
    const userInput = req.body.input;
    // Mock AI response
    const ideas = [
        `Idea based on ${userInput} - 1`,
        `Idea based on ${userInput} - 2`,
        `Idea based on ${userInput} - 3`
    ];
    res.json({ ideas });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
