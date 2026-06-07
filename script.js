// ==========================================
// 1. ANIMACIÓN DE APARICIÓN AL HACER SCROLL
// ==========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(section => {
    observer.observe(section);
});


// ==========================================
// 2. CUENTA REGRESIVA EXACTA (JULIO 10)
// ==========================================
const targetDate = new Date('July 10, 2026 18:00:00').getTime();

const updateCountdown = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const daysElement = document.getElementById('days');
    if (!daysElement) return; // Si no está en esta página, no ejecuta el contador

    if (diff <= 0) {
        clearInterval(updateCountdown);
        document.getElementById('countdown').innerHTML = "<h3>¡Bienvenidos a nuestra graduación!</h3>";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysElement.innerText = d.toString().padStart(2, '0');
    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
}, 1000);


// ==========================================
// 3. MODAL DE BIENVENIDA Y MÚSICA DE FONDO
// ==========================================
const modal = document.getElementById('welcome-modal');
const btnIngresar = document.getElementById('btn-ingresar');
const musica = document.getElementById('bg-music');

if (btnIngresar && modal) {
    btnIngresar.addEventListener('click', () => {
        // Ocultar modal
        modal.classList.add('hidden');
        
        // Forzar ir arriba
        window.scrollTo(0, 0); 
        
        // Reproducir música si existe el elemento
        if (musica) {
            musica.play().catch(error => {
                console.log("Audio bloqueado o sin archivo listo aún:", error);
            });
        }
    });
}

// Botón de silenciar opcional
const btnMute = document.getElementById('btn-mute');
if (btnMute && musica) {
    btnMute.addEventListener('click', () => {
        if (musica.paused) {
            musica.play();
            btnMute.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        } else {
            musica.pause();
            btnMute.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        }
    });
}




// ==========================================
// 4. CONTROL DE LA GALERÍA DE ALUMNOS (CON EFECTOS)
// ==========================================
const listaGraduados = [
    { nombre: "Aguilar Torres Axel", foto: "imagenes/Alumnos/alum1.jpg" },
    { nombre: "Álvarez Torres Aislinn Guadalupe", foto: "imagenes/Alumnos/alum2.jpg" },
    { nombre: "Anaya Pérez Jesús Alberto", foto: "imagenes/Alumnos/alum3.jpg" },
    { nombre: "Chávez Valdovinos Andrés Noé", foto: "imagenes/Alumnos/alum1.jpg" },
    { nombre: "De la Cruz Ponce Briseida", foto: "imagenes/Alumnos/alum2.jpg" },
    { nombre: "Flores Tafolla Mayte", foto: "imagenes/Alumnos/alum3.jpg" },
    { nombre: "Gutierrez Quintana Araleth", foto: "imagenes/Alumnos/alum1.jpg" },
    { nombre: "Loya Fuerte Celestino Yael", foto: "imagenes/Alumnos/alum2.jpg" },
    { nombre: "Plancarte Bedolla Bladimir", foto: "imagenes/Alumnos/alum3.jpg" },
    { nombre: "Sánchez Cuamba Génesis Janeth", foto: "imagenes/Alumnos/alum1.jpg" },
    { nombre: "Valdovinos Solorio Adriel Iram", foto: "imagenes/Alumnos/alum2.jpg" }
];

let alumnoActual = 0;

const imgContenedor = document.getElementById('student-img');
const txtNombre = document.getElementById('student-name');
const btnAnterior = document.getElementById('btn-prev-alumno');
const btnSiguiente = document.getElementById('btn-next-alumno');
// Seleccionamos la tarjeta para meterle los efectos dentro
const tarjetaGala = document.querySelector('.gala-card'); 

function mostrarAlumno() {
    if (imgContenedor && txtNombre && listaGraduados.length > 0) {
        imgContenedor.src = listaGraduados[alumnoActual].foto;
        txtNombre.innerText = listaGraduados[alumnoActual].nombre;
    }
}

// NUEVA FUNCIÓN: Genera el destello y el confeti flotante
function lanzarEfectosCelebracion() {
    if (!tarjetaGala) return;

    // 1. Crear el destello luminoso
    const flash = document.createElement('div');
    flash.classList.add('gala-flash');
    tarjetaGala.appendChild(flash);
    setTimeout(() => flash.remove(), 500); // Se limpia solo a la mitad de un segundo

    // 2. Crear 30 partículas de confeti dorado disparadas al azar
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('gala-confetti');

        // Ángulo y distancia aleatoria para la explosión
        const randomAngle = Math.random() * Math.PI * 2;
        const randomDistance = 80 + Math.random() * 140; // Distancia en píxeles

        // Calculamos las coordenadas de destino usando las variables CSS (--x, --y)
        const x = Math.cos(randomAngle) * randomDistance + "px";
        const y = Math.sin(randomAngle) * randomDistance + "px";
        const r = Math.random() * 360 + "deg"; // Rotación loca al azar

        confetti.style.setProperty('--x', x);
        confetti.style.setProperty('--y', y);
        confetti.style.setProperty('--r', r);

        // Variación de tonos de oro para mayor realismo
        const golds = ['#dfb963', '#fff7d6', '#a37f37', '#e5c158'];
        confetti.style.backgroundColor = golds[Math.floor(Math.random() * golds.length)];

        tarjetaGala.appendChild(confetti);

        // Limpieza de memoria: removemos el confeti después de que termine la animación
        setTimeout(() => confetti.remove(), 800);
    }
}

// Eventos de los botones actualizados con el efecto de celebración
if (btnSiguiente && btnAnterior) {
    btnSiguiente.addEventListener('click', () => {
        alumnoActual++;
        if (alumnoActual >= listaGraduados.length) alumnoActual = 0;
        mostrarAlumno();
        lanzarEfectosCelebracion(); // <-- ¡Boom!
    });

    btnAnterior.addEventListener('click', () => {
        alumnoActual--;
        if (alumnoActual < 0) alumnoActual = listaGraduados.length - 1;
        mostrarAlumno();
        lanzarEfectosCelebracion(); // <-- ¡Boom!
    });
}

// Inicializar de manera segura
document.addEventListener('DOMContentLoaded', () => {
    mostrarAlumno();
});