

let a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
let mulCount = 0;

let mul = (a, b) => {
    a *= b;
    mulCount++;
}

b = 67;
c = b;
if (a !== 0) {
    mul(b, 100); //b *= 100;
    b -= -100000;
    c = b;
    c -= -17000;
}
while (true) {
    f = 1;
    d = 2;
    do {
        e = 2;
        do {
            g = d;
            mul(g, e);//g *= e;
            g -= b;
            if (g === 0) {
                f = 0;
            }
            e -= -1;
            g = e;
            g -= b;
        } while (g !== 0); // jnz g -8
        d -= -1;
        g = d;
        g -= b;
    } while (g !== 0);// jnz g -13
    if (f === 0)
        h -= 1;
    g = b;
    g -= c;
    if (g === 0) break; // jnz g 2
    b -= -17;
}

console.log(mulCount)