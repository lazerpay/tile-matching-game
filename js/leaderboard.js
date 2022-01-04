let log = console.log;
const res = db.collection("stats").get();
const perTimeContainer = document.querySelector(".rank-container-per-time");
const perTilesContainer = document.querySelector(".rank-container-per-tiles");
let dbArray = [];


function setTimeContainer() {
    dbArray.sort((a, b) => {
        return a.time - b.time;
    })
    dbArray.forEach((elem, index) => {
        perTimeContainer.innerHTML +=
            `<div class="rank-number-container">
                <div class="rank-player-number-container">
                    <div class="center rank">${index + 1}</div>
                    <div class="center player-name">${elem.playerName}</div>
                </div>
                <div class="stats-number-container">
                    <div class="center time-taken">${elem.time} secs</div>
                    <div class="center tiles-turned">${elem.tiles}</div>
                </div>
            </div>`
    })
}

function setTilesContainer() {
    dbArray.sort((a, b) => {
        return a.tiles - b.tiles;
    })
    dbArray.forEach((elem, index) => {
        perTilesContainer.innerHTML +=
            `<div class="rank-number-container">
                <div class="rank-player-number-container">
                    <div class="center rank">${index + 1}</div>
                    <div class="center player-name">${elem.playerName}</div>
                </div>
                <div class="stats-number-container">
                <div class="center tiles-turned">${elem.tiles}</div>
                    <div class="center time-taken">${elem.time} secs</div>
                </div>
            </div>`
    })
}


res.then(snapshot => {
    dbArray = snapshot.docs[0].data().details;
    setTimeContainer();
    setTilesContainer();
    return;
})