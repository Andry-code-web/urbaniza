document.addEventListener("DOMContentLoaded", () => {
    const header_scroll = document.getElementById("header");
    const logo_scroll = document.getElementById("logo");

    let noScroleo = 110;
    window.addEventListener('scroll', () => {
        let scroleo = window.pageYOffset || document.documentElement.scrollTop
        if (scroleo > noScroleo) {
            header_scroll.classList.add('active');
            logo_scroll.classList.add('active');
        } else {
            header_scroll.classList.remove('active');
            logo_scroll.classList.remove('active');
        }
    });


    const boton = document.getElementById("boton");
    const seleccionar = document.getElementById("seleccionar");

    boton.addEventListener("click", ()=>{
        seleccionar.classList.toggle("active");
    });


    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");
    const colors = [
        "#ffe2e2", "#ffd9d9", "#ffd0d0", "#ffc7c7", "#ffbebe", "#ffb5b5", "#ffacac", "#ffa3a3", "#ff9a9a", "#ff9191"
    ];

    circles.forEach(function (circle, index) {
        circle.x = 0;
        circle.y = 0;
        circle.style.backgroundColor = colors[index % colors.length];
    });

    window.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY + window.pageYOffset; // Ajusta la posición del mouse con el desplazamiento de la ventana
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach(function (circle, index) {
            circle.style.left = x - 12 + "px";
            circle.style.top = y - 12 + "px";

            circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();

})