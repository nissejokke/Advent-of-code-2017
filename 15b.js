let input = [873, 583];
let multipliers = [16807, 48271];

let calc = (prevValue, multiplier, evenlyDividedWith) => {
    do {
        prevValue = (prevValue * multiplier) % 2147483647;
    } while (prevValue % evenlyDividedWith !== 0);
    return prevValue;
};

let matches = 0;
let a = input[0],b = input[1];
for (let i = 0; i < 5000000; i++) {
    a = calc(a, multipliers[0], 4);
    b = calc(b, multipliers[1], 8);

    if ((a & 0xffff) === (b & 0xffff))
        matches++;
}

console.log(matches)