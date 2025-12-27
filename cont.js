// CONTADOR DE ANOS CONT

function updateTimeAlive() {
    // Início: 1 de Janeiro de 2010, Meia-noite (00:00:00)
    const startDate = new Date("2010-01-01T00:00:00");

    const now = new Date();
    // Subtraímos 1 hora (60 minutos) da hora atual em milissegundos para corrigir o adiantamento
    now.setMinutes(now.getMinutes() - 60);
    // Ou seja, o contador está calculando o tempo decorrido até 1 hora atrás.
    // Isso garante que ele não fique "adiantado" para ele.
    // -------------------------

    // Calcula a diferença de tempo exata em milissegundos
    let diffMs = now.getTime() - startDate.getTime();

    // ===================================================
    // 1. ANOS E MESES (Usando a diferença de datas para maior precisão)
    // ===================================================
    let displayYears = now.getFullYear() - startDate.getFullYear();
    let displayMonths = now.getMonth() - startDate.getMonth();

    // Ajusta anos e meses se ainda não fez aniversário no ano/mês atual
    if (displayMonths < 0) {
        displayYears--;
        displayMonths += 12; // 12 meses em um ano
    }

    // ===================================================
    // 2. DIAS, HORAS, MINUTOS e SEGUNDOS 
    // ===================================================

    const MS_IN_SECOND = 1000;
    const MS_IN_MINUTE = 60 * MS_IN_SECOND;
    const MS_IN_HOUR = 60 * MS_IN_MINUTE;
    const MS_IN_DAY = 24 * MS_IN_HOUR;

    let remainingMs = diffMs;

    // Remove os milissegundos equivalentes aos anos e meses já contados para isolar a contagem do dia
    // (Esta parte pode ser complexa e gerar inconsistências em meses, por isso mantemos o cálculo do dia a partir do total)

    let totalDays = Math.floor(remainingMs / MS_IN_DAY);
    let remainingTimeInCurrentDay = remainingMs % MS_IN_DAY;

    // HORAS (Horas do dia, já ajustadas pela linha 7)
    const displayHours = Math.floor(remainingTimeInCurrentDay / MS_IN_HOUR);
    remainingTimeInCurrentDay %= MS_IN_HOUR;

    // MINUTOS
    const displayMinutes = Math.floor(remainingTimeInCurrentDay / MS_IN_MINUTE);
    remainingTimeInCurrentDay %= MS_IN_MINUTE;

    // SEGUNDOS
    const displaySeconds = Math.floor(remainingTimeInCurrentDay / MS_IN_SECOND);

    // --- ATUALIZAÇÃO DO HTML ---

    document.getElementById("years").innerText = String(displayYears).padStart(2, '0');
    document.getElementById("months").innerText = String(displayMonths).padStart(2, '0');
    // Para um contador visual, costuma-se usar os dias restantes do mês/ano:
    document.getElementById("days").innerText = String(totalDays % 30).padStart(2, '0'); // Mostra os dias no ciclo de 30
    document.getElementById("hours").innerText = String(displayHours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(displayMinutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(displaySeconds).padStart(2, '0');
}

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