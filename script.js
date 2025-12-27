// --- CONFIGURAÇÃO: DEFINIÇÃO DO DESTINO E DATA ALVO ---
// Define o momento exato da liberação e para qual arquivo o usuário será enviado
const targetDate = new Date("January 11, 2026 00:00:00").getTime();
const revelationFile = "cont.html";

// --- MAPEAMENTO DE INTERFACE ---
// Captura as referências dos IDs do HTML para exibição dos números
const c_days = document.getElementById('c_days');
const c_hours = document.getElementById('c_hours');
const c_minutes = document.getElementById('c_minutes');
const c_seconds = document.getElementById('c_seconds');

// --- MOTOR DO CONTADOR ---
function updateCountdown() {
    // 1. Cálculo da distância temporal entre o "agora" e o "alvo"
    const now = new Date().getTime();
    let distance = targetDate - now;

    // 2. Verificação de Expiração: Se o tempo acabou, redireciona o usuário
    if (distance <= 0) {
        clearInterval(countdownInterval); 
        window.location.href = revelationFile;
        return; 
    }

    // 3. Conversão de Milissegundos: Define as constantes de conversão
    const MS_IN_SECOND = 1000;
    const MS_IN_MINUTE = 60 * MS_IN_SECOND;
    const MS_IN_HOUR = 60 * MS_IN_MINUTE;
    const MS_IN_DAY = 24 * MS_IN_HOUR;

    // 4. Extração de Valores: Calcula quanto sobra para cada unidade de tempo
    const days = Math.floor(distance / MS_IN_DAY);
    distance %= MS_IN_DAY;

    const hours = Math.floor(distance / MS_IN_HOUR);
    distance %= MS_IN_HOUR;

    const minutes = Math.floor(distance / MS_IN_MINUTE);
    distance %= MS_IN_MINUTE;

    const seconds = Math.floor(distance / MS_IN_SECOND);

    // 5. Atualização Visual: Insere os valores no HTML 
    // O "padStart" garante que sempre existam 2 dígitos (ex: 09 em vez de 9)
    c_days.innerText = String(days).padStart(2, '0');
    c_hours.innerText = String(hours).padStart(2, '0');
    c_minutes.innerText = String(minutes).padStart(2, '0');
    c_seconds.innerText = String(seconds).padStart(2, '0');
}

// --- INICIALIZAÇÃO ---
// Executa a função imediatamente (para evitar delay de 1s) e inicia o loop contínuo
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);