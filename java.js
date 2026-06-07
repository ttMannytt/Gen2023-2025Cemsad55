



// CODIGO PARA EL PORCENTAJE DE CARGA Y EFECTOS
document.addEventListener("DOMContentLoaded", () => {
    const percentageText = document.getElementById('percentage');
    const loader = document.getElementById('loader');
    const wrapper = document.getElementById('wrapper'); // NUEVO: Referencia al contenedor de tu página
    let progress = 0;

    const updateProgress = () => {
        if (progress < 100) {
            progress += 1;
            if (percentageText !== null) {
                percentageText.innerText = progress + '%';
            }
        } else {
            clearInterval(interval);
            
            if (loader !== null) {
                loader.style.opacity = '0';
                
                // NUEVO: Activamos la visibilidad del contenido al terminar la carga
                if (wrapper !== null) {
                    wrapper.classList.add('contenido-visible');
                }

                setTimeout(() => {
                    loader.style.display = 'none';
                    verificarYMostrarModal();
                }, 500);
            }
        }
    };

    const interval = setInterval(updateProgress, 10); 
});

// Función para manejar el cupón (sessionStorage para que salga una vez por sesión)
function verificarYMostrarModal() {
    const yaVisto = sessionStorage.getItem('cuponVisto');
    if (yaVisto === 'true') return;

    const modal = document.getElementById('miModal');
    if (modal !== null) {
        modal.style.display = 'flex';
        sessionStorage.setItem('cuponVisto', 'true');
    }
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('miModal');
    if (modal !== null) {
        modal.style.display = 'none';
    }
}