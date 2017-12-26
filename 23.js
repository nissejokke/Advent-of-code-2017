
let input = `set b 67
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`;

class Program {  
    constructor(instructions) {
        this.regs = {
            a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0
        };
        this.index = 0;
        this.instructions = instructions;
        this.mulCount = 0;
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
    set(x, y) {
        this.regs[x] = y;
    }
    mul(x, y) {
        this.regs[x] *= y;
        this.mulCount++;
    }
    sub(x, y) {
        this.regs[x] -= y;
    }
    jnz(x, y) {
        if ((Number.isInteger(x) && x !== 0) || this.regs[x] !== 0) {
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

let program = new Program(instructions);
while (program.run() !== false)
    ;

console.log(program.mulCount);