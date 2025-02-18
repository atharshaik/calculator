document.addEventListener('DOMContentLoaded', () => {
    const calculatorScreen = document.querySelector('#calculator-screen');
    const keys = document.querySelector('.calculator-keys');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let shouldResetScreen = false;

    keys.addEventListener('click', event => {
        const { target } = event;
        const { value } = target;

        if (!target.matches('button')) {
            return;
        }

        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
                handleOperator(value);
                break;
            case '=':
                calculate();
                break;
            case 'all-clear':
                clear();
                break;
            case '.':
                inputDecimal();
                break;
            default:
                inputDigit(value);
                break;
        }

        updateScreen();
    });

    function handleOperator(nextOperator) {
        if (currentInput === '') return;

        if (previousInput !== '') {
            calculate();
        }

        operator = nextOperator;
        previousInput = currentInput;
        shouldResetScreen = true;
    }

    function calculate() {
        if (operator === '' || shouldResetScreen) return;

        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        let result = 0;
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        shouldResetScreen = true;
    }

    function inputDigit(digit) {
        if (currentInput === '0' || shouldResetScreen) {
            currentInput = digit;
            shouldResetScreen = false;
        } else {
            currentInput += digit;
        }
    }

    function inputDecimal() {
        if (shouldResetScreen) {
            currentInput = '0.';
            shouldResetScreen = false;
            return;
        }

        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operator = '';
        shouldResetScreen = false;
    }

    function updateScreen() {
        calculatorScreen.value = currentInput;
    }
});