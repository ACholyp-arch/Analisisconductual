// Lista de nombres normalizados
const nombres = [
    "emili marcel cabrera flores",
    "dulce naomy calderon gonzalez",
    "jennifer estefania chajon barrios",
    "enrique cifuentes bauer",
    "santiago del rio mendez",
    "carlos rafael fernandez valdes",
    "martin figueroa tavares",
    "esteban renato fratta torres",
    "maria fernanda garcia barrios",
    "julian garcia fernandez de la torre",
    "andrea michelle lacota martinez",
    "maria amalia leclair rodriguez",
    "fatima anai lopez castellanos",
    "maria andrea marinelli toruno",
    "ana lucia morales paiz",
    "ana lucia munoz turcios",
    "martin leonardo rivera grajeda",
    "jose mariano rodriguez rios",
    "ximena santizo murua",
    "isabel siliezar rodas",
    "jeanne marie wheelock"
];

// Casos para cada rol
const casos = {
    "Hacer cumplidos": [
        "Cómo sí: Elogia algo específico y sincero.",
        "Cómo no: Elogiar de forma vaga o exagerada."
    ],
    "Recibir cumplidos": [
        "Cómo sí: Agradece con una sonrisa y un 'gracias'.",
        "Cómo no: Minimizar o negar el cumplido de inmediato."
    ]
};

// Función para normalizar texto (sin tildes ni mayúsculas)
function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Función para elegir un papel al azar
function tirarDadoPapel() {
    const papel = Math.random() < 0.5 ? "Hacer cumplidos" : "Recibir cumplidos";
    return papel;
}

// Función para elegir una pareja al azar
function elegirPareja(nombre) {
    const nombresDisponibles = nombres.filter(n => n !== normalizarTexto(nombre));
    const index = Math.floor(Math.random() * nombresDisponibles.length);
    return nombresDisponibles[index];
}

// Función para mostrar caso aleatorio según el papel
function mostrarCaso(papel) {
    const listaCasos = casos[papel];
    const index = Math.floor(Math.random() * listaCasos.length);
    return listaCasos[index];
}

// Animación del dado (simple)
function animarDado(dadoId, callback) {
    const dado = document.getElementById(dadoId);
    let count = 0;
    const interval = setInterval(() => {
        dado.textContent = "🎲".repeat(Math.floor(Math.random() * 3) + 1);
        count++;
        if (count > 10) {
            clearInterval(interval);
            callback();
        }
    }, 100);
}

// Botón asignar
document.getElementById("asignarBtn").addEventListener("click", () => {
    const nombreInput = document.getElementById("nombre").value.trim();
    if (!nombreInput) {
        alert("Por favor ingresa tu nombre.");
        return;
    }

    const nombreNormalizado = normalizarTexto(nombreInput);
    if (!nombres.includes(nombreNormalizado)) {
        alert("Nombre no reconocido.");
        return;
    }

    animarDado("dadoPapel", () => {
        const papelAsignado = tirarDadoPapel();
        document.getElementById("papel").textContent = `Papel asignado: ${papelAsignado}`;

        animarDado("dadoPareja", () => {
            const parejaAsignada = elegirPareja(nombreNormalizado);
            document.getElementById("pareja").textContent = `Tu pareja: ${parejaAsignada}`;
            document.getElementById("caso").textContent = mostrarCaso(papelAsignado);
        });
    });
});
