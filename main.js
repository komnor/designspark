// Establish WebSocket connection
const socket = new WebSocket('ws://localhost:3000');

// Function to broadcast changes to other clients
function broadcastChange(type, content) {
    const message = JSON.stringify({ type, content });
    socket.send(message);
}

// Function to handle incoming messages
socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    if (message.type === 'elementAdded') {
        addElementToCanvas(message.content);
    }
};

// Modify addElement function to broadcast changes
function addElement(type) {
    const element = { type };
    broadcastChange('elementAdded', element);
    addElementToCanvas(element);
}

// Function to add elements to the canvas
function addElementToCanvas(element) {
    const designCanvas = document.getElementById('designCanvas');
    const newElement = document.createElement('div');
    newElement.className = 'draggable';

    if (element.type === 'text') {
        newElement.textContent = 'Sample Text';
    } else if (element.type === 'image') {
        const img = document.createElement('img');
        img.src = 'https://via.placeholder.com/150';
        img.alt = 'Sample Image';
        newElement.appendChild(img);
    }

    designCanvas.appendChild(newElement);
    makeDraggable(newElement);
}

// Function to make elements draggable
function makeDraggable(element) {
    element.setAttribute('draggable', true);
    element.ondragstart = function(event) {
        event.dataTransfer.setData('text/plain', null);
        event.dataTransfer.setDragImage(event.target, 0, 0);
    };
    element.ondragend = function(event) {
        element.style.left = event.pageX + 'px';
        element.style.top = event.pageY + 'px';
    };
}

// Function to submit feedback
function submitFeedback() {
    const feedback = document.getElementById('feedbackInput').value;
    
    // Simulate saving feedback to a project management tool
    const feedbackContainer = document.getElementById('feedbackContainer');
    const feedbackElement = document.createElement('div');
    feedbackElement.className = 'feedback';
    feedbackElement.textContent = feedback;
    
    feedbackContainer.appendChild(feedbackElement);
    document.getElementById('feedbackInput').value = '';
}

// Array to hold versions
let versions = [];

// Function to save the current state of the design canvas
function saveVersion() {
    const designCanvas = document.getElementById('designCanvas').innerHTML;
    const timestamp = new Date().toISOString();
    versions.push({ timestamp, content: designCanvas });
    displayVersions();
}

// Function to display saved versions
function displayVersions() {
    const versionContainer = document.getElementById('versionContainer');
    versionContainer.innerHTML = '';
    versions.forEach((version, index) => {
        const versionElement = document.createElement('div');
        versionElement.className = 'version';
        versionElement.innerHTML = `
            <div>${version.timestamp}</div>
            <button onclick="loadVersion(${index})" class="bg-blue-500 text-white px-4 py-2 rounded">Load</button>
        `;
        versionContainer.appendChild(versionElement);
    });
}

// Function to load a specific version
function loadVersion(index) {
    const designCanvas = document.getElementById('designCanvas');
    designCanvas.innerHTML = versions[index].content;
}

// Initial call to displayVersions to ensure the container is empty at the start
displayVersions();

// Example: AI-Driven Design Ideation
function generateDesignIdeas(userInput) {
    fetch('https://api.example.com/generateIdeas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: userInput })
    })
    .then(response => response.json())
    .then(data => {
        displayDesignIdeas(data.ideas);
    })
    .catch(error => console.error('Error:', error));
}

function displayDesignIdeas(ideas) {
    const ideasContainer = document.getElementById('ideasContainer');
    ideasContainer.innerHTML = '';
    ideas.forEach(idea => {
        const ideaElement = document.createElement('div');
        ideaElement.className = 'idea';
        ideaElement.textContent = idea;
        ideasContainer.appendChild(ideaElement);
    });
}

// Example call to generateDesignIdeas function
generateDesignIdeas('modern web design');
