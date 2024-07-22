// HTML Element References
const startBtn = document.getElementById('start-btn');
const conversationEl = document.getElementById('conversation');
const containerEl = document.querySelector('.container');

// Create custom cursor element
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// Update cursor position on mouse move
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Add glow effect on mouse down
document.addEventListener('mousedown', () => {
    cursor.classList.add('cursor-glow');
});

// Remove glow effect on mouse up
document.addEventListener('mouseup', () => {
    cursor.classList.remove('cursor-glow');
});

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Speech Synthesis Setup
const synth = window.speechSynthesis;

// Start speech recognition when the start button is clicked
startBtn.addEventListener('click', () => {
    recognition.start();
});

// Handle the result of the speech recognition
recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript.toLowerCase().trim();
    appendMessage(`🗣️ You: ${speechResult}`, 'user');
    respondToSpeech(speechResult);
};

// Stop recognition when the user stops speaking
recognition.onspeechend = () => {
    recognition.stop();
};

// Respond to the recognized speech
function respondToSpeech(message) {
    getResponse(message).then(response => {
        appendMessage(`🤖 Bot: ${response}`, 'bot');
        speakResponse(response);
    });
}

// Get a response based on the user's message
async function getResponse(message) {
    const responses = {
        hello: 'Hello! 😊 How can I assist you today?',
        'how are you': 'I am just a bunch of code, but I am functioning as expected! 😃',
        'what is your name': 'I am the AI assistant of AI Cyber Web. 🤖',
        'tell me a joke': getJoke(),
        'what can you do': 'I can help you with various tasks, answer your questions, chat with you, and even play games! 🎮',
        'who created you': 'I was created by a team of developers at AI Cyber Web. 👩‍💻👨‍💻',
        'what is the meaning of life': 'The meaning of life is a deeply philosophical question. What do you think? 🤔',
        'how old are you': 'I am as old as the code that runs me, but I am always learning and updating! 🕰️',
        'can you help me': 'Of course! What do you need help with? 😊',
        'thank you': 'You’re welcome! 🙌',
        'goodbye': 'Goodbye! Have a great day! 👋',
        'what is your favorite color': 'I like all the colors of the spectrum! 🌈',
        'do you have feelings': 'I don’t have feelings, but I am here to help you! 😊',
        'tell me something interesting': getRandomFact(),
        'what is the capital of france': 'The capital of France is Paris. 🗼',
        'who is the president of the usa': 'The President of the USA is Joe Biden. 🇺🇸',
        'what is 2 + 2': '2 + 2 equals 4. ✖️',
        'do you like pizza': 'I don’t eat, but I hear pizza is delicious! 🍕',
        'what time is it': new Date().toLocaleTimeString(),
        'what is today’s date': new Date().toLocaleDateString(),
        'open the pod bay doors': 'I’m sorry, I’m afraid I can’t do that. 😅',
        'are you intelligent': 'I try my best to be helpful and knowledgeable! 💡',
        'tell me a secret': 'I don’t have secrets, but I can tell you a fun fact! 🎉',
    };
    return responses[message] || 'Sorry, I didn’t understand that. Can you please rephrase? 😕';
}

// Append a message to the conversation
function appendMessage(message, sender) {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${sender}`;
    messageEl.innerHTML = `<p>${message}</p>`;
    conversationEl.appendChild(messageEl);
    conversationEl.scrollTop = conversationEl.scrollHeight;
}

// Speak the response using speech synthesis
function speakResponse(response) {
    const utterance = new SpeechSynthesisUtterance(response);
    synth.speak(utterance);
}

// Get a random joke
function getJoke() {
    const jokes = [
        'Why don’t scientists trust atoms? Because they make up everything! 😂',
        'Why did the scarecrow win an award? Because he was outstanding in his field! 🌾',
        'Why don’t skeletons fight each other? They don’t have the guts. 💀',
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}

// Get a random fact
function getRandomFact() {
    const facts = [
        'Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible. 🍯',
        'Did you know? The shortest war in history lasted only 38 minutes. It was between Britain and Zanzibar on August 27, 1896. ⏱️',
        'Did you know? There are more possible iterations of a game of chess than there are atoms in the known universe. ♟️',
    ];
    return facts[Math.floor(Math.random() * facts.length)];
}

// Add hover effects to the start button
startBtn.addEventListener('mouseover', () => {
    startBtn.style.boxShadow = '0 0 20px #0ff, 0 0 30px #0ff';
});

startBtn.addEventListener('mouseout', () => {
    startBtn.style.boxShadow = 'none';
});

// Add hover effects to the container
containerEl.addEventListener('mouseover', () => {
    containerEl.style.transform = 'scale(1.02)';
});

containerEl.addEventListener('mouseout', () => {
    containerEl.style.transform = 'scale(1)';
});

// Add hover effects to the messages
conversationEl.addEventListener('mouseover', (event) => {
    if (event.target.closest('.message')) {
        event.target.closest('.message').style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    }
});

conversationEl.addEventListener('mouseout', (event) => {
    if (event.target.closest('.message')) {
        event.target.closest('.message').style.backgroundColor = 'transparent';
    }
});
