// ========================================
// activities.js - جميع الأنشطة التعليمية
// ========================================

// ==========================================
// دالة تحويل الأرقام الإنجليزية إلى العربية
// ==========================================
function toArabicNumerals(num) {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num).replace(/[0-9]/g, (d) => arabicNumerals[parseInt(d, 10)]);
}

// ==========================================
// 1. الأنشطة العربية - Arabic Activities
// ==========================================

function initArabicActivitiesMenu() {
    const container = document.getElementById('activity-content');
    container.innerHTML = `
        <div class="activity-menu">
            <h2 class="activity-title">🌟 الأنشطة العربية</h2>
            <div class="submenu-grid">
                <button class="submenu-card" onclick="showAlphabetDisplay()">
                    <div class="submenu-icon">🔤</div>
                    <div class="submenu-title">حروف الأبجدية</div>
                    <div class="submenu-desc">تعلم الحروف العربية</div>
                </button>
                <button class="submenu-card" onclick="showWordFormation()">
                    <div class="submenu-icon">✍️</div>
                    <div class="submenu-title">تكوين الكلمات</div>
                    <div class="submenu-desc">اصنع كلمات من الحروف</div>
                </button>
            </div>
            <button class="back-button" onclick="showMainMenu()">
                ↩️ العودة للقائمة الرئيسية
            </button>
        </div>
    `;
}

// عرض الأبجدية العربية
function showAlphabetDisplay() {
    const arabicLetters = [
        { letter: 'أ', emoji: '🦁', word: 'أسد' },
        { letter: 'ب', emoji: '🦆', word: 'بطة' },
        { letter: 'ت', emoji: '🍎', word: 'تفاح' },
        { letter: 'ث', emoji: '🦊', word: 'ثعلب' },
        { letter: 'ج', emoji: '🐪', word: 'جمل' },
        { letter: 'ح', emoji: '🐴', word: 'حصان' },
        { letter: 'خ', emoji: '🥒', word: 'خيار' },
        { letter: 'د', emoji: '🐻', word: 'دب' },
        { letter: 'ذ', emoji: '🐺', word: 'ذئب' },
        { letter: 'ر', emoji: '🪶', word: 'ريشة' },
        { letter: 'ز', emoji: '🦒', word: 'زرافة' },
        { letter: 'س', emoji: '🐟', word: 'سمكة' },
        { letter: 'ش', emoji: '☀️', word: 'شمس' },
        { letter: 'ص', emoji: '🚀', word: 'صاروخ' },
        { letter: 'ض', emoji: '🐸', word: 'ضفدع' },
        { letter: 'ط', emoji: '✈️', word: 'طائر' },
        { letter: 'ظ', emoji: '💅', word: 'ظفر' },
        { letter: 'ع', emoji: '🍯', word: 'عسل' },
        { letter: 'غ', emoji: '☁️', word: 'غيمة' },
        { letter: 'ف', emoji: '🐘', word: 'فيل' },
        { letter: 'ق', emoji: '🐵', word: 'قرد' },
        { letter: 'ك', emoji: '🐶', word: 'كلب' },
        { letter: 'ل', emoji: '🍋', word: 'ليمون' },
        { letter: 'م', emoji: '🍯', word: 'مربى' },
        { letter: 'ن', emoji: '⭐', word: 'نجمة' },
        { letter: 'ه', emoji: '🎁', word: 'هدية' },
        { letter: 'و', emoji: '🌹', word: 'وردة' },
        { letter: 'ي', emoji: '🦋', word: 'يرقة' }
    ];

    const container = document.getElementById('activity-content');
    
    const lettersHTML = arabicLetters.map(item => `
        <div class="letter-card" onclick="speakLetter('${item.letter}', '${item.word}')">
            <div class="letter-emoji">${item.emoji}</div>
            <div class="letter-main">${item.letter}</div>
            <div class="letter-word">${item.word}</div>
        </div>
    `).join('');
    
    container.innerHTML = `
        <div class="alphabet-display">
            <h2 class="activity-title">🔤 الحروف الأبجدية</h2>
            
            <div class="alphabet-grid">
                ${lettersHTML}
            </div>

            <button class="back-button" onclick="initArabicActivitiesMenu()">
                ↩️ العودة
            </button>
        </div>
    `;
    
    window.speakLetter = function(letter, word) {
        playSound('click');
        // تشغيل صوت الحرف من ملفات MP3
        playLetterSound(letter);
    };
}

// تكوين الكلمات
function showWordFormation() {
    const words = {
        easy: [
            { word: 'بيت', letters: ['ب', 'ي', 'ت'], hint: '🏠' },
            { word: 'قطة', letters: ['ق', 'ط', 'ة'], hint: '🐱' },
            { word: 'كتاب', letters: ['ك', 'ت', 'ا', 'ب'], hint: '📖' },
            { word: 'شمس', letters: ['ش', 'م', 'س'], hint: '☀️' },
            { word: 'قمر', letters: ['ق', 'م', 'ر'], hint: '🌙' }
        ],
        medium: [
            { word: 'مدرسة', letters: ['م', 'د', 'ر', 'س', 'ة'], hint: '🏫' },
            { word: 'حديقة', letters: ['ح', 'د', 'ي', 'ق', 'ة'], hint: '🌳' },
            { word: 'طائرة', letters: ['ط', 'ا', 'ئ', 'ر', 'ة'], hint: '✈️' },
            { word: 'فراولة', letters: ['ف', 'ر', 'ا', 'و', 'ل', 'ة'], hint: '🍓' }
        ],
        hard: [
            { word: 'مستشفى', letters: ['م', 'س', 'ت', 'ش', 'ف', 'ى'], hint: '🏥' },
            { word: 'حاسوب', letters: ['ح', 'ا', 'س', 'و', 'ب'], hint: '💻' },
            { word: 'تلفزيون', letters: ['ت', 'ل', 'ف', 'ز', 'ي', 'و', 'ن'], hint: '📺' }
        ]
    };

    let currentLevel = 'easy';
    let currentWordIndex = 0;
    let selectedLetters = [];
    let score = 0;

    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    function render() {
        const levelWords = words[currentLevel];
        const currentWord = levelWords[currentWordIndex];
        const shuffledLetters = shuffleArray([...currentWord.letters, ...getRandomDistractionLetters(3)]);

        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="word-formation-game">
                <h2 class="activity-title">✍️ تكوين الكلمات</h2>
                
                <div class="game-header">
                    <div class="level-selector">
                        <button class="level-btn ${currentLevel === 'easy' ? 'active' : ''}" 
                                onclick="changeWordLevel('easy')">سهل</button>
                        <button class="level-btn ${currentLevel === 'medium' ? 'active' : ''}" 
                                onclick="changeWordLevel('medium')">متوسط</button>
                        <button class="level-btn ${currentLevel === 'hard' ? 'active' : ''}" 
                                onclick="changeWordLevel('hard')">صعب</button>
                    </div>
                    <div class="score-display">النقاط: ${score}</div>
                </div>

                <div class="word-hint">${currentWord.hint}</div>
                
                <div class="word-builder">
                    ${selectedLetters.map((letter, idx) => `
                        <div class="letter-slot filled" onclick="removeLetter(${idx})">
                            ${letter}
                        </div>
                    `).join('')}
                    ${Array(currentWord.letters.length - selectedLetters.length).fill(0).map(() => `
                        <div class="letter-slot empty">؟</div>
                    `).join('')}
                </div>

                <div class="available-letters">
                    ${shuffledLetters.map((letter, idx) => `
                        <button class="letter-btn ${selectedLetters.includes(letter) ? 'used' : ''}" 
                                onclick="selectLetter('${letter}', ${idx})"
                                ${selectedLetters.includes(letter) ? 'disabled' : ''}>
                            ${letter}
                        </button>
                    `).join('')}
                </div>

                <div class="action-buttons">
                    <button class="action-btn check-btn" onclick="checkWord()">
                        ✓ تحقق
                    </button>
                    <button class="action-btn reset-btn" onclick="resetWord()">
                        🔄 إعادة
                    </button>
                </div>

                <button class="back-button" onclick="initArabicActivitiesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    function getRandomDistractionLetters(count) {
        const allLetters = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'];
        const currentWord = words[currentLevel][currentWordIndex];
        const available = allLetters.filter(l => !currentWord.letters.includes(l));
        const result = [];
        for (let i = 0; i < count && available.length > 0; i++) {
            const idx = Math.floor(Math.random() * available.length);
            result.push(available[idx]);
            available.splice(idx, 1);
        }
        return result;
    }

    window.changeWordLevel = function(level) {
        currentLevel = level;
        currentWordIndex = 0;
        selectedLetters = [];
        score = 0;
        playSound('click');
        render();
    };

    window.selectLetter = function(letter, idx) {
        const currentWord = words[currentLevel][currentWordIndex];
        if (selectedLetters.length < currentWord.letters.length) {
            selectedLetters.push(letter);
            playSound('click');
            render();
        }
    };

    window.removeLetter = function(idx) {
        selectedLetters.splice(idx, 1);
        playSound('click');
        render();
    };

    window.resetWord = function() {
        selectedLetters = [];
        playSound('click');
        render();
    };

    window.checkWord = function() {
        const currentWord = words[currentLevel][currentWordIndex];
        const builtWord = selectedLetters.join('');
        
        if (builtWord === currentWord.word) {
            playSuccessSound();
            showConfetti();
            score += 10;
            
            // 🌟 إضافة نقاط عند كل كلمة صحيحة
            addStars(2);
            
            // 📊 تحديث التحدي اليومي
            updateDailyChallenge('words');
            
            setTimeout(() => {
                currentWordIndex++;
                if (currentWordIndex >= words[currentLevel].length) {
                    showCompletionModal('تكوين الكلمات', score);
                    currentWordIndex = 0;
                    score = 0;
                }
                selectedLetters = [];
                render();
            }, 1500);
        } else {
            playFailSound();
            const container = document.querySelector('.word-builder');
            container.classList.add('shake');
            setTimeout(() => container.classList.remove('shake'), 500);
        }
    };

    render();
}

// ==========================================
// 2. أنشطة الرياضيات - Math Activities
// ==========================================

function initMathActivitiesMenu() {
    const container = document.getElementById('activity-content');
    container.innerHTML = `
        <div class="activity-menu">
            <h2 class="activity-title">🔢 أنشطة الرياضيات</h2>
            <div class="submenu-grid">
                <button class="submenu-card" onclick="showCountingActivity()">
                    <div class="submenu-icon">🔢</div>
                    <div class="submenu-title">العد</div>
                    <div class="submenu-desc">تعلم الأرقام من ١-١٠</div>
                </button>
                <button class="submenu-card" onclick="showShapeRecognition()">
                    <div class="submenu-icon">⭐</div>
                    <div class="submenu-title">الأشكال</div>
                    <div class="submenu-desc">تعرف على الأشكال</div>
                </button>
                <button class="submenu-card" onclick="showAdditionSubtraction()">
                    <div class="submenu-icon">➕</div>
                    <div class="submenu-title">الجمع والطرح</div>
                    <div class="submenu-desc">حل المسائل</div>
                </button>
                <button class="submenu-card" onclick="showComparisonActivity()">
                    <div class="submenu-icon">⚖️</div>
                    <div class="submenu-title">المقارنة</div>
                    <div class="submenu-desc">أكبر، أصغر، يساوي</div>
                </button>
                <button class="submenu-card" onclick="showOrderingActivity()">
                    <div class="submenu-icon">📊</div>
                    <div class="submenu-title">الترتيب</div>
                    <div class="submenu-desc">رتب الأرقام</div>
                </button>
            </div>
            <button class="back-button" onclick="showMainMenu()">
                ↩️ العودة للقائمة الرئيسية
            </button>
        </div>
    `;
}

// نشاط العد
function showCountingActivity() {
    const numbers = [
        { number: 1, emoji: '🍎', arabicName: 'واحد' },
        { number: 2, emoji: '🍎', arabicName: 'اثنان' },
        { number: 3, emoji: '⭐', arabicName: 'ثلاثة' },
        { number: 4, emoji: '🎈', arabicName: 'أربعة' },
        { number: 5, emoji: '🌟', arabicName: 'خمسة' },
        { number: 6, emoji: '🎁', arabicName: 'ستة' },
        { number: 7, emoji: '🎨', arabicName: 'سبعة' },
        { number: 8, emoji: '🎵', arabicName: 'ثمانية' },
        { number: 9, emoji: '🌸', arabicName: 'تسعة' },
        { number: 10, emoji: '🎉', arabicName: 'عشرة' }
    ];

    let currentIndex = 0;

    function render() {
        const current = numbers[currentIndex];
        const emojiArray = Array(current.number).fill(current.emoji);
        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="counting-activity">
                <h2 class="activity-title">🔢 نشاط العد</h2>
                
                <div class="counting-display">
                    <div class="counting-number">${toArabicNumerals(current.number)}</div>
                    <div class="counting-word">${current.arabicName}</div>
                    <div class="counting-items">
                        ${emojiArray.map((emoji, idx) => `
                            <span class="counting-item" style="animation-delay: ${idx * 0.1}s">${emoji}</span>
                        `).join('')}
                    </div>
                </div>

                <div class="navigation-buttons">
                    <button class="nav-btn" onclick="navigateCounting('prev')" 
                            ${currentIndex === 0 ? 'disabled' : ''}>
                        ⏮️ السابق
                    </button>
                    <button class="nav-btn" onclick="speakNumber(${current.number}, '${current.arabicName}')">
                        🔊 استمع
                    </button>
                    <button class="nav-btn" onclick="navigateCounting('next')"
                            ${currentIndex === numbers.length - 1 ? 'disabled' : ''}>
                        التالي ⏭️
                    </button>
                </div>

                <button class="back-button" onclick="initMathActivitiesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    window.navigateCounting = function(direction) {
        if (direction === 'next' && currentIndex < numbers.length - 1) {
            currentIndex++;
            playSound('click');
        } else if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
            playSound('click');
        }
        render();
    };

    window.speakNumber = function(number, name) {
        playSound('click');
        // تشغيل صوت الرقم من ملفات MP3
        playNumberSound(number);
    };

    render();
}

// التعرف على الأشكال
function showShapeRecognition() {
    const shapes = [
        { name: 'دائرة', emoji: '🔵', color: '#3B82F6', path: 'circle' },
        { name: 'مربع', emoji: '🟦', color: '#10B981', path: 'square' },
        { name: 'مثلث', emoji: '🔺', color: '#F59E0B', path: 'triangle' },
        { name: 'مستطيل', emoji: '🟩', color: '#8B5CF6', path: 'rectangle' },
        { name: 'نجمة', emoji: '⭐', color: '#F59E0B', path: 'star' },
        { name: 'قلب', emoji: '❤️', color: '#EF4444', path: 'heart' },
        { name: 'بيضاوي', emoji: '🥚', color: '#EC4899', path: 'oval' }
    ];

    let currentShapeIndex = 0;
    let score = 0;
    let gameMode = 'learn'; // 'learn' or 'quiz'

    function render() {
        const container = document.getElementById('activity-content');
        
        if (gameMode === 'learn') {
            container.innerHTML = `
                <div class="math-activity">
                    <h2 class="activity-title">⭐ الأشكال الهندسية</h2>
                    
                    <div class="shapes-grid">
                        ${shapes.map(shape => `
                            <div class="shape-card" onclick="speakShape('${shape.name}')">
                                <div class="shape-emoji">${shape.emoji}</div>
                                <div class="shape-name">${shape.name}</div>
                            </div>
                        `).join('')}
                    </div>

                    <button class="action-btn" onclick="startShapeQuiz()" style="margin: 30px auto; display: block;">
                        🎯 ابدأ الاختبار
                    </button>

                    <button class="back-button" onclick="initMathActivitiesMenu()">
                        ↩️ العودة
                    </button>
                </div>
            `;
        } else {
            renderShapeQuiz();
        }
    }

    function renderShapeQuiz() {
        const correctShape = shapes[Math.floor(Math.random() * shapes.length)];
        const options = [correctShape];
        
        while (options.length < 3) {
            const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
            if (!options.find(s => s.name === randomShape.name)) {
                options.push(randomShape);
            }
        }
        
        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="shape-quiz">
                <h2 class="activity-title">🎯 اختبار الأشكال</h2>
                <div class="score-display">النقاط: ${toArabicNumerals(score)}</div>
                
                <div class="quiz-question">
                    <p>اختر الشكل:</p>
                    <h3>${correctShape.name}</h3>
                </div>

                <div class="shape-options">
                    ${options.map(shape => `
                        <button class="shape-option" onclick="checkShapeAnswer('${shape.name}', '${correctShape.name}')">
                            <div>${shape.emoji}</div>
                        </button>
                    `).join('')}
                </div>

                <button class="back-button" onclick="exitShapeQuiz()">
                    ↩️ العودة للتعلم
                </button>
            </div>
        `;
    }

    window.navigateShape = function(direction) {
        if (direction === 'next' && currentShapeIndex < shapes.length - 1) {
            currentShapeIndex++;
            playSound('click');
        } else if (direction === 'prev' && currentShapeIndex > 0) {
            currentShapeIndex--;
            playSound('click');
        }
        render();
    };

    window.speakShape = function(shapeName) {
        playSound('click');
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(shapeName);
            utterance.lang = 'ar-SA';
            window.speechSynthesis.speak(utterance);
        }
    };

    window.startShapeQuiz = function() {
        gameMode = 'quiz';
        score = 0;
        playSound('click');
        render();
    };

    window.exitShapeQuiz = function() {
        gameMode = 'learn';
        playSound('click');
        render();
    };

    window.checkShapeAnswer = function(selected, correct) {
        const buttons = document.querySelectorAll('.shape-option');
        
        if (selected === correct) {
            playSuccessSound();
            showConfetti();
            score += 10;
            
            // 🌟 إضافة نقاط عند كل إجابة صحيحة
            addStars(1);
            
            // 📊 كل 5 إجابات صحيحة تحسب كنشاط مكتمل
            if (score > 0 && score % 50 === 0) {
                updateDailyChallenge('activities', 1);
            }
            
            // إضاءة الإجابة الصحيحة
            buttons.forEach(btn => {
                const shapeName = btn.onclick.toString().match(/'([^']+)'/)?.[1];
                if (shapeName === correct) {
                    btn.classList.add('correct');
                }
                btn.style.pointerEvents = 'none';
            });
            
            setTimeout(() => renderShapeQuiz(), 1200);
        } else {
            playFailSound();
            
            // إضاءة الإجابة الخاطئة والصحيحة
            buttons.forEach(btn => {
                const shapeName = btn.onclick.toString().match(/'([^']+)'/)?.[1];
                if (shapeName === selected) {
                    btn.classList.add('wrong');
                } else if (shapeName === correct) {
                    btn.classList.add('correct');
                }
                btn.style.pointerEvents = 'none';
            });
            
            setTimeout(() => renderShapeQuiz(), 1500);
        }
    };

    render();
}

// الجمع والطرح - محسّن
function showAdditionSubtraction() {
    let currentLevel = 'easy';
    let score = 0;
    let currentProblem = null;
    let currentQuestion = 1;
    let showHelp = false;
    const questionsPerLevel = 5;
    const visualItems = ['🍎', '⭐', '🎈', '🍓', '🌟', '🎁'];
    const selectedItem = visualItems[Math.floor(Math.random() * visualItems.length)];

    function generateProblem() {
        let num1, num2, operation, answer;
        
        if (currentLevel === 'easy') {
            num1 = Math.floor(Math.random() * 5) + 1;
            num2 = Math.floor(Math.random() * 5) + 1;
            operation = '+';
            answer = num1 + num2;
        } else if (currentLevel === 'medium') {
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            operation = Math.random() > 0.5 ? '+' : '-';
            if (operation === '-' && num2 > num1) {
                [num1, num2] = [num2, num1];
            }
            answer = operation === '+' ? num1 + num2 : num1 - num2;
        } else {
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;
            operation = Math.random() > 0.5 ? '+' : '-';
            if (operation === '-' && num2 > num1) {
                [num1, num2] = [num2, num1];
            }
            answer = operation === '+' ? num1 + num2 : num1 - num2;
        }

        return { num1, num2, operation, answer };
    }

    function renderVisualHelper() {
        if (currentLevel !== 'easy' || !currentProblem || currentProblem.num1 > 10 || currentProblem.num2 > 10) {
            return '';
        }
        
        const items1 = selectedItem.repeat(currentProblem.num1);
        const items2 = selectedItem.repeat(currentProblem.num2);
        const operationEmoji = currentProblem.operation === '+' ? '➕' : '➖';
        
        return `
            <div class="visual-helper">
                <div class="visual-helper-title">
                    ${currentProblem.operation === '+' ? '🧮 اجمع العناصر معاً!' : '🧮 احذف العناصر!'}
                </div>
                <div class="visual-items-row">${items1}</div>
                <div class="visual-operation">${operationEmoji}</div>
                <div class="visual-items-row">${items2}</div>
            </div>
        `;
    }

    function render() {
        currentProblem = generateProblem();
        
        // Generate 4 answer options
        const wrongAnswers = [];
        while (wrongAnswers.length < 3) {
            const offset = Math.floor(Math.random() * 7) - 3;
            const wrongAns = currentProblem.answer + offset;
            if (wrongAns >= 0 && wrongAns !== currentProblem.answer && !wrongAnswers.includes(wrongAns)) {
                wrongAnswers.push(wrongAns);
            }
        }
        
        const answers = [currentProblem.answer, ...wrongAnswers].sort(() => Math.random() - 0.5);
        const progress = (currentQuestion / questionsPerLevel) * 100;

        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="math-activity-enhanced">
                <h2 class="activity-title">➕➖ الجمع والطرح المحسّن</h2>
                
                <div class="level-selector">
                    <button class="level-btn ${currentLevel === 'easy' ? 'active' : ''}" 
                            onclick="changeMathLevel('easy')">
                        <span class="level-emoji">😊</span>
                        <span>سهل</span>
                    </button>
                    <button class="level-btn ${currentLevel === 'medium' ? 'active' : ''}" 
                            onclick="changeMathLevel('medium')">
                        <span class="level-emoji">🤔</span>
                        <span>متوسط</span>
                    </button>
                    <button class="level-btn ${currentLevel === 'hard' ? 'active' : ''}" 
                            onclick="changeMathLevel('hard')">
                        <span class="level-emoji">🧠</span>
                        <span>صعب</span>
                    </button>
                </div>

                <!-- Progress Bar -->
                <div class="progress-container">
                    <div class="progress-info">
                        <div class="progress-text">
                            <span>🎯</span>
                            <span>السؤال ${toArabicNumerals(currentQuestion)}/${toArabicNumerals(questionsPerLevel)}</span>
                        </div>
                        <div class="score-badge">
                            <span>⭐</span>
                            <span>${toArabicNumerals(score)}</span>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>

                <div class="math-problem-card-enhanced" id="problemCard">
                    <div class="problem-display">
                        <div class="math-problem-big">
                            <span class="number">${toArabicNumerals(currentProblem.num1)}</span>
                            <span class="operation-emoji">${currentProblem.operation === '+' ? '➕' : '➖'}</span>
                            <span class="number">${toArabicNumerals(currentProblem.num2)}</span>
                            <span class="equals">=</span>
                            <span class="question-mark">؟</span>
                        </div>
                    </div>

                    <button class="help-button" onclick="toggleMathHelp()">
                        💡 ${showHelp ? 'إخفاء المساعدة' : 'مساعدة'}
                    </button>

                    ${showHelp ? renderVisualHelper() : ''}
                </div>

                <div class="math-options-grid">
                    ${answers.map((ans, idx) => {
                        const colors = [
                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                        ];
                        return `
                            <button class="math-option-enhanced" 
                                    onclick="checkMathAnswer(${ans})"
                                    style="background: ${colors[idx % 4]};">
                                ${toArabicNumerals(ans)}
                            </button>
                        `;
                    }).join('')}
                </div>

                <button class="back-button" onclick="initMathActivitiesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    window.changeMathLevel = function(level) {
        currentLevel = level;
        score = 0;
        currentQuestion = 1;
        showHelp = false;
        playSound('click');
        render();
    };

    window.toggleMathHelp = function() {
        showHelp = !showHelp;
        playSound('click');
        render();
    };

    window.checkMathAnswer = function(answer) {
        const buttons = document.querySelectorAll('.math-option-enhanced');
        buttons.forEach(btn => btn.disabled = true);
        
        if (answer === currentProblem.answer) {
            playSuccessSound();
            showConfetti();
            score += 10;
            
            // 🌟 إضافة النقاط إلى اللاعب
            addStars(2);
            
            const card = document.getElementById('problemCard');
            card.style.background = 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)';
            card.style.transform = 'scale(1.05)';
            
            if (currentQuestion >= questionsPerLevel) {
                // Level completed!
                // 🎁 منح نقاط إضافية عند إكمال المستوى
                addStars(10);
                
                // 📊 تحديث التحدي اليومي
                updateDailyChallenge('activities');
                
                // 🎯 فتح ملصق عشوائي إذا كانت النتيجة ممتازة
                if (score >= 40) { // 4 إجابات صحيحة على الأقل من 5
                    const allStickerIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
                    const unlockedIds = gameState.unlockedStickers || [];
                    const availableStickers = allStickerIds.filter(id => !unlockedIds.includes(id));
                    
                    if (availableStickers.length > 0) {
                        const randomSticker = availableStickers[Math.floor(Math.random() * availableStickers.length)];
                        unlockSticker(randomSticker);
                    }
                }
                
                setTimeout(() => {
                    showLevelCompleteModal();
                }, 1000);
            } else {
                currentQuestion++;
                setTimeout(() => {
                    render();
                }, 1500);
            }
        } else {
            playFailSound();
            const card = document.getElementById('problemCard');
            card.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)';
            card.classList.add('shake');
            
            setTimeout(() => {
                card.classList.remove('shake');
                buttons.forEach(btn => btn.disabled = false);
                card.style.background = '';
            }, 1000);
        }
    };

    function showLevelCompleteModal() {
        const container = document.getElementById('activity-content');
        const modal = document.createElement('div');
        modal.className = 'celebration-modal';
        modal.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-stars">🎉✨⭐✨🎉</div>
                <h2 class="celebration-title">أحسنت!</h2>
                <p class="celebration-text">أكملت المستوى بنجاح!</p>
                <div class="celebration-score">
                    <span class="celebration-emoji">🏆</span>
                    <span class="celebration-points">${toArabicNumerals(score)} نقطة</span>
                </div>
                <div class="celebration-stars-row">⭐⭐⭐</div>
                <button class="celebration-button" onclick="continueMathActivity()">
                    ✨ متابعة
                </button>
            </div>
        `;
        container.appendChild(modal);
        playSuccessSound();
        showConfetti();
    }

    window.continueMathActivity = function() {
        currentQuestion = 1;
        score = 0;
        showHelp = false;
        render();
    };

    render();
}

// نشاط المقارنة
function showComparisonActivity() {
    let score = 0;

    function generateComparison() {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        let correctAnswer;
        
        if (num1 > num2) correctAnswer = '>';
        else if (num1 < num2) correctAnswer = '<';
        else correctAnswer = '=';

        return { num1, num2, correctAnswer };
    }

    function render() {
        const problem = generateComparison();
        
        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="comparison-activity">
                <h2 class="activity-title">⚖️ نشاط المقارنة</h2>
                <div class="score-display">النقاط: ${toArabicNumerals(score)}</div>
                
                <div class="comparison-display">
                    <div class="comparison-side">
                        <div class="number-large">${toArabicNumerals(problem.num1)}</div>
                        <div class="emoji-count">${'🍎'.repeat(Math.min(problem.num1, 10))}</div>
                    </div>
                    
                    <div class="comparison-middle">
                        <div class="question-mark">؟</div>
                    </div>
                    
                    <div class="comparison-side">
                        <div class="number-large">${toArabicNumerals(problem.num2)}</div>
                        <div class="emoji-count">${'🍊'.repeat(Math.min(problem.num2, 10))}</div>
                    </div>
                </div>

                <div class="comparison-buttons">
                    <button class="comparison-btn" onclick="checkComparison('>', '${problem.correctAnswer}')">
                        أكبر من >
                    </button>
                    <button class="comparison-btn" onclick="checkComparison('=', '${problem.correctAnswer}')">
                        يساوي =
                    </button>
                    <button class="comparison-btn" onclick="checkComparison('<', '${problem.correctAnswer}')">
                        أصغر من <
                    </button>
                </div>

                <button class="back-button" onclick="initMathActivitiesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    window.checkComparison = function(selected, correct) {
        const buttons = document.querySelectorAll('.comparison-btn');
        buttons.forEach(btn => btn.disabled = true);
        
        if (selected === correct) {
            playSuccessSound();
            showConfetti();
            score += 10;
            
            // 🌟 إضافة النقاط إلى اللاعب
            addStars(2);
            
            // 📊 كل 5 إجابات صحيحة = نشاط مكتمل
            if (score % 50 === 0) {
                updateDailyChallenge('activities');
                
                // 🎁 فرصة للحصول على ملصق
                if (Math.random() < 0.3) { // 30% فرصة
                    const allStickerIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
                    const unlockedIds = gameState.unlockedStickers || [];
                    const availableStickers = allStickerIds.filter(id => !unlockedIds.includes(id));
                    
                    if (availableStickers.length > 0) {
                        const randomSticker = availableStickers[Math.floor(Math.random() * availableStickers.length)];
                        setTimeout(() => unlockSticker(randomSticker), 500);
                    }
                }
            }
            
            // إضافة تأثير الإجابة الصحيحة
            buttons.forEach(btn => {
                if (btn.textContent.includes(selected)) {
                    btn.classList.add('correct');
                }
            });
            
            setTimeout(() => render(), 1200);
        } else {
            playFailSound();
            
            // إضافة تأثير الإجابة الخاطئة والصحيحة
            buttons.forEach(btn => {
                if (btn.textContent.includes(selected)) {
                    btn.classList.add('wrong');
                } else if (btn.textContent.includes(correct)) {
                    btn.classList.add('correct');
                }
            });
            
            setTimeout(() => render(), 1500);
        }
    };

    render();
}

// نشاط الترتيب
function showOrderingActivity() {
    let score = 0;

    function generateNumbers() {
        const count = 5;
        const numbers = [];
        while (numbers.length < count) {
            const num = Math.floor(Math.random() * 20) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        return numbers;
    }

    let currentNumbers = [];
    let selectedNumbers = [];

    function render() {
        if (selectedNumbers.length === 0) {
            currentNumbers = generateNumbers();
            selectedNumbers = [];
        }
        const shuffled = [...currentNumbers].sort(() => Math.random() - 0.5);

        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="ordering-activity">
                <h2 class="activity-title">📊 ترتيب الأرقام</h2>
                <div class="score-display">النقاط: ${toArabicNumerals(score)}</div>
                
                <p class="instruction">رتب الأرقام من الأصغر إلى الأكبر</p>

                <div class="ordered-slots">
                    ${Array(5).fill(0).map((_, idx) => `
                        <div class="order-slot ${selectedNumbers[idx] ? 'filled' : 'empty'}">
                            ${selectedNumbers[idx] ? toArabicNumerals(selectedNumbers[idx]) : '؟'}
                        </div>
                    `).join('')}
                </div>

                <div class="number-choices">
                    ${shuffled.map(num => `
                        <button class="number-choice ${selectedNumbers.includes(num) ? 'used' : ''}" 
                                onclick="selectNumber(${num})"
                                ${selectedNumbers.includes(num) ? 'disabled' : ''}>
                            ${toArabicNumerals(num)}
                        </button>
                    `).join('')}
                </div>

                <div class="action-buttons">
                    <button class="action-btn check-btn" onclick="checkOrder()">
                        ✓ تحقق
                    </button>
                    <button class="action-btn reset-btn" onclick="resetOrder()">
                        🔄 إعادة
                    </button>
                </div>

                <button class="back-button" onclick="initMathActivitiesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    window.selectNumber = function(num) {
        if (selectedNumbers.length < 5 && !selectedNumbers.includes(num)) {
            selectedNumbers.push(num);
            playSound('click');
            render();
        }
    };

    window.resetOrder = function() {
        selectedNumbers = [];
        playSound('click');
        render();
    };

    window.checkOrder = function() {
        if (selectedNumbers.length !== 5) {
            alert('⚠️ يجب اختيار 5 أرقام أولاً!');
            return;
        }
        
        const sorted = [...currentNumbers].sort((a, b) => a - b);
        const isCorrect = selectedNumbers.every((num, idx) => num === sorted[idx]);

        if (isCorrect) {
            playSuccessSound();
            showConfetti();
            score += 10;
            
            // تأثير بصري للنجاح
            const slots = document.querySelectorAll('.order-slot.filled');
            slots.forEach((slot, idx) => {
                setTimeout(() => {
                    slot.style.transform = 'scale(1.2) rotate(5deg)';
                    setTimeout(() => {
                        slot.style.transform = '';
                    }, 300);
                }, idx * 100);
            });
            
            setTimeout(() => {
                selectedNumbers = [];
                render();
            }, 1500);
        } else {
            playFailSound();
            const container = document.querySelector('.ordered-slots');
            container.classList.add('shake');
            setTimeout(() => container.classList.remove('shake'), 500);
        }
    };

    render();
}

// ==========================================
// 3. الأنشطة العلمية - Science Activities
// ==========================================

function initScienceActivitiesMenu() {
    const container = document.getElementById('activity-content');
    container.innerHTML = `
        <div class="activity-menu">
            <h2 class="activity-title">🔬 الأنشطة العلمية</h2>
            <div class="submenu-grid">
                <button class="submenu-card" onclick="showLivingNonLiving()">
                    <div class="submenu-icon">🌱</div>
                    <div class="submenu-title">الكائنات الحية</div>
                    <div class="submenu-desc">حي أم غير حي؟</div>
                </button>
                <button class="submenu-card" onclick="showHealthActivitiesMenu()">
                    <div class="submenu-icon">🏥</div>
                    <div class="submenu-title">الصحة والسلامة</div>
                    <div class="submenu-desc">عادات صحية</div>
                </button>
                <button class="submenu-card" onclick="showAnimalSounds()">
                    <div class="submenu-icon">🐾</div>
                    <div class="submenu-title">أصوات الحيوانات</div>
                    <div class="submenu-desc">تعلم أصوات الحيوانات</div>
                </button>
            </div>
            <button class="back-button" onclick="showMainMenu()">
                ↩️ العودة للقائمة الرئيسية
            </button>
        </div>
    `;
}

// الكائنات الحية وغير الحية
function showLivingNonLiving() {
    const items = [
        { name: 'قطة', emoji: '🐱', type: 'living' },
        { name: 'كرسي', emoji: '🪑', type: 'non-living' },
        { name: 'شجرة', emoji: '🌳', type: 'living' },
        { name: 'كتاب', emoji: '📖', type: 'non-living' },
        { name: 'كلب', emoji: '🐕', type: 'living' },
        { name: 'سيارة', emoji: '🚗', type: 'non-living' },
        { name: 'زهرة', emoji: '🌺', type: 'living' },
        { name: 'طاولة', emoji: '🪑', type: 'non-living' },
        { name: 'سمكة', emoji: '🐟', type: 'living' },
        { name: 'حجر', emoji: '🪨', type: 'non-living' }
    ];

    let score = 0;
    let currentIndex = 0;

    function render() {
        if (currentIndex >= items.length) {
            showCompletionModal('الكائنات الحية', score);
            currentIndex = 0;
            score = 0;
            return;
        }

        const item = items[currentIndex];
        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="living-nonliving">
                <h2 class="activity-title">🌱 الكائنات الحية وغير الحية</h2>
                <div class="score-display">النقاط: ${score}</div>
                
                <div class="item-display">
                    <div class="item-emoji">${item.emoji}</div>
                    <div class="item-name">${item.name}</div>
                </div>

                <div class="classification-buttons">
                    <button class="classify-btn living-btn" onclick="classifyItem('living', '${item.type}')">
                        🌱 كائن حي
                    </button>
                    <button class="classify-btn nonliving-btn" onclick="classifyItem('non-living', '${item.type}')">
                        🪨 غير حي
                    </button>
                </div>

                <button class="back-button" onclick="initScienceActivitiesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    window.classifyItem = function(selected, correct) {
        if (selected === correct) {
            playSuccessSound();
            showConfetti();
            score += 10;
            
            // 🌟 إضافة نقاط عند كل إجابة صحيحة
            addStars(1);
            
            currentIndex++;
            setTimeout(() => render(), 1000);
        } else {
            playFailSound();
            const container = document.querySelector('.item-display');
            container.classList.add('shake');
            setTimeout(() => container.classList.remove('shake'), 500);
        }
    };

    render();
}

// قائمة الأنشطة الصحية
function showHealthActivitiesMenu() {
    const container = document.getElementById('activity-content');
    container.innerHTML = `
        <div class="activity-menu">
            <h2 class="activity-title">🏥 الصحة والسلامة</h2>
            <div class="submenu-grid">
                <button class="submenu-card" onclick="showHandWashing()">
                    <div class="submenu-icon">🧼</div>
                    <div class="submenu-title">غسل اليدين</div>
                    <div class="submenu-desc">خطوات غسل اليدين</div>
                </button>
                <button class="submenu-card" onclick="showHealthyFood()">
                    <div class="submenu-icon">🥗</div>
                    <div class="submenu-title">الطعام الصحي</div>
                    <div class="submenu-desc">صحي أم غير صحي؟</div>
                </button>
            </div>
            <button class="back-button" onclick="initScienceActivitiesMenu()">
                ↩️ العودة
            </button>
        </div>
    `;
}

// نشاط غسل اليدين
function showHandWashing() {
    const steps = [
        { step: 1, title: 'افتح الماء', emoji: '🚰', description: 'افتح صنبور الماء' },
        { step: 2, title: 'بلل يديك', emoji: '💧', description: 'بلل يديك بالماء' },
        { step: 3, title: 'ضع الصابون', emoji: '🧼', description: 'ضع الصابون على يديك' },
        { step: 4, title: 'افرك جيداً', emoji: '🙌', description: 'افرك يديك لمدة 20 ثانية' },
        { step: 5, title: 'اشطف بالماء', emoji: '💦', description: 'اشطف يديك بالماء' },
        { step: 6, title: 'جفف يديك', emoji: '🤲', description: 'جفف يديك بالمنشفة' }
    ];

    let currentStep = 0;

    function render() {
        const step = steps[currentStep];
        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="handwashing-activity">
                <h2 class="activity-title">🧼 خطوات غسل اليدين</h2>
                
                <div class="step-display">
                    <div class="step-number">الخطوة ${step.step} من ${steps.length}</div>
                    <div class="step-emoji">${step.emoji}</div>
                    <div class="step-title">${step.title}</div>
                    <div class="step-description">${step.description}</div>
                </div>

                <div class="step-progress">
                    ${steps.map((s, idx) => `
                        <div class="progress-dot ${idx <= currentStep ? 'completed' : ''}"></div>
                    `).join('')}
                </div>

                <div class="navigation-buttons">
                    <button class="nav-btn" onclick="navigateHandWashing('prev')" 
                            ${currentStep === 0 ? 'disabled' : ''}>
                        ⏮️ السابق
                    </button>
                    <button class="nav-btn" onclick="navigateHandWashing('next')"
                            ${currentStep === steps.length - 1 ? 'disabled' : ''}>
                        التالي ⏭️
                    </button>
                </div>

                <button class="back-button" onclick="showHealthActivitiesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    window.navigateHandWashing = function(direction) {
        if (direction === 'next' && currentStep < steps.length - 1) {
            currentStep++;
            playSound('click');
        } else if (direction === 'prev' && currentStep > 0) {
            currentStep--;
            playSound('click');
        }
        render();
    };

    render();
}

// الطعام الصحي
function showHealthyFood() {
    const foods = [
        { name: 'تفاحة', emoji: '🍎', healthy: true },
        { name: 'بطاطس مقلية', emoji: '🍟', healthy: false },
        { name: 'جزر', emoji: '🥕', healthy: true },
        { name: 'حلوى', emoji: '🍬', healthy: false },
        { name: 'موز', emoji: '🍌', healthy: true },
        { name: 'مشروب غازي', emoji: '🥤', healthy: false },
        { name: 'سلطة', emoji: '🥗', healthy: true },
        { name: 'كعك', emoji: '🍰', healthy: false },
        { name: 'برتقال', emoji: '🍊', healthy: true },
        { name: 'بيتزا', emoji: '🍕', healthy: false }
    ];

    let score = 0;
    let currentIndex = 0;

    function render() {
        if (currentIndex >= foods.length) {
            showCompletionModal('الطعام الصحي', score);
            currentIndex = 0;
            score = 0;
            return;
        }

        const food = foods[currentIndex];
        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="healthy-food">
                <h2 class="activity-title">🥗 الطعام الصحي</h2>
                <div class="score-display">النقاط: ${score}</div>
                
                <div class="food-display">
                    <div class="food-emoji">${food.emoji}</div>
                    <div class="food-name">${food.name}</div>
                </div>

                <div class="health-buttons">
                    <button class="health-btn healthy-btn" onclick="classifyFood(true, ${food.healthy})">
                        ✅ صحي
                    </button>
                    <button class="health-btn unhealthy-btn" onclick="classifyFood(false, ${food.healthy})">
                        ❌ غير صحي
                    </button>
                </div>

                <button class="back-button" onclick="showHealthActivitiesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    window.classifyFood = function(selected, correct) {
        if (selected === correct) {
            playSuccessSound();
            showConfetti();
            score += 10;
            
            // 🌟 إضافة نقاط عند كل إجابة صحيحة
            addStars(1);
            
            currentIndex++;
            setTimeout(() => render(), 1000);
        } else {
            playFailSound();
            const container = document.querySelector('.food-display');
            container.classList.add('shake');
            setTimeout(() => container.classList.remove('shake'), 500);
        }
    };

    render();
}

// أصوات الحيوانات
function showAnimalSounds() {
    const animals = [
        { name: 'قطة', emoji: '🐱', sound: 'مواء', audioKey: 'animal-cat' },
        { name: 'كلب', emoji: '🐕', sound: 'نباح', audioKey: 'animal-dog' },
        { name: 'بقرة', emoji: '🐄', sound: 'خوار', audioKey: 'animal-cow' },
        { name: 'خروف', emoji: '🐑', sound: 'ثغاء', audioKey: 'animal-sheep' },
        { name: 'أسد', emoji: '🦁', sound: 'زئير', audioKey: 'animal-lion' },
        { name: 'ديك', emoji: '🐓', sound: 'صياح', audioKey: 'animal-rooster' },
        { name: 'بطة', emoji: '🦆', sound: 'بطبطة', audioKey: 'animal-duck' },
        { name: 'حصان', emoji: '🐴', sound: 'صهيل', audioKey: 'animal-horse' }
    ];

    let currentIndex = 0;

    function render() {
        const animal = animals[currentIndex];
        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="animal-sounds">
                <h2 class="activity-title">🐾 أصوات الحيوانات</h2>
                
                <div class="animal-card">
                    <div class="animal-emoji">${animal.emoji}</div>
                    <div class="animal-name">${animal.name}</div>
                    <div class="animal-sound">الصوت: ${animal.sound}</div>
                </div>

                <button class="play-sound-btn" onclick="playActivitySound('${animal.audioKey}')">
                    🔊 استمع للصوت
                </button>

                <div class="navigation-buttons">
                    <button class="nav-btn" onclick="navigateAnimal('prev')" 
                            ${currentIndex === 0 ? 'disabled' : ''}>
                        ⏮️ السابق
                    </button>
                    <button class="nav-btn" onclick="navigateAnimal('next')"
                            ${currentIndex === animals.length - 1 ? 'disabled' : ''}>
                        التالي ⏭️
                    </button>
                </div>

                <button class="back-button" onclick="initScienceActivitiesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    window.navigateAnimal = function(direction) {
        if (direction === 'next' && currentIndex < animals.length - 1) {
            currentIndex++;
            playSound('click');
        } else if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
            playSound('click');
        }
        render();
    };



    render();
}

// ==========================================
// 4. الأنشطة الفنية - Art Activities
// ==========================================

function initArtActivitiesMenu() {
    // تشغيل موسيقى الأنشطة الفنية
    if (typeof playBackgroundMusic !== 'undefined') {
        playBackgroundMusic('art');
    }
    
    const container = document.getElementById('activity-content');
    container.innerHTML = `
        <div class="activity-menu">
            <h2 class="activity-title">🎨 الأنشطة الفنية</h2>
            <div class="submenu-grid">
                <button class="submenu-card" onclick="showColoringBook()">
                    <div class="submenu-icon">🖍️</div>
                    <div class="submenu-title">كتاب التلوين</div>
                    <div class="submenu-desc">لون الصور الجميلة</div>
                </button>
                <button class="submenu-card" onclick="showFreeDrawing()">
                    <div class="submenu-icon">✏️</div>
                    <div class="submenu-title">الرسم الحر</div>
                    <div class="submenu-desc">ارسم ما تريد</div>
                </button>
                <button class="submenu-card" onclick="showMyLittleWorld()">
                    <div class="submenu-icon">🌍</div>
                    <div class="submenu-title">عالمي الصغير</div>
                    <div class="submenu-desc">بناء عالم ثلاثي الأبعاد</div>
                </button>
                <button class="submenu-card" onclick="showSculpture()">
                    <div class="submenu-icon">🗿</div>
                    <div class="submenu-title">المنحوتات</div>
                    <div class="submenu-desc">اصنع منحوتات</div>
                </button>
            </div>
            <button class="back-button" onclick="showMainMenu()">
                ↩️ العودة للقائمة الرئيسية
            </button>
        </div>
    `;
}

// كتاب التلوين
function showColoringBook() {
    const coloringPages = [
        { name: 'شجرة', emoji: '🌳', svg: generateTreeSVG() },
        { name: 'منزل', emoji: '🏠', svg: generateHouseSVG() },
        { name: 'سيارة', emoji: '🚗', svg: generateCarSVG() },
        { name: 'قطة', emoji: '🐱', svg: generateCatSVG() }
    ];

    const colors = [
        '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
        '#FF00FF', '#00FFFF', '#FFA500', '#800080',
        '#FFC0CB', '#A52A2A', '#000000', '#FFFFFF'
    ];

    let currentPageIndex = 0;
    let currentColor = colors[0];
    
    // حفظ حالة التلوين لكل صفحة
    let pageColorStates = [[], [], [], []]; // Array لكل صفحة

    function generateTreeSVG() {
        return `
            <svg viewBox="0 0 200 200" class="coloring-svg">
                <rect class="colorable" data-id="0" x="85" y="120" width="30" height="60" fill="white" stroke="black" stroke-width="2"/>
                <circle class="colorable" data-id="1" cx="100" cy="80" r="50" fill="white" stroke="black" stroke-width="2"/>
            </svg>
        `;
    }

    function generateHouseSVG() {
        return `
            <svg viewBox="0 0 200 200" class="coloring-svg">
                <polygon class="colorable" data-id="0" points="100,40 40,100 160,100" fill="white" stroke="black" stroke-width="2"/>
                <rect class="colorable" data-id="1" x="50" y="100" width="100" height="80" fill="white" stroke="black" stroke-width="2"/>
                <rect class="colorable" data-id="2" x="80" y="130" width="40" height="50" fill="white" stroke="black" stroke-width="2"/>
            </svg>
        `;
    }

    function generateCarSVG() {
        return `
            <svg viewBox="0 0 200 200" class="coloring-svg">
                <rect class="colorable" data-id="0" x="40" y="100" width="120" height="40" fill="white" stroke="black" stroke-width="2"/>
                <rect class="colorable" data-id="1" x="60" y="70" width="80" height="30" fill="white" stroke="black" stroke-width="2"/>
                <circle class="colorable" data-id="2" cx="70" cy="140" r="15" fill="white" stroke="black" stroke-width="2"/>
                <circle class="colorable" data-id="3" cx="130" cy="140" r="15" fill="white" stroke="black" stroke-width="2"/>
            </svg>
        `;
    }

    function generateCatSVG() {
        return `
            <svg viewBox="0 0 200 200" class="coloring-svg">
                <circle class="colorable" data-id="0" cx="100" cy="100" r="40" fill="white" stroke="black" stroke-width="2"/>
                <polygon class="colorable" data-id="1" points="60,80 70,60 75,85" fill="white" stroke="black" stroke-width="2"/>
                <polygon class="colorable" data-id="2" points="140,80 130,60 125,85" fill="white" stroke="black" stroke-width="2"/>
                <circle cx="85" cy="95" r="5" fill="black"/>
                <circle cx="115" cy="95" r="5" fill="black"/>
            </svg>
        `;
    }

    function render() {
        const page = coloringPages[currentPageIndex];
        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="coloring-book">
                <h2 class="activity-title">🖍️ كتاب التلوين</h2>
                
                <div class="coloring-workspace">
                    <div class="coloring-canvas" id="coloring-canvas">
                        ${page.svg}
                    </div>
                    
                    <div class="color-palette">
                        ${colors.map(color => `
                            <button class="color-btn ${color === currentColor ? 'selected' : ''}" 
                                    style="background-color: ${color};"
                                    onclick="selectColor('${color}')">
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="page-navigation">
                    ${coloringPages.map((p, idx) => `
                        <button class="page-btn ${idx === currentPageIndex ? 'active' : ''}" 
                                onclick="changePage(${idx})">
                            ${p.emoji}
                        </button>
                    `).join('')}
                </div>

                <button class="back-button" onclick="initArtActivitiesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;

        // استعادة التلوين المحفوظ
        restoreColors();

        // Add click handlers to colorable elements
        document.querySelectorAll('.colorable').forEach(element => {
            element.style.cursor = 'pointer';
            element.addEventListener('click', function() {
                const elementId = this.getAttribute('data-id');
                this.setAttribute('fill', currentColor);
                
                // حفظ اللون في الحالة
                pageColorStates[currentPageIndex][elementId] = currentColor;
                
                playActivitySound('brush-stroke');
            });
        });
    }

    function restoreColors() {
        // استعادة الألوان المحفوظة للصفحة الحالية
        document.querySelectorAll('.colorable').forEach(element => {
            const elementId = element.getAttribute('data-id');
            const savedColor = pageColorStates[currentPageIndex][elementId];
            if (savedColor) {
                element.setAttribute('fill', savedColor);
            }
        });
    }

    window.selectColor = function(color) {
        currentColor = color;
        playActivitySound('color-select');
        
        // تحديث أزرار الألوان فقط بدون إعادة render كاملة
        document.querySelectorAll('.color-btn').forEach(btn => {
            if (btn.style.backgroundColor === color) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
    };

    window.changePage = function(index) {
        currentPageIndex = index;
        playSound('page-flip');
        render();
    };

    render();
}

// الرسم الحر
function showFreeDrawing() {
    const container = document.getElementById('activity-content');
    container.innerHTML = `
        <div class="free-drawing">
            <h2 class="activity-title">✏️ الرسم الحر</h2>
            
            <canvas id="drawing-canvas" width="600" height="400"></canvas>
            
            <div class="drawing-tools">
                <div class="color-picker-section">
                    <label>اللون:</label>
                    <input type="color" id="brush-color" value="#000000">
                </div>
                
                <div class="brush-size-section">
                    <label>حجم الفرشاة:</label>
                    <input type="range" id="brush-size" min="1" max="20" value="5">
                </div>
                
                <button class="tool-btn" onclick="clearCanvas()">🗑️ مسح الكل</button>
            </div>

            <button class="back-button" onclick="initArtActivitiesMenu()">
                ↩️ العودة
            </button>
        </div>
    `;

    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Set white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // تحسين جودة الرسم - Anti-aliasing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const brushColor = document.getElementById('brush-color');
    const brushSize = document.getElementById('brush-size');

    // دالة للحصول على الإحداثيات الصحيحة
    function getCanvasCoordinates(e, canvas) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    // Mouse events
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const coords = getCanvasCoordinates(e, canvas);
        lastX = coords.x;
        lastY = coords.y;
        
        // تشغيل صوت الرسم
        playActivitySound('brush-stroke');
        
        // رسم نقطة في البداية للحصول على dots بدلاً من lines عند الضغط السريع
        ctx.beginPath();
        ctx.arc(lastX, lastY, brushSize.value / 2, 0, Math.PI * 2);
        ctx.fillStyle = brushColor.value;
        ctx.fill();
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        
        const coords = getCanvasCoordinates(e, canvas);
        
        ctx.strokeStyle = brushColor.value;
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round'; // لجعل الزوايا smooth
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
        
        lastX = coords.x;
        lastY = coords.y;
    });

    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        isDrawing = true;
        lastX = (touch.clientX - rect.left) * scaleX;
        lastY = (touch.clientY - rect.top) * scaleY;
        
        // رسم نقطة في البداية
        ctx.beginPath();
        ctx.arc(lastX, lastY, brushSize.value / 2, 0, Math.PI * 2);
        ctx.fillStyle = brushColor.value;
        ctx.fill();
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const x = (touch.clientX - rect.left) * scaleX;
        const y = (touch.clientY - rect.top) * scaleY;
        
        ctx.strokeStyle = brushColor.value;
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        lastX = x;
        lastY = y;
    });

    canvas.addEventListener('touchend', () => isDrawing = false);

    window.clearCanvas = function() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        playSound('click');
    };
}

// عالمي الصغير
function showMyLittleWorld() {
    const elements = {
        nature: [
            { name: 'شجرة', emoji: '🌳' },
            { name: 'زهرة', emoji: '🌺' },
            { name: 'شمس', emoji: '☀️' },
            { name: 'سحابة', emoji: '☁️' },
            { name: 'نجمة', emoji: '⭐' }
        ],
        buildings: [
            { name: 'منزل', emoji: '🏠' },
            { name: 'مدرسة', emoji: '🏫' },
            { name: 'مسجد', emoji: '🕌' },
            { name: 'مستشفى', emoji: '🏥' }
        ],
        animals: [
            { name: 'قطة', emoji: '🐱' },
            { name: 'كلب', emoji: '🐕' },
            { name: 'طائر', emoji: '🐦' },
            { name: 'سمكة', emoji: '🐟' }
        ],
        vehicles: [
            { name: 'سيارة', emoji: '🚗' },
            { name: 'حافلة', emoji: '🚌' },
            { name: 'طائرة', emoji: '✈️' }
        ]
    };

    let placedElements = [];
    let currentCategory = 'nature';

    function render() {
        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="world-builder">
                <h2 class="activity-title">🌍 عالمي الصغير</h2>
                
                <div class="world-canvas" id="world-canvas">
                    ${placedElements.map((el, idx) => `
                        <div class="placed-element" 
                             style="left: ${el.x}px; top: ${el.y}px; font-size: ${el.size}px;"
                             onclick="removeElement(${idx})"
                             title="اضغط للحذف">
                            ${el.emoji}
                        </div>
                    `).join('')}
                </div>
                
                <div class="world-elements">
                    ${Object.values(elements).flat().map(el => `
                        <div class="world-element" onclick="addElement('${el.emoji}')" title="${el.name}">
                            ${el.emoji}
                        </div>
                    `).join('')}
                </div>

                <button class="action-btn" onclick="clearWorld()" style="margin: 20px auto; display: block;">
                    🗑️ مسح الكل
                </button>

                <button class="back-button" onclick="initArtActivitiesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    window.changeCategory = function(category) {
        currentCategory = category;
        playSound('click');
        render();
    };

    window.addElement = function(emoji) {
        const canvas = document.getElementById('world-canvas');
        const rect = canvas.getBoundingClientRect();
        
        placedElements.push({
            emoji: emoji,
            x: Math.random() * (rect.width - 60),
            y: Math.random() * (rect.height - 60),
            size: 40 + Math.random() * 40
        });
        
        playSound('click');
        render();
    };

    window.removeElement = function(index) {
        placedElements.splice(index, 1);
        playSound('click');
        render();
    };

    window.clearWorld = function() {
        placedElements = [];
        playSound('click');
        render();
    };

    render();
}

// المنحوتات
function showSculpture() {
    const shapes = [
        { name: 'كرة', emoji: '⚽', shape: 'sphere' },
        { name: 'مكعب', emoji: '🎲', shape: 'cube' },
        { name: 'أسطوانة', emoji: '🥫', shape: 'cylinder' },
        { name: 'هرم', emoji: '🔺', shape: 'pyramid' }
    ];

    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
    
    let sculpture = [];

    function render() {
        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="sculpture-creator">
                <h2 class="activity-title">🗿 صانع المنحوتات</h2>
                
                <div class="sculpture-display" id="sculpture-display">
                    ${sculpture.length === 0 ? 
                        '<p class="empty-message">اضغط على الأشكال لإضافتها</p>' :
                        sculpture.map((item, idx) => `
                            <div class="sculpture-piece" 
                                 style="color: ${item.color}; animation-delay: ${idx * 0.1}s;"
                                 onclick="removePiece(${idx})">
                                ${item.emoji}
                            </div>
                        `).join('')
                    }
                </div>

                <div class="shape-selector">
                    <h3>اختر الشكل:</h3>
                    <div class="shapes-row">
                        ${shapes.map(shape => `
                            <button class="shape-select-btn" onclick="addShape('${shape.emoji}')">
                                ${shape.emoji} ${shape.name}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="action-buttons">
                    <button class="action-btn" onclick="clearSculpture()">🗑️ مسح الكل</button>
                    <button class="action-btn" onclick="randomizeSculpture()">🎲 تصميم عشوائي</button>
                </div>

                <button class="back-button" onclick="initArtActivitiesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    window.addShape = function(emoji) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sculpture.push({ emoji, color: randomColor });
        playSound('click');
        render();
    };

    window.removePiece = function(index) {
        sculpture.splice(index, 1);
        playSound('click');
        render();
    };

    window.clearSculpture = function() {
        sculpture = [];
        playSound('click');
        render();
    };

    window.randomizeSculpture = function() {
        sculpture = [];
        const count = 5 + Math.floor(Math.random() * 5);
        for (let i = 0; i < count; i++) {
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            sculpture.push({ emoji: shape.emoji, color });
        }
        playSuccessSound();
        render();
    };

    render();
}

// ==========================================
// 5. ألعاب الإثراء - Enrichment Games
// ==========================================

function initEnrichmentGamesMenu() {
    // تشغيل موسيقى الألعاب
    if (typeof playBackgroundMusic !== 'undefined') {
        playBackgroundMusic('game');
    }
    
    const container = document.getElementById('activity-content');
    container.innerHTML = `
        <div class="activity-menu">
            <h2 class="activity-title">🎮 ألعاب الإثراء</h2>
            <div class="submenu-grid">
                <button class="submenu-card" onclick="showMemoryGame()">
                    <div class="submenu-icon">🃏</div>
                    <div class="submenu-title">لعبة الذاكرة</div>
                    <div class="submenu-desc">اعثر على الأزواج</div>
                </button>
                <button class="submenu-card" onclick="showPatternGame()">
                    <div class="submenu-icon">🔄</div>
                    <div class="submenu-title">الأنماط</div>
                    <div class="submenu-desc">أكمل النمط</div>
                </button>
                <button class="submenu-card" onclick="showWhatsMissingGame()">
                    <div class="submenu-icon">❓</div>
                    <div class="submenu-title">ما المفقود؟</div>
                    <div class="submenu-desc">ابحث عن العنصر المفقود</div>
                </button>
                <button class="submenu-card" onclick="showDifferenceGame()">
                    <div class="submenu-icon">🔍</div>
                    <div class="submenu-title">لعبة الاختلافات</div>
                    <div class="submenu-desc">اكتشف الاختلافات</div>
                </button>
            </div>
            <button class="back-button" onclick="showMainMenu()">
                ↩️ العودة للقائمة الرئيسية
            </button>
        </div>
    `;
}

// لعبة الذاكرة
function showMemoryGame() {
    const allEmojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🥝', '🍒', '🥭', '🍑'];
    
    let difficulty = 'easy'; // easy: 4 pairs, medium: 6, hard: 8, expert: 10
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let score = 0;

    function getDifficultyPairs() {
        switch(difficulty) {
            case 'easy': return 4;
            case 'medium': return 6;
            case 'hard': return 8;
            case 'expert': return 10;
            default: return 4;
        }
    }

    function initializeGame() {
        const pairCount = getDifficultyPairs();
        const selectedEmojis = allEmojis.slice(0, pairCount);
        cards = [...selectedEmojis, ...selectedEmojis]
            .map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false }))
            .sort(() => Math.random() - 0.5);
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
    }

    function render() {
        const container = document.getElementById('activity-content');
        const gridClass = difficulty === 'easy' ? 'grid-4' : 
                         difficulty === 'medium' ? 'grid-6' : 
                         difficulty === 'hard' ? 'grid-8' : 'grid-10';
        
        container.innerHTML = `
            <div class="memory-game">
                <h2 class="activity-title">🃏 لعبة الذاكرة</h2>
                
                <div class="game-header">
                    <div class="level-selector">
                        <button class="level-btn ${difficulty === 'easy' ? 'active' : ''}" 
                                onclick="changeMemoryDifficulty('easy')">سهل</button>
                        <button class="level-btn ${difficulty === 'medium' ? 'active' : ''}" 
                                onclick="changeMemoryDifficulty('medium')">متوسط</button>
                        <button class="level-btn ${difficulty === 'hard' ? 'active' : ''}" 
                                onclick="changeMemoryDifficulty('hard')">صعب</button>
                        <button class="level-btn ${difficulty === 'expert' ? 'active' : ''}" 
                                onclick="changeMemoryDifficulty('expert')">خبير</button>
                    </div>
                    <div class="game-stats">
                        <span>الحركات: ${moves}</span>
                        <span>النقاط: ${score}</span>
                    </div>
                </div>

                <div class="memory-grid ${gridClass}">
                    ${cards.map((card, index) => `
                        <div class="memory-card ${card.flipped || card.matched ? 'flipped' : ''} 
                                                 ${card.matched ? 'matched' : ''}"
                             onclick="flipCard(${index})">
                            <div class="card-front">?</div>
                            <div class="card-back">${card.emoji}</div>
                        </div>
                    `).join('')}
                </div>

                <button class="action-btn" onclick="resetMemoryGame()">🔄 لعبة جديدة</button>

                <button class="back-button" onclick="initEnrichmentGamesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    window.changeMemoryDifficulty = function(newDifficulty) {
        difficulty = newDifficulty;
        score = 0;
        playSound('click');
        initializeGame();
        render();
    };

    window.flipCard = function(index) {
        if (flippedCards.length >= 2) return;
        if (cards[index].flipped || cards[index].matched) return;

        cards[index].flipped = true;
        flippedCards.push(index);
        playActivitySound('card-flip');
        render();

        if (flippedCards.length === 2) {
            moves++;
            const [first, second] = flippedCards;
            
            if (cards[first].emoji === cards[second].emoji) {
                cards[first].matched = true;
                cards[second].matched = true;
                matchedPairs++;
                score += 10;
                playSuccessSound();
                flippedCards = [];
                
                // 🌟 إضافة نجمة عند كل زوج صحيح
                addStars(1);
                
                // 📊 تحديث التحدي اليومي عند إكمال اللعبة
                if (matchedPairs === getDifficultyPairs()) {
                    updateDailyChallenge('memory');
                    setTimeout(() => {
                        showConfetti();
                        showCompletionModal('لعبة الذاكرة', score);
                    }, 500);
                }
                render();
            } else {
                setTimeout(() => {
                    cards[first].flipped = false;
                    cards[second].flipped = false;
                    flippedCards = [];
                    playFailSound();
                    render();
                }, 1000);
            }
        }
    };

    window.resetMemoryGame = function() {
        playSound('click');
        initializeGame();
        render();
    };

    initializeGame();
    render();
}

// لعبة الأنماط
function showPatternGame() {
    const emojis = ['🔴', '🔵', '🟡', '🟢', '🟣', '🟠'];
    let score = 0;
    let currentPattern = [];
    let userAnswer = null;

    function generatePattern() {
        const length = 4 + Math.floor(Math.random() * 3); // 4-6 elements
        const pattern = [];
        
        for (let i = 0; i < length - 1; i++) {
            pattern.push(emojis[Math.floor(Math.random() * emojis.length)]);
        }
        
        // Create a simple repeating pattern
        const patternType = Math.random();
        if (patternType < 0.5) {
            // Simple repetition: A B A B A B ?
            const basePattern = pattern.slice(0, 2);
            currentPattern = [];
            for (let i = 0; i < 3; i++) {
                currentPattern.push(...basePattern);
            }
            return basePattern[0];
        } else {
            // Growing pattern: A A B B C C ?
            currentPattern = pattern;
            return pattern[pattern.length - 1];
        }
    }

    function render() {
        const correctAnswer = generatePattern();
        const options = [correctAnswer];
        
        while (options.length < 4) {
            const random = emojis[Math.floor(Math.random() * emojis.length)];
            if (!options.includes(random)) {
                options.push(random);
            }
        }
        options.sort(() => Math.random() - 0.5);

        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="pattern-game">
                <h2 class="activity-title">🔄 لعبة الأنماط</h2>
                <div class="score-display">النقاط: ${score}</div>
                
                <p class="instruction">أكمل النمط التالي:</p>

                <div class="pattern-display">
                    ${currentPattern.map(emoji => `
                        <div class="pattern-item">${emoji}</div>
                    `).join('')}
                    <div class="pattern-item missing">❓</div>
                </div>

                <div class="pattern-options">
                    ${options.map(emoji => `
                        <button class="pattern-option" onclick="checkPattern('${emoji}', '${correctAnswer}')">
                            ${emoji}
                        </button>
                    `).join('')}
                </div>

                <button class="back-button" onclick="initEnrichmentGamesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    window.checkPattern = function(selected, correct) {
        if (selected === correct) {
            playSuccessSound();
            showConfetti();
            score += 10;
            
            // 🌟 إضافة نقاط عند كل إجابة صحيحة
            addStars(1);
            
            // 📊 كل 5 إجابات صحيحة تحسب كنشاط مكتمل
            if (score > 0 && score % 50 === 0) {
                updateDailyChallenge('activities', 1);
            }
            
            setTimeout(() => render(), 1000);
        } else {
            playFailSound();
            const container = document.querySelector('.pattern-display');
            container.classList.add('shake');
            setTimeout(() => container.classList.remove('shake'), 500);
        }
    };

    render();
}

// لعبة ما المفقود
function showWhatsMissingGame() {
    const categories = {
        fruits: ['🍎', '🍌', '🍇', '🍊', '🍓'],
        animals: ['🐱', '🐶', '🐰', '🐻', '🐼'],
        vehicles: ['🚗', '🚌', '🚕', '🚙', '🚐'],
        shapes: ['⭐', '❤️', '🔵', '🟡', '🟢']
    };

    let score = 0;

    function render() {
        const categoryName = Object.keys(categories)[Math.floor(Math.random() * Object.keys(categories).length)];
        const items = [...categories[categoryName]];
        const missingIndex = Math.floor(Math.random() * items.length);
        const missingItem = items[missingIndex];
        
        const displayItems = [...items];
        displayItems[missingIndex] = '❓';

        const options = [...items].sort(() => Math.random() - 0.5);

        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="whats-missing-game">
                <h2 class="activity-title">❓ ما المفقود؟</h2>
                <div class="score-display">النقاط: ${score}</div>
                
                <p class="instruction">شاهد العناصر جيداً ثم اكتشف ما المفقود:</p>

                <div class="items-display" id="items-display">
                    ${items.map(item => `
                        <div class="display-item show">${item}</div>
                    `).join('')}
                </div>

                <div class="missing-display" id="missing-display" style="display: none;">
                    ${displayItems.map(item => `
                        <div class="display-item">${item}</div>
                    `).join('')}
                </div>

                <div class="missing-options" id="missing-options" style="display: none;">
                    ${options.map(item => `
                        <button class="missing-option" onclick="checkMissing('${item}', '${missingItem}')">
                            ${item}
                        </button>
                    `).join('')}
                </div>

                <button class="action-btn" id="start-btn" onclick="startMissingGame()">
                    👀 ابدأ اللعبة
                </button>

                <button class="back-button" onclick="initEnrichmentGamesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    window.startMissingGame = function() {
        document.getElementById('items-display').style.display = 'none';
        document.getElementById('start-btn').style.display = 'none';
        document.getElementById('missing-display').style.display = 'flex';
        document.getElementById('missing-options').style.display = 'flex';
        playSound('click');
    };

    window.checkMissing = function(selected, correct) {
        if (selected === correct) {
            playSuccessSound();
            showConfetti();
            score += 10;
            
            // 🌟 إضافة نقاط عند كل إجابة صحيحة
            addStars(2);
            
            // 📊 كل 5 إجابات صحيحة تحسب كنشاط مكتمل
            if (score > 0 && score % 50 === 0) {
                updateDailyChallenge('activities', 1);
            }
            
            setTimeout(() => render(), 1500);
        } else {
            playFailSound();
            const container = document.querySelector('.missing-display');
            container.classList.add('shake');
            setTimeout(() => container.classList.remove('shake'), 500);
        }
    };

    render();
}

// لعبة الاختلافات
function showDifferenceGame() {
    const emojiSets = [
        { category: 'الحيوانات', base: '🐱', options: ['🐶', '🐰', '🐻', '🐼', '🐨', '🦁', '🐯', '🦊'] },
        { category: 'الفواكه', base: '🍎', options: ['🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍑', '🥝'] },
        { category: 'المركبات', base: '🚗', options: ['🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒'] },
        { category: 'الأشكال', base: '⭐', options: ['❤️', '🔵', '🟡', '🟢', '🔶', '🔷', '💠', '🔸'] }
    ];

    let score = 0;
    let foundDifferences = 0;
    let currentDifferenceIndices = [];
    let leftGrid = [];
    let rightGrid = [];

    function generatePuzzle() {
        // اختيار مجموعة عشوائية
        const selectedSet = emojiSets[Math.floor(Math.random() * emojiSets.length)];
        
        // إنشاء grid من 9 عناصر
        const baseGrid = Array(9).fill(selectedSet.base);
        
        // اختيار 3 أماكن عشوائية للاختلافات
        currentDifferenceIndices = [];
        while (currentDifferenceIndices.length < 3) {
            const randomIndex = Math.floor(Math.random() * 9);
            if (!currentDifferenceIndices.includes(randomIndex)) {
                currentDifferenceIndices.push(randomIndex);
            }
        }
        
        // Grid الأيسر (الأصلي)
        leftGrid = [...baseGrid];
        
        // Grid الأيمن (مع الاختلافات)
        rightGrid = [...baseGrid];
        currentDifferenceIndices.forEach((index, i) => {
            rightGrid[index] = selectedSet.options[i % selectedSet.options.length];
        });
        
        foundDifferences = 0;
    }

    function render() {
        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="difference-game">
                <h2 class="activity-title">🔍 لعبة الاختلافات</h2>
                <div class="score-display">النقاط: ${score}</div>
                
                <p class="instruction">ابحث عن 3 اختلافات بين الصورتين!</p>

                <div class="differences-container">
                    <div class="image-panel">
                        <h3>الصورة الأولى 👈</h3>
                        <div class="emoji-grid" id="left-grid">
                            ${leftGrid.map((emoji, index) => `
                                <div class="emoji-spot" data-index="${index}">
                                    ${emoji}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="image-panel">
                        <h3>الصورة الثانية 👉</h3>
                        <div class="emoji-grid" id="right-grid">
                            ${rightGrid.map((emoji, index) => `
                                <div class="emoji-spot ${currentDifferenceIndices.includes(index) ? 'different' : ''}" 
                                     data-index="${index}"
                                     onclick="checkDifference(${index})">
                                    ${emoji}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="progress-tracker">
                    <h3>الاختلافات المكتشفة:</h3>
                    <div class="progress-dots">
                        ${[0, 1, 2].map(i => `
                            <div class="progress-dot ${i < foundDifferences ? 'found' : ''}" id="dot-${i}">
                                ${i < foundDifferences ? '✓' : (i + 1)}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <button class="action-btn" onclick="nextDifferencePuzzle()" style="margin-top: 20px;">
                    🔄 لعبة جديدة
                </button>

                <button class="back-button" onclick="initEnrichmentGamesMenu()">
                    ↩️ العودة
                </button>
            </div>
        `;
    }

    window.checkDifference = function(index) {
        if (!currentDifferenceIndices.includes(index)) {
            // خطأ - ليس اختلاف
            playFailSound();
            const spot = document.querySelector(`#right-grid .emoji-spot[data-index="${index}"]`);
            spot.style.animation = 'shake 0.5s';
            setTimeout(() => spot.style.animation = '', 500);
            return;
        }

        // صح - وجد اختلاف!
        const spot = document.querySelector(`#right-grid .emoji-spot[data-index="${index}"]`);
        
        // تحقق إذا كان مكتشف من قبل
        if (spot.classList.contains('found')) {
            return;
        }

        spot.classList.add('found');
        spot.innerHTML += '<div class="found-indicator">✓</div>';
        
        foundDifferences++;
        
        // تحديث progress dots
        const dot = document.getElementById(`dot-${foundDifferences - 1}`);
        if (dot) {
            dot.classList.add('found');
            dot.textContent = '✓';
        }

        playSuccessSound();
        
        if (foundDifferences === 3) {
            // فاز!
            score += 30;
            
            // 🌟 إضافة نقاط عند إكمال اللعبة
            addStars(3);
            
            setTimeout(() => {
                showConfetti();
                showCompletionModal('لعبة الاختلافات', score);
                setTimeout(() => nextDifferencePuzzle(), 2000);
            }, 500);
        } else {
            score += 10;
            
            // 🌟 إضافة نقطة عند كل اختلاف يتم اكتشافه
            addStars(1);
            
            render(); // لتحديث النقاط
        }
    };

    window.nextDifferencePuzzle = function() {
        playSound('click');
        generatePuzzle();
        render();
    };

    generatePuzzle();
    render();
}

// ==========================================
// 6. ألبوم الملصقات - Sticker Album
// ==========================================

function showStickerAlbum() {
    const allStickers = [
        { id: 1, emoji: '⭐', name: 'نجمة ذهبية', rarity: 'common' },
        { id: 2, emoji: '🌟', name: 'نجمة لامعة', rarity: 'common' },
        { id: 3, emoji: '🎯', name: 'هدف مثالي', rarity: 'common' },
        { id: 4, emoji: '🏆', name: 'كأس البطولة', rarity: 'rare' },
        { id: 5, emoji: '🥇', name: 'ميدالية ذهبية', rarity: 'rare' },
        { id: 6, emoji: '👑', name: 'تاج الملك', rarity: 'rare' },
        { id: 7, emoji: '💎', name: 'جوهرة نادرة', rarity: 'epic' },
        { id: 8, emoji: '🦄', name: 'وحيد القرن', rarity: 'epic' },
        { id: 9, emoji: '🐉', name: 'التنين الأسطوري', rarity: 'legendary' },
        { id: 10, emoji: '🌈', name: 'قوس القزح', rarity: 'common' },
        { id: 11, emoji: '🚀', name: 'صاروخ الفضاء', rarity: 'rare' },
        { id: 12, emoji: '🎨', name: 'فنان موهوب', rarity: 'common' },
        { id: 13, emoji: '🔮', name: 'الكرة السحرية', rarity: 'legendary' }
    ];

    const gameState = loadGameState();
    const unlockedStickers = gameState.unlockedStickers || [];

    function render() {
        const container = document.getElementById('activity-content');
        container.innerHTML = `
            <div class="sticker-album">
                <h2 class="activity-title">✨ ألبوم الملصقات</h2>
                
                <div class="album-stats">
                    <div class="stat-item">
                        <span class="stat-label">الملصقات المجموعة:</span>
                        <span class="stat-value">${unlockedStickers.length} / ${allStickers.length}</span>
                    </div>
                </div>

                <div class="stickers-grid">
                    ${allStickers.map(sticker => {
                        const isUnlocked = unlockedStickers.includes(sticker.id);
                        const rarityClass = `rarity-${sticker.rarity}`;
                        
                        return `
                            <div class="sticker-slot ${rarityClass} ${isUnlocked ? 'unlocked' : 'locked'}">
                                <div class="sticker-content">
                                    ${isUnlocked ? 
                                        `<div class="sticker-emoji">${sticker.emoji}</div>
                                         <div class="sticker-name">${sticker.name}</div>` :
                                        `<div class="sticker-locked">🔒</div>
                                         <div class="sticker-name">؟؟؟</div>`
                                    }
                                </div>
                                ${isUnlocked ? `<div class="rarity-badge">${getRarityLabel(sticker.rarity)}</div>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>

                <div class="album-info">
                    <p>💡 اكسب الملصقات بإكمال الأنشطة والتحديات!</p>
                </div>

                <button class="back-button" onclick="showMainMenu()">
                    ↩️ العودة للقائمة الرئيسية
                </button>
            </div>
        `;
    }

    function getRarityLabel(rarity) {
        const labels = {
            'common': 'عادي',
            'rare': 'نادر',
            'epic': 'أسطوري',
            'legendary': 'خرافي'
        };
        return labels[rarity] || 'عادي';
    }

    render();
}