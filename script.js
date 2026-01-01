// --- CONFIGURAÇÃO: DEFINIÇÃO DO DESTINO E DATA ALVO ---
// Aqui você define para quando é a surpresa e para onde o site vai depois que o tempo acabar
const targetDate = new Date("January 1, 2026 16:34:00").getTime();
const revelationFile = "./cont.html"; // O ./ indica "nesta mesma pasta"

// --- MAPEAMENTO DE INTERFACE ---
// Captura os elementos do HTML onde os números vão aparecer.
// IMPORTANTE: Esses IDs (c_days, etc) devem ser os mesmos que estão no seu HTML do contador.
const c_days = document.getElementById('c_days');
const c_hours = document.getElementById('c_hours');
const c_minutes = document.getElementById('c_minutes');
const c_seconds = document.getElementById('c_seconds');

// --- MOTOR DO CONTADOR ---
function updateCountdown() {
    // 1. Pega o horário exato de "agora" e calcula a distância para o "alvo"
    const now = new Date().getTime();
    let distance = targetDate - now;

    // 2. Verificação de Expiração: 
    // Se a distância for zero ou negativa, significa que o aniversário chegou!
    if (distance <= 0) {
    clearInterval(countdownInterval); 
    console.log("O tempo acabou!"); 
    
    // Esse alerta vai avisar se o código chegou aqui ou não
    alert("O tempo acabou! Vou tentar abrir a página agora."); 

    // Tentativa de redirecionamento forçado
    window.location.href = "cont.html"; 
    
    // Se em 2 segundos não mudar, ele tenta esse outro método:
    setTimeout(function() {
        window.location.replace("cont.html");
    }, 2000);
    return; 
}

    // 3. Conversão de Milissegundos: 
    // O computador entende tempo em milissegundos, aqui criamos as "regras" para converter
    const MS_IN_SECOND = 1000;
    const MS_IN_MINUTE = 60 * MS_IN_SECOND;
    const MS_IN_HOUR = 60 * MS_IN_MINUTE;
    const MS_IN_DAY = 24 * MS_IN_HOUR;

    // 4. Extração de Valores: 
    // O "Math.floor" arredonda o número para baixo para não ter casas decimais
    const days = Math.floor(distance / MS_IN_DAY);
    distance %= MS_IN_DAY; // O que sobra dos dias vai para as horas

    const hours = Math.floor(distance / MS_IN_HOUR);
    distance %= MS_IN_HOUR; // O que sobra das horas vai para os minutos

    const minutes = Math.floor(distance / MS_IN_MINUTE);
    distance %= MS_IN_MINUTE; // O que sobra dos minutos vai para os segundos

    const seconds = Math.floor(distance / MS_IN_SECOND);

    // 5. Atualização Visual: 
    // O "padStart(2, '0')" garante que o número sempre tenha dois dígitos (ex: 09, 08...)
    if (c_days) c_days.innerText = String(days).padStart(2, '0');
    if (c_hours) c_hours.innerText = String(hours).padStart(2, '0');
    if (c_minutes) c_minutes.innerText = String(minutes).padStart(2, '0');
    if (c_seconds) c_seconds.innerText = String(seconds).padStart(2, '0');
}

// --- INICIALIZAÇÃO ---
// Chama a função uma vez agora para o site não começar com "00" vazio
updateCountdown();

// Cria um intervalo que repete a função a cada 1 segundo (1000 milissegundos)
const countdownInterval = setInterval(updateCountdown, 1000);






