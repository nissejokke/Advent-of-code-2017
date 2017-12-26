class TuringMachine {
    constructor() {
        this.pos = 0;
        this.tape = {};
        this.state = 'A';
    }

    get() {
        return this.tape[this.pos] || 0;
    }

    set(value) {
        if (value === 1)
            this.tape[this.pos] = value;
        else
            delete this.tape[this.pos];

    }

    executeDemo() {
        let value = this.get();
        switch (this.state) {
            case 'A':
                if (value === 0) {
                    this.set(1);
                    this.pos++;
                }
                else {
                    this.set(0);
                    this.pos--;
                }
                this.state = 'B';
                break;
            case 'B':
                if (value === 0) {
                    this.set(1);
                    this.pos--;
                }
                else {
                    this.set(1);
                    this.pos++;
                }
                this.state = 'A';
                break;
            default:
                throw new Error('?');
        }
    }

    execute() {
        let value = this.get();
        switch (this.state) {
            case 'A':
                if (value === 0) {
                    this.set(1);
                    this.pos++;
                    this.state = 'B';
                }
                else {
                    this.set(0);
                    this.pos--;
                    this.state = 'B';                    
                }
                break;
            case 'B':
                if (value === 0) {
                    this.set(1);
                    this.pos--;
                    this.state = 'C';
                }
                else {
                    this.set(0);
                    this.pos++;
                    this.state = 'E';                    
                }
                break;
            case 'C':
                if (value === 0) {
                    this.set(1);
                    this.pos++;
                    this.state = 'E';
                }
                else {
                    this.set(0);
                    this.pos--;
                    this.state = 'D';                    
                }
                break;
            case 'D':
                if (value === 0) {
                    this.set(1);
                    this.pos--;
                    this.state = 'A';
                }
                else {
                    this.set(1);
                    this.pos--;
                    this.state = 'A';                    
                }
                break;
            case 'E':
                if (value === 0) {
                    this.set(0);
                    this.pos++;
                    this.state = 'A';
                }
                else {
                    this.set(0);
                    this.pos++;
                    this.state = 'F';                    
                }
                break;
            case 'F':
                if (value === 0) {
                    this.set(1);
                    this.pos++;
                    this.state = 'E';
                }
                else {
                    this.set(1);
                    this.pos++;
                    this.state = 'A';                    
                }
                break;
            default:
                throw new Error('?');
        }
    }

    getDiagnosticChecksum() {
        return Object.keys(this.tape).length;
    }
}

let machine = new TuringMachine();
for (let i = 0; i < 12683008; i++)
    machine.execute();

console.log(machine.getDiagnosticChecksum())