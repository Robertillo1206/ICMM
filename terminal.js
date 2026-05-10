const input = document.getElementById('command-input');
const history = document.getElementById('history');
const container = document.getElementById('terminal-content');

/* comandos terminal */
const responses = {
    'help': "Comandos disponibles:\n - tree: Ver estructura de la red\n - ping servidores: Test de conectividad a los servidores\n - clear: Limpiar consola\n - exit: Volver al escritorio",
    'tree': "ESTRUCTURA ICMM\n" +
            "├── VLAN 100 (Equipos seguros)\n" +
            "├── VLAN 136 (NAS)\n" +
            "├── VLAN 1 (Servidores)\n" +
            "├── VLAN 140 (Impresoras)\n" +
            "├── VLAN 216 (Invitados)\n" +
            "└── VLAN 26 (Switches)",
    'exit': "Cerrando sesión y volviendo al sistema..."
};

/**
 * Función auxiliar para añadir líneas al historial
 * @param {string} text - Contenido del mensaje
 * @param {string} color - Color hexadecimal o variable CSS
 * @param {boolean} isPre - Si debe respetar espacios y saltos de línea
 */
function addLog(text, color = "#8892b0", isPre = false) {
    const line = document.createElement('div');
    if (isPre) {
        line.style.whiteSpace = "pre";
    }
    line.style.color = color;
    line.innerText = text;
    history.appendChild(line);
    
    // Auto-scroll al final de la terminal
    container.scrollTop = container.scrollHeight;
}

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const fullCmd = input.value.trim();
        const cmd = fullCmd.toLowerCase();

        // 1. Mostrar el prompt con el comando que escribió el usuario
        const userLine = document.createElement('div');
        userLine.innerHTML = `<span style="color:#c678dd">roberto@icmm-os:~$</span> ${fullCmd}`;
        history.appendChild(userLine);

        // 2. Procesar la lógica del comando
        if (cmd === 'clear') {
            history.innerHTML = '';
        } 
        else if (cmd === 'exit') {
            addLog(responses['exit'], "#ffbd2e");
            setTimeout(() => {
                window.location.href = 'sistema.html'; // Redirige al escritorio
            }, 1000);
        } 
        /* Funcionamiento ping a servidores */
        else if (cmd === 'ping servidores') {
            addLog("Iniciando secuencia de diagnóstico ICMM...", "#64ffda");
            
            setTimeout(() => {
                addLog("Pinging Servidor DHCP (10.110.120.16)... Respuesta: OK (1ms)");
            }, 600);

            setTimeout(() => {
                addLog("Pinging Servidor DNS (150.244.101.250)... Respuesta: OK (2ms)");
            }, 1400);

            setTimeout(() => {
                addLog("Pinging Servidores NAS (10.110.136.0)... Respuesta: OK (4ms)");
            }, 2200);

            setTimeout(() => {
                addLog("Pinging Switches (192.168.26.0)... Respuesta: OK (6ms)");
            }, 2600);

            setTimeout(() => {
                addLog("Análisis completado. Todos los servidores responden correctamente.", "#27c93f");
            }, 2800);
        }
        else if (responses[cmd]) {
            // Imprime respuesta estática (usando pre para el tree)
            addLog(responses[cmd], "#8892b0", cmd === 'tree');
        } 
        else if (cmd !== "") {
            // Error de comando no encontrado
            addLog(`Comando '${cmd}' no reconocido. Escribe 'help' para ver opciones.`, "#ff5f56");
        }

        // 3. Limpiar el input y mantener scroll
        input.value = "";
        container.scrollTop = container.scrollHeight;
    }
});

/* Experiencia de usuario: foco automático al hacer clic en la terminal */
document.addEventListener('click', () => {
    input.focus();
});

// Foco inicial al cargar la página
window.onload = () => {
    input.focus();
};