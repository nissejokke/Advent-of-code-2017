
class SpinLock {
    
    constructor() {
        this.buffer = [0];
        this.position = 0;
        this.value = 1;
    }

    step(steps) {
        this.position += steps;
        this.position = this.position % this.buffer.length;
        this.position++;
        this.buffer.splice(this.position, 0, this.value);
        this.value++;
    }
}

let sl = new SpinLock();
for (let i = 0; i < 2017; i++)
    sl.step(386);
    
console.log(sl.buffer[sl.position+1]);