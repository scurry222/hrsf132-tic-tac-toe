(function() {
    const $areas = document.querySelectorAll('.area');
    const moves = {};
    let player = true;

    $areas.forEach(($area) => {
        $area.addEventListener('click', () => {
            if (!moves[$area.id]) {
                const token = player ? 'X' : 'O';
                moves[$area.id] = token;
                $area.innerText = token;
            }
            player = !player;
        });
    });
})()