
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

    set(x, y, char) {
        let key = x + ',' + y;
        this.grid[key] = char;
    }

    infect(x, y) {
        this.set(x, y, '#');
        this.newInfectCount++;
    }

    clean(x, y) {
        this.set(x, y, '.');
    }

    isInfected(x, y) {
        let key = x + ',' + y;
        return this.grid[key] === '#';
    }

    rotate(vec, ang) {
        ang = -ang * (Math.PI/180);
        var cos = Math.cos(ang);
        var sin = Math.sin(ang);
        let result = [Math.round(10000*(vec.x * cos - vec.y * sin))/10000, Math.round(10000*(vec.x * sin + vec.y * cos))/10000];
        return { x: parseInt(result[0]), y: parseInt(result[1]) };
    }

    burst() {
        let isInfected = this.isInfected(this.pos.x, this.pos.y);
        if (isInfected)
            this.dir = this.rotate(this.dir, -90);
        else
            this.dir = this.rotate(this.dir, 90);

        if (isInfected)
            this.clean(this.pos.x, this.pos.y);
        else
            this.infect(this.pos.x, this.pos.y);
        
        this.pos.x += this.dir.x;
        this.pos.y += this.dir.y;
    }
}

let grid = new Grid(gridInput);
for (let i = 0; i < 10000; i++)
    grid.burst();

console.log(grid.newInfectCount);