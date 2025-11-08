// Preloader and Theme Toggle
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader').style.display = 'none', 2000);
});
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
});

// Stress Quiz (for stress.html)
if (window.location.pathname.includes('stress.html')) {
    const questions = [
        { q: "How often do you feel overwhelmed?", a: ["Never (0)", "Sometimes (1)", "Often (2)", "Always (3)"] },
        { q: "How well do you sleep?", a: ["Very well (0)", "Okay (1)", "Poorly (2)", "Not at all (3)"] },
        { q: "Do you feel anxious daily?", a: ["No (0)", "Rarely (1)", "Often (2)", "Constantly (3)"] },
        { q: "How is your appetite?", a: ["Normal (0)", "Irregular (1)", "Low (2)", "No appetite (3)"] },
        { q: "Do you enjoy hobbies?", a: ["Yes (0)", "Sometimes (1)", "Rarely (2)", "No (3)"] },
        { q: "How's your energy level?", a: ["High (0)", "Moderate (1)", "Low (2)", "Exhausted (3)"] },
        { q: "Do you feel irritable?", a: ["No (0)", "Sometimes (1)", "Often (2)", "Always (3)"] },
        { q: "How do you handle stress?", a: ["Well (0)", "Okay (1)", "Poorly (2)", "Not at all (3)"] }
    ];
    let currentQuestion = 0, score = 0;
    function loadQuestion() {
        if (currentQuestion < questions.length) {
            const q = questions[currentQuestion];
            document.getElementById('question').textContent = q.q;
            const options = document.getElementById('options');
            options.innerHTML = '';
            q.a.forEach((ans, i) => {
                options.innerHTML += `<button onclick="selectAnswer(${i})" class="block w-full p-2 mb-2 bg-blue-100 dark:bg-gray-700 rounded">${ans}</button>`;
            });
        } else {
            showResult();
        }
    }
    function selectAnswer(idx) {
        score += idx;
        currentQuestion++;
        loadQuestion();
    }
    function showResult() {
        const level = score < 5 ? "Low" : score < 12 ? "Moderate" : "High";
        const advice = level === "Low" ? "Great! Keep maintaining balance." : level === "Moderate" ? "Consider relaxation techniques." : "Seek professional help.";
        document.getElementById('quiz').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
        document.getElementById('level').textContent = level;
        document.getElementById('advice').textContent = advice;
        localStorage.setItem('lastStressCheck', new Date().toISOString());
    }
    loadQuestion();
}

// Rotating Tips (for tips.html)
if (window.location.pathname.includes('tips.html')) {
    const tips = [
        "💡 Tip 1: Start Small - Set one small, achievable goal each day.",
        "☀️ Tip 2: Go Outside - A few minutes of sunlight improves serotonin.",
        "🧘‍♂️ Tip 3: Breathe Consciously - Inhale 4s, hold 4s, exhale 6s.",
        "💌 Tip 4: Write, Don’t Overthink - Journal your thoughts daily.",
        "📵 Tip 5: Limit Social Media - Try a digital detox.",
        "💬 Tip 6: Talk to Someone - Share with a trusted person.",
        "🎶 Tip 7: Listen to Soothing Music - Calm instrumental helps.",
        "🌼 Tip 8: Practice Gratitude - Write 3 things you're grateful for.",
        "🌙 Tip 9: Keep a Sleep Routine - Consistent sleep = better mood.",
        "🫶 Tip 10: Be Kind to Yourself - Self-compassion heals."
    ];
    let tipIndex = 0;
    setInterval(() => {
        document.getElementById('tip-display').textContent = tips[tipIndex];
        tipIndex = (tipIndex + 1) % tips.length;
    }, 5000);
}

// Motivational Quote (for motivation.html)
function generateQuote() {
    const quotes = [
        "Believe you can and you're halfway there. – Theodore Roosevelt",
        "The only way to do great work is to love what you do. – Steve Jobs",
        "You miss 100% of the shots you don't take. – Wayne Gretzky"
    ];
    document.getElementById('quote').textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

// Pomodoro Timer (for focus.html)
if (window.location.pathname.includes('focus.html')) {
    // DOM elements
    // Pomodoro Timer (for focus.html)
    const timerEl = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const musicSelect = document.getElementById('music');
    const lofiAudio = document.getElementById('lofiAudio');

    let timer = null;
    let timeLeft = 25 * 60;
    let isRunning = false;

    function formatTime(seconds) {
      const m = String(Math.floor(seconds / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      return `${m}:${s}`;
    }

    function updateTimerDisplay() {
      timerEl.textContent = formatTime(timeLeft);
    }

    function startTimer() {
      if (isRunning) return;
      isRunning = true;
      startBtn.disabled = true;
      startBtn.textContent = "Running...";

      if (musicSelect.value === 'lofi') {
        lofiAudio.play().catch((e) => {
          console.log('Audio play prevented by browser:', e);
        });
      }

      timer = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(timer);
          isRunning = false;
          startBtn.disabled = false;
          startBtn.textContent = "Start Pomodoro";
          if (musicSelect.value === 'lofi') {
            lofiAudio.pause();
            lofiAudio.currentTime = 0;
          }
          alert("Pomodoro session complete! Take a break.");
          timeLeft = 25 * 60;
          updateTimerDisplay();
          return;
        }
        timeLeft--;
        updateTimerDisplay();
      }, 1000);
    }

    startBtn.addEventListener('click', startTimer);

    musicSelect.addEventListener('change', () => {
      if (musicSelect.value === 'lofi' && isRunning) {
        lofiAudio.play().catch((e) => {
          console.log('Audio play prevented:', e);
        });
      } else {
        lofiAudio.pause();
        lofiAudio.currentTime = 0;
      }
    });

    updateTimerDisplay();
}

// Calm Sounds (for calm.html)
function playSound() {
    const audio = document.getElementById('calmSound');
    if (audio.paused) {
        audio.play().catch(error => {
            alert('Auto-play was prevented by your browser. Please interact with the page and try again.');
            console.error(error);
        });
    } else {
        audio.pause();
    }
}

// Journal (for journal.html)
if (window.location.pathname.includes('journal.html')) {
    function saveEntry() {
        const entry = document.getElementById('entry').value;
        if (entry) {
            const entries = JSON.parse(localStorage.getItem('journal') || '[]');
            entries.push({ date: new Date().toLocaleDateString(), text: entry });
            localStorage.setItem('journal', JSON.stringify(entries));
            loadEntries();
            document.getElementById('entry').value = '';
        }
    }
    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('journal') || '[]');
        document.getElementById('entries').innerHTML = entries.map(e => `<div class="p-4 bg-white dark:bg-gray-800 rounded">${e.date}: ${e.text}</div>`).join('');
    }
    loadEntries();
}

// Dashboard Stats (for dashboard.html)
if (window.location.pathname.includes('dashboard.html')) {
    const checkIns = JSON.parse(localStorage.getItem('journal') || '[]').length;
    document.getElementById('stats').textContent = `Check-ins this week: ${checkIns}`;
}

// Feedback (for feedback.html)
if (window.location.pathname.includes('feedback.html')) {
    function saveComment() {
        const comment = document.getElementById('comment').value;
        if (comment) {
            const comments = JSON.parse(localStorage.getItem('comments') || '[]');
            comments.push({ text: comment, date: new Date().toLocaleDateString() });
            localStorage.setItem('comments', JSON.stringify(comments));
            loadComments();
            document.getElementById('comment').value = '';
        }
    }
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        document.getElementById('comments').innerHTML = comments.map(c => `<div class="p-4 bg-white dark:bg-gray-800 rounded">${c.date}: ${c.text}</div>`).join('');
    }
    loadComments();
    const audio = document.getElementById('calmSound');
const playBtn = document.getElementById('playBtn');

function playSound() {
  if (audio.paused) {
    audio.play()
      .then(() => {
        playBtn.textContent = "Pause Calming Sounds";
      })
      .catch((error) => {
        alert('Auto-play was prevented by your browser. Please interact with the page and try again.');
        console.error(error);
      });
  } else {
    audio.pause();
    playBtn.textContent = "Play Calming Sounds";
  }
}
// DOM elements
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const musicSelect = document.getElementById('music');
const lofiAudio = document.getElementById('lofiAudio');

let timer; // interval reference
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;

// Format time as mm:ss
function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function updateTimerDisplay() {
  timerEl.textContent = formatTime(timeLeft);
}

function startTimer() {
  if (isRunning) return; // Prevent multiple timers
  isRunning = true;
  startBtn.disabled = true;
  startBtn.textContent = "Running...";

  // Play music if Lo-Fi selected and user interaction given
  if (musicSelect.value === 'lofi') {
    lofiAudio.play().catch((e) => {
      console.log('Audio play prevented by browser:', e);
    });
  }

  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      startBtn.disabled = false;
      startBtn.textContent = "Start Pomodoro";

      // Stop music at end of timer
      if (musicSelect.value === 'lofi') {
        lofiAudio.pause();
        lofiAudio.currentTime = 0;
      }
      alert("Pomodoro session complete! Take a break.");
      timeLeft = 25 * 60;
      updateTimerDisplay();
      return;
    }

    timeLeft--;
    updateTimerDisplay();
  }, 1000);
}

// Listen for Start button click
startBtn.addEventListener('click', startTimer);

// Handle music selection changes
musicSelect.addEventListener('change', () => {
  if (musicSelect.value === 'lofi' && isRunning) {
    lofiAudio.play().catch((e) => {
      console.log('Audio play prevented:', e);
    });
  } else {
    lofiAudio.pause();
    lofiAudio.currentTime = 0;
  }
});

// Initialize timer display on page load
updateTimerDisplay();

// OPTIONAL: Theme toggle handling (if using your theme toggle button)
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
});
}