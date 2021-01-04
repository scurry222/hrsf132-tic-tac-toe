(function() {
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

    const win = function(token) {
        return (
            (moves[1] === token && moves[5] === token && moves[9] === token) ||
            (moves[3] === token && moves[4] === token && moves[7] === token) ||
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
    
    $resetButton.addEventListener('click', () => {
        moves = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
        
        $areas.forEach(($area) => {
            $area.innerText = '';
        })
        $winScreen.remove();
        $resetButton.remove();
        $previousWinner.innerText = `Previous Winner: ${player ? 'X' : 'O'}`;
        document.body.appendChild($previousWinner);
    })

    $board.addEventListener('click', (e) => {
        if (!moves[e.target.id]) {
            const token = player ? 'X' : 'O';
            moves[e.target.id] = token;
            e.target.innerText = token;
            win(token) ? renderReset(token, `Player ${token} wins!`) :
            stalemate() ? renderReset(token, 'Stalemate!') :
            player = !player;
        }
    })
})()