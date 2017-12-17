'use strict';

/* 
    w x h   sum
    1   1   1
    3   3   8  (9 - 1)
    5   5   16 (25 - 9)
*/

let findMoves = (searchIndex) => {

    let level = 0;
    let prevSize = 1;
    for (let size = 3; size < 1050; size += 2) {

        let min = prevSize + 1;
        let max = size * size;

        if (!(searchIndex >= min && searchIndex <= max))
            continue;

        let upper = parseInt(size / 2);

        let move = (p, turn) => {
            if (p.x === upper && p.y === upper)
                turn = [-1, 0];
            else if (p.x === -upper && p.y === upper)
                turn = [0, -1];
            else if (p.x === -upper && p.y === -upper)
                turn = [1, 0];
            else if (p.x === upper && p.y === -upper)
                turn = [0, 1];

            p.x += turn[0];
            p.y += turn[1];

            return { p, turn };
        };

        let calc = (i) => {
            let p = { y: -upper + 1, x: upper };
            let turn = [0,1];

            while (i-- > 0) {
                let result = move(p, turn);
                p = result.p;
                turn = result.turn;
            }

            return p;
        }

        let i = searchIndex - min;
        let result = calc(i)
        return Math.abs(result.x) + Math.abs(result.y);
    
    }

}

//console.log(findMoves(1024))
console.log(findMoves(368078))