
document.addEventListener('DOMContentLoaded', () => {
    let score = 0;
    const allCheckButtons = document.querySelectorAll('.check-answer-btn');
    const allQuestionContainers = document.querySelectorAll('.question-container');
    const totalQuestions = allQuestionContainers.length;

    allQuestionContainers.forEach(container => {
        const checkBtn = container.querySelector('.check-answer-btn');
        const answerButtons = container.querySelectorAll('.answer-button');
        const feedback = container.querySelector('.feedback');
        let answered = false;

        answerButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (answered) return;
                answerButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                btn.style.borderColor = '#0a66c2';
                btn.style.backgroundColor = '#e6f0ff';
                btn.style.boxShadow = '0 0 0 3px rgba(10, 102, 194, 0.3)';
            });
        });

        checkBtn.addEventListener('click', () => {
            if (answered) return;

            const selected = container.querySelector('.answer-button.selected');

            answerButtons.forEach(button => {
                const isCorrect = button.getAttribute('data-correct') === 'true';
                if (isCorrect) {
                    button.classList.add('correct');
                } else if (button === selected) {
                    button.classList.add('incorrect');
                }
                button.disabled = true;
            });

            if (selected && selected.getAttribute('data-correct') === 'true') {
                score++;
            }

            feedback.classList.add('visible');
            answered = true;
            checkBtn.clickedOnce = true;

            const parentSection = container.closest('.section');
            const sectionQuestions = parentSection.querySelectorAll('.question-container');
            const allAnswered = Array.from(sectionQuestions).every(q =>
                q.querySelector('.check-answer-btn').clickedOnce
            );

            if (allAnswered) {
                const nextBtn = parentSection.querySelector('.next-button');
                if (nextBtn) nextBtn.disabled = false;
            }

            const allAnsweredGlobal = Array.from(allCheckButtons).every(btn => btn.clickedOnce);
            if (allAnsweredGlobal) {
                showResults(score, totalQuestions);
            }
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
