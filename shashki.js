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
// 1 - не дамка, 2 - дамка
let is_king = false;

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
let need_capture_again_king = false;
// 1 - нельзя идти, 2 - можно идти
let can_move = 1;

// Список шашек взятых дамкой
let captured_checkers = [];

// Неактуально удалить позже
let upper_left_cell = '';
let upper_right_cell = '';
let lower_left_cell = '';
let lower_right_cell = '';

function check_checker(direction, lines, color_check, cell_id) {
    let check_cell = '';
    if (direction == 'topleft') {
        check_cell = cell_id - 9 * lines;
    } else if (direction == 'topright') {
        check_cell = cell_id - 7 * lines;
    } else if (direction == 'bottomleft') {
        check_cell = cell_id + 7 * lines;
    } else if (direction == 'bottomright') {
        check_cell = cell_id + 9 * lines;
    }
    check_cell = document.getElementById(check_cell);

    let check_selector = '';
    if (color_check == 'white') {
        check_selector = '.checker_white';
    } else if (color_check == 'black') {
        check_selector = '.checker_black';
    }
    
    if (check_cell != null && check_cell.querySelector(check_selector) != null) {
        return true
    } else {
        return false
    }
}

function check_cell_correct(direction, cell_id) {
    if (direction == 'left') {
        if ((cell_id + 6) % 8 != 0 && cell_id > 0 && cell_id < 65) {
            return true
        } else {
            return false
        }
    } else if (direction == 'right') {
        if ((cell_id + 1) % 8 != 0 && cell_id > 0 && cell_id < 65) {
            return true
        } else {
            return false
        }
    }
        
}

function check_free_cell(direction, lines, cell_id) {
    let check_cell = '';
    if (direction == 'topleft') {
        check_cell = cell_id - 9 * lines;
    } else if (direction == 'topright') {
        check_cell = cell_id - 7 * lines;
    } else if (direction == 'bottomleft') {
        check_cell = cell_id + 7 * lines;
    } else if (direction == 'bottomright') {
        check_cell = cell_id + 9 * lines;
    }

    check_cell = document.getElementById(check_cell);

    if (check_cell != null && check_cell.querySelector('.checker_white') == null && check_cell.querySelector('.checker_black') == null) {
        return true
    } else {
        return false
    }
}

function check_edge_cell(direction, lines, cell_id) {
    // Настроить проверку на крайние клетки доски
    let check_cell = '';
    if (direction == 'topleft') {
        check_cell = cell_id - 9 * lines;
        if (check_cell < 9 || (check_cell + 7) % 8 == 0) {
            return true
        } else {
            return false
        }
    } else if (direction == 'topright') {
        check_cell = cell_id - 7 * lines;
        if (check_cell < 9 || check_cell % 8 == 0) {
            return true
        } else {
            return false
        }
    } else if (direction == 'bottomleft') {
        check_cell = cell_id + 7 * lines;
        if (check_cell > 56 || (check_cell + 7) % 8 == 0) {
            return true
        } else {
            return false
        }
    } else if (direction == 'bottomright') {
        check_cell = cell_id + 9 * lines;
        if (check_cell > 56 || check_cell % 8 == 0) {
            return true
        } else {
            return false
        }
    }
    
}

function add_move_checker(direction, lines, cell_id) {
    if (direction == 'topleft') {
        document.getElementById(cell_id - 9 * lines).classList.add('move_cell');
    } else if (direction == 'topright') {
        document.getElementById(cell_id - 7 * lines).classList.add('move_cell');
    } else if (direction == 'bottomleft') {
        document.getElementById(cell_id + 7 * lines).classList.add('move_cell');
    } else if (direction == 'bottomright') {
        document.getElementById(cell_id + 9 * lines).classList.add('move_cell');
    }
}

function check_checker_capture(direction, color_checker, cell_id, add_move) {
    let side_check = '';
    if (direction == 'topleft' || direction == 'bottomleft') {
        side_check = 'left';
    } else if (direction == 'topright' || direction == 'bottomright') {
        side_check = 'right';
    }
    
    let color_check = '';
    if (color_checker == 'white') {
        color_check = 'black';
    } else if (color_checker == 'black') {
        color_check = 'white';
    }
    // Проверка необходимости бить у обычной шашки
    if (check_checker(direction, 1, color_check, cell_id) == true) {
        if (check_cell_correct(side_check, cell_id) == true) {
            if (check_free_cell(direction, 2, cell_id) == true) {
                need_capture = 2;
                console.log('Тест');
                console.log(add_move);
                if (add_move == true) {
                    add_move_checker(direction, 2, cell_id);
                }
            }
        }
    }
}

function check_king_capture_return(direction, color_checker, cell_id) {
    let color_check = '';
    if (color_checker == 'white') {
        color_check = 'black';
    } else if (color_checker == 'black') {
        color_check = 'white';
    }

    let is_checker = false;
    // Проверка клетки на крайнюю
    if (check_edge_cell(direction, 0, cell_id) == false) {
        for (let j = 1; j < 8; j ++) {
            if (check_checker(direction, j, color_checker, cell_id) == false) {
                if (is_checker == false) {
                    // До встречи шашки противника
                    if (check_checker(direction, j, color_check, cell_id) == true) {
                        is_checker = true;
                    }
                } else if (is_checker == true) {
                    // Проверка свободной клетки после шашки противника
                    if (check_free_cell(direction, j, cell_id) == true) {
                        return true
                    } else {
                        return false
                    }
                }
                
                // Проверка клетки на крайнюю
                if (check_edge_cell(direction, j, cell_id) == true) {
                    return false
                }
            } else {
                return false
            }
        }
    } else {
        return false
    }
}

function check_capture(direction, color_checker, lines, cell_id) {
    let check_cell = '';
    if (direction == 'topleft') {
        check_cell = cell_id - 9 * lines;

        if (check_king_capture_return('bottomleft', color_checker, check_cell)) {
            return true
        }
        if (check_king_capture_return('topright', color_checker, check_cell)) {
            return true
        }
    } else if (direction == 'topright') {
        check_cell = cell_id - 7 * lines;

        if (check_king_capture_return('topleft', color_checker, check_cell)) {
            return true
        }
        if (check_king_capture_return('bottomright', color_checker, check_cell)) {
            return true
        }
    } else if (direction == 'bottomleft') {
        check_cell = cell_id + 7 * lines;

        if (check_king_capture_return('topleft', color_checker, check_cell)) {
            return true
        }
        if (check_king_capture_return('bottomright', color_checker, check_cell)) {
            return true
        }
    } else if (direction == 'bottomright') {
        check_cell = cell_id + 9 * lines;

        if (check_king_capture_return('topright', color_checker, check_cell)) {
            return true
        }
        if (check_king_capture_return('bottomleft', color_checker, check_cell)) {
            return true
        }
    }
    return false
    
}

function check_diagonal_captures(direction, color_checker, lines, cell_id, add_move) {
    let check_cell = '';
    if (direction == 'topleft') {
        check_cell = cell_id - 9 * lines;
    } else if (direction == 'topright') {
        check_cell = cell_id - 7 * lines;
    } else if (direction == 'bottomleft') {
        check_cell = cell_id + 7 * lines;
    } else if (direction == 'bottomright') {
        check_cell = cell_id + 9 * lines;
    }

    if (check_edge_cell(direction, 0, check_cell) == false) {
        for (let j = 0; j < 8; j++) {
            // Проверка на шашку
            if (check_free_cell(direction, j, check_cell) == false) {
                break
            }

            // Проверка диагоналей
            if (check_capture(direction, color_checker, j, check_cell) == true) {
                need_capture_again_king = true;
            }
            if (add_move == true) {

                if (need_capture_again_king == true) {
                    if (check_capture(direction, color_checker, j, check_cell) == true) {
                        add_move_checker(direction, j, check_cell);
                    }
                } else {
                    add_move_checker(direction, j, check_cell);
                }
            }
            
            // Проверка на край доски
            if (check_edge_cell(direction, j, check_cell) == true) {
                break
            }
        }
    }
}

function check_king_capture(direction, color_checker, cell_id, add_move) {
    let color_check = '';
    if (color_checker == 'white') {
        color_check = 'black';
    } else if (color_checker == 'black') {
        color_check = 'white';
    }

    need_capture_again_king = false;
    let is_checker = false;
    let free_cell_after = false;
    // Проверка клетки на крайнюю
    if (check_edge_cell(direction, 0, cell_id) == false) {
        for (let j = 1; j < 8; j ++) {
            if (check_checker(direction, j, color_checker, cell_id) == false) {
                if (is_checker == false && free_cell_after == false) {
                    // До встречи шашки противника
                    if (check_checker(direction, j, color_check, cell_id) == true) {
                        is_checker = true;
                    } else {
                        if (add_move == true) {
                            if (need_capture == 1) {
                                // Добавление ходов если не нужно бить
                                add_move_checker(direction, j, cell_id);
                            }
                        }
                    }
                } else if (is_checker == true && free_cell_after == false) {
                    // Проверка свободной клетки после шашки противника
                    if (check_free_cell(direction, j, cell_id) == true) {
                        free_cell_after = true;
                    } else {
                        break
                    }
                }
                if (is_checker == true && free_cell_after == true) {
                    // Когда пройдена шашка противника и после нее есть свободная клетка
                    if (check_checker(direction, j, color_check, cell_id) == true) {
                        break
                    } else {
                        if (add_move == true) {
                            // Добавить событие взятия дамкой
                            // Проверка диагонаей
                            check_diagonal_captures(direction, color_checker, j, cell_id, false);
                            check_diagonal_captures(direction, color_checker, j, cell_id, true);
                        }
                        need_capture = 2;
                    }
                }
                // Проверка клетки на крайнюю
                if (check_edge_cell(direction, j, cell_id) == true) {
                    break
                }
            } else {
                break
            }
        }
    }
}

function check_checker_moves(direction, cell_id) {
    if (check_checker(direction, 1, 'white', cell_id) == false && check_checker(direction, 1, 'black', cell_id) == false) {
        // Проверка на левую крайнюю клетку
        if (check_edge_cell(direction, 0, cell_id) == false) {
            add_move_checker(direction, 1, cell_id)
        }
    }
}

function delete_checker(direction, color_check, lines, cell_id) {
    // ИСПРАВИТЬ НИЖНИЕ НАПРАВЛЕНИЯ
    let check_cell = '';

    let check_selector = '';
    if (color_check == 'white') {
        check_selector = '.checker_white';
    } else if (color_check == 'black') {
        check_selector = '.checker_black';
    }

    cell_id = +cell_id;
    console.log(direction);
    console.log(cell_id);
    console.log('Результати');
    console.log(check_edge_cell(direction, 0, cell_id));

    if (check_edge_cell(direction, 0, cell_id) == false) { // Проверка на край
        console.log('Клетка не на краю');
        console.log(lines);
        for (let j = 1; j < lines; j++) {
            if (direction == 'topleft') {
                check_cell = cell_id - 9 * j;
            } else if (direction == 'topright') {
                check_cell = cell_id - 7 * j;
            } else if (direction == 'bottomleft') {
                check_cell = cell_id + 7 * j;
            } else if (direction == 'bottomright') {
                check_cell = cell_id + 9 * j;
            }
            console.log(check_cell);
            console.log(check_checker(direction, j, color_check, cell_id));

            // Удаление шашки
            if (check_checker(direction, j, color_check, cell_id) == true) {
                document.getElementById(check_cell).querySelector(check_selector).remove();
                console.log('Удалена шашка на клетке', check_cell);
                break
            }
            // Проверка на край
            if (check_edge_cell(direction, j, cell_id) == true) {
                break
            }
        }
    }
}

// Проверка необходимости взятия своими шашками
function check_need_capture(cell_color) {
    if (cell_color == 1) {
        remaining_checkers = document.querySelectorAll('.checker_white');
        for (let i = 0; i < remaining_checkers.length; i++) {
            parent_id_check = +remaining_checkers[i].parentElement.getAttribute('id');
            if (remaining_checkers[i].classList.contains('king') == false) {
                // Проверка необходимости бить
                check_checker_capture('topleft', 'white', parent_id_check, false);
                check_checker_capture('topright', 'white', parent_id_check, false);
                check_checker_capture('bottomleft', 'white', parent_id_check, false);
                check_checker_capture('bottomright', 'white', parent_id_check, false);
            } else {
                check_king_capture('topleft', 'white', parent_id_check, false);
                check_king_capture('topright', 'white', parent_id_check, false);
                check_king_capture('bottomleft', 'white', parent_id_check, false);
                check_king_capture('bottomright', 'white', parent_id_check, false);
            }
            
        }
    } else {
        remaining_checkers = document.querySelectorAll('.checker_black');
        for (let i = 0; i < remaining_checkers.length; i++) {
            parent_id_check = +remaining_checkers[i].parentElement.getAttribute('id');

            if (remaining_checkers[i].classList.contains('king') == false) {
                // Проверка необходимости бить
                check_checker_capture('topleft', 'black', parent_id_check, false);
                check_checker_capture('topright', 'black', parent_id_check, false);
                check_checker_capture('bottomleft', 'black', parent_id_check, false);
                check_checker_capture('bottomright', 'black', parent_id_check, false);

            } else {
                check_king_capture('topleft', 'black', parent_id_check, false);
                check_king_capture('topright', 'black', parent_id_check, false);
                check_king_capture('bottomleft', 'black', parent_id_check, false);
                check_king_capture('bottomright', 'black', parent_id_check, false);
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

        if (cells[parent_id-1].querySelector('.checker_white').classList.contains('king') == false) {
            check_checker_capture('topleft', 'white', parent_id, true);
            check_checker_capture('topright', 'white', parent_id, true);
            check_checker_capture('bottomleft', 'white', parent_id, true);
            check_checker_capture('bottomright', 'white', parent_id, true);
            
            if (need_capture == 1) {
                check_checker_moves('topleft', parent_id);
                check_checker_moves('topright', parent_id);
            }
        } else {
            check_king_capture('topleft', 'white', parent_id, true);
            check_king_capture('topright', 'white', parent_id, true);
            check_king_capture('bottomleft', 'white', parent_id, true);
            check_king_capture('bottomright', 'white', parent_id, true);
        }
        
    } else if (cell_color == 2 && (can_move == 2 && need_capture_again == 2 || need_capture_again == 1)) {

        // Проверка других шашек
        check_need_capture(2);
        
        if (cells[parent_id-1].querySelector('.checker_black').classList.contains('king') == false) {
            check_checker_capture('topleft', 'black', parent_id, true);
            check_checker_capture('topright', 'black', parent_id, true);
            check_checker_capture('bottomleft', 'black', parent_id, true);
            check_checker_capture('bottomright', 'black', parent_id, true);

            if (need_capture == 1) {
                check_checker_moves('bottomleft', parent_id);
                check_checker_moves('bottomright', parent_id);
            }
        } else {
            check_king_capture('topleft', 'black', parent_id, true);
            check_king_capture('topright', 'black', parent_id, true);
            check_king_capture('bottomleft', 'black', parent_id, true);
            check_king_capture('bottomright', 'black', parent_id, true);
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
                console.log('Нужно продолжать ход');
            }

            add_move_cells(parent_id, 2);
        }
    })
}

// Выбор клетки для хода
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function () {
        // ДОБАВИТЬ ПРОВЕРКУ ХОДОВ ДАМКИ
        if (cells[i].classList.contains('move_cell') == true) {
            // Проверка на дамку
            is_king = false;
            if (chosen_checker.classList.contains('king') == true) {
                is_king = true;
            }

            // Удаление ходящей шашки
            chosen_checker.remove();
            // Добавление новой шашки на месте хода
            let new_checker = document.createElement('div');
            created_checker = new_checker;

            if (is_king == true) {
                new_checker.classList.add('king');
            }

            // Добавление класса новой шашке и удаление взятой шашки
            if (turn==1) {
                new_checker.classList.add('checker_white');
                
                if (+parent_id == +cells[i].getAttribute('id') + 18) {
                    delete_checker('topleft', 'black', 2, parent_id);
                }
                if (+parent_id == +cells[i].getAttribute('id') + 14) {
                    delete_checker('topright', 'black', 2, parent_id);
                }
                if (+parent_id == +cells[i].getAttribute('id') - 18) {
                    delete_checker('bottomright', 'black', 2, parent_id);
                }
                if (+parent_id == +cells[i].getAttribute('id') - 14) {
                    delete_checker('bottomleft', 'black', 2, parent_id);
                }
            } else {
                new_checker.classList.add('checker_black');
                
                if (+parent_id == +cells[i].getAttribute('id') + 18) {
                    delete_checker('topleft', 'white', 2, parent_id);
                }
                if (+parent_id == +cells[i].getAttribute('id') + 14) {
                    delete_checker('topright', 'white', 2, parent_id);
                }
                if (+parent_id == +cells[i].getAttribute('id') - 18) {
                    delete_checker('bottomright', 'white', 2, parent_id);
                }
                if (+parent_id == +cells[i].getAttribute('id') - 14) {
                    delete_checker('bottomleft', 'white', 2, parent_id);
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
                
                need_capture = 1;
                check_checker_capture('topleft', 'white', parent_id_check, false);
                check_checker_capture('topright', 'white', parent_id_check, false);
                check_checker_capture('bottomleft', 'white', parent_id_check, false);
                check_checker_capture('bottomright', 'white', parent_id_check, false);

                if (need_capture == 2) {
                    need_capture_again = 2;
                }
            } else if (turn == 2 && need_capture == 2) {
                parent_id_check = +new_checker.parentElement.getAttribute('id');
    
                need_capture = 1;
                check_checker_capture('topleft', 'black', parent_id_check, false);
                check_checker_capture('topright', 'black', parent_id_check, false);
                check_checker_capture('bottomleft', 'black', parent_id_check, false);
                check_checker_capture('bottomright', 'black', parent_id_check, false);

                if (need_capture == 2) {
                    need_capture_again = 2;
                }
            }

            // Проверка на превращение в дамку
            if (turn == 1) {
                if (+new_checker.parentElement.getAttribute('id') < 9) {
                    new_checker.classList.add('king');
                }
            } else {
                if (+new_checker.parentElement.getAttribute('id') > 56) {
                    new_checker.classList.add('king');
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