(function() {

    // FUNCTION INITIALIZATIONS
    //______________________________

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
 
    const stalemate = function() {
        return !Object.values(moves).includes('');
    }

    const renderReset = function(winner, message) {
        $winScreen.innerText = message;
        document.body.appendChild($winScreen);
        $winScreen.appendChild($resetButton);
        previousWinner = winner;
    }

    initializeBoard();


    // DOM AND OTHER OBJECTS
    //______________________________

    const $board = document.querySelector('.board');
    const $areas = document.querySelectorAll('.area');
    let moves = {
        1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''
    };
    let previousWinner = null;
    let player = previousWinner !== null ? previousWinner : true;

    const $winScreen = document.createElement('div')
    $winScreen.classList.add('win-screen');

    const $resetButton = document.createElement('button');
    $resetButton.innerText = 'Play Again?';

    const $previousWinner = document.createElement('div');


    // EVENT LISTENERS
    //______________________________

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
