(function() {

    // FUNCTION INITIALIZATIONS
    //______________________________

    // Initialize DOM board
    const initializeBoard = function() {
        const $newBoard = document.createElement('div');
        $newBoard.classList.add('board');
        document.body.prepend($newBoard);
        for (let i = 0; i <= 2; i++) {
            let $row = document.createElement('div');
            $row.classList.add('row')
            $row.setAttribute('id', (i + 1).toString());
            $newBoard.appendChild($row);
            let offset = i * 3;
            for (let j = 0; j <= 2; j++) {
                let $area = document.createElement('div');
                $area.classList.add('area');
                $area.setAttribute('id', (j + offset + 1).toString());
                $row.appendChild($area);
            }
        }
    }

    // Ez win function (replace if time)
    const win = function(token) {
        return (
            (moves[1] === token && moves[5] === token && moves[9] === token) ||
            (moves[3] === token && moves[5] === token && moves[7] === token) ||
            (moves[1] === token && moves[2] === token && moves[3] === token) ||
            (moves[4] === token && moves[5] === token && moves[6] === token) ||
            (moves[7] === token && moves[8] === token && moves[9] === token) ||
            (moves[1] === token && moves[4] === token && moves[7] === token) ||
            (moves[2] === token && moves[5] === token && moves[8] === token) ||
            (moves[3] === token && moves[6] === token && moves[9] === token))
        ? true: false;
    }
 
    // Handle stalemate (Look ahead if eventual stalemate if evident if time)
    const stalemate = function() {
        return !Object.values(moves).includes('');
    }

    // Render finished game info
    const renderReset = function(winner, message) {
        $winScreen.innerText = message;
        document.body.appendChild($winScreen);
        $winScreen.appendChild($resetButton);
        previousWinner = winner;
    }

    // Add board to DOM
    initializeBoard();


    // DOM AND OTHER OBJECTS
    //______________________________

    // Grab board and placement areas DOM objects
    const $board = document.querySelector('.board');
    const $areas = document.querySelectorAll('.area');

    // Moves so far object
    let moves = {
        1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''
    };

    // Keep previous winner 
    let previousWinner = null;
    let player = previousWinner !== null ? previousWinner : true;

    // Create win screen DOM object
    const $winScreen = document.createElement('div')
    $winScreen.classList.add('win-screen');

    // Create reset button DOM object
    const $resetButton = document.createElement('button');
    $resetButton.innerText = 'Play Again?';

    // Create previous winner DOM object
    const $previousWinner = document.createElement('div');

    // Submit player names
    const $playerForm = document.createElement('form');
    const $playerOneInput = document.createElement('input');
    const $playerTwoInput = document.createElement('input');
    const $submitForm = document.createElement('button');


    // EVENT LISTENERS
    //______________________________

    // Handle reset of DOM and data, Log previous winner
    $resetButton.addEventListener('click', () => {
        moves = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
        $areas.forEach(($area) => $area.innerText = '');
        $winScreen.remove();
        $resetButton.remove();
        if (previousWinner) {
            $previousWinner.innerText = `Previous Winner: ${ player ? 'X' : 'O' }`;
            document.body.appendChild($previousWinner);
        }
    });

    // Handle click events on board
    $board.addEventListener('click', (e) => {
        if (!moves[e.target.id]) {
            const token = player ? 'X' : 'O';
            moves[e.target.id] = token;
            e.target.innerText = token;
            win(token) ? renderReset(token, `Player ${ token } wins!`) :
            stalemate() ? renderReset(null, 'Stalemate!') :
            player = !player;
        }
    });
})()
