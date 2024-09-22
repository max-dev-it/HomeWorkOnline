var dataQuestions = null;
var currentNumberAnswer = null;

const answer1 = document.getElementById('answerOneBtn');
const answer2 = document.getElementById('answerTwoBtn');
const answer3 = document.getElementById('answerThreeBtn');
const answer4 = document.getElementById('answerFourBtn');
const quastion = document.getElementById('questionDiv');



let currentAnswerRu = "";
let currentAnswerEng = "";


answer1.addEventListener('click', function() {
    checkAnswer(answer1.textContent, answer1);
});

answer2.addEventListener('click', function() {
    checkAnswer(answer2.textContent, answer2);
});

answer3.addEventListener('click', function() {
    checkAnswer(answer3.textContent, answer3);
});

answer4.addEventListener('click', function() {
    checkAnswer(answer4.textContent, answer4);
});



async function readCsv(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const csvText = await response.text();
        // const rows = csvText.split('\r\n').map(row => row.split(';'));
        const rows = csvText.split('\n').map(row => row.split(';'));


        return rows;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


function getUniqueRandomNumbers(min, max, count, exclude) {
    // Создаем массив с числами в заданном диапазоне, исключая определенное число
    const numbers = [];
    for (let i = min; i <= max; i++) {
        if (i !== exclude) {
            numbers.push(i);
        }
    }

    // Проверяем, достаточно ли уникальных чисел для выборки
    if (numbers.length < count) {
        throw new Error("Недостаточно уникальных чисел для выборки.");
    }

    // Перемешиваем массив
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Меняем местами
    }

    // Возвращаем первые 'count' уникальных чисел
    let resultNumbers = numbers.slice(0, count);

    // добавляем ответ и перемешиваем массив
    resultNumbers.push(exclude);

    for (let i = resultNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [resultNumbers[i], resultNumbers[j]] = [resultNumbers[j], resultNumbers[i]]; // Меняем местами
    }


    return resultNumbers;
}


function checkAnswer(answer, buttonId) {
    if (answer == currentAnswerEng) {
        currentNumberAnswer = currentNumberAnswer < dataQuestions.length - 1 ? (currentNumberAnswer + 1) : 0;
        console.log(currentNumberAnswer);
        generateQuestion(currentNumberAnswer);
    } else {
        showError(buttonId);
    }
    
}


function showError(buttonElement) {
    buttonElement.classList.add('answer-error');

    setTimeout(() => {
        buttonElement.classList.remove('answer-error');
    }, 200);
}


function generateQuestion(currentNumberAnswer) {
    let uniqueNumbers = getUniqueRandomNumbers(0, dataQuestions.length - 1, 3, currentNumberAnswer);

    console.log(uniqueNumbers);

    answer1.textContent = dataQuestions[uniqueNumbers[0]][0];
    answer2.textContent = dataQuestions[uniqueNumbers[1]][0];
    answer3.textContent = dataQuestions[uniqueNumbers[2]][0];
    answer4.textContent = dataQuestions[uniqueNumbers[3]][0];

    currentAnswerRu = dataQuestions[currentNumberAnswer][1];
    currentAnswerEng = dataQuestions[currentNumberAnswer][0];
    quastion.textContent = currentAnswerRu;
}


async function main(numberLesson) {
    const filePath = `./csv/lesson_${numberLesson}.csv`;
    dataQuestions = await readCsv(filePath);
    console.log(dataQuestions);
    currentNumberAnswer = 0;
    generateQuestion(currentNumberAnswer);
}


// Проверка параметров URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('main') === 'true') {
    const lessonNumber = urlParams.get('lessonNumber');
    main(lessonNumber);
}
