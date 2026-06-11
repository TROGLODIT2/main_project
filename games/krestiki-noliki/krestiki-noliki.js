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

            //Проверка пообеды крестиков
            if (getColor(0) == 'krest' && getColor(1) == 'krest' && getColor(2) == 'krest') {
                let win_line = document.getElementById('line-1');
                win_line.style.display = 'block';
                console.log('крестики победили');
                win = 1;
                win_text.style.display = 'block';
                win_text.innerHTML = '<h4 class = "win_text_h4">Крестики победили!</h4>';
            }
            if (getColor(3) == 'krest' && getColor(4) == 'krest' && getColor(5) == 'krest') {
                let win_line = document.getElementById('line-2');
                win_line.style.display = 'block';
                console.log('крестики победили');
                win = 1;
                win_text.style.display = 'block';
            }
            if (getColor(6) == 'krest' && getColor(7) == 'krest' && getColor(8) == 'krest') {
                let win_line = document.getElementById('line-3');
                win_line.style.display = 'block';
                console.log('крестики победили');
                win = 1;
                win_text.style.display = 'block';
            }
            if (getColor(0) == 'krest' && getColor(3) == 'krest' && getColor(6) == 'krest') {
                let win_line = document.getElementById('line-4');
                win_line.style.display = 'block';
                console.log('крестики победили');
                win = 1;
                win_text.style.display = 'block';
            }
            if (getColor(1) == 'krest' && getColor(4) == 'krest' && getColor(7) == 'krest') {
                let win_line = document.getElementById('line-5');
                win_line.style.display = 'block';
                console.log('крестики победили');
                win = 1;
                win_text.style.display = 'block';
            }
            if (getColor(2) == 'krest' && getColor(5) == 'krest' && getColor(8) == 'krest') {
                let win_line = document.getElementById('line-6');
                win_line.style.display = 'block';
                console.log('крестики победили');
                win = 1;
                win_text.style.display = 'block';
            }
            if (getColor(0) == 'krest' && getColor(4) == 'krest' && getColor(8) == 'krest') {
                let win_line = document.getElementById('line-7');
                win_line.style.display = 'block';
                console.log('крестики победили');
                win = 1;
                win_text.style.display = 'block';
            }
            if (getColor(2) == 'krest' && getColor(4) == 'krest' && getColor(6) == 'krest') {
                let win_line = document.getElementById('line-8');
                win_line.style.display = 'block';
                console.log('крестики победили');
                win = 1;
                win_text.style.display = 'block';
            }
            
            //Проверка победы ноликов
            if (getColor(0) == 'nolik' && getColor(1) == 'nolik' && getColor(2) == 'nolik') {
                let win_line = document.getElementById('line-1');
                win_line.style.display = 'block';
                console.log('нолики победили');
                win = 1;
                win_text.style.display = 'block';
            }
            if (getColor(3) == 'nolik' && getColor(4) == 'nolik' && getColor(5) == 'nolik') {
                let win_line = document.getElementById('line-2');
                win_line.style.display = 'block';
                console.log('нолики победили');
                win = 1;
                win_text.style.display = 'block';
            }
            if (getColor(6) == 'nolik' && getColor(7) == 'nolik' && getColor(8) == 'nolik') {
                let win_line = document.getElementById('line-3');
                win_line.style.display = 'block';
                console.log('нолики победили');
                win = 1;
                win_text.style.display = 'block';
            }
            if (getColor(0) == 'nolik' && getColor(3) == 'nolik' && getColor(6) == 'nolik') {
                let win_line = document.getElementById('line-4');
                win_line.style.display = 'block';
                console.log('нолики победили');
                win = 1;
                win_text.style.display = 'block';
            }
            if (getColor(1) == 'nolik' && getColor(4) == 'nolik' && getColor(7) == 'nolik') {
                let win_line = document.getElementById('line-5');
                win_line.style.display = 'block';
                console.log('нолики победили');
                win = 1;
                win_text.style.display = 'block';
            }
            if (getColor(2) == 'nolik' && getColor(5) == 'nolik' && getColor(8) == 'nolik') {
                let win_line = document.getElementById('line-6');
                win_line.style.display = 'block';
                console.log('нолики победили');
                win = 1;
                win_text.style.display = 'block';
            }
            if (getColor(0) == 'nolik' && getColor(4) == 'nolik' && getColor(8) == 'nolik') {
                let win_line = document.getElementById('line-7');
                win_line.style.display = 'block';
                console.log('нолики победили');
                win = 1;
                win_text.style.display = 'block';
            }
            if (getColor(2) == 'nolik' && getColor(4) == 'nolik' && getColor(6) == 'nolik') {
                let win_line = document.getElementById('line-8');
                win_line.style.display = 'block';
                console.log('нолики победили');
                win = 1;
                win_text.style.display = 'block';
            }
        }
    })
    
}
