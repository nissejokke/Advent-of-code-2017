let input = `set i 31
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

class Machine {  
    constructor(instructions) {
        this.regs = {};
        this.index = 0;
        this.lastSound;
        this.instructions = instructions;
    }
    run() {
        let next = this.instructions[this.index++];
        return this[next[0]](next[1], this.getValue(next[2]));
    }
    getValue(y) {
        return Number.isInteger(y) ? y : this.regs[y];
    }
    snd(a) {
        this.lastSound = this.regs[a];
        //console.log('playing', this.lastSound);
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
    rcv(x) {
        if (this.regs[x] !== 0) {
            console.log('recover', this.lastSound);
            return true;
        }
    }
    jgz(x, y) {
        if (this.regs[x] > 0) {
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

let machine = new Machine(instructions);
while (machine.run() !== true)
    ;

