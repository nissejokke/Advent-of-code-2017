let input = [873, 583];
let multipliers = [16807, 48271];

let calc = (prevValue, multiplier) => {
    prevValue = (prevValue * multiplier) % 2147483647;
    return prevValue;
};

let matches = 0;
let a = input[0],b = input[1];
for (let i = 0; i < 40000000; i++) {
    a = calc(a, multipliers[0]);
    b = calc(b, multipliers[1]);

    if ((a & 0xffff) === (b & 0xffff))
        matches++;
}

console.log(matches)