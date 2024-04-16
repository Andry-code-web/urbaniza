// Espera a que el documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Muestra el loader
    document.querySelector('.contnt_loader').style.display = 'block';

    // Simula una carga de contenido después de 2 segundos
    setTimeout(function () {
        // Oculta el loader después de 2 segundos
        document.querySelector('.contnt_loader').style.display = 'none';
        // Remueve la clase "loading" para mostrar el contenido con una transición suave
        document.body.classList.remove('loading');
    }, 2500);
});