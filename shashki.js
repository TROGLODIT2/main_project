// Тут добавляются клетки доски в грид
let board = document.querySelector('.board');
let color = 'white';

for (let i = 1; i < 65; i++) {
    let cell = document.createElement('div');
    
    if (color == 'white') {
        cell.setAttribute('class', 'white');
    } else {
        cell.setAttribute('class', 'black');
    }
    cell.classList.add('cell');
    board.appendChild(cell);
    if (i % 8 != 0) {
        if (color == 'white') {
            color = 'black';
        } else {
            color = 'white';
        }
    }
}

// Добавление всех клеток в список
let cells = document.querySelectorAll('.cell');

console.log(cells);

// Добавление номеров клеток в список
let cells_list = [];

for (let i = 0; i < cells.length; i++) {
    cells_list.push(i+1);
}

// Добавление названий клеток в список
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let cells_names = [];

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        cells_names.push(`${letters[j]}${i}`);
    }
}

// Добавление белых шашек на начальные позиции
let init_position = 40
let cell_init_mode = 1;

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 8; j += 2) {
        let checker = document.createElement('div');
        checker.classList.add('checker_white');
        cells[init_position + i*8 + j].appendChild(checker);
    }
    if (cell_init_mode == 1) {
        init_position += 1;
        cell_init_mode = 2;
    } else {
        init_position -= 1;
        cell_init_mode = 1;
    }
}

// Добавление черных шашек на начальные позиции
init_position = 1
cell_init_mode = 1;

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 8; j += 2) {
        let checker = document.createElement('div');
        checker.classList.add('checker_black');
        cells[init_position + i*8 + j].appendChild(checker);
    }
    if (cell_init_mode == 1) {
        init_position -= 1;
        cell_init_mode = 2;
    } else {
        init_position += 1;
        cell_init_mode = 1;
    }
}

// Ходы. 1 - белые, 2 - черные
let turn = 1;

chosen_checker = '';
let parent_cell = '';

// Добавление события выбора белой шашки (недоделано)
let white_checkers = document.querySelectorAll('.checker_white')
for (let i = 0; i < white_checkers.length; i++) {
    white_checkers[i].addEventListener('click', function () {
        if (turn == 1) {
            if (chosen_checker.parentElement != null) {
                parent_cell = chosen_checker.parentElement;
                parent_cell.style.backgroundColor = 'rgb(185, 118, 56)';
            }
            chosen_checker = white_checkers[i];
            parent_cell = chosen_checker.parentElement;
            parent_cell.style.backgroundColor = '#5cb334';
            // Добавить айди клеткам и записать в переменную айди
            // выбранной клетки
        }
    })
}
