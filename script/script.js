document.addEventListener("DOMContentLoaded", () => {
    const btnOpenModal = document.querySelector("#btnOpenModal");
    const modalBlock = document.querySelector("#modalBlock");
    const closeModal = document.querySelector("#closeModal");
    const questionTitle = document.querySelector("#question");
    const formAnswers = document.querySelector("#formAnswers");
    const nextButton = document.querySelector("#next");
    const prevButton = document.querySelector("#prev");
    const sendButton = document.querySelector("#send");
    let a=-2;
    switch (true) {
        case(a>0):console.log(1);
        break;
        case(a===3):console.log(3);
        break;
    };

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

        finalAnswers = [];

        let numberQuestion = 0;

        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');
                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" value="${answer.title}" class='d-none'>
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
            
            if(numberQuestion >= 0 && numberQuestion < questions.length) {
                questionTitle.textContent = `${questions[indexQuestion].question}`;
                renderAnswers(indexQuestion);
                sendButton.classList.add('d-none');
                nextButton.classList.remove('d-none'); // Кнопка Next показується для всіх питань включно з останнім соусом
            }

            // Керування кнопкою Prev
            if(numberQuestion === 0) {
                prevButton.classList.add('d-none');
            } else {
                prevButton.classList.remove('d-none');
            }

            // Крок введення номера телефону (після всіх питань)
            if(numberQuestion === questions.length) {
                questionTitle.textContent = '';
                nextButton.classList.add('d-none'); // Тілки тут приховуємо Next
                prevButton.classList.remove('d-none'); // Кнопка Prev залишається доступною
                sendButton.classList.remove('d-none'); // Показуємо кнопку Send

                formAnswers.innerHTML = 
                `<div class="input-group-prepend">
                   <span class="input-group-text" id="NumberPhon">Введіть номер телефону</span>
                </div>
                 <input type="text" class="form-control" placeholder="Номер телефону" aria-label="Username" aria-describedby="basic-addon1" id="NumberPhon">
                </div>`;
            }

            if(numberQuestion === questions.length + 1) {
                questionTitle.textContent = '';
                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                sendButton.classList.add('d-none');
                formAnswers.innerHTML ='Дякуємо за пройдене тестування! Наш менеджер зателефонує!';

                setTimeout(() => {
                    modalBlock.classList.remove("d-block");
                }, 2000);
            }
        };

        renderQuestions(numberQuestion);

        const checkAnswer = () => {
            const obj = {};
            const inputs = [...formAnswers.querySelectorAll('input')];

            inputs.forEach((input) => {
                if (numberQuestion >= 0 && numberQuestion < questions.length) {
                    if (input.checked) {
                        obj[`${numberQuestion}_${questions[numberQuestion].question}`] = input.value;
                    }
                }
                if (numberQuestion === questions.length) {
                    obj['Number Phone'] = input.value;
                }
            });
            finalAnswers.push(obj);
            console.log(finalAnswers);
        };

        prevButton.onclick = () => {
            if (numberQuestion > 0) {
                numberQuestion--;
                renderQuestions(numberQuestion);
            }
        };

        nextButton.onclick = () => {
            if (numberQuestion < questions.length) {
                checkAnswer();
                numberQuestion++;
                renderQuestions(numberQuestion);
            }
        };
        
        sendButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
            console.log(finalAnswers);
        };
    };
});