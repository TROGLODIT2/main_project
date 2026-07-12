// Адаптивный навбар
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

let nav_buttons = document.querySelectorAll('.nav_buttons');
nav_buttons[1].addEventListener('click', function () {
    location.assign('news.html');
})

class Cell {
    constructor (cell_color, cell_id) {
        // Создание на доске
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add(cell_color);
        board.appendChild(cell);

        // Свойства
        this.cell_id = cell_id;
        this.cell_color = cell_color;
        this.name = cells_names[this.cell_id - 1];
        this.piece = null;
        this.selector = cell;
        this.piece_color = null;
        this.move_cell = false;
        this.en_passant_cell = null;

        this.left_edge = (this.cell_id + 7) % 8 == 0;
        this.top_edge = this.cell_id < 9;
        this.right_edge = this.cell_id % 8 == 0;
        this.bottom_edge = this.cell_id > 56;

        this.knight_left_edge = (this.cell_id + 6) % 8 == 0 || (this.cell_id + 7) % 8 == 0;
        this.knight_top_edge = this.cell_id < 17;
        this.knight_right_edge = (this.cell_id + 1) % 8 == 0 || this.cell_id % 8 == 0;
        this.knight_bottom_edge = this.cell_id > 48;
    }

    add_piece (piece_name, piece_object, piece_color) {
        // Добавление фигуры на клетку
        this.selector.appendChild(piece_object);
        this.piece = piece_name;
        this.piece_color = piece_color;
    }

    delete_piece () {
        // Удаление фигуры с клетки
        let piece_selector = this.selector.querySelector('.chess_piece');
        this.selector.removeChild(piece_selector);
        this.piece = null;
        this.piece_color = null;
    }

    check_piece () {
        // Проверка на наличие фигуры на клетке
        if (this.piece != null) {
            return true;
        } else {
            return false;
        }
    }

    add_move () {
        let move_marker = document.createElement('div');
        move_marker.classList.add('move_marker');
        this.selector.appendChild(move_marker);
        this.move_cell = true;
    }

    delete_move () {
        let move_marker = this.selector.querySelector('.move_marker');
        if (move_marker != null) {
            this.selector.removeChild(move_marker);
        }
        this.move_cell = false;
    }
}

class Pawn {
    constructor(piece_color, already_moving, cell_id) {
        // Создание фигуры на доске
        this.selector = create_piece('pawn', cell_id, piece_color);
        this.selector.style.backgroundImage = `url(src/picture/chess/${piece_color}_pawn.svg)`;
        this.selector.style.backgroundSize = 'cover';

        // Добавление сойств
        this.piece_name = 'pawn';
        this.check = false;
        this.piece_color = piece_color;
        this.already_moving = already_moving;
        this.cell_id = cell_id;
    }
}

class Rook {
    constructor(piece_color, already_moving, cell_id) {
        // Создание фигуры на доске
        this.selector = create_piece('rook', cell_id, piece_color);
        this.selector.style.backgroundImage = `url(src/picture/chess/${piece_color}_rook.svg)`;
        this.selector.style.backgroundSize = 'cover';

        // Добавление сойств
        this.piece_name = 'rook';
        this.piece_color = piece_color;
        this.already_moving = already_moving;
        this.cell_id = cell_id;
    }
}

class Knight {
    constructor(piece_color, cell_id) {
        // Создание фигуры на доске
        this.selector = create_piece('knight', cell_id, piece_color);
        this.selector.style.backgroundImage = `url(src/picture/chess/${piece_color}_knight.svg)`;
        this.selector.style.backgroundSize = 'cover';

        // Добавление сойств
        this.piece_name = 'knight';
        this.piece_color = piece_color;
        this.cell_id = cell_id;
    }
}

class Bishop {
    constructor(piece_color, cell_id) {
        // Создание фигуры на доске
        this.selector = create_piece('bishop', cell_id, piece_color);
        this.selector.style.backgroundImage = `url(src/picture/chess/${piece_color}_bishop.svg)`;
        this.selector.style.backgroundSize = 'cover';

        // Добавление сойств
        this.piece_name = 'bishop';
        this.piece_color = piece_color;
        this.cell_id = cell_id;
    }
}

class Queen {
    constructor(piece_color, cell_id) {
        // Создание фигуры на доске
        this.selector = create_piece('queen', cell_id, piece_color);
        this.selector.style.backgroundImage = `url(src/picture/chess/${piece_color}_queen.svg)`;
        this.selector.style.backgroundSize = 'cover';

        // Добавление сойств
        this.piece_name = 'queen';
        this.piece_color = piece_color;
        this.cell_id = cell_id;
    }

    // Проверка нападения на короля
    check_the_check() {
        // Получение цвета противника
        let other_team_color = '';
        if (this.piece_color == 'white') {
            other_team_color = 'black';
        } else {
            other_team_color = 'white';
        }

        // Проверка горизонтали слева от клетки
        if (cells[this.cell_id - 1].left_edge == false) {
            for (let i = 1; i < 9; i++) {
                // Проверка на фигуру
                if (cells[this.cell_id - 1 - i].check_piece() == true) {
                    // Проверка на то, что фигура на проверяемой клетке - король
                    if (cells[this.cell_id - 1 - i].piece == 'king' && cells[this.cell_id - 1 - i].piece_color == other_team_color) {
                        return true;
                    } else {
                        break;
                    }
                }
                // Проверка на край
                if (cells[this.cell_id - 1 - i].left_edge == true) {
                    break;
                }
            }
        }

        // Проверка горизонтали справа от клетки
        if (cells[this.cell_id - 1].right_edge == false) {
            for (let i = 1; i < 9; i++) {
                // Проверка на фигуру
                if (cells[this.cell_id - 1 + i].check_piece() == true) {
                    // Проверка на то, что фигура на проверяемой клетке - король
                    if (cells[this.cell_id - 1 + i].piece == 'king' && cells[this.cell_id - 1 + i].piece_color == other_team_color) {
                        return true;
                    } else {
                        break;
                    }
                }
                // Проверка на край
                if (cells[this.cell_id - 1 + i].right_edge == true) {
                    break;
                }
            }
        }

        // Проверка горизонтали сверху от клетки
        if (cells[this.cell_id - 1].top_edge == false) {
            for (let i = 1; i < 9; i++) {
                // Проверка на фигуру
                if (cells[this.cell_id - 1 - i * 8].check_piece() == true) {
                    // Проверка на то, что фигура на проверяемой клетке - король
                    if (cells[this.cell_id - 1 - i * 8].piece == 'king' && cells[this.cell_id - 1 - i * 8].piece_color == other_team_color) {
                        return true;
                    } else {
                        break;
                    }
                }
                // Проверка на край
                if (cells[this.cell_id - 1 - i * 8].top_edge == true) {
                    break;
                }
            }
        }

        // Проверка горизонтали снизу от клетки
        if (cells[this.cell_id - 1].bottom_edge == false) {
            for (let i = 1; i < 9; i++) {
                // Проверка на фигуру
                if (cells[this.cell_id - 1 + i * 8].check_piece() == true) {
                    // Проверка на то, что фигура на проверяемой клетке - король
                    if (cells[this.cell_id - 1 + i * 8].piece == 'king' && cells[this.cell_id - 1 + i * 8].piece_color == other_team_color) {
                        return true;
                    } else {
                        break;
                    }
                }
                // Проверка на край
                if (cells[this.cell_id - 1 + i].bottom_edge == true) {
                    break;
                }
            }
        }

        return false;
    }

    

    // Проверка связки короля
    check_pins_to_king() {

    }
}

class King {
    constructor(piece_color, already_moving, cell_id) {
        // Создание фигуры на доске
        this.selector = create_piece('king', cell_id, piece_color);
        this.selector.style.backgroundImage = `url(src/picture/chess/${piece_color}_king.svg)`;
        this.selector.style.backgroundSize = 'cover';

        // Добавление сойств
        this.piece_name = 'king';
        this.check = false;
        this.piece_color = piece_color;
        this.already_moving = already_moving;
        this.cell_id = cell_id;
    }

    // Проверка шаха
    check_the_check() {
        let other_team_color = '';
        if (this.piece_color == 'white') {
            other_team_color = 'black';
        } else {
            other_team_color = 'white';
        }
        // Проверка нападения вражеских фигур на короля
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].piece_color == other_team_color) {
                // Устаревший код
                /*
                if (pieces[i].check_the_check() == true) {
                    return true;
                }
                */
                if (get_attacked_cells(pieces[i].cell_id, pieces[i].piece_name, other_team_color).includes(this.cell_id) == true) {
                    return true;
                }
            }

        }

        // Если ни 1 фигура не объявляет шах
        return false;
    }

    check_pins() {
        let all_pins = [];

        if (check_pin('left', this.cell_id, this.piece_color) != 0) {
            all_pins.push(check_pin('left', this.cell_id, this.piece_color));
            all_pins.push('left');
        }

        if (check_pin('right', this.cell_id, this.piece_color) != 0) {
            all_pins.push(check_pin('right', this.cell_id, this.piece_color));
            all_pins.push('right');
        }

        if (check_pin('top', this.cell_id, this.piece_color) != 0) {
            all_pins.push(check_pin('top', this.cell_id, this.piece_color));
            all_pins.push('top');
        }

        if (check_pin('bottom', this.cell_id, this.piece_color) != 0) {
            all_pins.push(check_pin('bottom', this.cell_id, this.piece_color));
            all_pins.push('bottom');
        }

        if (check_pin('topleft', this.cell_id, this.piece_color) != 0) {
            all_pins.push(check_pin('topleft', this.cell_id, this.piece_color));
            all_pins.push('topleft');
        }

        if (check_pin('topright', this.cell_id, this.piece_color) != 0) {
            all_pins.push(check_pin('topright', this.cell_id, this.piece_color));
            all_pins.push('topright');
        }

        if (check_pin('bottomleft', this.cell_id, this.piece_color) != 0) {
            all_pins.push(check_pin('bottomleft', this.cell_id, this.piece_color));
            all_pins.push('bottomleft');
        }

        if (check_pin('bottomright', this.cell_id, this.piece_color) != 0) {
            all_pins.push(check_pin('bottomright', this.cell_id, this.piece_color));
            all_pins.push('bottomright');
        }

        return all_pins;
    }
}

// Добавление названий клеток в список
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let cells_names = [];

for (let i = 8; i > 0; i--) {
    for (let j = 0; j < 8; j++) {
        cells_names.push(`${letters[j]}${i}`);
    }
}

// Создание объектов клеток
let cells = [];

let board = document.querySelector('.chess_board');

let cell_color = 'white';
for (let i = 1; i < 65; i++) {
    cells.push(new Cell(cell_color, i));
    if (i % 8 != 0) {
        if (cell_color == 'white') {
            cell_color = 'black';
        } else {
            cell_color = 'white';
        }
    }
}

// Возвращяет id клетки по её имени
function name_to_id(cell_name) {
    return cells_names.indexOf(cell_name) + 1;
}

// Создает объет фигуры в DOM дереве
function create_piece(piece_name, cell_id, piece_color) {
    let piece = document.createElement('div');
    piece.classList.add('chess_piece');
    piece.classList.add(`chess_${piece_name}`);
    cells[cell_id - 1].add_piece(`${piece_name}`, piece, piece_color);
    return piece;
}

function get_piece_object(piece_name) {
    let piece = document.createElement('div');
    piece.classList.add('chess_piece');
    piece.classList.add(`chess_${piece_name}`);
    return piece;
}

// Получение id объекта фигуры в списке по id клетки
function get_piece_object_id(piece_name, piece_color, cell_id) {
    for (let i = 0; i < pieces.length; i++) {
        // Проверка цвета фигуры
        if (pieces[i].piece_color == piece_color) {
            // проверка на объект короля
            if (pieces[i].piece_name == piece_name) {
                if (cell_id == 0) {
                    return i;
                } else if (pieces[i].cell_id == cell_id) {
                    return i;
                }
            }
        }
    }
}

function get_reverse_direction(direction) {
    if (direction == 'left') {
        return 'right';
    } else if (direction == 'right') {
        return 'left';
    } else if (direction == 'top') {
        return 'bottom';
    } else if (direction == 'bottom') {
        return 'top';
    } else if (direction == 'topleft') {
        return 'bottomright';
    } else if (direction == 'topright') {
        return 'bottomleft';
    } else if (direction == 'bottomleft') {
        return 'topright';
    } else if (direction == 'bottomright') {
        return 'topleft';
    }
}

function check_attack(cell_id, piece_color) {
    let other_team_color = '';
        if (piece_color == 'white') {
            other_team_color = 'black';
        } else {
            other_team_color = 'white';
        }

        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].piece_color == other_team_color) {
                if (get_attacked_cells(pieces[i].cell_id, pieces[i].piece_name, other_team_color).includes(cell_id) == true) {
                    return true;
                }
            }
        }

        return false;
}

// Добавление возможных ходов фигуре
function get_moves(cell_object) {
    let piece_moves_cells = [];

    let king_id = get_piece_object_id('king', cell_object.piece_color, 0);
    if (pieces[king_id].check_the_check() == true) {
        // если объявлен шах
        if (check_double_check(king_id, pieces[king_id].piece_color) == true) {
            if (cell_object.piece == 'king') {
                piece_moves_cells = get_attacked_cells(cell_object.cell_id, cell_object.piece, cell_object.piece_color);
                for (i of get_attack_direction(pieces[king_id].cell_id, pieces[king_id].piece_color)) {
                    if (get_line_cells(cell_object.cell_id, get_reverse_direction(i), 1, cell_object.piece_color) != []) {
                        if (piece_moves_cells.includes(get_line_cells(cell_object.cell_id, get_reverse_direction(i), 1, cell_object.piece_color)[0]) == true) {
                            piece_moves_cells.splice(piece_moves_cells.indexOf(get_line_cells(cell_object.cell_id, get_reverse_direction(i), 1, cell_object.piece_color)[0]), 1)
                        }
                    }
                }
            }
        } else {
            console.log(get_attack_direction(pieces[king_id].cell_id, pieces[king_id].piece_color));
            if (cell_object.piece == 'king') {
                piece_moves_cells = get_attacked_cells(cell_object.cell_id, cell_object.piece, cell_object.piece_color);
                for (i of get_attack_direction(pieces[king_id].cell_id, pieces[king_id].piece_color)) {
                    if (get_line_cells(cell_object.cell_id, get_reverse_direction(i), 1, cell_object.piece_color) != []) {
                        if (piece_moves_cells.includes(get_line_cells(cell_object.cell_id, get_reverse_direction(i), 1, cell_object.piece_color)[0]) == true) {
                            piece_moves_cells.splice(piece_moves_cells.indexOf(get_line_cells(cell_object.cell_id, get_reverse_direction(i), 1, cell_object.piece_color)[0]), 1)
                        }
                    }
                }
            } else {
                let possible_moves = get_attacked_cells(cell_object.cell_id, cell_object.piece, cell_object.piece_color);
                let attack_direction = get_attack_direction(pieces[king_id].cell_id, pieces[king_id].piece_color);
                let attack_line = get_line_cells(pieces[king_id].cell_id, attack_direction, 8, pieces[king_id].piece_color);
                if (attack_direction == 'knight') {
                    for (let i = attack_line.length - 1; i >= 0; i--) {
                        if (cells[attack_line[i] - 1].piece != 'knight') {
                            attack_line.splice(i, 1);
                        }
                    }
                }

                if (cell_object.piece == 'pawn') {
                    console.log(possible_moves);
                    for (let i = possible_moves.length - 1; i >= 0; i--) {
                        if (cells[possible_moves[i] - 1].piece == null && cells[possible_moves[i] - 1].en_passant_cell == null) {
                            possible_moves.splice(i, 1);
                        }
                    }

                    let move_direction = '';
                    if (cell_object.piece_color == 'white') {
                        move_direction = 'top';
                    } else {
                        move_direction = 'bottom';
                    }

                    if (pieces[get_piece_object_id('pawn', cell_object.piece_color, cell_object.cell_id)].already_moving == false) {
                        for (let i of get_line_cells(cell_object.cell_id, move_direction, 2, cell_object.piece_color)) {
                            if (cells[i - 1].check_piece() == false) {
                                possible_moves.push(i);
                            } else {
                                break;
                            }
                        }
                    } else {
                        for (let i of get_line_cells(cell_object.cell_id, move_direction, 1, cell_object.piece_color)) {
                            if (cells[i - 1].check_piece() == false) {
                                possible_moves.push(i);
                            } else {
                                break;
                            }
                        }
                    }
                }

                piece_moves_cells = [...new Set(possible_moves).intersection(new Set(attack_line))];

                if (cell_object.piece == 'pawn') {
                    for (i of possible_moves) {
                        if (cells[i - 1].en_passant_cell != null) {
                            piece_moves_cells.push(i);
                        }
                    }
                }
            }
        }
    } else {
        // Если шаха нет

        // Проверка на связку фигуры
        if (pieces[king_id].check_pins().includes(cell_object.cell_id) == false) {
            if (cell_object.piece != 'pawn') {
                piece_moves_cells = get_attacked_cells(cell_object.cell_id, cell_object.piece, cell_object.piece_color);
                console.log(piece_moves_cells);
                if (cell_object.piece == 'king') {
                    // Проверка рокировок
                    if (cell_object.piece_color == 'white') {
                        if (pieces[king_id].already_moving == false) {
                            // Длинная рокировка
                            if (cells[name_to_id('a1') - 1].check_piece() == true && cells[name_to_id('a1') - 1].piece == 'rook') {
                                let rook = pieces[get_piece_object_id('rook', 'white', name_to_id('a1'))];
                                if (rook.already_moving == false) {
                                    // Проверка клеток рокировки
                                    // Клетка d1
                                    let check_d1 = check_attack(name_to_id('d1'), 'white') == false && cells[name_to_id('d1') - 1].check_piece() == false;
                                    // Клетка c1
                                    let check_c1 = check_attack(name_to_id('c1'), 'white') == false && cells[name_to_id('c1') - 1].check_piece() == false;
                                    // Клетка b1
                                    let check_b1 = cells[name_to_id('b1') - 1].check_piece() == false;
                                    if (check_d1 == true && check_c1 == true && check_b1 == true) {
                                        piece_moves_cells.push(59);
                                    }
                                }
                            }
                            // Короткая рокировка
                            if (cells[name_to_id('h1') - 1].check_piece() == true && cells[name_to_id('h1') - 1].piece == 'rook') {
                                let rook = pieces[get_piece_object_id('rook', 'white', name_to_id('h1'))];
                                if (rook.already_moving == false) {
                                    // Проверка клеток рокировки
                                    // Клетка f1
                                    let check_f1 = check_attack(name_to_id('f1'), 'white') == false && cells[name_to_id('f1') - 1].check_piece() == false;
                                    // Клетка g1
                                    let check_g1 = check_attack(name_to_id('g1'), 'white') == false && cells[name_to_id('g1') - 1].check_piece() == false;
                                    if (check_f1 == true && check_g1 == true) {
                                        piece_moves_cells.push(63);
                                    }
                                }
                            }
                        }
                    } else {
                        if (pieces[king_id].already_moving == false) {
                            // Длинная рокировка
                            if (cells[name_to_id('a8') - 1].check_piece() == true && cells[name_to_id('a8') - 1].piece == 'rook') {
                                console.log(name_to_id('a8'), get_piece_object_id('rook', 'black', name_to_id('a8')), pieces[get_piece_object_id('rook', 'black', name_to_id('a8'))]);
                                let rook = pieces[get_piece_object_id('rook', 'black', name_to_id('a8'))];
                                if (rook.already_moving == false) {
                                    // Проверка клеток рокировки
                                    // Клетка d8
                                    let check_d8 = check_attack(name_to_id('d8'), 'black') == false && cells[name_to_id('d8') - 1].check_piece() == false;
                                    // Клетка c8
                                    let check_c8 = check_attack(name_to_id('c8'), 'black') == false && cells[name_to_id('c8') - 1].check_piece() == false;
                                    // Клетка b8
                                    let check_b8 = cells[name_to_id('b8') - 1].check_piece() == false;
                                    if (check_d8 == true && check_c8 == true && check_b8 == true) {
                                        piece_moves_cells.push(59);
                                    }
                                }
                            }
                            // Короткая рокировка
                            if (cells[name_to_id('h8') - 1].check_piece() == true && cells[name_to_id('h8') - 1].piece == 'rook') {
                                let rook = pieces[get_piece_object_id('rook', 'black', name_to_id('h8'))];
                                if (rook.already_moving == false) {
                                    // Проверка клеток рокировки
                                    // Клетка f8
                                    let check_f8 = check_attack(name_to_id('f8'), 'black') == false && cells[name_to_id('f8') - 1].check_piece() == false;
                                    // Клетка g8
                                    let check_g8 = check_attack(name_to_id('g8'), 'black') == false && cells[name_to_id('g8') - 1].check_piece() == false;
                                    if (check_f8 == true && check_g8 == true) {
                                        piece_moves_cells.push(63);
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                let move_direction = '';
                if (cell_object.piece_color == 'white') {
                    move_direction = 'top';
                } else {
                    move_direction = 'bottom';
                }

                console.log(cell_object.cell_id);

                if (pieces[get_piece_object_id('pawn', cell_object.piece_color, cell_object.cell_id)].already_moving == false) {
                    for (let i of get_line_cells(cell_object.cell_id, move_direction, 2, cell_object.piece_color)) {
                        if (cells[i - 1].check_piece() == false) {
                            piece_moves_cells.push(i);
                        } else {
                            break;
                        }
                    }
                } else {
                    for (let i of get_line_cells(cell_object.cell_id, move_direction, 1, cell_object.piece_color)) {
                        if (cells[i - 1].check_piece() == false) {
                            piece_moves_cells.push(i);
                        } else {
                            break;
                        }
                    }
                }

                console.log(cell_object.cell_id, cell_object.piece, cell_object.piece_color);

                for (let i of get_attacked_cells(cell_object.cell_id, cell_object.piece, cell_object.piece_color)) {
                    if (cells[i - 1].check_piece() == true && cells[i - 1].piece_color != cell_object.piece_color) {
                        piece_moves_cells.push(i);
                    } else if (cells[i - 1].en_passant_cell != null) {
                        piece_moves_cells.push(i);
                    }
                }
            }
        } else {
            // Добавить проверки возможных ходов у связанной фигуры
            let move_direction = pieces[king_id].check_pins().indexOf(cell_object.cell_id);
            move_direction = pieces[king_id].check_pins()[move_direction + 1];
            console.log(move_direction);

            if (cell_object.piece == 'queen') {
                piece_moves_cells = get_line_cells(cell_object.cell_id, move_direction, 8, cell_object.piece_color);
                piece_moves_cells = [...piece_moves_cells, ...get_line_cells(cell_object.cell_id, get_reverse_direction(move_direction), 8, cell_object.piece_color)];
            } else if (cell_object.piece == 'rook') {
                if (move_direction == 'left' || move_direction == 'right' || move_direction == 'top' || move_direction == 'bottom') {
                    piece_moves_cells = get_line_cells(cell_object.cell_id, move_direction, 8, cell_object.piece_color);
                    piece_moves_cells = [...piece_moves_cells, ...get_line_cells(cell_object.cell_id, get_reverse_direction(move_direction), 8, cell_object.piece_color)];
                }
            } else if (cell_object.piece == 'bishop') {
                if (move_direction == 'topleft' || move_direction == 'topright' || move_direction == 'bottomleft' || move_direction == 'bottomright') {
                    piece_moves_cells = get_line_cells(cell_object.cell_id, move_direction, 8, cell_object.piece_color);
                    piece_moves_cells = [...piece_moves_cells, ...get_line_cells(cell_object.cell_id, get_reverse_direction(move_direction), 8, cell_object.piece_color)];
                }
            } else if (cell_object.piece == 'pawn') {
                let pawn_move_direction = '';
                if (cell_object.piece_color == 'white') {
                    pawn_move_direction = 'top';
                } else {
                    pawn_move_direction = 'bottom';
                }

                if (move_direction == 'top' || move_direction == 'bottom') {
                    if (pieces[get_piece_object_id('pawn', cell_object.piece_color, cell_object.cell_id)].already_moving == false) {
                        for (let i of get_line_cells(cell_object.cell_id, pawn_move_direction, 2, cell_object.piece_color)) {
                            if (cells[i - 1].check_piece() == false) {
                                piece_moves_cells.push(i);
                            } else {
                                break;
                            }
                        }
                    } else {
                        for (let i of get_line_cells(cell_object.cell_id, pawn_move_direction, 1, cell_object.piece_color)) {
                            if (cells[i - 1].check_piece() == false) {
                                piece_moves_cells.push(i);
                            } else {
                                break;
                            }
                        }
                    }
                } else if (move_direction == 'topleft' || move_direction == 'bottomright') {
                    if (cell_object.piece_color == 'white') {
                        let move_cell_id = get_line_cells(cell_object.cell_id, 'topleft', 1, cell_object.piece_color)[0];
                        if (cells[move_cell_id - 1].check_piece() == true && cells[move_cell_id - 1].piece_color != cell_object.piece_color) {
                            piece_moves_cells.push(move_cell_id);
                        } else if (cells[move_cell_id - 1].en_passant_cell != null) {
                            piece_moves_cells.push(i);
                        }
                    } else {
                        let move_cell_id = get_line_cells(cell_object.cell_id, 'bottomright', 1, cell_object.piece_color)[0];
                        if (cells[move_cell_id - 1].check_piece() == true && cells[move_cell_id - 1].piece_color != cell_object.piece_color) {
                            piece_moves_cells.push(move_cell_id);
                        } else if (cells[move_cell_id - 1].en_passant_cell != null) {
                            piece_moves_cells.push(i);
                        }
                    }
                } else if (move_direction == 'topright' || move_direction == 'bottomleft') {
                    if (cell_object.piece_color == 'white') {
                        let move_cell_id = get_line_cells(cell_object.cell_id, 'topright', 1, cell_object.piece_color)[0];
                        if (cells[move_cell_id - 1].check_piece() == true && cells[move_cell_id - 1].piece_color != cell_object.piece_color) {
                            piece_moves_cells.push(move_cell_id);
                        } else if (cells[move_cell_id - 1].en_passant_cell != null) {
                            piece_moves_cells.push(i);
                        }
                    } else {
                        let move_cell_id = get_line_cells(cell_object.cell_id, 'bottomleft', 1, cell_object.piece_color)[0];
                        if (cells[move_cell_id - 1].check_piece() == true && cells[move_cell_id - 1].piece_color != cell_object.piece_color) {
                            piece_moves_cells.push(move_cell_id);
                        } else if (cells[move_cell_id - 1].en_passant_cell != null) {
                            piece_moves_cells.push(i);
                        }
                    }
                }
            }
        }
    }
    return piece_moves_cells;
}

// Функция, возвращающая атакованные клетки по одной из линий атаки фигуры ИСПОЛЬЗУЕТСЯ ВЫШЕ
function get_line_cells(cell_id, line_type, number, piece_color) {
    let attacked_cells = [];

    // Определение линии атаки
    let first_edge = '';
    let second_edge = '';
    let mult = 0;
    if (line_type == 'left') {
        mult = -1;
        first_edge = 'left_edge';
        second_edge = 'left_edge';
    } else if (line_type == 'right') {
        mult = 1;
        first_edge = 'right_edge';
        second_edge = 'right_edge';
    } else if (line_type == 'top') {
        mult = -8;
        first_edge = 'top_edge';
        second_edge = 'top_edge';
    } else if (line_type == 'bottom') {
        mult = 8;
        first_edge = 'bottom_edge';
        second_edge = 'bottom_edge';
    } else if (line_type == 'topleft') {
        mult = -9;
        first_edge = 'top_edge';
        second_edge = 'left_edge';
    } else if (line_type == 'topright') {
        mult = -7;
        first_edge = 'top_edge';
        second_edge = 'right_edge';
    } else if (line_type == 'bottomleft') {
        mult = 7;
        first_edge = 'bottom_edge';
        second_edge = 'left_edge';
    } else if (line_type == 'bottomright') {
        mult = 9;
        first_edge = 'bottom_edge';
        second_edge = 'right_edge';
    }

    // Проверка на коня
    if (line_type != 'knight') {
        // Проверка атакованных клеток
        if (cells[cell_id - 1][first_edge] == false && cells[cell_id - 1][second_edge] == false) {
            for (let i = 1; i < number + 1; i++) {
                // Добавление клетки в список атакованных
                if (cells[cell_id - 1 + i * mult].piece_color != piece_color) {
                    attacked_cells.push(cell_id + i * mult);
                }
                // Проверка на фигуру
                if (cells[cell_id - 1 + i * mult].check_piece() == true) {
                    break;
                }
                // Проверка на край
                if (cells[cell_id - 1 + i * mult][first_edge] == true || cells[cell_id - 1 + i * mult][second_edge] == true) {
                    break;
                }
            }
        }
    } else {
        // Левые клетки
        if (cells[cell_id - 1].knight_left_edge == false) {
            // Верхняя клетка
            if (cells[cell_id - 1].top_edge == false) {
                if (cells[cell_id - 1 - 10].piece_color != piece_color) {
                    attacked_cells.push(cell_id - 10);
                }
            }

            // Нижняя клетка
            if (cells[cell_id - 1].bottom_edge == false) {
                if (cells[cell_id - 1 + 6].piece_color != piece_color) {
                    attacked_cells.push(cell_id + 6);
                }
            }
        }

        // Правые клетки
        if (cells[cell_id - 1].knight_right_edge == false) {
            // Верхняя клетка
            if (cells[cell_id - 1].top_edge == false) {
                if (cells[cell_id - 1 - 6].piece_color != piece_color) {
                    attacked_cells.push(cell_id - 6);
                }
            }

            // Нижняя клетка
            if (cells[cell_id - 1].bottom_edge == false) {
                if (cells[cell_id - 1 + 10].piece_color != piece_color) {
                    attacked_cells.push(cell_id + 10);
                }
            }
        }
        // Верхние клетки
        if (cells[cell_id - 1].knight_top_edge == false) {
            // Левая клетка
            if (cells[cell_id - 1].left_edge == false) {
                if (cells[cell_id - 1 - 15].piece_color != piece_color) {
                    attacked_cells.push(cell_id - 15);
                }
            }

            // Правая клетка
            if (cells[cell_id - 1].right_edge == false) {
                if (cells[cell_id - 1 - 17].piece_color != piece_color) {
                    attacked_cells.push(cell_id - 17);
                }
            }
        }

        // Нижние клетки
        if (cells[cell_id - 1].knight_bottom_edge == false) {
            // Левая клетка
            if (cells[cell_id - 1].left_edge == false) {
                if (cells[cell_id - 1 + 15].piece_color != piece_color) {
                    attacked_cells.push(cell_id + 15);
                }
            }

            // Правая клетка
            if (cells[cell_id - 1].right_edge == false) {
                if (cells[cell_id - 1 + 17].piece_color != piece_color) {
                    attacked_cells.push(cell_id + 17);
                }
            }
        }
    }

    return attacked_cells;
}

function find_protection(cell_id, piece_color) {
    let other_team_color = '';
    if (piece_color == 'white') {
        other_team_color = 'black';
    } else {
        other_team_color = 'white';
    }

    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].piece_color == piece_color) {
            console.log(pieces[i].piece_name);
            // Проверка защиты от всех фигур кроме пешек
            if (pieces[i].piece_name != 'king') {
                if (get_attacked_cells(pieces[i].cell_id, pieces[i].piece_name, other_team_color).includes(cell_id) == true) {
                    return true;
                }
            } else {
                if (check_opposition_cells(pieces[i].cell_id, other_team_color).includes(cell_id) == true) {
                    return true;
                }
            }
            
            // Проверка защиты от пешек
            if (pieces[i].piece_name == 'pawn') {
                if (pieces[i].piece_color == 'white') {
                    if (get_line_cells(pieces[i].cell_id, 'topleft', 1, other_team_color).includes(cell_id) == true) {
                        return true;
                    }
                    if (get_line_cells(pieces[i].cell_id, 'topright', 1, other_team_color).includes(cell_id) == true) {
                        return true;
                    }
                } else {
                    if (get_line_cells(pieces[i].cell_id, 'bottomleft', 1, other_team_color).includes(cell_id) == true) {
                        return true;
                    }
                    if (get_line_cells(pieces[i].cell_id, 'bottomright', 1, other_team_color).includes(cell_id) == true) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function check_opposition_cells(cell_id, piece_color) {
    let attacked_cells = [];
    attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'left', 1, piece_color)];
    attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'right', 1, piece_color)];
    attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'top', 1, piece_color)];
    attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'bottom', 1, piece_color)];
    attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'topleft', 1, piece_color)];
    attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'topright', 1, piece_color)];
    attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'bottomleft', 1, piece_color)];
    attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'bottomright', 1, piece_color)];
    return attacked_cells;
}

// Проверка на двойной шах
function check_double_check(cell_id, piece_color) {
    let other_team_color = '';
    if (piece_color == 'white') {
        other_team_color = 'black';
    } else {
        other_team_color = 'white';
    }

    let check_count = 0;
    
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].piece_color == other_team_color) {
            if (pieces[i].piece_name != 'king') {
                if (get_attacked_cells(pieces[i].cell_id, pieces[i].piece_name, other_team_color).includes(cell_id) == true) {
                    check_count += 1;
                }
            }
        }
    }

    if (check_count > 1) {
        return true;
    } else {
        return false;
    }
}

function check_king_attack_direction(direction, cell_id, piece_color) {
    let attacked_cells = get_line_cells(cell_id, direction, 8, piece_color);
    let last_cell_id = attacked_cells[attacked_cells.length - 1];

    if (attacked_cells.length == 0) {
        return false;
    }

    if (cells[last_cell_id - 1].piece == 'queen') {
        return true;
    } else if (cells[last_cell_id - 1].piece == 'rook') {
        if (direction == 'top') {
            return true;
        } else if (direction == 'bottom') {
            return true;
        } else if (direction == 'left') {
            return true;
        } else if (direction == 'right') {
            return true;
        }
    } else if (cells[last_cell_id - 1].piece == 'bishop') {
        if (direction == 'topleft') {
            return true;
        } else if (direction == 'topright') {
            return true;
        } else if (direction == 'bottomleft') {
            return true;
        } else if (direction == 'bottomright') {
            return true;
        }
    } else if (cells[last_cell_id - 1].piece == 'pawn') {
        if (attacked_cells.length == 1) {
            if (cells[last_cell_id - 1].piece_color == 'white') {
                if (direction == 'topleft') {
                    return true;
                } else if (direction == 'topright') {
                    return true;
                }
            } else {
                if (direction == 'bottomleft') {
                    return true;
                } else if (direction == 'bottomright') {
                    return true;
                }
            }
        }
    }

    return false;
}

function get_attack_direction(cell_id, piece_color) {
    let attack_directions = [];
    if (check_king_attack_direction('left', cell_id, piece_color) == true) {
        attack_directions.push('left');
    } else if (check_king_attack_direction('right', cell_id, piece_color) == true) {
        attack_directions.push('right');
    } else if (check_king_attack_direction('top', cell_id, piece_color) == true) {
        attack_directions.push('top');
    } else if (check_king_attack_direction('bottom', cell_id, piece_color) == true) {
        attack_directions.push('bottom');
    } else if (check_king_attack_direction('topleft', cell_id, piece_color) == true) {
        attack_directions.push('topleft');
    } else if (check_king_attack_direction('topright', cell_id, piece_color) == true) {
        attack_directions.push('topright');
    } else if (check_king_attack_direction('bottomleft', cell_id, piece_color) == true) {
        attack_directions.push('bottomleft');
    } else if (check_king_attack_direction('bottomright', cell_id, piece_color) == true) {
        attack_directions.push('bottomright');
    } else {
        attack_directions.push('knight');
    }
    return attack_directions;
}

function delete_en_passent() {
    for (let i = 0; i < 64; i++) {
        cells[i].en_passant_cell = null;
    }
}

// Функция, которая возвращает клетки, атакованные фигурой
function get_attacked_cells(cell_id, type_attack, piece_color) {
    let attacked_cells = [];
    if (type_attack == 'rook') {
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'left', 8, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'right', 8, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'top', 8, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'bottom', 8, piece_color)];
    }
    if (type_attack == 'bishop') {
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'topleft', 8, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'topright', 8, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'bottomleft', 8, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'bottomright', 8, piece_color)];
    }
    if (type_attack == 'queen') {
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'left', 8, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'right', 8, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'top', 8, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'bottom', 8, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'topleft', 8, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'topright', 8, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'bottomleft', 8, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'bottomright', 8, piece_color)];
    }
    if (type_attack == 'knight') {
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'knight', 8, piece_color)];
    }
    if (type_attack == 'pawn') {
        if (piece_color == 'white') {
            attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'topleft', 1, piece_color)];
            attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'topright', 1, piece_color)];
        } else {
            attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'bottomleft', 1, piece_color)];
            attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'bottomright', 1, piece_color)];
        }
    }
    if (type_attack == 'king') {
        console.log('Проверка короля');
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'left', 1, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'right', 1, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'top', 1, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'bottom', 1, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'topleft', 1, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'topright', 1, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'bottomleft', 1, piece_color)];
        attacked_cells = [...attacked_cells, ...get_line_cells(cell_id, 'bottomright', 1, piece_color)];
        
        let other_attacked_cells = [];
        for (let i = 0; i < pieces.length; i++) {
            // Клетки атакованные чужими фигурами
            if (pieces[i].piece_color != piece_color) {
                if (pieces[i].piece_name != 'king') {
                    other_attacked_cells = [...other_attacked_cells, ...get_attacked_cells(pieces[i].cell_id, pieces[i].piece_name, pieces[i].piece_color)];
                } else {
                    other_attacked_cells = [...other_attacked_cells, ...check_opposition_cells(pieces[i].cell_id, pieces[i].piece_color)];
                }
            }
        }
        
        // Удаление атакованных клеток
        for (let i = attacked_cells.length - 1; i >= 0; i--) {
            if (other_attacked_cells.includes(attacked_cells[i]) == true) {
                if (attacked_cells[i] == 64) {
                }
                attacked_cells.splice(i, 1);
            } else if (cells[attacked_cells[i] - 1].check_piece() == true) {
                // Проверка на защищенность
                if (find_protection(cells[attacked_cells[i] - 1].cell_id, cells[attacked_cells[i] - 1].piece_color) == true) {
                    console.log(find_protection(cells[attacked_cells[i] - 1].cell_id, cells[attacked_cells[i] - 1].piece_color));
                    attacked_cells.splice(i, 1);
                }
            }
        }
    }

    return attacked_cells;
}

function check_pin(line_type, cell_id, king_color) {
    // Определение линии возможной связки
    let first_edge = '';
    let second_edge = '';
    let mult = 0;
    let second_piece = '';

    if (line_type == 'left') {
        mult = -1;
        first_edge = 'left_edge';
        second_edge = 'left_edge';
        second_piece = 'rook';
    } else if (line_type == 'right') {
        mult = 1;
        first_edge = 'right_edge';
        second_edge = 'right_edge';
        second_piece = 'rook';
    } else if (line_type == 'top') {
        mult = -8;
        first_edge = 'top_edge';
        second_edge = 'top_edge';
        second_piece = 'rook';
    } else if (line_type == 'bottom') {
        mult = 8;
        first_edge = 'bottom_edge';
        second_edge = 'bottom_edge';
        second_piece = 'rook';
    } else if (line_type == 'topleft') {
        mult = -9;
        first_edge = 'top_edge';
        second_edge = 'left_edge';
        second_piece = 'bishop';
    } else if (line_type == 'topright') {
        mult = -7;
        first_edge = 'top_edge';
        second_edge = 'right_edge';
        second_piece = 'bishop';
    } else if (line_type == 'bottomleft') {
        mult = 7;
        first_edge = 'bottom_edge';
        second_edge = 'left_edge';
        second_piece = 'bishop';
    } else if (line_type == 'bottomright') {
        mult = 9;
        first_edge = 'bottom_edge';
        second_edge = 'right_edge';
        second_piece = 'bishop';
    }

    let found_piece = false;
    let pin_cell = 0;

    // Проверка атакованных клеток
    if (cells[cell_id - 1][first_edge] == false && cells[cell_id - 1][second_edge] == false) {
        for (let i = 1; i < 9 + 1; i++) {
            if (found_piece == false) {
                // Проверка цвета фигуры
                if (cells[cell_id - 1 + i * mult].piece_color == king_color && cells[cell_id - 1 + i * mult].check_piece() == true) {
                    found_piece = true;
                    pin_cell = cell_id + i * mult;
                } else if (cells[cell_id - 1 + i * mult].check_piece() == true) {
                    return 0;
                }
            } else {
                if (cells[cell_id - 1 + i * mult].piece_color != king_color && cells[cell_id - 1 + i * mult].check_piece() == true) {
                    if (cells[cell_id - 1 + i * mult].piece == 'queen' || cells[cell_id - 1 + i * mult].piece == second_piece) {
                        return pin_cell;
                    }
                    return 0;
                } else if (cells[cell_id - 1 + i * mult].check_piece() == true) {
                    return 0;
                }
            }
            // Проверка на край
            if (cells[cell_id - 1 + i * mult][first_edge] == true || cells[cell_id - 1 + i * mult][second_edge] == true) {
                return 0;
            }
        }
    }
    return 0;
}

function add_moves(moves) {
    for (let i = 0; i < moves.length; i++) {
        cells[moves[i] - 1].add_move();
    }
}

function delete_moves() {
    for (let i = 0; i < 64; i++) {
        cells[i].delete_move();
    }
}

let modal = document.querySelector('.chess_modal');
let chose_pieces = document.querySelectorAll('.chose_piece');


function chose_new_piece(pawn_color, cell_id) {
    let promise_choose_piece = new Promise(function (resolve, reject) {
        for (let i = 0; i < chose_pieces.length; i++) {
            chose_pieces[i].addEventListener('click', function () {
                resolve(i);
            });
        }
    });
    
    promise_choose_piece.then(function (chosen_piece) {
        hide_modal()
    
        for (let i = 0; i < chose_pieces.length; i++) {
            chose_pieces[i].removeEventListener('click', function () {
                resolve(i);
            });
        }

        if (chosen_piece == 0) {
            pieces.push(new Queen(pawn_color, cell_id));
        } else if (chosen_piece == 1) {
            pieces.push(new Rook(pawn_color, true, cell_id));
        } else if (chosen_piece == 2) {
            pieces.push(new Bishop(pawn_color, cell_id));
        } else {
            pieces.push(new Knight(pawn_color, cell_id));
        }

        console.log(chosen_piece);
    })

    show_modal(pawn_color);
}


function show_modal(color) {
    modal.style.display = 'flex';

    chose_pieces[0].style.backgroundImage = `url(src/picture/chess/${color}_queen.svg)`;
    chose_pieces[1].style.backgroundImage = `url(src/picture/chess/${color}_rook.svg)`;
    chose_pieces[2].style.backgroundImage = `url(src/picture/chess/${color}_bishop.svg)`;
    chose_pieces[3].style.backgroundImage = `url(src/picture/chess/${color}_knight.svg)`;
}

function hide_modal() {
    modal.style.display = 'none';
}

// Расстановка фигур
let pieces = [];

// Расстановка черных фигур
// Ладьи
pieces.push(new Rook('black', false, name_to_id('a8')));
pieces.push(new Rook('black', false, name_to_id('h8')));

// Кони
pieces.push(new Knight('black', name_to_id('b8')));
pieces.push(new Knight('black', name_to_id('g8')));

// Слоны
pieces.push(new Bishop('black', name_to_id('c8')));
pieces.push(new Bishop('black', name_to_id('f8')));

// Ферзь
pieces.push(new Queen('black', name_to_id('d8')));

// Король
pieces.push(new King('black', false, name_to_id('e8')));

// Пешки
for (let i = 0; i < 8; i++) {
    pieces.push(new Pawn('black', false, name_to_id(`${letters[i]}7`)));
}


// Расстановка белых фигур
// Ладьи
pieces.push(new Rook('white', false, name_to_id('a1')));
pieces.push(new Rook('white', false, name_to_id('h1')));

// Кони
pieces.push(new Knight('white', name_to_id('b1')));
pieces.push(new Knight('white', name_to_id('g1')));

// Слоны
pieces.push(new Bishop('white', name_to_id('c1')));
pieces.push(new Bishop('white', name_to_id('f1')));

// Ферзь
pieces.push(new Queen('white', name_to_id('d1')));

// Король
pieces.push(new King('white', false, name_to_id('e1')));

// Пешки
for (let i = 0; i < 8; i++) {
    pieces.push(new Pawn('white', false, name_to_id(`${letters[i]}2`)));
}


/*
pieces.push(new Queen('black', name_to_id('e8')));
pieces.push(new King('black', false, name_to_id('g3')));


pieces.push(new King('white', false, name_to_id('e1')));
pieces.push(new Queen('white', name_to_id('e2')));

pieces.push(new Rook('white', false, name_to_id('a1')));
pieces.push(new Rook('white', false, name_to_id('h1')));

pieces.push(new Knight('white', name_to_id('b1')));
pieces.push(new Pawn('black', false, name_to_id(`c4`)));

pieces.push(new Pawn('black', false, name_to_id('a7')));

// Пешки
for (let i = 0; i < 4; i++) {
    pieces.push(new Pawn('white', false, name_to_id(`${letters[i]}2`)));
}
*/

// Основной код
/*
Детали реализации
1. Проверить шахи (если да, то проверить возможность заслона своего короля)
2. Проверить наличие связки короля
3. Проверить возможные ходы на наличие преград
*/

// Очередь хода
let turn = 1;
let move_cell_id = 0;

for (let i = 0; i < 64; i++) {
    cells[i].selector.addEventListener('click', function () {
        if (turn == 1) {
            if (cells[i].piece_color == 'white') {
                delete_moves();
                let piece_moves = get_moves(cells[i]);
                add_moves(piece_moves);
                move_cell_id = cells[i].cell_id;
            } else if (cells[i].move_cell == true) {
                let move_piece = get_piece_object_id(cells[move_cell_id - 1].piece, 'white', move_cell_id);
                pieces[move_piece].cell_id = cells[i].cell_id;
                
                cells[move_cell_id - 1].delete_piece();
                delete_moves();
                
                let new_piece = get_piece_object(pieces[move_piece].piece_name);
                new_piece.style.backgroundImage = `url(src/picture/chess/white_${pieces[move_piece].piece_name}.svg)`;

                let new_en_passent = false;

                if (pieces[move_piece].piece_name == 'pawn' && pieces[move_piece].already_moving == false) {
                    if (pieces[move_piece].piece_color == 'white' && cells[move_cell_id - 1].cell_id != cells[i].cell_id + 8) {
                        delete_en_passent();
                        cells[pieces[move_piece].cell_id + 7].en_passant_cell = cells[i].cell_id;
                        new_en_passent = true;
                    }
                }
                
                if (pieces[move_piece].piece_name == 'king' && pieces[move_piece].already_moving == false) {
                    if (cells[i].cell_id == 63 && cells[63].piece == 'rook') {
                        if (pieces[get_piece_object_id('rook', 'white', 64)].already_moving == false) {
                            cells[63].delete_piece();

                            let new_rook = get_piece_object('rook');
                            new_rook.style.backgroundImage = `url(src/picture/chess/white_rook.svg)`;

                            pieces[get_piece_object_id('rook', 'white', 64)].cell_id = 62;
                            pieces[get_piece_object_id('rook', 'white', 62)].selector = new_rook;

                            cells[61].add_piece('rook', new_rook, 'white');
                        }
                    } else if (cells[i].cell_id == 59 && cells[56].piece == 'rook') {
                        if (pieces[get_piece_object_id('rook', 'white', 57)].already_moving == false) {
                            cells[56].delete_piece();

                            let new_rook = get_piece_object('rook');
                            new_rook.style.backgroundImage = `url(src/picture/chess/white_rook.svg)`;

                            pieces[get_piece_object_id('rook', 'white', 57)].cell_id = 60;
                            pieces[get_piece_object_id('rook', 'white', 60)].selector = new_rook;

                            cells[59].add_piece('rook', new_rook, 'white');
                        }
                    }
                }

                if (pieces[move_piece].piece_name == 'king' || pieces[move_piece].piece_name == 'pawn' || pieces[move_piece].piece_name == 'rook') {
                    pieces[move_piece].already_moving = true;
                }

                let new_piece_name = pieces[move_piece].piece_name;

                if (pieces[move_piece].piece_name == 'pawn' && cells[i].en_passant_cell != null) {
                    pieces.splice(get_piece_object_id(cells[i + 8].piece, 'black', cells[i + 8].cell_id), 1);
                    cells[i + 8].delete_piece();
                    delete_en_passent()
                } else {
                    if (pieces[move_piece].piece_name != 'pawn') {
                        delete_en_passent()
                    } else if (new_en_passent == false) {
                        delete_en_passent()
                    }
                }

                if (cells[i].check_piece() == true) {
                    let deleted_piece = get_piece_object_id(cells[i].piece, 'black', cells[i].cell_id);
                    pieces.splice(deleted_piece, 1);
                    cells[i].delete_piece();
                }

                if (cells[i].cell_id < 9 && new_piece_name == 'pawn') {
                    chose_new_piece('white', cells[i].cell_id);
                    let deleted_piece = get_piece_object_id('pawn', 'white', cells[i].cell_id);
                    pieces.splice(deleted_piece, 1);
                } else {
                    cells[i].add_piece(new_piece_name, new_piece, 'white');
                }

                turn = 2;
            }
        } else {
            if (cells[i].piece_color == 'black') {
                delete_moves();
                let piece_moves = get_moves(cells[i]);
                add_moves(piece_moves);
                move_cell_id = cells[i].cell_id;
            } else if (cells[i].move_cell == true) {
                let move_piece = get_piece_object_id(cells[move_cell_id - 1].piece, 'black', move_cell_id);
                console.log(cells[move_cell_id - 1].piece);
                pieces[move_piece].cell_id = cells[i].cell_id;
                
                cells[move_cell_id - 1].delete_piece();
                delete_moves();
                
                let new_piece = get_piece_object(pieces[move_piece].piece_name);
                new_piece.style.backgroundImage = `url(src/picture/chess/black_${pieces[move_piece].piece_name}.svg)`;

                let new_en_passent = false;

                if (pieces[move_piece].piece_name == 'pawn' && pieces[move_piece].already_moving == false) {
                    if (pieces[move_piece].piece_color == 'black' && cells[move_cell_id - 1].cell_id != cells[i].cell_id + 8) {
                        delete_en_passent();
                        cells[pieces[move_piece].cell_id - 9].en_passant_cell = cells[i].cell_id;
                        new_en_passent = true;
                    }
                }

                if (pieces[move_piece].piece_name == 'king' && pieces[move_piece].already_moving == false) {
                    if (cells[i].cell_id == 7 && cells[7].piece == 'rook') {
                        if (pieces[get_piece_object_id('rook', 'black', 8)].already_moving == false) {
                            cells[7].delete_piece();

                            let new_rook = get_piece_object('rook');
                            new_rook.style.backgroundImage = `url(src/picture/chess/black_rook.svg)`;

                            pieces[get_piece_object_id('rook', 'black', 8)].cell_id = 6;
                            pieces[get_piece_object_id('rook', 'black', 6)].selector = new_rook;

                            cells[5].add_piece('rook', new_rook, 'black');
                        }
                    } else if (cells[i].cell_id == 3 && cells[0].piece == 'rook') {
                        if (pieces[get_piece_object_id('rook', 'black', 1)].already_moving == false) {
                            cells[0].delete_piece();

                            let new_rook = get_piece_object('rook');
                            new_rook.style.backgroundImage = `url(src/picture/chess/black_rook.svg)`;

                            pieces[get_piece_object_id('rook', 'black', 1)].cell_id = 4;
                            pieces[get_piece_object_id('rook', 'black', 4)].selector = new_rook;

                            cells[3].add_piece('rook', new_rook, 'black');
                        }
                    }
                }

                if (pieces[move_piece].piece_name == 'king' || pieces[move_piece].piece_name == 'pawn' || pieces[move_piece].piece_name == 'rook') {
                    pieces[move_piece].already_moving = true;
                }

                let new_piece_name = pieces[move_piece].piece_name;

                if (pieces[move_piece].piece_name == 'pawn' && cells[i].en_passant_cell != null) {
                    pieces.splice(get_piece_object_id(cells[i - 8].piece, 'white', cells[i - 8].cell_id), 1);
                    cells[i - 8].delete_piece();
                    delete_en_passent()
                } else {
                    if (pieces[move_piece].piece_name != 'pawn') {
                        delete_en_passent()
                    } else if (new_en_passent == false) {
                        delete_en_passent()
                    }
                }

                if (cells[i].check_piece() == true) {
                    let deleted_piece = get_piece_object_id(cells[i].piece, 'white', cells[i].cell_id);
                    pieces.splice(deleted_piece, 1);
                    cells[i].delete_piece();
                }

                if (cells[i].cell_id > 56 && new_piece_name == 'pawn') {
                    chose_new_piece('black', cells[i].cell_id);
                    let deleted_piece = get_piece_object_id('pawn', 'black', cells[i].cell_id);
                    pieces.splice(deleted_piece, 1);
                } else {
                    cells[i].add_piece(new_piece_name, new_piece, 'black');
                }

                turn = 1;
            }
        }
    })
}