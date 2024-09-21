let mediaRecorder;
let audioStream;

function startAudioCapture() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            audioStream = stream;
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = event => {
                const audioBlob = event.data;
                processAudio(audioBlob);
            };

            mediaRecorder.start();
        })
        .catch(error => console.error('Error accessing audio:', error));
}

function stopAudioCapture() {
    if (mediaRecorder) {
        mediaRecorder.stop();
        audioStream.getTracks().forEach(track => track.stop()); // Stop audio stream
    }
}

function processAudio(audioBlob) {
    // Simulate audio processing and display ISL video
    const videoElement = document.getElementById('islVideo');
    const videoSource = document.getElementById('videoSource');

    // For demonstration, use a static video URL
    videoSource.src = 'https://www.example.com/isl-gesture.mp4'; // Replace with actual video URL
    videoElement.load();
    videoElement.play();
}