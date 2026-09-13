/**
 * UNIVERSAL GAME ENGINE — LUXURY COCKTAIL LOUNGE EDITION
 * Preserves 100% of underlying game rules, storage, and navigation.
 * Upgrades audio synthesizer and ambient animated garnish particles.
 */
(function () {
  'use strict';

  const CONFIG = {
    csvPath: './puzzles.csv',
    storageKey: 'cocktail_universal_daily_quiz_state',
    storageVersion: 1,
    homeUrl: 'https://tileworksgamesstudio.github.io/86/'
  };

  // --- 12 SIGNATURE COCKTAIL GARNISH SILHOUETTES ---
  const GARNISH_IDS = [
    'garnish-orange-twist',
    'garnish-lemon-twist',
    'garnish-lime-wheel',
    'garnish-lemon-wheel',
    'garnish-dehydrated-orange',
    'garnish-dehydrated-lemon',
    'garnish-cocktail-cherry',
    'garnish-cherry-pair',
    'garnish-mint-sprig',
    'garnish-rosemary-sprig',
    'garnish-olive-pick',
    'garnish-cucumber-ribbon'
  ];

  // --- AMBIENT GARNISH PARTICLE ENGINE ---
  class AmbientGarnishManager {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.activeCount = 0;
      this.maxParticles = window.innerWidth < 600 ? 9 : 16;
      this.timer = null;
      this.depthClasses = ['garnish-depth-distant', 'garnish-depth-middle', 'garnish-depth-near'];

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced && this.container) {
        this.start();
      }
    }

    start() {
      // Initial staggered launch
      for (let i = 0; i < 6; i++) {
        setTimeout(() => this.spawn(), i * 650);
      }
      this.loop();
    }

    loop() {
      const nextDelay = 1400 + Math.random() * 2400;
      this.timer = setTimeout(() => {
        if (this.activeCount < this.maxParticles) {
          this.spawn();
        }
        this.loop();
      }, nextDelay);
    }

    spawn() {
      if (!this.container) return;

      const garnish = document.createElement('div');
      garnish.className = 'floating-garnish';

      const typeId = GARNISH_IDS[Math.floor(Math.random() * GARNISH_IDS.length)];
      const depthIndex = Math.floor(Math.random() * this.depthClasses.length);
      const depthClass = this.depthClasses[depthIndex];
      garnish.classList.add(depthClass);

      // Depth parameters
      let baseSize = 28;
      let duration = 22;
      let targetOpacity = 0.35;

      if (depthIndex === 0) { // Distant
        baseSize = 20 + Math.random() * 8;
        duration = 24 + Math.random() * 12;
        targetOpacity = 0.18 + Math.random() * 0.1;
      } else if (depthIndex === 1) { // Middle
        baseSize = 30 + Math.random() * 10;
        duration = 18 + Math.random() * 8;
        targetOpacity = 0.32 + Math.random() * 0.14;
      } else { // Near
        baseSize = 40 + Math.random() * 14;
        duration = 14 + Math.random() * 6;
        targetOpacity = 0.45 + Math.random() * 0.15;
      }

      const leftPercent = 3 + Math.random() * 92;
      const driftX = (Math.random() - 0.5) * 80;
      const startRot = Math.random() * 360;
      const endRot = startRot + (Math.random() > 0.5 ? 90 : -90) + (Math.random() * 60 - 30);

      garnish.style.left = `${leftPercent}%`;
      garnish.style.width = `${baseSize}px`;
      garnish.style.height = `${baseSize}px`;
      garnish.style.setProperty('--drift-x', `${driftX}px`);
      garnish.style.setProperty('--start-rot', `${startRot}deg`);
      garnish.style.setProperty('--end-rot', `${endRot}deg`);
      garnish.style.setProperty('--target-opacity', targetOpacity);
      garnish.style.animationDuration = `${duration}s`;

      garnish.innerHTML = `<svg viewBox="0 0 48 48"><use href="#${typeId}"></use></svg>`;

      garnish.addEventListener('animationend', () => {
        if (garnish.parentNode) {
          garnish.parentNode.removeChild(garnish);
        }
        this.activeCount--;
      });

      this.container.appendChild(garnish);
      this.activeCount++;
    }
  }

  // --- RESTRAINED CRYSTAL & BRASS AUDIO FEEDBACK ---
  class SoundManager {
    constructor(enabled = true) {
      this.enabled = enabled;
      this.ctx = null;
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    tone(freq, type = 'sine', duration = 0.1, gainVal = 0.08) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Audio failures handled silently
      }
    }

    // Polished cocktail glass / brass button tap
    tap() {
      this.tone(640, 'triangle', 0.04, 0.04);
    }

    // High crystalline two-tone chime for correct answers
    correct() {
      this.tone(659.25, 'sine', 0.12, 0.07); // E5
      setTimeout(() => this.tone(987.77, 'sine', 0.22, 0.08), 85); // B5
    }

    // Soft muted velvet timbre for incorrect answers
    incorrect() {
      this.tone(196.00, 'triangle', 0.18, 0.06);
    }

    // Elegant multi-tiered reserve celebration chime
    complete() {
      [587.33, 739.99, 880.00, 1174.66].forEach((f, i) => {
        setTimeout(() => this.tone(f, 'sine', 0.28, 0.07), i * 110);
      });
    }
  }

  // --- DEFENSIVE LOCAL STORAGE SYSTEM ---
  const Storage = {
    load() {
      const fallback = {
        version: CONFIG.storageVersion,
        sound: true,
        streak: 0,
        lastCompletedDate: null,
        history: {},
        inProgress: null
      };

      try {
        const raw = localStorage.getItem(CONFIG.storageKey);
        if (!raw) return fallback;
        const parsed = JSON.parse(raw);
        if (typeof parsed !== 'object' || parsed === null) return fallback;
        return {
          version: parsed.version || CONFIG.storageVersion,
          sound: typeof parsed.sound === 'boolean' ? parsed.sound : true,
          streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
          lastCompletedDate: parsed.lastCompletedDate || null,
          history: parsed.history && typeof parsed.history === 'object' ? parsed.history : {},
          inProgress: parsed.inProgress && typeof parsed.inProgress === 'object' ? parsed.inProgress : null
        };
      } catch (e) {
        return fallback;
      }
    },
    save(state) {
      try {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
      } catch (e) {
        // Defensive failure handling
      }
    }
  };

  // --- ROBUST RFC 4180 CSV PARSER ---
  function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      const next = text[i + 1];

      if (c === '"') {
        if (inQuotes && next === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        row.push(field.trim());
        field = '';
      } else if ((c === '\n' || (c === '\r' && next === '\n')) && !inQuotes) {
        if (c === '\r') i++;
        row.push(field.trim());
        rows.push(row);
        row = [];
        field = '';
      } else {
        field += c;
      }
    }
    if (field || row.length > 0) {
      row.push(field.trim());
      rows.push(row);
    }

    if (rows.length < 2) throw new Error('Data format invalid or missing.');
    const headers = rows[0].map(h => h.toLowerCase());
    const records = [];

    for (let i = 1; i < rows.length; i++) {
      if (rows[i].length === 1 && rows[i][0] === '') continue;
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = rows[i][idx] !== undefined ? rows[i][idx] : '';
      });
      records.push(obj);
    }
    return records;
  }

  // --- DATE RESOLUTION ---
  async function getTodayDateString() {
    try {
      const res = await fetch(window.location.href.split('#')[0].split('?')[0] + '?_t=' + Date.now(), {
        method: 'HEAD',
        cache: 'no-store'
      });
      const header = res.headers.get('Date');
      if (header) {
        const d = new Date(header);
        if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
      }
    } catch (e) {}
    return new Date().toISOString().split('T')[0];
  }

  function resolveAnswerIndex(val) {
    const clean = String(val).trim().toUpperCase();
    if (clean === 'A' || clean === '0') return 0;
    if (clean === 'B' || clean === '1') return 1;
    if (clean === 'C' || clean === '2') return 2;
    if (clean === 'D' || clean === '3') return 3;
    return 0;
  }

  // --- APPLICATION CONTROLLER ---
  class UniversalQuiz {
    constructor() {
      this.state = Storage.load();
      this.sound = new SoundManager(this.state.sound);
      this.roundsByDate = {};
      this.currentDate = null;
      this.vaultDates = [];

      this.activeRound = null;
      this.currentIndex = 0;
      this.sessionAnswers = [];
      this.isReview = false;
      this.selectedAnswer = null;

      this.cacheDom();
      this.bindEvents();
      this.updateSoundButton();
      this.garnishEngine = new AmbientGarnishManager('garnishContainer');
      this.init();
    }

    cacheDom() {
      this.dom = {
        appHeaderTitle: document.getElementById('appHeaderTitle'),
        headerBackBtn: document.getElementById('headerBackBtn'),
        soundToggleBtn: document.getElementById('soundToggleBtn'),
        statusView: document.getElementById('statusView'),
        statusTitle: document.getElementById('statusTitle'),
        statusMessage: document.getElementById('statusMessage'),
        statusRetryBtn: document.getElementById('statusRetryBtn'),
        menuView: document.getElementById('menuView'),
        menuTodayDate: document.getElementById('menuTodayDate'),
        menuTodayStatus: document.getElementById('menuTodayStatus'),
        menuStreakCount: document.getElementById('menuStreakCount'),
        playTodayBtn: document.getElementById('playTodayBtn'),
        vaultCountBadge: document.getElementById('vaultCountBadge'),
        openVaultBtn: document.getElementById('openVaultBtn'),
        homeBtn: document.getElementById('homeBtn'),
        gameView: document.getElementById('gameView'),
        gameModeLabel: document.getElementById('gameModeLabel'),
        stepperTrack: document.getElementById('stepperTrack'),
        questionText: document.getElementById('questionText'),
        optionsContainer: document.getElementById('optionsContainer'),
        explanationPanel: document.getElementById('explanationPanel'),
        answerIndicator: document.getElementById('answerIndicator'),
        explanationText: document.getElementById('explanationText'),
        nextQuestionBtn: document.getElementById('nextQuestionBtn'),
        resultsView: document.getElementById('resultsView'),
        scoreValue: document.getElementById('scoreValue'),
        scoreTotal: document.getElementById('scoreTotal'),
        resultsBreakdown: document.getElementById('resultsBreakdown'),
        shareScoreBtn: document.getElementById('shareScoreBtn'),
        reviewQuizBtn: document.getElementById('reviewQuizBtn'),
        resultsVaultBtn: document.getElementById('resultsVaultBtn'),
        resultsMenuBtn: document.getElementById('resultsMenuBtn'),
        vaultView: document.getElementById('vaultView'),
        vaultList: document.getElementById('vaultList'),
        vaultEmptyMsg: document.getElementById('vaultEmptyMsg'),
        toastMessage: document.getElementById('toastMessage')
      };
    }

    bindEvents() {
      this.dom.soundToggleBtn.addEventListener('click', () => {
        this.sound.enabled = !this.sound.enabled;
        this.state.sound = this.sound.enabled;
        Storage.save(this.state);
        this.updateSoundButton();
        this.sound.tap();
      });

      this.dom.headerBackBtn.addEventListener('click', () => {
        this.sound.tap();
        this.showView('menuView');
      });

      this.dom.statusRetryBtn.addEventListener('click', () => {
        this.sound.tap();
        this.init();
      });

      this.dom.playTodayBtn.addEventListener('click', () => {
        this.sound.tap();
        this.startRound(this.currentDate);
      });

      this.dom.openVaultBtn.addEventListener('click', () => {
        this.sound.tap();
        this.renderVault();
      });

      this.dom.homeBtn.addEventListener('click', () => {
        this.sound.tap();
        window.location.href = CONFIG.homeUrl;
      });

      this.dom.nextQuestionBtn.addEventListener('click', () => {
        this.sound.tap();
        this.handleNextQuestion();
      });

      this.dom.shareScoreBtn.addEventListener('click', () => this.shareResults());

      this.dom.reviewQuizBtn.addEventListener('click', () => {
        this.sound.tap();
        this.startReview();
      });

      this.dom.resultsVaultBtn.addEventListener('click', () => {
        this.sound.tap();
        this.renderVault();
      });

      this.dom.resultsMenuBtn.addEventListener('click', () => {
        this.sound.tap();
        this.showView('menuView');
      });
    }

    updateSoundButton() {
      const display = this.dom.soundToggleBtn.querySelector('.sound-icon-display');
      if (display) {
        display.textContent = this.sound.enabled ? '🔊' : '🔇';
      } else {
        this.dom.soundToggleBtn.textContent = this.sound.enabled ? '🔊' : '🔇';
      }
    }

    showView(viewName) {
      const views = ['statusView', 'menuView', 'gameView', 'resultsView', 'vaultView'];
      views.forEach(v => this.dom[v].classList.add('hidden'));
      this.dom[viewName].classList.remove('hidden');

      if (viewName === 'menuView') {
        this.dom.appHeaderTitle.textContent = 'Daily Quiz';
        this.dom.headerBackBtn.classList.add('hidden');
        this.renderMenu();
      } else if (viewName === 'gameView') {
        this.dom.appHeaderTitle.textContent = this.activeRound
          ? (this.activeRound.date === this.currentDate ? 'Daily Tasting' : `Reserve: ${this.activeRound.date}`)
          : 'Quiz';
        this.dom.headerBackBtn.classList.remove('hidden');
      } else if (viewName === 'vaultView') {
        this.dom.appHeaderTitle.textContent = 'The Vault';
        this.dom.headerBackBtn.classList.remove('hidden');
      } else {
        this.dom.appHeaderTitle.textContent = 'Daily Quiz';
        this.dom.headerBackBtn.classList.remove('hidden');
      }
      window.scrollTo(0, 0);
    }

    async init() {
      this.dom.statusTitle.textContent = 'Preparing Vintage';
      this.dom.statusMessage.textContent = 'Decanting puzzle data...';
      this.dom.statusRetryBtn.classList.add('hidden');
      this.showView('statusView');
      this.dom.headerBackBtn.classList.add('hidden');

      try {
        const [csvRes, todayStr] = await Promise.all([
          fetch(CONFIG.csvPath, { cache: 'no-store' }),
          getTodayDateString()
        ]);

        if (!csvRes.ok) throw new Error('Could not load puzzles.csv.');
        const csvText = await csvRes.text();
        const records = parseCsv(csvText);

        this.roundsByDate = {};
        records.forEach(row => {
          if (!row.date) return;
          if (!this.roundsByDate[row.date]) this.roundsByDate[row.date] = [];
          this.roundsByDate[row.date].push({
            question: row.question || 'Question text missing.',
            options: [
              row.option_a || 'Option A',
              row.option_b || 'Option B',
              row.option_c || 'Option C',
              row.option_d || 'Option D'
            ],
            answerIndex: resolveAnswerIndex(row.answer),
            explanation: row.explanation || ''
          });
        });

        const allDates = Object.keys(this.roundsByDate).sort();
        if (allDates.length === 0) throw new Error('No puzzle records found.');

        if (this.roundsByDate[todayStr]) {
          this.currentDate = todayStr;
          this.vaultDates = allDates.filter(d => d < todayStr);
        } else {
          const available = allDates.filter(d => d <= todayStr);
          if (available.length > 0) {
            this.currentDate = available[available.length - 1];
            this.vaultDates = available.slice(0, -1);
          } else {
            this.currentDate = allDates[0];
            this.vaultDates = [];
          }
        }

        this.vaultDates.sort((a, b) => b.localeCompare(a));
        this.showView('menuView');

      } catch (err) {
        this.dom.statusTitle.textContent = 'Notice';
        this.dom.statusMessage.textContent = err.message || 'Unable to load puzzle at this time.';
        this.dom.statusRetryBtn.classList.remove('hidden');
        this.showView('statusView');
      }
    }

    renderMenu() {
      this.dom.menuStreakCount.textContent = this.state.streak || 0;
      this.dom.vaultCountBadge.textContent = this.vaultDates.length;

      if (!this.currentDate) {
        this.dom.menuTodayDate.textContent = 'Unavailable';
        this.dom.menuTodayStatus.textContent = 'Unavailable';
        this.dom.playTodayBtn.disabled = true;
        return;
      }

      this.dom.menuTodayDate.textContent = `Date: ${this.currentDate}`;
      this.dom.playTodayBtn.disabled = false;

      const historyItem = this.state.history[this.currentDate];
      const inProgressItem = this.state.inProgress && this.state.inProgress.date === this.currentDate;

      if (historyItem && historyItem.completed) {
        this.dom.menuTodayStatus.textContent = `Completed (${historyItem.score}/${historyItem.answers.length})`;
        this.dom.menuTodayStatus.className = 'badge completed';
        this.dom.playTodayBtn.textContent = 'View Results';
      } else if (inProgressItem) {
        const currentCount = inProgressItem.answers ? inProgressItem.answers.length : 0;
        const totalCount = this.roundsByDate[this.currentDate].length;
        this.dom.menuTodayStatus.textContent = `In Progress (${currentCount}/${totalCount})`;
        this.dom.menuTodayStatus.className = 'badge';
        this.dom.playTodayBtn.textContent = 'Resume';
      } else {
        this.dom.menuTodayStatus.textContent = 'Not Started';
        this.dom.menuTodayStatus.className = 'badge';
        this.dom.playTodayBtn.textContent = 'Play';
      }
    }

    startRound(dateStr) {
      const questions = this.roundsByDate[dateStr];
      if (!questions || questions.length === 0) return;

      this.activeRound = { date: dateStr, questions: questions };
      this.isReview = false;
      this.selectedAnswer = null;

      const savedHistory = this.state.history[dateStr];
      if (savedHistory && savedHistory.completed) {
        this.sessionAnswers = savedHistory.answers;
        this.showResults(savedHistory.score);
        return;
      }

      const isCurrent = (dateStr === this.currentDate);
      if (isCurrent && this.state.inProgress && this.state.inProgress.date === dateStr) {
        this.currentIndex = this.state.inProgress.currentIndex || 0;
        this.sessionAnswers = this.state.inProgress.answers || [];
      } else {
        this.currentIndex = 0;
        this.sessionAnswers = [];
      }

      this.dom.gameModeLabel.textContent = isCurrent ? `Today (${dateStr})` : `Reserve (${dateStr})`;
      this.showView('gameView');
      this.renderQuestion();
    }

    renderQuestion() {
      const q = this.activeRound.questions[this.currentIndex];
      this.selectedAnswer = null;

      this.dom.questionText.textContent = q.question;
      this.dom.explanationPanel.classList.add('hidden');
      this.dom.optionsContainer.innerHTML = '';
      this.updateStepper();

      const labels = ['A', 'B', 'C', 'D'];
      q.options.forEach((text, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.setAttribute('role', 'radio');
        btn.setAttribute('aria-checked', 'false');
        btn.innerHTML = `<span class="option-key">${labels[idx]}</span><span>${text}</span>`;
        btn.addEventListener('click', () => this.selectOption(idx));
        this.dom.optionsContainer.appendChild(btn);
      });

      const isLast = (this.currentIndex === this.activeRound.questions.length - 1);
      this.dom.nextQuestionBtn.textContent = isLast ? 'Complete Tasting' : 'Next Question';
    }

    updateStepper() {
      this.dom.stepperTrack.innerHTML = '';
      this.activeRound.questions.forEach((_, idx) => {
        const pip = document.createElement('div');
        pip.className = 'step-pip';
        pip.textContent = idx + 1;
        pip.setAttribute('aria-label', `Question ${idx + 1}`);

        if (idx === this.currentIndex) {
          pip.classList.add('current');
        } else if (idx < this.sessionAnswers.length) {
          const correct = this.sessionAnswers[idx].isCorrect;
          pip.classList.add(correct ? 'correct' : 'incorrect');
        }
        this.dom.stepperTrack.appendChild(pip);
      });
    }

    selectOption(idx) {
      if (this.selectedAnswer !== null) return;
      this.selectedAnswer = idx;

      const q = this.activeRound.questions[this.currentIndex];
      const isCorrect = (idx === q.answerIndex);
      this.sessionAnswers.push({ chosen: idx, isCorrect });

      if (isCorrect) {
        this.sound.correct();
        this.dom.answerIndicator.textContent = '✓ Correct';
        this.dom.answerIndicator.className = 'answer-badge correct';
      } else {
        this.sound.incorrect();
        this.dom.answerIndicator.textContent = '✕ Incorrect';
        this.dom.answerIndicator.className = 'answer-badge incorrect';
      }

      const buttons = this.dom.optionsContainer.querySelectorAll('.option-btn');
      buttons.forEach((btn, bIdx) => {
        btn.disabled = true;
        if (bIdx === q.answerIndex) {
          btn.classList.add('correct');
        } else if (bIdx === idx && !isCorrect) {
          btn.classList.add('incorrect');
        }
        if (bIdx === idx) {
          btn.setAttribute('aria-checked', 'true');
        }
      });

      this.dom.explanationText.textContent = q.explanation || 'No further explanation provided.';
      this.dom.explanationPanel.classList.remove('hidden');
      this.updateStepper();

      if (this.activeRound.date === this.currentDate) {
        this.state.inProgress = {
          date: this.currentDate,
          currentIndex: this.currentIndex,
          answers: this.sessionAnswers
        };
        Storage.save(this.state);
      }

      this.dom.nextQuestionBtn.focus();
    }

    handleNextQuestion() {
      if (this.isReview) {
        if (this.currentIndex < this.activeRound.questions.length - 1) {
          this.currentIndex++;
          this.renderReviewQuestion();
        } else {
          this.showView('resultsView');
        }
        return;
      }

      if (this.currentIndex < this.activeRound.questions.length - 1) {
        this.currentIndex++;
        if (this.activeRound.date === this.currentDate && this.state.inProgress) {
          this.state.inProgress.currentIndex = this.currentIndex;
          Storage.save(this.state);
        }
        this.renderQuestion();
      } else {
        this.finishRound();
      }
    }

    finishRound() {
      const score = this.sessionAnswers.filter(a => a.isCorrect).length;
      const isCurrent = (this.activeRound.date === this.currentDate);

      if (isCurrent) {
        if (this.state.lastCompletedDate) {
          const last = new Date(this.state.lastCompletedDate);
          const curr = new Date(this.currentDate);
          const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            this.state.streak = (this.state.streak || 0) + 1;
          } else if (diffDays > 1) {
            this.state.streak = 1;
          }
        } else {
          this.state.streak = 1;
        }
        this.state.lastCompletedDate = this.currentDate;
        this.state.inProgress = null;
      }

      this.state.history[this.activeRound.date] = {
        completed: true,
        score: score,
        answers: this.sessionAnswers
      };
      Storage.save(this.state);

      this.sound.complete();
      this.showResults(score);
    }

    showResults(score) {
      this.showView('resultsView');
      const total = this.sessionAnswers.length;
      this.dom.scoreValue.textContent = score;
      this.dom.scoreTotal.textContent = `/ ${total}`;

      this.dom.resultsBreakdown.innerHTML = '';
      this.sessionAnswers.forEach((ans, idx) => {
        const pip = document.createElement('div');
        pip.className = `result-pip ${ans.isCorrect ? 'correct' : 'incorrect'}`;
        pip.textContent = ans.isCorrect ? '✓' : '✕';
        pip.setAttribute('aria-label', `Question ${idx + 1}: ${ans.isCorrect ? 'Correct' : 'Incorrect'}`);
        this.dom.resultsBreakdown.appendChild(pip);
      });
    }

    startReview() {
      this.isReview = true;
      this.currentIndex = 0;
      this.showView('gameView');
      this.renderReviewQuestion();
    }

    renderReviewQuestion() {
      const q = this.activeRound.questions[this.currentIndex];
      const ans = this.sessionAnswers[this.currentIndex] || { chosen: -1, isCorrect: false };
      this.updateStepper();

      this.dom.questionText.textContent = q.question;
      this.dom.optionsContainer.innerHTML = '';
      const labels = ['A', 'B', 'C', 'D'];

      q.options.forEach((text, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.disabled = true;
        if (idx === q.answerIndex) {
          btn.classList.add('correct');
        } else if (idx === ans.chosen && !ans.isCorrect) {
          btn.classList.add('incorrect');
        }
        btn.innerHTML = `<span class="option-key">${labels[idx]}</span><span>${text}</span>`;
        this.dom.optionsContainer.appendChild(btn);
      });

      if (ans.isCorrect) {
        this.dom.answerIndicator.textContent = '✓ Correct';
        this.dom.answerIndicator.className = 'answer-badge correct';
      } else {
        this.dom.answerIndicator.textContent = '✕ Incorrect';
        this.dom.answerIndicator.className = 'answer-badge incorrect';
      }

      this.dom.explanationText.textContent = q.explanation || 'No further explanation provided.';
      this.dom.explanationPanel.classList.remove('hidden');

      const isLast = (this.currentIndex === this.activeRound.questions.length - 1);
      this.dom.nextQuestionBtn.textContent = isLast ? 'Return to Results' : 'Next Question';
    }

    renderVault() {
      this.showView('vaultView');
      this.dom.vaultList.innerHTML = '';

      if (this.vaultDates.length === 0) {
        this.dom.vaultEmptyMsg.classList.remove('hidden');
        return;
      }
      this.dom.vaultEmptyMsg.classList.add('hidden');

      this.vaultDates.forEach(dateStr => {
        const item = document.createElement('div');
        item.className = 'vault-item';
        item.setAttribute('role', 'listitem');
        item.tabIndex = 0;

        const hist = this.state.history[dateStr];
        const isDone = hist && hist.completed;

        item.innerHTML = `
          <span class="vault-date">${dateStr}</span>
          <span class="badge ${isDone ? 'completed' : ''}">
            ${isDone ? `Score: ${hist.score}/${hist.answers.length}` : 'Play'}
          </span>
        `;

        const playAction = () => {
          this.sound.tap();
          this.startRound(dateStr);
        };

        item.addEventListener('click', playAction);
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            playAction();
          }
        });

        this.dom.vaultList.appendChild(item);
      });
    }

    shareResults() {
      const score = this.sessionAnswers.filter(a => a.isCorrect).length;
      const total = this.sessionAnswers.length;
      const icons = this.sessionAnswers.map(a => a.isCorrect ? '🥃' : '▫️').join('');
      const text = `Daily Quiz • ${this.activeRound.date}\nTasting Score: ${score}/${total}\n${icons}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => this.showToast('Copied to lounge clipboard!'))
          .catch(() => this.showToast('Unable to copy.'));
      } else {
        this.showToast('Sharing not supported on this browser.');
      }
    }

    showToast(msg) {
      this.dom.toastMessage.textContent = msg;
      this.dom.toastMessage.classList.add('visible');
      setTimeout(() => this.dom.toastMessage.classList.remove('visible'), 2400);
    }
  }

  document.addEventListener('DOMContentLoaded', () => new UniversalQuiz());
})();