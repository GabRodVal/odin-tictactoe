function createGameboard() {
    //e = empty
    let curGame = Array(9).fill('e');
    let xTurn = true;

    let xScore = 0;
    let oScore = 0;

    const getSlot = (slot) => curGame[slot];

    function printGame(){
        if (xTurn){
            console.log('Vez de X \n')
        } else {
            console.log('Vez de O \n')
        }
        console.log(curGame[0],' | ',curGame[1],' | ', curGame[2]);
        console.log(curGame[3],' | ',curGame[4],' | ', curGame[5]);
        console.log(curGame[6],' | ',curGame[7],' | ', curGame[8]);
    }

    function checkWinCondition(token){
        if ((curGame[0] == token && curGame[1] == token && curGame[2] == token) ||
            (curGame[3] == token && curGame[4] == token && curGame[5] == token) ||
            (curGame[6] == token && curGame[7] == token && curGame[8] == token) ||
            (curGame[0] == token && curGame[3] == token && curGame[6] == token) ||
            (curGame[1] == token && curGame[4] == token && curGame[7] == token) ||
            (curGame[2] == token && curGame[5] == token && curGame[8] == token) ||
            (curGame[0] == token && curGame[4] == token && curGame[8] == token) ||
            (curGame[2] == token && curGame[4] == token && curGame[6] == token)){
                return true;
            }else{
                if (!curGame.includes('e')){
                    console.log("EMPATE! Ninguem ganhou");
                    resetGame();
                }

                return false;
            }
    }

    function getCurTurn(){
        let turnStatus = document.getElementById('current-player');

        if (xTurn){
            turnStatus.innerHTML = 'X'
            turnStatus.style.color = '#0C9EEA'
        }else{
            turnStatus.innerHTML = 'O'
            turnStatus.style.color = '#ea580c'
        }
    }

    function placeToken(slot, token){
        if (curGame[slot] == 'e'){
            curGame[slot] = token;
        } else {
            console.log('invalido')
            xTurn = !xTurn;
        }
    }

    function updateScore(){
        let xPlayerScore = document.getElementById('x-score');
        let oPlayerScore = document.getElementById('o-score');

        xPlayerScore.innerHTML = xScore;
        oPlayerScore.innerHTML = oScore;
    }

    function play(slot){
        if (xTurn) {
            placeToken(slot,'X');
            xTurn = !xTurn;

            if (checkWinCondition('X')){
                console.log('X VENCE!!!')
                xScore++;
                updateScore();

                resetGame();
                console.log("Placar: X:",xScore,"   O:",oScore);
            }
        } else {
            placeToken(slot, 'O')
            xTurn = !xTurn;

            if (checkWinCondition('O')){
                console.log('O VENCE!!!')
                oScore++;
                updateScore();

                resetGame();
                console.log("Placar: X:",xScore,"   O:",oScore);
            }
        }
        
        printGame();
        setBoard();
        getCurTurn();

    }
    
    function setTTTElement(token){
        if (token == 'X'){
            return '<p class="x-token">X</p>'
        } else if (token == 'O') {
            return '<p class="o-token">O</p>'
        } else {
            return ''
        }
    }

    function setBoard(){
        for (let f = 0; f<9; f++){
            let cont = document.getElementById('game-cont-' + (f+1).toString());
            cont.innerHTML = setTTTElement(curGame[f]);
        }
    }

    function resetGame(){
        for (let f = 0; f < curGame.length; f++){
            curGame[f] = 'e';
        }

        xTurn = true;

        printGame();
        setBoard();
        getCurTurn();
    }

    return { getSlot, xTurn, xScore, oScore, play, resetGame};
}


document.addEventListener('DOMContentLoaded', (event) => {
    gameboard = createGameboard();


    gameboard.resetGame();
});

