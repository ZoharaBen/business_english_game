document.addEventListener('DOMContentLoaded', () => {
    const questionContainers = document.querySelectorAll('.question-container');
    let score = 0;
    let totalQuestions = questionContainers.length;

    questionContainers.forEach((container, index) => {
        const checkBtn = container.querySelector('.check-answer-btn');
        const answerButtons = container.querySelectorAll('.answer-button');
        const feedback = container.querySelector('.feedback');
        let answered = false;

        checkBtn.addEventListener('click', () => {
            if (answered) return;

            answerButtons.forEach(button => {
                const isCorrect = button.getAttribute('data-correct') === 'true';
                if (isCorrect) {
                    button.classList.add('correct');
                } else if (button.classList.contains('selected')) {
                    button.classList.add('incorrect');
                }
                button.disabled = true;
            });

            const selected = container.querySelector('.answer-button.selected');
            if (selected && selected.getAttribute('data-correct') === 'true') {
                score++;
            }

            feedback.classList.add('visible');
            answered = true;
            checkBtn.clickedOnce = true;

            const parentSection = container.closest('.section');
            const allQuestions = parentSection.querySelectorAll('.question-container');
            const allAnswered = Array.from(allQuestions).every(q =>
                q.querySelector('.check-answer-btn').clickedOnce
            );

            if (allAnswered) {
                const nextBtn = parentSection.querySelector('.next-button');
                if (nextBtn) nextBtn.disabled = false;
            }

            const allAnsweredGlobal = Array.from(document.querySelectorAll('.check-answer-btn')).every(btn => btn.clickedOnce);
            if (allAnsweredGlobal) {
                showResults(score, totalQuestions);
            }
        });

        answerButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (answered) return;
                answerButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });
    });
});

function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setActiveButtonFromId(sectionId);
    }
}

function setActiveButton(index) {
    document.querySelectorAll('.nav-button').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
}

function setActiveButtonFromId(sectionId) {
    const sectionMap = {
        'section1': 0,
        'section2': 1,
        'section3': 2,
        'section4': 3
    };
    setActiveButton(sectionMap[sectionId] ?? 0);
}

function showResults(score, total) {
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'results';
    resultsDiv.innerHTML = `
        <div class="score-circle">${score} / ${total}</div>
        <div class="result-message">Your Score</div>
        <p>Great job! You've completed the Business English Meeting Skills Quiz.</p>
    `;
    document.querySelector('.quiz-sections').appendChild(resultsDiv);
}
