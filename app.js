let questions = [
    {
        question: 'What is the capital city of Poland?',
        answers: ['Berlin', 'London', 'Warsaw', 'Madrid'],
        correctAnswer: 2

    },
    {
        question: 'Which one of the animals is not a reptile?',
        answers: ['shark', 'snake', 'turtle', 'lizard', 'alligator'],
        correctAnswer: 0
    },
    {
        question: 'How many planets are in the Solar System?',
        answers: [5, 6, 8, 9],
        correctAnswer: 2
    },
    {
        question: 'What year did the Titanic sink in the Atlantic Ocean on its first and only voyage from Southampton on April 15?',
        answers: [1897, 1905, 1912, 1918],
        correctAnswer: 2
    },
    {
        question: 'What is the chemical symbol of silver?',
        answers: ['Ag', 'Au', 'Al', 'Sb'],
        correctAnswer: 0
    },
    {
        question: 'How many films have Al Pacino and Robert De Niro starred together?',
        answers: [6, 4, 9, 11],
        correctAnswer: 1
    },
    {
        question: 'Which country in the world has the most kilometers of highways?',
        answers: ['USA', 'Germany', 'China', 'Australia'],
        correctAnswer: 2
    },
    {
        question: 'In what year did the Beatles break-up?',
        answers: [1968, 1959, 1977, 1970],
        correctAnswer: 3
    },
    {
        question: 'What are the five colors of the Olympic rings?',
        answers: ['Blue, yellow, black, green and red', 'Yellow, black, purple, green and red', 'Black, yellow, brown, green and red'],
        correctAnswer: 0
    },
    {
        question: 'Gouda is a popular cheese from which country?',
        answers: ['Switzerland', 'Netherlands', 'Germany', 'France', 'Czech Republic'],
        correctAnswer: 1
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
let quizOver = false;

const feedback = document.querySelector('.feedback');
const result = document.querySelector('.result');
const submitBtn = document.querySelector('.nextButton');

window.addEventListener('DOMContentLoaded', function(e) {
    displayCurrentQuestion();

    submitBtn.addEventListener('click', function(){
        const radioBtnsChecked = document.querySelector('input[type=radio]:checked')

        if(!quizOver) {
            if(radioBtnsChecked) {
                //check if the answer is correct
                if(parseInt(radioBtnsChecked.value) === questions[currentQuestion].correctAnswer) {
                    //alert('podałeś poprawną odpowiedź');
                    correctAnswers++;
                } 
                currentQuestion++;
                //check if the current question is the last one
                if(currentQuestion === questions.length) {
                    quizOver = true;
                    submitBtn.textContent = 'Play again';
                    showScore();
                    getFeedback('Congratulations, you have finished the quiz game', 'warning');
                } else {
                    displayCurrentQuestion();
                }
            } else {
                getFeedback('You did not choose any answer', 'warning', 3000);
            }
        } else {
            //restart quiz and start it again
            restartQuiz();
            displayCurrentQuestion();
        }
    });

    //adding the on enter key press to submit the answer
    document.querySelector('.quizContainer').addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            submitBtn.click();
        }
        });

});

function displayCurrentQuestion(){
    console.log('a new question has been displayed');
    const question = questions[currentQuestion].question;
    const answers = questions[currentQuestion].answers;
    const questionBlock = document.querySelector('.question');
    const answerList = document.querySelector('.answers');

    answerList.innerHTML = '';

    questionBlock.textContent = `Q: ${question}`;
    //create and show all answers
    answers.forEach((answer, index) => {
        let li = document.createElement('li');
        li.innerHTML = `<label for="option-${index}">${answer}</label><input type="radio" name="answerOption" id="option-${index}" value="${index}"><span class="checkmark"></span>`;
        console.log(index, answer);
        answerList.appendChild(li);
    });
   
}

function getFeedback(text, type, time) {
    feedback.textContent = text;
    feedback.classList.add(type);
    feedback.classList.remove('hide');
    if(Number.isInteger(time)) {
        setTimeout(function(){
            feedback.classList.add('hide');
            feedback.classList.remove(type);
        }, time);
    }
}

function showScore(){
    result.innerHTML = `You corretly answered <b>${correctAnswers}</b> from <b>${questions.length}</b> questions`;
    result.classList.remove('hide');
}
function restartQuiz() {
    result.classList.add('hide');
    feedback.classList.add('hide');
    submitBtn.textContent = 'Next question';
    currentQuestion = 0;
    correctAnswers = 0;
    quizOver = false;
}