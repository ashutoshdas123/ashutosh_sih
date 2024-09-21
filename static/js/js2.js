let awaitingRating = false;

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');

userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleUserInput();
    }
});

function handleUserInput() {
    const userText = userInput.value.trim().toLowerCase();
    if (userText === '')
        return;

    addUserMessage(userInput.value.trim());
    userInput.value = '';

    if (awaitingRating) {
        handleRating(userText);
    } else {
        if (userText === 'yes' || userText === 'y') {
            setTimeout(() => {
                addBotMessage("How can I assist you? Choose an option below:");
                displayChoices();
            }, 1000);
        } else if (userText === 'no' || userText === 'n') {
            setTimeout(() => {
                addBotMessage("Okay, have a nice day!");
                askForRating();
            }, 1000);
        } else {
            setTimeout(() => addBotMessage("Sorry, I didn't understand that. Please respond with 'yes' or 'no'."), 1000);
        }
    }
}

function displayChoices() {
    const choicesDiv = document.createElement('div');
    choicesDiv.classList.add('choices');

    const railwayChoice = document.createElement('div');
    railwayChoice.classList.add('choice');
    railwayChoice.innerHTML = "Railways 🚆";
    railwayChoice.onclick = () => {
        addUserMessage("Railways 🚆");
        fetch('/page5')
        .then(response => {
            if (response.ok) {
                // Redirect to QR page upon success
                window.location.href = '/page5';
            } else {
                console.error('Failed to send the request');
            }
        })
        .catch(error => console.error('Error:', error));
    };
    choicesDiv.appendChild(railwayChoice);

    const chatmeetChoice = document.createElement('div');
    chatmeetChoice.classList.add('choice');
    chatmeetChoice.innerHTML = "Meetup/Chatmeet 💬";
    chatmeetChoice.onclick = () => {
        addUserMessage("Meetup/Chatmeet 💬");
        fetch('/page6')
        .then(response => {
            if (response.ok) {
                // Redirect to QR page upon success
                window.location.href = '/page6';
            } else {
                console.error('Failed to send the request');
            }
        })
        .catch(error => console.error('Error:', error));
    };
    choicesDiv.appendChild(chatmeetChoice);

    const doctorChoice = document.createElement('div');
    doctorChoice.classList.add('choice');
    doctorChoice.innerHTML = "Doctor 👨‍⚕️";
    doctorChoice.onclick = () => {
        addUserMessage("Doctor 👨‍⚕️");
        fetch('/page3')
        .then(response => {
            if (response.ok) {
                // Redirect to QR page upon success
                window.location.href = '/page3';
            } else {
                console.error('Failed to send the request');
            }
        })
        .catch(error => console.error('Error:', error));
    };
    
    choicesDiv.appendChild(doctorChoice);

    chatMessages.appendChild(choicesDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleRating(userText) {
    const rating = parseInt(userText);
    if (isNaN(rating) || rating < 1 || rating > 10) {
        addBotMessage("Please enter a valid rating between 1 and 10.");
    } else {
        awaitingRating = false;
        if (rating >= 8) {
            addBotMessage("Thank you for your positive feedback!");
        } else {
            addBotMessage("I'm sorry to hear that. Could you please let me know what went wrong?");
        }
    }
}

function askForRating() {
    awaitingRating = true;
    setTimeout(() => addBotMessage("On a scale of 1 to 10, how satisfied are you with the service?"), 2000);
}

function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'user');
    messageDiv.innerHTML = `<div class="message-box">${message}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
}

function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'bot');
    messageDiv.innerHTML = `<div class="message-box">${message}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
}