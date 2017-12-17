
let knotHash = (lengthInput, size) => {
        
    let strToList = (input) => input.split(',').map(i => parseInt(i)).filter(i => !isNaN(i));    
    let input = new Array(size).fill(0).map((v,i) => i);

    let getLengths = (lengthInput) => {
        return lengthInput.split('').map(l => {
            let c = l.toString().charCodeAt(0);
            if (c > 255) throw new Error('err');
            return c;
        }).concat([17, 31, 73, 47, 23]);
    };

    // to ascii
    let lengths = getLengths(lengthInput);

    if (JSON.stringify(getLengths(`1,2,3`)) !== JSON.stringify([49,44,50,44,51,17,31,73,47,23]))
        throw new Error('getLengths error');

    let slice = (list, startAt, count) => {

        if (!Array.isArray(list)) throw new Error('not an array');
        if (!Number.isInteger(startAt))
            throw new Error(`startAt not a number`);
        if (!Number.isInteger(count))
            throw new Error(`count not a number`);
        let result = [];
        for (var i = startAt; i < startAt + count; i++) {
            let ii = i;
            while (ii >= list.length)
                ii-=list.length;
            let d = list[ii];
            if (!Number.isInteger(d))
                throw new Error(`d is not a number`);
            result.push(d);
        }
        return result;
    };

    let reverseList = (list, startAt, count) => {
        let sel = slice(list, startAt, count).reverse();
        let a = 0;
        let newList = list.slice();
        for (var i = 0; i < sel.length; i++) {
            if (startAt + i + a >= newList.length)
                a = - i - startAt;
            if (!Number.isInteger(sel[i]))
                throw new Error(`not number`);
            if (startAt + i + a >= newList.length)
                throw new Error('overflow');
            newList[startAt + i + a] = sel[i];
        }
        if (newList.length !== list.length)
            throw new Error(`not same size lists`);
        return newList;
    }

    let skipSize = 0;
    let index = 0;
    let hashRound = (input, lengths) => {
        for (let lengthIndex = 0; lengthIndex < lengths.length; lengthIndex++) {
            let output = reverseList(input, index, lengths[lengthIndex]);
            input = output;
            index += lengths[lengthIndex] + skipSize;
            while (index >= input.length)
                index -= input.length;
            skipSize++;
        }

        return input;
    }

    let test = hashRound(new Array(256).fill(0).map((v,i) => i), strToList(`147,37,249,1,31,2,226,0,161,71,254,243,183,255,30,70`));
    if (test[0] * test[1] !== 37230)
        throw new Error('hashRound invalid');

    index = 0;
    skipSize = 0;

    for (let i = 0; i < 64; i++) {
        let output = hashRound(input, lengths);
        input = output;
    }

    let hash = '';
    let n = 0;
    for (var i = 0; i < 16; i++) {
        let denseByte = 0;
        for (var j = 0; j < 16; j++) {
            denseByte = denseByte ^ input[i*16+j];
            n++;
        }
        hash += denseByte.toString(16).padStart(2, '0');
    }

    if (n !== 256) throw new Error(`n !?`);
    if (hash.length !== 2*16) throw new Error('inc length');

    return hash;
}

function bitCount (n) {
    n = n - ((n >> 1) & 0x55555555)
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
    return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
  }

class Grid {

    constructor() {
        this.grid = [];
        this.groups = 0;
    }

    add(rowNumber, byteNumber, byte) {
        this.grid[rowNumber] = this.grid[rowNumber] || [];
        this.grid[rowNumber] = this.grid[rowNumber].concat(byte.toString(2).padStart(8, '0').split(''));
    }

    isOutOfBounds(pos) {
        let outOfBounds = pos.y >= this.grid.length || 
            pos.y < 0 || 
            pos.x >= this.grid[pos.y].length || 
            pos.x < 0;

        return outOfBounds;
    }

    isPosWalkable(pos) {
        return !this.isOutOfBounds(pos) && this.grid[pos.y][pos.x] === '1';
    }

    getGroups() {

        let pos;
        let trail = [];
        while ((pos = this.getNextUsedPos())) {

            let visited = {};
            this.groups++;
            trail.push(pos);
            pos = { ...pos };
            let backTracking = false;

            do {
                if ((!backTracking && !this.isPosWalkable(pos)) || pos.dir > 4) {
                     trail.pop();
                    pos = trail[trail.length - 1];
                    if (pos) {
                        pos.dir++;
                    }
                    backTracking = true;
                    continue;
                } 

                backTracking = false;
                this.grid[pos.y][pos.x] = '-';

                if (!pos)
                    continue;

                pos = { ...pos };

                switch(pos.dir) {
                    case 1: pos.x++; break;
                    case 2: pos.y++; break;
                    case 3: pos.x--; break;
                    case 4: pos.y--; break;
                    default:
                        throw new Error('asdf');
                }

                pos.dir = 1;
                trail.push(pos);
                pos = { ...pos };              

            } while(trail.length);
        }

        return this.groups;
    }

    getNextY() {
        for (let y = 0; y < this.grid.length; y++)
            if (this.grid[y].indexOf('1') > -1)
                return y;
    }

    getNextUsedPos() {
        let y = this.getNextY();
        if (y === -1 || y === undefined)
            return;
        let x = this.grid[y].indexOf('1');
        return {x, y, dir: 1};
    }
}

let input = `jzgqcdpd`;
let sum = 0;
let grid = new Grid();

for (let i = 0; i < 128; i++) {
    let hash = knotHash(input + '-' + i, 256)
    let pos = 0;
    let parts = hash.match(/.{2}/g);
    parts.map(part => parseInt(part, 16))
        .map(byte => {
            grid.add(i, pos++, byte);
        });
}

console.log(grid.getGroups());