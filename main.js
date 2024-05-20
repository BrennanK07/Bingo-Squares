document.getElementById('generate-button').addEventListener('click', generateBingoCard);
document.getElementById('save-button').addEventListener('click', saveCard);
document.getElementById('load-button').addEventListener('click', loadCard);

let generatedCard = [];
let generatedCardColors = [];

function generateBingoCard() {
    generatedCard = [];
    if (words.length < 25) {
        alert('Not enough words in words array. Please ensure there are at least 25 words.');
        return;
    }
    shuffleArray(words);
    const bingoCard = document.getElementById('bingo-card');
    bingoCard.innerHTML = '';
    for (let i = 0; i < 25; i++) {
        const square = document.createElement('div');
        square.classList.add('bingo-square');
        square.setAttribute('id', i);

        square.textContent = words[i];
        generatedCard.push(words[i]);

        square.addEventListener('click', () => {
        square.classList.toggle('clicked');
        });
        bingoCard.appendChild(square);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function saveCard() {
    localStorage.setItem("boardTiles", JSON.stringify(generatedCard));

    generatedCardColors = [];
    for (let i = 0; i < 25; i++){
        let tile = document.getElementById(i);
        

        if (tile.className == "bingo-square clicked") {
            generatedCardColors.push(1);
        } else {
            generatedCardColors.push(0);
        }
    }

    localStorage.setItem("boardTilesColors", JSON.stringify(generatedCardColors));
}

function loadCard() {
    generatedCard = JSON.parse(localStorage.getItem("boardTiles"));
    generatedCardColors = JSON.parse(localStorage.getItem("boardTilesColors"))

    const bingoCard = document.getElementById('bingo-card');
    bingoCard.innerHTML = '';
    for (let i = 0; i < 25; i++) {
        const square = document.createElement('div');
        
        square.setAttribute('id', i);

        square.classList.add('bingo-square');
        if (generatedCardColors[i] == 1) {
            square.classList.toggle('clicked');
        }

        square.textContent = generatedCard[i];
        square.addEventListener('click', () => {
        square.classList.toggle('clicked');
        });
        bingoCard.appendChild(square);
    }
}