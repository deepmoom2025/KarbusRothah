// ========================================
// gemini-features.js - ميزات الذكاء الاصطناعي
// ========================================

// Google Gemini API Configuration
const GEMINI_API_KEY = 'AIzaSyD5i62tQjxnsHsxKq2ewOln6BVwUXWmmcE';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const GEMINI_IMAGE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent';

// ==========================================
// 1. Smart Friend - الصديق الذكي
// ==========================================

// Chat state
let isSpeaking = false;
let currentUtterance = null;

function showSmartFriend() {
    // إيقاف الموسيقى الخلفية للصديق الذكي للتركيز على المحادثة
    if (typeof stopBackgroundMusic !== 'undefined') {
        stopBackgroundMusic();
    }
    
    const container = document.getElementById('activity-content');
    container.innerHTML = `
        <div class="smart-friend">
            <div class="chat-header">
                <div class="header-left">
                    <div class="ai-avatar-pulse">🤖</div>
                    <div class="header-info">
                        <h2 class="activity-title">الصديق الذكي</h2>
                        <span class="status-indicator">
                            <span class="status-dot"></span>
                            متصل الآن
                        </span>
                    </div>
                </div>
                <div class="header-actions">
                    <button class="icon-btn" onclick="stopSpeaking()" title="إيقاف الصوت">
                        🔇
                    </button>
                    <button class="icon-btn" onclick="clearChat()" title="مسح المحادثة">
                        🗑️
                    </button>
                </div>
            </div>
            
            <div class="chat-container" id="chat-messages">
                <div class="bot-message welcome-message">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <p>مرحباً! أنا صديقك الذكي 🌟</p>
                        <p>يمكنك أن تسألني أي سؤال، أو نتحدث معاً!</p>
                        <p>اضغط على الميكروفون 🎤 لتتحدث معي بصوتك، أو اكتب رسالتك أدناه ✍️</p>
                    </div>
                </div>
                
                <div class="quick-questions">
                    <p class="quick-title">أسئلة سريعة:</p>
                    <div class="question-chips">
                        <button class="chip" onclick="askQuickQuestion('ما هي الألوان الأساسية؟')">
                            🎨 الألوان الأساسية
                        </button>
                        <button class="chip" onclick="askQuickQuestion('كيف أغسل يدي؟')">
                            🧼 غسل اليدين
                        </button>
                        <button class="chip" onclick="askQuickQuestion('ما هي الحيوانات الأليفة؟')">
                            🐾 الحيوانات الأليفة
                        </button>
                        <button class="chip" onclick="askQuickQuestion('علمني الأرقام')">
                            🔢 تعلم الأرقام
                        </button>
                    </div>
                </div>
            </div>

            <div class="chat-input-container">
                <div class="input-row">
                    <input type="text" 
                           id="chat-input" 
                           placeholder="اكتب رسالتك هنا..." 
                           maxlength="200"
                           oninput="updateCharCount()"
                           onkeypress="handleChatKeyPress(event)">
                    <button class="send-btn" onclick="sendChatMessage()" title="إرسال">
                        ➤
                    </button>
                    <button class="voice-btn" onclick="startVoiceInput()" title="تحدث بصوتك">
                        🎤
                    </button>
                </div>
                <div class="input-info">
                    <span class="char-count" id="char-count">0/200</span>
                    <div class="voice-status" id="voice-status" style="display: none;">
                        <span class="pulse-dot"></span>
                        جاري الاستماع...
                    </div>
                </div>
            </div>

            <button class="back-button" onclick="showMainMenu()">
                ↩️ العودة للقائمة الرئيسية
            </button>
        </div>
    `;

    // Auto-scroll to bottom
    const chatContainer = document.getElementById('chat-messages');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Update character count
window.updateCharCount = function() {
    const input = document.getElementById('chat-input');
    const counter = document.getElementById('char-count');
    const length = input.value.length;
    counter.textContent = `${length}/200`;
    
    if (length > 180) {
        counter.style.color = '#ef4444';
    } else if (length > 150) {
        counter.style.color = '#f59e0b';
    } else {
        counter.style.color = '#94a3b8';
    }
};

// Ask quick question
window.askQuickQuestion = function(question) {
    const input = document.getElementById('chat-input');
    input.value = question;
    playSound('click');
    
    // Hide quick questions after first use
    const quickQuestions = document.querySelector('.quick-questions');
    if (quickQuestions) {
        quickQuestions.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => quickQuestions.remove(), 300);
    }
    
    // Send message
    sendChatMessage();
};

// Clear chat
window.clearChat = function() {
    if (!confirm('هل تريد حقاً مسح المحادثة؟')) return;
    
    playSound('click');
    showSmartFriend();
};

// Stop speaking
window.stopSpeaking = function() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        playSound('click');
    }
};

// Handle Enter key in chat input
window.handleChatKeyPress = function(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
};

// Send chat message
window.sendChatMessage = async function() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message to chat
    addMessageToChat(message, 'user');
    input.value = '';
    playSound('click');

    // Show typing indicator
    showTypingIndicator();

    try {
        console.log('📤 Sending message:', message);
        
        // Call Gemini API
        const response = await callGeminiAPI(message);
        
        console.log('✅ Got response:', response);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add bot response
        addMessageToChat(response, 'bot');
        
        // Speak the response
        speakText(response);
        
        playSound('success');
    } catch (error) {
        console.error('❌ Error in sendChatMessage:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        removeTypingIndicator();
        addMessageToChat('عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.', 'bot');
        playSound('fail');
    }
};

// Start voice input
window.startVoiceInput = function() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('عذراً، متصفحك لا يدعم التعرف على الصوت. يرجى استخدام Chrome أو Edge.');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'ar-SA';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const voiceStatus = document.getElementById('voice-status');
    voiceStatus.style.display = 'flex';
    playSound('click');

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('chat-input').value = transcript;
        voiceStatus.style.display = 'none';
        
        // Automatically send the message
        sendChatMessage();
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        voiceStatus.style.display = 'none';
        playSound('fail');
    };

    recognition.onend = function() {
        voiceStatus.style.display = 'none';
    };

    recognition.start();
};

// Add message to chat
function addMessageToChat(message, sender) {
    const chatContainer = document.getElementById('chat-messages');
    
    // Remove quick questions if they exist
    const quickQuestions = chatContainer.querySelector('.quick-questions');
    if (quickQuestions && sender === 'user') {
        quickQuestions.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => quickQuestions.remove(), 300);
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    
    const messageId = 'msg-' + Date.now();
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${sender === 'user' ? '👤' : '🤖'}</div>
        <div class="message-bubble">
            <div class="message-content" id="${messageId}">
                <p>${escapeHtml(message)}</p>
            </div>
            ${sender === 'bot' ? `
                <div class="message-actions">
                    <button class="msg-action-btn" onclick="copyMessage('${messageId}')" title="نسخ">
                        📋
                    </button>
                    <button class="msg-action-btn" onclick="readMessage('${messageId}')" title="قراءة">
                        🔊
                    </button>
                </div>
            ` : ''}
        </div>
    `;
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Copy message to clipboard
window.copyMessage = function(messageId) {
    const messageEl = document.getElementById(messageId);
    if (!messageEl) return;
    
    const text = messageEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
        playSound('success');
        showToast('تم النسخ! ✓');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
};

// Read specific message
window.readMessage = function(messageId) {
    const messageEl = document.getElementById(messageId);
    if (!messageEl) return;
    
    const text = messageEl.textContent;
    playSound('click');
    speakText(text);
};

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Show typing indicator
function showTypingIndicator() {
    const chatContainer = document.getElementById('chat-messages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Call Gemini API
async function callGeminiAPI(message) {
    console.log('🔵 callGeminiAPI called with message:', message);
    console.log('🔑 API Key exists:', GEMINI_API_KEY ? 'Yes' : 'No');
    console.log('🌐 API URL:', GEMINI_API_URL);
    
    const systemInstruction = `أنت روبوت ذكي ولطيف اسمه 'ذكي'، صديق للأطفال الصغار (أعمار 3-5 سنوات). مهمتك هي إجراء محادثة ممتعة مع الطفل. عند الإجابة على أسئلتهم:
1. ابدأ دائمًا بتعليق إيجابي ومشجع على سؤالهم، مثل 'هذا سؤال رائع!' أو 'أحب طريقة تفكيرك!'.
2. أجب على سؤالهم بطريقة بسيطة جدًا، قصيرة، وآمنة. استخدم لغة عربية سهلة وواضحة.
3. في بعض الأحيان، اختتم إجابتك بسؤال متابعة بسيط لتشجيع الطفل على مواصلة الحديث، مثل 'ما هو حيوانك المفضل؟' أو 'هل تحب الرسم؟'.
4. حافظ على إجاباتك إيجابية وتجنب الموضوعات المعقدة أو المخيفة. يجب أن تكون الإجابة كاملة في حدود 2-4 جمل.`;

    const requestBody = {
        system_instruction: {
            parts: [{
                text: systemInstruction
            }]
        },
        contents: [{
            parts: [{
                text: message
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
            topP: 0.8,
            topK: 40
        }
    };

    console.log('📦 Request Body:', JSON.stringify(requestBody, null, 2));

    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': GEMINI_API_KEY
            },
            body: JSON.stringify(requestBody)
        });

        console.log('📡 Response Status:', response.status, response.statusText);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unable to parse error' }));
            console.error('❌ Gemini API Error Response:', errorData);
            throw new Error(`API Error (${response.status}): ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log('📥 FULL Response Data:');
        console.log(JSON.stringify(data, null, 2));
        
        if (data.candidates && data.candidates.length > 0) {
            const candidate = data.candidates[0];
            console.log('📦 CANDIDATE OBJECT:');
            console.log(JSON.stringify(candidate, null, 2));
            
            console.log('📦 CONTENT OBJECT:');
            console.log(JSON.stringify(candidate.content, null, 2));
            
            console.log('📦 PARTS CHECK:', {
                hasContent: !!candidate.content,
                hasParts: !!candidate.content?.parts,
                partsIsArray: Array.isArray(candidate.content?.parts),
                partsLength: candidate.content?.parts?.length,
                firstPart: candidate.content?.parts?.[0]
            });
            
            // Check different possible response structures
            if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                const text = candidate.content.parts[0].text;
                console.log('✅ SUCCESS! Extracted text:', text);
                return text;
            } else if (candidate.text) {
                // Some APIs return text directly
                console.log('✅ SUCCESS! Extracted text (direct):', candidate.text);
                return candidate.text;
            } else if (candidate.output) {
                // Another possible structure
                console.log('✅ SUCCESS! Extracted text (output):', candidate.output);
                return candidate.output;
            } else {
                console.error('❌ FAILED: Unknown candidate structure');
                console.error('Candidate:', candidate);
                console.error('Content:', candidate.content);
                console.error('Content type:', typeof candidate.content);
                console.error('Content keys:', candidate.content ? Object.keys(candidate.content) : 'N/A');
                console.error('Finish Reason:', candidate.finishReason);
                
                // Check if it's a MAX_TOKENS issue
                if (candidate.finishReason === 'MAX_TOKENS') {
                    throw new Error('القصة طويلة جداً. يرجى المحاولة مرة أخرى.');
                }
                
                // Try to extract text from any available property
                if (candidate.content) {
                    const keys = Object.keys(candidate.content);
                    console.log('🔍 Trying to extract from content keys:', keys);
                    
                    // Try each key
                    for (const key of keys) {
                        const value = candidate.content[key];
                        console.log(`🔍 Checking key "${key}":`, value);
                        
                        if (typeof value === 'string' && value.trim()) {
                            console.log('✅ Found text in key:', key);
                            return value;
                        }
                        
                        if (Array.isArray(value) && value.length > 0) {
                            if (typeof value[0] === 'string') {
                                console.log('✅ Found text in array:', key);
                                return value[0];
                            }
                            if (value[0] && value[0].text) {
                                console.log('✅ Found text in array object:', key);
                                return value[0].text;
                            }
                        }
                        
                        if (value && typeof value === 'object' && value.text) {
                            console.log('✅ Found text in nested object:', key);
                            return value.text;
                        }
                    }
                }
                
                throw new Error('Unexpected response structure from Gemini API');
            }
        } else {
            console.error('❌ No candidates in response. Full data:', data);
            throw new Error('No response from Gemini API');
        }
    } catch (error) {
        console.error('❌ Exception in callGeminiAPI:', error);
        throw error;
    }
}

// Speak text using Web Speech API
function speakText(text) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        
        window.speechSynthesis.speak(utterance);
    }
}

// ==========================================
// 2. Story Time - وقت القصة
// ==========================================

function showStoryTime() {
    // تشغيل موسيقى وقت القصة
    if (typeof playBackgroundMusic !== 'undefined') {
        playBackgroundMusic('story');
    }
    
    const container = document.getElementById('activity-content');
    container.innerHTML = `
        <div class="story-time">
            <h2 class="activity-title">📚✨ وقت القصة المصورة ✨📚</h2>
            
            <div id="story-selection-screen" class="story-selection-screen">
                <div class="story-selection-title">
                    <h3>✨ عن ماذا تريد أن تكون قصتك اليوم؟ ✨</h3>
                    <p class="story-subtitle">اختر نوع قصتك المفضلة وسأكتبها لك!</p>
                </div>
                
                <div class="story-topics-grid">
                    <div class="story-topic-card" onclick="selectStoryTopic('حيوان لطيف', '🦊', 'عن حيوان لطيف ومغامراته')">
                        <div class="topic-emoji">🦊</div>
                        <div class="topic-title">حيوان لطيف</div>
                        <div class="topic-desc">مغامرات في الغابة</div>
                    </div>
                    
                    <div class="story-topic-card" onclick="selectStoryTopic('مغامرة في الفضاء', '🚀', 'عن طفل يسافر في صاروخ لاستكشاف الكواكب')">
                        <div class="topic-emoji">🚀</div>
                        <div class="topic-title">مغامرة في الفضاء</div>
                        <div class="topic-desc">رحلة بين النجوم</div>
                    </div>
                    
                    <div class="story-topic-card" onclick="selectStoryTopic('صداقة سحرية', '✨', 'عن صداقة بين طفل وكائن سحري')">
                        <div class="topic-emoji">✨🦄</div>
                        <div class="topic-title">صداقة سحرية</div>
                        <div class="topic-desc">سحر وخيال</div>
                    </div>
                    
                    <div class="story-topic-card" onclick="selectStoryTopic('تحت البحر', '🐠', 'عن أسرار ومغامرات الكائنات البحرية')">
                        <div class="topic-emoji">🐠</div>
                        <div class="topic-title">تحت البحر</div>
                        <div class="topic-desc">عالم المحيط</div>
                    </div>
                    
                    <div class="story-topic-card" onclick="selectStoryTopic('في الغابة', '🌳', 'عن مغامرة في الغابة والأشجار العملاقة')">
                        <div class="topic-emoji">🌳🦋</div>
                        <div class="topic-title">في الغابة</div>
                        <div class="topic-desc">أسرار الطبيعة</div>
                    </div>
                    
                    <div class="story-topic-card" onclick="selectStoryTopic('صديق الديناصور', '🦕', 'عن طفل يصادق ديناصوراً صغيراً لطيفاً')">
                        <div class="topic-emoji">🦕</div>
                        <div class="topic-title">صديق الديناصور</div>
                        <div class="topic-desc">العودة للماضي</div>
                    </div>
                </div>
            </div>

            <div id="story-display-screen" class="story-display-screen" style="display: none;">
                <div class="story-loading" id="story-loading">
                    <div class="loading-animation">
                        <div class="book-animation">
                            <div class="book-page"></div>
                            <div class="book-page"></div>
                            <div class="book-page"></div>
                        </div>
                        <p class="loading-text" id="loading-text">جاري كتابة قصتك الرائعة...</p>
                    </div>
                </div>
                
                <div class="story-container" id="story-container" style="display: none;">
                    <div class="story-header">
                        <h2 class="story-main-title" id="story-title"></h2>
                    </div>
                    
                    <div class="story-illustration-box" id="story-illustration">
                        <!-- سيتم إضافة الصورة هنا -->
                    </div>
                    
                    <div class="story-text-box" id="story-text">
                        <!-- نص القصة هنا -->
                    </div>
                    
                    <div class="story-controls">
                        <button class="story-btn story-btn-primary" id="read-aloud-btn" onclick="toggleStoryReading()">
                            <span id="read-icon">🔊</span> 
                            <span id="read-text">اقرأ لي القصة</span>
                        </button>
                        
                        <button class="story-btn story-btn-success" onclick="saveStory()">
                            💾 حفظ القصة
                        </button>
                        
                        <button class="story-btn story-btn-info" onclick="printStory()">
                            🖨️ طباعة
                        </button>
                        
                        <button class="story-btn story-btn-secondary" onclick="showStoryTime()">
                            🔄 قصة جديدة
                        </button>
                    </div>
                </div>
            </div>

            <button class="back-button" onclick="showMainMenu()">
                ↩️ العودة للقائمة الرئيسية
            </button>
        </div>
    `;
}

let currentStoryText = '';
let currentStoryTitle = '';
let isReading = false;

// Select story topic and generate
window.selectStoryTopic = async function(title, emoji, description) {
    playSound('click');
    
    // Hide selection, show loading
    document.getElementById('story-selection-screen').style.display = 'none';
    document.getElementById('story-display-screen').style.display = 'block';
    document.getElementById('story-loading').style.display = 'flex';
    document.getElementById('story-container').style.display = 'none';
    
    currentStoryTitle = title;
    
    try {
        // Update loading message
        const loadingText = document.getElementById('loading-text');
        loadingText.textContent = `جاري كتابة قصة رائعة عن ${title}...`;
        
        // Generate story with shorter, more direct prompt
        const prompt = `اكتب قصة قصيرة للأطفال ${description}. القصة من 5-6 فقرات، بها شخصيات محبوبة، حوار بسيط، نهاية سعيدة، ودرس مفيد. استخدم لغة بسيطة ورموز تعبيرية.`;
        
        const storyText = await callGeminiAPI(prompt);
        currentStoryText = storyText;
        
        // Display story
        document.getElementById('story-loading').style.display = 'none';
        document.getElementById('story-container').style.display = 'block';
        document.getElementById('story-title').textContent = title;
        document.getElementById('story-text').innerHTML = formatStoryText(storyText);
        
        // Generate illustration
        generateStoryIllustration(emoji, title);
        
        playSound('success');
        
        // Add fade-in animation
        document.getElementById('story-container').style.animation = 'fadeIn 0.5s ease-in';
        
    } catch (error) {
        console.error('Error generating story:', error);
        document.getElementById('story-loading').style.display = 'none';
        document.getElementById('story-container').style.display = 'block';
        document.getElementById('story-text').innerHTML = `
            <div class="error-message">
                <p style="font-size: 2rem; color: #e74c3c;">😔</p>
                <p style="font-size: 1.3rem; font-weight: bold; color: #e74c3c;">عذراً، حدث خطأ في إنشاء القصة</p>
                <p style="font-size: 1.1rem; color: #666;">يرجى المحاولة مرة أخرى</p>
            </div>
        `;
        playSound('fail');
    }
};

// Generate story illustration
function generateStoryIllustration(emoji, title) {
    const illustrationBox = document.getElementById('story-illustration');
    
    // Create beautiful illustrated background
    const backgrounds = {
        '🦊': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        '🚀': 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        '✨🦄': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        '🐠': 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',
        '🌳🦋': 'linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)',
        '🦕': 'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)'
    };
    
    const background = backgrounds[emoji] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    illustrationBox.innerHTML = `
        <div class="story-illustration" style="background: ${background};">
            <div class="illustration-emoji-large">${emoji}</div>
            <div class="illustration-sparkles">✨✨✨</div>
        </div>
    `;
}

// Format story text
function formatStoryText(text) {
    // Split into paragraphs and format
    const paragraphs = text.split('\n').filter(p => p.trim());
    return paragraphs.map(p => `<p class="story-paragraph">${escapeHtml(p.trim())}</p>`).join('');
}

// Toggle story reading (play/pause)
window.toggleStoryReading = function() {
    if (!currentStoryText) return;
    
    playSound('click');
    
    const readIcon = document.getElementById('read-icon');
    const readText = document.getElementById('read-text');
    const readBtn = document.getElementById('read-aloud-btn');
    
    if (isReading) {
        // Stop reading
        window.speechSynthesis.cancel();
        isReading = false;
        readIcon.textContent = '🔊';
        readText.textContent = 'اقرأ لي القصة';
        readBtn.classList.remove('story-btn-danger');
        readBtn.classList.add('story-btn-primary');
    } else {
        // Start reading
        const cleanText = currentStoryText.replace(/[^\u0600-\u06FF\s\.,!?]/g, '');
        
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            
            currentUtterance = new SpeechSynthesisUtterance(cleanText);
            currentUtterance.lang = 'ar-SA';
            currentUtterance.rate = 0.85;
            currentUtterance.pitch = 1.1;
            
            currentUtterance.onstart = function() {
                isReading = true;
                readIcon.textContent = '⏸️';
                readText.textContent = 'إيقاف القراءة';
                readBtn.classList.remove('story-btn-primary');
                readBtn.classList.add('story-btn-danger');
            };
            
            currentUtterance.onend = function() {
                isReading = false;
                readIcon.textContent = '🔊';
                readText.textContent = 'اقرأ لي القصة';
                readBtn.classList.remove('story-btn-danger');
                readBtn.classList.add('story-btn-primary');
            };
            
            currentUtterance.onerror = function() {
                isReading = false;
                readIcon.textContent = '🔊';
                readText.textContent = 'اقرأ لي القصة';
                readBtn.classList.remove('story-btn-danger');
                readBtn.classList.add('story-btn-primary');
            };
            
            window.speechSynthesis.speak(currentUtterance);
        } else {
            showToast('عذراً، متصفحك لا يدعم قراءة النصوص');
        }
    }
};

// Save story
window.saveStory = function() {
    if (!currentStoryText || !currentStoryTitle) return;
    
    playSound('click');
    
    const storyData = {
        title: currentStoryTitle,
        text: currentStoryText,
        date: new Date().toLocaleDateString('ar-SA')
    };
    
    // Save to localStorage
    let savedStories = JSON.parse(localStorage.getItem('savedStories') || '[]');
    savedStories.push(storyData);
    localStorage.setItem('savedStories', JSON.stringify(savedStories));
    
    showToast('✅ تم حفظ القصة بنجاح!');
};

// Print story
window.printStory = function() {
    if (!currentStoryText) return;
    
    playSound('click');
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
            <meta charset="UTF-8">
            <title>${currentStoryTitle}</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    direction: rtl;
                    text-align: right;
                    padding: 40px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                h1 {
                    color: #667eea;
                    text-align: center;
                    font-size: 2.5rem;
                    margin-bottom: 30px;
                    border-bottom: 3px solid #667eea;
                    padding-bottom: 15px;
                }
                p {
                    font-size: 1.3rem;
                    line-height: 2;
                    margin-bottom: 20px;
                    text-indent: 20px;
                }
                .footer {
                    margin-top: 50px;
                    text-align: center;
                    color: #999;
                    font-size: 1rem;
                }
            </style>
        </head>
        <body>
            <h1>${currentStoryTitle}</h1>
            <div>${formatStoryText(currentStoryText)}</div>
            <div class="footer">
                <p>طُبِعت في: ${new Date().toLocaleDateString('ar-SA')}</p>
                <p>📚 من تطبيق وقت القصة ✨</p>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
    }, 500);
};

// ==========================================
// Utility Functions
// ==========================================

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Export functions for use in main app
window.showSmartFriend = showSmartFriend;
window.showStoryTime = showStoryTime;