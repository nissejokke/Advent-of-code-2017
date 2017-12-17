

class Map2 {
    
        constructor() {
            this.map = {};
        }
        
        set(x, y, value) {
            this.map[x + ':' + y] = value;
        }
    
        get(x, y) {
            return this.map[x + ':' + y] || 0;
        }
    
        getAdjescent(x, y) {
            return this.get(x+1,y) + 
                this.get(x+1, y+1) + 
                this.get(x, y+1) + 
                this.get(x-1, y+1) + 
                this.get(x-1, y) +
                this.get(x-1, y-1) +
                this.get(x, y-1) +
                this.get(x+1, y-1);    
        }
    
        getNextSpacePosition(x,y) {

            let tests = [
                [0, 1],
                [-1, 0],
                [0, -1],
                [1, 0]
            ];

            let dir = tests.map(t => {
                let nx = x + t[0];
                let ny = y + t[1];
                if (this.get(nx, ny)>0)
                    return null;
                return {
                    x: nx,
                    y: ny,
                    d: Math.sqrt(nx*nx + ny*ny),
                    e: t[0] === 1 && t[1] === 0 ? .1 : 0
                }
            })
            .filter(t => Boolean(t))
            .sort((a, b) => a.d*100 + a.e - b.d*100 + b.e)[0];

            return dir;
        }
    }

let map = new Map2();
let d = [0,1];
map.set(0,0,1);

let x = 1;
let y = 0;

for (let i = 0; i < 100; i++) {
    map.set(x,y,map.getAdjescent(x,y));

    if (map.get(x,y) > 368078) {
        console.log(map.get(x,y));
        break;
    }

    let m = map.getNextSpacePosition(x,y);
    x = m.x;
    y = m.y;
}
