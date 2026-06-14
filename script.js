let links_divs = document.querySelectorAll('.game');
let game_bakground = ['src/picture/shashki.jpg', 'src/picture/krestiki-noliki.png'];


for (let i = 0; i < game_bakground.length; i ++) {
    links_divs[i].style.backgroundImage = `url(${game_bakground[i]})`;
    links_divs[i].style.backgroundRepeat = 'no-repeat';
    links_divs[i].style.backgroundSize = 'cover';
}

let links = document.querySelectorAll('.game-link');
let links_list = ['shashki_game.html', 'games/krestiki-noliki/krestiki-noliki.html'];

for (let i = 0; i < game_bakground.length; i ++) {
    links[i].href = `${links_list[i]}`;
    links[i].style.display = 'block';
}

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
