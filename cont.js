function festaDeRevelacao() {
    const audio = document.getElementById('reveal_sound');
    
    if (audio) {
        // Força o carregamento antes de dar play
        audio.load(); 
        audio.volume = 0.7;

        // Tenta tocar
        let playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log("Som tocou com sucesso!");
            }).catch(error => {
                // Se der erro de permissão, o som tocará no primeiro clique que ele der na carta
                console.log("O som foi bloqueado. Tentando tocar no primeiro clique...");
                document.body.addEventListener('click', () => {
                    audio.play();
                }, { once: true });
            });
        }
    }

    // Parte dos confetes (mantém igual)
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#817DB8', '#6A1238', '#a02056', '#FFD700', '#ffffff'];

    (function frame() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return;
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: colors });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: colors });
        requestAnimationFrame(frame);
    }());
}

/* ==========================================================================
   2. CONTADOR DE TEMPO DE VIDA
========================================================================== */
function updateTimeAlive() {
    const startDate = new Date("2010-01-11T00:00:00");
    const now = new Date();

    let displayYears = now.getFullYear() - startDate.getFullYear();
    let displayMonths = now.getMonth() - startDate.getMonth();
    let displayDays = now.getDate() - startDate.getDate();

    if (displayDays < 0) {
        displayMonths--;
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        displayDays += lastDayOfMonth;
    }

    if (displayMonths < 0) {
        displayYears--;
        displayMonths += 12;
    }

    const elements = {
        years: displayYears,
        months: displayMonths,
        days: displayDays,
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
    };

    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.innerText = String(value).padStart(2, '0');
    }
}

/* ==========================================================================
   3. ANIMAÇÃO DAS CARTAS
========================================================================== */
function setupLetters() {
    document.querySelectorAll('.box-c-letters-i').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');

            document.querySelectorAll('.box-c-letters-i').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.letter-text').forEach(txt => txt.classList.remove('active'));

            button.classList.add('active');
            const target = document.getElementById(targetId);
            if (target) target.classList.add('active');
        });
    });
}

/* ==========================================================================
   4. INICIALIZAÇÃO (GATILHO ÚNICO)
========================================================================== */
window.addEventListener('load', () => {
    // Inicia os sistemas
    updateTimeAlive();
    setInterval(updateTimeAlive, 1000);
    setupLetters();

    // O Grande "PAAAAM" (Delay de 400ms para garantir que a página abriu)
    setTimeout(festaDeRevelacao, 400);
});
