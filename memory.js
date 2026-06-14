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

memo_cards_backgrounds = [
    'deeppink', 'green', 'green', 'magenta',
    'blue', 'lime', 'blue', 'lime',
    'yellow', 'aqua', 'deeppink', 'tomato',
    'tomato', 'orange', 'magenta', 'olive',
    'aqua', 'orange', 'olive', 'yellow'
];

class Card {
    constructor(id) {
        this.id = id;
        this.background = memo_cards_backgrounds[id];
        this.is_opened = false;
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

let all_cards = document.querySelectorAll('.memo_card');
let front_cards = document.querySelectorAll('.card_front');
let behind_cards = document.querySelectorAll('.card_behind');

// Добавляет background задним стронам карточки
for (let i = 0; i < 20; i++) {
    behind_cards[i].style.background = memo_cards_backgrounds[i];
}

let opened_cards_count = 0;
let opened_cards_ids = [];

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
                    getObjectCard(opened_cards_ids[0]).closeCard();
                    getObjectCard(opened_cards_ids[1]).closeCard();
                    opened_cards_count = 0;
                    opened_cards_ids = [];
                }, 800);
            }

        }
    })
}