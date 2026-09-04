/**
 * BAR KNOWLEDGE: THE BARTENDER'S CRAFT & SERVICE GAME
 * Clean Vanilla ES6 Front-end Architecture
 * Synthesized Web Audio Sound Engine (Zero external asset dependencies)
 * Single unified in-script content database with exactly 5 playable challenge examples.
 */

(function () {
  "use strict";

  /* ==========================================================================
     1. IN-SCRIPT CONTENT DATABASE: EXACTLY 5 PLAYABLE CHALLENGE EXAMPLES
     ========================================================================== */
  const CHALLENGES = [
    {
      id: "ticket-01-specs",
      title: "The Classic Negroni Spec",
      category: "Classic Cocktails",
      difficulty: 1,
      question: "A guest orders an authentic classic Negroni. What is the canonical historic specification ratio for this aperitivo benchmark?",
      answers: [
        "Equal parts: 1:1:1 London Dry Gin, Campari, and Sweet Red Vermouth",
        "2:1:1 Bourbon, Campari, and Dry White Vermouth",
        "3:1 Gin and Sweet Vermouth with an Aperol rinse",
        "2:1:0.5 Gin, Campari, and Triple Sec"
      ],
      correctIndex: 0,
      principle: "The Negroni is the defining archetype of the equal-parts trio: botanical spirit, bitter aperitivo, and fortified aromatized wine.",
      deepContext: "Born circa 1919 at Caffè Casoni in Florence when Count Camillo Negroni asked bartender Fosco Scarselli to fortify his Americano by substituting gin for soda water.",
      spec: "1.0 oz London Dry Gin • 1.0 oz Campari • 1.0 oz Sweet Red Vermouth • Orange Peel Expressed",
      hint: "Recall the defining equal-parts triad of botanical gin, Italian bitter aperitivo, and sweet fortified wine."
    },
    {
      id: "ticket-02-thermo",
      title: "Directional Clear Ice Thermodynamics",
      category: "Ice & Thermodynamics",
      difficulty: 2,
      question: "Why does a professional craft bar serve an Old Fashioned over a dense directional clear ice cube rather than standard cloudy freezer-tray ice?",
      answers: [
        "Clear ice has zero trapped air micro-bubbles, dramatically lowering contact surface area and slowing meltwater dilution",
        "Freezer-tray ice contains chemical sodium ions that break down whiskey ethanol on contact",
        "Clear ice lowers drink temperature below -10°C instantly while cloudy ice warms the spirit",
        "Directional ice chemically binds and removes astringent barrel wood tannins from high-proof bourbon"
      ],
      correctIndex: 0,
      principle: "Trapped air bubbles and micro-fissures in cloudy ice exponentially increase total liquid contact area and induce thermal fractures, causing premature dilution runaway.",
      deepContext: "Directional freezing forces dissolved gases and mineral impurities downward into a sacrificial layer. A crystal-pure 2-inch clear cube melts up to 5x slower than cloudy cubes of equivalent weight.",
      spec: "Directional freezing in insulated baths • Dense crystal cubic lattice • Sub-zero temper prior to pour",
      hint: "Focus on how trapped gas micro-bubbles alter physical contact surface area and heat transfer."
    },
    {
      id: "ticket-03-technique",
      title: "The Chemistry of the Dry Shake",
      category: "Technique & Texture",
      difficulty: 2,
      question: "What is the structural and thermodynamic purpose of performing a 'Dry Shake' before adding ice to an egg white sour?",
      answers: [
        "It whips and emulsifies albumin protein chains at room temperature before cold ice constricts bubble expansion",
        "It sterilizes potential egg bacteria through contact with unchilled spirit alcohol",
        "It reduces total liquid volume by 15% through rapid shaker headspace evaporation",
        "It prevents fresh citrus acid from curdling dairy fats in fortified liqueurs"
      ],
      correctIndex: 0,
      principle: "Albumin proteins unravel and form a resilient microfoam matrix much more readily before cold temperatures stiffen the intermolecular bonds.",
      deepContext: "Ice cubes inhibit rapid protein unraveling. Emulsifying room-temperature albumin with citrus acid first creates a dense, velvety meringue head that persists to the final sip.",
      spec: "Dry shake ingredients + albumin 10s (no ice) • Add dense ice and shake 8s • Fine strain into chilled coupe",
      hint: "Consider how cold ice cubes impact the physical stretching and foaming of egg albumin proteins."
    },
    {
      id: "ticket-04-sensory",
      title: "Diagnosing Harsh Citrus Bitterness",
      category: "Sensory & Diagnosis",
      difficulty: 3,
      question: "A guest reports their fresh lime Daiquiri is unpleasantly harsh, astringent, and puckering despite exact jigger measurements. What is the root diagnostic cause?",
      answers: [
        "Lime juice was mechanically over-pressed, crushing bitter albedo pith oils directly into the juice",
        "The rum had an alcohol by volume of 40% instead of navy strength 57%",
        "The cocktail was double-strained through a fine wire mesh, removing citrus pulp",
        "The bartender used rich 2:1 Demerara cane syrup instead of standard 1:1 simple"
      ],
      correctIndex: 0,
      principle: "Over-pressing citrus fruit hulls extracts limonin and acrid essential oils from the spongy white albedo pith, turning crisp acidity into harsh astringency.",
      deepContext: "Professional citrus prep gently bursts the juice vesicles without tearing into the white inner pith. Furthermore, lime juice enzymatically oxidizes after 8-10 hours, creating bitter off-notes.",
      spec: "Hand press fruit with 75% stroke depth • Never over-squeeze inner white pith • Fresh daily press",
      hint: "Look at mechanical juicing pressure and the bitter compounds residing in white peel pith."
    },
    {
      id: "ticket-05-service",
      title: "Rush Hour Ticket Choreography",
      category: "Service & Speed",
      difficulty: 3,
      question: "During a high-volume rush, you receive one ticket: 1 Ramos Gin Fizz, 1 Draft Stout, 2 Old Fashioneds, and 1 Gin & Tonic. What is the most efficient professional sequence?",
      answers: [
        "Start Ramos Gin Fizz shake/rest first, build and stir the Old Fashioneds, pour highball and draft stout last before call",
        "Pour the draft stout first to settle, build the Gin & Tonic, stir Old Fashioneds, and do the Ramos last",
        "Execute drinks strictly in the top-to-bottom line order printed on the ticket",
        "Make the Gin & Tonic and draft stout first so the server has immediate drinks to deliver"
      ],
      correctIndex: 0,
      principle: "Station choreography requires initiating long-emulsion or rest steps first, batching stirred cocktails, and pouring carbonated drinks immediately before tray dispatch to protect foam and fizz.",
      deepContext: "Draft beer heads deflate within 90 seconds and tonic effervescence quickly dissipates. Starting the Ramos Gin Fizz protein structure allows the head to set while stirring the spirit-forward drinks.",
      spec: "Station Sequencing Protocol: [1] Long Emulsion/Rest -> [2] Stirred/Built -> [3] Carbonated/Draft to Tray",
      hint: "Think about which drinks degrade fastest (effervescence and draft head) versus which drink requires a resting period."
    }
  ];

  /* ==========================================================================
     2. DATA VALIDATION SUBSYSTEM (DEFENSIVE RUNTIME CHECK)
     ========================================================================== */
  function validateChallenges(dataset) {
    if (!Array.isArray(dataset) || dataset.length !== 5) {
      console.error("BarKnowledge: Expected exactly 5 playable challenges, found", dataset ? dataset.length : 0);
      return false;
    }
    const seenIds = new Set();
    for (let i = 0; i < dataset.length; i++) {
      const item = dataset[i];
      if (!item.id || typeof item.id !== "string" || seenIds.has(item.id)) {
        console.error("BarKnowledge: Malformed or duplicate ID at index", i, item);
        return false;
      }
      seenIds.add(item.id);
      if (!item.question || typeof item.question !== "string") return false;
      if (!Array.isArray(item.answers) || item.answers.length !== 4) return false;
      if (typeof item.correctIndex !== "number" || item.correctIndex < 0 || item.correctIndex > 3) return false;
      if (!item.principle || !item.spec || !item.hint) return false;
    }
    return true;
  }

  /* ==========================================================================
     3. AUDIO SYNTHESIS SYSTEM (WEB AUDIO API - SELF-CONTAINED)
     ========================================================================== */
  class BarAudioSystem {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }

    playClink() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1760, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    }

    playSuccessChime() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C Major arpeggio

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.045;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    }

    playThud() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    }

    playTick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(900, now);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    }
  }

  /* ==========================================================================
     4. BARTENDER RANKING LEVELS
     ========================================================================== */
  const RANKS = [
    { name: "Barback", minXp: 0, badge: "🌱" },
    { name: "Apprentice", minXp: 250, badge: "🥄" },
    { name: "Bartender", minXp: 700, badge: "🍸" },
    { name: "Senior Bartender", minXp: 1400, badge: "★" },
    { name: "Head Mixologist", minXp: 2400, badge: "👑" },
    { name: "Master of Cocktails", minXp: 3800, badge: "✨" }
  ];

  /* ==========================================================================
     5. PERSISTENT STORAGE CONTROLLER
     ========================================================================== */
  const STORAGE_KEY = "BAR_KNOWLEDGE_CAREER_V2";

  class StorageManager {
    static load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return this.getDefaults();
        const parsed = JSON.parse(raw);
        return Object.assign(this.getDefaults(), parsed);
      } catch (e) {
        return this.getDefaults();
      }
    }

    static save(data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        // Fallback gracefully if storage is restricted
      }
    }

    static getDefaults() {
      return {
        totalXp: 0,
        bestStreak: 0,
        shiftsCompleted: 0,
        ticketsAnswered: 0,
        ticketsCorrect: 0,
        weakCategories: {},
        soundEnabled: true,
        relaxedTimer: false
      };
    }
  }

  /* ==========================================================================
     6. MAIN GAME ENGINE
     ========================================================================== */
  class BarGameEngine {
    constructor() {
      // Validate content dataset
      this.isContentValid = validateChallenges(CHALLENGES);
      this.challenges = [...CHALLENGES];

      this.audio = new BarAudioSystem();
      this.profile = StorageManager.load();
      this.audio.enabled = !!this.profile.soundEnabled;

      // Active Shift State
      this.activeMode = "standard";
      this.currentTicketIndex = 0;
      this.shiftScore = 0;
      this.shiftCorrect = 0;
      this.shiftStreak = 0;
      this.shiftPeakStreak = 0;
      this.shiftStartTime = 0;
      this.ticketStartTime = 0;
      this.responseTimes = [];
      this.categoryPerformance = {};

      // Ticket Level State
      this.currentConfidence = "guess"; // guess (+100), solid (+200), certain (+350)
      this.hasAnswered = false;
      this.timerInterval = null;
      this.timeRemaining = 16;
      this.lifelineSpoons = 1;
      this.lifelineNotes = 1;

      this.cacheElements();
      this.bindEvents();
      this.renderProfile();
      this.updateHeaderUI();
      this.renderCodex();
    }

    cacheElements() {
      // Screens
      this.screens = {
        lobby: document.getElementById("screen-lobby"),
        game: document.getElementById("screen-game"),
        results: document.getElementById("screen-results"),
        codex: document.getElementById("screen-codex"),
        profile: document.getElementById("screen-profile")
      };

      // Header Elements
      this.streakCounter = document.getElementById("streak-counter");
      this.scoreCounter = document.getElementById("score-counter");
      this.rankText = document.getElementById("rank-text");
      this.soundIconOn = document.getElementById("sound-icon-on");
      this.soundIconOff = document.getElementById("sound-icon-off");
      this.btnToggleSound = document.getElementById("btn-toggle-sound");

      // Game Screen Elements
      this.ticketTracker = document.getElementById("ticket-tracker");
      this.multiplierBadge = document.getElementById("multiplier-badge");
      this.timerDisplay = document.getElementById("timer-display");
      this.progressFill = document.getElementById("progress-fill");
      this.categoryPill = document.getElementById("question-category");
      this.difficultyIndicator = document.getElementById("question-difficulty");
      this.ticketStamp = document.getElementById("ticket-stamp");
      this.questionPrompt = document.getElementById("question-prompt");
      this.confButtons = document.querySelectorAll(".conf-btn");
      this.ansButtons = document.querySelectorAll(".ans-btn");
      this.recipeHintBox = document.getElementById("recipe-hint-box");
      this.recipeHintText = document.getElementById("recipe-hint-text");

      // Tools
      this.btnLifelineSpoon = document.getElementById("btn-lifeline-spoon");
      this.btnLifelineNote = document.getElementById("btn-lifeline-note");
      this.spoonCount = document.getElementById("spoon-count");
      this.noteCount = document.getElementById("note-count");

      // Feedback Drawer
      this.feedbackDrawer = document.getElementById("feedback-drawer");
      this.feedbackStatus = document.getElementById("feedback-status");
      this.feedbackIcon = document.getElementById("feedback-icon");
      this.feedbackTitle = document.getElementById("feedback-title");
      this.feedbackPoints = document.getElementById("feedback-points");
      this.feedbackPrinciple = document.getElementById("feedback-principle");
      this.feedbackDetailBox = document.getElementById("feedback-detail-box");
      this.feedbackDetailText = document.getElementById("feedback-detail-text");
      this.btnToggleDeep = document.getElementById("btn-toggle-deep");
      this.btnNextQuestion = document.getElementById("btn-next-question");

      // Results Elements
      this.resultsStamp = document.getElementById("results-stamp");
      this.resultsHeadline = document.getElementById("results-headline");
      this.resultsSub = document.getElementById("results-sub");
      this.resScore = document.getElementById("res-score");
      this.resAccuracy = document.getElementById("res-accuracy");
      this.resStreak = document.getElementById("res-streak");
      this.resSpeed = document.getElementById("res-speed");
      this.resRankName = document.getElementById("res-rank-name");
      this.resRankFill = document.getElementById("res-rank-fill");
      this.resXpToNext = document.getElementById("res-xp-to-next");
      this.resBreakdownList = document.getElementById("res-breakdown-list");

      // Codex Elements
      this.codexCountBadge = document.getElementById("codex-count-badge");
      this.codexCardsGrid = document.getElementById("codex-cards-grid");
      this.codexSearchInput = document.getElementById("codex-search-input");
      this.codexFilters = document.querySelectorAll(".filter-tab");

      // Profile Elements
      this.profBadgeIcon = document.getElementById("prof-badge-icon");
      this.profRankName = document.getElementById("prof-rank-name");
      this.profTotalShifts = document.getElementById("prof-total-shifts");
      this.profTotalAnswers = document.getElementById("prof-total-answers");
      this.profLifetimeAcc = document.getElementById("prof-lifetime-acc");
      this.profBestStreak = document.getElementById("prof-best-streak");
      this.weakSpotsList = document.getElementById("weak-spots-list");
      this.checkRelaxedTimer = document.getElementById("check-relaxed-timer");
      this.checkSoundToggle = document.getElementById("check-sound-toggle");
      this.toastEl = document.getElementById("toast");
    }

    bindEvents() {
      // Navigation
      document.getElementById("btn-brand").addEventListener("click", () => this.showScreen("lobby"));
      document.getElementById("btn-open-profile").addEventListener("click", () => {
        this.renderProfile();
        this.showScreen("profile");
      });
      document.getElementById("btn-nav-codex").addEventListener("click", () => this.showScreen("codex"));
      document.getElementById("btn-nav-diagnosis").addEventListener("click", () => {
        this.showScreen("codex");
        this.filterCodex("Sensory & Diagnosis");
      });
      document.getElementById("btn-codex-back").addEventListener("click", () => this.showScreen("lobby"));
      document.getElementById("btn-profile-back").addEventListener("click", () => this.showScreen("lobby"));
      document.getElementById("btn-results-home").addEventListener("click", () => this.showScreen("lobby"));
      document.getElementById("btn-results-codex").addEventListener("click", () => this.showScreen("codex"));

      // Audio Toggle
      this.btnToggleSound.addEventListener("click", () => this.toggleSound());

      // Mode Selection
      document.querySelectorAll(".mode-card").forEach((btn) => {
        btn.addEventListener("click", () => {
          const mode = btn.getAttribute("data-mode");
          this.startShift(mode);
        });
      });

      // Answer Click
      this.ansButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-index"), 10);
          this.handleAnswerSelection(idx);
        });
      });

      // Confidence Options
      this.confButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (this.hasAnswered) return;
          this.confButtons.forEach((b) => {
            b.classList.remove("active");
            b.setAttribute("aria-checked", "false");
          });
          btn.classList.add("active");
          btn.setAttribute("aria-checked", "true");
          this.currentConfidence = btn.getAttribute("data-conf");
          this.audio.playTick();
        });
      });

      // Lifelines
      this.btnLifelineSpoon.addEventListener("click", () => this.useLifelineSpoon());
      this.btnLifelineNote.addEventListener("click", () => this.useLifelineNote());

      // Feedback Drawer Actions
      this.btnNextQuestion.addEventListener("click", () => this.advanceToNextTicket());
      this.btnToggleDeep.addEventListener("click", () => {
        this.feedbackDetailBox.classList.toggle("is-hidden");
        this.btnToggleDeep.textContent = this.feedbackDetailBox.classList.contains("is-hidden")
          ? "Read Deep Context"
          : "Hide Context";
      });

      // Results Actions
      document.getElementById("btn-play-again").addEventListener("click", () => this.startShift(this.activeMode));

      // Codex Filters & Search
      this.codexFilters.forEach((tab) => {
        tab.addEventListener("click", () => {
          this.codexFilters.forEach((t) => {
            t.classList.remove("is-active");
            t.setAttribute("aria-selected", "false");
          });
          tab.classList.add("is-active");
          tab.setAttribute("aria-selected", "true");
          this.filterCodex(tab.getAttribute("data-cat"));
        });
      });

      this.codexSearchInput.addEventListener("input", (e) => {
        this.searchCodex(e.target.value);
      });

      // Settings Toggles
      this.checkRelaxedTimer.addEventListener("change", (e) => {
        this.profile.relaxedTimer = e.target.checked;
        StorageManager.save(this.profile);
      });

      this.checkSoundToggle.addEventListener("change", (e) => {
        this.profile.soundEnabled = e.target.checked;
        this.audio.enabled = e.target.checked;
        this.updateSoundIcons();
        StorageManager.save(this.profile);
      });

      // Career Reset
      document.getElementById("btn-reset-data").addEventListener("click", () => {
        if (window.confirm("Reset all bartender certification records, XP, and shift statistics?")) {
          localStorage.removeItem(STORAGE_KEY);
          this.profile = StorageManager.getDefaults();
          this.audio.enabled = true;
          this.renderProfile();
          this.updateHeaderUI();
          this.renderCodex();
          this.showScreen("lobby");
          this.showToast("Career log wiped. Station reset.");
        }
      });

      // Rapid Keyboard Accessibility
      window.addEventListener("keydown", (e) => {
        if (this.screens.game.classList.contains("is-hidden")) return;

        if (!this.hasAnswered) {
          if (e.key === "1") this.handleAnswerSelection(0);
          else if (e.key === "2") this.handleAnswerSelection(1);
          else if (e.key === "3") this.handleAnswerSelection(2);
          else if (e.key === "4") this.handleAnswerSelection(3);
        } else {
          if (e.key === "Enter" || e.key === " ") {
            if (e.target.tagName !== "BUTTON") {
              e.preventDefault();
              this.advanceToNextTicket();
            }
          }
        }
      });
    }

    showScreen(screenName) {
      clearInterval(this.timerInterval);
      Object.keys(this.screens).forEach((key) => {
        if (key === screenName) {
          this.screens[key].classList.remove("is-hidden");
          this.screens[key].classList.add("screen-active");
        } else {
          this.screens[key].classList.add("is-hidden");
          this.screens[key].classList.remove("screen-active");
        }
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    toggleSound() {
      this.profile.soundEnabled = !this.profile.soundEnabled;
      this.audio.enabled = this.profile.soundEnabled;
      this.checkSoundToggle.checked = this.profile.soundEnabled;
      this.updateSoundIcons();
      StorageManager.save(this.profile);
      if (this.profile.soundEnabled) this.audio.playClink();
    }

    updateSoundIcons() {
      if (this.profile.soundEnabled) {
        this.soundIconOn.classList.remove("is-hidden");
        this.soundIconOff.classList.add("is-hidden");
        this.btnToggleSound.setAttribute("aria-pressed", "true");
      } else {
        this.soundIconOn.classList.add("is-hidden");
        this.soundIconOff.classList.remove("is-hidden");
        this.btnToggleSound.setAttribute("aria-pressed", "false");
      }
    }

    showToast(message) {
      this.toastEl.textContent = message;
      this.toastEl.classList.remove("is-hidden");
      setTimeout(() => {
        this.toastEl.classList.add("is-hidden");
      }, 2600);
    }

    /* ==========================================================================
       7. SHIFT GAMEPLAY FLOW (5 PLAYTHROUGH TICKETS)
       ========================================================================== */
    startShift(mode = "standard") {
      this.audio.init();
      this.activeMode = mode;
      this.currentTicketIndex = 0;
      this.shiftScore = 0;
      this.shiftCorrect = 0;
      this.shiftStreak = 0;
      this.shiftPeakStreak = 0;
      this.responseTimes = [];
      this.categoryPerformance = {};
      this.shiftStartTime = Date.now();

      // Reset shift lifelines
      this.lifelineSpoons = 1;
      this.lifelineNotes = 1;
      this.spoonCount.textContent = "1";
      this.noteCount.textContent = "1";
      this.btnLifelineSpoon.disabled = false;
      this.btnLifelineNote.disabled = false;

      this.showScreen("game");
      this.loadTicket(0);
    }

    loadTicket(index) {
      clearInterval(this.timerInterval);
      this.hasAnswered = false;
      this.ticketStartTime = Date.now();

      const ticket = this.challenges[index];
      if (!ticket) {
        this.finishShift();
        return;
      }

      // Track performance by category
      if (!this.categoryPerformance[ticket.category]) {
        this.categoryPerformance[ticket.category] = { correct: 0, total: 0 };
      }
      this.categoryPerformance[ticket.category].total++;

      // UI Labels
      this.ticketTracker.textContent = `Ticket ${index + 1} of 5`;
      this.categoryPill.textContent = ticket.category;
      this.difficultyIndicator.textContent = `• Level ${ticket.difficulty}`;
      this.ticketStamp.textContent = `TICKET #${101 + index}`;
      this.questionPrompt.textContent = ticket.question;

      // Progress Fill Percentage
      const progressPercent = ((index) / 5) * 100;
      this.progressFill.style.width = `${Math.max(10, progressPercent)}%`;

      // Hide and reset hint box
      this.recipeHintBox.classList.add("is-hidden");
      this.recipeHintText.textContent = "";

      // Streak & Multiplier
      this.updateStreakBadge();

      // Reset Answer choices
      this.ansButtons.forEach((btn, i) => {
        btn.classList.remove("is-correct", "is-incorrect", "is-dimmed");
        btn.disabled = false;
        btn.querySelector(".ans-text").textContent = ticket.answers[i] || "";
      });

      // Reset Confidence Buttons to active state
      this.confButtons.forEach((b) => {
        if (b.getAttribute("data-conf") === this.currentConfidence) {
          b.classList.add("active");
          b.setAttribute("aria-checked", "true");
        } else {
          b.classList.remove("active");
          b.setAttribute("aria-checked", "false");
        }
      });

      // Hide Feedback Drawer
      this.feedbackDrawer.classList.add("is-hidden");
      this.feedbackDetailBox.classList.add("is-hidden");
      this.btnToggleDeep.textContent = "Read Deep Context";

      // Refresh lifelines availability
      this.btnLifelineSpoon.disabled = this.lifelineSpoons <= 0;
      this.btnLifelineNote.disabled = this.lifelineNotes <= 0;

      // Timer Setup
      let seconds = 16;
      if (this.activeMode === "rush") seconds = 8;
      else if (this.profile.relaxedTimer) seconds = 25;

      this.timeRemaining = seconds;
      this.timerDisplay.textContent = `${this.timeRemaining}s`;
      this.timerDisplay.style.color = "var(--warm-gold-bright)";

      this.timerInterval = setInterval(() => {
        this.timeRemaining--;
        this.timerDisplay.textContent = `${this.timeRemaining}s`;

        if (this.timeRemaining <= 3 && this.timeRemaining > 0) {
          this.audio.playTick();
          this.timerDisplay.style.color = "var(--color-danger-border)";
        } else {
          this.timerDisplay.style.color = "var(--warm-gold-bright)";
        }

        if (this.timeRemaining <= 0) {
          clearInterval(this.timerInterval);
          this.handleAnswerSelection(-1); // Timed out
        }
      }, 1000);
    }

    updateStreakBadge() {
      let multiplier = 1.0;
      if (this.shiftStreak >= 2) multiplier = 1.5;
      if (this.shiftStreak >= 4) multiplier = 2.0;

      this.multiplierBadge.textContent = `${multiplier.toFixed(1)}x Flow`;
      this.streakCounter.textContent = this.shiftStreak;
    }

    handleAnswerSelection(selectedIndex) {
      if (this.hasAnswered) return;
      this.hasAnswered = true;
      clearInterval(this.timerInterval);

      const responseDuration = (Date.now() - this.ticketStartTime) / 1000;
      this.responseTimes.push(responseDuration);

      const ticket = this.challenges[this.currentTicketIndex];
      const isCorrect = selectedIndex === ticket.correctIndex;

      // Lock buttons
      this.ansButtons.forEach((btn) => (btn.disabled = true));

      // Scoring calculation
      let baseBonus = 100;
      if (this.currentConfidence === "solid") baseBonus = 200;
      if (this.currentConfidence === "certain") baseBonus = 350;

      let flowMultiplier = 1.0;
      if (this.shiftStreak >= 2) flowMultiplier = 1.5;
      if (this.shiftStreak >= 4) flowMultiplier = 2.0;

      // Speed bonus for sub-4s answers
      const speedBonus = isCorrect && responseDuration < 4.0 ? 50 : 0;

      if (isCorrect) {
        this.audio.playSuccessChime();
        this.shiftCorrect++;
        this.shiftStreak++;
        if (this.shiftStreak > this.shiftPeakStreak) {
          this.shiftPeakStreak = this.shiftStreak;
        }

        const earnedPoints = Math.round(baseBonus * flowMultiplier) + speedBonus;
        this.shiftScore += earnedPoints;
        this.profile.totalXp += earnedPoints;
        this.categoryPerformance[ticket.category].correct++;

        // Style the chosen button
        this.ansButtons[selectedIndex].classList.add("is-correct");

        // Format feedback drawer
        this.feedbackStatus.className = "feedback-status correct";
        this.feedbackIcon.textContent = "✓";
        this.feedbackTitle.textContent = "Spot On, Barkeep!";
        this.feedbackPoints.textContent = `+${earnedPoints} XP`;

        // Clear recorded weakness if mastered
        if (this.profile.weakCategories[ticket.category]) {
          this.profile.weakCategories[ticket.category]--;
          if (this.profile.weakCategories[ticket.category] <= 0) {
            delete this.profile.weakCategories[ticket.category];
          }
        }
      } else {
        this.audio.playThud();
        this.shiftStreak = 0;

        // Certainty penalty if certain was selected incorrectly
        if (this.currentConfidence === "certain") {
          this.shiftScore = Math.max(0, this.shiftScore - 100);
        }

        if (selectedIndex >= 0) {
          this.ansButtons[selectedIndex].classList.add("is-incorrect");
        }
        this.ansButtons[ticket.correctIndex].classList.add("is-correct");

        this.feedbackStatus.className = "feedback-status incorrect";
        this.feedbackIcon.textContent = "✗";
        this.feedbackTitle.textContent = selectedIndex === -1 ? "Service Timeout!" : "Order Off-Spec";
        this.feedbackPoints.textContent = "+0 XP";

        // Track weakness
        if (!this.profile.weakCategories[ticket.category]) {
          this.profile.weakCategories[ticket.category] = 0;
        }
        this.profile.weakCategories[ticket.category]++;

        // Master Exam 1-strike out
        if (this.activeMode === "master") {
          setTimeout(() => {
            this.showToast("Exam Terminated: Zero-tolerance off-spec ticket.");
            this.finishShift();
          }, 1400);
          return;
        }
      }

      // Record stats
      this.profile.ticketsAnswered++;
      if (isCorrect) this.profile.ticketsCorrect++;
      if (this.shiftPeakStreak > this.profile.bestStreak) {
        this.profile.bestStreak = this.shiftPeakStreak;
      }

      this.updateStreakBadge();
      this.updateHeaderUI();

      // Principle and Context
      this.feedbackPrinciple.innerHTML = `<strong>Bartender's Principle:</strong> ${ticket.principle}`;
      this.feedbackDetailText.textContent = ticket.deepContext;
      this.feedbackDrawer.classList.remove("is-hidden");

      StorageManager.save(this.profile);
    }

    advanceToNextTicket() {
      this.currentTicketIndex++;
      if (this.currentTicketIndex >= this.challenges.length) {
        this.finishShift();
      } else {
        this.loadTicket(this.currentTicketIndex);
      }
    }

    /* ==========================================================================
       8. LIFELINE SYSTEMS
       ========================================================================== */
    useLifelineSpoon() {
      if (this.hasAnswered || this.lifelineSpoons <= 0) return;
      this.lifelineSpoons--;
      this.spoonCount.textContent = "0";
      this.btnLifelineSpoon.disabled = true;
      this.audio.playClink();

      const ticket = this.challenges[this.currentTicketIndex];
      const incorrectIndices = [0, 1, 2, 3].filter((i) => i !== ticket.correctIndex);

      // Randomly pick 2 incorrect indices to eliminate
      const shuffled = incorrectIndices.sort(() => Math.random() - 0.5).slice(0, 2);
      shuffled.forEach((idx) => {
        this.ansButtons[idx].classList.add("is-dimmed");
        this.ansButtons[idx].disabled = true;
      });

      this.showToast("Barspoon 50/50: 2 off-spec options removed.");
    }

    useLifelineNote() {
      if (this.hasAnswered || this.lifelineNotes <= 0) return;
      this.lifelineNotes--;
      this.noteCount.textContent = "0";
      this.btnLifelineNote.disabled = true;
      this.audio.playTick();

      const ticket = this.challenges[this.currentTicketIndex];
      this.recipeHintText.textContent = ticket.hint;
      this.recipeHintBox.classList.remove("is-hidden");
    }

    /* ==========================================================================
       9. SHIFT SUMMARY & RESULTS
       ========================================================================== */
    finishShift() {
      clearInterval(this.timerInterval);
      this.profile.shiftsCompleted++;
      StorageManager.save(this.profile);

      const totalServed = Math.max(1, this.currentTicketIndex + (this.hasAnswered ? 0 : 0));
      const effectiveTotal = Math.min(5, Math.max(this.currentTicketIndex, this.shiftCorrect));
      const accuracy = effectiveTotal > 0 ? Math.round((this.shiftCorrect / effectiveTotal) * 100) : 0;

      const avgSpeed = this.responseTimes.length > 0
        ? (this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length).toFixed(1)
        : "0.0";

      if (accuracy >= 80) {
        this.resultsStamp.textContent = "SERVICE EXCELLENCE";
        this.resultsHeadline.textContent = "Clean Ticket Board!";
        this.resultsSub.textContent = "Flawless craft knowledge, pristine dilution control, and zero returned drinks.";
      } else if (accuracy >= 60) {
        this.resultsStamp.textContent = "SHIFT PASSED";
        this.resultsHeadline.textContent = "Solid Station Service";
        this.resultsSub.textContent = "Station completed with good pacing. Review off-spec tickets below.";
      } else {
        this.resultsStamp.textContent = "RE-TRAINING REQUIRED";
        this.resultsHeadline.textContent = "Tough Shift Behind the Bar";
        this.resultsSub.textContent = "Multiple tickets sent back. Study the Bar Codex formulas to sharpen specs.";
      }

      this.resScore.textContent = this.shiftScore.toLocaleString();
      this.resAccuracy.textContent = `${accuracy}%`;
      this.resStreak.textContent = this.shiftPeakStreak;
      this.resSpeed.textContent = `${avgSpeed}s`;

      // Rank Progress Logic
      const rankInfo = this.getRankInfo(this.profile.totalXp);
      const nextRank = RANKS[rankInfo.index + 1];

      this.resRankName.textContent = rankInfo.name;
      if (nextRank) {
        const xpInLevel = this.profile.totalXp - rankInfo.minXp;
        const xpNeeded = nextRank.minXp - rankInfo.minXp;
        const pct = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));
        this.resRankFill.style.width = `${pct}%`;
        this.resXpToNext.textContent = `${nextRank.minXp - this.profile.totalXp} XP to ${nextRank.name}`;
      } else {
        this.resRankFill.style.width = "100%";
        this.resXpToNext.textContent = "Highest Certification Achieved";
      }

      // Breakdown by Category
      this.resBreakdownList.innerHTML = "";
      Object.keys(this.categoryPerformance).forEach((cat) => {
        const data = this.categoryPerformance[cat];
        const row = document.createElement("div");
        row.className = "breakdown-row";
        const catPct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
        row.innerHTML = `
          <span class="breakdown-cat">${cat}</span>
          <span class="breakdown-stat">${data.correct} / ${data.total} (${catPct}%)</span>
        `;
        this.resBreakdownList.appendChild(row);
      });

      this.renderProfile();
      this.updateHeaderUI();
      this.showScreen("results");
    }

    getRankInfo(xp) {
      let activeIndex = 0;
      for (let i = 0; i < RANKS.length; i++) {
        if (xp >= RANKS[i].minXp) {
          activeIndex = i;
        }
      }
      return { ...RANKS[activeIndex], index: activeIndex };
    }

    updateHeaderUI() {
      const rank = this.getRankInfo(this.profile.totalXp);
      this.scoreCounter.textContent = this.profile.totalXp.toLocaleString();
      this.rankText.textContent = rank.name;
      this.updateSoundIcons();
    }

    /* ==========================================================================
       10. CODEX & RECIPE VAULT (PULLED DIRECTLY FROM THE 5 CHALLENGES)
       ========================================================================== */
    renderCodex(filterCat = "all", searchQuery = "") {
      this.codexCardsGrid.innerHTML = "";

      const filtered = this.challenges.filter((item) => {
        const matchesCategory = filterCat === "all" || item.category === filterCat;
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = !q ||
          item.title.toLowerCase().includes(q) ||
          item.spec.toLowerCase().includes(q) ||
          item.principle.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      });

      this.codexCountBadge.textContent = `${filtered.length} of ${this.challenges.length} Formulas`;

      filtered.forEach((item) => {
        const card = document.createElement("article");
        card.className = "codex-card";
        card.innerHTML = `
          <div class="codex-card-top">
            <h2 class="codex-card-title">${item.title}</h2>
            <span class="codex-card-cat">${item.category}</span>
          </div>
          <div class="codex-recipe-spec">${item.spec}</div>
          <p class="codex-principle"><strong>Principle:</strong> ${item.principle}</p>
          <p class="codex-notes">${item.deepContext}</p>
        `;
        this.codexCardsGrid.appendChild(card);
      });

      document.getElementById("codex-unlocked-summary").textContent = 
        `${this.challenges.length} Curated Craft Formulas`;
    }

    filterCodex(category) {
      this.codexFilters.forEach((tab) => {
        if (tab.getAttribute("data-cat") === category) {
          tab.classList.add("is-active");
          tab.setAttribute("aria-selected", "true");
        } else {
          tab.classList.remove("is-active");
          tab.setAttribute("aria-selected", "false");
        }
      });
      this.renderCodex(category, this.codexSearchInput.value);
    }

    searchCodex(query) {
      const activeTab = document.querySelector(".filter-tab.is-active");
      const cat = activeTab ? activeTab.getAttribute("data-cat") : "all";
      this.renderCodex(cat, query);
    }

    /* ==========================================================================
       11. BARTENDER PROFILE & CAREER DIAGNOSTICS
       ========================================================================== */
    renderProfile() {
      const rank = this.getRankInfo(this.profile.totalXp);
      this.profBadgeIcon.textContent = rank.badge;
      this.profRankName.textContent = rank.name;

      this.profTotalShifts.textContent = this.profile.shiftsCompleted;
      this.profTotalAnswers.textContent = this.profile.ticketsAnswered;

      const accuracy = this.profile.ticketsAnswered > 0
        ? Math.round((this.profile.ticketsCorrect / this.profile.ticketsAnswered) * 100)
        : 0;
      this.profLifetimeAcc.textContent = `${accuracy}%`;
      this.profBestStreak.textContent = this.profile.bestStreak;

      this.checkRelaxedTimer.checked = !!this.profile.relaxedTimer;
      this.checkSoundToggle.checked = !!this.profile.soundEnabled;

      // Diagnostic Focus Areas
      this.weakSpotsList.innerHTML = "";
      const weakKeys = Object.keys(this.profile.weakCategories).filter(
        (k) => this.profile.weakCategories[k] > 0
      );

      if (weakKeys.length === 0) {
        this.weakSpotsList.innerHTML = `
          <div class="empty-state-card">Station clean! No recurrent knowledge blindspots logged.</div>
        `;
      } else {
        weakKeys.forEach((cat) => {
          const item = document.createElement("div");
          item.className = "weak-item";
          item.innerHTML = `
            <span>${cat}</span>
            <span style="color: var(--burnt-orange-bright); font-weight: bold;">${this.profile.weakCategories[cat]} Off-Spec</span>
          `;
          this.weakSpotsList.appendChild(item);
        });
      }
    }
  }

  // Safe DOM Initialization
  document.addEventListener("DOMContentLoaded", () => {
    window.barGame = new BarGameEngine();
  });
})();