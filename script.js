const furnitureWords = [
    { word: 'Stoel', image: 'assets/stoel.jpg' },
    { word: 'Tafel', image: 'assets/tafel.jpg' },
    { word: 'Bank', image: 'assets/bank.jpg' },
    { word: 'Bed', image: 'assets/bed.jpg' },
    { word: 'Kast', image: 'assets/kast.png' },
    { word: 'Bureau', image: 'assets/bureau.jpeg' },
    { word: 'Lamp', image: 'assets/lamp.jpg' },
    { word: 'Spiegel', image: 'assets/spiegel.jpg' },
    { word: 'Kussen', image: 'assets/kussen.jpg' },
    { word: 'Plank', image: 'assets/plank.png' },
    { word: 'Deken', image: 'assets/deken.jpg' },
    { word: 'Matrass', image: 'assets/matrass.jpg' },
    { word: 'Klerenkast', image: 'assets/klerenkast.jpg' },
    { word: 'Nachtkastje', image: 'assets/nachtkastje.png' },
    { word: 'Eettafel', image: 'assets/eettafel.jpg' },
    { word: 'Schommelstoel', image: 'assets/schommelstoel.png' },
    { word: 'Salontafel', image: 'assets/salontafel.png' },
    { word: 'Boekenkast', image: 'assets/boekenkast.png' },
    { word: 'Televisiemeubel', image: 'assets/televisiemeubel.jpg' },
    { word: 'Kapstok', image: 'assets/kapstok.jpg' },
    { word: 'Lade', image: 'assets/lade.jpg' },
    { word: 'Gordijnen', image: 'assets/gordijnen.jpg' },
    { word: 'Schilderij', image: 'assets/schilderij.jpeg' },
    { word: 'Klok', image: 'assets/klok.jpg' },
    { word: 'Dressoir', image: 'assets/dressoir.jpg' },
    { word: 'Bijzettafel', image: 'assets/bijzettafel.png' },
    { word: 'Vloerkleed', image: 'assets/vloerkleed.jpg' },
    { word: 'Hocker', image: 'assets/hocker.jpg' },
    { word: 'Vitrine', image: 'assets/vitrine.jpg' },
    { word: 'Hanglamp', image: 'assets/hanglamp.jpg' },
    { word: 'Staande lamp', image: 'assets/staande_lamp.jpg' },
    { word: 'Bureaustoel', image: 'assets/bureaustoel.jpg' },
    { word: 'Klapstoel', image: 'assets/klapstoel.jpg' },
    { word: 'Kinderstoel', image: 'assets/kinderstoel.jpg' },
    { word: 'Kledingkast', image: 'assets/kledingkast.jpeg' },
    { word: 'Schoenenrek', image: 'assets/schoenenrek.jpg' },
    { word: 'Ladekast', image: 'assets/ladekast.jpg' },
    { word: 'Klerenhanger', image: 'assets/klerenhanger.jpg' },
    { word: 'Kinderbed', image: 'assets/kinderbed.jpg' },
    { word: 'Dekbed', image: 'assets/dekbed.jpg' },
    { word: 'Plafondlamp', image: 'assets/plafondlamp.jpg' },
    { word: 'Tafelkleed', image: 'assets/tafelkleed.jpg' },
    { word: 'Kookplaat', image: 'assets/kookplaat.jpg' },
    { word: 'Oven', image: 'assets/oven.png' },
    { word: 'Magnetron', image: 'assets/magnetron.jpg' },
    { word: 'Koelkast', image: 'assets/koelkast.jpg' },
    { word: 'Vriezer', image: 'assets/vriezer.png' },
    { word: 'Afwasmachine', image: 'assets/afwasmachine.jpg' },
    { word: 'Keukenkast', image: 'assets/keukenkast.jpg' },
    { word: 'Kraan', image: 'assets/kraan.jpg' }
];

document.getElementById('start-quiz').addEventListener('click', startQuiz);
document.getElementById('review-words').addEventListener('click', reviewWords);
document.getElementById('play-sound').addEventListener('click', playSound);

function startQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('review-container').style.display = 'none';
    updateScore();
    shuffleArray(furnitureWords);
    showQuestion();
}

function showQuestion() {
    const question = furnitureWords[currentQuestion];
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    const options = shuffleArray([question, ...getRandomWords(3)]);
    options.forEach(option => {
        const img = document.createElement('img');
        img.src = option.image;
        img.alt = option.word;
        img.addEventListener('click', () => checkAnswer(option.word, img));
        optionsContainer.appendChild(img);
    });
    playSound();
}

function checkAnswer(selectedWord, selectedElement) {
    const correctWord = furnitureWords[currentQuestion].word;
    const optionsContainer = document.getElementById('options-container');
    if (selectedWord === correctWord) {
        selectedElement.classList.add('correct');
        selectedElement.alt = '✅ ' + selectedElement.alt;
        correctAnswers++;
    } else {
        selectedElement.classList.add('incorrect');
        selectedElement.alt = '❌ ' + selectedElement.alt;
        incorrectAnswers++;
        // Highlight the correct answer
        Array.from(optionsContainer.children).forEach(img => {
            if (img.alt === correctWord) {
                img.classList.add('correct');
                img.alt = '✅ ' + img.alt;
            }
        });
    }
    setTimeout(() => {
        if (currentQuestion < furnitureWords.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            endQuiz();
        }
    }, 2500); // 3 seconds delay
    updateScore();
}

function endQuiz() {
    alert(`Quiz finished! Your score is ${correctAnswers} correct answers and ${incorrectAnswers} incorrect answers.`);
    document.getElementById('quiz-container').style.display = 'none';
}

function reviewWords() {
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = '';
    furnitureWords.forEach(item => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        const span = document.createElement('span');
        img.src = item.image;
        img.alt = item.word;
        span.textContent = item.word;
        div.appendChild(img);
        div.appendChild(span);
        reviewContainer.appendChild(div);
    });
    document.getElementById('quiz-container').style.display = 'none';
    reviewContainer.style.display = 'block';
}

function playSound() {
    const word = furnitureWords[currentQuestion].word;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'nl-NL';
    window.speechSynthesis.speak(utterance);
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function getRandomWords(num) {
    const words = [...furnitureWords];
    words.splice(currentQuestion, 1);
    return shuffleArray(words).slice(0, num);
}

function updateScore() {
    const correctEmoji = '✅';
    const incorrectEmoji = '❌';
    document.getElementById('score').innerHTML = `Correct: ${correctEmoji} ${correctAnswers} | Incorrect: ${incorrectEmoji} ${incorrectAnswers}`;
}
