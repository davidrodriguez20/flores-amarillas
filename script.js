const boton = document.getElementById("boton");

const inicio = document.getElementById("inicio");

const jardin = document.getElementById("jardin");

const flores = document.getElementById("flores");

const mensaje = document.getElementById("mensaje");


boton.addEventListener("click", iniciarRegalo);


function iniciarRegalo() {

    inicio.style.opacity = "0";

    inicio.style.transform = "scale(1.1)";

    setTimeout(() => {

        inicio.style.display = "none";

        jardin.style.opacity = "1";

        crearFlores();

        setTimeout(() => {

            mensaje.style.opacity = "1";

            mensaje.style.transform =
                "translateX(-50%) translateY(0)";

        }, 3500);

    }, 1500);
}


function crearFlores() {

    const cantidades = 5;

    for (let i = 0; i < cantidades; i++) {

        setTimeout(() => {

            const flor = document.createElement("div");

            flor.classList.add("flor");

            flor.innerHTML = `

                <div class="tallo"></div>

                <div class="hoja hoja1"></div>

                <div class="hoja hoja2"></div>

                <div class="petalo p1"></div>
                <div class="petalo p2"></div>
                <div class="petalo p3"></div>
                <div class="petalo p4"></div>
                <div class="petalo p5"></div>
                <div class="petalo p6"></div>
                <div class="petalo p7"></div>
                <div class="petalo p8"></div>

                <div class="centro"></div>

            `;

            flores.appendChild(flor);

        }, i * 500);
    }
} 