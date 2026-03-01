const alphabetData = {
    vowels: [
        { letter: 'A', phonetic: '/æ/', word: 'apple' },
        { letter: 'E', phonetic: '/e/', word: 'egg' },
        { letter: 'I', phonetic: '/ɪ/', word: 'igloo' },
        { letter: 'O', phonetic: '/ɒ/', word: 'orange' },
        { letter: 'U', phonetic: '/ʌ/', word: 'umbrella' }
    ],
    consonants1: [
        { letter: 'B', phonetic: '/b/', word: 'ball' },
        { letter: 'C', phonetic: '/k/', word: 'cat' },
        { letter: 'D', phonetic: '/d/', word: 'dog' },
        { letter: 'F', phonetic: '/f/', word: 'fish' },
        { letter: 'G', phonetic: '/g/', word: 'goat' }
    ],
    consonants2: [
        { letter: 'H', phonetic: '/h/', word: 'hat' },
        { letter: 'J', phonetic: '/dʒ/', word: 'jam' },
        { letter: 'K', phonetic: '/k/', word: 'kite' },
        { letter: 'L', phonetic: '/l/', word: 'leg' },
        { letter: 'M', phonetic: '/m/', word: 'mouse' }
    ],
    consonants3: [
        { letter: 'N', phonetic: '/n/', word: 'nose' },
        { letter: 'P', phonetic: '/p/', word: 'pig' },
        { letter: 'Q', phonetic: '/kw/', word: 'queen' },
        { letter: 'R', phonetic: '/r/', word: 'rabbit' },
        { letter: 'S', phonetic: '/s/', word: 'sun' }
    ],
    consonants4: [
        { letter: 'T', phonetic: '/t/', word: 'tiger' },
        { letter: 'V', phonetic: '/v/', word: 'van' },
        { letter: 'W', phonetic: '/w/', word: 'whale' },
        { letter: 'X', phonetic: '/ks/', word: 'box' },
        { letter: 'Y', phonetic: '/j/', word: 'yellow' },
        { letter: 'Z', phonetic: '/z/', word: 'zip' }
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
        { id: 'master', icon: '👑', name: '拼读大师', condition: userProgress.completedLessons.length >= 7 },
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
        alphabetGrid.innerHTML = '<div class="phonics-notice">💡 在自然拼读中，这些字母的发音和平时念的字母表不同哦！<br>例如：A 发 /æ/，像 apple 开头的音；B 发 /b/，像 ball 开头的音</div>';
        
        lesson.letters.forEach(item => {
            const card = document.createElement('div');
            card.className = 'alphabet-card';
            card.innerHTML = `
                <div class="letter">${item.letter}</div>
                <div class="phonetic">${item.phonetic}</div>
                <div class="word">${item.word}</div>
            `;
            card.onclick = () => speak(item.word);
            alphabetGrid.appendChild(card);
        });
        
        wordExamplesContainer.innerHTML = '<p style="color: #666; font-size: 1.1em;">👆 点击卡片听发音</p>';
        
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

// 语音练习相关变量
let voicePracticeState = {
    mode: 'easy',
    currentIndex: 0,
    questions: [],
    coins: 0,
    streak: 0,
    recognition: null
};

// 初始化语音识别
function initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        voicePracticeState.recognition = new SpeechRecognition();
        voicePracticeState.recognition.lang = 'en-US';
        voicePracticeState.recognition.continuous = false;
        voicePracticeState.recognition.interimResults = false;
        
        voicePracticeState.recognition.onresult = function(event) {
            const spoken = event.results[0][0].transcript.toLowerCase().trim();
            handleVoiceResult(spoken);
        };
        
        voicePracticeState.recognition.onerror = function(event) {
            console.error('语音识别错误:', event.error);
            document.getElementById('voice-status').textContent = '识别失败，请再试一次';
            document.getElementById('mic-btn').classList.remove('listening');
        };
        
        voicePracticeState.recognition.onend = function() {
            document.getElementById('mic-btn').classList.remove('listening');
        };
    } else {
        alert('您的浏览器不支持语音识别功能，请使用Chrome浏览器');
    }
}

// 开始语音练习
function startVoicePractice(mode) {
    voicePracticeState.mode = mode;
    voicePracticeState.currentIndex = 0;
    voicePracticeState.coins = 0;
    voicePracticeState.streak = 0;
    
    // 生成题目
    if (mode === 'easy') {
        voicePracticeState.questions = [...alphabetData.vowels, ...alphabetData.consonants1, 
                                        ...alphabetData.consonants2, ...alphabetData.consonants3, 
                                        ...alphabetData.consonants4].map(item => ({
            type: 'letter',
            letter: item.letter,
            phonetic: item.phonetic,
            word: item.word,
            target: item.letter.toLowerCase()
        }));
    } else {
        voicePracticeState.questions = [...alphabetData.vowels, ...alphabetData.consonants1, 
                                        ...alphabetData.consonants2, ...alphabetData.consonants3, 
                                        ...alphabetData.consonants4].map(item => ({
            type: 'phonetic',
            letter: item.letter,
            phonetic: item.phonetic,
            word: item.word,
            target: item.word.toLowerCase()
        }));
    }
    
    // 随机打乱题目
    voicePracticeState.questions.sort(() => Math.random() - 0.5);
    
    // 只取前10题
    voicePracticeState.questions = voicePracticeState.questions.slice(0, 10);
    
    // 更新UI
    document.getElementById('practice-level').textContent = mode === 'easy' ? '简单模式' : '中等模式';
    document.getElementById('current-coins').textContent = voicePracticeState.coins;
    document.getElementById('streak-count').textContent = '0';
    
    // 显示第一题
    showCurrentQuestion();
    
    // 切换到语音练习页面
    showPage('voice-practice');
    
    // 初始化语音识别
    initSpeechRecognition();
}

// 显示当前题目
function showCurrentQuestion() {
    const question = voicePracticeState.questions[voicePracticeState.currentIndex];
    
    document.getElementById('target-letter').textContent = question.letter;
    document.getElementById('target-phonetic').textContent = question.phonetic;
    document.getElementById('target-word').textContent = question.word;
    document.getElementById('practice-progress').textContent = `${voicePracticeState.currentIndex + 1}/10`;
    
    // 重置反馈区域
    document.getElementById('feedback-section').classList.remove('show', 'correct', 'incorrect');
    document.getElementById('voice-status').textContent = '点击麦克风开始跟读';
    
    // 自动播放发音
    setTimeout(() => {
        playCurrentSound();
    }, 500);
}

// 播放当前发音
function playCurrentSound() {
    const question = voicePracticeState.questions[voicePracticeState.currentIndex];
    
    if (voicePracticeState.mode === 'easy') {
        speak(question.letter);
        setTimeout(() => speak(question.phonetic), 800);
        setTimeout(() => speak(question.word), 1600);
    } else {
        speak(question.phonetic);
        setTimeout(() => speak(question.word), 800);
    }
}

// 开始语音输入
function startVoiceInput() {
    if (!voicePracticeState.recognition) {
        alert('语音识别未初始化，请刷新页面重试');
        return;
    }
    
    document.getElementById('mic-btn').classList.add('listening');
    document.getElementById('voice-status').textContent = '正在听...请跟读';
    
    try {
        voicePracticeState.recognition.start();
    } catch (e) {
        voicePracticeState.recognition.stop();
        setTimeout(() => {
            voicePracticeState.recognition.start();
        }, 100);
    }
}

// 处理语音结果
function handleVoiceResult(spoken) {
    const question = voicePracticeState.questions[voicePracticeState.currentIndex];
    const feedbackSection = document.getElementById('feedback-section');
    const feedbackIcon = feedbackSection.querySelector('.feedback-icon');
    const feedbackText = feedbackSection.querySelector('.feedback-text');
    const accuracyFill = feedbackSection.querySelector('.accuracy-fill');
    
    // 计算准确度
    const accuracy = calculateAccuracy(spoken, question.target);
    
    feedbackSection.classList.add('show');
    accuracyFill.style.width = accuracy + '%';
    
    if (accuracy >= 80) {
        feedbackSection.classList.add('correct');
        feedbackIcon.textContent = '✅';
        feedbackText.textContent = '太棒了！发音正确！';
        
        let reward = 10;
        if (accuracy >= 90) reward += 5;
        
        voicePracticeState.streak++;
        if (voicePracticeState.streak >= 3) {
            reward += 20;
            feedbackText.textContent += ' 🔥 连对3题！额外+20金币！';
        }
        
        voicePracticeState.coins += reward;
        document.getElementById('current-coins').textContent = voicePracticeState.coins;
        document.getElementById('streak-count').textContent = voicePracticeState.streak;
        
        animateCoins(reward);
        speak('Excellent!');
        
        setTimeout(() => {
            nextQuestion();
        }, 2000);
    } else {
        feedbackSection.classList.add('incorrect');
        feedbackIcon.textContent = '❌';
        feedbackText.textContent = `你读的是: "${spoken}"，再试一次！`;
        
        voicePracticeState.streak = 0;
        document.getElementById('streak-count').textContent = '0';
        
        speak('Try again!');
    }
}

// 计算发音准确度
function calculateAccuracy(spoken, target) {
    const longer = spoken.length > target.length ? spoken : target;
    const shorter = spoken.length > target.length ? target : spoken;
    
    if (longer.length === 0) return 100;
    
    const costs = [];
    for (let i = 0; i <= shorter.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= longer.length; j++) {
            if (i === 0) {
                costs[j] = j;
            } else if (j > 0) {
                let newValue = costs[j - 1];
                if (shorter[i - 1] !== longer[j - 1]) {
                    newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                }
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        costs[longer.length] = lastValue;
    }
    
    const distance = costs[longer.length];
    const similarity = ((longer.length - distance) / longer.length) * 100;
    return Math.round(similarity);
}

// 金币动画
function animateCoins(amount) {
    const coinDisplay = document.querySelector('.coin-display');
    const rect = coinDisplay.getBoundingClientRect();
    
    for (let i = 0; i < Math.min(amount / 5, 5); i++) {
        setTimeout(() => {
            const coin = document.createElement('div');
            coin.className = 'coin-animation';
            coin.textContent = '🪙';
            coin.style.left = (rect.left + Math.random() * 50) + 'px';
            coin.style.top = (rect.top + 100) + 'px';
            document.body.appendChild(coin);
            
            setTimeout(() => {
                coin.remove();
            }, 1000);
        }, i * 100);
    }
}

// 下一题
function nextQuestion() {
    voicePracticeState.currentIndex++;
    
    if (voicePracticeState.currentIndex >= voicePracticeState.questions.length) {
        showCompletionModal();
    } else {
        showCurrentQuestion();
    }
}

// 显示完成弹窗
function showCompletionModal() {
    const modal = document.getElementById('completion-modal');
    const sessionCoins = document.getElementById('session-coins');
    const totalCoinsDisplay = document.getElementById('total-coins-display');
    const badgeEarned = document.getElementById('badge-earned');
    
    sessionCoins.textContent = voicePracticeState.coins;
    
    userProgress.score += voicePracticeState.coins;
    saveProgress();
    totalCoinsDisplay.textContent = userProgress.score;
    
    let badge = '';
    if (voicePracticeState.coins >= 150) {
        badge = '🏆 发音大师';
    } else if (voicePracticeState.coins >= 100) {
        badge = '🥇 发音高手';
    } else if (voicePracticeState.coins >= 50) {
        badge = '🥈 发音达人';
    } else {
        badge = '🥉 发音新手';
    }
    badgeEarned.textContent = `获得徽章：${badge}`;
    
    modal.classList.remove('hidden');
    
    createConfetti();
    speak('Congratulations! You did a great job!');
}

// 创建彩带效果
function createConfetti() {
    const container = document.querySelector('.confetti-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// 重新开始语音练习
function restartVoicePractice() {
    document.getElementById('completion-modal').classList.add('hidden');
    startVoicePractice(voicePracticeState.mode);
}

// 语音练习相关变量
let voicePracticeState = {
    mode: 'easy',
    currentIndex: 0,
    questions: [],
    coins: 0,
    streak: 0,
    recognition: null
};

// 初始化语音识别
function initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        voicePracticeState.recognition = new SpeechRecognition();
        voicePracticeState.recognition.lang = 'en-US';
        voicePracticeState.recognition.continuous = false;
        voicePracticeState.recognition.interimResults = false;
        
        voicePracticeState.recognition.onresult = function(event) {
            const spoken = event.results[0][0].transcript.toLowerCase().trim();
            handleVoiceResult(spoken);
        };
        
        voicePracticeState.recognition.onerror = function(event) {
            console.error('语音识别错误:', event.error);
            document.getElementById('voice-status').textContent = '识别失败，请再试一次';
            document.getElementById('mic-btn').classList.remove('listening');
        };
        
        voicePracticeState.recognition.onend = function() {
            document.getElementById('mic-btn').classList.remove('listening');
        };
    } else {
        alert('您的浏览器不支持语音识别功能，请使用Chrome浏览器');
    }
}

// 开始语音练习
function startVoicePractice(mode) {
    voicePracticeState.mode = mode;
    voicePracticeState.currentIndex = 0;
    voicePracticeState.coins = 0;
    voicePracticeState.streak = 0;
    
    // 生成题目
    if (mode === 'easy') {
        voicePracticeState.questions = [...alphabetData.vowels, ...alphabetData.consonants1, 
                                        ...alphabetData.consonants2, ...alphabetData.consonants3, 
                                        ...alphabetData.consonants4].map(item => ({
            type: 'letter',
            letter: item.letter,
            phonetic: item.phonetic,
            word: item.word,
            target: item.letter.toLowerCase()
        }));
    } else {
        voicePracticeState.questions = [...alphabetData.vowels, ...alphabetData.consonants1, 
                                        ...alphabetData.consonants2, ...alphabetData.consonants3, 
                                        ...alphabetData.consonants4].map(item => ({
            type: 'phonetic',
            letter: item.letter,
            phonetic: item.phonetic,
            word: item.word,
            target: item.word.toLowerCase()
        }));
    }
    
    // 随机打乱题目
    voicePracticeState.questions.sort(() => Math.random() - 0.5);
    
    // 只取前10题
    voicePracticeState.questions = voicePracticeState.questions.slice(0, 10);
    
    // 更新UI
    document.getElementById('practice-level').textContent = mode === 'easy' ? '简单模式' : '中等模式';
    document.getElementById('current-coins').textContent = voicePracticeState.coins;
    document.getElementById('streak-count').textContent = '0';
    
    // 显示第一题
    showCurrentQuestion();
    
    // 切换到语音练习页面
    showPage('voice-practice');
    
    // 初始化语音识别
    initSpeechRecognition();
}

// 显示当前题目
function showCurrentQuestion() {
    const question = voicePracticeState.questions[voicePracticeState.currentIndex];
    
    document.getElementById('target-letter').textContent = question.letter;
    document.getElementById('target-phonetic').textContent = question.phonetic;
    document.getElementById('target-word').textContent = question.word;
    document.getElementById('practice-progress').textContent = `${voicePracticeState.currentIndex + 1}/10`;
    
    // 重置反馈区域
    document.getElementById('feedback-section').classList.remove('show', 'correct', 'incorrect');
    document.getElementById('voice-status').textContent = '点击麦克风开始跟读';
    
    // 自动播放发音
    setTimeout(() => {
        playCurrentSound();
    }, 500);
}

// 播放当前发音
function playCurrentSound() {
    const question = voicePracticeState.questions[voicePracticeState.currentIndex];
    
    if (voicePracticeState.mode === 'easy') {
        speak(question.letter);
        setTimeout(() => speak(question.phonetic), 800);
        setTimeout(() => speak(question.word), 1600);
    } else {
        speak(question.phonetic);
        setTimeout(() => speak(question.word), 800);
    }
}

// 开始语音输入
function startVoiceInput() {
    if (!voicePracticeState.recognition) {
        alert('语音识别未初始化，请刷新页面重试');
        return;
    }
    
    document.getElementById('mic-btn').classList.add('listening');
    document.getElementById('voice-status').textContent = '正在听...请跟读';
    
    try {
        voicePracticeState.recognition.start();
    } catch (e) {
        voicePracticeState.recognition.stop();
        setTimeout(() => {
            voicePracticeState.recognition.start();
        }, 100);
    }
}

// 处理语音结果
function handleVoiceResult(spoken) {
    const question = voicePracticeState.questions[voicePracticeState.currentIndex];
    const feedbackSection = document.getElementById('feedback-section');
    const feedbackIcon = feedbackSection.querySelector('.feedback-icon');
    const feedbackText = feedbackSection.querySelector('.feedback-text');
    const accuracyFill = feedbackSection.querySelector('.accuracy-fill');
    
    // 计算准确度
    const accuracy = calculateAccuracy(spoken, question.target);
    
    feedbackSection.classList.add('show');
    accuracyFill.style.width = accuracy + '%';
    
    if (accuracy >= 80) {
        // 正确
        feedbackSection.classList.add('correct');
        feedbackIcon.textContent = '✅';
        feedbackText.textContent = '太棒了！发音正确！';
        
        // 增加金币
        let reward = 10;
        if (accuracy >= 90) reward += 5;
        
        voicePracticeState.streak++;
        if (voicePracticeState.streak >= 3) {
            reward += 20;
            feedbackText.textContent += ' 🔥 连对3题！额外+20金币！';
        }
        
        voicePracticeState.coins += reward;
        document.getElementById('current-coins').textContent = voicePracticeState.coins;
        document.getElementById('streak-count').textContent = voicePracticeState.streak;
        
        // 金币动画
        animateCoins(reward);
        
        // 播放鼓励语音
        speak('Excellent!');
        
        // 下一题
        setTimeout(() => {
            nextQuestion();
        }, 2000);
    } else {
        // 错误
        feedbackSection.classList.add('incorrect');
        feedbackIcon.textContent = '❌';
        feedbackText.textContent = `你读的是: "${spoken}"，再试一次！`;
        
        voicePracticeState.streak = 0;
        document.getElementById('streak-count').textContent = '0';
        
        speak('Try again!');
    }
}

// 计算发音准确度
function calculateAccuracy(spoken, target) {
    const longer = spoken.length > target.length ? spoken : target;
    const shorter = spoken.length > target.length ? target : spoken;
    
    if (longer.length === 0) return 100;
    
    const costs = [];
    for (let i = 0; i <= shorter.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= longer.length; j++) {
            if (i === 0) {
                costs[j] = j;
            } else if (j > 0) {
                let newValue = costs[j - 1];
                if (shorter[i - 1] !== longer[j - 1]) {
                    newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                }
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        costs[longer.length] = lastValue;
    }
    
    const distance = costs[longer.length];
    const similarity = ((longer.length - distance) / longer.length) * 100;
    return Math.round(similarity);
}

// 金币动画
function animateCoins(amount) {
    const coinDisplay = document.querySelector('.coin-display');
    const rect = coinDisplay.getBoundingClientRect();
    
    for (let i = 0; i < Math.min(amount / 5, 5); i++) {
        setTimeout(() => {
            const coin = document.createElement('div');
            coin.className = 'coin-animation';
            coin.textContent = '🪙';
            coin.style.left = (rect.left + Math.random() * 50) + 'px';
            coin.style.top = (rect.top + 100) + 'px';
            document.body.appendChild(coin);
            
            setTimeout(() => {
                coin.remove();
            }, 1000);
        }, i * 100);
    }
}

// 下一题
function nextQuestion() {
    voicePracticeState.currentIndex++;
    
    if (voicePracticeState.currentIndex >= voicePracticeState.questions.length) {
        showCompletionModal();
    } else {
        showCurrentQuestion();
    }
}

// 显示完成弹窗
function showCompletionModal() {
    const modal = document.getElementById('completion-modal');
    const sessionCoins = document.getElementById('session-coins');
    const totalCoinsDisplay = document.getElementById('total-coins-display');
    const badgeEarned = document.getElementById('badge-earned');
    
    sessionCoins.textContent = voicePracticeState.coins;
    
    userProgress.score += voicePracticeState.coins;
    saveProgress();
    totalCoinsDisplay.textContent = userProgress.score;
    
    let badge = '';
    if (voicePracticeState.coins >= 150) {
        badge = '🏆 发音大师';
    } else if (voicePracticeState.coins >= 100) {
        badge = '🥇 发音高手';
    } else if (voicePracticeState.coins >= 50) {
        badge = '🥈 发音达人';
    } else {
        badge = '🥉 发音新手';
    }
    badgeEarned.textContent = `获得徽章：${badge}`;
    
    modal.classList.remove('hidden');
    
    createConfetti();
    
    speak('Congratulations! You did a great job!');
}

// 创建彩带效果
function createConfetti() {
    const container = document.querySelector('.confetti-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// 重新开始语音练习
function restartVoicePractice() {
    document.getElementById('completion-modal').classList.add('hidden');
    startVoicePractice(voicePracticeState.mode);
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
