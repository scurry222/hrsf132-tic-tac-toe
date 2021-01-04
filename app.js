(function() {
    const $board = document.querySelector('.board');
    let moves = {
        1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''
    };
    let player = true;

    const $winScreen = document.createElement('div')
    $winScreen.classList.add('win-screen');

    const $resetButton = document.createElement('button');
    $resetButton.innerText = 'Play Again?';

    $resetButton.addEventListener('click', () => {
        moves = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };

        $areas.forEach(($area) => {
            $area.innerText = '';
        })
        $winScreen.remove();
        $resetButton.remove();
    })

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

    const renderReset = function(message) {
        $winScreen.innerText = message;
        document.body.appendChild($winScreen);
        $winScreen.appendChild($resetButton);
    }

    $board.addEventListener('click', (e) => {
        if (!moves[e.target.id]) {
            const token = player ? 'X' : 'O';
            moves[e.target.id] = token;
            e.target.innerText = token;
            win(token) ? renderReset(`Player ${token} wins!`) :
            stalemate() ? renderReset('Stalemate!'): null;
            player = !player;
        }
    })
})()