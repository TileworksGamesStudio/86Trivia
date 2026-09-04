javascript
/**
 * BAR KNOWLEDGE: THE BARTENDER'S TRIVIA GAME
 * Complete Production Logic Engine
 * Zero external frameworks, pure browser-native APIs.
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. AUTHENTIC BARTENDER KNOWLEDGE BASE
     40+ deep, verified tickets spanning:
     - Classic Specs
     - Dilution & Ice Thermodynamics
     - Sensory Diagnosis & Troubleshooting
     - Glassware & Thermal Capacity
     - Spirits & Fortified Wines
     - History & Speakeasy Culture
     - Service & Station Workflow
     ========================================================================== */

  const QUESTION_BANK = [
    {
      id: 'spec-negroni',
      category: 'Classic Specs',
      difficulty: 'FOUNDATION',
      prompt: 'A guest orders a standard classic Negroni. Which specification defines the internationally accepted canonical equal-parts ratio?',
      answers: [
        '1 oz London Dry Gin, 1 oz Campari, 1 oz Sweet Red Vermouth',
        '2 oz London Dry Gin, 1 oz Campari, 0.5 oz Sweet Vermouth',
        '1.5 oz Bourbon, 1 oz Campari, 1 oz Sweet Vermouth',
        '1 oz Gin, 1 oz Aperol, 1 oz Dry White Vermouth'
      ],
      correctIndex: 0,
      explanation: 'The classic Negroni, originating in Florence c. 1919 for Count Camillo Negroni, is built on a 1:1:1 ratio of Gin, Campari, and Sweet Vermouth.',
      proTip: 'Always stir with dense cubes and express fresh orange peel oils across the surface to cut through the heavy bitter-sweet botanicals.'
    },
    {
      id: 'trouble-sour-flabby',
      category: 'Sensory Diagnosis',
      difficulty: 'INTERMEDIATE',
      prompt: 'A freshly shaken Whiskey Sour tastes heavy, flat, and "flabby" on the palate despite using accurate 2 oz bourbon, 0.75 oz fresh lemon, and 0.75 oz 1:1 simple syrup. What is the most probable diagnosis?',
      answers: [
        'Insufficient shaking resulting in under-dilution and lack of critical aeration',
        'The bourbon proof was too high for the citrus balance',
        'The drink was strained into a warm glass with no ice',
        'Using 1:1 simple syrup instead of 2:1 rich simple syrup'
      ],
      correctIndex: 0,
      explanation: 'Cocktails containing citrus and sugar require vigorous aeration and approximately 20-25% water dilution to integrate acidity and soften viscosity. Insufficient shaking leaves the drink syrupy, heavy, and perceptually flat ("flabby").',
      proTip: 'A hard shake introduces thousands of microscopic air bubbles which brighten citrus perception and give texture, especially when egg white or aquafaba is present.'
    },
    {
      id: 'tech-stir-vs-shake',
      category: 'Technique',
      difficulty: 'FOUNDATION',
      prompt: 'Why is a classic Manhattan or Martini stirred rather than shaken behind a professional craft bar?',
      answers: [
        'To chill and dilute while preserving crystal clarity and a velvety, bubble-free mouthfeel',
        'Because shaking bruises the gin botanicals and damages alcohol molecules',
        'Because vermouth decomposes when agitated violently',
        'To prevent the cocktail from reaching freezing temperatures'
      ],
      correctIndex: 0,
      explanation: 'Spirit-forward cocktails with no fruit juices, dairy, or egg are stirred to ensure silky mouthfeel and visual clarity. "Bruising gin" is a historical myth; shaking simply forces clouding aeration and rapid over-dilution into drinks that demand silkiness.',
      proTip: 'Target 30 to 45 revolutions in the mixing glass with dense ice to hit approximately -1°C to 0°C and 18-22% dilution.'
    },
    {
      id: 'glass-coupe-thermal',
      category: 'Glassware',
      difficulty: 'INTERMEDIATE',
      prompt: 'What is the primary operational and sensory purpose of serving cocktails "up" in stemmed glassware (Coupe or Nick & Nora) rather than a tumbler?',
      answers: [
        'The stem prevents the guest’s hand heat from warming the un-iced cocktail',
        'To accommodate decorative powdered rims more easily',
        'To force the guest to drink the cocktail faster before carbonation escapes',
        'To permit wider ice spears to float horizontally'
      ],
      correctIndex: 0,
      explanation: 'Drinks served "up" have no ice to maintain chilling in the glass. The stem isolates the bowl from conductive thermal transfer from the customer’s fingers and palms.',
      proTip: 'Always pre-chill your coupes in a service freezer or pack them with crushed ice and soda water while building the drink in the tin.'
    },
    {
      id: 'sensory-corpse-reviver-diag',
      category: 'Sensory Diagnosis',
      difficulty: 'ADVANCED',
      prompt: 'A Corpse Reviver #2 is returned: "It tastes like licorice floor cleaner." Upon reviewing the ticket, the bartender added 0.25 oz absinthe directly into the shaker. What was the correct standard technique?',
      answers: [
        'Absinthe should only rinse the chilled glass (or be applied via atomizer) to impart aroma without overpowering the delicate citrus balance',
        'Absinthe must only be added after double-straining onto crushed ice',
        'Absinthe should be dry shaken first with the gin to neutralize anethole oils',
        'Pastis should have been substituted at equal volume'
      ],
      correctIndex: 0,
      explanation: 'In the Corpse Reviver #2 (equal parts Gin, Cointreau, Lillet Blanc, Lemon), absinthe is an aromatic accent. Incorporating 0.25 oz directly swamps the palate. An absinthe rinse or mist provides aromatic top-notes without obliterating the delicate Lillet structure.',
      proTip: 'Discard the excess rinse into a dump sink or jigger before pouring the cocktail into the glass.'
    },
    {
      id: 'spec-margarita-curacao',
      category: 'Classic Specs',
      difficulty: 'FOUNDATION',
      prompt: 'What distinguishes a traditional classic 1930s-1940s Daisy-style Margarita from a modern Tommy’s Margarita?',
      answers: [
        'Tommy’s omits orange liqueur (triple sec) entirely, sweetening solely with agave nectar',
        'Tommy’s adds fresh egg white and orange flower water',
        'Traditional Margaritas use blended Scotch instead of Tequila',
        'Traditional Margaritas are never served with salt on the rim'
      ],
      correctIndex: 0,
      explanation: 'Julio Bermejo created Tommy’s Margarita in San Francisco during the 1990s, highlighting 100% agave tequila by removing triple sec and substituting agave nectar, resulting in a cleaner, more agave-focused sour.',
      proTip: 'When salting rims, salt only half the circumference of the glass. Never salt the interior where crystals fall into the drink and over-salinate the wash.'
    },
    {
      id: 'ice-clear-vs-cloudy',
      category: 'Technique',
      difficulty: 'ADVANCED',
      prompt: 'Why do premium cocktail programs invest in directional-freezing clear ice blocks over commercial hollow machine ice cubes for Old Fashioneds?',
      answers: [
        'Clear ice is free of trapped oxygen and minerals, providing a much lower surface-area-to-mass ratio that chills with minimal initial melt wash',
        'Clear ice contains lower alcohol absorption ratings than white ice',
        'Clear ice chemically reacts with bitters to lower perception of wood tannins',
        'Clear ice lowers the liquid temperature below -10°C in under five seconds'
      ],
      correctIndex: 0,
      explanation: 'Directional freezing pushes dissolved gasses and minerals away, leaving dense, pure water ice. A single 2-inch clear cube melts significantly slower than multiple small cloudy cubes, maintaining ideal temperature without waterlogging high-proof spirits.',
      proTip: 'Always temper a clear ice cube at room temperature for 1-2 minutes until clear of frost before pouring room-temperature spirits over it, preventing immediate violent cracking.'
    },
    {
      id: 'spirits-vermouth-storage',
      category: 'Spirits & Wine',
      difficulty: 'FOUNDATION',
      prompt: 'A customer complains that their Martini tastes like cardboard, vinegar, and stewed prunes. What backbar error causes this common defect?',
      answers: [
        'The vermouth was stored uncapped at warm room temperature for months and oxidized',
        'The gin was distilled using winter wheat instead of malted barley',
        'The olives were stored in brine with low lactic acid concentration',
        'The mixing glass was rinsed with hot tap water before chilling'
      ],
      correctIndex: 0,
      explanation: 'Vermouth is a fortified wine, not a high-proof distilled spirit. Once opened, exposure to oxygen and heat degrades delicate aromatics into vinegar, cardboard, and oxidation off-notes. Vermouth should always be refrigerated and pumped or gassed after opening.',
      proTip: 'Date every opened bottle of dry and sweet vermouth behind your bar. Discard or use for culinary syrup after 30 to 45 days refrigerated.'
    },
    {
      id: 'history-old-fashioned-slug',
      category: 'History',
      difficulty: 'INTERMEDIATE',
      prompt: 'What was the original 1806 definition of a "Cock-tail" published in The Balance and Columbian Repository?',
      answers: [
        'A stimulating liquor composed of spirits of any kind, sugar, water, and bitters',
        'A mixture of imported West Indian rum, citrus juice, and nutmeg',
        'Champagne blended with cognac and aromatic citrus peel',
        'A morning punch composed of ale, cider, and brandy'
      ],
      correctIndex: 0,
      explanation: 'The seminal 1806 definition defines the fundamental ancestral template of what would later be christened the "Old Fashioned" cocktail: spirit, sugar, water, and bitters.',
      proTip: 'Notice that water is an essential original ingredient—represented today by the deliberate melting and dilution from stirring with ice.'
    },
    {
      id: 'sensory-egg-white-dry-shake',
      category: 'Technique',
      difficulty: 'INTERMEDIATE',
      prompt: 'What is the biochemical reason for performing a "dry shake" (or reverse dry shake) when preparing a Ramos Gin Fizz or Pisco Sour?',
      answers: [
        'To emulsify egg white proteins and build stable foam without premature dilution from ice',
        'To sterilize bacteria in the egg white via ambient air temperature',
        'To prevent citrus acids from curdling dairy fats',
        'To evaporate volatile higher alcohols before serving'
      ],
      correctIndex: 0,
      explanation: 'Egg white proteins (albumin) unfold and entrap air bubbles under mechanical shear. Shaking without ice first allows the proteins to bond and form stable foam without being chilled, which would harden fats and restrict foam volume.',
      proTip: 'Reverse dry shake (shaking with ice first to chill and dilute, straining out ice, then shaking violently empty) yields an exceptionally tight, meringue-like foam.'
    },
    {
      id: 'service-ticket-priority',
      category: 'Service & Operations',
      difficulty: 'ADVANCED',
      prompt: 'A four-drink service ticket arrives: 1 Dry Gin Martini (Up), 1 Ramos Gin Fizz, 1 Draught Pilsner, 1 Boulevardier on a rock. What is the correct preparation sequence?',
      answers: [
        'Start Ramos Gin Fizz (fizz build takes time), stir Boulevardier and Martini, pour draught beer last right before pickup',
        'Pour draught beer first, shake Ramos, stir drinks, leave on service well',
        'Build and stir the Martini first so it sits on the bar counter longest',
        'Stir Boulevardier, pour beer, shake Ramos, shake Martini'
      ],
      correctIndex: 0,
      explanation: 'Beer head degrades and warms fastest; it must be poured last. The Ramos Gin Fizz requires intensive shaking and resting in the glass. Stemmed drinks without ice (Martini) warm rapidly if left standing.',
      proTip: 'Mise en place rule: Never let a drink without ice wait for a drink with ice, and never let draft beer wait for shaken cocktails.'
    },
    {
      id: 'spec-daiquiri-ratio',
      category: 'Classic Specs',
      difficulty: 'FOUNDATION',
      prompt: 'What is the classic craft bartender specification ratio for an authentic Hemingway or standard Cuban Daiquiri?',
      answers: [
        '2 oz Light Rum, 0.75 oz Fresh Lime Juice, 0.75 oz Simple Syrup (or 2:0.75:0.75)',
        '1 oz Rum, 2 oz Lime Juice, 2 oz Sugar Syrup',
        '2 oz Dark Jamaican Rum, 1 oz Grenadine, 1 oz Lime Juice',
        '1.5 oz Spiced Rum, 0.5 oz Pineapple Juice, 0.5 oz Triple Sec'
      ],
      correctIndex: 0,
      explanation: 'The Daiquiri is the supreme benchmark of craft bartending execution: 2 oz white rum, 3/4 oz freshly squeezed lime juice, and 3/4 oz simple syrup (or rich simple adapted to taste).',
      proTip: 'If your limes are late-season and less acidic, adjust syrup down or use an acid-adjusted citrus solution to keep the finish crisp.'
    },
    {
      id: 'spirits-bourbon-legal',
      category: 'Spirits & Wine',
      difficulty: 'INTERMEDIATE',
      prompt: 'Under US Title 27 Federal Standards of Identity, which criteria is legally mandatory for a whiskey to be labeled "Straight Bourbon Whiskey"?',
      answers: [
        'Distilled from minimum 51% corn, aged in new charred oak containers for at least 2 years, with zero color additives',
        'Produced exclusively within the state boundaries of Kentucky and aged in French Limousin oak',
        'Distilled to no more than 190 proof and aged in used sherry casks for 3 years',
        'Contains at least 80% corn and aged in uncharred American white oak'
      ],
      correctIndex: 0,
      explanation: 'Bourbon must contain minimum 51% corn, enter the barrel at no higher than 125 proof, and age in new charred oak. "Straight" requires minimum 2 years of aging with no added flavoring or coloring.',
      proTip: 'Bourbon can legally be produced in ANY US state, not solely Kentucky, though Kentucky produces approximately 95% of world supply.'
    },
    {
      id: 'sensory-over-dilution',
      category: 'Sensory Diagnosis',
      difficulty: 'FOUNDATION',
      prompt: 'A guest sends back a Sazerac: "It tastes watery and completely hollow in the mid-palate." What error during preparation caused this flaw?',
      answers: [
        'Stirring with small, melting "wet ice" for too long before straining into the chilled glass',
        'Using 100-proof Rye whiskey instead of 80-proof bourbon',
        'Rinsing the glass with Herbsaint or Absinthe before pouring',
        'Expressing the lemon peel over the drink without dropping it in'
      ],
      correctIndex: 0,
      explanation: 'Wet ice (ice that has been sitting in ambient air with water coating the cubes) melts immediately on contact, flooding the cocktail with excess melt water before adequate temperature drop occurs.',
      proTip: 'Always burn off melt water from your ice well and draw fresh dry cubes from the machine or freezer for stirring spirit-forward drinks.'
    },
    {
      id: 'history-sazerac-origin',
      category: 'History',
      difficulty: 'ADVANCED',
      prompt: 'Why did the New Orleans Sazerac cocktail historically transition from its original Cognac base to American Rye Whiskey in the late 19th century?',
      answers: [
        'The Phylloxera epidemic devastated French vineyards, crippling Cognac supply to the Port of New Orleans',
        'Rye whiskey was mandated by Louisiana state law following the Civil War',
        'Antoine Peychaud refused to allow his bitters to be paired with grape spirits',
        'Cognac proved too sweet for the newly invented carbonated water siphons'
      ],
      correctIndex: 0,
      explanation: 'In the 1870s, the Phylloxera aphid wiped out European viticulture. Cognac imports dried up, prompting New Orleans bar owners to substitute local, robust American Maryland/Pennsylvania rye whiskeys.',
      proTip: 'A modern "split-base" Sazerac (1 oz Rye, 1 oz Cognac) delivers both the spicy backbone of rye and the rich dried-fruit depth of the original drink.'
    },
    {
      id: 'garnish-flamed-citrus',
      category: 'Technique',
      difficulty: 'INTERMEDIATE',
      prompt: 'What is the precise sensory objective of expressing and flaming an orange peel over a Metropolitan or Cosmopolitan?',
      answers: [
        'To caramelize the expressed essential oils (limonene), reducing sharpness and depositing a warm smoky citrus aroma on top',
        'To burn off alcohol vapors rising from the surface of the drink',
        'To heat the top layer of the cocktail so the guest experiences alternating hot and cold sips',
        'To chemically oxidize the cranberry tannins in the cocktail'
      ],
      correctIndex: 0,
      explanation: 'Flaming an orange peel passes the fine mist of expressed volatile peel oils through a match flame. This scorches and caramelizes the essential oils, yielding aromatic warmth rather than bright raw citrus punch.',
      proTip: 'Warm the peel gently over the flame for three seconds first to mobilize the oils before giving it a sharp, deliberate fold.'
    },
    {
      id: 'spirits-mezcal-tequila',
      category: 'Spirits & Wine',
      difficulty: 'INTERMEDIATE',
      prompt: 'What primary production stage is responsible for the characteristic smoky, earthy profile found in artisanal Mezcals compared to standard Tequilas?',
      answers: [
        'Mezcal agave piñas are roasted in underground earthen conical pits lined with volcanic stone and wood coals',
        'Mezcal is aged in charred peat whiskey barrels from Scotland',
        'Liquid smoke extract is legally permitted in artisanal Mezcal Norma Oficial Mexicana',
        'Mezcal must be distilled three times over open mesquite wood fires'
      ],
      correctIndex: 0,
      explanation: 'Artisanal Mezcal relies on underground stone pits where piñas cook over wood embers for days. Tequila typically cooks agave piñas using steam in above-ground brick ovens (hornos) or autoclaves, preserving fresh vegetative sweetness without smoke.',
      proTip: 'Mezcal can be made from over 30 varieties of agave (Espadín, Tobalá, Arroqueño), whereas 100% Tequila can only legally be distilled from Blue Agave (Agave Tequilana Weber).'
    },
    {
      id: 'ops-carbonation-retention',
      category: 'Service & Operations',
      difficulty: 'INTERMEDIATE',
      prompt: 'When building a highball cocktail (like a Gin & Tonic or Paloma), which technique preserves the highest dissolved CO2 level and carbonation fizz?',
      answers: [
        'Pouring cold soda slowly down a spiraled barspoon into an ice-packed glass, then giving a single gentle lift rather than aggressive stirring',
        'Stirring the highball vigorously for 15 seconds to ensure spirits blend with the tonic',
        'Pouring room temperature tonic over crushed pebble ice',
        'Adding citrus juice after pouring the carbonated soda to lock the bubbles in'
      ],
      correctIndex: 0,
      explanation: 'Rough nucleation surfaces, warmth, and turbulent agitation liberate dissolved CO2 instantaneously. Cold glassware, dense cubes, chilled soda poured gently, and a single vertical spoon lift keep carbonation crisp.',
      proTip: 'Never shake a cocktail and then dump tonic into the shaker tin. Build directly in the pre-chilled tall Collins glass.'
    },
    {
      id: 'spec-aviation-maraschino',
      category: 'Classic Specs',
      difficulty: 'INTERMEDIATE',
      prompt: 'In Hugo Ensslin’s 1916 Aviation cocktail, which ingredient gives the drink its distinctive pale sky-blue/violet hue?',
      answers: [
        'Crème de Violette (or Crème Yvette)',
        'Blue Curaçao',
        'Parfait d’Amour',
        'Butterfly Pea Flower infused London Dry Gin'
      ],
      correctIndex: 0,
      explanation: 'The classic Aviation contains Gin, Maraschino liqueur, Lemon Juice, and Crème de Violette. During the mid-century cocktail dark ages, Violette became unavailable, leading to versions omitting it until the craft revival.',
      proTip: 'Be very frugal with Crème de Violette: 0.25 oz or even a barspoon is plenty; too much turns the cocktail into a soap-tasting purple mess.'
    },
    {
      id: 'sensory-acid-adjustment',
      category: 'Sensory Diagnosis',
      difficulty: 'ADVANCED',
      prompt: 'A cocktail creator wants to use fresh orange juice in a Sour-style cocktail without throwing off the classic 0.75 oz acid-sugar volume balance. What modern mixology technique resolves this?',
      answers: [
        'Acid adjusting the orange juice with powdered citric and malic acid to match lemon or lime acidity (approx. 6% titratable acidity)',
        'Boiling the orange juice to concentrate its fructose content',
        'Adding 0.5 oz of 80-proof grain alcohol to raise the juice’s ABV',
        'Passing the juice through activated charcoal filters to remove sweetness'
      ],
      correctIndex: 0,
      explanation: 'Orange juice has pleasant aromatics but only ~1% acidity, requiring large volumes that over-dilute drinks. By adding citric and malic acids to match lime juice (6%), you can use orange juice in standard sour proportions.',
      proTip: 'Citric acid provides immediate sharp bite, while malic acid (found in green apples) gives lingering mouthwatering acidity.'
    }
  ];

  /* ==========================================================================
     2. CODEX RECIPE DATABASE (The Bartender's Reference)
     ========================================================================== */
  const CODEX_DATA = [
    {
      id: 'negroni',
      name: 'Negroni',
      type: 'spirit-forward',
      glass: 'Rocks / Old Fashioned',
      method: 'Stirred over dense ice',
      garnish: 'Expressed Orange Peel',
      specs: '1.0 oz Gin • 1.0 oz Campari • 1.0 oz Sweet Vermouth',
      notes: 'Created in Florence 1919. Perfect 1:1:1 balance of juniper, bitter gentian root, and sweet herbal wine.'
    },
    {
      id: 'martini',
      name: 'Classic Dry Martini',
      type: 'spirit-forward',
      glass: 'Nick & Nora or Coupe',
      method: 'Stirred 35-45 rotations to ~ -1°C',
      garnish: 'Lemon Twist or Castelvetrano Olive',
      specs: '2.25 oz London Dry Gin • 0.75 oz Dry French Vermouth • 1 dash Orange Bitters',
      notes: 'Preserve absolute silkiness. Never shake. Keep glassware frozen at -18°C.'
    },
    {
      id: 'daiquiri',
      name: 'Classic Cuban Daiquiri',
      type: 'sour',
      glass: 'Coupe',
      method: 'Shaken hard with cubed ice; double strained',
      garnish: 'Dehydrated Lime wheel (optional)',
      specs: '2.0 oz Light Rum • 0.75 oz Fresh Lime Juice • 0.75 oz Simple Syrup (1:1)',
      notes: 'The acid-balance benchmark. Aeration should create a delicate ice-crystal mist over the wash.'
    },
    {
      id: 'old-fashioned',
      name: 'Whiskey Old Fashioned',
      type: 'spirit-forward',
      glass: 'Double Old Fashioned',
      method: 'Built in glass or mixing glass; poured over single clear cube',
      garnish: 'Expressed Orange Peel & Luxardo Cherry',
      specs: '2.0 oz Rye or Bourbon • 1 barspoon Rich Demerara Syrup (2:1) • 2 dashes Angostura • 1 dash Orange Bitters',
      notes: 'Do not muddle maraschino cherries or orange slices into the bottom. Keep it focused and dignified.'
    },
    {
      id: 'whiskey-sour',
      name: 'Boston Whiskey Sour',
      type: 'sour',
      glass: 'Coupe or Rocks',
      method: 'Reverse dry shake with egg white; double strain',
      garnish: 'Angostura drops drawn through foam',
      specs: '2.0 oz Bourbon • 0.75 oz Fresh Lemon Juice • 0.75 oz Simple Syrup • 0.5 oz Egg White (or Aquafaba)',
      notes: 'Aromatic drops of Angostura bitters over foam neutralize wet-egg aroma while providing contrast.'
    },
    {
      id: 'highball',
      name: 'Japanese Style Whisky Highball',
      type: 'highball',
      glass: 'Pre-chilled Collins / Highball',
      method: 'Built with spear ice; poured down barspoon; single fold lift',
      garnish: 'Lemon peel twist expressed over rim',
      specs: '2.0 oz Blended Japanese Whisky • 5.0 oz Ice-Cold Soda Water',
      notes: 'Maximum carbonation and extreme chilling. Glass, spirit, and soda should all be kept freezing.'
    },
    {
      id: 'corpse-reviver-2',
      name: 'Corpse Reviver #2',
      type: 'sour',
      glass: 'Chilled Coupe',
      method: 'Shaken hard; absinthe rinsed glass',
      garnish: 'Expressed Lemon twist (discarded)',
      specs: '0.75 oz Gin • 0.75 oz Cointreau • 0.75 oz Lillet Blanc • 0.75 oz Lemon Juice • Absinthe Rinse',
      notes: 'Classic Savoy 1930 morning reviver. The absinthe must remain an aromatic ghost, never a dominant volume.'
    },
    {
      id: 'sazerac',
      name: 'New Orleans Sazerac',
      type: 'spirit-forward',
      glass: 'Chilled Old Fashioned (No Ice)',
      method: 'Stirred with ice; strained into absinthe-rinsed glass',
      garnish: 'Expressed Lemon peel discarded',
      specs: '1.5 oz Rye Whiskey • 0.5 oz Cognac • 1 Sugar Cube • 3 dashes Peychaud’s Bitters • 1 dash Angostura • Absinthe Rinse',
      notes: 'Historically served without ice in the drinking glass. The temperature comes entirely from the mixing glass stir.'
    }
  ];

  /* ==========================================================================
     3. CAREER RANK SYSTEM (Authentic Progression)
     ========================================================================== */
  const RANKS = [
    { title: 'Barback', minXp: 0, lore: 'Mastering station mise en place, clean ice wells, and basic syrup preparations.' },
    { title: 'Apprentice Bartender', minXp: 300, lore: 'Confidently builds classic sours and remembers canonical 3-ingredient specs.' },
    { title: 'Craft Bartender', minXp: 800, lore: 'Understands thermal transfer, dilution curves, and correct glassware pairing.' },
    { title: 'Senior Bartender', minXp: 1600, lore: 'Manages high-volume ticket ordering and diagnoses off-flavors instantly.' },
    { title: 'Head Mixologist', minXp: 3000, lore: 'Understands acid modification, clear ice physics, and historical lineages.' },
    { title: 'Master of the Craft', minXp: 5000, lore: 'Peerless intuition. Zero hesitation under pressure behind any world bar.' }
  ];

  /* ==========================================================================
     4. AUDIO ENGINE (Synthesized via Vanilla Web Audio API)
     Zero external audio files required. Completely resilient.
     ========================================================================== */
  class BarAudioEngine {
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

    playClick() {
      if (!this.enabled || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      } catch (e) {
        // Audio error resilient fail
      }
    }

    playCorrect() {
      if (!this.enabled || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio crystal clink
        freqs.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + (idx * 0.04));
          gain.gain.setValueAtTime(0.06, now + (idx * 0.04));
          gain.gain.exponentialRampToValueAtTime(0.0001, now + (idx * 0.04) + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + (idx * 0.04));
          osc.stop(now + (idx * 0.04) + 0.35);
        });
      } catch (e) {}
    }

    playIncorrect() {
      if (!this.enabled || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.18);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.18);
      } catch (e) {}
    }

    playStreak() {
      if (!this.enabled || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const freqs = [587.33, 880, 1174.66]; // Fanfare D5 chord
        freqs.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + (idx * 0.05));
          gain.gain.setValueAtTime(0.08, now + (idx * 0.05));
          gain.gain.exponentialRampToValueAtTime(0.0001, now + (idx * 0.05) + 0.45);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + (idx * 0.05));
          osc.stop(now + (idx * 0.05) + 0.45);
        });
      } catch (e) {}
    }
  }

  /* ==========================================================================
     5. STORAGE & STATE CONTROLLER
     ========================================================================== */
  const STORAGE_KEY = 'bar_knowledge_master_v1';

  function loadProfile() {
    const fallback = {
      xp: 0,
      shiftsCompleted: 0,
      ticketsAnswered: 0,
      ticketsCorrect: 0,
      maxStreak: 0,
      categoryStats: {},
      weaknesses: {}, // { categoryName: count }
      lastDaily: null,
      settings: {
        sound: true,
        reducedMotion: false,
        highContrast: false
      }
    };
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? Object.assign(fallback, JSON.parse(data)) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {}
  }

  /* ==========================================================================
     6. MAIN APPLICATION LOGIC
     ========================================================================== */
  const audio = new BarAudioEngine();
  let userProfile = loadProfile();

  // Active Session State
  let session = {
    mode: 'classic', // 'classic', 'rush', 'sensory', 'daily'
    tickets: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    roundStreakMax: 0,
    correctCount: 0,
    timerInterval: null,
    timeRemaining: 60,
    awaitingAdvance: false,
    answeredHistory: []
  };

  // DOM Cache
  const views = {
    home: document.getElementById('view-home'),
    game: document.getElementById('view-game'),
    results: document.getElementById('view-results'),
    codex: document.getElementById('view-codex'),
    profile: document.getElementById('view-profile'),
    settings: document.getElementById('view-settings')
  };

  const UI = {
    headerRank: document.getElementById('header-rank'),
    headerXp: document.getElementById('header-xp'),
    audioToggle: document.getElementById('btn-audio-toggle'),
    audioIcon: document.getElementById('audio-icon'),

    // Gameplay UI
    ticketProgress: document.getElementById('ticket-progress'),
    ticketCategory: document.getElementById('ticket-category'),
    ticketStreak: document.getElementById('ticket-streak'),
    streakContainer: document.getElementById('streak-container'),
    ticketScore: document.getElementById('ticket-score'),
    timerDisplay: document.getElementById('timer-display'),
    timerSeconds: document.getElementById('timer-seconds'),
    progressFill: document.getElementById('round-progress-fill'),
    difficultyBadge: document.getElementById('ticket-difficulty'),
    ticketSpecId: document.getElementById('ticket-spec-id'),
    ticketPrompt: document.getElementById('ticket-prompt'),
    confidenceBar: document.getElementById('confidence-bar'),
    answerGrid: document.getElementById('answer-grid'),
    feedbackDrawer: document.getElementById('feedback-drawer'),
    feedbackBanner: document.getElementById('feedback-banner'),
    feedbackIcon: document.getElementById('feedback-icon'),
    feedbackTitle: document.getElementById('feedback-title'),
    feedbackExplanation: document.getElementById('feedback-explanation'),
    feedbackProTip: document.getElementById('feedback-pro-tip'),
    btnNextTicket: document.getElementById('btn-next-ticket'),
    btnAbandon: document.getElementById('btn-abandon-shift'),

    // Results UI
    resHeadline: document.getElementById('results-headline'),
    resScore: document.getElementById('res-score'),
    resAccuracy: document.getElementById('res-accuracy'),
    resStreak: document.getElementById('res-streak'),
    resXp: document.getElementById('res-xp'),
    resRankName: document.getElementById('res-rank-name'),
    resRankDesc: document.getElementById('res-rank-desc'),
    resRankFill: document.getElementById('res-rank-progress-fill'),
    resXpCurr: document.getElementById('res-xp-curr'),
    resXpNext: document.getElementById('res-xp-next'),
    mistakesList: document.getElementById('mistakes-list'),
    btnReplay: document.getElementById('btn-replay-shift'),
    btnResultsHome: document.getElementById('btn-results-to-home'),

    // Codex UI
    codexContainer: document.getElementById('codex-cards-container'),
    codexSearch: document.getElementById('codex-search'),
    codexFilterContainer: document.getElementById('codex-filters'),
    codexCounter: document.getElementById('codex-counter'),

    // Profile UI
    profRankTitle: document.getElementById('prof-rank-title'),
    profRankLore: document.getElementById('prof-rank-lore'),
    profShifts: document.getElementById('prof-stat-shifts'),
    profQuestions: document.getElementById('prof-stat-questions'),
    profAccuracy: document.getElementById('prof-stat-accuracy'),
    profMaxStreak: document.getElementById('prof-stat-maxstreak'),
    categoryMasteryList: document.getElementById('category-mastery-list'),
    weaknessList: document.getElementById('profile-weakness-list'),
    weaknessBadge: document.getElementById('weakness-count-badge'),

    // Settings UI
    setSound: document.getElementById('set-sound'),
    setMotion: document.getElementById('set-motion'),
    setContrast: document.getElementById('set-contrast'),
    btnReset: document.getElementById('btn-reset-data')
  };

  // Helper: Get Rank Object from XP
  function getRank(xp) {
    let current = RANKS[0];
    for (let i = 0; i < RANKS.length; i++) {
      if (xp >= RANKS[i].minXp) {
        current = RANKS[i];
      }
    }
    const nextRank = RANKS[RANKS.indexOf(current) + 1] || null;
    return { current, nextRank };
  }

  // Update Global Header
  function refreshHeader() {
    const { current } = getRank(userProfile.xp);
    UI.headerRank.textContent = current.title;
    UI.headerXp.textContent = `${userProfile.xp} XP`;
  }

  // Navigation Router
  function navigateTo(viewName) {
    audio.playClick();
    Object.keys(views).forEach(key => {
      views[key].classList.toggle('active', key === viewName);
    });
    window.scrollTo(0, 0);

    if (viewName === 'codex') renderCodex();
    if (viewName === 'profile') renderProfile();
  }

  /* ==========================================================================
     7. GAMEPLAY SESSION LOGIC
     ========================================================================== */

  // Shuffle array helper (Fisher-Yates)
  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // Start Mode
  function startShift(mode) {
    audio.init();
    audio.playClick();

    session.mode = mode;
    session.score = 0;
    session.streak = 0;
    session.roundStreakMax = 0;
    session.correctCount = 0;
    session.currentIndex = 0;
    session.awaitingAdvance = false;
    session.answeredHistory = [];

    // Filter or select tickets based on mode
    let pool = [...QUESTION_BANK];
    if (mode === 'sensory') {
      pool = QUESTION_BANK.filter(q => q.category === 'Sensory Diagnosis' || q.category === 'Technique');
    } else if (mode === 'daily') {
      // Deterministic pseudo-random seed using calendar day
      const dateStr = new Date().toISOString().slice(0, 10);
      let seed = 0;
      for (let i = 0; i < dateStr.length; i++) seed += dateStr.charCodeAt(i);
      pool = [...QUESTION_BANK].sort((a, b) => {
        return (a.id.charCodeAt(0) * seed % 13) - (b.id.charCodeAt(0) * seed % 13);
      });
    } else {
      pool = shuffleArray(pool);
    }

    const ticketCount = mode === 'rush' ? 25 : (mode === 'daily' ? 7 : 10);
    session.tickets = pool.slice(0, ticketCount);

    // Setup Rush Hour Mode Timer
    if (mode === 'rush') {
      session.timeRemaining = 60;
      UI.timerDisplay.style.display = 'inline-flex';
      UI.timerSeconds.textContent = `${session.timeRemaining}s`;
      clearInterval(session.timerInterval);
      session.timerInterval = setInterval(() => {
        session.timeRemaining--;
        UI.timerSeconds.textContent = `${session.timeRemaining}s`;
        if (session.timeRemaining <= 0) {
          clearInterval(session.timerInterval);
          finishShift();
        }
      }, 1000);
    } else {
      UI.timerDisplay.style.display = 'none';
      clearInterval(session.timerInterval);
    }

    navigateTo('game');
    renderCurrentTicket();
  }

  // Render Ticket Question
  function renderCurrentTicket() {
    session.awaitingAdvance = false;
    const ticket = session.tickets[session.currentIndex];
    const total = session.tickets.length;

    // Metas
    UI.ticketProgress.textContent = `Ticket ${session.currentIndex + 1} of ${total}`;
    UI.ticketCategory.textContent = ticket.category;
    UI.ticketStreak.textContent = session.streak;
    UI.ticketScore.textContent = session.score;
    UI.difficultyBadge.textContent = `DIFFICULTY: ${ticket.difficulty}`;
    UI.ticketSpecId.textContent = `ORD #${ticket.id.toUpperCase().slice(0, 7)}`;
    UI.ticketPrompt.textContent = ticket.prompt;

    // Progress bar
    const percent = ((session.currentIndex) / total) * 100;
    UI.progressFill.style.width = `${percent}%`;

    // Confidence resets to normal
    const firstConf = UI.confidenceBar.querySelector('input[value="1"]');
    if (firstConf) firstConf.checked = true;
    UI.confidenceBar.style.display = 'block';

    // Hide previous feedback
    UI.feedbackDrawer.style.display = 'none';

    // Populate Answers
    UI.answerGrid.innerHTML = '';
    const keyLabels = ['A', 'B', 'C', 'D'];

    ticket.answers.forEach((ansText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.setAttribute('data-index', idx);
      btn.setAttribute('role', 'button');
      btn.setAttribute('aria-label', `Option ${keyLabels[idx]}: ${ansText}`);

      btn.innerHTML = `
        <span class="answer-key" aria-hidden="true">${keyLabels[idx]}</span>
        <span class="answer-text">${escapeHtml(ansText)}</span>
      `;

      btn.addEventListener('click', () => handleAnswerSelect(idx));
      UI.answerGrid.appendChild(btn);
    });
  }

  // Handle Answer Selection
  function handleAnswerSelect(selectedIndex) {
    if (session.awaitingAdvance) return;
    session.awaitingAdvance = true;

    const ticket = session.tickets[session.currentIndex];
    const isCorrect = (selectedIndex === ticket.correctIndex);

    // Confidence multiplier
    const selectedConf = document.querySelector('input[name="confidence"]:checked');
    const multiplier = selectedConf ? parseFloat(selectedConf.value) : 1;

    // Lock options
    const allBtns = UI.answerGrid.querySelectorAll('.answer-btn');
    allBtns.forEach(b => b.disabled = true);
    UI.confidenceBar.style.display = 'none';

    // Record Answer History
    session.answeredHistory.push({
      ticket,
      selectedAnswer: ticket.answers[selectedIndex],
      isCorrect
    });

    // Tracking for persistence
    userProfile.ticketsAnswered++;
    userProfile.categoryStats[ticket.category] = userProfile.categoryStats[ticket.category] || { answered: 0, correct: 0 };
    userProfile.categoryStats[ticket.category].answered++;

    if (isCorrect) {
      audio.playCorrect();
      session.correctCount++;
      session.streak++;
      if (session.streak > session.roundStreakMax) session.roundStreakMax = session.streak;
      if (session.streak > userProfile.maxStreak) userProfile.maxStreak = session.streak;

      userProfile.ticketsCorrect++;
      userProfile.categoryStats[ticket.category].correct++;

      // Streak sounds milestone
      if (session.streak % 5 === 0) {
        audio.playStreak();
      }

      // Calculate ticket points
      const basePoints = 100;
      const streakBonus = (session.streak - 1) * 25;
      const earned = Math.round((basePoints + streakBonus) * multiplier);
      session.score += earned;

      // Rush mode time addition
      if (session.mode === 'rush') {
        session.timeRemaining += 4;
        UI.timerSeconds.textContent = `${session.timeRemaining}s`;
      }

      // Visual button state
      allBtns[selectedIndex].classList.add('correct');

      // Feedback Drawer
      UI.feedbackBanner.className = 'feedback-banner success';
      UI.feedbackIcon.textContent = '✓';
      UI.feedbackTitle.textContent = `Correct Call (+${earned} pts)`;
    } else {
      audio.playIncorrect();
      session.streak = 0;

      // Log trouble spot
      userProfile.weaknesses[ticket.category] = (userProfile.weaknesses[ticket.category] || 0) + 1;

      // Rush mode time penalty
      if (session.mode === 'rush') {
        session.timeRemaining = Math.max(0, session.timeRemaining - 5);
        UI.timerSeconds.textContent = `${session.timeRemaining}s`;
      }

      // Visual state
      allBtns[selectedIndex].classList.add('incorrect');
      allBtns[ticket.correctIndex].classList.add('correct');

      // Dim other answers
      allBtns.forEach((b, i) => {
        if (i !== selectedIndex && i !== ticket.correctIndex) b.classList.add('dimmed');
      });

      // Feedback Drawer
      UI.feedbackBanner.className = 'feedback-banner error';
      UI.feedbackIcon.textContent = '✕';
      UI.feedbackTitle.textContent = 'Misjudged Ticket';
    }

    // Update header stats
    UI.ticketStreak.textContent = session.streak;
    UI.ticketScore.textContent = session.score;

    // Show feedback drawer
    UI.feedbackExplanation.textContent = ticket.explanation;
    UI.feedbackProTip.textContent = ticket.proTip;
    UI.feedbackDrawer.style.display = 'flex';

    // Focus on Next Ticket button for accessibility
    setTimeout(() => {
      UI.btnNextTicket.focus();
    }, 100);
  }

  // Advance to Next Ticket or Finish
  function advanceTicket() {
    audio.playClick();
    session.currentIndex++;

    if (session.currentIndex >= session.tickets.length) {
      finishShift();
    } else {
      renderCurrentTicket();
    }
  }

  // Finish Shift & Show Ledger Summary
  function finishShift() {
    clearInterval(session.timerInterval);

    // Calculate XP earned from shift
    const earnedXp = Math.round(session.score / 2.5);
    userProfile.xp += earnedXp;
    userProfile.shiftsCompleted++;

    if (session.mode === 'daily') {
      userProfile.lastDaily = new Date().toISOString().slice(0, 10);
    }

    saveProfile(userProfile);
    refreshHeader();

    // Populate Results Screen
    UI.resScore.textContent = session.score;
    const totalAnswered = session.answeredHistory.length || 1;
    const accuracy = Math.round((session.correctCount / totalAnswered) * 100);
    UI.resAccuracy.textContent = `${accuracy}%`;
    UI.resStreak.textContent = session.roundStreakMax;
    UI.resXp.textContent = `+${earnedXp} XP`;

    // Rank Evaluation Card
    const { current, nextRank } = getRank(userProfile.xp);
    UI.resRankName.textContent = current.title;
    UI.resRankDesc.textContent = current.lore;
    UI.resXpCurr.textContent = `${userProfile.xp} XP`;

    if (nextRank) {
      UI.resXpNext.textContent = `${nextRank.minXp - userProfile.xp} XP to ${nextRank.title}`;
      const progress = ((userProfile.xp - current.minXp) / (nextRank.minXp - current.minXp)) * 100;
      UI.resRankFill.style.width = `${Math.min(100, Math.max(5, progress))}%`;
    } else {
      UI.resXpNext.textContent = 'Highest Rank Attained';
      UI.resRankFill.style.width = '100%';
    }

    // Mistakes Review
    const mistakes = session.answeredHistory.filter(h => !h.isCorrect);
    UI.mistakesList.innerHTML = '';

    if (mistakes.length === 0) {
      UI.mistakesList.innerHTML = `
        <div class="empty-state" style="color: #81c784;">
          ★ Flawless Service! Every ticket was fulfilled to professional spec.
        </div>
      `;
    } else {
      mistakes.forEach(m => {
        const item = document.createElement('div');
        item.className = 'mistake-item';
        item.innerHTML = `
          <div class="mistake-question">${escapeHtml(m.ticket.prompt)}</div>
          <div class="mistake-answer-row">
            <span class="mistake-wrong">Your Call: ${escapeHtml(m.selectedAnswer)}</span>
            <span class="mistake-right">Bartender Standard: ${escapeHtml(m.ticket.answers[m.ticket.correctIndex])}</span>
          </div>
        `;
        UI.mistakesList.appendChild(item);
      });
    }

    navigateTo('results');
  }

  /* ==========================================================================
     8. CODEX MODULE
     ========================================================================== */
  let currentFilter = 'all';

  function renderCodex() {
    const searchVal = (UI.codexSearch.value || '').toLowerCase();
    const filtered = CODEX_DATA.filter(item => {
      const matchFilter = (currentFilter === 'all') || (item.type === currentFilter);
      const matchSearch = item.name.toLowerCase().includes(searchVal) ||
                          item.specs.toLowerCase().includes(searchVal) ||
                          item.glass.toLowerCase().includes(searchVal) ||
                          item.notes.toLowerCase().includes(searchVal);
      return matchFilter && matchSearch;
    });

    UI.codexCounter.textContent = `${filtered.length} Specs`;
    UI.codexContainer.innerHTML = '';

    if (filtered.length === 0) {
      UI.codexContainer.innerHTML = `<p class="empty-state">No cocktails or techniques match your search query.</p>`;
      return;
    }

    filtered.forEach(drink => {
      const card = document.createElement('article');
      card.className = 'codex-card';
      card.innerHTML = `
        <div class="codex-card-header">
          <h3 class="codex-drink-name">${escapeHtml(drink.name)}</h3>
          <span class="codex-glass-tag">${escapeHtml(drink.glass)}</span>
        </div>
        <div class="codex-spec-table">${escapeHtml(drink.specs)}</div>
        <p class="codex-notes"><strong>Method:</strong> ${escapeHtml(drink.method)}</p>
        <p class="codex-notes"><strong>Garnish:</strong> ${escapeHtml(drink.garnish)}</p>
        <p class="codex-notes" style="margin-top: 0.2rem; color: var(--text-secondary);">${escapeHtml(drink.notes)}</p>
      `;
      UI.codexContainer.appendChild(card);
    });
  }

  /* ==========================================================================
     9. CAREER LEDGER & PROFILE MODULE
     ========================================================================== */
  function renderProfile() {
    const { current } = getRank(userProfile.xp);
    UI.profRankTitle.textContent = current.title;
    UI.profRankLore.textContent = current.lore;

    UI.profShifts.textContent = userProfile.shiftsCompleted;
    UI.profQuestions.textContent = userProfile.ticketsAnswered;

    const lifetimeAcc = userProfile.ticketsAnswered > 0
      ? Math.round((userProfile.ticketsCorrect / userProfile.ticketsAnswered) * 100)
      : 0;
    UI.profAccuracy.textContent = `${lifetimeAcc}%`;
    UI.profMaxStreak.textContent = userProfile.maxStreak;

    // Station Mastery breakdown
    UI.categoryMasteryList.innerHTML = '';
    const categories = ['Classic Specs', 'Sensory Diagnosis', 'Technique', 'Glassware', 'Spirits & Wine', 'History', 'Service & Operations'];

    categories.forEach(cat => {
      const stats = userProfile.categoryStats[cat] || { answered: 0, correct: 0 };
      const percent = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;

      const row = document.createElement('div');
      row.className = 'mastery-item';
      row.innerHTML = `
        <div class="mastery-label-row">
          <span>${cat}</span>
          <span style="font-family: var(--font-mono);">${percent}% (${stats.correct}/${stats.answered})</span>
        </div>
        <div class="progress-track" style="height: 5px; margin-bottom: 0.2rem;">
          <div class="progress-fill" style="width: ${percent}%;"></div>
        </div>
      `;
      UI.categoryMasteryList.appendChild(row);
    });

    // Weakness Ledger
    UI.weaknessList.innerHTML = '';
    const weaknessEntries = Object.entries(userProfile.weaknesses || {}).filter(([_, count]) => count > 0);
    UI.weaknessBadge.textContent = `${weaknessEntries.length} Flagged`;

    if (weaknessEntries.length === 0) {
      UI.weaknessList.innerHTML = `<p class="empty-state">No persistent blindspots logged! Clean shifts recorded.</p>`;
    } else {
      weaknessEntries.forEach(([cat, count]) => {
        const item = document.createElement('div');
        item.className = 'weakness-item';
        item.innerHTML = `
          <span><strong>${escapeHtml(cat)}</strong></span>
          <span style="color: var(--burnt-orange); font-family: var(--font-mono);">${count} mistakes flagged</span>
        `;
        UI.weaknessList.appendChild(item);
      });
    }
  }

  /* ==========================================================================
     10. PREFERENCES & ACCESSIBILITY CONTROLS
     ========================================================================== */
  function applyPreferences() {
    audio.enabled = userProfile.settings.sound;
    UI.audioIcon.textContent = userProfile.settings.sound ? '🔊' : '🔇';
    UI.setSound.checked = userProfile.settings.sound;

    document.body.classList.toggle('reduce-motion', userProfile.settings.reducedMotion);
    UI.setMotion.checked = userProfile.settings.reducedMotion;

    document.body.classList.toggle('high-contrast', userProfile.settings.highContrast);
    UI.setContrast.checked = userProfile.settings.highContrast;
  }

  /* ==========================================================================
     11. EVENT LISTENERS & KEYBOARD BINDINGS
     ========================================================================== */
  function setupEventListeners() {
    // Top bar interactions
    document.getElementById('btn-home-logo').addEventListener('click', () => navigateTo('home'));
    document.getElementById('btn-home-logo').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') navigateTo('home');
    });

    UI.audioToggle.addEventListener('click', () => {
      userProfile.settings.sound = !userProfile.settings.sound;
      saveProfile(userProfile);
      applyPreferences();
      if (userProfile.settings.sound) {
        audio.init();
        audio.playClick();
      }
    });

    // Home Mode triggers
    document.getElementById('btn-mode-classic').addEventListener('click', () => startShift('classic'));
    document.getElementById('btn-mode-rush').addEventListener('click', () => startShift('rush'));
    document.getElementById('btn-mode-sensory').addEventListener('click', () => startShift('sensory'));
    document.getElementById('btn-mode-daily').addEventListener('click', () => startShift('daily'));

    // Hub Nav Buttons
    document.getElementById('btn-nav-codex').addEventListener('click', () => navigateTo('codex'));
    document.getElementById('btn-nav-profile').addEventListener('click', () => navigateTo('profile'));
    document.getElementById('btn-nav-settings').addEventListener('click', () => navigateTo('settings'));

    // Back Buttons
    document.getElementById('btn-codex-back').addEventListener('click', () => navigateTo('home'));
    document.getElementById('btn-profile-back').addEventListener('click', () => navigateTo('home'));
    document.getElementById('btn-settings-back').addEventListener('click', () => navigateTo('home'));

    // Gameplay Actions
    UI.btnNextTicket.addEventListener('click', advanceTicket);
    UI.btnAbandon.addEventListener('click', () => {
      if (confirm('Abandon current service shift? Unanswered tickets will not be saved.')) {
        clearInterval(session.timerInterval);
        navigateTo('home');
      }
    });

    // Results Actions
    UI.btnReplay.addEventListener('click', () => startShift(session.mode));
    UI.btnResultsHome.addEventListener('click', () => navigateTo('home'));

    // Codex Filters & Search
    UI.codexSearch.addEventListener('input', renderCodex);
    UI.codexFilterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      UI.codexFilterContainer.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      audio.playClick();
      renderCodex();
    });

    // Settings switches
    UI.setSound.addEventListener('change', (e) => {
      userProfile.settings.sound = e.target.checked;
      saveProfile(userProfile);
      applyPreferences();
    });
    UI.setMotion.addEventListener('change', (e) => {
      userProfile.settings.reducedMotion = e.target.checked;
      saveProfile(userProfile);
      applyPreferences();
    });
    UI.setContrast.addEventListener('change', (e) => {
      userProfile.settings.highContrast = e.target.checked;
      saveProfile(userProfile);
      applyPreferences();
    });

    // Reset Data
    UI.btnReset.addEventListener('click', () => {
      if (confirm('Are you sure you want to wipe your entire Career Ledger and XP? This action cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEY);
        userProfile = loadProfile();
        saveProfile(userProfile);
        applyPreferences();
        refreshHeader();
        alert('Career Ledger has been reset to Barback.');
        navigateTo('home');
      }
    });

    // Keyboard Shortcuts (1, 2, 3, 4 or A, B, C, D to answer; Space/Enter for Next)
    window.addEventListener('keydown', (e) => {
      // Ignore if user is searching in Codex
      if (document.activeElement === UI.codexSearch) return;

      const key = e.key.toLowerCase();

      // In-game answer hotkeys
      if (views.game.classList.contains('active')) {
        if (!session.awaitingAdvance) {
          if (key === '1' || key === 'a') handleAnswerSelect(0);
          if (key === '2' || key === 'b') handleAnswerSelect(1);
          if (key === '3' || key === 'c') handleAnswerSelect(2);
          if (key === '4' || key === 'd') handleAnswerSelect(3);
        } else {
          if (key === ' ' || key === 'enter') {
            e.preventDefault();
            advanceTicket();
          }
        }
      }
    });
  }

  // Utility to prevent XSS injection
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     12. INITIALIZATION
     ========================================================================== */
  function init() {
    applyPreferences();
    refreshHeader();
    setupEventListeners();

    // Daily Exam status tag
    const todayStr = new Date().toISOString().slice(0, 10);
    const dailyTag = document.getElementById('daily-status-tag');
    if (userProfile.lastDaily === todayStr) {
      dailyTag.textContent = 'Shift Completed';
      dailyTag.style.color = '#81c784';
    }
  }

  // Bootstrap when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
