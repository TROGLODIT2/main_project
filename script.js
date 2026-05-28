let links_divs = document.querySelectorAll('.game-link');
let links_list = ['src/picture/fridayNight.PNG', 'src/picture/geometryDashUFO2D.PNG', 'src/picture/standoffCases.PNG', 'src/picture/standoffCases.PNG'];


for (let i = 0; i < links_list.length; i ++) {
    links_divs[i].style.backgroundImage = `url(${links_list[i]})`;
    links_divs[i].style.backgroundRepeat = 'no-repeat';
    links_divs[i].style.backgroundSize = 'cover';
}
