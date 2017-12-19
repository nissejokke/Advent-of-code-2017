input = `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 464
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`;


class Program {  
    constructor(id, instructions) {
        this.regs = {
            p: id
        };
        this.index = 0;
        this.id = id;
        this.instructions = instructions;
        this.pipe = null;
        this.queue = [];
        this.sendCounter = 0;
        this.waiting = false;
    }
    setPipe(program) {
        this.pipe = program;
    }
    run() {
        if (this.index >= this.instructions.length) 
            return false;
        let next = this.instructions[this.index++];
        return this[next[0]](next[1], this.getValue(next[2]));
    }
    getValue(y) {
        return Number.isInteger(y) ? y : this.regs[y];
    }
    snd(a) {
        this.pipe.push(this.getValue(a));
        this.sendCounter++;
    }
    rcv(x) {
        let val = this.pop();
        if (Number.isInteger(val)) {
            this.waiting = false;
            this.regs[x] = val;
        }
        else {
            this.index--;
            this.waiting = true;
            return false;
        }
    }
    push(val) {
        this.queue.push(val);
        this.waiting = false;
    }
    pop() {
        return this.queue.shift();
    }
    set(x, y) {
        this.regs[x] = y;
    }
    add(x, y) {
        this.regs[x] += y;
    }
    mul(x, y) {
        this.regs[x] *= y;
    }
    mod(x, y) {
        this.regs[x] = this.regs[x] % y;
    }
    jgz(x, y) {
        if ((Number.isInteger(x) && x > 0) || this.regs[x] > 0) {
            this.index--;
            this.index += y;
        }            
    }
}

let instructions = input.split(/\n/)
    .map(cmd => {
        let [ instr, arg1, arg2 ] = cmd.split(' ');
        arg1 = isNaN(parseInt(arg1)) ? arg1 : parseInt(arg1);
        arg2 = isNaN(parseInt(arg2)) ? arg2 : parseInt(arg2);
        return [instr, arg1, arg2];
    });

let selectProgram = (p1, p2) => {
    if (p1.waiting && p2.waiting)
        return null;
    if (p1.waiting)
        return p2;
    return p1;
}

let p0 = new Program(0, instructions);
let p1 = new Program(1, instructions);
p0.setPipe(p1);
p1.setPipe(p0);

let progam;
while ((program = selectProgram(p0, p1))) {
    while (program.run() !== false && !program.waiting);
}

// guessed 129
console.log(p1.sendCounter);