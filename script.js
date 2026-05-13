/**
 * ============================================================
 * SCRIPT PRINCIPAL - TFG ROBERTO (ICMM-CSIC)
 * Contiene: Partículas, Carga Fluida, IP Dinámica y Reloj
 * ============================================================
 */

/**
 * 1. EFECTO DE PARTÍCULAS DE FONDO
 * Genera "bits" de datos flotando para dar textura al fondo negro.
 */
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}vw`;
        p.style.top = `${Math.random() * 100}vh`;
        
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;
        
        p.animate([
            { transform: 'translateY(0) opacity(0)', opacity: 0 },
            { opacity: 0.5, offset: 0.2 },
            { transform: `translateY(-100vh)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            delay: delay * 1000
        });
        
        container.appendChild(p);
    }
}

/**
 * 2. NAVEGACIÓN Y PANTALLA DE CARGA (Para index.html)
 * Corregido para ser totalmente fluido y con transición de salida suave.
 */
const loadingMessages = [
    "> ACCEDIENDO AL SERVIDOR ICMM...",
    "> CARGANDO INTERFAZ GRÁFICA...",
    "> DESENCRIPTANDO ARCHIVOS...",
    "> VALIDANDO SESIÓN DE ROBERTO...",
    "> CONEXIÓN COMPLETADA."
];

function navigateTo(url) {
    const btn = document.querySelector('.btn-start');
    const loader = document.getElementById('loader-container');
    const bar = document.getElementById('progress-bar');
    const percentText = document.getElementById('percent');
    const msgText = document.getElementById('loader-msg');

    if (btn && loader) {
        // Ocultamos el botón e iniciamos el loader
        btn.style.display = 'none';
        loader.style.display = 'block';

        let progress = 0;
        // Intervalo de alta frecuencia (25ms) para máxima fluidez
        const interval = setInterval(() => {
            progress += 0.8; // Incremento constante y suave
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Efecto de transición hacia la siguiente página (evita el "de golpe")
                document.body.style.transition = 'all 1s ease';
                document.body.style.filter = 'brightness(2) blur(5px)';
                document.body.style.opacity = '0';
                
                // Esperamos a que el fundido termine antes de cambiar de URL
                setTimeout(() => {
                    window.location.href = url;
                }, 1000);
            }
            
            // Actualizamos barra y porcentaje
            if (bar) bar.style.width = progress + '%';
            if (percentText) percentText.innerText = Math.floor(progress) + '%';
            
            // Actualizamos los mensajes de texto secuencialmente
            const msgIndex = Math.floor((progress / 100) * (loadingMessages.length - 1));
            if (msgText && msgText.innerText !== loadingMessages[msgIndex]) {
                msgText.innerText = loadingMessages[msgIndex];
            }
        }, 25); 
    }
}

/**
 * 3. RELOJ Y FECHA REAL (Para sistema.html)
 */
function actualizarReloj() {
    const ahora = new Date();
    const clock = document.getElementById('clock');
    const date = document.getElementById('date');
    
    if (clock) {
        clock.textContent = ahora.toLocaleTimeString('es-ES');
    }
    
    if (date) {
        const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
        date.textContent = ahora.toLocaleDateString('es-ES', opciones);
    }
}

/**
 * 4. CONTROL DEL MODAL DE IMÁGENES (Para sistema.html)
 */
function openModal(imgSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    if (modal && modalImg) {
        modalImg.src = imgSrc;
        modal.style.display = "flex";
    }
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
    }
}

/**
 * 5. INICIALIZACIÓN AL CARGAR LA PÁGINA
 */
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar partículas de fondo
    createParticles();
    
    // Generar IP dinámica en la cabecera si existe el elemento
    const ipSpan = document.getElementById('header-ip');
    if (ipSpan) {
        ipSpan.innerText = `192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
    }

    // Si estamos en la página del sistema, activamos el reloj real
    if (document.getElementById('clock') || document.getElementById('date')) {
        actualizarReloj();
        setInterval(actualizarReloj, 1000);
    }
});
