// Открытие бургер меню
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

function shuffle(arr) {
    let old_arr = arr.slice();
    let new_arr = [];

    for (let i = 0; i < arr.length; i ++) {
        let index_element = Math.floor(Math.random() * old_arr.length);
        new_arr.push(old_arr[index_element]);
        old_arr.splice(index_element, 1);
    }
    return new_arr;
}

memo_cards_backgrounds = [
    'deeppink', 'green', 'green', 'magenta',
    'blue', 'lime', 'blue', 'lime',
    'yellow', 'aqua', 'deeppink', 'tomato',
    'tomato', 'orange', 'magenta', 'olive',
    'aqua', 'orange', 'olive', 'yellow'
];

memo_cards_backgrounds = shuffle(memo_cards_backgrounds);

class Card {
    constructor(id) {
        this.id = id;
        this.background = memo_cards_backgrounds[id];
        this.is_opened = false;
        this.is_deleted = false;
    }
    openCard() {
        this.is_opened = true;
        front_cards[this.id].style.transform = 'rotateY(180deg)';
        behind_cards[this.id].style.transform = 'rotateY(360deg)';
    }
    closeCard() {
        this.is_opened = false;
        front_cards[this.id].style.transform = '';
        behind_cards[this.id].style.transform = 'rotateY(180deg)';
    }
    deleteCard() {
        front_cards[this.id].style.background = 'white';
        behind_cards[this.id].style.background = 'white';
        this.is_deleted = true;
        front_cards[this.id].style.display = 'none';
        behind_cards[this.id].style.display = 'none';
        front_cards[this.id].style.transform = '';
        behind_cards[this.id].style.transform = '';
    }
}

let memo_cards = [];

// Тут добавляются карточки в грид
let board = document.querySelector('.memo_cards');

for (let i = 0; i < 20; i++) {
    let card = document.createElement('div');
    card.setAttribute('id', `${i}`);
    card.classList.add('memo_card');
    
    let card_front = document.createElement('div');
    card_front.classList.add('card_front');

    let card_behind = document.createElement('div');
    card_behind.classList.add('card_behind');

    card.appendChild(card_behind);
    card.appendChild(card_front);
    board.appendChild(card);

    // Создание объекта карточки
    memo_cards.push(new Card(i));
}

// Получение объекта карточки
function getObjectCard(id) {
    let remaining_cards = document.querySelectorAll('.memo_card');
    for (let i = 0; i < remaining_cards.length; i++) {
        if (+id == +remaining_cards[i].getAttribute('id')) {
            return memo_cards[i];
        }
    }
    return null;
}

let turn = 1;
let all_opened_pairs = 0;

let player1_pairs_count = 0;
let player2_pairs_count = 0;
let player1_pairs_text = document.querySelectorAll('.taken_cards')[0].querySelector('p');
let player2_pairs_text = document.querySelectorAll('.taken_cards')[1].querySelector('p');

let turn_first = document.querySelector('.turn_first');
let turn_second = document.querySelector('.turn_second');

let all_cards = document.querySelectorAll('.memo_card');
let front_cards = document.querySelectorAll('.card_front');
let behind_cards = document.querySelectorAll('.card_behind');

// Добавляет background задним стронам карточки
for (let i = 0; i < 20; i++) {
    behind_cards[i].style.background = memo_cards_backgrounds[i];
}

let opened_cards_count = 0;
let opened_cards_ids = [];

// Первоночальное окрашивание
document.querySelectorAll('.taken_cards')[0].style.background = '#adffd6';

// Селекторы всплывающего окна победы
let result_window = document.querySelector('.result_window');
let result = document.querySelector('.result');

// Событие выбора карточки
for (let i = 0; i < 20; i++) {
    all_cards[i].addEventListener('click', function () {
        let cardObject = getObjectCard(i);
        if (cardObject.is_opened == false && opened_cards_count < 2) {
            getObjectCard(i).openCard();
            opened_cards_count += 1;
            opened_cards_ids.push(i);

            if (opened_cards_count == 2) {
                setTimeout(function () {
                    if (getObjectCard(opened_cards_ids[0]).background == getObjectCard(opened_cards_ids[1]).background) {
                        getObjectCard(opened_cards_ids[0]).deleteCard();
                        getObjectCard(opened_cards_ids[1]).deleteCard();
                        opened_cards_count = 0;
                        opened_cards_ids = [];

                        all_opened_pairs += 1;
                        if (turn == 1) {
                            player1_pairs_count += 1;
                            let string_text = player1_pairs_count.toString();
                            console.log(string_text);
                            if (+string_text[string_text.length - 1] == 0) {
                                player1_pairs_text.innerHTML = `${player1_pairs_count} пар`;
                            } else if (+string_text[string_text.length - 1] == 1) {
                                player1_pairs_text.innerHTML = `${player1_pairs_count} пара`;
                            } else if (+string_text[string_text.length - 1] < 5) {
                                player1_pairs_text.innerHTML = `${player1_pairs_count} пары`;
                            } else {
                                player1_pairs_text.innerHTML = `${player1_pairs_count} пар`;
                            }
                        } else {
                            player2_pairs_count += 1;
                            let string_text = player2_pairs_count.toString();
                            if (+string_text[string_text.length - 1] == 0) {
                                player2_pairs_text.innerHTML = `${player2_pairs_count} пар`;
                            } else if (+string_text[string_text.length - 1] == 1) {
                                player2_pairs_text.innerHTML = `${player2_pairs_count} пара`;
                            } else if (+string_text[string_text.length - 1] < 5) {
                                player2_pairs_text.innerHTML = `${player2_pairs_count} пары`;
                            } else {
                                player2_pairs_text.innerHTML = `${player2_pairs_count} пар`;
                            }
                        }
                        
                        if (all_opened_pairs == 10) {
                            result_window.style.display = 'flex';
                            if (player1_pairs_count > player2_pairs_count)
                                result.innerHTML = 'Игрок 1 победил';
                            else if (player2_pairs_count > player1_pairs_count) {
                                result.innerHTML = 'Игрок 2 победил';
                            } else {
                                result.innerHTML = 'Ничья';
                            }
                        }
                    } else {
                        getObjectCard(opened_cards_ids[0]).closeCard();
                        getObjectCard(opened_cards_ids[1]).closeCard();
                        opened_cards_count = 0;
                        opened_cards_ids = [];
                        if (turn == 1) {
                            turn = 2;
                            turn_first.style.display = 'none';
                            turn_second.style.display = 'inline';
                            document.querySelectorAll('.taken_cards')[0].style.background = '';
                            document.querySelectorAll('.taken_cards')[1].style.background = '#adffd6';
                        } else {
                            turn = 1;
                            turn_first.style.display = 'inline';
                            turn_second.style.display = 'none';
                            document.querySelectorAll('.taken_cards')[0].style.background = '#adffd6';
                            document.querySelectorAll('.taken_cards')[1].style.background = '';
                        }
                    }
                }, 800);
            }
        }
    })
}