// Тут добавляются клетки доски в родительский див
let board = document.querySelector('.board');
let color = 'white';

for (let i = 1; i < 65; i ++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    if (color == 'white') {
        cell.setAttribute('class', 'white');
    } else {
        cell.setAttribute('class', 'black');
    }
    cell.setAttribute('id', `${i}`);
    board.appendChild(cell);
    if (i % 8 != 0) {
        if (color == 'white') {
            color = 'black';
        } else {
            color = 'white';
        }
    }
}

