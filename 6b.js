
let calc = (bankStr) => {
    let bank = bankStr
        .split(/\s+/)
        .filter(i => parseInt(i).toString() === i)
        .map(i => parseInt(i));

    let findNextCandidateIndex = (bank) => {
        let max = Math.max.apply(null, bank);
        for (let i = 0; i < bank.length; i++)
            if (bank[i] === max)
                return i;
    }

    let prevStates = {};
    let n = 0;
    while (true) {

        let key = bank.join(',');
        if (prevStates[key])
            break;
        prevStates[key] = true;
        let index = findNextCandidateIndex(bank);
        let blocks = bank[index];
        bank[index] = 0;

        while (blocks > 0) {
            index++;
            if (index >= bank.length)
                index = 0;
                
            bank[index]++;
            blocks--;
        }
        n++;
    }

    return { n, bank };
}

let r;
if ((r = calc(`0 2 7 0`)).n !== 5)
    throw new Error(`0 2 7 0 = ${JSON.stringify(r)}, should = 5`);

let bankStr = `5	1	10	0	1	7	13	14	3	12	8	10	7	12	0	6`;
let first = calc(bankStr);
console.log(calc(first.bank.join(' ')).n)