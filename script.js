// --- CONFIGURAÇÃO ---
const targetDate = new Date("January 11, 2026 00:00:00").getTime();
const revelationFile = "cont.html";

// 1. Declaramos a variável do intervalo no topo, vazia
let countdownInterval;

function updateCountdown() {
    const now = new Date().getTime();
    let distance = targetDate - now;

    if (distance <= 0) {
        // 2. Só limpamos o intervalo se ele já tiver sido iniciado
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        window.location.replace(revelationFile);
        return;
    }

    const c_days = document.getElementById('c_days');
    const c_hours = document.getElementById('c_hours');
    const c_minutes = document.getElementById('c_minutes');
    const c_seconds = document.getElementById('c_seconds');

    const MS_IN_DAY = 24 * 60 * 60 * 1000;
    const MS_IN_HOUR = 60 * 60 * 1000;
    const MS_IN_MINUTE = 60 * 1000;
    const MS_IN_SECOND = 1000;

    const days = Math.floor(distance / MS_IN_DAY);
    const hours = Math.floor((distance % MS_IN_DAY) / MS_IN_HOUR);
    const minutes = Math.floor((distance % MS_IN_HOUR) / MS_IN_MINUTE);
    const seconds = Math.floor((distance % MS_IN_MINUTE) / MS_IN_SECOND);

    if (c_days) c_days.innerText = String(days).padStart(2, '0');
    if (c_hours) c_hours.innerText = String(hours).padStart(2, '0');
    if (c_minutes) c_minutes.innerText = String(minutes).padStart(2, '0');
    if (c_seconds) c_seconds.innerText = String(seconds).padStart(2, '0');
}

// 3. Primeiro iniciamos o loop, depois chamamos a função pela primeira vez
countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

