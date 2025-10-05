// ========================================
// app.js - التطبيق الرئيسي
// ========================================

// ==========================================
// 1. Game State Management
// ==========================================

let gameState = {
    currentScreen: 'profile-creation',
    profile: null,
    stars: 0,
    totalStars: 0,
    unlockedStickers: [],
    unlockedActivities: ['arabic', 'math', 'science', 'art', 'enrichment', 'smart-friend', 'story', 'stickers'],
    dailyChallenge: null,
    lastChallengeDate: null,
    theme: 'default',
    soundEnabled: true,
    completedActivities: []
};

// Load game state from localStorage
function loadGameState() {
    const saved = localStorage.getItem('kindergarten-app-state');
    if (saved) {
        try {
            const loadedState = JSON.parse(saved);
            gameState = { ...gameState, ...loadedState };
            
            // Validate and fix corrupted data
            if (!Array.isArray(gameState.unlockedStickers)) {
                gameState.unlockedStickers = [];
            }
            
            // Validate daily challenge structure
            if (gameState.dailyChallenge && 
                (!gameState.dailyChallenge.target || 
                 !gameState.dailyChallenge.type || 
                 typeof gameState.dailyChallenge.progress === 'undefined')) {
                // Challenge is corrupted, reset it
                gameState.dailyChallenge = null;
                gameState.lastChallengeDate = null;
            }
            
            // Ensure stars are numbers
            if (typeof gameState.stars !== 'number') gameState.stars = 0;
            if (typeof gameState.totalStars !== 'number') gameState.totalStars = 0;
            
        } catch (e) {
            console.error('Error loading game state:', e);
        }
    }
    return gameState;
}

// Save game state to localStorage
function saveGameState() {
    try {
        localStorage.setItem('kindergarten-app-state', JSON.stringify(gameState));
    } catch (e) {
        console.error('Error saving game state:', e);
    }
}

// Add stars to player
function addStars(amount) {
    gameState.stars += amount;
    gameState.totalStars += amount;
    saveGameState();
    updateStarDisplay();
    
    // تشغيل صوت كسب النجوم
    playSound('star-earn');
}

// Update star display in header
function updateStarDisplay() {
    const starDisplay = document.getElementById('star-count');
    if (starDisplay) {
        starDisplay.textContent = gameState.stars;
    }
}

// Unlock sticker
function unlockSticker(stickerId) {
    if (!gameState.unlockedStickers.includes(stickerId)) {
        gameState.unlockedStickers.push(stickerId);
        saveGameState();
        
        // تشغيل صوت فتح الملصق
        playSound('sticker-unlock');
        
        showStickerRewardModal(stickerId);
    }
}

// ==========================================
// 2. Profile Creation
// ==========================================

const avatars = [
    '👦', '👧', '🧒', '👶',
    '🐱', '🐶', '🐰', '🐻',
    '🦁', '🐯', '🦊', '🐼',
    '🐨', '🐸', '🦉', '🦄',
    '🤖', '👽'
];

function showProfileCreation() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="profile-creation">
            <div class="profile-card">
                <h1 class="profile-title">مرحباً بك! 🌟</h1>
                <p class="profile-subtitle">دعنا نبدأ معاً</p>
                
                <div class="profile-form">
                    <div class="form-group">
                        <label>ما اسمك؟</label>
                        <input type="text" id="player-name" placeholder="اكتب اسمك هنا" maxlength="20">
                    </div>
                    
                    <div class="form-group">
                        <label>اختر صورتك المفضلة:</label>
                        <div class="avatar-grid">
                            ${avatars.map((avatar, index) => `
                                <button class="avatar-option ${index === 0 ? 'selected' : ''}" 
                                        onclick="selectAvatar('${avatar}', this)">
                                    ${avatar}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <button class="start-btn" onclick="createProfile()">
                        🚀 ابدأ المغامرة
                    </button>
                </div>
            </div>
        </div>
    `;
}

let selectedAvatar = avatars[0];

window.selectAvatar = function(avatar, element) {
    selectedAvatar = avatar;
    playSound('click');
    
    // Remove selected class from all avatars
    document.querySelectorAll('.avatar-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked avatar
    element.classList.add('selected');
};

window.createProfile = function() {
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value.trim();
    
    if (!name) {
        nameInput.classList.add('shake');
        setTimeout(() => nameInput.classList.remove('shake'), 500);
        return;
    }
    
    gameState.profile = {
        name: name,
        avatar: selectedAvatar,
        createdAt: new Date().toISOString()
    };
    
    gameState.currentScreen = 'main-menu';
    saveGameState();
    playSound('success');
    
    // تشغيل صوت الترحيب بعد ثانية
    setTimeout(() => {
        playSound('welcome');
    }, 1000);
    
    // Generate first daily challenge
    generateDailyChallenge();
    
    // Show main menu
    initializeApp();
};

// ==========================================
// 3. Main Menu
// ==========================================

function showMainMenu() {
    // تشغيل موسيقى القائمة الرئيسية
    playBackgroundMusic('menu');
    
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="app-container">
            <!-- Header -->
            <header class="app-header">
                <div class="profile-section">
                    <span class="profile-avatar">${gameState.profile.avatar}</span>
                    <span class="profile-name">${gameState.profile.name}</span>
                </div>
                <div class="stars-section">
                    <span class="star-icon">⭐</span>
                    <span class="star-count" id="star-count">${gameState.stars}</span>
                </div>
                <div class="settings-section">
                    <button class="icon-btn" onclick="toggleSound()" title="الصوت">
                        ${gameState.soundEnabled ? '🔊' : '🔇'}
                    </button>
                    <button class="icon-btn" onclick="showThemeSelector()" title="السمة">
                        🎨
                    </button>
                </div>
            </header>

            <!-- Daily Challenge -->
            <div class="daily-challenge-banner" id="daily-challenge-banner">
                ${renderDailyChallenge()}
            </div>

            <!-- Activity Content Area -->
            <div class="activity-content" id="activity-content">
                ${renderMainMenuContent()}
            </div>
        </div>
    `;
}

function renderMainMenuContent() {
    return `
        <div class="main-menu">
            <h1 class="app-title">روضة الأطفال التفاعلية 🎨</h1>
            <p class="app-subtitle">اختر نشاطك المفضل</p>
            
            <div class="activity-grid">
                <button class="activity-card arabic" onclick="initArabicActivitiesMenu()">
                    <div class="card-icon">
                        <svg viewBox="0 0 100 100" class="activity-svg">
                            <defs>
                                <linearGradient id="arabic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <text x="50" y="65" font-size="50" text-anchor="middle" fill="url(#arabic-gradient)" font-family="Arial">أ</text>
                        </svg>
                    </div>
                    <h3 class="card-title">العربية</h3>
                    <p class="card-desc">تعلم الحروف والكلمات</p>
                </button>

                <button class="activity-card math" onclick="initMathActivitiesMenu()">
                    <div class="card-icon">
                        <svg viewBox="0 0 100 100" class="activity-svg">
                            <defs>
                                <linearGradient id="math-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#f093fb;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#f5576c;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <text x="50" y="70" font-size="60" text-anchor="middle" fill="url(#math-gradient)">123</text>
                        </svg>
                    </div>
                    <h3 class="card-title">الرياضيات</h3>
                    <p class="card-desc">الأرقام والحساب</p>
                </button>

                <button class="activity-card science" onclick="initScienceActivitiesMenu()">
                    <div class="card-icon">🔬</div>
                    <h3 class="card-title">العلوم</h3>
                    <p class="card-desc">اكتشف العالم</p>
                </button>

                <button class="activity-card art" onclick="initArtActivitiesMenu()">
                    <div class="card-icon">🎨</div>
                    <h3 class="card-title">الفنون</h3>
                    <p class="card-desc">ارسم وابدع</p>
                </button>

                <button class="activity-card enrichment" onclick="initEnrichmentGamesMenu()">
                    <div class="card-icon">🎮</div>
                    <h3 class="card-title">الألعاب</h3>
                    <p class="card-desc">ألعاب ممتعة</p>
                </button>

                <button class="activity-card smart-friend" onclick="showSmartFriend()">
                    <div class="card-icon">🤖</div>
                    <h3 class="card-title">الصديق الذكي</h3>
                    <p class="card-desc">تحدث معي</p>
                </button>

                <button class="activity-card story" onclick="showStoryTime()">
                    <div class="card-icon">📖</div>
                    <h3 class="card-title">وقت القصة</h3>
                    <p class="card-desc">قصص رائعة</p>
                </button>

                <button class="activity-card stickers" onclick="showStickerAlbum()">
                    <div class="card-icon">✨</div>
                    <h3 class="card-title">الملصقات</h3>
                    <p class="card-desc">مجموعتي</p>
                </button>
            </div>
        </div>
    `;
}

// ==========================================
// 4. Daily Challenge System
// ==========================================

function generateDailyChallenge() {
    const today = new Date().toDateString();
    
    // Check if we already have a challenge for today
    if (gameState.lastChallengeDate === today && gameState.dailyChallenge) {
        return;
    }
    
    const challenges = [
        { id: 1, title: 'أكمل 5 أنشطة', description: 'أكمل 5 أنشطة مختلفة اليوم', target: 5, type: 'activities', reward: 50, icon: '🎯' },
        { id: 2, title: 'اجمع 100 نجمة', description: 'اجمع 100 نجمة اليوم', target: 100, type: 'stars', reward: 30, icon: '⭐' },
        { id: 3, title: 'العب لعبة الذاكرة', description: 'أكمل لعبة الذاكرة 3 مرات', target: 3, type: 'memory', reward: 40, icon: '🃏' },
        { id: 4, title: 'تعلم 10 كلمات', description: 'أكمل نشاط تكوين الكلمات', target: 10, type: 'words', reward: 35, icon: '✍️' },
        { id: 5, title: 'كن فناناً', description: 'أكمل نشاطين فنيين', target: 2, type: 'art', reward: 45, icon: '🎨' }
    ];
    
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    
    gameState.dailyChallenge = {
        ...randomChallenge,
        progress: 0,
        completed: false,
        date: today
    };
    
    gameState.lastChallengeDate = today;
    saveGameState();
}

function renderDailyChallenge() {
    if (!gameState.dailyChallenge) {
        generateDailyChallenge();
    }
    
    const challenge = gameState.dailyChallenge;
    const progress = Math.min((challenge.progress / challenge.target) * 100, 100);
    
    if (challenge.completed) {
        return `
            <div class="challenge-completed">
                <span class="challenge-icon">✅</span>
                <span>تحدي اليوم مكتمل! عد غداً لتحدٍ جديد</span>
            </div>
        `;
    }
    
    return `
        <div class="challenge-active">
            <div class="challenge-info">
                <span class="challenge-icon">${challenge.icon}</span>
                <div class="challenge-text">
                    <div class="challenge-title">${challenge.title}</div>
                    <div class="challenge-description">${challenge.description}</div>
                </div>
            </div>
            <div class="challenge-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-text">${challenge.progress} / ${challenge.target}</div>
            </div>
            <div class="challenge-reward">
                <span class="reward-icon">🎁</span>
                <span class="reward-text">+${challenge.reward} ⭐</span>
            </div>
        </div>
    `;
}

function updateDailyChallenge(type, amount = 1) {
    if (!gameState.dailyChallenge || gameState.dailyChallenge.completed) {
        return;
    }
    
    if (gameState.dailyChallenge.type === type) {
        gameState.dailyChallenge.progress += amount;
        
        if (gameState.dailyChallenge.progress >= gameState.dailyChallenge.target) {
            gameState.dailyChallenge.completed = true;
            
            // تشغيل صوت إكمال التحدي
            playSound('challenge-complete');
            
            addStars(gameState.dailyChallenge.reward);
            showChallengeRewardModal();
            
            // Unlock a random sticker
            const allStickerIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
            const lockedStickers = allStickerIds.filter(id => !gameState.unlockedStickers.includes(id));
            if (lockedStickers.length > 0) {
                const randomSticker = lockedStickers[Math.floor(Math.random() * lockedStickers.length)];
                unlockSticker(randomSticker);
            }
        }
        
        saveGameState();
        
        // Update challenge display
        const banner = document.getElementById('daily-challenge-banner');
        if (banner) {
            banner.innerHTML = renderDailyChallenge();
        }
    }
}

// ==========================================
// 5. Theme System
// ==========================================

const themes = {
    default: {
        name: 'الافتراضي',
        primary: '#667eea',
        secondary: '#764ba2',
        background: '#f0f4f8',
        icon: '🎨'
    },
    forest: {
        name: 'الغابة',
        primary: '#10b981',
        secondary: '#059669',
        background: '#d1fae5',
        icon: '🌲'
    },
    ocean: {
        name: 'المحيط',
        primary: '#3b82f6',
        secondary: '#1e40af',
        background: '#dbeafe',
        icon: '🌊'
    }
};

window.showThemeSelector = function() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h2 class="modal-title">اختر السمة</h2>
            <div class="theme-grid">
                ${Object.entries(themes).map(([key, theme]) => `
                    <button class="theme-option ${gameState.theme === key ? 'selected' : ''}" 
                            onclick="selectTheme('${key}')">
                        <span class="theme-icon">${theme.icon}</span>
                        <span class="theme-name">${theme.name}</span>
                    </button>
                `).join('')}
            </div>
            <button class="modal-close-btn" onclick="closeModal()">إغلاق</button>
        </div>
    `;
    document.body.appendChild(modal);
    playSound('click');
};

window.selectTheme = function(themeName) {
    gameState.theme = themeName;
    saveGameState();
    applyTheme(themeName);
    playSound('click');
    closeModal();
};

function applyTheme(themeName) {
    const theme = themes[themeName];
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--secondary-color', theme.secondary);
    root.style.setProperty('--background-color', theme.background);
}

// ==========================================
// 6. Sound System - النظام الصوتي المحدث
// ==========================================

// مسارات الملفات الصوتية
const AUDIO_PATHS = {
    effects: 'assets/effects/',
    letters: 'assets/letters/',
    numbers: 'assets/numbers/',
    voice: 'assets/voice/',
    rewards: 'assets/rewards/',
    activities: 'assets/Activities/',
    sounds: 'assets/sounds/'
};

// تحميل الأصوات الأساسية
const sounds = {
    click: new Audio('assets/effects/click.mp3'),
    success: new Audio('assets/effects/success.mp3'),
    fail: new Audio('assets/effects/fail.mp3'),
    'star-earn': new Audio('assets/effects/star-earn.mp3'),
    'level-up': new Audio('assets/effects/level-up.mp3'),
    'page-flip': new Audio('assets/effects/page-flip.mp3'),
    'great-job': new Audio('assets/voice/great-job.mp3'),
    'try-again': new Audio('assets/voice/try-again.mp3'),
    'you-won': new Audio('assets/voice/you-won.mp3'),
    'confetti': new Audio('assets/rewards/confetti.mp3'),
    'sticker-unlock': new Audio('assets/rewards/sticker-unlock.mp3'),
    'challenge-complete': new Audio('assets/rewards/challenge-complete.mp3')
};

// خريطة الحروف العربية وملفات الصوت
const letterSounds = {
    'أ': 'alef.mp3',
    'ب': 'baa.mp3',
    'ت': 'taa.mp3',
    'ث': 'thaa.mp3',
    'ج': 'jeem.mp3',
    'ح': 'haa.mp3',
    'خ': 'khaa.mp3',
    'د': 'daal.mp3',
    'ذ': 'dhaal.mp3',
    'ر': 'raa.mp3',
    'ز': 'zaay.mp3',
    'س': 'seen.mp3',
    'ش': 'sheen.mp3',
    'ص': 'saad.mp3',
    'ض': 'daad.mp3',
    'ط': 'taa2.mp3',
    'ظ': 'thaa2.mp3',
    'ع': 'ain.mp3',
    'غ': 'ghain.mp3',
    'ف': 'faa.mp3',
    'ق': 'qaaf.mp3',
    'ك': 'kaaf.mp3',
    'ل': 'laam.mp3',
    'م': 'meem.mp3',
    'ن': 'noon.mp3',
    'ه': 'haa2.mp3',
    'و': 'waaw.mp3',
    'ي': 'yaa.mp3'
};

// خريطة الأرقام وملفات الصوت
const numberSounds = {
    1: 'one.mp3',
    2: 'two.mp3',
    3: 'three.mp3',
    4: 'four.mp3',
    5: 'five.mp3',
    6: 'six.mp3',
    7: 'seven.mp3',
    8: 'eight.mp3',
    9: 'nine.mp3',
    10: 'ten.mp3'
};

// تشغيل صوت عام
function playSound(soundName) {
    if (!gameState.soundEnabled) return;
    
    const sound = sounds[soundName];
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Sound play failed:', e));
    }
}

// تشغيل صوت حرف عربي
function playLetterSound(letter) {
    if (!gameState.soundEnabled) return;
    
    const fileName = letterSounds[letter];
    if (fileName) {
        const audio = new Audio(AUDIO_PATHS.letters + fileName);
        audio.play().catch(e => console.log('Letter sound play failed:', e));
    }
}

// تشغيل صوت رقم
function playNumberSound(number) {
    if (!gameState.soundEnabled) return;
    
    const fileName = numberSounds[number];
    if (fileName) {
        const audio = new Audio(AUDIO_PATHS.numbers + fileName);
        audio.play().catch(e => console.log('Number sound play failed:', e));
    }
}

// تشغيل صوت نشاط معين
function playActivitySound(soundName) {
    if (!gameState.soundEnabled) return;
    
    const audio = new Audio(AUDIO_PATHS.activities + soundName + '.mp3');
    audio.play().catch(e => console.log('Activity sound play failed:', e));
}

// تشغيل صوت النجاح مع التعليق الصوتي
function playSuccessSound() {
    if (!gameState.soundEnabled) return;
    
    playSound('success');
    // تشغيل التعليق الصوتي بعد 500ms
    setTimeout(() => {
        playSound('great-job');
    }, 500);
}

// تشغيل صوت الفشل مع التعليق الصوتي
function playFailSound() {
    if (!gameState.soundEnabled) return;
    
    playSound('fail');
    // تشغيل التعليق الصوتي بعد 400ms
    setTimeout(() => {
        playSound('try-again');
    }, 400);
}

// تشغيل صوت الفوز
function playWinSound() {
    if (!gameState.soundEnabled) return;
    
    playSound('success');
    setTimeout(() => {
        playSound('you-won');
    }, 600);
}

// ==========================================
// نظام الموسيقى الخلفية - Background Music System
// ==========================================

let currentBackgroundMusic = null;
const backgroundMusics = {
    'menu': new Audio('assets/sounds/menu-theme.mp3'),
    'art': new Audio('assets/sounds/art-bg.mp3'),
    'game': new Audio('assets/sounds/game-bg.mp3'),
    'story': new Audio('assets/sounds/story-time-bg.mp3')
};

// تهيئة جميع الموسيقى الخلفية
Object.values(backgroundMusics).forEach(music => {
    music.loop = true;
    music.volume = 0.3; // مستوى صوت منخفض للخلفية
});

// تشغيل موسيقى خلفية معينة
function playBackgroundMusic(musicName) {
    if (!gameState.soundEnabled) return;
    
    const newMusic = backgroundMusics[musicName];
    if (!newMusic) return;
    
    // إيقاف الموسيقى الحالية إذا كانت مختلفة
    if (currentBackgroundMusic && currentBackgroundMusic !== newMusic) {
        currentBackgroundMusic.pause();
        currentBackgroundMusic.currentTime = 0;
    }
    
    // تشغيل الموسيقى الجديدة
    currentBackgroundMusic = newMusic;
    currentBackgroundMusic.play().catch(e => console.log('Background music play failed:', e));
}

// إيقاف الموسيقى الخلفية
function stopBackgroundMusic() {
    if (currentBackgroundMusic) {
        currentBackgroundMusic.pause();
        currentBackgroundMusic.currentTime = 0;
        currentBackgroundMusic = null;
    }
}

// تحديث التبديل بين الصوت/الصامت للموسيقى
function updateBackgroundMusicVolume() {
    Object.values(backgroundMusics).forEach(music => {
        music.volume = gameState.soundEnabled ? 0.3 : 0;
    });
}

window.toggleSound = function() {
    gameState.soundEnabled = !gameState.soundEnabled;
    saveGameState();
    
    // تحديث مستوى صوت الموسيقى الخلفية
    updateBackgroundMusicVolume();
    
    const app = document.getElementById('app');
    if (app.querySelector('.app-header')) {
        showMainMenu();
    }
};

// ==========================================
// 7. Confetti Animation
// ==========================================

function showConfetti() {
    // تشغيل صوت الاحتفال
    playSound('confetti');
    
    const confettiCount = 50;
    const container = document.createElement('div');
    container.className = 'confetti-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    
    document.body.appendChild(container);
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.textContent = ['🎉', '⭐', '✨', '🎊', '💫'][Math.floor(Math.random() * 5)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.fontSize = (Math.random() * 20 + 20) + 'px';
        container.appendChild(confetti);
    }
    
    setTimeout(() => {
        container.remove();
    }, 4000);
}

// ==========================================
// 8. Modal System
// ==========================================

function showCompletionModal(activityName, score) {
    // تشغيل صوت الفوز
    playWinSound();
    
    // 🌟 إضافة النقاط
    const starsEarned = Math.floor(score / 10);
    addStars(starsEarned);
    
    // 📊 تحديث التحدي اليومي
    updateDailyChallenge('activities', 1);
    
    // 🎁 فرصة للحصول على ملصق (50% إذا النقاط عالية، 20% إذا متوسطة)
    const stickerChance = score >= 50 ? 0.5 : score >= 30 ? 0.3 : 0.2;
    let gotSticker = false;
    
    if (Math.random() < stickerChance) {
        const allStickerIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        const unlockedIds = gameState.unlockedStickers || [];
        const availableStickers = allStickerIds.filter(id => !unlockedIds.includes(id));
        
        if (availableStickers.length > 0) {
            const randomSticker = availableStickers[Math.floor(Math.random() * availableStickers.length)];
            gotSticker = true;
            setTimeout(() => unlockSticker(randomSticker), 1000);
        }
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content completion-modal">
            <div class="completion-icon">🎉</div>
            <h2 class="modal-title">أحسنت!</h2>
            <p class="completion-message">لقد أكملت نشاط ${activityName}</p>
            <div class="completion-score">
                <div class="score-item">
                    <span class="score-label">النقاط</span>
                    <span class="score-value">${score}</span>
                </div>
                <div class="score-item">
                    <span class="score-label">النجوم</span>
                    <span class="score-value">+${starsEarned} ⭐</span>
                </div>
            </div>
            ${gotSticker ? '<p class="bonus-message">✨ ستحصل على ملصق جديد!</p>' : ''}
            <button class="modal-action-btn" onclick="closeModalAndContinue()">
                متابعة 🚀
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    
    showConfetti();
    playSound('success');
}

function showChallengeRewardModal() {
    const challenge = gameState.dailyChallenge;
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content reward-modal">
            <div class="reward-icon-large">🏆</div>
            <h2 class="modal-title">تحدي مكتمل!</h2>
            <p class="reward-message">لقد أكملت تحدي اليوم بنجاح</p>
            <div class="reward-display">
                <div class="reward-item">
                    <span class="reward-emoji">⭐</span>
                    <span class="reward-amount">+${challenge.reward}</span>
                </div>
            </div>
            <button class="modal-action-btn" onclick="closeModal()">
                رائع! 🎉
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    showConfetti();
    playSound('success');
}

function showStickerRewardModal(stickerId) {
    const stickers = [
        { id: 1, emoji: '⭐', name: 'نجمة ذهبية' },
        { id: 2, emoji: '🌟', name: 'نجمة لامعة' },
        { id: 3, emoji: '🎯', name: 'هدف مثالي' },
        { id: 4, emoji: '🏆', name: 'كأس البطولة' },
        { id: 5, emoji: '🥇', name: 'ميدالية ذهبية' },
        { id: 6, emoji: '👑', name: 'تاج الملك' },
        { id: 7, emoji: '💎', name: 'جوهرة نادرة' },
        { id: 8, emoji: '🦄', name: 'وحيد القرن' },
        { id: 9, emoji: '🐉', name: 'التنين الأسطوري' },
        { id: 10, emoji: '🌈', name: 'قوس القزح' },
        { id: 11, emoji: '🚀', name: 'صاروخ الفضاء' },
        { id: 12, emoji: '🎨', name: 'فنان موهوب' },
        { id: 13, emoji: '🔮', name: 'الكرة السحرية' }
    ];
    
    const sticker = stickers.find(s => s.id === stickerId);
    if (!sticker) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content sticker-reward-modal">
            <div class="sticker-unlock-icon">${sticker.emoji}</div>
            <h2 class="modal-title">ملصق جديد!</h2>
            <p class="sticker-name">${sticker.name}</p>
            <p class="sticker-message">لقد حصلت على ملصق جديد لمجموعتك!</p>
            <button class="modal-action-btn" onclick="closeModal()">
                رائع! ✨
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    showConfetti();
    playSound('success');
}

window.closeModal = function() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => modal.remove());
};

window.closeModalAndContinue = function() {
    closeModal();
    // Stay on the same screen or go back based on context
};

// ==========================================
// 9. Initialization
// ==========================================

function initializeApp() {
    // Load game state
    loadGameState();
    
    // Save after validation (in case corrupted data was fixed)
    saveGameState();
    
    // Apply theme
    applyTheme(gameState.theme);
    
    // Check daily challenge
    generateDailyChallenge();
    
    // Show appropriate screen
    if (!gameState.profile) {
        showProfileCreation();
    } else {
        showMainMenu();
        // تشغيل صوت الترحيب عند فتح التطبيق للمستخدمين الحاليين
        setTimeout(() => {
            playSound('welcome');
        }, 500);
    }
}

// ==========================================
// 10. Start Application
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Export functions to window for onclick handlers
window.showMainMenu = showMainMenu;
window.addStars = addStars;
window.unlockSticker = unlockSticker;
window.playSound = playSound;
window.playSuccessSound = playSuccessSound;
window.playFailSound = playFailSound;
window.playWinSound = playWinSound;
window.playActivitySound = playActivitySound;
window.playLetterSound = playLetterSound;
window.playNumberSound = playNumberSound;
window.playBackgroundMusic = playBackgroundMusic;
window.stopBackgroundMusic = stopBackgroundMusic;
window.showConfetti = showConfetti;
window.showCompletionModal = showCompletionModal;
window.loadGameState = loadGameState;
window.saveGameState = saveGameState;
window.updateDailyChallenge = updateDailyChallenge;

// Debug utilities (accessible via browser console)
window.debugRewards = {
    // Get current game state
    getState: () => gameState,
    
    // Reset game state (careful!)
    resetAll: () => {
        localStorage.removeItem('kindergarten-app-state');
        location.reload();
    },
    
    // Add stars manually
    addStars: (amount) => {
        addStars(amount);
        console.log(`Added ${amount} stars. Total: ${gameState.stars}`);
    },
    
    // Unlock specific sticker
    unlockSticker: (id) => {
        if (id >= 1 && id <= 13) {
            unlockSticker(id);
            console.log(`Unlocked sticker #${id}`);
        } else {
            console.log('Sticker ID must be between 1-13');
        }
    },
    
    // Unlock all stickers
    unlockAllStickers: () => {
        for (let i = 1; i <= 13; i++) {
            if (!gameState.unlockedStickers.includes(i)) {
                gameState.unlockedStickers.push(i);
            }
        }
        saveGameState();
        console.log('All stickers unlocked!');
    },
    
    // Test daily challenge
    testChallenge: () => {
        generateDailyChallenge();
        console.log('Daily challenge:', gameState.dailyChallenge);
    }
};