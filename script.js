/**
 * 1. NAVEGACIÓN Y PANTALLA DE CARGA (Para index.html)
 */
function navigateTo(url) {
    const btn = document.querySelector('.btn-start');
    const loader = document.getElementById('loader-container');
    const bar = document.getElementById('progress-bar');
    const percentText = document.getElementById('percent');

    if (btn && loader) {
        btn.style.display = 'none';
        loader.style.display = 'block';

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 12) + 3; 
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                document.body.style.filter = 'brightness(3)';
                document.body.style.opacity = '0';
                document.body.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    window.location.href = url;
                }, 500);
            }
            
            if (bar) bar.style.width = progress + '%';
            if (percentText) percentText.innerText = progress + '%';
        }, 120);
    }
}

/**
 * 2. RELOJ Y FECHA REAL (Para sistema.html)
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
 * 3. CONTROL DEL MODAL DE IMÁGENES
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
 * 4. INICIALIZACIÓN
 */
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar reloj si los elementos existen
    if (document.getElementById('clock') || document.getElementById('date')) {
        setInterval(actualizarReloj, 1000);
        actualizarReloj();
    }
    
    // Asegurar visibilidad de la página
    document.body.style.opacity = '1';
});