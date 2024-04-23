document.addEventListener("DOMContentLoaded", function () {
    const copiarBoton = document.getElementById("copiar_url");
    const urlAcortada = document.getElementById("url_acortada");

    copiarBoton.addEventListener("click", function () {
        // Crear un rango de selección
        const range = document.createRange();
        range.selectNode(urlAcortada);

        // Seleccione el texto dentro del rango
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        // Copiar el texto seleccionado al portapapeles
        document.execCommand("copy");

        // Limpiar la selección
        window.getSelection().removeAllRanges();

        // Cambiar el texto del botón después de copiar
        copiarBoton.innerHTML = "<i class='bi bi-check2-square'></i>";
        // Restaurar el texto del botón después de 2 segundos
        setTimeout(function () {
            copiarBoton.innerHTML = "<i class='bi bi-copy'></i>";
        }, 2000);
    });
});

function pres_btn(event) {
    // Encuentra los elementos específicos dentro del contenedor del botón que fue presionado
    const tarjeta = document.querySelector('.carta');
    const fondo_activo = document.getElementById('fondo');
    const body = document.querySelector('body');

    // Agrega la clase 'active' a la tarjeta y al fondo
    tarjeta.classList.add('active');
    fondo_activo.classList.add('active');

    // Agrega la clase 'active-scroll-lock' al body para bloquear el scroll
    body.classList.add("active-scroll-lock");

    // Encuentra el botón de cerrar dentro de la tarjeta y agrega un event listener para cerrar la tarjeta
    const btn_cerrar = tarjeta.querySelector('.cerrar');
    btn_cerrar.addEventListener("click", () => {
        // Quita la clase 'active' de la tarjeta y del fondo
        tarjeta.classList.remove('active');
        fondo_activo.classList.remove('active');

        // Quita la clase 'active-scroll-lock' del body para permitir el scroll
        body.classList.remove('active-scroll-lock');
    });


    /* EXTRAER Y CAMBIAR EL PARRAFO */
    const boton = event.target; // El botón que fue presionado
    const parrafo = boton.closest('.contratos').querySelector('p'); // Encuentra el párrafo dentro del contenedor del botón
    if (parrafo) {
        const texto = parrafo.textContent; // Obtiene el texto del párrafo
        const parafo_text = document.getElementById("parafo_text");
        if (parafo_text) {
            parafo_text.textContent = texto; // Asigna el texto al elemento con id "parafo_text"
        } else {
            console.error("El elemento con id 'parafo_text' no se encontró.");
        }
    } else {
        console.error("El párrafo no se encontró dentro del contenedor del botón.");
    }

    /* GENERAR QR */
    const enlace = boton.closest('.contratos').querySelector('a');
    if (enlace) {
        const longUrl = enlace.getAttribute("href");
        const contenedor_qr = document.getElementById("img_qr");
        contenedor_qr.innerHTML = ""; // Limpiar el contenedor antes de generar un nuevo código QR

        const QR = new QRCode(contenedor_qr);
        QR.makeCode(longUrl);
    } else {
        console.error("El enlace no se encontró dentro del contenedor del botón.");
    }

    /* ACORTAR URL */
    if (enlace) {
        const longUrl = enlace.getAttribute("href");
        const contenedor_qr = document.getElementById("img_qr");
        contenedor_qr.innerHTML = ""; // Limpiar el contenedor antes de generar un nuevo código QR

        const QR = new QRCode(contenedor_qr);
        QR.makeCode(longUrl);

        const add_url = document.getElementById("url_acortada");
        const btn_descargar = document.getElementById("btn_descargar");
        acortarURL(longUrl)
            .then(shortUrl => {
                console.log("URL acortada:", shortUrl);
                add_url.innerText = shortUrl;
                add_url.href = shortUrl;
                btn_descargar.href = shortUrl;
            })
            .catch(error => {
                console.error("Error al acortar la URL:", error);
            });
    } else {
        console.error("El enlace no se encontró dentro del contenedor del botón.");
    }



}

function acortarURL(longUrl) {
    const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud de acortar URL");
            }
            return response.text();
        });
}

