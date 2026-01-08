// Essa função dispara os confetes
function soltarConfetes() {
    // Definimos as cores para combinar com o seu site (Roxo, Vinho, Rosa e Dourado)
    var colors = ['#817DB8', '#6A1238', '#a02056', '#FFD700', '#ffffff'];

    // Configuração para um efeito de "canhões laterais"
    var end = Date.now() + (2 * 1000); // O efeito vai durar 2 segundos

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 }, // Canhão da esquerda
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 }, // Canhão da direita
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// --- GATILHO ---
// Isso garante que os confetes só explodam quando a página inteira carregar
// (inclusive as fotos, para não travar).
window.addEventListener('load', () => {
    // Um pequeno atraso de meio segundo para dar um "tchan"
    setTimeout(soltarConfetes, 500);
});


// CONTADOR DE ANOS CONT

function updateTimeAlive() {
    // 1. CORREÇÃO DA DATA: Alterado de 01/01 para 11/01
    const startDate = new Date("2010-01-11T00:00:00");
    const now = new Date();

    // Mantendo sua correção de 1 hora se for necessária para o seu fuso
    // now.setMinutes(now.getMinutes() - 60);

    // --- CÁLCULO PRECISO DE ANOS, MESES E DIAS ---
    let displayYears = now.getFullYear() - startDate.getFullYear();
    let displayMonths = now.getMonth() - startDate.getMonth();
    let displayDays = now.getDate() - startDate.getDate();

    // 2. Ajuste se o dia atual for menor que o dia do nascimento
    if (displayDays < 0) {
        displayMonths--;
        // Pega o último dia do mês anterior para saber quantos dias compensar
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        displayDays += lastDayOfMonth;
    }

    // 3. Ajuste se o mês atual for menor que o mês de nascimento
    if (displayMonths < 0) {
        displayYears--;
        displayMonths += 12;
    }

    // --- CÁLCULO DE HORAS, MINUTOS E SEGUNDOS ---
    // Como a startDate é meia-noite (00:00:00), pegamos o tempo atual do dia
    const displayHours = now.getHours();
    const displayMinutes = now.getMinutes();
    const displaySeconds = now.getSeconds();

    // --- ATUALIZAÇÃO DO HTML ---
    // Usamos os IDs que você já tem no seu projeto
    const elements = {
        years: displayYears,
        months: displayMonths,
        days: displayDays,
        hours: displayHours,
        minutes: displayMinutes,
        seconds: displaySeconds
    };

    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = String(value).padStart(2, '0');
        }
    }
}

// Inicializa e define o intervalo
updateTimeAlive();
setInterval(updateTimeAlive, 1000);

// ANIMACAO DA CARTA 

document.querySelectorAll('.box-c-letters-i').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');

        // 1. Remove 'active' de todos os botões e textos
        document.querySelectorAll('.box-c-letters-i').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.letter-text').forEach(txt => txt.classList.remove('active'));

        // 2. Adiciona 'active' no botão clicado e no texto certo
        button.classList.add('active');
        document.getElementById(targetId).classList.add('active');
    });
});
