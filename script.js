document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton');
    const inicio = document.getElementById('inicio');
    const jardin = document.getElementById('jardin');
    const grupoFlores = document.getElementById('grupoFlores');
    const petalosContainer = document.getElementById('petalosContainer');

    const ramos = document.querySelectorAll('.ramo');
    const modalCarta = document.getElementById('modalCarta');
    const cerrarCarta = document.getElementById('cerrarCarta');
    const cartaTitulo = document.getElementById('cartaTitulo');
    const cartaTexto = document.getElementById('cartaTexto');

    const mariposas = document.querySelectorAll('.mariposa-interactiva');

    // Mensajes para las notas
    const mensajes = {
        1: {
            titulo: "Para ti... 🌻",
            texto: "No pude entregártelas de forma tradicional, asi que se me acurrio hacer este puqeño jardín ¿Fino verdad? :D"
        },
        2: {
            titulo: "Flores Amarillas ✨",
            texto: "Representan la alegría, la luz y la calidez que le das a quienes te rodean. Espero que este detalle te dibuje una gran sonrisa, omg"
        },
        3: {
            titulo: "Un pequeño detalle 💛",
            texto: "Cada flor, mariposa y pétalo en este espacio fueron programados especialmente para recordarte lo mucho que vales, sapa 🐸"
        }
    };

    // AL PULSAR "ABRIR REGALO"
    boton.addEventListener('click', () => {
        inicio.classList.add('oculto');
        
        setTimeout(() => {
            inicio.style.display = 'none';
            jardin.style.display = 'flex';
            setTimeout(() => {
                jardin.classList.add('activo');
                generarCampoDeFlores(18); // Genera 18 flores variadas
                crearLluviaDePetalos();
                iniciarMariposas();
            }, 50);
        }, 600);
    });

    // GENERADOR DINÁMICO DE DIVERSOS TIPOS DE FLORES AMARILLAS EN SVG
    function generarCampoDeFlores(cantidad) {
        const tiposFlores = ['girasol', 'margarita', 'tulipan', 'crisantemo', 'estrella'];
        
        for (let i = 0; i < cantidad; i++) {
            const x = (1000 / (cantidad + 1)) * (i + 1) + (Math.random() * 40 - 20);
            const ySuelo = 550 + Math.random() * 20;
            const altoTallo = Math.random() * 180 + 160;
            const yFlor = ySuelo - altoTallo;
            const grosorTallo = Math.random() * 3 + 5;
            const tipo = tiposFlores[Math.floor(Math.random() * tiposFlores.length)];
            const delay = (Math.random() * 1.5 + 0.2).toFixed(2);

            // Crear Tallo
            const tallo = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const curvatura = (Math.random() - 0.5) * 60;
            tallo.setAttribute('d', `M ${x},${ySuelo} Q ${x + curvatura},${ySuelo - altoTallo / 2} ${x},${yFlor}`);
            tallo.setAttribute('class', 'tallo-animado');
            tallo.setAttribute('style', `stroke-width: ${grosorTallo}px; animation-delay: ${delay}s;`);
            grupoFlores.appendChild(tallo);

            // Crear Hoja aleatoria
            if (Math.random() > 0.3) {
                const hoja = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const lado = Math.random() > 0.5 ? 1 : -1;
                hoja.setAttribute('d', `M ${x},${ySuelo - altoTallo * 0.4} C ${x + 30 * lado},${ySuelo - altoTallo * 0.5} ${x + 40 * lado},${ySuelo - altoTallo * 0.3} ${x},${ySuelo - altoTallo * 0.35}`);
                hoja.setAttribute('class', 'hoja-animada');
                hoja.setAttribute('style', `animation-delay: ${(parseFloat(delay) + 0.8).toFixed(2)}s;`);
                grupoFlores.appendChild(hoja);
            }

            // Crear Cabeza de Flor según tipo
            const gFlor = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            gFlor.setAttribute('class', 'cabeza-flor');
            gFlor.setAttribute('style', `transform-origin: ${x}px ${yFlor}px; animation-delay: ${(parseFloat(delay) + 1.2).toFixed(2)}s;`);

            dibujarTipoFlor(gFlor, x, yFlor, tipo);
            grupoFlores.appendChild(gFlor);
        }
    }

    // DIBUJA DIFERENTES MODELOS DE FLORES AMARILLAS EN EL SVG
    function dibujarTipoFlor(grupo, cx, cy, tipo) {
        const coloresPetalos = ['#fdd835', '#ffee58', '#fbc02d', '#f57f17', '#fff176'];
        
        if (tipo === 'girasol') {
            for (let i = 0; i < 12; i++) {
                const angulo = (i * 30) * Math.PI / 180;
                const px = cx + Math.cos(angulo) * 22;
                const py = cy + Math.sin(angulo) * 22;
                const petalo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                petalo.setAttribute('cx', px);
                petalo.setAttribute('cy', py);
                petalo.setAttribute('r', '11');
                petalo.setAttribute('fill', coloresPetalos[i % coloresPetalos.length]);
                grupo.appendChild(petalo);
            }
            const centro = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            centro.setAttribute('cx', cx);
            centro.setAttribute('cy', cy);
            centro.setAttribute('r', '18');
            centro.setAttribute('fill', '#4e342e');
            grupo.appendChild(centro);

        } else if (tipo === 'margarita') {
            for (let i = 0; i < 8; i++) {
                const angulo = (i * 45) * Math.PI / 180;
                const px = cx + Math.cos(angulo) * 16;
                const py = cy + Math.sin(angulo) * 16;
                const petalo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                petalo.setAttribute('cx', px);
                petalo.setAttribute('cy', py);
                petalo.setAttribute('r', '9');
                petalo.setAttribute('fill', '#fff59d');
                grupo.appendChild(petalo);
            }
            const centro = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            centro.setAttribute('cx', cx);
            centro.setAttribute('cy', cy);
            centro.setAttribute('r', '12');
            centro.setAttribute('fill', '#fbc02d');
            grupo.appendChild(centro);

        } else if (tipo === 'tulipan') {
            const petaloIzq = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            petaloIzq.setAttribute('d', `M ${cx},${cy + 15} C ${cx - 25},${cy} ${cx - 20},${cy - 25} ${cx - 8},${cy - 20}`);
            petaloIzq.setAttribute('fill', '#fbc02d');

            const petaloDer = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            petaloDer.setAttribute('d', `M ${cx},${cy + 15} C ${cx + 25},${cy} ${cx + 20},${cy - 25} ${cx + 8},${cy - 20}`);
            petaloDer.setAttribute('fill', '#fdd835');

            const petaloCentro = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            petaloCentro.setAttribute('d', `M ${cx - 12},${cy + 10} Q ${cx},${cy - 30} ${cx + 12},${cy + 10} Z`);
            petaloCentro.setAttribute('fill', '#ffee58');

            grupo.appendChild(petaloIzq);
            grupo.appendChild(petaloDer);
            grupo.appendChild(petaloCentro);

        } else { // Crisantemo / Estrella
            for (let i = 0; i < 6; i++) {
                const angulo = (i * 60) * Math.PI / 180;
                const petalo = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                petalo.setAttribute('cx', cx + Math.cos(angulo) * 12);
                petalo.setAttribute('cy', cy + Math.sin(angulo) * 12);
                petalo.setAttribute('rx', '15');
                petalo.setAttribute('ry', '7');
                petalo.setAttribute('fill', '#fdd835');
                petalo.setAttribute('transform', `rotate(${i * 60}, ${cx + Math.cos(angulo) * 12}, ${cy + Math.sin(angulo) * 12})`);
                grupo.appendChild(petalo);
            }
            const centro = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            centro.setAttribute('cx', cx);
            centro.setAttribute('cy', cy);
            centro.setAttribute('r', '8');
            centro.setAttribute('fill', '#e65100');
            grupo.appendChild(centro);
        }
    }

    // MARIPOSAS INTERACTIVAS (Mover al tocar)
    function iniciarMariposas() {
        mariposas.forEach((m, index) => {
            moverMariposa(m);
            m.addEventListener('click', () => {
                crearDestellos(m);
                moverMariposa(m);
            });
        });
    }

    function moverMariposa(mariposa) {
        const top = Math.random() * 50 + 15; // Mantener en zona visible alta
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

    // LLUVIA DE PÉTALOS
    function crearLluviaDePetalos() {
        for (let i = 0; i < 25; i++) {
            const petalo = document.createElement('div');
            petalo.classList.add('petalo');
            
            const ancho = Math.random() * 12 + 8;
            const alto = Math.random() * 18 + 12;
            
            petalo.style.width = `${ancho}px`;
            petalo.style.height = `${alto}px`;
            petalo.style.left = `${Math.random() * 100}vw`;
            petalo.style.animationDuration = `${Math.random() * 4 + 4}s`;
            petalo.style.animationDelay = `${Math.random() * 5}s`;
            
            petalosContainer.appendChild(petalo);
        }
    }

    // CARTA DE MENSAJES
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