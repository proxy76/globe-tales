export const speakText = (text) => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // Set the language
        utterance.rate = 1; // Set the speed (1 is normal)
        utterance.pitch = 1; // Set the pitch
        window.speechSynthesis.speak(utterance);
    } else {
        console.error('Text-to-Speech is not supported in this browser.');
    }
};