/**
 * COCKTAIL DIGEST — CORE PRODUCTION ENGINE
 */

(function () {
  'use strict';

  // --- CONFIGURATION ---
  const CONFIG = {
    csvPath: './puzzles.csv',
    anchorReleaseDate: '2026-09-08',
    releaseTimeZone: 'Europe/London',
    storageKey: 'COCKTAIL_DIGEST_TRIVIA_V3'
  };

  // --- AUDIO FX ---
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    }
    playTone(freq, type, duration, vol, rampTime = 0.05) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    }
    playTap() { this.playTone(320, 'triangle', 0.1, 0.15); }
    playCorrect() { [523.25, 659.25, 783.99].forEach((f, i) => setTimeout(() => this.playTone(f, 'sine', 0.4, 0.2), i * 60)); }
    playIncorrect() { this.playTone(196, 'sawtooth', 0.2, 0.15); }
    playComplete() { [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => setTimeout(() => this.playTone(f, 'sine', 0.5, 0.2), i * 80)); }
  }

  // --- STORAGE ---
  class StorageManager {
    static load() {
      try {
        const raw = localStorage.getItem(CONFIG.storageKey);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return { soundEnabled: true, streak: 0, lastCompletedDate: null, history: {}, inProgress: null };
    }
    static save(state) {
      try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(state)); } catch (e) {}
    }
  }

  // --- CSV PARSER ---
  class CsvParser {
    static parse(csvText) {
      const rows = [];
      let currentRow = [];
      let currentVal = '';
      let inQuotes = false;
      
      for (let i = 0; i < csvText.length; i++) {
        const c = csvText[i];
        const next = csvText[i + 1];
        if (c === '"') {
          if (inQuotes && next === '"') { currentVal += '"'; i++; }
          else { inQuotes = !inQuotes; }
        } else if (c === ',' && !inQuotes) {
          currentRow.push(currentVal.trim());
          currentVal = '';
        } else if ((c === '\n' || (c === '\r' && next === '\n')) && !inQuotes) {
          if (c === '\r') i++;
          currentRow.push(currentVal.trim());
          rows.push(currentRow);
          currentRow = [];
          currentVal = '';
        } else {
          currentVal += c;
        }
      }
      if (currentVal || currentRow.length > 0) {
        currentRow.push(currentVal.trim());
        rows.push(currentRow);
      }
      
      if (rows.length < 2) throw new Error("CSV contains insufficient data.");
      
      const headers = rows[0];
      if (headers[0] !== 'release_date') throw new Error("First CSV column must be release_date.");
      
      const data = [];
      for (let i = 1; i < rows.length; i++) {
        if (rows[i].length === 1 && rows[i][0] === '') continue; // Skip empty trailing lines
        if (rows[i].length !== headers.length) throw new Error(`Row ${i+1} length mismatch.`);
        const obj = {};
        headers.forEach((h, idx) => { obj[h] = rows[i][idx]; });
        data.push(obj);
      }
      return data;
    }
  }

  // --- TIME AUTHORITY ---
  class TimeService {
    static async getUkReleaseDate() {
      const url = window.location.href.split('#')[0].split('?')[0];
      const fetchUrl = `${url}?_t=${Date.now()}`;
      
      const response = await fetch(fetchUrl, { method: 'GET', cache: 'no-store' });
      const dateHeader = response.headers.get('Date');
      if (!dateHeader) throw new Error("Missing Date header from authority.");
      
      const absoluteTime = new Date(dateHeader);
      if (isNaN(absoluteTime.getTime())) throw new Error("Invalid Date header payload.");

      const formatter = new Intl.DateTimeFormat('sv-SE', {
        timeZone: CONFIG.releaseTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      return formatter.format(absoluteTime); // Formats exactly as YYYY-MM-DD
    }
  }

  // --- PROCEDURAL GARNISH ---
  class GarnishBackgroundSystem {
    constructor(containerEl) {
      this.container = containerEl;
      this.activeIcons = [];
      this.mode = 'menu';
      this.isRunning = false;
      this.iconSvgs = [
        `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="50" cy="50" r="46"/><circle cx="50" cy="50" r="41" stroke-dasharray="3 3"/><circle cx="50" cy="50" r="6"/><path d="M50 14 L50 44 M50 56 L50 86 M14 50 L44 50 M56 50 L86 50"/></svg>`,
        `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><path d="M22 18 C38 8, 76 12, 78 34 C80 52, 48 54, 38 64 C26 76, 44 90, 68 86 C82 84, 88 74, 88 70"/></svg>`
      ];
    }
    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.scheduleNext();
    }
    setMode(mode) { this.mode = mode; }
    scheduleNext() {
      if (!this.isRunning) return;
      const targetMax = this.mode === 'menu' ? 3 : 1;
      setTimeout(() => {
        if (this.activeIcons.length < targetMax) this.spawnIcon();
        this.scheduleNext();
      }, Math.floor(Math.random() * 3000) + 2000);
    }
    spawnIcon() {
      if (!this.container) return;
      const el = document.createElement('div');
      el.className = 'floating-garnish-item';
      el.innerHTML = this.iconSvgs[Math.floor(Math.random() * this.iconSvgs.length)];
      
      const size = Math.floor(Math.random() * 30) + 50;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${Math.floor(Math.random() * 80) + 10}%`;
      el.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 60}px`);
      el.style.setProperty('--start-rot', `${Math.floor(Math.random() * 360)}deg`);
      
      this.container.appendChild(el);
      this.activeIcons.push(el);
      el.addEventListener('animationend', () => {
        if (el.parentNode) el.parentNode.removeChild(el);
        this.activeIcons = this.activeIcons.filter(i => i !== el);
      }, { once: true });
    }
  }

  // --- APPLICATION ENGINE ---
  class AppEngine {
    constructor() {
      this.sound = new SoundFX();
      this.state = StorageManager.load();
      this.sound.enabled = this.state.soundEnabled;
      
      this.releaseState = { past: [], current: null, future: [] };
      this.activeFlight = null;
      this.currentQuestionIdx = 0;
      this.sessionAnswers = [];
      this.isReviewMode = false;

      this.dom = {
        headerBackBtn: document.getElementById('headerBackBtn'),
        soundToggleBtn: document.getElementById('soundToggleBtn'),
        soundIconOn: document.getElementById('soundIconOn'),
        soundIconOff: document.getElementById('soundIconOff'),
        systemStateView: document.getElementById('systemStateView'),
        systemStateTitle: document.getElementById('systemStateTitle'),
        systemStateDesc: document.getElementById('systemStateDesc'),
        systemRetryBtn: document.getElementById('systemRetryBtn'),
        menuView: document.getElementById('menuView'),
        menuTodayFlightTitle: document.getElementById('menuTodayFlightTitle'),
        menuTodayStatusText: document.getElementById('menuTodayStatusText'),
        menuStreakVal: document.getElementById('menuStreakVal'),
        menuStartTodayBtn: document.getElementById('menuStartTodayBtn'),
        menuVaultCountBadge: document.getElementById('menuVaultCountBadge'),
        menuOpenVaultBtn: document.getElementById('menuOpenVaultBtn'),
        gameView: document.getElementById('gameView'),
        flightDayLabel: document.getElementById('flightDayLabel'),
        flightStepper: document.getElementById('flightStepper'),
        stepPips: document.querySelectorAll('.step-pip'),
        curriculumBadge: document.getElementById('curriculumBadge'),
        difficultyBadge: document.getElementById('difficultyBadge'),
        questionText: document.getElementById('questionText'),
        optionsGrid: document.getElementById('optionsGrid'),
        barNotePanel: document.getElementById('barNotePanel'),
        barNoteText: document.getElementById('barNoteText'),
        nextQuestionBtn: document.getElementById('nextQuestionBtn'),
        resultsView: document.getElementById('resultsView'),
        finalScoreVal: document.getElementById('finalScoreVal'),
        scorePillList: document.getElementById('scorePillList'),
        shareScoreBtn: document.getElementById('shareScoreBtn'),
        reviewFlightBtn: document.getElementById('reviewFlightBtn'),
        goToVaultBtn: document.getElementById('goToVaultBtn'),
        returnToMenuBtn: document.getElementById('returnToMenuBtn'),
        vaultView: document.getElementById('vaultView'),
        vaultGrid: document.getElementById('vaultGrid'),
        vaultEmptyMessage: document.getElementById('vaultEmptyMessage'),
        vaultBackToTodayBtn: document.getElementById('vaultBackToTodayBtn'),
        toastMessage: document.getElementById('toastMessage')
      };

      this.garnishFx = new GarnishBackgroundSystem(document.getElementById('garnishCanvas'));
      this.bindEvents();
      this.updateSoundUi();
      this.init();
    }

    bindEvents() {
      const toggleSound = () => {
        this.sound.enabled = !this.sound.enabled;
        this.state.soundEnabled = this.sound.enabled;
        StorageManager.save(this.state);
        this.updateSoundUi();
        this.sound.playTap();
      };
      this.dom.soundToggleBtn.addEventListener('click', toggleSound);
      
      this.dom.headerBackBtn.addEventListener('click', () => { this.sound.playTap(); this.showMainMenu(); });
      this.dom.systemRetryBtn.addEventListener('click', () => { this.sound.playTap(); this.init(); });
      this.dom.menuStartTodayBtn.addEventListener('click', () => { this.sound.playTap(); this.startFlight(this.releaseState.current); });
      this.dom.menuOpenVaultBtn.addEventListener('click', () => { this.sound.playTap(); this.openVault(); });
      this.dom.nextQuestionBtn.addEventListener('click', () => { this.sound.playTap(); this.handleNextStep(); });
      this.dom.shareScoreBtn.addEventListener('click', () => this.shareScore());
      this.dom.reviewFlightBtn.addEventListener('click', () => { this.sound.playTap(); this.startReviewMode(); });
      this.dom.goToVaultBtn.addEventListener('click', () => { this.sound.playTap(); this.openVault(); });
      this.dom.returnToMenuBtn.addEventListener('click', () => { this.sound.playTap(); this.showMainMenu(); });
      this.dom.vaultBackToTodayBtn.addEventListener('click', () => { this.sound.playTap(); this.startFlight(this.releaseState.current); });
    }

    updateSoundUi() {
      if (this.sound.enabled) {
        this.dom.soundIconOn.classList.remove('hidden');
        this.dom.soundIconOff.classList.add('hidden');
      } else {
        this.dom.soundIconOn.classList.add('hidden');
        this.dom.soundIconOff.classList.remove('hidden');
      }
    }

    showView(viewName) {
      ['systemStateView', 'menuView', 'gameView', 'resultsView', 'vaultView'].forEach(v => {
        this.dom[v].classList.add('hidden');
      });
      this.dom[viewName].classList.remove('hidden');
      window.scrollTo(0, 0);
    }

    showError(title, desc) {
      this.dom.systemStateTitle.textContent = title;
      this.dom.systemStateDesc.textContent = desc;
      this.dom.systemRetryBtn.classList.remove('hidden');
      this.showView('systemStateView');
      this.dom.headerBackBtn.classList.add('hidden');
    }

    async init() {
      this.garnishFx.start();
      this.dom.systemStateTitle.textContent = 'Loading';
      this.dom.systemStateDesc.textContent = 'Verifying release schedule...';
      this.dom.systemRetryBtn.classList.add('hidden');
      this.showView('systemStateView');
      this.dom.headerBackBtn.classList.add('hidden');

      try {
        const [csvResponse, ukDate] = await Promise.all([
          fetch(CONFIG.csvPath, { cache: 'no-store' }),
          TimeService.getUkReleaseDate()
        ]);

        if (!csvResponse.ok) throw new Error("Puzzle data could not be loaded.");
        const csvText = await csvResponse.text();
        const allRecords = CsvParser.parse(csvText);

        this.releaseState = { past: [], current: null, future: [] };
        
        let currentCandidates = [];
        allRecords.forEach(record => {
          if (record.release_date < ukDate) this.releaseState.past.push(record);
          else if (record.release_date === ukDate) currentCandidates.push(record);
          else this.releaseState.future.push(record);
        });

        if (currentCandidates.length > 1) {
          throw new Error("Multiple releases detected for today. Data is invalid.");
        }
        
        if (currentCandidates.length === 1) {
          this.releaseState.current = currentCandidates[0];
        }

        // Sort vault newest first
        this.releaseState.past.sort((a, b) => b.release_date.localeCompare(a.release_date));

        this.showMainMenu();

      } catch (err) {
        console.error(err);
        this.showError("Unavailable", "Today's puzzle could not be verified.");
      }
    }

    showMainMenu() {
      this.showView('menuView');
      this.garnishFx.setMode('menu');
      this.dom.headerBackBtn.classList.add('hidden');

      this.dom.menuStreakVal.textContent = this.state.streak || 0;

      if (!this.releaseState.current) {
        this.dom.menuTodayFlightTitle.textContent = 'No puzzle scheduled for today';
        this.dom.menuTodayStatusText.textContent = 'UNAVAILABLE';
        this.dom.menuStartTodayBtn.disabled = true;
        this.dom.menuStartTodayBtn.textContent = 'Unavailable';
      } else {
        const c = this.releaseState.current;
        this.dom.menuTodayFlightTitle.textContent = c.flight_title || 'Daily Flight';
        this.dom.menuStartTodayBtn.disabled = false;
        
        const historyData = this.state.history[c.release_date];
        const inProgressData = (this.state.inProgress && this.state.inProgress.release_date === c.release_date);

        if (historyData && historyData.completed) {
          this.dom.menuTodayStatusText.textContent = `COMPLETED (${historyData.score}/5)`;
          this.dom.menuTodayStatusText.className = 'status-pill completed';
          this.dom.menuStartTodayBtn.textContent = 'Scorecard';
        } else if (inProgressData) {
          this.dom.menuTodayStatusText.textContent = `IN PROGRESS (${this.state.inProgress.answers.length}/5)`;
          this.dom.menuTodayStatusText.className = 'status-pill';
          this.dom.menuStartTodayBtn.textContent = 'Resume';
        } else {
          this.dom.menuTodayStatusText.textContent = 'NOT STARTED';
          this.dom.menuTodayStatusText.className = 'status-pill';
          this.dom.menuStartTodayBtn.textContent = 'Play';
        }
      }

      this.dom.menuVaultCountBadge.textContent = this.releaseState.past.length;
    }

    startFlight(flightRecord) {
      if (!flightRecord) return;
      this.activeFlight = flightRecord;
      this.isReviewMode = false;
      this.garnishFx.setMode('game');
      this.dom.headerBackBtn.classList.remove('hidden');

      const isCurrent = (this.releaseState.current && flightRecord.release_date === this.releaseState.current.release_date);
      this.dom.flightDayLabel.textContent = isCurrent ? `TODAY • DAY ${flightRecord.flight_day}` : `VAULT • DAY ${flightRecord.flight_day}`;

      const savedHistory = this.state.history[flightRecord.release_date];
      if (savedHistory && savedHistory.completed) {
        this.sessionAnswers = savedHistory.answers;
        this.renderScorecard(savedHistory.score);
        return;
      }

      if (isCurrent && this.state.inProgress && this.state.inProgress.release_date === flightRecord.release_date) {
        this.currentQuestionIdx = this.state.inProgress.currentQuestionIdx || 0;
        this.sessionAnswers = this.state.inProgress.answers || [];
      } else {
        this.currentQuestionIdx = 0;
        this.sessionAnswers = [];
      }

      this.selectedAnswerIdx = null;
      this.showView('gameView');
      this.renderQuestion();
    }

    getQuestionData(flight, idx) {
      const pfx = `q${idx + 1}_`;
      return {
        category: flight[`${pfx}category`],
        difficulty: flight[`${pfx}difficulty`],
        question: flight[`${pfx}question`],
        options: [ flight[`${pfx}opt_a`], flight[`${pfx}opt_b`], flight[`${pfx}opt_c`], flight[`${pfx}opt_d`] ],
        correctIndex: parseInt(flight[`${pfx}answer_index`], 10),
        explanation: flight[`${pfx}explanation`]
      };
    }

    renderQuestion() {
      const qData = this.getQuestionData(this.activeFlight, this.currentQuestionIdx);
      this.selectedAnswerIdx = null;

      this.dom.curriculumBadge.textContent = qData.category;
      this.dom.difficultyBadge.textContent = qData.difficulty;
      this.dom.questionText.textContent = qData.question;
      this.updateStepper();

      this.dom.barNotePanel.classList.add('hidden');
      this.dom.optionsGrid.innerHTML = '';
      
      const letters = ['A', 'B', 'C', 'D'];
      qData.options.forEach((optText, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.setAttribute('role', 'radio');
        btn.innerHTML = `<span class="option-key">${letters[index]}</span><span class="option-label">${optText}</span>`;
        btn.addEventListener('click', () => this.selectOption(index));
        this.dom.optionsGrid.appendChild(btn);
      });

      this.dom.nextQuestionBtn.textContent = (this.currentQuestionIdx === 4) ? 'Complete' : 'Next';
    }

    updateStepper() {
      this.dom.stepPips.forEach((pip, idx) => {
        pip.className = 'step-pip';
        if (idx === this.currentQuestionIdx) pip.classList.add('current');
        else if (idx < this.sessionAnswers.length) pip.classList.add(this.sessionAnswers[idx].isCorrect ? 'correct' : 'incorrect');
      });
    }

    selectOption(idx) {
      if (this.selectedAnswerIdx !== null) return;
      this.selectedAnswerIdx = idx;

      const qData = this.getQuestionData(this.activeFlight, this.currentQuestionIdx);
      const isCorrect = (idx === qData.correctIndex);

      this.sessionAnswers.push({ chosenIdx: idx, isCorrect });

      const isCurrent = (this.releaseState.current && this.activeFlight.release_date === this.releaseState.current.release_date);
      if (isCurrent) {
        this.state.inProgress = { release_date: this.activeFlight.release_date, currentQuestionIdx: this.currentQuestionIdx, answers: this.sessionAnswers };
        StorageManager.save(this.state);
      }

      if (isCorrect) this.sound.playCorrect();
      else this.sound.playIncorrect();

      const buttons = this.dom.optionsGrid.querySelectorAll('.option-btn');
      buttons.forEach((btn, bIdx) => {
        btn.disabled = true;
        if (bIdx === qData.correctIndex) btn.classList.add('correct');
        else if (bIdx === idx && !isCorrect) btn.classList.add('incorrect');
      });

      this.dom.barNoteText.textContent = qData.explanation;
      this.dom.barNotePanel.classList.remove('hidden');
      this.updateStepper();
      this.dom.nextQuestionBtn.focus();
    }

    handleNextStep() {
      if (this.isReviewMode) {
        if (this.currentQuestionIdx < 4) {
          this.currentQuestionIdx++;
          this.renderReviewQuestion();
        } else {
          this.showView('resultsView');
        }
        return;
      }

      if (this.currentQuestionIdx < 4) {
        this.currentQuestionIdx++;
        const isCurrent = (this.releaseState.current && this.activeFlight.release_date === this.releaseState.current.release_date);
        if (isCurrent && this.state.inProgress) {
          this.state.inProgress.currentQuestionIdx = this.currentQuestionIdx;
          StorageManager.save(this.state);
        }
        this.renderQuestion();
      } else {
        this.finalizeFlight();
      }
    }

    finalizeFlight() {
      const score = this.sessionAnswers.filter(a => a.isCorrect).length;
      const isCurrent = (this.releaseState.current && this.activeFlight.release_date === this.releaseState.current.release_date);

      if (isCurrent) {
        // Calculate streak strictly by dates if needed, simple logic for now
        this.state.streak = (this.state.streak || 0) + 1;
        this.state.lastCompletedDate = this.activeFlight.release_date;
        this.state.inProgress = null;
      }

      this.state.history[this.activeFlight.release_date] = { completed: true, score: score, answers: this.sessionAnswers };
      StorageManager.save(this.state);
      
      this.sound.playComplete();
      this.renderScorecard(score);
    }

    renderScorecard(score) {
      this.showView('resultsView');
      this.garnishFx.setMode('menu');
      this.dom.headerBackBtn.classList.remove('hidden');
      this.dom.finalScoreVal.textContent = score;

      this.dom.scorePillList.innerHTML = '';
      this.sessionAnswers.forEach(ans => {
        const pip = document.createElement('div');
        pip.className = `score-summary-pip ${ans.isCorrect ? 'correct' : 'incorrect'}`;
        pip.textContent = ans.isCorrect ? '✓' : '✗';
        this.dom.scorePillList.appendChild(pip);
      });
    }

    startReviewMode() {
      this.isReviewMode = true;
      this.currentQuestionIdx = 0;
      this.garnishFx.setMode('game');
      this.showView('gameView');
      this.renderReviewQuestion();
    }

    renderReviewQuestion() {
      const qData = this.getQuestionData(this.activeFlight, this.currentQuestionIdx);
      const ansData = this.sessionAnswers[this.currentQuestionIdx];

      this.dom.curriculumBadge.textContent = qData.category;
      this.dom.difficultyBadge.textContent = qData.difficulty;
      this.dom.questionText.textContent = qData.question;
      this.updateStepper();

      this.dom.optionsGrid.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      qData.options.forEach((optText, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.disabled = true;
        if (index === qData.correctIndex) btn.classList.add('correct');
        else if (index === ansData.chosenIdx && !ansData.isCorrect) btn.classList.add('incorrect');
        btn.innerHTML = `<span class="option-key">${letters[index]}</span><span class="option-label">${optText}</span>`;
        this.dom.optionsGrid.appendChild(btn);
      });

      this.dom.barNoteText.textContent = qData.explanation;
      this.dom.barNotePanel.classList.remove('hidden');
      this.dom.nextQuestionBtn.textContent = (this.currentQuestionIdx === 4) ? 'Scorecard' : 'Next';
    }

    openVault() {
      this.showView('vaultView');
      this.garnishFx.setMode('menu');
      this.dom.headerBackBtn.classList.remove('hidden');

      this.dom.vaultGrid.innerHTML = '';
      
      if (this.releaseState.past.length === 0) {
        this.dom.vaultEmptyMessage.classList.remove('hidden');
        return;
      }
      this.dom.vaultEmptyMessage.classList.add('hidden');

      this.releaseState.past.forEach(flight => {
        const isDone = this.state.history[flight.release_date]?.completed;
        const score = this.state.history[flight.release_date]?.score || 0;
        
        const card = document.createElement('div');
        card.className = 'vault-item-card';
        card.setAttribute('role', 'button');
        card.innerHTML = `
          <div class="vault-item-day">Day ${flight.flight_day} - ${flight.flight_title}</div>
          <span class="vault-item-badge ${isDone ? 'completed' : 'unplayed'}">${isDone ? `${score}/5` : 'Play'}</span>
        `;
        card.addEventListener('click', () => { this.sound.playTap(); this.startFlight(flight); });
        this.dom.vaultGrid.appendChild(card);
      });
    }

    shareScore() {
      const score = this.sessionAnswers.filter(a => a.isCorrect).length;
      const emojis = this.sessionAnswers.map(a => a.isCorrect ? '🟩' : '🟥').join('');
      const text = `Cocktail Digest • Day ${this.activeFlight.flight_day}\nScore: ${score}/5\n${emojis}`;
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => this.showToast('Copied to clipboard!'));
      } else {
        this.showToast('Sharing not supported.');
      }
    }

    showToast(msg) {
      this.dom.toastMessage.textContent = msg;
      this.dom.toastMessage.classList.add('visible');
      setTimeout(() => this.dom.toastMessage.classList.remove('visible'), 2600);
    }
  }

  document.addEventListener('DOMContentLoaded', () => new AppEngine());
})();