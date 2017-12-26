class Component {
    constructor(ports1, ports2) {
        this.ports = [ports1, ports2];
        this.strength = ports1 + ports2;
    }

    clone() {
        return new Component(this.ports[0], this.ports[1]);
    }
}

class Bridge {
    constructor() {
        this.components = [];
        this.openPort = 0;
        this.strength = 0;
    }

    connect(component) {
        let connectedPort = component.ports.filter(port => port === this.openPort)[0];
        if (!Number.isInteger(connectedPort))
            throw new Error('component cannot be connected, ports dont match');

        let index = component.ports.indexOf(connectedPort);
        this.openPort = component.ports[index === 0 ? 1 : 0];
        this.strength += component.strength;
        this.components.push(component);
    }

    clone() {
        let b = new Bridge();
        b.components = this.components.map(component => component.clone());
        b.openPort = this.openPort;
        b.strength = this.strength;
        return b;
    }
}

class BridgeFinder {
    constructor(components) {
        this.components = components;
    }
    parse(input) {
        this.components = input.split(/\n/)
            .map(row => {
                let [part1,part2] = row.split('/');
                return new Component(parseInt(part1), parseInt(part2));
            });
    }
    filter(components, port) {
        return components.filter(comp => comp.ports.filter(p => port === p).length);
    }
    find() {
        return this.findAvailableComponents(new Bridge(), this.components, []);
    }
    findAvailableComponents(bridge, components, resultBridges) {
        let found = this.filter(components, bridge.openPort);
        if (found.length === 0) {
            resultBridges.push(bridge);
            return resultBridges;
        }
         found.map(component => {
            let b = bridge.clone();
            b.connect(component);
            let newComponents = components
                .filter(c => c !== component)
                .map(c => c.clone());
            this.findAvailableComponents(b, newComponents, resultBridges);
        });
        return resultBridges;
    }
}

let input = `48/5
25/10
35/49
34/41
35/35
47/35
34/46
47/23
28/8
27/21
40/11
22/50
48/42
38/17
50/33
13/13
22/33
17/29
50/0
20/47
28/0
42/4
46/22
19/35
17/22
33/37
47/7
35/20
8/36
24/34
6/7
7/43
45/37
21/31
37/26
16/5
11/14
7/23
2/23
3/25
20/20
18/20
19/34
25/46
41/24
0/33
3/7
49/38
47/22
44/15
24/21
10/35
6/21
14/50`;

let finder = new BridgeFinder();
finder.parse(input);
let result = finder.find();

result
    .sort((a,b) => {
        if (b.components.length === a.components.length)
            return b.strength - a.strength;
        return b.components.length - a.components.length;
    })
    .slice(0, 10)
    .forEach(b => {
        console.log(b.components.map(c => c.ports.join('/')).join(', '), '=>', b.components.length, 'components, strength', b.strength);
    })