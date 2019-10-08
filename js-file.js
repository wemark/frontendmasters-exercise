let numberStr = '';
let operator = [];
let figures = [];
const display = document.querySelector('.display');

document.querySelector('.background').addEventListener('click', function (event) {
    const input = event.target.innerText;
    if ((isNaN(parseInt(input)) == false) && // Check if event is number and button-tag
        event.target.tagName == 'BUTTON') {
        if (parseInt(input) === 0 && parseInt(display.innerText) === 0) { //No double zeros on the display            
        } else {
            numberStr += input;
            display.innerText = numberStr;
        };
    } else if (input === 'C') { // Clear 'C'
        numberStr = '';
        operator = [];
        figures = [];
        display.innerText = '0';
    } else if ((input === '\xF7') || (input === 'x') || (input === '+') || (input === '-')) { // Arithmic operation buttons
        figures.push(parseInt(numberStr));
        operator.push(input);
        numberStr = '';
    } else if (input === '\u2190') { //Backspace
        if (numberStr.length <= 1) {
            numberStr = [];
            display.innerText = 0;
        } else {
            numberStr = numberStr.slice(0, -1);
            display.innerText = numberStr;
        }
    } else if (input === '=') { // Calculate result
        let result = 0;
        if (figures.length >= 1) {
            figures.push(parseInt(numberStr));
            for (let i = 0; i < figures.length - 1; i++) {
                if (operator[i] === '\xF7') {
                    if (i === 0) {
                        result = figures[i] / figures[i + 1];
                    } else {
                        result /= figures[i + 1];
                    }
                } else if (operator[i] === 'x') {
                    if (i === 0) {
                        result = figures[i] * figures[i + 1];
                    } else {
                        result *= figures[i + 1];
                    }
                } else if (operator[i] === '+') {
                    if (i === 0) {
                        result = figures[i] + figures[i + 1];
                    } else {
                        result += figures[i + 1];
                    }
                } else if (operator[i] === '-') {
                    if (i === 0) {
                        result = figures[i] - figures[i + 1];
                    } else {
                        result -= figures[i + 1];
                    }
                }
            }
            display.innerText = result;
            numberStr = result.toString();
            operator = [];
            figures = [];
        }
    }
});