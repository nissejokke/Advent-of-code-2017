
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
        if (this.position < 2)
            this.buffer.splice(this.position, 0, this.value);
        else
            this.buffer.push(0);
        this.value++;
    }
}

let sl = new SpinLock();
for (let i = 0; i < 50000000; i++)
    sl.step(386);
    
console.log(sl.buffer[1]);