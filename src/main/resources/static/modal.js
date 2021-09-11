

window.onload= function () {
    const modal_container = document.getElementById('modal_container');
    const close = document.getElementById('close');

    close.addEventListener('click', ()=>{
        alert("testsd");
        modal_container.classList.remove('show');
        document.getElementById("player").play();
        document.getElementById("Header").style.position = "relative";
        document.getElementById("Header").style.zIndex = "1";

        document.getElementById("Content").style.position = "relative";
        document.getElementById("Content").style.zIndex="1";
    });
}
