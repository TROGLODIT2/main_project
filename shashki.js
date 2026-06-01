// Тут добавляются клетки доски в грид
let board = document.querySelector('.board');
let color = 'white';

for (let i = 1; i < 65; i++) {
    let cell = document.createElement('div');
    cell.setAttribute('id', `${i}`);
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

// Поля вокруг выбранной клетки
let chosen_checker = '';
let parent_cell = '';
let parent_id = '';
let move_cells = '';

// 1 - не нужно брать, 2 - нужно брать
let need_capture = 1;
let remaining_checkers = '';
let need_capture_again = 1;
let created_checker = '';
// 1 - нельзя идти, 2 - можно идти
let can_move = 1;

let upper_left_cell = '';
let upper_right_cell = '';
let lower_left_cell = '';
let lower_right_cell = '';

// Проверка необходимости взятия своими шашками
function check_need_capture(cell_color) {
    if (cell_color == 1) {
        remaining_checkers = document.querySelectorAll('.checker_white');
        for (let i = 0; i < remaining_checkers.length; i++) {
            parent_id_check = +remaining_checkers[i].parentElement.getAttribute('id');

            upper_left_cell = document.getElementById(parent_id_check - 9);
            upper_right_cell = document.getElementById(parent_id_check - 7);
            lower_left_cell = document.getElementById(parent_id_check + 7);
            lower_right_cell = document.getElementById(parent_id_check + 9);
            
            // Проверка шашек соперника
            if (upper_left_cell != null && upper_left_cell.querySelector('.checker_black') != null) {
                // Проверка на клетку 2 вертикали
                if ((parent_id_check - 2) % 8 != 0 && parent_id_check - 18 > 0) {
                    if (document.getElementById(parent_id_check - 18).querySelector('.checker_black') == null && document.getElementById(parent_id_check - 18).querySelector('.checker_white') == null) {
                        need_capture = 2;
                    }
                }
            }
            if (upper_right_cell != null && upper_right_cell.querySelector('.checker_black') != null) {
                // Проверка на клетку 7 вертикали
                if ((parent_id_check + 1) % 8 != 0 && parent_id_check - 14 > 0) {
                    if (document.getElementById(parent_id_check - 14).querySelector('.checker_black') == null && document.getElementById(parent_id_check - 14).querySelector('.checker_white') == null) {
                        need_capture = 2;
                    }
                }
            }
            if (lower_left_cell != null && lower_left_cell.querySelector('.checker_black') != null) {
                // Проверка на клетку 2 вертикали
                if ((parent_id_check - 2) % 8 != 0 && parent_id_check + 14 < 65) {
                    if (document.getElementById(parent_id_check + 14).querySelector('.checker_black') == null && document.getElementById(parent_id_check + 14).querySelector('.checker_white') == null) {
                        need_capture = 2;
                    }
                }
            }
            if (lower_right_cell != null && lower_right_cell.querySelector('.checker_black') != null) {
                // Проверка на клетку 7 вертикали
                if ((parent_id_check + 1) % 8 != 0 && parent_id_check + 18 < 65) {
                    if (document.getElementById(parent_id_check + 18).querySelector('.checker_black') == null && document.getElementById(parent_id_check + 18).querySelector('.checker_white') == null) {
                        need_capture = 2;
                    }
                }
            }
        }
    } else {
        remaining_checkers = document.querySelectorAll('.checker_black');
        for (let i = 0; i < remaining_checkers.length; i++) {
            parent_id_check = +remaining_checkers[i].parentElement.getAttribute('id');

            upper_left_cell = document.getElementById(parent_id_check - 9);
            upper_right_cell = document.getElementById(parent_id_check - 7);
            lower_left_cell = document.getElementById(parent_id_check + 7);
            lower_right_cell = document.getElementById(parent_id_check + 9);
            
            // Проверка шашек соперника
            if (upper_left_cell != null && upper_left_cell.querySelector('.checker_white') != null) {
                // Проверка на клетку 2 вертикали
                if ((parent_id_check - 2) % 8 != 0 && parent_id_check - 18 > 0) {
                    if (document.getElementById(parent_id_check - 18).querySelector('.checker_white') == null && document.getElementById(parent_id_check - 18).querySelector('.checker_black') == null) {
                        need_capture = 2;
                    }
                }
            }
            if (upper_right_cell != null && upper_right_cell.querySelector('.checker_white') != null) {
                // Проверка на клетку 7 вертикали
                if ((parent_id_check + 1) % 8 != 0 && parent_id_check - 14 > 0) {
                    if (document.getElementById(parent_id_check - 14).querySelector('.checker_white') == null && document.getElementById(parent_id_check - 14).querySelector('.checker_black') == null) {
                        need_capture = 2;
                    }
                }
            }
            if (lower_left_cell != null && lower_left_cell.querySelector('.checker_white') != null) {
                // Проверка на клетку 2 вертикали
                if ((parent_id_check - 2) % 8 != 0 && parent_id_check + 14 < 65) {
                    if (document.getElementById(parent_id_check + 14).querySelector('.checker_white') == null && document.getElementById(parent_id_check + 14).querySelector('.checker_black') == null) {
                        need_capture = 2;
                    }
                }
            }
            if (lower_right_cell != null && lower_right_cell.querySelector('.checker_white') != null) {
                // Проверка на клетку 7 вертикали
                if ((parent_id_check + 1) % 8 != 0 && parent_id_check + 18 < 65) {
                    if (document.getElementById(parent_id_check + 18).querySelector('.checker_white') == null && document.getElementById(parent_id_check + 18).querySelector('.checker_black') == null) {
                        need_capture = 2;
                    }
                }
            }
        }
    }
}

// Добавляет метки возможного хода на поле
function add_move_cells(parent_id, cell_color) {
    // Удаление ходов других шашек
    move_cells = document.querySelectorAll('.move_cell');
    for (let i = 0; i < move_cells.length; i++) {
        move_cells[i].classList.remove('move_cell');
    }

    parent_id = +parent_id;

    // Проверка на то, должна ли ходить эта шашка
    if (need_capture_again == 2) {
        if (parent_id == +created_checker.parentElement.getAttribute('id')) {
            can_move = 2;
        } else {
            can_move = 1;
        }
        console.log('продолжение хода');
    }
    need_capture = 1;
    
    console.log(can_move);
    console.log(need_capture_again);

    // cell_color 1 - белые, 2 - черные
    if (cell_color == 1 && (can_move == 2 && need_capture_again == 2 || need_capture_again == 1)) {
        

        // Проверка других шашек
        check_need_capture(1);

        upper_left_cell = document.getElementById(parent_id - 9);
        upper_right_cell = document.getElementById(parent_id - 7);
        lower_left_cell = document.getElementById(parent_id + 7);
        lower_right_cell = document.getElementById(parent_id + 9);

        // Проверка шашек соперника
        if (upper_left_cell != null && upper_left_cell.querySelector('.checker_black') != null) {
            // Проверка на клетку 2 вертикали
            if ((parent_id - 2) % 8 != 0 && parent_id - 18 > 0) {
                if (document.getElementById(parent_id - 18).querySelector('.checker_black') == null && document.getElementById(parent_id - 18).querySelector('.checker_white') == null) {
                    document.getElementById(parent_id - 18).classList.add('move_cell');
                    need_capture = 2;
                }
            }
        }
        if (upper_right_cell != null && upper_right_cell.querySelector('.checker_black') != null) {
            // Проверка на клетку 7 вертикали
            if ((parent_id + 1) % 8 != 0 && parent_id - 14 > 0) {
                if (document.getElementById(parent_id - 14).querySelector('.checker_black') == null && document.getElementById(parent_id - 14).querySelector('.checker_white') == null) {
                    document.getElementById(parent_id - 14).classList.add('move_cell');
                    need_capture = 2;
                }
            }
        }
        if (lower_left_cell != null && lower_left_cell.querySelector('.checker_black') != null) {
            // Проверка на клетку 2 вертикали
            if ((parent_id - 2) % 8 != 0 && parent_id + 14 < 65) {
                if (document.getElementById(parent_id + 14).querySelector('.checker_black') == null && document.getElementById(parent_id + 14).querySelector('.checker_white') == null) {
                    document.getElementById(parent_id + 14).classList.add('move_cell');
                    need_capture = 2;
                }
            }
        }
        if (lower_right_cell != null && lower_right_cell.querySelector('.checker_black') != null) {
            // Проверка на клетку 7 вертикали
            if ((parent_id + 1) % 8 != 0 && parent_id + 18 < 65) {
                if (document.getElementById(parent_id + 18).querySelector('.checker_black') == null && document.getElementById(parent_id + 18).querySelector('.checker_white') == null) {
                    document.getElementById(parent_id + 18).classList.add('move_cell');
                    need_capture = 2;
                }
            }
        }

        if (need_capture == 1 ) {
            // Проверка свободных полей
            // Левая верхняя клетка
            if (upper_left_cell != null && upper_left_cell.querySelector('.checker_white') == null && upper_left_cell.querySelector('.checker_black') == null) {
                // Проверка на левую крайнюю клетку
                if ((parent_id - 9) % 8 != 0 && parent_id - 9 > 0) {
                    upper_left_cell.classList.add('move_cell');
                }
            }
            // Правая верхняя клетка
            if (upper_right_cell != null && upper_right_cell.querySelector('.checker_white') == null && upper_right_cell.querySelector('.checker_black') == null) {
                // Проверка на правую крайнюю клетку
                if (parent_id % 8 != 0 && parent_id - 7 > 0) {
                    upper_right_cell.classList.add('move_cell');
                }
            }
        }
    } else if (cell_color == 2 && (can_move == 2 && need_capture_again == 2 || need_capture_again == 1)) {

        // Проверка других шашек
        check_need_capture(2);

        upper_left_cell = document.getElementById(parent_id - 9);
        upper_right_cell = document.getElementById(parent_id - 7);
        lower_left_cell = document.getElementById(parent_id + 7);
        lower_right_cell = document.getElementById(parent_id + 9);

        // Проверка шашек соперника
        if (upper_left_cell != null && upper_left_cell.querySelector('.checker_white') != null) {
            // Проверка на клетку 2 вертикали
            if ((parent_id - 2) % 8 != 0 && parent_id - 18 > 0) {
                if (document.getElementById(parent_id - 18).querySelector('.checker_white') == null && document.getElementById(parent_id - 18).querySelector('.checker_black') == null) {
                    document.getElementById(parent_id - 18).classList.add('move_cell');
                    need_capture = 2;
                }
            }
        }
        if (upper_right_cell != null && upper_right_cell.querySelector('.checker_white') != null) {
            // Проверка на клетку 7 вертикали
            if ((parent_id + 1) % 8 != 0 && parent_id - 14 > 0) {
                if (document.getElementById(parent_id - 14).querySelector('.checker_white') == null && document.getElementById(parent_id - 14).querySelector('.checker_black') == null) {
                    document.getElementById(parent_id - 14).classList.add('move_cell');
                    need_capture = 2;
                }
            }
        }
        if (lower_left_cell != null && lower_left_cell.querySelector('.checker_white') != null) {
            // Проверка на клетку 2 вертикали
            if ((parent_id - 2) % 8 != 0 && parent_id + 14 < 65) {
                if (document.getElementById(parent_id + 14).querySelector('.checker_white') == null && document.getElementById(parent_id + 14).querySelector('.checker_black') == null) {
                    document.getElementById(parent_id + 14).classList.add('move_cell');
                    need_capture = 2;
                }
            }
        }
        if (lower_right_cell != null && lower_right_cell.querySelector('.checker_white') != null) {
            // Проверка на клетку 7 вертикали
            if ((parent_id + 1) % 8 != 0 && parent_id + 18 < 65) {
                if (document.getElementById(parent_id + 18).querySelector('.checker_white') == null && document.getElementById(parent_id + 18).querySelector('.checker_black') == null) {
                    document.getElementById(parent_id + 18).classList.add('move_cell');
                    need_capture = 2;
                }
            }
        }

        if (need_capture == 1) {
            // Проверка свободных полей
            // Левая верхняя клетка
            if (lower_left_cell != null && lower_left_cell.querySelector('.checker_white') == null && lower_left_cell.querySelector('.checker_black') == null) {
                // Проверка на левую крайнюю клетку
                if ((parent_id + 7) % 8 != 0 && parent_id + 7 < 65) {
                    lower_left_cell.classList.add('move_cell');
                }
            }
            // Правая верхняя клетка
            if (lower_right_cell != null && lower_right_cell.querySelector('.checker_white') == null && lower_right_cell.querySelector('.checker_black') == null) {
                // Проверка на правую крайнюю клетку
                if (parent_id % 8 != 0 && parent_id + 9 < 65) {
                    lower_right_cell.classList.add('move_cell');
                }
            }
        }
    }
}

// Добавление события выбора белой шашки
let white_checkers = document.querySelectorAll('.checker_white')
for (let i = 0; i < white_checkers.length; i++) {
    white_checkers[i].addEventListener('click', function () {
        if (turn == 1) {
            if (chosen_checker.parentElement != null) {
                parent_cell = chosen_checker.parentElement;
                parent_cell.style.backgroundColor = '';
            }
            chosen_checker = white_checkers[i];
            parent_cell = chosen_checker.parentElement;
            parent_cell.style.backgroundColor = '#5cb334';
            parent_id = parent_cell.getAttribute('id'); // id клетки родителя

            if (can_move == 2) {
                need_capture == 2;
                console.log('Нужно продолжать ход');
            }

            add_move_cells(parent_id, 1);
        }
    })
}

// Добавление события выбора черной шашки
let black_checkers = document.querySelectorAll('.checker_black')
for (let i = 0; i < black_checkers.length; i++) {
    black_checkers[i].addEventListener('click', function () {
        if (turn == 2) {
            if (chosen_checker.parentElement != null) {
                parent_cell = chosen_checker.parentElement;
                parent_cell.style.backgroundColor = '';
            }
            chosen_checker = black_checkers[i];
            parent_cell = chosen_checker.parentElement;
            parent_cell.style.backgroundColor = '#5cb334';
            parent_id = parent_cell.getAttribute('id'); // id клетки родителя

            if (can_move == 2) {
                need_capture == 2;
                console.log('Нужно продолжать ход');
            }

            add_move_cells(parent_id, 2);
        }
    })
}

// Выбор клетки для хода
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function () {
        if (cells[i].classList.contains('move_cell') == true) {
            // Удаление ходящей шашки
            chosen_checker.remove();
            // Добавление новой шашки на месте хода
            let new_checker = document.createElement('div');
            created_checker = new_checker;

            // Добавление класса новой шашке и удаление взятой шашки
            if (turn==1) {
                new_checker.classList.add('checker_white');
                
                if (+parent_id == +cells[i].getAttribute('id') + 18) {
                    cells[+cells[i].getAttribute('id') + 8].querySelector('.checker_black').remove();
                }
                if (+parent_id == +cells[i].getAttribute('id') + 14) {
                    cells[+cells[i].getAttribute('id') + 6].querySelector('.checker_black').remove();
                }
                if (+parent_id == +cells[i].getAttribute('id') - 18) {
                    cells[+cells[i].getAttribute('id') - 10].querySelector('.checker_black').remove();
                }
                if (+parent_id == +cells[i].getAttribute('id') - 14) {
                    cells[+cells[i].getAttribute('id') - 8].querySelector('.checker_black').remove();
                }
            } else {
                new_checker.classList.add('checker_black');
                
                if (+parent_id == +cells[i].getAttribute('id') + 18) {
                    cells[+cells[i].getAttribute('id') + 8].querySelector('.checker_white').remove();
                }
                if (+parent_id == +cells[i].getAttribute('id') + 14) {
                    cells[+cells[i].getAttribute('id') + 6].querySelector('.checker_white').remove();
                }
                if (+parent_id == +cells[i].getAttribute('id') - 18) {
                    cells[+cells[i].getAttribute('id') - 10].querySelector('.checker_white').remove();
                }
                if (+parent_id == +cells[i].getAttribute('id') - 14) {
                    cells[+cells[i].getAttribute('id') - 8].querySelector('.checker_white').remove();
                }
            }
            cells[i].appendChild(new_checker);

            // Добавление события выбора новой шашки
            new_checker.addEventListener('click', function () {
                if (turn == 1 && new_checker.classList.contains('checker_white') == true) {
                    if (chosen_checker.parentElement != null) {
                        parent_cell = chosen_checker.parentElement;
                        parent_cell.style.backgroundColor = '';
                    }
                    chosen_checker = new_checker;
                    parent_cell = chosen_checker.parentElement;
                    parent_cell.style.backgroundColor = '#5cb334';
                    parent_id = parent_cell.getAttribute('id'); // id клетки родителя

                    if (can_move == 2) {
                        need_capture == 2;
                        console.log('Нужно продолжать ход');
                    }

                    add_move_cells(parent_id, 1);
                } else if (turn == 2 && new_checker.classList.contains('checker_black') == true) {
                    if (chosen_checker.parentElement != null) {
                        parent_cell = chosen_checker.parentElement;
                        parent_cell.style.backgroundColor = '';
                    }
                    chosen_checker = new_checker;
                    parent_cell = chosen_checker.parentElement;
                    parent_cell.style.backgroundColor = '#5cb334';
                    parent_id = parent_cell.getAttribute('id'); // id клетки родителя

                    if (can_move == 2) {
                        need_capture == 2;
                        console.log('Нужно продолжать ход');
                    }

                    add_move_cells(parent_id, 2);
                }
            })

            // Удаление ходов шашки
            move_cells = document.querySelectorAll('.move_cell');
            for (let i = 0; i < move_cells.length; i++) {
                move_cells[i].classList.remove('move_cell');
            }
            parent_cell.style.backgroundColor = '';

            // Проверка необходимости бить
            need_capture_again = 1;

            if (turn == 1 && need_capture == 2) {
                parent_id_check = +new_checker.parentElement.getAttribute('id');
    
                upper_left_cell = document.getElementById(parent_id_check - 9);
                upper_right_cell = document.getElementById(parent_id_check - 7);
                lower_left_cell = document.getElementById(parent_id_check + 7);
                lower_right_cell = document.getElementById(parent_id_check + 9);
                
                // Проверка шашек соперника
                if (upper_left_cell != null && upper_left_cell.querySelector('.checker_black') != null) {
                    // Проверка на клетку 2 вертикали
                    if ((parent_id_check - 2) % 8 != 0 && parent_id_check - 18 > 0) {
                        if (document.getElementById(parent_id_check - 18).querySelector('.checker_black') == null && document.getElementById(parent_id_check - 18).querySelector('.checker_white') == null) {
                            need_capture_again = 2;
                        }
                    }
                }
                if (upper_right_cell != null && upper_right_cell.querySelector('.checker_black') != null) {
                    // Проверка на клетку 7 вертикали
                    if ((parent_id_check + 1) % 8 != 0 && parent_id_check - 14 > 0) {
                        if (document.getElementById(parent_id_check - 14).querySelector('.checker_black') == null && document.getElementById(parent_id_check - 14).querySelector('.checker_white') == null) {
                            need_capture_again = 2;
                        }
                    }
                }
                if (lower_left_cell != null && lower_left_cell.querySelector('.checker_black') != null) {
                    // Проверка на клетку 2 вертикали
                    if ((parent_id_check - 2) % 8 != 0 && parent_id_check + 14 < 65) {
                        if (document.getElementById(parent_id_check + 14).querySelector('.checker_black') == null && document.getElementById(parent_id_check + 14).querySelector('.checker_white') == null) {
                            need_capture_again = 2;
                        }
                    }
                }
                if (lower_right_cell != null && lower_right_cell.querySelector('.checker_black') != null) {
                    // Проверка на клетку 7 вертикали
                    if ((parent_id_check + 1) % 8 != 0 && parent_id_check + 18 < 65) {
                        if (document.getElementById(parent_id_check + 18).querySelector('.checker_black') == null && document.getElementById(parent_id_check + 18).querySelector('.checker_white') == null) {
                            need_capture_again = 2;
                        }
                    }
                }
            } else if (turn == 2 && need_capture == 2) {
                parent_id_check = +new_checker.parentElement.getAttribute('id');
    
                upper_left_cell = document.getElementById(parent_id_check - 9);
                upper_right_cell = document.getElementById(parent_id_check - 7);
                lower_left_cell = document.getElementById(parent_id_check + 7);
                lower_right_cell = document.getElementById(parent_id_check + 9);
                
                // Проверка шашек соперника
                if (upper_left_cell != null && upper_left_cell.querySelector('.checker_white') != null) {
                    // Проверка на клетку 2 вертикали
                    if ((parent_id_check - 2) % 8 != 0 && parent_id_check - 18 > 0) {
                        if (document.getElementById(parent_id_check - 18).querySelector('.checker_white') == null && document.getElementById(parent_id_check - 18).querySelector('.checker_black') == null) {
                            need_capture_again = 2;
                        }
                    }
                }
                if (upper_right_cell != null && upper_right_cell.querySelector('.checker_white') != null) {
                    // Проверка на клетку 7 вертикали
                    if ((parent_id_check + 1) % 8 != 0 && parent_id_check - 14 > 0) {
                        if (document.getElementById(parent_id_check - 14).querySelector('.checker_white') == null && document.getElementById(parent_id_check - 14).querySelector('.checker_black') == null) {
                            need_capture_again = 2;
                        }
                    }
                }
                if (lower_left_cell != null && lower_left_cell.querySelector('.checker_white') != null) {
                    // Проверка на клетку 2 вертикали
                    if ((parent_id_check - 2) % 8 != 0 && parent_id_check + 14 < 65) {
                        if (document.getElementById(parent_id_check + 14).querySelector('.checker_white') == null && document.getElementById(parent_id_check + 14).querySelector('.checker_black') == null) {
                            need_capture_again = 2;
                        }
                    }
                }
                if (lower_right_cell != null && lower_right_cell.querySelector('.checker_white') != null) {
                    // Проверка на клетку 7 вертикали
                    if ((parent_id_check + 1) % 8 != 0 && parent_id_check + 18 < 65) {
                        if (document.getElementById(parent_id_check + 18).querySelector('.checker_white') == null && document.getElementById(parent_id_check + 18).querySelector('.checker_black') == null) {
                            need_capture_again = 2;
                        }
                    }
                }
            }

            if (need_capture_again == 1) {
                if (turn == 1) {
                    turn = 2;
                } else {
                    turn = 1;
                }
                need_capture = 1;
                can_move = 1;
                console.log('ход завершен');
                // Добавить тут проверку окончания партии
                // А также запись хода в таблицу
            }
        }
    })
}