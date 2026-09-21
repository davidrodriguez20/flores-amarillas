document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton');
    const inicio = document.getElementById('inicio');
    const jardin = document.getElementById('jardin');
    const grupoFlores = document.getElementById('grupoFlores');
    const petalosContainer = document.getElementById('petalosContainer');

    const ramos = document.querySelectorAll('.ramo');
    const ramoSecreto = document.getElementById('ramoSecreto');
    const avisoDesbloqueo = document.getElementById('avisoDesbloqueo');

    const modalCarta = document.getElementById('modalCarta');
    const cerrarCarta = document.getElementById('cerrarCarta');
    const cartaTitulo = document.getElementById('cartaTitulo');
    const cartaTexto = document.getElementById('cartaTexto');

    const mariposas = document.querySelectorAll('.mariposa-interactiva');

    const musicaFondo = document.getElementById('musicaFondo');
    const btnMusica = document.getElementById('btnMusica');
    let musicaReproduciendo = false;

    const mariposasTocadas = new Set();
    let secretoDesbloqueado = false;

    // Mensajes para las cartas (Tus textos)
    const mensajes = {
        1: {
            titulo: "Para ti... 🌻",
            texto: "No pude entregártelas de forma tradicional, así que se me ocurrio hacer este pequeño jardín. :D"
        },
        2: {
            titulo: "Flores Amarillas ✨",
            texto: "Representan la alegría, la luz y la calidez que le das a quienes te rodean. Espero que este detalle te dibuje una gran sonrisa. omg "
        },
        3: {
            titulo: "Un detalle especial 💛",
            texto: "Cada flor, mariposa y pétalo en este espacio fueron programados especialmente para recordarte lo mucho que vales, sapa 🐸 \n\nPD: Hay un mensaje oculto. 🦋 "
        },
        secreto: {
            titulo: "¡Mensaje Secreto! 👑✨",
            texto: "wtf, lo encontraste. \nEspero que nunca dejes de sonreír ni de lograr todo lo que te propones. Te quiero 💛🌻 \n\n(Disculpa por no poder mandarte el ramo) "
        }
    };

    // Al pulsar "Abrir regalo"
   // Al pulsar "Abrir regalo"
   // Al pulsar "Abrir regalo"
    // Al pulsar "Abrir regalo"
   // Al pulsar "Abrir regalo"
  // Al pulsar "Abrir regalo"
    boton.addEventListener('click', () => {
        // Forzar desbloqueo y reproducción
        if (musicaFondo) {
            musicaFondo.volume = 0.8;
            musicaFondo.muted = false;
            
            const playPromise = musicaFondo.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicaReproduciendo = true;
                    if (btnMusica) btnMusica.innerText = '🎵';
                }).catch(e => {
                    console.log("Error al reproductor audio:", e);
                });
            }
        }

        inicio.classList.add('oculto');
        
        setTimeout(() => {
            inicio.style.display = 'none';
            jardin.style.display = 'flex';
            setTimeout(() => {
                jardin.classList.add('activo');
                generarCampoDeFlores(18);
                crearLluviaDePetalos();
                iniciarMariposas();
            }, 50);
        }, 600);
    });

    // Control de Play / Pause de música
    if (btnMusica && musicaFondo) {
        btnMusica.addEventListener('click', () => {
            if (musicaReproduciendo) {
                musicaFondo.pause();
                btnMusica.innerText = '🔇';
                musicaReproduciendo = false;
            } else {
                musicaFondo.play();
                btnMusica.innerText = '🎵';
                musicaReproduciendo = true;
            }
        });
    }

    // Generador dinámico de flores en SVG (Estilo TikTok Resplandeciente)
    function generarCampoDeFlores(cantidad) {
        for (let i = 0; i < cantidad; i++) {
            const x = (1000 / (cantidad + 1)) * (i + 1) + (Math.random() * 30 - 15);
            const ySuelo = 550 + Math.random() * 20;
            const altoTallo = Math.random() * 180 + 160;
            const yFlor = ySuelo - altoTallo;
            const grosorTallo = Math.random() * 2 + 5;
            const delay = (Math.random() * 1.5 + 0.2).toFixed(2);

            const tallo = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const curvatura = (Math.random() - 0.5) * 50;
            tallo.setAttribute('d', `M ${x},${ySuelo} Q ${x + curvatura},${ySuelo - altoTallo / 2} ${x},${yFlor}`);
            tallo.setAttribute('class', 'tallo-tiktok');
            tallo.setAttribute('style', `stroke-width: ${grosorTallo}px; animation-delay: ${delay}s;`);
            grupoFlores.appendChild(tallo);

            if (Math.random() > 0.3) {
                const hoja = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const lado = Math.random() > 0.5 ? 1 : -1;
                hoja.setAttribute('d', `M ${x},${ySuelo - altoTallo * 0.4} C ${x + 30 * lado},${ySuelo - altoTallo * 0.5} ${x + 40 * lado},${ySuelo - altoTallo * 0.3} ${x},${ySuelo - altoTallo * 0.35}`);
                hoja.setAttribute('class', 'hoja-animada');
                hoja.setAttribute('style', `animation-delay: ${(parseFloat(delay) + 0.8).toFixed(2)}s;`);
                grupoFlores.appendChild(hoja);
            }

            const gFlor = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            gFlor.setAttribute('style', `transform-origin: ${x}px ${yFlor}px; animation-delay: ${(parseFloat(delay) + 1.2).toFixed(2)}s;`);

            dibujarFlorTikTok(gFlor, x, yFlor);
            grupoFlores.appendChild(gFlor);
        }
    }

    // Dibuja la flor de copa con halo de luz resplandeciente
    function dibujarFlorTikTok(grupo, cx, cy) {
        grupo.setAttribute('class', 'cabeza-flor flor-tiktok');

        const halo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        halo.setAttribute('cx', cx);
        halo.setAttribute('cy', cy - 5);
        halo.setAttribute('r', '28');
        halo.setAttribute('fill', 'rgba(255, 235, 59, 0.35)');
        grupo.appendChild(halo);

        const petaloAtras = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        petaloAtras.setAttribute('d', `M ${cx - 10},${cy} Q ${cx},${cy - 28} ${cx + 10},${cy}`);
        petaloAtras.setAttribute('fill', '#fff176');
        grupo.appendChild(petaloAtras);

        const petaloIzq = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        petaloIzq.setAttribute('d', `M ${cx - 2},${cy + 10} C ${cx - 28},${cy - 5} ${cx - 22},${cy - 22} ${cx - 5},${cy - 12}`);
        petaloIzq.setAttribute('fill', '#fdd835');
        grupo.appendChild(petaloIzq);

        const petaloDer = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        petaloDer.setAttribute('d', `M ${cx + 2},${cy + 10} C ${cx + 28},${cy - 5} ${cx + 22},${cy - 22} ${cx + 5},${cy - 12}`);
        petaloDer.setAttribute('fill', '#fdd835');
        grupo.appendChild(petaloDer);

        const copaCentro = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        copaCentro.setAttribute('d', `M ${cx - 16},${cy - 2} C ${cx - 12},${cy + 16} ${cx + 12},${cy + 16} ${cx + 16},${cy - 2} Q ${cx},${cy + 8} ${cx - 16},${cy - 2}`);
        copaCentro.setAttribute('fill', '#fbc02d');
        grupo.appendChild(copaCentro);

        const brilloCopa = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        brilloCopa.setAttribute('cx', cx);
        brilloCopa.setAttribute('cy', cy - 2);
        brilloCopa.setAttribute('rx', '14');
        brilloCopa.setAttribute('ry', '4');
        brilloCopa.setAttribute('fill', '#ffffff');
        brilloCopa.setAttribute('opacity', '0.85');
        grupo.appendChild(brilloCopa);
    }

    // Mariposas interactivas
    function iniciarMariposas() {
        mariposas.forEach((m, idx) => {
            moverMariposa(m);
            m.addEventListener('click', () => {
                crearDestellos(m);
                moverMariposa(m);
                mariposasTocadas.add(idx);
                comprobarSecretoMariposas();
            });
        });
    }

    function moverMariposa(mariposa) {
        const top = Math.random() * 50 + 15;
        const left = Math.random() * 80 + 10;
        mariposa.style.top = `${top}vh`;
        mariposa.style.left = `${left}vw`;
    }

    function crearDestellos(mariposa) {
        const rect = mariposa.getBoundingClientRect();
        for (let i = 0; i < 8; i++) {
            const destello = document.createElement('div');
            destello.classList.add('destello');
            destello.style.left = `${rect.left + rect.width / 2 + (Math.random() * 40 - 20)}px`;
            destello.style.top = `${rect.top + rect.height / 2 + (Math.random() * 40 - 20)}px`;
            document.body.appendChild(destello);

            setTimeout(() => destello.remove(), 1000);
        }
    }

    function comprobarSecretoMariposas() {
        if (mariposasTocadas.size >= 3 && !secretoDesbloqueado) {
            secretoDesbloqueado = true;
            ramoSecreto.style.display = 'flex';
            avisoDesbloqueo.style.display = 'block';

            setTimeout(() => {
                avisoDesbloqueo.style.display = 'none';
            }, 4500);
        }
    }

    // Lluvia de pétalos
    function crearLluviaDePetalos() {
        for (let i = 0; i < 25; i++) {
            const petalo = document.createElement('div');
            petalo.classList.add('petalo');
            
            petalo.style.width = `${Math.random() * 12 + 8}px`;
            petalo.style.height = `${Math.random() * 18 + 12}px`;
            petalo.style.left = `${Math.random() * 100}vw`;
            petalo.style.animationDuration = `${Math.random() * 4 + 4}s`;
            petalo.style.animationDelay = `${Math.random() * 5}s`;
            
            petalosContainer.appendChild(petalo);
        }
    }

    // Modal de notas
    ramos.forEach(ramo => {
        ramo.addEventListener('click', () => {
            const id = ramo.getAttribute('data-mensaje');
            if (mensajes[id]) {
                cartaTitulo.innerText = mensajes[id].titulo;
                cartaTexto.innerText = mensajes[id].texto;
                modalCarta.style.display = 'flex';
            }
        });
    });

    cerrarCarta.addEventListener('click', () => modalCarta.style.display = 'none');
    modalCarta.addEventListener('click', (e) => {
        if (e.target === modalCarta) modalCarta.style.display = 'none';
    });
});