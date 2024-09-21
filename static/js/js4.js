let audioActive = false;
let videoActive = false;
let recognition;
let language = 'en-US'; // Default language

const audioToggle = document.getElementById('audioToggle');
const videoToggle = document.getElementById('videoToggle');
const languageToggle = document.getElementById('languageToggle');
const messageInput = document.getElementById('messageInput');
const welcomeMessage = document.getElementById('welcomeMessage');
const videoElement = document.getElementById('islVideo');
const videoSource = document.getElementById('videoSource');
const videoContainer = document.getElementById('videoContainer');

// Initialize speech recognition
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language;

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        messageInput.value = transcript;
        messageInput.disabled = false; // Enable text input for editing
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error', event);
    };
} else {
    console.warn('Speech recognition not supported');
}

languageToggle.addEventListener('click', () => {
    language = (language === 'en-US') ? 'hi-IN' : 'en-US'; // Toggle between English and Hindi
    languageToggle.textContent = (language === 'en-US') ? '🌐 EN' : '🌐 HI'; // Update button text
    welcomeMessage.textContent = (language === 'en-US') ? 'Welcome! How can I assist you today?' : 'स्वागत है! मैं आपकी किस प्रकार सहायता कर सकता हूँ?'; // Update welcome message
    if (recognition) {
        recognition.lang = language;
    }
});

audioToggle.addEventListener('click', () => {
    audioActive = !audioActive;
    audioToggle.classList.toggle('active', audioActive);
    if (audioActive) {
        startAudioCapture();
    } else {
        stopAudioCapture();
    }
});

videoToggle.addEventListener('click', () => {
    videoActive = !videoActive;
    videoToggle.classList.toggle('active', videoActive);
    if (videoActive) {
        startVideoCapture();
    } else {
        stopVideoCapture();
    }
});

function startAudioCapture() {
    if (recognition) {
        recognition.start();
        messageInput.disabled = true; // Disable input until audio is processed
    }
}

function stopAudioCapture() {
    if (recognition) {
        recognition.stop();
    }
}

function startVideoCapture() {
    // Example video functionality - you can replace with actual video logic
    videoSource.src = "path_to_your_ISL_video.mp4";
    videoElement.load();
    videoContainer.style.display = 'block';
}

function stopVideoCapture() {
    videoContainer.style.display = 'none';
    videoElement.pause();
    videoElement.currentTime = 0;
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        appendMessage('user', message);
        messageInput.value = '';
        // Simulate bot response based on language
        const botResponse = (language === 'en-US') ? 'Your message has been received.' : 'आपका संदेश प्राप्त कर लिया गया है।';
        appendMessage('bot', botResponse);
    }
}

function appendMessage(sender, text) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    const messageText = document.createElement('p');
    messageText.textContent = text;
    messageDiv.appendChild(messageText);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Handle Enter key press
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { // Prevent sending on Shift+Enter
        event.preventDefault();
        sendMessage();
    }
});