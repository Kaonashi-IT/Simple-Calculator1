# Simple Calculator

A clean, minimalist calculator built using HTML, CSS, and JavaScript. This project demonstrates basic web development skills and provides a functional tool for everyday arithmetic.

## Features

*   **Basic Arithmetic:** Supports addition, subtraction, multiplication, and division.
*   **Responsive Design:** Works well on various screen sizes (though primarily designed for desktop/tablet).
*   **Clear & Delete:** Buttons to clear the current entry (`Del`) and clear all (`Clr`).
*   **Decimal Support:** Perform calculations with decimal numbers.
*   **Percentage Functionality:** Calculate percentages easily.

## Technologies Used

*   **HTML5:** For the structure and content of the calculator.
*   **CSS3:** For styling and layout, making the calculator visually appealing.
*   **JavaScript (ES6+):** For all the calculator's logic and interactivity. 


## Live Demo

You can try out the calculator live here: [(https://rithickroshanr.github.io/Simple-Calculator-/)]

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You only need a web browser to view this project. No special backend or build tools are required.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rithickroshanr/simple-calculator.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd simple-calculator
    ```

3.  **Open `index.html`:**
    Simply open the `index.html` file in your preferred web browser.

## Usage

1.  Click the number buttons to input your desired numbers.
2.  Click an operator button (+, -,*,%, /) to select the operation.
3.  Click another number or sequence of numbers.
4.  Click the `=` button to see the result.
5.  Use `Del` to clear the current input or `Clr` to clear all.

## Project Structure
simple-calculator
├── index.html
# The main HTML file
├── style.css
# All the styling for the calculator
└── script.js
# The JavaScript logic for calculator functionality

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
## Contact

rithickroshan749@gmail.com
Project Link: [(https://rithickroshanr.github.io/Simple-Calculator-/)] 

## Screenshot: 


<img width="436" height="868" alt="Screenshot 2025-09-19 164710" src="https://github.com/user-attachments/assets/2752779e-d3bc-49f8-ada3-7ca1442c5935" />

---


Я значительно расширил  функциональность оригинального калькулятора. Добавлены следующие возможности:

1. Решение линейных уравнений
Поддержка уравнений вида ax + b = c или ax + b = cx + d.

Переменные: x, y, z.

Ввод уравнения прямо в поле калькулятора (если есть = и переменная) или в отдельном поле в правой панели.

Отображение результата в виде x = 2.5.

2. Квадратные уравнения
Ввод коэффициентов a, b, c.

Вычисление дискриминанта с выводом корней (если есть) и проверкой по теореме Виета.

Теорема Виета: показывает сумму и произведение корней.

Автоматический расчёт дискриминанта при нажатии Enter в полях a, b, c.

3. История вычислений
Сохраняются все вычисления (арифметика, линейные уравнения, дискриминант, теорема Виета).

Хранится до 50 записей.

Клик по записи подставляет результат в поле калькулятора (для продолжения вычислений).

4. Тёмная тема
Переключение между светлой и тёмной темой интерфейса (кнопка в правом верхнем углу).

Все элементы адаптированы к обоим режимам.

5. Улучшенная клавиатура
Поддержка ввода с клавиатуры: цифры, операторы, скобки, Enter, Backspace, Escape.

При вводе в поля правой панели (уравнения, коэффициенты) клавиши не перехватываются (работает нативный ввод).

6. Собственный алгоритм вычислений (без eval)
Реализован парсер выражений с использованием обратной польской записи (RPN).

Поддержка приоритета операций, скобок, унарного минуса.

Безопасное вычисление без использования eval.

7. Автоматическое уменьшение шрифта
При вводе больших чисел (более 10 символов) размер шрифта автоматически уменьшается, чтобы число помещалось в поле ввода.

8. Расширенный интерфейс
Две колонки: слева калькулятор и история, справа панель для уравнений.

Улучшенная стилизация, адаптивность.

