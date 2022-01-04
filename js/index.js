document.title = "Tile Flip Game";

const log = console.log;
let theme = "";

const radio = document.getElementsByName("radio");
const btnStart = document.querySelector(".btn-start");

function handleClick() {
    radio.forEach(elem => {
        if (elem.checked) {
            theme = elem.value;
        }
    })
    btnStart.setAttribute("href", `/${theme}.html`);
}