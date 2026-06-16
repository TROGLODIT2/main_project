// Тут добавляются клетки доски в грид
let board = document.querySelector('.small_board');

for (let i = 1; i < 10; i++) {
    let cell = document.createElement('div');
    cell.setAttribute('id', `${i}`);
    cell.classList.add('cell');
    board.appendChild(cell);
    console.log('111');
}

// Добавление всех клеток в список
let cells = document.querySelectorAll('.cell');

//Задавание переменных смены хода и победы
let move = 1;
let win = 0;
let win_text = document.querySelector('.win_text');

//Функция для более удобной работы проверки победы
function getColor(index) {
    if (cells[index].style.backgroundImage == 'url("https://troglodit2.github.io/main_project/src/picture/krest.png")') {
        return 'krest';
    }
    if (cells[index].style.backgroundImage == 'url("https://troglodit2.github.io/main_project/src/picture/nolik.png")') {
        return 'nolik'; 
    }
    return 'null';
}

class WinChecker {
    constructor(winTextElement) {
        this.winLines = [
            { cells: [0, 1, 2], lineId: 'line-1' },
            { cells: [3, 4, 5], lineId: 'line-2' },
            { cells: [6, 7, 8], lineId: 'line-3' },
            { cells: [0, 3, 6], lineId: 'line-4' },
            { cells: [1, 4, 7], lineId: 'line-5' },
            { cells: [2, 5, 8], lineId: 'line-6' },
            { cells: [0, 4, 8], lineId: 'line-7' },
            { cells: [2, 4, 6], lineId: 'line-8' }
        ];
        this.winTextElement = winTextElement;
    }
    //Определение игрока
    checkWin(player) {
        let playerType = player === 'krest' ? 'krest' : 'nolik';
        
        
        for (let line of this.winLines) {
            if (this.checkLine(line.cells, player)) {
                this.showWinLine(line.lineId);
                this.showWinMessage(playerType);
                return true;
            }
        }
        return false;
    }

    checkLine(cells, player) {
        return cells.every(cell => getColor(cell) === player);
    }

    showWinLine(lineId) {
        let winLine = document.getElementById(lineId);
        if (winLine) {
            winLine.style.display = 'block';
        }
    }

    showWinMessage(playerType) {
        console.log(`${playerType.toLowerCase()} победили`);
        win = 1;
        this.winTextElement.style.display = 'block';
        // this.winTextElement.style.backgroundImage = `url("https://troglodit2.github.io/main_project/src/${playerType.toLowerCase()}.png")`;
        this.winTextElement.style.backgroundImage = `url("https://troglodit2.github.io/main_project/src/picture/${playerType.toLowerCase()}.png")`;
    }
}

let winChecker = new WinChecker(win_text);

class Cell {
    constructor(id, backround) {
        this.id = id;
        this.backround = backround;
    }
}

//Цикл игры
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function () {
        //Для смены хода
        if (win == 0) {
            if (cells[i].style.backgroundImage == '') {
                if (move == 1) {
                    cells[i].style.backgroundImage = 'url("https://troglodit2.github.io/main_project/src/picture/krest.png")';
                    cells[i].style.backgroundPosition = 'center';
                    cells[i].style.backgroundRepeat = 'no-repeat';
                    cells[i].style.backgroundSize = 'contain';
                    move = 2
                } else {
                    cells[i].style.backgroundImage = 'url("https://troglodit2.github.io/main_project/src/picture/nolik.png")';
                    cells[i].style.backgroundPosition = 'center';
                    cells[i].style.backgroundRepeat = 'no-repeat';
                    cells[i].style.backgroundSize = 'contain';
                    move = 1
                }
            }

            //Проверка победы
            if (!winChecker.checkWin('krest')) {
                winChecker.checkWin('nolik');
            }

        }
    })
    
}

let open_menu = false;
let open_menu_button = document.querySelector('.open_menu');

open_menu_button.addEventListener('click', function () {
    if (open_menu == false) {
        document.querySelector('.menu_items').style.display = 'block';
        open_menu = true;
    } else {
        document.querySelector('.menu_items').style.display = 'none';
        open_menu = false;
    }
})