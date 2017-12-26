
let a = 1, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;

b = 67;
c = b;
if (a !== 0) {
    b *= 100;
    b -= -100000;
    c = b;
    c -= -17000;
}
while (true) {
    f = 1;
    d = 2;
    do {
        e = 2;
        // do {
        //     // g = d;
        //     // g *= e;
        //     // g -= b;
        //     // b = d*e
        //     // b / d dividable
        //     g = d * e - b;
        //     if (g === 0) {
        //         f = 0;
        //     }
        //     e++;
        //     g = e - b;
        // } while (g !== 0); // jnz g -8

        // do-while replaced with this
        if (b / d === parseInt(b / d))
            f = 0;

        d++;
        g = d - b;
    } while (g !== 0);// jnz g -13
    if (f === 0)
        h -= -1;
    g = b;
    g -= c;
    if (g === 0) break; // jnz g 2
    b -= -17;
}

console.log(h);