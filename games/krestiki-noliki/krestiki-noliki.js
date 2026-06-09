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

let move = 1;



function getColor(index) {
    if (cells[index].style.backgroundImage == 'url("https://troglodit2.github.io/main_project/src/picture/krest.png")') {
        return 'krest';
    }
    if (cells[index].style.backgroundImage == 'url("https://troglodit2.github.io/main_project/src/picture/nolik.png")') {
        return 'nolik'; 
    }
    return 'null';
}



for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function () {
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
        console.log(getColor(0))

        if (getColor(0) == 'krest' && getColor(1) == 'krest' && getColor(2) == 'krest') {
            console.log('крестики пообедили');
        }
    })
    
}
