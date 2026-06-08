// Тут добавляются клетки доски в грид
let board = document.querySelector('.board');

for (let i = 1; i < 10; i++) {
    let cell = document.createElement('div');
    cell.setAttribute('id', `${i}`);
    cell.classList.add('cell');
    board.appendChild(cell);
}

// Добавление всех клеток в список
let cells = document.querySelectorAll('.cell');