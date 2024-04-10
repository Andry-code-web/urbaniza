document.addEventListener("DOMContentLoaded", ()=>{
    const header_scroll = document.getElementById("header");    
    const logo_scroll = document.getElementById("logo");
    
    let noScroleo = 110;
    window.addEventListener('scroll', ()=>{
        let scroleo = window.pageYOffset || document.documentElement.scrollTop
        if (scroleo > noScroleo) {
            header_scroll.classList.add('active');
            logo_scroll.classList.add('active');
        } else {
            header_scroll.classList.remove('active');
            logo_scroll.classList.remove('active');
        }
    })
})