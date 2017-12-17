let strToList = (input) => input.split(',').map(i => parseInt(i)).filter(i => !isNaN(i));

let input = new Array(256).fill(0).map((v,i) => i);
let lengths = strToList(`147,37,249,1,31,2,226,0,161,71,254,243,183,255,30,70`);
let index = 0;
let lengthIndex = 0;
let skipSize = 0;

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

while (lengthIndex < lengths.length) {
    let output = reverseList(input, index, lengths[lengthIndex]);
    input = output;
    index += lengths[lengthIndex] + skipSize;
    if (index >= input.length)
        index -= input.length;
    skipSize++;
    lengthIndex++;
}

console.log(input[0] * input[1]);