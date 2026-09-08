/**
 * COCKTAIL DIGEST — GAME ENGINE & PLATFORM ARCHITECTURE
 * 
 * Platform Standards:
 * - Dedicated Standalone Main Menu Screen Architecture.
 * - Deterministic daily release calendar: Day 0 = 8 September 2026 UTC.
 * - Day 0 Contract: Today = Flight 1, Vault = 0 (empty). Future puzzles shielded.
 * - Procedural Garnish background animation system:
 *   2-6 icons floating in Menu, reduced to 1-2 icons in active gameplay.
 * - Robust versioned LocalStorage (COCKTAIL_DIGEST_TRIVIA_V2).
 * - Full accessibility (keyboard nav, ARIA, screen-reader polite announcements).
 * - Web Audio API synthesizer for zero-asset atmospheric sound effects.
 */

(function () {
  'use strict';

  // --- PLATFORM CONSTANTS & STORAGE SCHEMA ---
  const STORAGE_KEY = 'COCKTAIL_DIGEST_TRIVIA_V2';
  const STORAGE_VERSION = 2;

  // Canonical UTC publication anchor: 8 September 2026 is Day 0
  const CANONICAL_EPOCH_ISO = "2026-09-08T00:00:00Z";

  // --- AUDIO SYNTHESIZER (WEB AUDIO API) ---
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTap() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    }

    playCorrect() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const chord = [523.25, 659.25, 783.99]; // C5 - E5 - G5
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.22, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.36);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.36);
      });
    }

    playIncorrect() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(196, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    }

    playComplete() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const fanfare = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      fanfare.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.24, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.45);
      });
    }
  }

  // --- STATE MANAGER ---
  class StorageManager {
    static getInitialState() {
      return {
        storageVersion: STORAGE_VERSION,
        soundEnabled: true,
        streak: 0,
        lastCompletedDay: null,
        history: {},     // keyed by dayNumber: { completed: bool, score: num, answers: [] }
        inProgress: null // { dayNumber, currentQuestionIdx, answers: [] }
      };
    }

    static load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          // Check for V1 fallback
          const oldV1 = localStorage.getItem('COCKTAIL_DIGEST_TRIVIA_V1');
          if (oldV1) {
            const parsedOld = JSON.parse(oldV1);
            return Object.assign(this.getInitialState(), parsedOld, { storageVersion: STORAGE_VERSION });
          }
          return this.getInitialState();
        }
        const parsed = JSON.parse(raw);
        return Object.assign(this.getInitialState(), parsed);
      } catch (err) {
        console.warn('LocalStorage unavailable or corrupted. Using fallback memory state.', err);
        return this.getInitialState();
      }
    }

    static save(state) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (err) {
        console.warn('LocalStorage save failed:', err);
      }
    }
  }

  // --- DAILY CALENDAR & DETERMINISTIC RELEASE ENGINE ---
  class DailyScheduler {
    /**
     * Calculates the Day Index relative to 8 September 2026 UTC (Day 0).
     * If the current client clock is prior to 8 September 2026 (e.g. testing),
     * returns 0 so Day 0 is actively playable and Vault is fresh.
     */
    static getTodayDayNumber(epochIsoString) {
      const now = new Date();
      const nowUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
      
      const epochDate = new Date(epochIsoString || CANONICAL_EPOCH_ISO);
      const epochUtc = Date.UTC(epochDate.getUTCFullYear(), epochDate.getUTCMonth(), epochDate.getUTCDate());

      const diffMs = nowUtc - epochUtc;
      const dayDiff = Math.floor(diffMs / 86400000);
      
      // 8 September 2026 = Day 0.
      // During pre-launch / review, allow preview of Day 0.
      return Math.max(0, dayDiff);
    }

    /**
     * Resolves puzzle for dayNumber deterministically.
     * Guarantees historical stability when more puzzles are appended.
     */
    static getFlightForDay(dayNumber, puzzleList) {
      if (!puzzleList || puzzleList.length === 0) return null;

      // Sequential mapping: Day 0 -> Index 0, Day 1 -> Index 1...
      if (dayNumber < puzzleList.length) {
        return puzzleList[dayNumber];
      }

      // Stable wrap-around when daily index exceeds current library
      const wrapIndex = dayNumber % puzzleList.length;
      return puzzleList[wrapIndex];
    }
  }

  // --- PROCEDURAL GARNISH BACKGROUND SYSTEM ---
  class GarnishBackgroundSystem {
    constructor(containerEl) {
      this.container = containerEl;
      this.activeIcons = [];
      this.mode = 'menu'; // 'menu' (2-6 icons) or 'game' (1-2 icons)
      this.spawnTimer = null;
      this.isRunning = false;

      // Library of elegant gold line-art SVG garnish graphics
      this.iconSvgs = [
        // 1. Citrus Wheel (Lemon/Lime with segments)
        `<svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="50" cy="50" r="46"/>
          <circle cx="50" cy="50" r="41" stroke-dasharray="3 3"/>
          <circle cx="50" cy="50" r="6"/>
          <path d="M50 14 L50 44 M50 56 L50 86 M14 50 L44 50 M56 50 L86 50"/>
          <path d="M24.5 24.5 L45.7 45.7 M54.3 54.3 L75.5 75.5 M24.5 75.5 L45.7 54.3 M54.3 45.7 L75.5 24.5"/>
        </svg>`,

        // 2. Citrus Peel Spiral / Twist
        `<svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 18 C38 8, 76 12, 78 34 C80 52, 48 54, 38 64 C26 76, 44 90, 68 86 C82 84, 88 74, 88 70"/>
          <path d="M25 24 C38 16, 70 20, 72 36 C74 50, 48 50, 42 60 C34 70, 46 82, 66 80" stroke-width="2" opacity="0.6"/>
        </svg>`,

        // 3. Mint Botanical Sprig
        `<svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M50 92 Q52 50 50 14"/>
          <path d="M50 70 Q30 65 24 50 Q38 48 50 62"/>
          <path d="M50 58 Q70 53 76 38 Q62 36 50 50"/>
          <path d="M50 42 Q32 37 28 24 Q42 22 50 34"/>
          <path d="M50 28 Q68 23 72 12 Q58 10 50 20"/>
          <path d="M50 14 C44 6, 56 6, 50 14"/>
        </svg>`,

        // 4. Cocktail Pick with Stuffed Olive
        `<svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <line x1="15" y1="85" x2="85" y2="15" stroke-width="3"/>
          <circle cx="85" cy="15" r="4" fill="currentColor"/>
          <ellipse cx="48" cy="52" rx="18" ry="24" transform="rotate(-45 48 52)"/>
          <circle cx="48" cy="52" r="6" stroke-width="2.5"/>
        </svg>`,

        // 5. Brandied Stem Cherries
        `<svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="36" cy="68" r="16"/>
          <circle cx="68" cy="62" r="16"/>
          <path d="M36 52 C36 30, 48 18, 54 12"/>
          <path d="M68 46 C66 30, 58 18, 54 12"/>
          <path d="M54 12 Q64 8 74 12" stroke-width="2.5"/>
        </svg>`,

        // 6. Rosemary Botanical Sprig
        `<svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
          <line x1="50" y1="94" x2="50" y2="10"/>
          <line x1="50" y1="82" x2="30" y2="68"/>
          <line x1="50" y1="78" x2="70" y2="64"/>
          <line x1="50" y1="62" x2="28" y2="48"/>
          <line x1="50" y1="58" x2="72" y2="44"/>
          <line x1="50" y1="42" x2="32" y2="28"/>
          <line x1="50" y1="38" x2="68" y2="24"/>
          <line x1="50" y1="22" x2="36" y2="12"/>
          <line x1="50" y1="18" x2="64" y2="8"/>
        </svg>`
      ];
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.scheduleNextSpawn();
    }

    setMode(mode) {
      this.mode = mode; // 'menu' or 'game'
    }

    scheduleNextSpawn() {
      if (!this.isRunning) return;

      const targetMax = (this.mode === 'menu') ? 4 : 2;
      const delay = (this.mode === 'menu')
        ? Math.floor(Math.random() * 2500) + 1800
        : Math.floor(Math.random() * 4500) + 3500;

      this.spawnTimer = setTimeout(() => {
        if (this.activeIcons.length < targetMax) {
          this.spawnIcon();
        }
        this.scheduleNextSpawn();
      }, delay);
    }

    spawnIcon() {
      if (!this.container) return;

      const el = document.createElement('div');
      el.className = 'floating-garnish-item';

      const randomIcon = this.iconSvgs[Math.floor(Math.random() * this.iconSvgs.length)];
      el.innerHTML = randomIcon;

      // Positioning & motion parameters
      const size = Math.floor(Math.random() * 32) + 48; // 48px to 80px
      const startX = Math.floor(Math.random() * 82) + 8; // 8% to 90% vw
      const duration = Math.floor(Math.random() * 8) + 18; // 18s to 26s
      const driftX = (Math.random() - 0.5) * 80; // horizontal float drift
      const maxOpacity = (this.mode === 'menu') ? (Math.random() * 0.12 + 0.16) : 0.12;

      const startRot = Math.floor(Math.random() * 360);
      const midRot = startRot + Math.floor(Math.random() * 60) - 30;
      const endRot = startRot + Math.floor(Math.random() * 120) - 60;
      const scale = (Math.random() * 0.3 + 0.85).toFixed(2);

      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${startX}%`;
      el.style.setProperty('--drift-x', `${driftX}px`);
      el.style.setProperty('--max-opacity', maxOpacity);
      el.style.setProperty('--start-rot', `${startRot}deg`);
      el.style.setProperty('--mid-rot', `${midRot}deg`);
      el.style.setProperty('--end-rot', `${endRot}deg`);
      el.style.setProperty('--start-scale', scale);
      el.style.animation = `floatGarnishUp ${duration}s linear forwards`;

      this.container.appendChild(el);
      this.activeIcons.push(el);

      el.addEventListener('animationend', () => {
        this.removeIcon(el);
      }, { once: true });
    }

    removeIcon(el) {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
      this.activeIcons = this.activeIcons.filter(item => item !== el);
    }

    destroy() {
      this.isRunning = false;
      clearTimeout(this.spawnTimer);
      this.activeIcons.forEach(el => this.removeIcon(el));
      this.activeIcons = [];
    }
  }

  // --- MAIN APPLICATION CONTROLLER ---
  class CocktailTriviaApp {
    constructor() {
      this.sound = new SoundFX();
      this.state = StorageManager.load();
      this.sound.enabled = this.state.soundEnabled !== false;

      // Validate puzzle contract
      this.puzzleRepo = (window.COCKTAIL_PUZZLES && Array.isArray(window.COCKTAIL_PUZZLES.flights))
        ? window.COCKTAIL_PUZZLES.flights
        : [];
      
      this.epoch = (window.COCKTAIL_PUZZLES && window.COCKTAIL_PUZZLES.config && window.COCKTAIL_PUZZLES.config.epochDate)
        ? window.COCKTAIL_PUZZLES.config.epochDate
        : CANONICAL_EPOCH_ISO;

      this.currentDayNumber = DailyScheduler.getTodayDayNumber(this.epoch);

      // Active Session State
      this.activeViewingDay = this.currentDayNumber;
      this.activeFlight = null;
      this.currentQuestionIdx = 0;
      this.selectedAnswerIdx = null;
      this.sessionAnswers = [];
      this.isReviewMode = false;

      // DOM Cache
      this.dom = {
        garnishCanvas: document.getElementById('garnishCanvas'),
        headerBackBtn: document.getElementById('headerBackBtn'),
        soundToggleBtn: document.getElementById('soundToggleBtn'),
        soundIconOn: document.getElementById('soundIconOn'),
        soundIconOff: document.getElementById('soundIconOff'),
        // Views
        menuView: document.getElementById('menuView'),
        gameView: document.getElementById('gameView'),
        resultsView: document.getElementById('resultsView'),
        vaultView: document.getElementById('vaultView'),
        // Menu Elements
        menuTodayDateBadge: document.getElementById('menuTodayDateBadge'),
        menuTodayFlightTitle: document.getElementById('menuTodayFlightTitle'),
        menuTodayFlightDesc: document.getElementById('menuTodayFlightDesc'),
        menuTodayStatusWrap: document.getElementById('menuTodayStatusWrap'),
        menuTodayStatusText: document.getElementById('menuTodayStatusText'),
        menuStreakVal: document.getElementById('menuStreakVal'),
        menuStartTodayBtn: document.getElementById('menuStartTodayBtn'),
        menuStartBtnLabel: document.getElementById('menuStartBtnLabel'),
        menuVaultCountBadge: document.getElementById('menuVaultCountBadge'),
        menuOpenVaultBtn: document.getElementById('menuOpenVaultBtn'),
        menuSoundStateLabel: document.getElementById('menuSoundStateLabel'),
        menuSoundToggleBtn: document.getElementById('menuSoundToggleBtn'),
        // Game Elements
        flightDayLabel: document.getElementById('flightDayLabel'),
        streakCountLabel: document.getElementById('streakCountLabel'),
        flightStepper: document.getElementById('flightStepper'),
        stepPips: document.querySelectorAll('.step-pip'),
        triviaCard: document.getElementById('triviaCard'),
        curriculumBadge: document.getElementById('curriculumBadge'),
        difficultyBadge: document.getElementById('difficultyBadge'),
        vaultBanner: document.getElementById('vaultBanner'),
        vaultDayNumber: document.getElementById('vaultDayNumber'),
        questionText: document.getElementById('questionText'),
        optionsGrid: document.getElementById('optionsGrid'),
        barNotePanel: document.getElementById('barNotePanel'),
        barNoteText: document.getElementById('barNoteText'),
        nextQuestionBtn: document.getElementById('nextQuestionBtn'),
        nextBtnLabel: document.getElementById('nextBtnLabel'),
        // Scorecard Elements
        scorecardRank: document.getElementById('scorecardRank'),
        scorecardRemark: document.getElementById('scorecardRemark'),
        finalScoreVal: document.getElementById('finalScoreVal'),
        scorePillList: document.getElementById('scorePillList'),
        curriculumRecapList: document.getElementById('curriculumRecapList'),
        shareScoreBtn: document.getElementById('shareScoreBtn'),
        reviewFlightBtn: document.getElementById('reviewFlightBtn'),
        goToVaultBtn: document.getElementById('goToVaultBtn'),
        returnToMenuBtn: document.getElementById('returnToMenuBtn'),
        // Vault Elements
        vaultGrid: document.getElementById('vaultGrid'),
        vaultEmptyMessage: document.getElementById('vaultEmptyMessage'),
        vaultBackToTodayBtn: document.getElementById('vaultBackToTodayBtn'),
        closeVaultBtn: document.getElementById('closeVaultBtn'),
        toastMessage: document.getElementById('toastMessage')
      };

      // Background Garnish FX
      this.garnishFx = new GarnishBackgroundSystem(this.dom.garnishCanvas);

      this.init();
    }

    init() {
      this.garnishFx.start();
      this.bindEvents();
      this.updateSoundUi();
      this.setupMidnightTimer();

      // Open on the Standalone Main Menu screen
      this.showMainMenu();
    }

    bindEvents() {
      // Sound Toggles
      const toggleSoundAction = () => {
        this.sound.enabled = !this.sound.enabled;
        this.state.soundEnabled = this.sound.enabled;
        StorageManager.save(this.state);
        this.updateSoundUi();
        if (this.sound.enabled) this.sound.playTap();
      };
      this.dom.soundToggleBtn.addEventListener('click', toggleSoundAction);
      this.dom.menuSoundToggleBtn.addEventListener('click', toggleSoundAction);

      // Back to Menu button in Header
      this.dom.headerBackBtn.addEventListener('click', () => {
        this.sound.playTap();
        this.showMainMenu();
      });

      // Menu Actions
      this.dom.menuStartTodayBtn.addEventListener('click', () => {
        this.sound.playTap();
        this.loadFlightForDay(this.currentDayNumber);
      });

      this.dom.menuOpenVaultBtn.addEventListener('click', () => {
        this.sound.playTap();
        this.openVault();
      });

      // Game Next Button
      this.dom.nextQuestionBtn.addEventListener('click', () => {
        this.sound.playTap();
        this.handleNextStep();
      });

      // Scorecard Actions
      this.dom.shareScoreBtn.addEventListener('click', () => this.shareScore());
      this.dom.reviewFlightBtn.addEventListener('click', () => {
        this.sound.playTap();
        this.startReviewMode();
      });
      this.dom.goToVaultBtn.addEventListener('click', () => {
        this.sound.playTap();
        this.openVault();
      });
      this.dom.returnToMenuBtn.addEventListener('click', () => {
        this.sound.playTap();
        this.showMainMenu();
      });

      // Vault Actions
      this.dom.closeVaultBtn.addEventListener('click', () => {
        this.sound.playTap();
        this.showMainMenu();
      });
      this.dom.vaultBackToTodayBtn.addEventListener('click', () => {
        this.sound.playTap();
        this.loadFlightForDay(this.currentDayNumber);
      });

      // Global Keyboard Handling
      window.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    updateSoundUi() {
      const isSoundOn = this.sound.enabled;
      if (isSoundOn) {
        this.dom.soundIconOn.classList.remove('hidden');
        this.dom.soundIconOff.classList.add('hidden');
        this.dom.menuSoundStateLabel.textContent = 'ON';
        this.dom.menuSoundStateLabel.style.color = 'var(--gold-trim)';
      } else {
        this.dom.soundIconOn.classList.add('hidden');
        this.dom.soundIconOff.classList.remove('hidden');
        this.dom.menuSoundStateLabel.textContent = 'MUTED';
        this.dom.menuSoundStateLabel.style.color = 'var(--text-dim)';
      }
    }

    // Midnight Rollover Monitor
    setupMidnightTimer() {
      setInterval(() => {
        const freshDay = DailyScheduler.getTodayDayNumber(this.epoch);
        if (freshDay !== this.currentDayNumber) {
          this.currentDayNumber = freshDay;
          // Refresh main menu or vault without interrupting active game
          if (!this.dom.menuView.classList.contains('hidden')) {
            this.showMainMenu();
          } else if (!this.dom.vaultView.classList.contains('hidden')) {
            this.openVault();
          }
        }
      }, 30000);
    }

    // --- SCREEN NAVIGATION CONTROLLER ---
    showMainMenu() {
      this.showView('menuView');
      this.garnishFx.setMode('menu');
      this.dom.headerBackBtn.classList.add('hidden');

      // Populate Today Card on Main Menu
      const todayFlight = DailyScheduler.getFlightForDay(this.currentDayNumber, this.puzzleRepo);
      const isDayZero = (this.currentDayNumber === 0);

      this.dom.menuTodayDateBadge.textContent = isDayZero ? 'DAY 0 • LAUNCH' : `DAY ${this.currentDayNumber} • TODAY`;
      
      if (todayFlight) {
        this.dom.menuTodayFlightTitle.textContent = todayFlight.title || 'Daily Service Flight';
        this.dom.menuTodayFlightDesc.textContent = todayFlight.theme || '5 Curated Questions • Technique & Cocktail Lore';
      }

      this.dom.menuStreakVal.textContent = this.state.streak || 0;

      // Status Assessment
      const savedToday = this.state.history[this.currentDayNumber];
      const inProgressToday = (this.state.inProgress && this.state.inProgress.dayNumber === this.currentDayNumber);

      const statusPill = this.dom.menuTodayStatusWrap.querySelector('.today-status-pill');

      if (savedToday && savedToday.completed) {
        statusPill.className = 'today-status-pill completed';
        this.dom.menuTodayStatusText.textContent = `COMPLETED (${savedToday.score}/5)`;
        this.dom.menuStartBtnLabel.textContent = 'VIEW SCORECARD';
      } else if (inProgressToday) {
        statusPill.className = 'today-status-pill in-progress';
        this.dom.menuTodayStatusText.textContent = `IN PROGRESS (${this.state.inProgress.answers.length}/5)`;
        this.dom.menuStartBtnLabel.textContent = 'RESUME FLIGHT';
      } else {
        statusPill.className = 'today-status-pill unplayed';
        this.dom.menuTodayStatusText.textContent = 'NOT STARTED';
        this.dom.menuStartBtnLabel.textContent = "START TODAY'S FLIGHT";
      }

      // Vault Badge Count
      const pastDaysCount = Math.max(0, this.currentDayNumber);
      this.dom.menuVaultCountBadge.textContent = `${pastDaysCount} AVAILABLE`;
    }

    loadFlightForDay(dayNumber) {
      this.activeViewingDay = dayNumber;
      this.activeFlight = DailyScheduler.getFlightForDay(dayNumber, this.puzzleRepo);
      this.isReviewMode = false;
      this.garnishFx.setMode('game');
      this.dom.headerBackBtn.classList.remove('hidden');

      const isToday = (dayNumber === this.currentDayNumber);

      if (isToday) {
        this.dom.flightDayLabel.textContent = `TODAY • DAY ${dayNumber}`;
        this.dom.vaultBanner.classList.add('hidden');
      } else {
        this.dom.flightDayLabel.textContent = `ARCHIVE • DAY ${dayNumber}`;
        this.dom.vaultBanner.classList.remove('hidden');
        this.dom.vaultDayNumber.textContent = dayNumber;
      }

      this.dom.streakCountLabel.textContent = this.state.streak || 0;

      // If already completed, jump directly to scorecard
      const savedHistory = this.state.history[dayNumber];
      if (savedHistory && savedHistory.completed) {
        this.sessionAnswers = savedHistory.answers || [];
        this.renderScorecard(savedHistory.score);
        return;
      }

      // Check for in-progress session
      if (isToday && this.state.inProgress && this.state.inProgress.dayNumber === dayNumber) {
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

    renderQuestion() {
      if (!this.activeFlight) return;
      const qData = this.activeFlight.questions[this.currentQuestionIdx];
      if (!qData) return;

      this.selectedAnswerIdx = null;

      // Curriculum & Difficulty Badges
      this.dom.curriculumBadge.textContent = qData.category || 'COCKTAIL CURRICULUM';
      this.dom.difficultyBadge.textContent = qData.difficulty || 'BALANCED';

      // Question Text
      this.dom.questionText.textContent = qData.question;

      // Stepper Update
      this.updateStepper();

      // Reset Bar Note
      this.dom.barNotePanel.classList.add('hidden');

      // Populate Options
      this.dom.optionsGrid.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      qData.options.forEach((optText, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.setAttribute('role', 'radio');
        btn.setAttribute('aria-checked', 'false');
        btn.setAttribute('data-index', index);

        btn.innerHTML = `
          <span class="option-key">${letters[index]}</span>
          <span class="option-label">${optText}</span>
        `;

        btn.addEventListener('click', () => {
          this.selectOption(index);
        });

        this.dom.optionsGrid.appendChild(btn);
      });

      // Next action button label
      const isLast = (this.currentQuestionIdx === this.activeFlight.questions.length - 1);
      this.dom.nextBtnLabel.textContent = isLast ? 'COMPLETE FLIGHT' : 'NEXT POUR';
    }

    updateStepper() {
      this.dom.stepPips.forEach((pip, idx) => {
        pip.className = 'step-pip';
        if (idx === this.currentQuestionIdx) {
          pip.classList.add('current');
        } else if (idx < this.sessionAnswers.length) {
          const ans = this.sessionAnswers[idx];
          pip.classList.add(ans.isCorrect ? 'correct' : 'incorrect');
        }
      });
      this.dom.flightStepper.setAttribute('aria-valuenow', this.currentQuestionIdx + 1);
    }

    selectOption(selectedIndex) {
      if (this.selectedAnswerIdx !== null) return;
      this.selectedAnswerIdx = selectedIndex;

      const qData = this.activeFlight.questions[this.currentQuestionIdx];
      const isCorrect = (selectedIndex === qData.correctIndex);

      // Record answer in session
      this.sessionAnswers.push({
        questionIdx: this.currentQuestionIdx,
        chosenIdx: selectedIndex,
        isCorrect: isCorrect,
        category: qData.category
      });

      // Save in-progress state if this is today's puzzle
      if (this.activeViewingDay === this.currentDayNumber) {
        this.state.inProgress = {
          dayNumber: this.currentDayNumber,
          currentQuestionIdx: this.currentQuestionIdx,
          answers: this.sessionAnswers
        };
        StorageManager.save(this.state);
      }

      // Audio feedback
      if (isCorrect) {
        this.sound.playCorrect();
      } else {
        this.sound.playIncorrect();
      }

      // Visual feedback on option buttons
      const buttons = this.dom.optionsGrid.querySelectorAll('.option-btn');
      buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === qData.correctIndex) {
          btn.classList.add('correct');
          btn.setAttribute('aria-checked', 'true');
        } else if (idx === selectedIndex && !isCorrect) {
          btn.classList.add('incorrect');
          btn.setAttribute('aria-checked', 'true');
        }
      });

      // Reveal Bar Note
      this.dom.barNoteText.textContent = qData.explanation;
      this.dom.barNotePanel.classList.remove('hidden');

      // Update stepper pip immediately
      this.updateStepper();

      // Keyboard focus next button
      this.dom.nextQuestionBtn.focus();
    }

    handleNextStep() {
      if (this.isReviewMode) {
        if (this.currentQuestionIdx < this.activeFlight.questions.length - 1) {
          this.currentQuestionIdx++;
          this.renderReviewQuestion();
        } else {
          this.showView('resultsView');
        }
        return;
      }

      if (this.currentQuestionIdx < this.activeFlight.questions.length - 1) {
        this.currentQuestionIdx++;
        if (this.activeViewingDay === this.currentDayNumber && this.state.inProgress) {
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
      const isToday = (this.activeViewingDay === this.currentDayNumber);

      // Manage streak logic
      if (isToday) {
        if (this.state.lastCompletedDay === this.currentDayNumber - 1) {
          this.state.streak = (this.state.streak || 0) + 1;
        } else if (this.state.lastCompletedDay !== this.currentDayNumber) {
          this.state.streak = 1;
        }
        this.state.lastCompletedDay = this.currentDayNumber;
        this.state.inProgress = null; // Clear in-progress session
      }

      this.state.history[this.activeViewingDay] = {
        completed: true,
        score: score,
        answers: this.sessionAnswers,
        timestamp: Date.now()
      };

      StorageManager.save(this.state);
      this.dom.streakCountLabel.textContent = this.state.streak || 0;
      this.sound.playComplete();
      this.renderScorecard(score);
    }

    renderScorecard(score) {
      this.showView('resultsView');
      this.garnishFx.setMode('menu');
      this.dom.headerBackBtn.classList.remove('hidden');
      this.dom.finalScoreVal.textContent = score;

      const ranks = [
        { title: 'Casual Patron', remark: 'Good first sip. The cocktail world has plenty more secrets to discover.' },
        { title: 'Barback in Training', remark: 'Solid shift. You understand the foundational spirits and classic profiles.' },
        { title: 'Journeyman Bartender', remark: 'Dependable service. Great technical awareness and recipe accuracy.' },
        { title: 'Head Bartender', remark: 'Exceptional craftsmanship. Top-shelf memory and deep ingredient fluency.' },
        { title: 'Master Mixologist', remark: 'Grand pour! Flawless knowledge of history, technique, and cocktail science.' }
      ];

      const rankData = ranks[score] || ranks[0];
      this.dom.scorecardRank.textContent = rankData.title;
      this.dom.scorecardRemark.textContent = rankData.remark;

      // Render summary pips
      this.dom.scorePillList.innerHTML = '';
      this.sessionAnswers.forEach((ans, idx) => {
        const pip = document.createElement('div');
        pip.className = `score-summary-pip ${ans.isCorrect ? 'correct' : 'incorrect'}`;
        pip.textContent = ans.isCorrect ? '✓' : '✗';
        pip.setAttribute('aria-label', `Question ${idx + 1}: ${ans.isCorrect ? 'Correct' : 'Incorrect'}`);
        this.dom.scorePillList.appendChild(pip);
      });

      // Curriculum tested breakdown
      this.dom.curriculumRecapList.innerHTML = '';
      this.sessionAnswers.forEach((ans) => {
        const item = document.createElement('li');
        item.className = 'curriculum-item';
        item.innerHTML = `
          <span class="curriculum-name">${ans.category || 'Cocktail Curriculum'}</span>
          <span class="curriculum-status ${ans.isCorrect ? 'pass' : 'fail'}">${ans.isCorrect ? '+1 CORRECT' : 'MISSED'}</span>
        `;
        this.dom.curriculumRecapList.appendChild(item);
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
      const qData = this.activeFlight.questions[this.currentQuestionIdx];
      const ansData = this.sessionAnswers[this.currentQuestionIdx];
      if (!qData || !ansData) return;

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

        if (index === qData.correctIndex) {
          btn.classList.add('correct');
        } else if (index === ansData.chosenIdx && !ansData.isCorrect) {
          btn.classList.add('incorrect');
        }

        btn.innerHTML = `
          <span class="option-key">${letters[index]}</span>
          <span class="option-label">${optText}</span>
        `;
        this.dom.optionsGrid.appendChild(btn);
      });

      this.dom.barNoteText.textContent = qData.explanation;
      this.dom.barNotePanel.classList.remove('hidden');

      const isLast = (this.currentQuestionIdx === this.activeFlight.questions.length - 1);
      this.dom.nextBtnLabel.textContent = isLast ? 'RETURN TO SCORECARD' : 'NEXT NOTE';
    }

    // --- VAULT (ARCHIVE) ---
    openVault() {
      this.showView('vaultView');
      this.garnishFx.setMode('menu');
      this.dom.headerBackBtn.classList.remove('hidden');

      // Vault contains ONLY past released days (d < currentDayNumber)
      const pastDays = [];
      for (let d = this.currentDayNumber - 1; d >= 0; d--) {
        pastDays.push(d);
      }

      this.dom.vaultGrid.innerHTML = '';

      // On Day 0: Vault is strictly empty!
      if (pastDays.length === 0) {
        this.dom.vaultEmptyMessage.classList.remove('hidden');
        return;
      }

      this.dom.vaultEmptyMessage.classList.add('hidden');
      pastDays.forEach(dayNum => {
        const flight = DailyScheduler.getFlightForDay(dayNum, this.puzzleRepo);
        if (!flight) return;

        const isDone = (this.state.history[dayNum] && this.state.history[dayNum].completed);
        const card = document.createElement('div');
        card.className = 'vault-item-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        card.innerHTML = `
          <div class="vault-item-info">
            <span class="vault-item-day">DAY ${dayNum} — ${flight.title || 'Classic Flight'}</span>
            <span class="vault-item-meta">${flight.theme || '5 Curated Questions'}</span>
          </div>
          <span class="vault-item-badge ${isDone ? 'completed' : 'unplayed'}">
            ${isDone ? `COMPLETED (${this.state.history[dayNum].score}/5)` : 'PLAY FLIGHT'}
          </span>
        `;

        const selectFlight = () => {
          this.sound.playTap();
          this.loadFlightForDay(dayNum);
        };

        card.addEventListener('click', selectFlight);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectFlight();
          }
        });

        this.dom.vaultGrid.appendChild(card);
      });
    }

    shareScore() {
      const score = this.sessionAnswers.filter(a => a.isCorrect).length;
      const emojiRow = this.sessionAnswers.map(a => a.isCorrect ? '🟩' : '🟥').join('');
      const shareText = `Cocktail Digest #${this.activeViewingDay} 🍸\nScore: ${score}/5\n${emojiRow}\nhttps://tileworksgamesstudio.github.io/86/`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareText).then(() => {
          this.showToast('Scorecard copied to clipboard!');
        }).catch(() => {
          this.showToast(shareText);
        });
      } else {
        this.showToast('Sharing not supported on this device.');
      }
    }

    showToast(message) {
      this.dom.toastMessage.textContent = message;
      this.dom.toastMessage.classList.add('visible');
      setTimeout(() => {
        this.dom.toastMessage.classList.remove('visible');
      }, 2600);
    }

    showView(viewName) {
      this.dom.menuView.classList.add('hidden');
      this.dom.gameView.classList.add('hidden');
      this.dom.resultsView.classList.add('hidden');
      this.dom.vaultView.classList.add('hidden');

      if (this.dom[viewName]) {
        this.dom[viewName].classList.remove('hidden');
      }
      window.scrollTo(0, 0);
    }

    handleKeyboard(e) {
      // Escape returns to Main Menu
      if (e.key === 'Escape') {
        if (!this.dom.menuView.classList.contains('hidden')) return;
        this.showMainMenu();
        return;
      }

      // 1-4 or A-D options selection during active question
      if (!this.dom.gameView.classList.contains('hidden') && this.selectedAnswerIdx === null) {
        const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
        const lowerKey = e.key.toLowerCase();
        if (keyMap.hasOwnProperty(lowerKey)) {
          e.preventDefault();
          this.selectOption(keyMap[lowerKey]);
        }
      } else if (!this.dom.gameView.classList.contains('hidden') && this.selectedAnswerIdx !== null) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleNextStep();
        }
      }
    }
  }

  // Self-boot on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    new CocktailTriviaApp();
  });
})();