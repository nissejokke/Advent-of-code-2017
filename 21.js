// https://medium.com/front-end-hacking/matrix-rotation-%EF%B8%8F-6550397f16ab

const compose = (a, b) => x => a(b(x));
const reverse = array => [...array].reverse();

// `get` is a simple accessor function, used for selecting an item in an array.
const get = id => array => array[id];

// This functional version of map accepts our function first.
const map = (fn, array) => array.map(fn);

// `pluck` allows us to map through a matrix, gathering all the items at a
// specific index.
const pluck = (index, data) => map(get(index), data);

// `rangeFrom` creates an array equal in length to the array provided,
// but with a 0-based range for values.
// eg. ['a', 'b', 'c'] -> [0, 1, 2]
const rangeFrom = ({length}) => [...Array(length).keys()];


const flipMatrix = matrix => (
  map(index => pluck(index, matrix), rangeFrom(matrix))
);

const rotateMatrix = compose(flipMatrix, reverse);
const flipMatrixCounterClockwise = compose(reverse, rotateMatrix);
const rotateMatrixCounterClockwise = compose(reverse, flipMatrix);

let matrix = [
    [0,1,0],
    [0,0,1],
    [1,1,1]
]

// const input = `../.# => ##./#../...
//.#./..#/### => #..#/..../..../#..#`;

const input = `../.. => #../.../..#
#./.. => ###/##./.#.
##/.. => ..#/..#/##.
.#/#. => ###/.../#..
##/#. => #../#.#/.#.
##/## => ##./##./...
.../.../... => .##./.##./#.##/#.##
#../.../... => #.#./####/..#./#..#
.#./.../... => #.../#..#/##.#/#.##
##./.../... => .##./##../..##/....
#.#/.../... => #.../..##/#.##/#...
###/.../... => ##.#/.#../####/....
.#./#../... => .###/#..#/####/...#
##./#../... => ##.#/#.../..#./####
..#/#../... => ####/###./..../#.#.
#.#/#../... => ..##/.#../.#.#/...#
.##/#../... => #.##/###./####/####
###/#../... => #.#./##.#/..#./####
.../.#./... => .##./#.../..../#...
#../.#./... => ###./.##./...#/....
.#./.#./... => .#../..#./###./....
##./.#./... => .##./..../.###/...#
#.#/.#./... => ###./.##./##.#/#.##
###/.#./... => ##../..##/####/...#
.#./##./... => ..#./#..#/##../.#..
##./##./... => .#../...#/###./##..
..#/##./... => .###/.###/####/...#
#.#/##./... => ####/#.#./###./##..
.##/##./... => ##../..#./###./..#.
###/##./... => ##../..../.##./#.#.
.../#.#/... => ..#./.#.#/.##./#.##
#../#.#/... => ####/..##/#.../#.#.
.#./#.#/... => #.../#..#/#.../..##
##./#.#/... => .#.#/##.#/.###/#..#
#.#/#.#/... => ..#./##.#/##../#..#
###/#.#/... => ####/#..#/.##./###.
.../###/... => .##./..##/..#./#...
#../###/... => .##./###./##../.###
.#./###/... => ##../..../..##/##..
##./###/... => ##.#/#.#./#.#./##..
#.#/###/... => ..##/.#.#/..../.#.#
###/###/... => ####/.#../...#/.#..
..#/.../#.. => .#.#/#..#/##../##.#
#.#/.../#.. => ...#/.#.#/##.#/###.
.##/.../#.. => ..##/##../#.../#.##
###/.../#.. => ..##/##../#.#./##..
.##/#../#.. => #.##/####/##../####
###/#../#.. => ##../#..#/#.##/####
..#/.#./#.. => #.#./#.##/...#/..#.
#.#/.#./#.. => ..../...#/..../#.#.
.##/.#./#.. => ...#/#..#/.#../##.#
###/.#./#.. => .#../..#./.#../.#..
.##/##./#.. => #.##/..../#.##/.#..
###/##./#.. => #.../##../#.#./#.##
#../..#/#.. => #.../..##/#.#./.#..
.#./..#/#.. => ##../#.../#..#/##.#
##./..#/#.. => ###./#..#/..##/....
#.#/..#/#.. => ...#/##.#/#.../####
.##/..#/#.. => .##./###./#.../#..#
###/..#/#.. => #.#./.#.#/.#.#/...#
#../#.#/#.. => ##.#/####/#.##/##.#
.#./#.#/#.. => ...#/.#.#/.#../.##.
##./#.#/#.. => ##.#/.##./#.##/####
..#/#.#/#.. => ##../.#../##.#/#.#.
#.#/#.#/#.. => ..#./###./#..#/.#.#
.##/#.#/#.. => ..../.##./..#./##.#
###/#.#/#.. => #.#./.#../###./##..
#../.##/#.. => ##.#/##.#/.#.#/#.##
.#./.##/#.. => ###./.##./..../####
##./.##/#.. => ####/#..#/##../###.
#.#/.##/#.. => ####/..#./#..#/.#.#
.##/.##/#.. => ##../##.#/#.##/.##.
###/.##/#.. => ..../..#./####/##.#
#../###/#.. => ####/.#.#/#..#/#...
.#./###/#.. => #.#./#.#./.#../#...
##./###/#.. => ..../#.#./.##./##..
..#/###/#.. => ##.#/...#/.#../#.#.
#.#/###/#.. => ####/.##./..##/..#.
.##/###/#.. => .###/..#./..#./##.#
###/###/#.. => ##../..##/.###/.##.
.#./#.#/.#. => ...#/##../.#.#/##.#
##./#.#/.#. => ##../##../..##/##..
#.#/#.#/.#. => .##./###./#.##/.##.
###/#.#/.#. => .#.#/.#../.#.#/.##.
.#./###/.#. => #.##/####/#..#/....
##./###/.#. => #.../#.#./#.../#.##
#.#/###/.#. => ###./#.#./##../#...
###/###/.#. => ..##/.#.#/###./#..#
#.#/..#/##. => #.../#.#./..##/#...
###/..#/##. => #.../##.#/#.#./.###
.##/#.#/##. => ###./#.../..##/...#
###/#.#/##. => ...#/.###/#.##/.#..
#.#/.##/##. => .###/..#./#..#/....
###/.##/##. => ..../##.#/#..#/##.#
.##/###/##. => #.#./..##/.##./##.#
###/###/##. => ..../#..#/..../...#
#.#/.../#.# => .###/#.../.##./....
###/.../#.# => .#../.#../.#../#...
###/#../#.# => ..../##.#/##../##..
#.#/.#./#.# => ..##/#.#./##../#...
###/.#./#.# => ##../..../#.../#..#
###/##./#.# => #.../.##./.###/..##
#.#/#.#/#.# => #.../..##/#.#./##.#
###/#.#/#.# => ...#/#.##/#.##/#...
#.#/###/#.# => ##.#/###./#..#/..##
###/###/#.# => ..##/####/.##./..#.
###/#.#/### => #.##/..../..../#.#.
###/###/### => ###./..##/.#.#/....`;

const parse = input => {
    return input.split(/\//)
        .map(row => row
            .replace(/\./g, '0')
            .replace(/#/g, '1')
            .split('').map(i => parseInt(i)))
}

// split array into chunks
const chunk = (target, parts) => {
    return target.reduce((memo, value, index) => {
        // Here it comes the only difference
        if (index % (target.length / parts) == 0 && index !== 0) memo.push([])
        memo[memo.length - 1].push(value)
        return memo
    }, [[]])
}

/*
[
    [1,0,0,1],
    [0,0,0,0],
    [0,0,0,0],
    [1,0,0,1]
]
    =>
[
    [
        [1,0],
        [0,0]
    ],
    [
        [0,1],
        [0,0]
    ]
    ,..
*/
const splitMatrix = (matrix, divider) => {
    let size = divider;
    let parts = matrix.length / divider;
    
    if (size === 1)
        return [matrix];

    let matrices = new Array(parts*parts).fill(0).map(i => []);

    let mIndex = -1;
    matrix.forEach((cv, rowIndex) => {
        // [[0], [1], [0]]
        if (rowIndex % size === 0)
            mIndex++;
        let chunks = chunk(cv, parts);
        chunks.forEach((c, colIndex) => {
            matrices[mIndex * parts + colIndex].push(c);
        });
    });

    return matrices;
};

const matrixEqual = (m1, m2) => {
    return JSON.stringify(m1) === JSON.stringify(m2);
}

const transform = (matrix, rules) => {

    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        for (let j = 0; j < rule.from.length; j++) {
            let r = rule.from[j];
            if (matrixEqual(matrix, r))
                return rule.to;
        }
    }

};

const matrixJoin = (matrices) => {

    if (matrices.length === 1)
        return matrices[0];

    let size = Math.sqrt(matrices.length);
    let len = matrices[0].length;
    let matrix = new Array(size*len).fill(0).map(i => []);
    /*[
        [
            [1,0],
            [0,0]
        ],
        [
            [0,1],
            [0,0]
        ]
        ,..
    */
    let rowIndex = -1;
    matrices.reduce((av, cv, matrixIndex) => {

        if (matrixIndex % size === 0)
            rowIndex++;
        /*
        [
            [1,0],
            [0,0]
        ]
        */
        cv.forEach((row, matrixRowIndex) => {
            let a = matrix[rowIndex*len + matrixRowIndex];
            matrix[rowIndex*len + matrixRowIndex] = a.concat(row);
        });

    }, matrix);

    return matrix;

};

const matrixCountOnes = matrix => {
    return matrix.reduce((av, cv) => {
        return av + cv.filter(v => v === 1).length;
    }, 0);
};

const rules = input.split(/\n/)
    .map(row => {
        let [from, to] = row.split(' => ');
        from = parse(from);
        let froms = [from];
        let copy = [...from];
        for (let i = 0; i < 4; i++) {
            copy = rotateMatrix(copy);
            froms.push(copy);
            froms.push(flipMatrix(copy));
        }
        return { from: froms, to: parse(to) };
    });

for (let i = 1; i <= 18; i++) {

    let size = matrix.length;
    let divider;
    if (size % 2 === 0)
        divider = 2;
    else if (size % 3 === 0)
        divider = 3;
    else
        throw new Error('?');

    let newMatrices = splitMatrix(matrix, divider);
    let transformedMatrices = newMatrices.map(matrix => transform(matrix, rules));
    matrix = matrixJoin(transformedMatrices);

    console.log(i, matrixCountOnes(matrix));
}