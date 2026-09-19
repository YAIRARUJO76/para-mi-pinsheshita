const questions = [
    {
        question: "¿Cuánto es 4 + 4?",
        answers: [
            "6",
            "8",
            "10",
            "12"
        ],
        correct: "8",
        success: "Wow, mi amor, eres increíble. 🥺💜 Sabía que ibas a acertar... Es que eres tan inteligente mi amor que no tienes explicación.",
        error: "Mmm... intenta otra vez, preciosa. 💜 Sé que puedes encontrar la respuesta."
    },

    {
        question: "¿Cuál es el significado de este símbolo?",
        symbol: "∞",
        answers: [
            "Amor",
            "Infinito",
            "Sueños",
            "Siempre"
        ],
        correct: "Infinito",
        success: "Exactamente... infinito. ∞ Y para mí ese símbolo representa todo lo que siento por ti: algo que no tiene final, algo que quiero seguir construyendo contigo y que va mucho más allá de cualquier distancia. 💜",
        error: "Casi, mi amor... mira bien el símbolo. ∞ Intenta de nuevo. 💜"
    }
];

let currentQuestion = 0;
let answeredCorrectly = false;

const quizScreen =
    document.getElementById("quizScreen");

const surpriseScreen =
    document.getElementById("surpriseScreen");

const letterScreen =
    document.getElementById("letterScreen");

const questionContainer =
    document.getElementById("questionContainer");

const message =
    document.getElementById("message");

const nextButton =
    document.getElementById("nextButton");

const progressText =
    document.getElementById("progressText");

const progressBar =
    document.getElementById("progressBar");

const letterButton =
    document.getElementById("letterButton");

const stars =
    document.querySelector(".stars");

function showQuestion() {

    const question =
        questions[currentQuestion];

    answeredCorrectly = false;

    message.textContent = "";

    message.className = "message";

    nextButton.classList.add("hidden");

    progressText.textContent =
        `Pregunta ${currentQuestion + 1} de ${questions.length}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    let symbolHTML = "";

    if (question.symbol) {

        symbolHTML = `
            <span class="infinity">
                ${question.symbol}
            </span>
        `;

    }

    questionContainer.innerHTML = `

        <div class="question">

            <div class="question-number">
                Pregunta ${currentQuestion + 1}
            </div>

            ${symbolHTML}

            <h2>
                ${question.question}
            </h2>

            <div class="answers">

                ${question.answers.map(answer => `

                    <button
                        class="answer"
                        data-answer="${answer}"
                    >
                        ${answer}
                    </button>

                `).join("")}

            </div>

        </div>

    `;

    document
        .querySelectorAll(".answer")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => checkAnswer(button)
            );

        });

}

function checkAnswer(button) {

    if (answeredCorrectly) {
        return;
    }

    const selected =
        button.dataset.answer;

    const question =
        questions[currentQuestion];

    if (selected === question.correct) {

        answeredCorrectly = true;

        button.classList.add("correct");

        document
            .querySelectorAll(".answer")
            .forEach(btn => {
                btn.disabled = true;
            });

        message.textContent =
            question.success;

        message.className =
            "message success";

        nextButton.classList.remove("hidden");

        createBurst();

    } else {

        button.classList.add("wrong");

        message.textContent =
            question.error;

        message.className =
            "message";

        setTimeout(() => {

            button.classList.remove("wrong");

        }, 500);

    }

}

nextButton.addEventListener(
    "click",
    () => {

        if (!answeredCorrectly) {
            return;
        }

        if (
            currentQuestion <
            questions.length - 1
        ) {

            currentQuestion++;

            showQuestion();

        } else {

            showScreen(surpriseScreen);

        }

    }
);

letterButton.addEventListener(
    "click",
    () => {
        const transition = document.createElement("div");

        transition.className = "letter-transition";

        transition.innerHTML = `
            <div class="transition-heart">💜</div>
            <p>Preparé algo muy especial para ti...</p>
        `;

        document.body.appendChild(transition);

        const music = document.getElementById("loveMusic");

        if (music) {
            music.volume = 1;
            music.play().catch(() => {});
        }

        setTimeout(() => {
            showScreen(letterScreen);
            createManyStars();
        }, 2200);

        setTimeout(() => {
            transition.classList.add("fade-out");

            setTimeout(() => {
                transition.remove();
            }, 800);
        }, 2200);
    }
);
function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(section => {

            section.classList.remove("active");

        });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

function createStar() {

    const star =
        document.createElement("span");

    const symbols = [
        "✦",
        "✧",
        "♥",
        "♡",
        "·"
    ];

    star.className =
        "star";

    star.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];

    star.style.left =
        `${Math.random() * 100}%`;

    star.style.bottom =
        "-30px";

    star.style.fontSize =
        `${8 + Math.random() * 15}px`;

    star.style.animationDuration =
        `${7 + Math.random() * 7}s`;

    stars.appendChild(star);

    setTimeout(() => {

        star.remove();

    }, 15000);

}

function createManyStars() {

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        setTimeout(
            createStar,
            i * 100
        );

    }

}

function createBurst() {

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        setTimeout(
            createStar,
            i * 50
        );

    }

}

setInterval(
    createStar,
    700
);

showQuestion();

createManyStars();

const finalButton = document.getElementById("finalButton");
const finalSurprise = document.getElementById("finalSurprise");

if (finalButton && finalSurprise) {
    finalButton.addEventListener("click", () => {
        finalButton.classList.add("hidden");
        finalSurprise.classList.remove("hidden");

        createManyStars();

        finalSurprise.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
}

const closeButton = document.getElementById("closeButton");
const goodbyeScreen = document.getElementById("goodbyeScreen");

if (closeButton && goodbyeScreen) {
    closeButton.addEventListener("click", () => {

        const transition = document.createElement("div");

        transition.className = "close-transition";

        transition.innerHTML = `
            <div class="close-transition-heart">💜</div>
            <div class="close-transition-text">
                Gracias por llegar hasta aquí...
            </div>
        `;

        document.body.appendChild(transition);

        requestAnimationFrame(() => {
            transition.classList.add("active");
        });

        closeButton.classList.add("hidden");

        setTimeout(() => {
            goodbyeScreen.classList.remove("hidden");

            createManyStars();

            for (let i = 0; i < 35; i++) {
                setTimeout(createStar, i * 100);
            }

            goodbyeScreen.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 1800);

        setTimeout(() => {
            transition.classList.remove("active");

            setTimeout(() => {
                transition.remove();
            }, 1500);
        }, 2400);
    });
}