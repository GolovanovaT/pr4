document.addEventListener("DOMContentLoaded", () => {
    const btnOpenModal = document.querySelector("#btnOpenModal");
    const modalBlock = document.querySelector("#modalBlock");
    const closeModal = document.querySelector("#closeModal");
    const questionTitle = document.querySelector("#question");
    const formAnswers = document.querySelector("#formAnswers");
    const nextButton = document.querySelector("#next");
    const prevButton = document.querySelector("#prev");
    let currentStep = 0;

    const questions = [
        {
            question: "Якого кольору бургер бажаєте?",
            answers: [
                { 
                  title: 'Стандарт', 
                  url: './image/burger.png'
                },
                { 
                  title: 'Чорний', 
                  url: './image/burgerBlack.png' 
                }
            ],
            type: 'radio'
        },
        {
            question: "Оберіть м'ясо:",
            answers: [
                { 
                  title: 'Яловичина', 
                  url: './image/beefMeat.png' 
                },
                { 
                  title: 'Курятина', 
                  url: './image/chickenMeat.png' 
                },
                { 
                  title: 'Свинина', 
                  url: './image/porkMeat.png' 
                }
            ],
            type: 'radio'
        },
        {
            question: "Додайте овочі:",
            answers: [
                { 
                  title: 'Салат', 
                  url: './image/salad.png' 
                },
                { 
                  title: 'Томати', 
                  url: './image/tomato.png' 
                },
                { 
                  title: 'Огірки', 
                  url: './image/cucumber.png' 
                },
                { 
                  title: 'Цибуля', 
                  url: './image/onion.png' 
                }
            ],
            type: 'radio'
        },
        {
            question: "Додати соус?",
            answers: [
                { 
                  title: 'Часниковий', 
                  url: './image/sauce1.png' 
                },
                { 
                  title: 'Томатний', 
                  url: './image/sauce2.png' 
                },
                { 
                  title: 'Гірчичний', 
                  url: './image/sauce3.png' 
                }
            ],
            type: 'radio'
        }
    ];


   btnOpenModal.addEventListener("click", () => {
        modalBlock.classList.add('d-block');
        playTest();

    });

    closeModal.addEventListener("click", () => {
        modalBlock.classList.remove("d-block");

    });

    const playTest = () => {

        let numberQuestion = 0;

        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');
                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between align-items-center">
                        <img class="answerImg" src="${answer.url}" alt="burger">
                        <span>${answer.title}</span>
                    </label>
            `;
                formAnswers.appendChild(answerItem);
            });
        };

        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = " ";

            questionTitle.textContent = `${questions[indexQuestion].question}`;
            renderAnswers(indexQuestion);

        }

        renderQuestions(numberQuestion);


        prevButton.onclick = () => {
            if (numberQuestion > 0) {
                numberQuestion--;
                renderQuestions(numberQuestion);
            }
        };

        nextButton.onclick = () => {
            if (numberQuestion < questions.length - 1) {
                numberQuestion++;
                renderQuestions(numberQuestion);
            } else {
                alert("Тест завершено!");
                modalBlock.classList.remove("d-block");
            }
        };
    };
});