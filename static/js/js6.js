document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    const colorArray = [
        '#FF6F61', '#D3A4A6', '#003366', '#006699',
        '#FF0000', '#FF6F6F', '#FFEB3B', '#FF5722',
        '#E91E63', '#F48FB1', '#FF7E5F', '#FEB47B',
        '#00BFFF', '#FF4500', '#FFD700'
    ];
    let colorIndex = 0;

    function changeBackground() {
        setInterval(() => {
            colorIndex = (colorIndex + 1) % colorArray.length;
            const nextColor = colorArray[colorIndex];
            const nextColor2 = colorArray[(colorIndex + 1) % colorArray.length];
            body.style.background = `linear-gradient(45deg, ${nextColor}, ${nextColor2})`;
            body.style.backgroundSize = '400% 400%';
        }, 1000); // Change color every second
    }

    // Initialize the gradient color change
    changeBackground();
});

// JavaScript for handling audio, video, and chat functionality
let audioActive = false;
let videoActive = false;
let mediaRecorder;
let audioStream;
let recognition;
let currentLanguage = 'en-US'; // Default language

const messageInput = document.getElementById('messageInput');
const videoElement = document.getElementById('islVideo');
const videoSource = document.getElementById('videoSource');
const videoContainer = document.getElementById('videoContainer');

// Initialize speech recognition
function initializeSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        console.error('Speech Recognition API not supported.');
        return;
    }
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = currentLanguage;

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        messageInput.value = transcript;
    };

    recognition.onerror = function(event) {
        console.error('Speech Recognition error:', event.error);
    };
}

function toggleAudio() {
    audioActive = !audioActive;
    const icon = document.getElementById('audioToggle');
    if (audioActive) {
        icon.textContent = '🔊';
        if (!recognition) initializeSpeechRecognition();
        recognition.start();
    } else {
        icon.textContent = '🔈';
        if (recognition) recognition.stop();
    }
}

function toggleVideo() {
    videoActive = !videoActive;
    const icon = document.getElementById('videoToggle');
    if (videoActive) {
        icon.textContent = '📹';
        videoContainer.style.display = 'flex';
    } else {
        icon.textContent = '🎥';
        videoContainer.style.display = 'none';
    }
}

function sendMessage() {
    const message = messageInput.value;
    if (message) {
        const chatBox = document.getElementById('chatBox');
        chatBox.innerHTML += `<div class="message user"><p>${message}</p></div>`;
        messageInput.value = '';

        // Simulate response from ISL
        setTimeout(() => {
            const response = 'ISL response for: ' + message; // Replace with actual ISL response
            chatBox.innerHTML += `<div class="message isl"><p>${response}</p></div>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);
    }
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en-US' ? 'hi-IN' : 'en-US';
    const langToggle = document.getElementById('langToggle');
    langToggle.textContent = currentLanguage === 'en-US' ? '🌐' : '🇮🇳';
    if (recognition) recognition.lang = currentLanguage;
}

// Initialize the app
initializeSpeechRecognition();