// Тут добавляются клетки доски в грид
let board = document.querySelector('.board');

for (let i = 1; i < 10; i++) {
    let cell = document.createElement('div');
    cell.setAttribute('id', `${i}`);
    cell.classList.add('cell');
    board.appendChild(cell);
    console.log('111');
}

// Добавление всех клеток в список
let cells = document.querySelectorAll('.cell');


for (let i = 0; i < cells.length; i++) {
    console.log(cells[i])
    cells[i].addEventListener('click', function () {
        cells[i].style.backroundImage = 'url(https://troglodit2.github.io/main_project/src/picture/krest.png)';
    })
}