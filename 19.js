const fs = require('fs');

let input = 
`    |          
    |  +--+    
    A  |  C    
F---|----E|--+ 
    |  |  |  D 
    +B-+  +--+ 
               `;

input = fs.readFileSync('input19.txt', 'utf-8');

let grid = input.split(/\n/g)
    .map(row => {
        return row.split('');
    })
    .filter(cols => cols.length > 0);

class Network {
    constructor(grid) {
        // validate size of grid
        grid.reduce((av, row, i) => {
            if (av > -1 && row.length !== av)
                throw new Error(`row ${row.length} length !== ${av}, ${row.join('')}`);
            av = row.length;
            return av;
        }, -1);

        this.grid = grid;
        this.collected = [];
        this.steps = 1;
    }

    getStartPos() {
        let start = grid[0].map((char,i) => {
            if (char === '|')
                return i;
        })
        .filter(i => Boolean(i))[0];
        return { x: start, y: 0 };
    }

    gotoStart() {
        this.pos = this.getStartPos();
        this.pos.dir = { x:0, y:1 };
    }

    gotoNext() {
        let dir = this.pos.dir;
        let i;
        let isTraversable;
        for (i = 0; i < 4 && !(isTraversable=this.isRelativePosTraversable(dir)); i++)
            this.rotate(dir, i*90);

        if (isTraversable) {
            this.pos.x += dir.x;
            this.pos.y += dir.y;
            this.steps++;
            return true;
        }
        return false;
    }

    rotate(vec, ang)
    {
        ang = -ang * (Math.PI/180);
        var cos = Math.cos(ang);
        var sin = Math.sin(ang);
        let result = [Math.round(10000*(vec.x * cos - vec.y * sin))/10000, Math.round(10000*(vec.x * sin + vec.y * cos))/10000];
        vec.x = parseInt(result[0]);
        vec.y = parseInt(result[1]);
    }

    isRelativePosTraversable(dpos) {
        let y = this.pos.y + dpos.y;
        let x = this.pos.x + dpos.x;
        if (y < 0 || y >= this.grid[y].length || x < 0 || x >= this.grid[y].length)
            return false;
        let charCode = this.grid[y][x].charCodeAt(0);
        if (charCode >= 65 && charCode < 91)
            this.collected.push(this.grid[y][x]);
        return this.grid[y][x] !== ' ';
    }
}

let network = new Network(grid);
network.gotoStart();
while(network.gotoNext())
    ;

console.log(network.collected.join(''))
console.log(network.steps);