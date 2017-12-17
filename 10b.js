
let knotHash = (lengthInput, size) => {
        
    let strToList = (input) => input.split(',').map(i => parseInt(i)).filter(i => !isNaN(i));    
    let input = new Array(size).fill(0).map((v,i) => i);

    let getLengths = (lengthInput) => {
        return lengthInput.split('').map(l => {
            let c = l.toString().charCodeAt(0);
            if (c > 255) throw new Error('err');
            return c;
        }).concat([17, 31, 73, 47, 23]);
    };

    // to ascii
    let lengths = getLengths(lengthInput);

    if (JSON.stringify(getLengths(`1,2,3`)) !== JSON.stringify([49,44,50,44,51,17,31,73,47,23]))
        throw new Error('getLengths error');

    let slice = (list, startAt, count) => {

        if (!Array.isArray(list)) throw new Error('not an array');
        if (!Number.isInteger(startAt))
            throw new Error(`startAt not a number`);
        if (!Number.isInteger(count))
            throw new Error(`count not a number`);
        let result = [];
        for (var i = startAt; i < startAt + count; i++) {
            let ii = i;
            while (ii >= list.length)
                ii-=list.length;
            let d = list[ii];
            if (!Number.isInteger(d))
                throw new Error(`d is not a number`);
            result.push(d);
        }
        return result;
    };

    let reverseList = (list, startAt, count) => {
        let sel = slice(list, startAt, count).reverse();
        let a = 0;
        let newList = list.slice();
        for (var i = 0; i < sel.length; i++) {
            if (startAt + i + a >= newList.length)
                a = - i - startAt;
            if (!Number.isInteger(sel[i]))
                throw new Error(`not number`);
            if (startAt + i + a >= newList.length)
                throw new Error('overflow');
            newList[startAt + i + a] = sel[i];
        }
        if (newList.length !== list.length)
            throw new Error(`not same size lists`);
        return newList;
    }

    let skipSize = 0;
    let index = 0;
    let hashRound = (input, lengths) => {
        for (let lengthIndex = 0; lengthIndex < lengths.length; lengthIndex++) {
            let output = reverseList(input, index, lengths[lengthIndex]);
            input = output;
            index += lengths[lengthIndex] + skipSize;
            while (index >= input.length)
                index -= input.length;
            skipSize++;
        }

        return input;
    }

    let test = hashRound(new Array(256).fill(0).map((v,i) => i), strToList(`147,37,249,1,31,2,226,0,161,71,254,243,183,255,30,70`));
    if (test[0] * test[1] !== 37230)
        throw new Error('hashRound invalid');

    index = 0;
    skipSize = 0;

    //lengths = [3, 4, 1, 5];//, 17, 31, 73, 47, 23];
    for (let i = 0; i < 64; i++) {
        let output = hashRound(input, lengths);
        input = output;
    }

    let hash = '';
    let n = 0;
    for (var i = 0; i < 16; i++) {
        let denseByte = 0;
        for (var j = 0; j < 16; j++) {
            denseByte = denseByte ^ input[i*16+j];
            n++;
        }
        hash += denseByte.toString(16).padStart(2, '0');
    }

    if (n !== 256) throw new Error(`n !?`);
    if (hash.length !== 2*16) throw new Error('inc length');

    return hash;
}

// let hash = knotHash(`1,2,3`, 256);
// console.log(hash);
// console.log(knotHash(``, 256) === 'a2582a3a0e66e6e86e3812dcb672a272');
// console.log(knotHash(`1,2,4`, 256));
console.log(knotHash(`147,37,249,1,31,2,226,0,161,71,254,243,183,255,30,70`, 256));