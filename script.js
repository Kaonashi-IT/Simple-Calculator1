// ===== ЭЛЕМЕНТЫ =====
const OutputScreen = document.getElementById("op");
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// ===== МАССИВ ИСТОРИИ =====
let history = [];

// ===== АВТОМАТИЧЕСКОЕ УМЕНЬШЕНИЕ ШРИФТА =====
function adjustFontSize() {
    const val = OutputScreen.value;
    const len = val.length;
    let size = 50;
    if (len > 10) size = 36;
    if (len > 15) size = 28;
    if (len > 20) size = 22;
    if (len > 25) size = 18;
    if (len > 30) size = 14;
    OutputScreen.style.fontSize = size + 'px';
}

// ===== ОСНОВНЫЕ ФУНКЦИИ =====
function display(num) {
    OutputScreen.value += num;
    adjustFontSize();
}

function Clear() {
    OutputScreen.value = '';
    adjustFontSize();
}

function del() {
    OutputScreen.value = OutputScreen.value.slice(0, -1);
    adjustFontSize();
}

// ===== АЛГОРИТМ ВЫЧИСЛЕНИЯ (без eval) =====
function calculateExpression(expr) {
    expr = expr.replace(/\s/g, '');
    if (expr === '') return '';

    function getPriority(op) {
        if (op === '+' || op === '-') return 1;
        if (op === '*' || op === '/' || op === '%') return 2;
        return 0;
    }

    function toRPN(tokens) {
        const output = [];
        const stack = [];
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (typeof token === 'number') {
                output.push(token);
            } else if (token === '(') {
                stack.push(token);
            } else if (token === ')') {
                while (stack.length && stack[stack.length - 1] !== '(') {
                    output.push(stack.pop());
                }
                if (stack.length === 0) throw new Error('Несоответствие скобок');
                stack.pop();
            } else if (['+', '-', '*', '/', '%'].includes(token)) {
                while (
                    stack.length &&
                    stack[stack.length - 1] !== '(' &&
                    getPriority(stack[stack.length - 1]) >= getPriority(token)
                ) {
                    output.push(stack.pop());
                }
                stack.push(token);
            } else {
                throw new Error(`Неизвестный символ: ${token}`);
            }
        }
        while (stack.length) {
            const op = stack.pop();
            if (op === '(' || op === ')') throw new Error('Несоответствие скобок');
            output.push(op);
        }
        return output;
    }

    function evaluateRPN(rpn) {
        const stack = [];
        for (const token of rpn) {
            if (typeof token === 'number') {
                stack.push(token);
            } else {
                if (stack.length < 2) throw new Error('Недостаточно операндов');
                const b = stack.pop();
                const a = stack.pop();
                let result;
                switch (token) {
                    case '+': result = a + b; break;
                    case '-': result = a - b; break;
                    case '*': result = a * b; break;
                    case '/':
                        if (b === 0) throw new Error('Деление на ноль');
                        result = a / b;
                        break;
                    case '%': result = a % b; break;
                    default: throw new Error(`Неизвестный оператор: ${token}`);
                }
                stack.push(result);
            }
        }
        if (stack.length !== 1) throw new Error('Ошибка в выражении');
        return stack[0];
    }

    function tokenize(str) {
        const tokens = [];
        let i = 0;
        let num = '';
        while (i < str.length) {
            const ch = str[i];
            if (ch === ' ') { i++; continue; }
            if (/\d/.test(ch) || ch === '.') {
                num += ch;
                i++;
                while (i < str.length && (/\d/.test(str[i]) || str[i] === '.')) {
                    num += str[i];
                    i++;
                }
                tokens.push(parseFloat(num));
                num = '';
                continue;
            }
            if (ch === '-') {
                const prev = tokens.length ? tokens[tokens.length - 1] : null;
                if (prev === null || (typeof prev === 'string' && ['+', '-', '*', '/', '%', '('].includes(prev))) {
                    tokens.push(0);
                }
            }
            if (['+', '-', '*', '/', '%', '(', ')'].includes(ch)) {
                tokens.push(ch);
                i++;
                continue;
            }
            throw new Error(`Неожиданный символ: "${ch}"`);
        }
        return tokens;
    }

    try {
        const tokens = tokenize(expr);
        const rpn = toRPN(tokens);
        const result = evaluateRPN(rpn);
        return parseFloat(result.toFixed(10));
    } catch (err) {
        throw err;
    }
}

// ===== РЕШЕНИЕ ЛИНЕЙНЫХ УРАВНЕНИЙ =====
function solveLinearEquation(expr) {
    expr = expr.replace(/\s/g, '');
    const equalIndex = expr.indexOf('=');
    if (equalIndex === -1) throw new Error('Уравнение должно содержать "="');
    const left = expr.substring(0, equalIndex);
    const right = expr.substring(equalIndex + 1);

    const varMatch = expr.match(/[xyz]/);
    if (!varMatch) throw new Error('Нет переменной (x, y или z)');
    const variable = varMatch[0];

    function parsePart(part) {
        if (part.startsWith('-')) part = '0' + part;
        const tokens = [];
        let current = '', sign = '+';
        for (let i = 0; i < part.length; i++) {
            const ch = part[i];
            if (ch === '+' || ch === '-') {
                if (current) tokens.push({ sign, term: current });
                sign = ch;
                current = '';
            } else {
                current += ch;
            }
        }
        if (current) tokens.push({ sign, term: current });

        let coeff = 0, constant = 0;
        for (const t of tokens) {
            const term = t.term;
            const mult = t.sign === '+' ? 1 : -1;
            if (term.includes(variable)) {
                let numPart = term.replace(variable, '');
                if (numPart === '') numPart = '1';
                else if (numPart === '-') numPart = '-1';
                else if (numPart.startsWith('--')) numPart = numPart.slice(2);
                const num = parseFloat(numPart);
                if (isNaN(num)) throw new Error(`Неверный коэффициент: ${term}`);
                coeff += mult * num;
            } else {
                const num = parseFloat(term);
                if (isNaN(num)) throw new Error(`Неверное число: ${term}`);
                constant += mult * num;
            }
        }
        return { coeff, constant };
    }

    const leftParsed = parsePart(left);
    const rightParsed = parsePart(right);

    const a = leftParsed.coeff - rightParsed.coeff;
    const b = leftParsed.constant - rightParsed.constant;

    if (a === 0) {
        if (b === 0) return 'Бесконечно много решений';
        else return 'Нет решений';
    } else {
        const x = -b / a;
        return `${variable} = ${parseFloat(x.toFixed(10))}`;
    }
}

// ===== КВАДРАТНЫЕ УРАВНЕНИЯ =====
function getQuadraticInputs() {
    const a = parseFloat(document.getElementById('aCoeff').value);
    const b = parseFloat(document.getElementById('bCoeff').value);
    const c = parseFloat(document.getElementById('cCoeff').value);
    return { a, b, c };
}

function calcDiscriminant() {
    const { a, b, c } = getQuadraticInputs();
    const resultDiv = document.getElementById('quadraticResult');

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        resultDiv.textContent = 'Введите все коэффициенты (a, b, c)';
        resultDiv.className = 'solution-result error';
        return;
    }
    if (a === 0) {
        resultDiv.textContent = 'a ≠ 0 (это не квадратное уравнение)';
        resultDiv.className = 'solution-result error';
        return;
    }

    const D = b*b - 4*a*c;
    const Drounded = parseFloat(D.toFixed(10));
    let result = `Дискриминант D = ${Drounded}\n`;

    if (D < 0) {
        result += 'Корней нет (D < 0)';
    } else if (D === 0) {
        const x = -b / (2*a);
        result += `Один корень (D = 0): x = ${parseFloat(x.toFixed(10))}`;
    } else {
        const sqrtD = Math.sqrt(D);
        const x1 = (-b + sqrtD) / (2*a);
        const x2 = (-b - sqrtD) / (2*a);
        result += `Два корня:\nx₁ = ${parseFloat(x1.toFixed(10))}\nx₂ = ${parseFloat(x2.toFixed(10))}`;
        const sum = x1 + x2;
        const prod = x1 * x2;
        result += `\nПроверка Виеты: сумма = ${parseFloat(sum.toFixed(10))}, произведение = ${parseFloat(prod.toFixed(10))}`;
    }
    resultDiv.textContent = result;
    resultDiv.className = 'solution-result success';
    addHistory(`Дискриминант (${a},${b},${c})`, result);
}

function calcVieta() {
    const { a, b, c } = getQuadraticInputs();
    const resultDiv = document.getElementById('quadraticResult');

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        resultDiv.textContent = 'Введите все коэффициенты (a, b, c)';
        resultDiv.className = 'solution-result error';
        return;
    }
    if (a === 0) {
        resultDiv.textContent = 'a ≠ 0 (это не квадратное уравнение)';
        resultDiv.className = 'solution-result error';
        return;
    }

    const sum = -b / a;
    const product = c / a;
    const sumR = parseFloat(sum.toFixed(10));
    const prodR = parseFloat(product.toFixed(10));
    let result = `Теорема Виета:\nСумма корней: x₁ + x₂ = ${sumR}\nПроизведение корней: x₁ · x₂ = ${prodR}`;
    resultDiv.textContent = result;
    resultDiv.className = 'solution-result success';
    addHistory(`Виета (${a},${b},${c})`, `сумма=${sumR}, произведение=${prodR}`);
}

// ===== ГЛАВНАЯ ФУНКЦИЯ ВЫЧИСЛЕНИЯ =====
function Calculate() {
    const expr = OutputScreen.value.trim();
    if (expr === '') return;

    let result;
    if (expr.includes('=') && /[xyz]/.test(expr)) {
        try {
            result = solveLinearEquation(expr);
        } catch (err) {
            OutputScreen.value = 'Ошибка';
            console.error(err.message);
            return;
        }
    } else {
        try {
            result = calculateExpression(expr);
        } catch (err) {
            OutputScreen.value = 'Ошибка';
            console.error(err.message);
            return;
        }
    }

    addHistory(expr, result);
    OutputScreen.value = result;
    adjustFontSize();
}

// ===== ИСТОРИЯ =====
function addHistory(expression, result) {
    history.unshift({ expression, result });
    if (history.length > 20) history.pop();
    renderHistory();
}

function renderHistory() {
    if (!historyList) return;
    if (history.length === 0) {
        historyList.innerHTML = '<div style="color:#999; font-style:italic; padding:8px;">История пуста</div>';
        return;
    }
    historyList.innerHTML = history.map((item, index) =>
        `<div class="history-item" data-index="${index}">
            <span class="h-expr">${item.expression}</span>
            <span class="h-result">= ${item.result}</span>
        </div>`
    ).join('');

    document.querySelectorAll('.history-item').forEach(el => {
        el.addEventListener('click', function() {
            const idx = parseInt(this.dataset.index);
            const entry = history[idx];
            if (entry) {
                OutputScreen.value = entry.expression;
                adjustFontSize();
            }
        });
    });
}

function clearHistory() {
    history = [];
    renderHistory();
}
if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', clearHistory);

// ===== КЛАВИАТУРА (ИСПРАВЛЕННАЯ) =====
document.addEventListener('keydown', function(e) {
    // Если фокус внутри какого-либо поля ввода (input, textarea) — ничего не делаем, даём браузеру обрабатывать
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        // Особый случай: если нажат Enter в поле a, b, c или в поле уравнения — обработаем отдельно
        if (e.key === 'Enter') {
            // Если в поле уравнения — решаем
            if (activeElement.id === 'equationInput') {
                e.preventDefault();
                solveEquationFromInput();
                return;
            }
            // Если в полях a, b, c — считаем дискриминант
            if (['aCoeff', 'bCoeff', 'cCoeff'].includes(activeElement.id)) {
                e.preventDefault();
                calcDiscriminant();
                return;
            }
            // В остальных случаях Enter сработает как обычно, но мы не мешаем
        }
        // Для Backspace в поле — не перехватываем, это стандартное поведение
        return;
    }

    // Если фокус не в поле ввода — обрабатываем клавиши для калькулятора
    const key = e.key;
    if (/^[0-9.]$/.test(key)) {
        e.preventDefault();
        display(key);
        return;
    }
    if (['+', '-', '*', '/', '%', '(', ')'].includes(key)) {
        e.preventDefault();
        display(key);
        return;
    }
    if (key === 'Enter') {
        e.preventDefault();
        Calculate();
        return;
    }
    if (key === 'Backspace') {
        e.preventDefault();
        del();
        return;
    }
    if (key === 'Escape') {
        e.preventDefault();
        Clear();
        return;
    }
});

// ===== ТЕМА =====
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
}

// ===== ЛИНЕЙНЫЕ УРАВНЕНИЯ (правая колонка) =====
const eqInput = document.getElementById('equationInput');
const solveEqBtn = document.getElementById('solveEqBtn');
const eqResult = document.getElementById('eqResult');

function solveEquationFromInput() {
    const expr = eqInput.value.trim();
    if (!expr) {
        eqResult.textContent = 'Введите уравнение';
        eqResult.className = 'solution-result error';
        return;
    }
    try {
        const result = solveLinearEquation(expr);
        eqResult.textContent = result;
        eqResult.className = 'solution-result success';
        addHistory(expr, result);
    } catch (err) {
        eqResult.textContent = 'Ошибка: ' + err.message;
        eqResult.className = 'solution-result error';
    }
}
if (solveEqBtn) solveEqBtn.addEventListener('click', solveEquationFromInput);
// Обработка Enter для поля уравнения уже сделана в общем обработчике, но если там не сработает — дублируем:
eqInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        solveEquationFromInput();
    }
});

// ===== КВАДРАТНЫЕ УРАВНЕНИЯ (кнопки) =====
document.getElementById('calcDiscrBtn').addEventListener('click', calcDiscriminant);
document.getElementById('calcVietBtn').addEventListener('click', calcVieta);

// ===== ИНИЦИАЛИЗАЦИЯ =====
renderHistory();
adjustFontSize();