const alphabetData = {
    vowels: [
        { letter: 'A', phonetic: '/eɪ/', words: ['Apple', 'Ant', 'Alligator'] },
        { letter: 'E', phonetic: '/iː/', words: ['Elephant', 'Egg', 'Eye'] },
        { letter: 'I', phonetic: '/aɪ/', words: ['Ice cream', 'Igloo', 'Insect'] },
        { letter: 'O', phonetic: '/əʊ/', words: ['Orange', 'Octopus', 'Owl'] },
        { letter: 'U', phonetic: '/juː/', words: ['Umbrella', 'Unicorn', 'Up'] }
    ],
    consonants1: [
        { letter: 'B', phonetic: '/biː/', words: ['Ball', 'Bear', 'Butterfly'] },
        { letter: 'C', phonetic: '/siː/', words: ['Cat', 'Car', 'Cake'] },
        { letter: 'D', phonetic: '/diː/', words: ['Dog', 'Duck', 'Dolphin'] },
        { letter: 'F', phonetic: '/ef/', words: ['Fish', 'Frog', 'Flower'] },
        { letter: 'G', phonetic: '/dʒiː/', words: ['Giraffe', 'Goat', 'Grapes'] }
    ],
    consonants2: [
        { letter: 'H', phonetic: '/eɪtʃ/', words: ['Horse', 'House', 'Heart'] },
        { letter: 'J', phonetic: '/dʒeɪ/', words: ['Jellyfish', 'Jungle', 'Juice'] },
        { letter: 'K', phonetic: '/keɪ/', words: ['Kangaroo', 'Kite', 'Key'] },
        { letter: 'L', phonetic: '/el/', words: ['Lion', 'Lemon', 'Leaf'] },
        { letter: 'M', phonetic: '/em/', words: ['Monkey', 'Moon', 'Mango'] }
    ],
    consonants3: [
        { letter: 'N', phonetic: '/en/', words: ['Nest', 'Nose', 'Nut'] },
        { letter: 'P', phonetic: '/piː/', words: ['Penguin', 'Panda', 'Pig'] },
        { letter: 'Q', phonetic: '/kjuː/', words: ['Queen', 'Quilt', 'Question'] },
        { letter: 'R', phonetic: '/ɑːr/', words: ['Rabbit', 'Rainbow', 'Rose'] },
        { letter: 'S', phonetic: '/es/', words: ['Snake', 'Sun', 'Star'] }
    ],
    consonants4: [
        { letter: 'T', phonetic: '/tiː/', words: ['Tiger', 'Tree', 'Train'] },
        { letter: 'V', phonetic: '/viː/', words: ['Violin', 'Van', 'Vase'] },
        { letter: 'W', phonetic: '/ˈdʌbəl.juː/', words: ['Whale', 'Water', 'Wolf'] },
        { letter: 'X', phonetic: '/eks/', words: ['X-ray', 'Box', 'Fox'] },
        { letter: 'Y', phonetic: '/waɪ/', words: ['Yellow', 'Yo-yo', 'Yak'] },
        { letter: 'Z', phonetic: '/ziː/', words: ['Zebra', 'Zoo', 'Zero'] }
    ]
};

const wordData = {
    cvc: [
        { word: 'cat', phonetic: '/kæt/', meaning: '猫' },
        { word: 'dog', phonetic: '/dɒɡ/', meaning: '狗' },
        { word: 'pig', phonetic: '/pɪɡ/', meaning: '猪' },
        { word: 'hat', phonetic: '/hæt/', meaning: '帽子' },
        { word: 'sun', phonetic: '/sʌn/', meaning: '太阳' },
        { word: 'bed', phonetic: '/bed/', meaning: '床' },
        { word: 'red', phonetic: '/red/', meaning: '红色' },
        { word: 'run', phonetic: '/rʌn/', meaning: '跑' },
        { word: 'fun', phonetic: '/fʌn/', meaning: '有趣' },
        { word: 'big', phonetic: '/bɪɡ/', meaning: '大' }
    ]
};

const lessonData = {
    1: {
        title: '第1天：元音字母基础',
        description: '学习5个元音字母 A, E, I, O, U 的发音',
        letters: alphabetData.vowels
    },
    2: {
        title: '第2天：辅音字母（一）',
        description: '学习辅音字母 B, C, D, F, G 的发音',
        letters: alphabetData.consonants1
    },
    3: {
        title: '第3天：辅音字母（二）',
        description: '学习辅音字母 H, J, K, L, M 的发音',
        letters: alphabetData.consonants2
    },
    4: {
        title: '第4天：辅音字母（三）',
        description: '学习辅音字母 N, P, Q, R, S 的发音',
        letters: alphabetData.consonants3
    },
    5: {
        title: '第5天：辅音字母（四）',
        description: '学习辅音字母 T, V, W, X, Y, Z 的发音',
        letters: alphabetData.consonants4
    },
    6: {
        title: '第6天：单词拼读实战',
        description: '运用所学字母拼读简单单词',
        letters: [],
        words: wordData.cvc
    },
    7: {
        title: '第7天：综合测试',
        description: '检验你的学习成果',
        letters: [],
        words: wordData.cvc
    }
};

let userProgress = {
    completedLessons: [],
    score: 0,
    streakDays: 0,
    lastStudyDate: null,
    badges: []
};

function loadProgress() {
    const saved = localStorage.getItem('englishLearningProgress');
    if (saved) {
        userProgress = JSON.parse(saved);
    }
    updateProgressDisplay();
}

function saveProgress() {
    localStorage.setItem('englishLearningProgress', JSON.stringify(userProgress));
    updateProgressDisplay();
}

function updateProgressDisplay() {
    document.getElementById('total-lessons').textContent = userProgress.completedLessons.length;
    document.getElementById('total-score').textContent = userProgress.score;
    document.getElementById('streak-days').textContent = userProgress.streakDays;
    
    const progress = (userProgress.completedLessons.length / 7) * 100;
    document.getElementById('overall-progress').style.width = progress + '%';
    document.getElementById('progress-text').textContent = Math.round(progress) + '%';
    
    updateBadges();
}

function updateBadges() {
    const badgesContainer = document.getElementById('badges-container');
    const badges = [
        { id: 'first_lesson', icon: '🎯', name: '初学者', condition: userProgress.completedLessons.length >= 1 },
        { id: 'half_way', icon: '🌟', name: '半程达人', condition: userProgress.completedLessons.length >= 3 },
        { id: 'almost_there', icon: '🚀', name: '即将完成', condition: userProgress.completedLessons.length >= 5 },
        { id: 'master', icon: '👑', name: '拼音大师', condition: userProgress.completedLessons.length >= 7 },
        { id: 'streak_3', icon: '🔥', name: '坚持3天', condition: userProgress.streakDays >= 3 },
        { id: 'score_100', icon: '💯', name: '百分百', condition: userProgress.score >= 100 }
    ];
    
    badgesContainer.innerHTML = badges.map(badge => `
        <div class="badge ${badge.condition ? 'unlocked' : ''}">
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
        </div>
    `).join('');
}

function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
}

function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(pageName + '-page').classList.add('active');
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
}

function startLesson(day) {
    const lesson = lessonData[day];
    document.getElementById('lesson-title').textContent = lesson.title;
    
    const alphabetGrid = document.getElementById('alphabet-grid');
    const wordExamplesContainer = document.getElementById('word-examples-container');
    const practiceContainer = document.getElementById('practice-container');
    
    alphabetGrid.innerHTML = '';
    wordExamplesContainer.innerHTML = '';
    practiceContainer.innerHTML = '';
    
    if (lesson.letters.length > 0) {
        lesson.letters.forEach(item => {
            const card = document.createElement('div');
            card.className = 'alphabet-card';
            card.innerHTML = `
                <div class="letter">${item.letter}</div>
                <div class="phonetic">${item.phonetic}</div>
            `;
            card.onclick = () => speak(item.letter);
            alphabetGrid.appendChild(card);
            
            item.words.forEach(word => {
                const wordCard = document.createElement('div');
                wordCard.className = 'word-card';
                wordCard.innerHTML = `
                    <span class="word">${word}</span>
                    <span class="meaning">点击发音</span>
                `;
                wordCard.onclick = () => speak(word);
                wordExamplesContainer.appendChild(wordCard);
            });
        });
        
        practiceContainer.innerHTML = `
            <h4>练习：点击字母听发音，然后跟读</h4>
            <p>💡 提示：多听多练，熟能生巧！</p>
        `;
    } else if (lesson.words) {
        lesson.words.forEach(item => {
            const wordCard = document.createElement('div');
            wordCard.className = 'word-card';
            wordCard.innerHTML = `
                <span class="word">${item.word}</span>
                <span class="meaning">${item.meaning} (${item.phonetic})</span>
            `;
            wordCard.onclick = () => speak(item.word);
            wordExamplesContainer.appendChild(wordCard);
        });
        
        practiceContainer.innerHTML = `
            <h4>练习：听音拼写</h4>
            <p>💡 点击单词听发音，然后尝试拼写</p>
        `;
    }
    
    showPage('lessons');
    
    if (!userProgress.completedLessons.includes(day)) {
        userProgress.completedLessons.push(day);
        userProgress.score += 10;
        
        const today = new Date().toDateString();
        if (userProgress.lastStudyDate !== today) {
            userProgress.streakDays++;
            userProgress.lastStudyDate = today;
        }
        
        saveProgress();
    }
}

function startGame(gameType) {
    const gameArea = document.getElementById('game-area');
    gameArea.classList.remove('hidden');
    
    if (gameType === 'matching') {
        startMatchingGame();
    } else if (gameType === 'spelling') {
        startSpellingGame();
    } else if (gameType === 'quiz') {
        startQuizGame();
    }
}

function startMatchingGame() {
    const gameArea = document.getElementById('game-area');
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cards = [...letters, ...letters].sort(() => Math.random() - 0.5);
    
    let flippedCards = [];
    let matchedPairs = 0;
    
    gameArea.innerHTML = `
        <h3>🔤 字母配对游戏</h3>
        <p>找出相同的字母配对</p>
        <div class="matching-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 20px;"></div>
        <button onclick="resetGame()" style="margin-top: 20px; padding: 10px 20px; border-radius: 20px; border: none; background: #667eea; color: white; cursor: pointer;">重新开始</button>
    `;
    
    const grid = gameArea.querySelector('.matching-grid');
    
    cards.forEach((letter, index) => {
        const card = document.createElement('div');
        card.className = 'matching-card';
        card.style.cssText = `
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            font-size: 2em;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            min-height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        card.dataset.letter = letter;
        card.dataset.index = index;
        card.textContent = '?';
        
        card.onclick = () => {
            if (flippedCards.length < 2 && !card.classList.contains('matched')) {
                card.textContent = letter;
                card.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                card.style.color = 'white';
                flippedCards.push(card);
                
                if (flippedCards.length === 2) {
                    setTimeout(() => {
                        if (flippedCards[0].dataset.letter === flippedCards[1].dataset.letter) {
                            flippedCards.forEach(c => c.classList.add('matched'));
                            matchedPairs++;
                            speak('Correct!');
                            
                            if (matchedPairs === letters.length) {
                                userProgress.score += 20;
                                saveProgress();
                                setTimeout(() => {
                                    alert('🎉 恭喜完成！获得20分！');
                                    resetGame();
                                }, 500);
                            }
                        } else {
                            flippedCards.forEach(c => {
                                c.textContent = '?';
                                c.style.background = 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)';
                                c.style.color = '#333';
                            });
                        }
                        flippedCards = [];
                    }, 1000);
                }
            }
        };
        
        grid.appendChild(card);
    });
}

function startSpellingGame() {
    const gameArea = document.getElementById('game-area');
    const words = wordData.cvc.slice(0, 5);
    let currentWordIndex = 0;
    let score = 0;
    
    function showWord() {
        if (currentWordIndex >= words.length) {
            gameArea.innerHTML = `
                <h3>✏️ 拼写挑战完成！</h3>
                <p>你的得分：${score} / ${words.length}</p>
                <button onclick="resetGame()" style="margin-top: 20px; padding: 10px 20px; border-radius: 20px; border: none; background: #667eea; color: white; cursor: pointer;">再玩一次</button>
            `;
            userProgress.score += score * 5;
            saveProgress();
            return;
        }
        
        const word = words[currentWordIndex];
        gameArea.innerHTML = `
            <h3>✏️ 拼写挑战</h3>
            <p>第 ${currentWordIndex + 1} / ${words.length} 题</p>
            <button onclick="speak('${word.word}')" style="padding: 15px 30px; border-radius: 20px; border: none; background: #f093fb; color: white; cursor: pointer; font-size: 1.2em; margin: 20px 0;">🔊 听发音</button>
            <p>提示：${word.meaning}</p>
            <input type="text" id="spelling-input" placeholder="输入单词" style="padding: 10px; border: 2px solid #667eea; border-radius: 10px; font-size: 1.2em; width: 200px; margin: 10px 0;">
            <button onclick="checkSpelling('${word.word}')" style="padding: 10px 20px; border-radius: 20px; border: none; background: #667eea; color: white; cursor: pointer;">检查</button>
            <div id="spelling-result" style="margin-top: 20px; font-size: 1.2em;"></div>
        `;
    }
    
    window.checkSpelling = (correctWord) => {
        const input = document.getElementById('spelling-input');
        const result = document.getElementById('spelling-result');
        
        if (input.value.toLowerCase() === correctWord.toLowerCase()) {
            result.innerHTML = '<span style="color: green;">✅ 正确！</span>';
            score++;
            speak('Excellent!');
        } else {
            result.innerHTML = `<span style="color: red;">❌ 错误！正确答案是：${correctWord}</span>`;
            speak('Try again!');
        }
        
        setTimeout(() => {
            currentWordIndex++;
            showWord();
        }, 2000);
    };
    
    showWord();
}

function startQuizGame() {
    const gameArea = document.getElementById('game-area');
    const allLetters = [...alphabetData.vowels, ...alphabetData.consonants1, ...alphabetData.consonants2];
    let currentQuestionIndex = 0;
    let score = 0;
    
    function showQuestion() {
        if (currentQuestionIndex >= 5) {
            gameArea.innerHTML = `
                <h3>❓ 趣味问答完成！</h3>
                <p>你的得分：${score} / 5</p>
                <button onclick="resetGame()" style="margin-top: 20px; padding: 10px 20px; border-radius: 20px; border: none; background: #667eea; color: white; cursor: pointer;">再玩一次</button>
            `;
            userProgress.score += score * 5;
            saveProgress();
            return;
        }
        
        const letter = allLetters[Math.floor(Math.random() * allLetters.length)];
        const wrongOptions = allLetters
            .filter(l => l.letter !== letter.letter)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        
        const options = [letter, ...wrongOptions].sort(() => Math.random() - 0.5);
        
        gameArea.innerHTML = `
            <h3>❓ 趣味问答</h3>
            <p>第 ${currentQuestionIndex + 1} / 5 题</p>
            <button onclick="speak('${letter.letter}')" style="padding: 15px 30px; border-radius: 20px; border: none; background: #f093fb; color: white; cursor: pointer; font-size: 1.2em; margin: 20px 0;">🔊 听发音</button>
            <p>选择正确的字母：</p>
            <div class="quiz-options" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 20px;"></div>
            <div id="quiz-result" style="margin-top: 20px; font-size: 1.2em;"></div>
        `;
        
        const optionsContainer = gameArea.querySelector('.quiz-options');
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.textContent = option.letter;
            btn.style.cssText = `
                padding: 20px;
                border: none;
                border-radius: 10px;
                background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
                font-size: 1.5em;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            btn.onclick = () => {
                if (option.letter === letter.letter) {
                    score++;
                    document.getElementById('quiz-result').innerHTML = '<span style="color: green;">✅ 正确！</span>';
                    speak('Correct!');
                } else {
                    document.getElementById('quiz-result').innerHTML = `<span style="color: red;">❌ 错误！正确答案是：${letter.letter}</span>`;
                    speak('Wrong!');
                }
                
                setTimeout(() => {
                    currentQuestionIndex++;
                    showQuestion();
                }, 1500);
            };
            optionsContainer.appendChild(btn);
        });
    }
    
    showQuestion();
}

function resetGame() {
    document.getElementById('game-area').classList.add('hidden');
    document.getElementById('game-area').innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.onclick = () => {
            const page = btn.dataset.page;
            showPage(page);
        };
    });
    
    document.querySelectorAll('.day-card').forEach(card => {
        const day = parseInt(card.dataset.day);
        if (userProgress.completedLessons.includes(day)) {
            card.style.background = 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
            card.style.borderColor = '#667eea';
        }
    });
});
