let moves = victory = 0;

function startGame() {
    document.getElementById("modalBackground").style.display = "none";

    document.getElementById("p0").innerHTML += " " + document.getElementById("inp0").value + " (&times;)";
    document.getElementById("p1").innerHTML += " " + document.getElementById("inp1").value + " (&Omicron;)";
}

function restartGame() {
    document.getElementById("modalBackground").style.display = "none";

    document.getElementById("board").style.pointerEvents = "auto";

    if (moves++ % 2 != 0)
        pointNextPlayer();

    moves = victory = 0;
    
    for (var i = 0; i < 9; i++) {
        document.getElementById('g' + i).style.pointerEvents = "auto";
        document.getElementById('g' + i).style.backgroundColor = "#2e2e337f";
        document.getElementById('g' + i).innerHTML = "";
    }
}

function pointNextPlayer() {
    let player = moves % 2;

    // Removing tabs and adding pointer to the next player
    document.getElementById('p' + player).innerHTML = document.getElementById('p' + player).innerHTML
        .replace('&nbsp;&nbsp;&nbsp;', '');
    document.getElementById('p' + player).innerHTML = '&gt; ' + document.getElementById('p' + player).innerHTML;


    // Removing pointer from the last player
    if (player == 0)
        document.getElementById('p1').innerHTML = document.getElementById('p1').innerHTML
            .replace('&gt;', '&nbsp;&nbsp;&nbsp;');
    else
        document.getElementById('p0').innerHTML = document.getElementById('p0')
            .innerHTML.replace('&gt;', '&nbsp;&nbsp;&nbsp;');

}

function showModal(title, message) {
    document.getElementById("modalBackground").style.display = "block";
    document.getElementById("modalTitle").innerHTML = title;
    document.getElementById("modalContent").innerHTML = message;
}


function showVictoryMessage() {
    let numJogador = (((moves - 1) % 2) + 1)
    let jogador = document.getElementById("p" + (numJogador - 1)).innerHTML.replace(/&nbsp;/gi,"").toUpperCase();
    showModal("Vit&oacute;ria de " + jogador + " - Jogador " + numJogador,
        "<p>Deseja iniciar uma nova partida com os mesmos jogadores?</p>" + 
        "<div class='divButton'><button onClick='restartGame()' autofocus>SIM</button>" +
        "<button onClick='window.location.reload();'>N&Atilde;O</button></div>");
}

function showDrawMessage() {
    showModal("Empate!", "<p>Deseja iniciar uma nova partida com os mesmos jogadores?</p>" +
        "<div class='divButton'><button onClick='restartGame()' autofocus>SIM</button>" +
        "<button onClick='window.location.reload();'>N&Atilde;O</button></div>");
}

function checkVictory(g1, g2, g3) {
    if (document.getElementById(g1).innerHTML == document.getElementById(g2).innerHTML &&
        document.getElementById(g1).innerHTML == document.getElementById(g3).innerHTML) {

        document.getElementById("board").style.pointerEvents = "none";

        // Changing background colour
        document.getElementById(g1).style.backgroundColor =
            document.getElementById(g2).style.backgroundColor =
            document.getElementById(g3).style.backgroundColor = 'rgba(0,91,255,1)';

        victory = 1;

        setTimeout(showVictoryMessage, 500);
    }
    else if (moves == 9 && !victory)
        setTimeout(showDrawMessage, 500);
}

function checkHorizontal(gridNum) {
    let g2 = g3 = 'g';
    let g1 = 'g' + gridNum;

    // 1st column
    if (gridNum % 3 == 0) {
        g2 += gridNum + 1;
        g3 += gridNum + 2;
    }
    // 2nd column
    else if (gridNum % 3 == 1) {
        g2 += gridNum - 1;
        g3 += gridNum + 1;
    }
    // 3rd column
    else {
        g2 += gridNum - 1;
        g3 += gridNum - 2;
    }

    checkVictory(g1, g2, g3);
}

function checkVertical(gridNum) {
    let i, g1 = g2 = g3 = 'g';

    // 1st line
    if (gridNum % 3 == 0)
        i = 0;
    // 2nd line
    else if (gridNum % 3 == 1)
        i = 1;
    // 3rd line
    else
        i = 2;

    g1 += (0 + i);
    g2 += (3 + i);
    g3 += (6 + i);

    checkVictory(g1, g2, g3);
}

function checkBoard(gridId) {
    let gridNum = parseInt(gridId[1]);

    checkHorizontal(gridNum);

    checkVertical(gridNum);

    if (gridId == 'g0' || gridId == 'g4' || gridId == 'g8')
        checkVictory('g0', 'g4', 'g8');

    if (gridId == 'g2' || gridId == 'g4' || gridId == 'g6')
        checkVictory('g2', 'g4', 'g6');
}

function addSymbol(gridId) {

    if (document.getElementById(gridId).innerHTML == "") {
        let symbol; 

        if (moves++ % 2 == 0)
            symbol = '&times;';
        else
            symbol = '&Omicron;';

        document.getElementById(gridId).innerHTML = symbol;
        document.getElementById(gridId).style.pointerEvents = "none";

        pointNextPlayer();

        if (moves >= 5)
            checkBoard(gridId);
    }
}