/**
 * main.js - Script principal del sitio
 */

// 1. CONFIGURACIONES / VARIABLES GLOBAL
const CLASE_ACTIVA = "is-visible";

// 2. FUNCIONES (Lógica)
function pausarVideosYT() {
    const videos = document.querySelectorAll('.youtube');
    videos.forEach(video => {
        if (video.contentWindow) {
            video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    });
}

// 3. INICIALIZACIÓN Y EVENTOS
document.addEventListener("DOMContentLoaded", () => {
    const carrusel = document.getElementById('carouselExampleIndicators');

    // Si el carrusel existe en esta página, le clavo el evento
    if (carrusel) {
        carrusel.addEventListener('slide.bs.carousel', pausarVideosYT);
    }
});

const pagina = document.body.id;
if (pagina === "contacto") {
    const form = document.getElementById('contactoForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const body = Object.fromEntries(new FormData(e.target));
        
        try {
            const response = await fetch( CONFIG.webhookUrlProd , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw new Error();
            alert('Mensaje enviado ✓');
            e.target.reset();

        } catch (error) {
            alert('Error al enviar, intentá de nuevo');
        }
        }
    );
}   