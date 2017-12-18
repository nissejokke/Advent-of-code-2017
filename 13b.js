
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
   
    constructor(depth, range, startIndex) {
        this.depth = depth;
        this.range = range;
        this.index = startIndex || 0;
    }
 
    move() {
        this.index++;
    }
 
   normalizedIndex(index) {
        let mod = index % (this.range*2-2);
        if (mod >= this.range)
            return this.range-mod+2;
        return mod;
    }
 
    isCollisionAtIndex(index) {
        return index === this.normalizedIndex(this.index);
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
 
let calc = (data, delay) => {
    let maxDepth = Math.max.apply(null, data.map(d => d.depth));
    let firewalls = {};
    let severitySum = 0;
    let isCollision = false;
 
    data.map(level => {
        firewalls[level.depth] = new Firewall(level.depth, level.range, delay);
    });
 
    for (let packetIndex = 0; !isCollision && packetIndex <= maxDepth; packetIndex++) {
       
        let fw = firewalls[packetIndex];
        if (fw) {
            if (fw.isCollisionAtIndex(0)) {
                isCollision= true;
            }
        }
 
        Object.keys(firewalls).forEach(key => firewalls[key].move());
    }
 
    return isCollision;
}
 
let isCollision = true;
for (let delay = 10; isCollision; delay++) {

    isCollision = false;
    for (let i = 0; i < data.length && !isCollision; i++) {
        if ((data[i].depth + delay) % (data[i].range * 2 - 2) === 0)
            isCollision = true;
    }

    if (!isCollision)
        console.log(delay);
}