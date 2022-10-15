console.log('lol')
let x = ''; //первое число
let y = ''; //второе
let sign = ''; //знак 
let finish = false; //finish это для того чтобы при нажатии = повторяется действие
const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/', '%', '+/-'];

//для вывода на панельку
const out = document.querySelector('.calcScreen p');

//для АС
function AC () {
    x = '';
    y = ''; 
    sign = '';
    finish =  false;
    out.textContent = 0;
}
document.querySelector('.ac').onclick = AC;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return; // нажата не кнопка
    if (event.target.classList.contains('ac')) return; // нажата кнопка ас
    out.textContent = '';
    // получаем нажатую кнопку
    const key = event.target.textContent;
    // если нажата клавиша 0-9 или .
    if (number.includes(key)) {
        if (y === '' && sign === '') {
            x += key;
            out.textContent = x;
        }

        else if (x!=='' && y!=='' && finish) {
            y = key;
            finish = false;
            out.textContent = y;
        }

        else{
            y += key;
            out.textContent = y;

        }
        console.table(x, y, sign);
        return;
    }
    // если нажата клавиша + - / *
    if (action.includes(key)) {
        sign = key;
        if (sign === '%') {
            x = x / 100;
            out.textContent = x;
            return;
        } else if (sign === '+/-') {
            x = -x;
            out.textContent = x;
            return;
        } else {
        out.textContent = sign;
        console.table(x, y, sign);
        return;
        }  
    }

    // нажата =
    if (key === '=') {
        if (y === '') x = y;
        switch (sign) {
            case '+':
                x = (+x) + (+y);
                break;
            case '-':
                x = x - y;
                break;
            case 'x':
                x = x * y;
                break;
            case '/':
                if (y === '0') {
                    out.textContent = "Error";
                    x = '';
                    y = '';
                    sign = '';
                    return;
                }
                x = x / y 
                break;
            case '%':
                x = x / 100;
                out.textContent = x;
                break;
            case '+/-':
                x = -x;
                break;
        }
        finish = true;
        out.textContent = x;
        console.table(x, y, sign);
    }
}
