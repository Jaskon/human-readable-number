const mapping = {
    0: '',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety',
    100: 'hundred'
};

function getFirstCategory(number) {
    return mapping[number];
}

const units = ['', 'thousand', 'million', 'billion'];

function getTwoCategories(arr) {
    if (!arr[0] && !arr[1]) {
        return '';
    }

    if (!arr[1]) {
        return getFirstCategory(arr[0]);
    }

    if (arr[0] === 0) {
        return mapping[arr[1] * 10];
    }
    if (arr[1] === 1) {
        return mapping[10 + arr[0]];
    }
    return `${mapping[arr[1] * 10]} ${mapping[arr[0]]}`.trim();
}

module.exports = function toReadable (number) {
    let arr = String(number).split('').map(Number).reverse();

    if (arr.length === 1 && arr[0] === 0) {
        return 'zero';
    }

    let str = '';

    for (let i = 0; arr.length; i++) {
        let substr = getTwoCategories(arr);

        if (arr[2]) {
            substr = `${getFirstCategory(arr[2])} ${mapping[100]} ${substr}`;
        }

        if (substr.length) {
            str = (`${substr} ${units[i]} ${str}`).trim();
        }
        arr = arr.slice(3);
    }

    return str.trim();
}
