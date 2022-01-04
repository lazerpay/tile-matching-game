const log = console.log;
document.title = "Sports Arena";
const flipCards = document.querySelectorAll(".flip-card");

//SET POINTER EVENTS NONE UNTIL THE PLAYER CLICKS ON GO BUTTON
flipCards.forEach(card => {
    card.style.pointerEvents = "none";
});

//ON CLICKING GO BUTTON SAVE PLAYER NAME AND START THE TIMER
let playerName = "";
let currentPlayer = "";
const btnGo = document.querySelector(".btn-go");
const playerInput = document.querySelector("#input-player-name");
btnGo.addEventListener("click", () => {
    //check for empty player name
    if (playerInput.value === "") {
        alert("Name cannot be empty");
    }
    //check for whitespaces in the player name
    else if ((playerInput.value.indexOf(" ") >= 0)) {
        alert("White spaces are not allowed");
    }
    else {
        playerName = playerInput.value;
        currentPlayer = playerInput.value;
        flipCards.forEach(card => {
            card.style.pointerEvents = "auto";
        });
        timer();
    }
})


//IMAGE RANDOMIZATION
const cardBacks = document.querySelectorAll(".flip-card-back");

//Store the image sources in an array
const srcArray = [
    "/assets/sports/1.png",
    "/assets/sports/1.png",
    "/assets/sports/2.png",
    "/assets/sports/2.png",
    "/assets/sports/3.png",
    "/assets/sports/3.png",
    "/assets/sports/4.png",
    "/assets/sports/4.png",
    "/assets/sports/5.png",
    "/assets/sports/5.png",
    "/assets/sports/6.png",
    "/assets/sports/6.png",
    "/assets/sports/7.png",
    "/assets/sports/7.png",
    "/assets/sports/8.png",
    "/assets/sports/8.png",
];

//Store numbers equal to the number of image sources 
const set = new Set();
while (set.size < srcArray.length) {
    let random = Math.floor(Math.random() * 16);
    set.add(random);
}
const setArray = Array.from(set);

//Store the image elements in an array
const imgElementArray = [];
cardBacks.forEach(element => {
    imgElementArray.push(element.children[0]);
})

setArray.forEach((elem, index) => {
    imgElementArray[index].setAttribute('src', srcArray[elem]);
})


//GAME LOGIC
let tilesTurned = 0;
let clickCounter = 1;
let firstCard = "";
let secondCard = "";
let noOfTilesTurned = 0;


//function that will run if the cards do not match
function unflip() {
    firstCard.children[0].style.transform = "rotateY(360deg)";
    secondCard.children[0].style.transform = "rotateY(360deg)";

    flipCards.forEach(card => {
        card.style.pointerEvents = "auto";
    })
    return;
}


//card match logic
function match(card) {
    //save the image sources of the cards to be matched in a variable
    const firstImgSrc = firstCard.querySelector(".flip-card-back").children[0].getAttribute("src");
    const secondImgSrc = card.querySelector(".flip-card-back").children[0].getAttribute("src");
    secondCard = card;

    setTimeout(() => {

        //if cards match
        if (firstImgSrc === secondImgSrc) {
            //disable pointer events of the two matched cards
            firstCard.classList.add("disabled");
            card.classList.add("disabled");

            //restore the pointer events of the other cards for the game to continue
            for (let i = 0; i < flipCards.length; i++) {
                if (flipCards[i].classList.contains("disabled")) {
                    continue;
                }
                else {
                    flipCards[i].style.pointerEvents = "auto";
                }
            }
            tilesTurned += 2;
            //check whether all the cards have been flipped
            if (tilesTurned === srcArray.length) {
                return setWinner();
            }
        }

        //if cards do not match
        else if (firstImgSrc !== secondImgSrc) {
            unflip();
        }
    }, 1000);

    //reset the click counter for the game to continue
    clickCounter = 1;
    return;
}


//Set card properties for the flip
function setCardProps(card) {
    card.children[0].style.transform = "rotateY(180deg)";
    card.style.pointerEvents = "none";

    if (clickCounter === 1) {
        clickCounter++;
        firstCard = card;
        return;
    }
    else if (clickCounter === 2) {
        //disable the pointer events for all the cards until the matching of the two flipped cards is checked
        flipCards.forEach(card => {
            card.style.pointerEvents = "none";
        })
        return match(card);
    }
}


document.querySelector("#number").innerHTML = noOfTilesTurned;
//click event handler
function handleClick(card) {
    if (tilesTurned === srcArray.length) {
        return;
    }

    //INCREASE NO OF TILES TURNED IN EVERY FLIP
    noOfTilesTurned++;
    document.querySelector("#number").innerHTML = noOfTilesTurned;
    return setCardProps(card);
}


//TIMER
let time = document.querySelector("#time");
let initialTime = 80;
let count = initialTime;
time.innerHTML = count;
function timer() {
    let counter = setInterval(() => {
        count--;
        time.innerHTML = count;

        if (count === 0 && tilesTurned !== srcArray.length) {
            clearInterval(counter);
            return setLoser();
        }
        else if (tilesTurned === srcArray.length) {
            clearInterval(counter);
        }
    }, 1000);
};


//setWinner function
const winnerContainer = document.querySelector(".winner-container");
const winnerName = document.querySelector("#winner-name");
function setWinner() {
    winnerContainer.classList.add("show");
    flipCards.forEach(card => {
        card.style.pointerEvents = "none";
    })
    winnerName.innerHTML = currentPlayer + " !";
    document.querySelector("#time-taken").innerHTML = initialTime - count;
    document.querySelector("#tiles-turned").innerHTML = noOfTilesTurned;
    return updateStats();
}


//setLoser function
const loserContainer = document.querySelector(".loser-container");
const loserName = document.querySelector("#loser-name");
function setLoser() {
    loserContainer.classList.add("show");
    flipCards.forEach(card => {
        card.style.pointerEvents = "none";
    })
    loserName.innerHTML = currentPlayer + " !";
}


//Play Again function
const btnReplay = document.querySelector(".btn-replay");
btnReplay.addEventListener("click", () => {
    winnerContainer.classList.remove("show");
    flipCards.forEach(card => {
        card.style.pointerEvents = "auto";
        if (card.children[0].style.transform === "rotateY(180deg)") {
            card.children[0].style.transform = "rotateY(360deg)";
        }
    })
    playerInput.value = currentPlayer;
    count = initialTime;
    time.innerHTML = count;
    noOfTilesTurned = 0;
    document.querySelector("#number").innerHTML = noOfTilesTurned;
    tilesTurned = 0;
    return timer();
})


//Try Again function
const btnRestart = document.querySelector(".btn-restart");
btnRestart.addEventListener("click", () => {
    loserContainer.classList.remove("show");
    flipCards.forEach(card => {
        card.style.pointerEvents = "auto";
        if (card.children[0].style.transform === "rotateY(180deg)") {
            card.children[0].style.transform = "rotateY(360deg)";
        }
    })
    playerInput.value = currentPlayer;
    count = initialTime;
    time.innerHTML = count;
    noOfTilesTurned = 0;
    document.querySelector("#number").innerHTML = noOfTilesTurned;
    tilesTurned = 0;
    return timer();
})



//DATABASE STUFF
const res = db.collection("stats").get();
const doc = db.collection("stats").doc("statsDoc");
let dbArray = [];
res.then(snapshot => {
    dbArray = snapshot.docs[0].data().details;
})

function updateStats() {
    doc.update({
        details: [
            ...dbArray,
            {
                playerName: currentPlayer,
                tiles: noOfTilesTurned,
                time: initialTime - count
            } 
        ]
    })
}