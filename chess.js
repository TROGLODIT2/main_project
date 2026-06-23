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

        this.left_edge = (this.cell_id + 7) % 8 == 0;
        this.top_edge = this.cell_id < 9;
        this.right_edge = this.cell_id % 8 == 0;
        this.bottom_edge = this.cell_id > 56;
    }

    add_piece (piece_name, piece_object, piece_color) {
        // Добавление фигуры на клетку
        this.selector.appendChild(piece_object);
        this.piece = piece_name;
        this.piece_color = piece_color;
    }

    delete_piece () {
        // Удаление фигуры с клетки
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

    }

    delete_move () {

    }
}

class Pawn {
    constructor(piece_color, already_moving, cell_id) {
        // Создание фигуры на доске
        this.selector = create_piece('pawn', cell_id, piece_color);

        // Добавление сойств
        this.piece_name = 'pawn';
        this.check = false;
        this.piece_color = piece_color;
        this.already_moving = already_moving;
        this.cell_id = cell_id;
    }
    
    // Проверка нападения на короля
    check_the_check() {

    }
}

class Rook {
    constructor(piece_color, already_moving, cell_id) {
        // Создание фигуры на доске
        this.selector = create_piece('rook', cell_id, piece_color);

        // Добавление сойств
        this.piece_name = 'rook';
        this.piece_color = piece_color;
        this.already_moving = already_moving;
        this.cell_id = cell_id;
    }

    // Проверка нападения на короля
    check_the_check() {

    }

    // Проверка связки короля
    check_pins_to_king() {

    }
}

class Knight {
    constructor(piece_color, cell_id) {
        // Создание фигуры на доске
        this.selector = create_piece('knight', cell_id, piece_color);

        // Добавление сойств
        this.piece_name = 'knight';
        this.piece_color = piece_color;
        this.cell_id = cell_id;
    }
    
    // Проверка нападения на короля
    check_the_check() {

    }
}

class Bishop {
    constructor(piece_color, cell_id) {
        // Создание фигуры на доске
        this.selector = create_piece('bishop', cell_id, piece_color);

        // Добавление сойств
        this.piece_name = 'bishop';
        this.piece_color = piece_color;
        this.cell_id = cell_id;
    }
    
    // Проверка нападения на короля
    check_the_check() {

    }

    // Проверка связки короля
    check_pins_to_king() {

    }
}

class Queen {
    constructor(piece_color, cell_id) {
        // Создание фигуры на доске
        this.selector = create_piece('queen', cell_id, piece_color);

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
                if (pieces[i].check_the_check() == true) {
                    return true;
                }
            }
        }

        // Если ни 1 фигура не объявляет шах
        return false;
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

// Получение id объекта короля
function get_king_object_id(king_color) {
    for (let i = 0; i < pieces.length; i++) {
        // Проверка цвета фигуры
        if (pieces[i].piece_color == king_color) {
            // проверка на объект короля
            if (pieces[i].piece_name == 'king') {
                return i;
            }
        }
    }
}

// Добавление возможных ходов фигуре
function add_moves(cell_object) {
    let king_id = get_king_object_id(cell_object.piece_color);
    if (pieces[king_id].check_the_check() == true) {
        console.log('Нашему королю объявлен шах');
    } else {
        console.log('Король в безопасности, можно ходить');
        // Проверка на связку фигуры
    }
}

// ПЕРЕДЕЛАТЬ МЕТОД ОПРЕДЕЛЕНИЯ ШАХА С ИСПОЛЬЗОВАНИЕМ ЭТОЙ ФУНКЦИИ
// ДОБАВИТЬ ДИАГОНАЛИ В ФУНКЦИЮ, А ТАКЖЕ ХОДЫ КОНЯ
// Функция, возвращающая атакованные клетки по одной из линий атаки фигуры
function get_line_cells(cell_id, line_type) {
    let attacked_cells = [];

    // Определение линии атаки
    let edge = '';
    let mult = 0;
    if (line_type == 'left') {
        mult = -1;
        edge = 'left_edge'
    } else if (line_type == 'right') {
        mult = 1;
        edge = 'right_edge';
    } else if (line_type == 'top') {
        mult = -8;
        edge = 'top_edge';
    } else if (line_type == 'bottom') {
        mult = 8;
        edge = 'bottom_edge';
    }

    // Проверка атакованных клеток
    if (cells[cell_id - 1][edge] == false) {
        for (let i = 1; i < 9; i++) {
            attacked_cells.push(cell_id + i * mult)
            // Проверка на фигуру
            if (cells[cell_id - 1 + i * mult].check_piece() == true) {
                break;
            }
            // Проверка на край
            if (cells[cell_id - 1 + i * mult][edge] == true) {
                break;
            }
        }
    }

    return attacked_cells;
}

// Функция, которая возвращает клетки, атакованные фигурой
function get_attacked_cells(cell_id, type_attack) {
    let attacked_cells = [];
    if (type_attack == 'rook') {
        // С ПОМОЩЬЮ МНОЖЕСТВ ОБЪЕДЕНИТЬ ВСЕ КЛЕТКИ, АТАКОВАННЫЕ ФИГУРОЙ
        //get_line_cells(cell_id, line_type)
    }
}



// Расстановка фигур
let pieces = [];
/* 
        ОТКЛЮЧЕНО ДЛЯ ОТЛАДКИ        ОТКЛЮЧЕНО ДЛЯ ОТЛАДКИ        ОТКЛЮЧЕНО ДЛЯ ОТЛАДКИ        ОТКЛЮЧЕНО ДЛЯ ОТЛАДКИ
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
        ОТКЛЮЧЕНО ДЛЯ ОТЛАДКИ        ОТКЛЮЧЕНО ДЛЯ ОТЛАДКИ        ОТКЛЮЧЕНО ДЛЯ ОТЛАДКИ        ОТКЛЮЧЕНО ДЛЯ ОТЛАДКИ
*/

pieces.push(new Queen('black', name_to_id('e8')));
pieces.push(new King('white', false, name_to_id('e1')));

// Основной код
/*
Детали реализации
1. Проверить шахи (если да, то проверить возможность заслона своего короля)
2. Проверить наличие связки короля
3. Проверить возможные ходы на наличие преград
*/

// Очередь хода
let turn = 1;

for (let i = 0; i < 64; i++) {
    cells[i].selector.addEventListener('click', function () {
        if (turn == 1) {
            if (cells[i].piece_color == 'white') {
                add_moves(cells[i]);
            } else if (cells[i].piece_color == 'black') {
                console.log('Выбрана черная фигура');
            }
        }
    })
}
