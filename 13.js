input = `0: 3
1: 2
2: 6
4: 4
6: 4
8: 8
10: 9
12: 8
14: 5
16: 6
18: 8
20: 6
22: 12
24: 6
26: 12
28: 8
30: 8
32: 10
34: 12
36: 12
38: 8
40: 12
42: 12
44: 14
46: 12
48: 14
50: 12
52: 12
54: 12
56: 10
58: 14
60: 14
62: 14
64: 14
66: 17
68: 14
72: 14
76: 14
80: 14
82: 14
88: 18
92: 14
98: 18`;

class Firewall {
    
    constructor(depth, range) {
        this.depth = depth;
        this.range = range;
        this.index = 0;
        this.direction = 1;
    }

    move() {
        this.index += this.direction;
        if (this.index >= this.range) {
            this.index-=2;
            this.direction *= -1;
        }
        else if (this.index < 0) {
            this.index+=2;
            this.direction *= -1;
        }
    }

    isCollisionAtIndex(index) {
        return this.index === index;
    }

    getSeverity() {
        return this.depth * this.range;
    }
}

let data = input.split(/\n/)
    .map(row => row.split(': '))
    .map(cols => {
        return {
            depth: parseInt(cols[0]),
            range: parseInt(cols[1])
        };
    });


let maxDepth = Math.max.apply(null, data.map(d => d.depth));
let firewalls = {};
let severitySum = 0;

data.map(level => { 
    firewalls[level.depth] = new Firewall(level.depth, level.range); 
});

for (let packetIndex = 0; packetIndex <= maxDepth; packetIndex++) {
    let fw = firewalls[packetIndex];
    if (fw) {
        if (fw.isCollisionAtIndex(0))
            severitySum += fw.getSeverity();
    }

    Object.keys(firewalls).forEach(key => firewalls[key].move());
}

console.log(severitySum);