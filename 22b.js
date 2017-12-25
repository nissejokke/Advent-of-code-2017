
// const input = `..#
// #..
// ...`;

const input = `.#.##..##...#...#.....##.
#.......###..#...#.#.....
##.###..#....#.##.###.##.
##...#.#.##..#.#.###.....
.#....#..#..#..#..#...###
##.####....#...#...###...
#.#########.####...##..##
...###....#.##..##.#...##
##.###....#...#.##.######
.#.##.###.#.#..####..#..#
###.....##..##.##.#.#...#
....#.##.#.#.####.#...#..
....#...#..#...######.##.
##........###.###..#####.
....#.#.#..#######...##..
###.....####..#..##..####
#...##.#....####..##.#...
.##.#.#.....#.#.#..##..##
.#.#.#.##...##.###...####
.#..#.#...#......#...#..#
##.....##...#..####...###
..#####.#..###...#.#.#..#
.####.#....##..##...##..#
#.##..#.##..#.#.##..#...#
##.###.#.##########.#####`;

const gridInput = input.split(/\n/)
    .map(row => row.split(''));

class Grid {
    constructor(grid) {
        this.states = ['.', 'w', '#', 'f'];
        this.grid = {};
        this.dir = {x:0,y:-1};
        this.pos = {x:0,y:0};
        this.newInfectCount = 0;
        let b = (grid.length - 1) / 2;
        for (let y = 0; y < grid.length; y++)
            for (let x = 0; x < grid.length; x++)
                this.set(x - b, y - b, grid[y][x]);        
        this.newInfectCount = 0;
    }

    key(x, y) {
        return x + ',' + y;
    }

    set(x, y, char) {
        this.grid[this.key(x,y)] = char;
    }

    get (x,y) {
        return this.grid[this.key(x,y)];
    }

    infect(x, y) {
        this.set(x, y, '#');
        this.newInfectCount++;
    }

    clean(x, y) {
        this.set(x, y, '.');
    }

    weaken(x, y) {
        this.set(x, y, 'w');
    }

    flag(x, y) {
        this.set(x, y, 'f');
    }

    isInfected(x, y) {
        return this.get(x, y) === '#';
    }

    isClean(x, y) {
        let d = this.get(x, y);
        return !d || d === '.';
    }

    isWeakened(x, y) {
        return this.get(x, y) === 'w';        
    }

    isFlagged(x, y) {
        return this.get(x, y) === 'f';
    }

    rotate(vec, ang) {
        ang = -ang * (Math.PI/180);
        var cos = Math.cos(ang);
        var sin = Math.sin(ang);
        let result = [Math.round(10000*(vec.x * cos - vec.y * sin))/10000, Math.round(10000*(vec.x * sin + vec.y * cos))/10000];
        return { x: parseInt(result[0]), y: parseInt(result[1]) };
    }

    burst() {
        let isClean = this.isClean(this.pos.x, this.pos.y);
        let isWeakened = this.isWeakened(this.pos.x, this.pos.y);
        let isFlagged = this.isFlagged(this.pos.x, this.pos.y);
        let isInfected = this.isInfected(this.pos.x, this.pos.y);

        if (isClean) {
            this.dir = this.rotate(this.dir, 90);
            this.weaken(this.pos.x, this.pos.y);
        }
        else if (isWeakened) {
            this.infect(this.pos.x, this.pos.y);
        }
        else if (isInfected) {
            this.dir = this.rotate(this.dir, -90);
            this.flag(this.pos.x, this.pos.y);
        }
        else if (isFlagged) {
            this.dir = this.rotate(this.dir, 180);
            this.clean(this.pos.x, this.pos.y);
        }
        
        this.pos.x += this.dir.x;
        this.pos.y += this.dir.y;
    }
}

let grid = new Grid(gridInput);
for (let i = 0; i < 10000000; i++)
    grid.burst();

console.log(grid.newInfectCount);