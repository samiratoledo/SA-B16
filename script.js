// --- CONFIGURAÇÃO ---
const targetDate = new Date("January 11, 2026 00:00:00").getTime(); 
const revelationFile = "cont.html"; 

let countdownInterval;
let audioPlayed = false; 

// Captura os elementos
const startBtn = document.getElementById('start_btn');
const overlay = document.getElementById('overlay');
const sound = document.getElementById('drums_sound');

// --- AÇÃO AO CLICAR NO BOTÃO ---
startBtn.addEventListener('click', function() {
    // 1. Libera o áudio (toca e pausa)
    if (sound) {
        sound.play().then(() => {
            sound.pause();
            sound.currentTime = 0;
        }).catch(e => console.log("Áudio bloqueado:", e));
    }

    // 2. Esconde a tela roxa
    overlay.style.display = 'none';

    // 3. Inicia o relógio
    iniciarContador();
});

function updateCountdown() {
    const now = new Date().getTime();
    let distance = targetDate - now;

    // Toca os tambores faltando 30 segundos
    if (distance <= 30000 && distance > 0 && !audioPlayed) {
        if (sound) {
            sound.play();
            audioPlayed = true; 
        }
    }

    // Quando o tempo acaba
    if (distance <= 0) {
        clearInterval(countdownInterval);
        window.location.replace(revelationFile); 
        return; 
    }

    // Cálculos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Mostra na tela
    document.getElementById('c_days').innerText = String(days).padStart(2, '0');
    document.getElementById('c_hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('c_minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('c_seconds').innerText = String(seconds).padStart(2, '0');
}

function iniciarContador() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}
