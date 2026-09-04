javascript
/**
 * BAR KNOWLEDGE: THE BARTENDER'S TRIVIA GAME
 * Front-end Game Engine & Mixology Knowledge Core
 * Architecture: Clean Vanilla ES6, Web Audio API Sound Synthesizer, 
 * Adaptive Difficulty Weighting & Persistent Local Storage.
 */

(function () {
  "use strict";

  /* ==========================================================================
     1. SOUND SYNTHESIZER (WEB AUDIO API - ZERO ASSET DEPENDENCIES)
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
      osc.frequency.setValueAtTime(1760, now); // A6 (crystal glass chime)
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    }

    playSuccessChime() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C Major chord shimmer

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteTime = now + idx * 0.05;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.18, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.45);
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
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.28);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    }

    playTick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(950, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    }
  }

  /* ==========================================================================
     2. CURATED BARTENDER KNOWLEDGE ENGINE (VERIFIED CRAFT DATA)
     ========================================================================== */
  const QUESTION_BANK = [
    {
      id: "q_negroni_ratio",
      category: "Classic Cocktails",
      difficulty: 1,
      question: "What is the standard, time-honored historic specification ratio for an authentic classic Negroni?",
      answers: [
        "Equal parts: 1:1:1 Gin, Campari, and Sweet Red Vermouth",
        "2:1:1 Gin, Campari, and Dry White Vermouth",
        "3:2:1 Bourbon, Sweet Vermouth, and Campari",
        "Equal parts: 1:1:1 Gin, Aperol, and Lillet Blanc"
      ],
      correctIndex: 0,
      principle: "The Negroni is the defining archetype of the equal-parts trio: Botanical spirit, bitter liqueur, and fortified aromatized wine.",
      deepContext: "Born circa 1919 at Caffè Casoni in Florence when Count Camillo Negroni asked bartender Fosco Scarselli to strengthen his Americano by substituting gin for soda."
    },
    {
      id: "q_martini_dilution",
      category: "Technique",
      difficulty: 2,
      question: "Why does a professional bartender stir a classic Gin Martini rather than vigorously shaking it in a tin?",
      answers: [
        "Stirring prevents micro-aeration and ice shards, preserving a silky, crystal-clear texture",
        "Shaking raises the cocktail's alcohol by volume beyond legal serving limits",
        "Gin botanticals spoil instantly if exposed to stainless steel shaker walls",
        "Stirring cools a drink to -8°C faster than shaking"
      ],
      correctIndex: 0,
      principle: "Cocktails composed solely of clear spirits and fortified wines should be stirred to preserve a dense, crystal-clear texture without cloudy air bubbles.",
      deepContext: "Shaking forces atmospheric micro-bubbles and fine ice slivers into suspension, which gives citrus sours their prized velvety foam head, but ruins the glass-smooth texture of a clear spirit-forward aperitif."
    },
    {
      id: "q_whiskey_sour_egg",
      category: "Technique",
      difficulty: 2,
      question: "What is the primary thermodynamic purpose of executing a 'Dry Shake' before adding ice to an egg white sour?",
      answers: [
        "To emulsify egg proteins at room temperature before chilling tightens the bonds",
        "To sterilize potential salmonella bacteria with pure whiskey contact",
        "To reduce total liquid volume by 20% through evaporation",
        "To caramelize the simple syrup sugars using shaker friction"
      ],
      correctIndex: 0,
      principle: "A dry shake (or reverse dry shake) whips albumin protein chains without ice obstruction, generating structured, stable micro-foam.",
      deepContext: "Ice cubes inhibit rapid protein chain expansion. Emulsifying warm or room-temp albumin with citrus acid first creates velvety, resilient foam that lasts until the final sip."
    },
    {
      id: "q_sensory_dilution",
      category: "Sensory & Diagnosis",
      difficulty: 3,
      question: "A guest reports their Daiquiri tastes 'thin, watery, and dull' despite exact recipe proportions. What is the root diagnostic cause?",
      answers: [
        "The bartender used wet, melting ice with high surface water, causing excessive premature dilution",
        "The simple syrup was prepared with rich 2:1 cane ratio instead of 1:1",
        "The cocktail was double strained through a fine wire mesh",
        "The rum had an ABV above 45%"
      ],
      correctIndex: 0,
      principle: "Wet ice sitting in a warm well carries standing meltwater that floods a shaker with excess liquid before chilling equilibrium is reached.",
      deepContext: "Always burn wet well ice or strain off puddle water before shaking. Quality bar programs prioritize dense, dry, sub-zero ice cubes with low surface-area melt rates."
    },
    {
      id: "q_daiquiri_specs",
      category: "Classic Cocktails",
      difficulty: 1,
      question: "Which ratio represents the gold-standard modern craft Daiquiri specification?",
      answers: [
        "2.0 oz Light Rum, 0.75 oz Fresh Lime Juice, 0.75 oz Demerara or Rich Simple Syrup",
        "1.0 oz Dark Rum, 2.0 oz Lime Cordial, 1.0 oz Triple Sec",
        "2.5 oz Coconut Rum, 1.0 oz Pineapple Juice, 0.5 oz Lemon Juice",
        "1.5 oz Spiced Rum, 1.5 oz Orange Juice, 1.0 oz Grenadine"
      ],
      correctIndex: 0,
      principle: "The Daiquiri is the foundational rum sour: 2 parts spirit, 3/4 parts fresh acid, and 3/4 parts balanced sweetness.",
      deepContext: "Popularized in Santiago de Cuba around 1900 and immortalized by Constantino Ribalaigua Vert at El Floridita in Havana, who served Ernest Hemingway variations."
    },
    {
      id: "q_glass_coupe_vs_rocks",
      category: "Glassware",
      difficulty: 1,
      question: "Which glass is traditionally and functionally appropriate for an 'up' cocktail like a Manhattan or Corpse Reviver #2?",
      answers: [
        "Chilled Coupe or Nick & Nora glass",
        "Highball glass packed with cracked ice",
        "Double Old Fashioned rocks tumbler",
        "Copper Moscow Mule mug"
      ],
      correctIndex: 0,
      principle: "Stemmed glassware isolates the beverage bowl from the warmth of the guest's fingers, maintaining cold serving temperature without ice.",
      deepContext: "The Nick & Nora (named after characters in Dashiell Hammett's 'The Thin Man') prevents sloshing during service compared to wide-rimmed classic V-shaped martini glasses."
    },
    {
      id: "q_citrus_peel_oil",
      category: "Garnish & Aroma",
      difficulty: 2,
      question: "What is the sensory purpose of 'expressing' an orange or lemon peel over a completed cocktail rather than simply tossing it inside?",
      answers: [
        "To mist aromatic volatile essential oils onto the liquid's surface for immediate olfactory impact",
        "To lower the liquid pH balance by delivering concentrated citric acid",
        "To tint the top layer of the drink with natural carotenoid color",
        "To sanitize the rim of the glass with antimicrobial citrus alcohol"
      ],
      correctIndex: 0,
      principle: "Aroma dictates up to 80% of perceived taste; citrus peel flavedo contains volatile oils (limonene) that provide a bright bouquet before the first sip.",
      deepContext: "Pinching the peel with the outer skin facing the drink projects micro-droplets of oil across the meniscus. Rubbing the peel around the rim transfers fragrance directly to the guest's lips."
    },
    {
      id: "q_vermouth_storage",
      category: "Ingredients",
      difficulty: 2,
      question: "How must opened bottles of Sweet and Dry Vermouth be handled in a professional bar to prevent spoilage?",
      answers: [
        "Refrigerated immediately and consumed within 30 to 45 days",
        "Stored at room temperature on the back bar rail indefinitely",
        "Frozen into solid blocks and shaved to order",
        "Cut 50/50 with pure neutral grain spirit to stop fermentation"
      ],
      correctIndex: 0,
      principle: "Vermouth is a fortified, aromatized wine; once exposed to oxygen, it oxidizes, turning flat, sour, and stewed within weeks at ambient temperatures.",
      deepContext: "Many poor Martinis and Manhattans in dive bars stem from dusty, ambient-temperature vermouth bottles opened months earlier. Keep them refrigerated and gas-blanketed when possible."
    },
    {
      id: "q_chartreuse_sub",
      category: "Service Judgement",
      difficulty: 3,
      question: "Your bar is out of Green Chartreuse for a guest's 'Last Word'. Which modification or substitute is the most professional response?",
      answers: [
        "Offer Genepy or an alpine herbal liqueur, informing the guest it offers similar anise-coriander herbal notes with slightly lower proof",
        "Substitute blue curaçao and peppermint schnapps without mentioning it",
        "Double the gin and add a drop of green food dye",
        "Refuse service and suggest they drink beer instead"
      ],
      correctIndex: 0,
      principle: "Professional substitutions honor the botanical profile and functional structure of the cocktail while practicing transparent communication with the guest.",
      deepContext: "The Last Word (Equal parts Gin, Green Chartreuse, Maraschino, Lime) depends on the potent 55% ABV alpine punch of Chartreuse. Genepy, Dolin Véritable, or Faccia Brutto Centerbe are credible botanical alternatives."
    },
    {
      id: "q_ice_clear_physics",
      category: "Ice & Thermodynamics",
      difficulty: 3,
      question: "Why is dense, directional-frozen clear ice superior to cloudy freezer-tray ice for Old Fashioneds?",
      answers: [
        "Clear ice is free of trapped air bubbles and impurities, giving it lower surface area and a far slower melt rate",
        "Clear ice is chemically treated with sodium to keep it colder than 0°C",
        "Cloudy ice contains chlorine that instantly neutralizes whiskey ethanol",
        "Clear ice absorbs whiskey aroma molecules faster"
      ],
      correctIndex: 0,
      principle: "Trapped air bubbles in cloudy ice cause thermal fractures and create exponential surface area, causing an Old Fashioned to quickly become waterlogged.",
      deepContext: "Directional freezing forces trapped minerals and air downwards into a sacrificial layer, yielding crystal-pure ice that melts evenly and keeps high-proof spirits chilled without dilution runaway."
    },
    {
      id: "q_boulevardier_history",
      category: "History & Lore",
      difficulty: 2,
      question: "The Boulevardier cocktail is a celebrated Prohibition-era cousin of the Negroni that replaces gin with which base spirit?",
      answers: [
        "Bourbon or Rye Whiskey",
        "Aged Demerara Rum",
        "Blended Scotch Whisky",
        "Apple Brandy"
      ],
      correctIndex: 0,
      principle: "The Boulevardier was created in 1927 Paris by Erskine Gwynne, replacing gin with American whiskey to pair with Campari and Sweet Vermouth.",
      deepContext: "Documented in Harry McElhone's 1927 book 'Barflies and Cocktails'. Erskine Gwynne was an American writer who founded the Parisian literary magazine 'The Boulevardier'."
    },
    {
      id: "q_diagnosis_harsh_sour",
      category: "Sensory & Diagnosis",
      difficulty: 3,
      question: "A fresh lime Margarita tastes harsh, aggressively sharp, and acrid despite measuring accurate citrus juice. What likely occurred?",
      answers: [
        "Lime juice was squeezed days ago and oxidized, or pressed with excessive pressure releasing bitter pith peel oils",
        "The tequila was 100% Blue Weber Agave instead of mixto",
        "The glass was rimmed with kosher salt instead of iodized table salt",
        "The bartender used crushed pebble ice instead of standard cubes"
      ],
      correctIndex: 0,
      principle: "Citrus juice undergoes enzyme oxidation within 4-10 hours, while heavy mechanical over-pressing extracts bitter albedo pith oils.",
      deepContext: "Professional cocktail bars juice citrus daily and avoid over-squeezing hand presses to prevent crushing the white pith, which injects astringent limonin into fresh juice."
    },
    {
      id: "q_aviation_violette",
      category: "Classic Cocktails",
      difficulty: 2,
      question: "Which distinctive floral ingredient gives the classic Aviation cocktail its faint sky-blue/purple tint?",
      answers: [
        "Crème de Violette",
        "Blueberry Liqueur",
        "Blue Curaçao",
        "Elderflower Cordial"
      ],
      correctIndex: 0,
      principle: "The Aviation (Hugo Ensslin, 1916) blends Gin, Maraschino, Fresh Lemon, and a modest barspoon of Crème de Violette for floral aromatics.",
      deepContext: "A common bartender mistake is pouring too much Crème de Violette, turning the drink soap-like in taste and dark muddy purple instead of a delicate sky-blue hue."
    },
    {
      id: "q_tequila_blanco_vs_reposado",
      category: "Spirits & Ingredients",
      difficulty: 1,
      question: "By Mexican NOM law, what is the aging requirement for a Tequila to be designated as 'Reposado'?",
      answers: [
        "Aged in oak containers for a minimum of 2 months up to 364 days",
        "Aged in oak casks for at least 3 years",
        "Unaged and bottled immediately after distillation",
        "Aged exactly 10 years in ex-bourbon barrels"
      ],
      correctIndex: 0,
      principle: "Reposado translates to 'rested': 2 to 12 months in oak. Blanco is unaged (or up to 60 days), and Añejo requires 1 to 3 years in oak.",
      deepContext: "For crisp cocktails like the Paloma, Blanco provides bright agave peppery notes, whereas Reposado imparts vanilla and subtle oak tannin."
    },
    {
      id: "q_penicillin_float",
      category: "Technique",
      difficulty: 2,
      question: "How is the Peated Islay Scotch applied in Sam Ross's modern classic 'Penicillin' cocktail?",
      answers: [
        "Gently floated on top of the completed cocktail across the back of a barspoon",
        "Shaken vigorously along with the honey-ginger syrup and blended scotch",
        "Muddled directly with fresh ginger root at the bottom of the shaker",
        "Lit on fire as a flambé service presentation"
      ],
      correctIndex: 0,
      principle: "Floated peated whisky sits on the surface, ensuring the guest gets an intense smoky aroma on the nose before tasting the bright honey-lemon drink underneath.",
      deepContext: "Created in 2005 at Milk & Honey NYC by Sam Ross. Floating an aromatic spirit leverages density and surface tension to separate aroma from body."
    },
    {
      id: "q_saline_in_cocktails",
      category: "Ingredients & Craft",
      difficulty: 3,
      question: "Why do modern mixologists add 2-3 drops of 20% saline (salt solution) to citrus or bitter cocktails?",
      answers: [
        "Salt suppresses perceived bitterness while enhancing brightness, sweetness, and aroma",
        "Salt eliminates all alcohol burn and makes spirits non-intoxicating",
        "Salt preserves citrus juice so it lasts six weeks in open air",
        "Salt turns cloudy egg white foam completely crystal clear"
      ],
      correctIndex: 0,
      principle: "Sodium ions bind to bitter taste receptors on the tongue, knocking back astringency and elevating fruit, acid, and sugar perception.",
      deepContext: "A few drops of 20% saline in a Negroni or Ti' Punch rounds off harsh edges and highlights citrus aromatics without making the drink taste overtly salty."
    },
    {
      id: "q_corpse_reviver_rinse",
      category: "Classic Cocktails",
      difficulty: 2,
      question: "Which aromatized spirit is used as an interior glass rinse in the Corpse Reviver No. 2 and the Sazerac?",
      answers: [
        "Absinthe (or Herbsaint)",
        "Maraschino Liqueur",
        "Campari",
        "Green Chartreuse"
      ],
      correctIndex: 0,
      principle: "An absinthe rinse coats the inner surface of the glass with potent anise aromatics without overpowering the delicate liquid balance with excessive volume.",
      deepContext: "In New Orleans Sazerac service, chilling a tumbler with ice and an absinthe wash while building the rye, bitters, and sugar in a mixing tin is standard choreography."
    },
    {
      id: "q_rush_ticket_prioritization",
      category: "Service Judgement",
      difficulty: 3,
      question: "During a high-volume rush, you receive a ticket with: 1 Ramos Gin Fizz, 1 Draft Beer, 2 Old Fashioneds, and 1 Vodka Soda. What is the most efficient sequence?",
      answers: [
        "Start Ramos Gin Fizz shake/rest first, build Old Fashioneds, pour draft beer & highball last so foam and carbonation do not degrade",
        "Pour the draft beer first and let it sit on the counter while building the rest",
        "Make the drinks strictly in the order listed on the printed ticket line by line",
        "Refuse the Ramos Gin Fizz and tell the server it is 86'd"
      ],
      correctIndex: 0,
      principle: "Station efficiency requires starting time-intensive emulsified drinks first, batching stirred cocktails, and pouring carbonated drinks immediately before tray pick-up.",
      deepContext: "Beer heads deflate and ice melts fast in highballs. Starting the Ramos gin fizz protein structure first allows you to work other drinks while the foam sets up."
    },
    {
      id: "q_ice_surface_area",
      category: "Ice & Thermodynamics",
      difficulty: 2,
      question: "Why does crushed or pebble ice dilute a cocktail significantly faster than a single 2-inch ice cube?",
      answers: [
        "Crushed ice has an exponentially greater total surface area exposed to ambient heat and room-temp liquid",
        "Crushed ice is made of soft tap water while cubes are made from pure alcohol",
        "Crushed ice generates friction heat from shaker blades",
        "Single cubes repel room temperature air currents"
      ],
      correctIndex: 0,
      principle: "Thermal transfer rate is directly proportional to surface area; smaller ice fragments present hundreds of times more contact surface to the surrounding liquid.",
      deepContext: "This is why high-proof, heavily sweetened Tiki drinks like the Zombie or Mai Tai intentionally call for crushed ice: to tame high proof with rapid, refreshing dilution."
    },
    {
      id: "q_fernet_branca_role",
      category: "Ingredients & Craft",
      difficulty: 2,
      question: "Fernet-Branca belongs to which specific European category of intensely bitter, herbal digestif spirits?",
      answers: [
        "Amaro",
        "Vermouth",
        "Aquavit",
        "Pastis"
      ],
      correctIndex: 0,
      principle: "Fernet is a sub-class of Italian Amari distinguished by its prominent use of saffron, myrrh, chamomile, and bitter menthol/mint character.",
      deepContext: "Known affectionately as the 'bartender's handshake' worldwide and the unofficial national cocktail base of Argentina when paired with Coca-Cola (Fernet con Coca)."
    },
    {
      id: "q_bloody_mary_roll",
      category: "Technique",
      difficulty: 2,
      question: "Why is a classic Bloody Mary traditionally 'rolled' between mixing tins rather than violently shaken?",
      answers: [
        "Vigorous shaking emulsifies heavy tomato pectins into an unappealing, frothy, watery texture",
        "Tomato juice explodes under air pressure in stainless steel shakers",
        "Worcestershire sauce loses all sodium flavor when subjected to centrifugal force",
        "Stirring with ice is legally required for all vodka drinks"
      ],
      correctIndex: 0,
      principle: "Rolling gently integrates thick, viscous liquids and ice without aerating or foaming tomato solids, which preserves a rich mouthfeel.",
      deepContext: "Gently pouring the ingredients back and forth between two shaker tins with ice chills and dilutes the cocktail while maintaining the lush body of tomato juice."
    },
    {
      id: "q_bourbon_legal_definition",
      category: "Spirits & Ingredients",
      difficulty: 2,
      question: "Under US Federal Standards of Identity, which requirement is mandatory for a spirit to be labeled 'Bourbon Whiskey'?",
      answers: [
        "Must be distilled from a fermented mash of at least 51% corn and aged in new charred oak containers",
        "Must be distilled exclusively within the geographical borders of Bourbon County, Kentucky",
        "Must be aged for a minimum of 12 years in ex-sherry butts",
        "Must contain artificial caramel coloring to achieve its amber tone"
      ],
      correctIndex: 0,
      principle: "Bourbon can be legally distilled anywhere in the USA, provided the grain mash bill is minimum 51% corn and aged in newly charred oak with zero added colorings.",
      deepContext: "Straight Bourbon must be aged at least 2 years. If aged less than 4 years, an explicit age statement is mandatory on the bottle label."
    },
    {
      id: "q_sidecar_balance",
      category: "Classic Cocktails",
      difficulty: 2,
      question: "Which classic trio of ingredients creates the benchmark 1920s Sidecar cocktail?",
      answers: [
        "Cognac (or Brandy), Orange Liqueur (Cointreau), and Fresh Lemon Juice",
        "Rye Whiskey, Sweet Vermouth, and Angostura Bitters",
        "Gin, Crème de Cacao, and Heavy Cream",
        "Tequila, Lime Juice, and Agave Nectar"
      ],
      correctIndex: 0,
      principle: "The Sidecar is the mother of brandy sours, often served with a sugar-rimmed coupe to offset the crisp dryness of Cognac and lemon.",
      deepContext: "Associated with Harry's New York Bar in Paris and The Ritz Hotel around World War I, named after the motorcycle attachment used by eccentric army captains."
    },
    {
      id: "q_angostura_botanical",
      category: "Ingredients & Craft",
      difficulty: 1,
      question: "Despite its historical association with the town of Angostura, Trinidad's famous Angostura Bitters does NOT contain which ingredient?",
      answers: [
        "Angostura bark (Cusparia febrifuga)",
        "Gentian root",
        "Aromatic spices",
        "Alcohol (44.7% ABV)"
      ],
      correctIndex: 0,
      principle: "Angostura Bitters was formulated in 1824 by Dr. Johann Siegert as a medical tonic; it is flavored with gentian and botanicals, but does not use angostura bark.",
      deepContext: "The oversized paper label on Angostura bottles was a historical design accident: brothers entering a competition ordered the label without measuring the bottle, and decided to keep it as an iconic trademark."
    }
  ];

  /* ==========================================================================
     3. CODEX & RECIPE DATA (INTERACTIVE STUDY HUB)
     ========================================================================== */
  const CODEX_DATA = [
    {
      id: "negroni",
      title: "Negroni",
      category: "Cocktails",
      spec: "1.0 oz London Dry Gin • 1.0 oz Campari • 1.0 oz Sweet Red Vermouth",
      notes: "Build in rocks glass over dense clear block. Stir 20 seconds. Express orange peel disk over top and insert."
    },
    {
      id: "daiquiri",
      title: "Daiquiri (Classic)",
      category: "Cocktails",
      spec: "2.0 oz Light Rum • 0.75 oz Fresh Lime Juice • 0.75 oz Rich Demerara Syrup (2:1)",
      notes: "Vigorous shake with dense ice for 10 seconds. Double strain into chilled coupe. No garnish or thin lime wheel float."
    },
    {
      id: "manhattan",
      title: "Manhattan",
      category: "Cocktails",
      spec: "2.0 oz Rye Whiskey • 1.0 oz Sweet Vermouth • 2 dashes Angostura Bitters",
      notes: "Stir with ice until down to -1°C. Strain into chilled Nick & Nora glass. Garnish with brandied cherry."
    },
    {
      id: "martini",
      title: "Dry Gin Martini",
      category: "Cocktails",
      spec: "2.5 oz London Dry Gin • 0.5 oz Dry White Vermouth • 1 dash Orange Bitters",
      notes: "Stir 45 revolutions in mixing glass. Strain into frozen glass. Express lemon twist oils or drop in Castelvetrano olive."
    },
    {
      id: "sazerac",
      title: "Sazerac",
      category: "Cocktails",
      spec: "2.0 oz Rye Whiskey • 1 Sugar Cube • 3 dashes Peychaud's Bitters • Absinthe Rinse",
      notes: "Muddle sugar with bitters. Add whiskey and stir with ice. Coat chilled rocks glass with absinthe, discard excess. Express lemon peel and discard."
    },
    {
      id: "clear_ice",
      title: "Directional Clear Ice",
      category: "Glassware",
      spec: "Directional freezing in insulated coolers • Sub-zero storage • Hand cut",
      notes: "Pure H2O free of trapped gas. Dissipates thermal load without premature dilution, critical for spirit-forward cocktails."
    },
    {
      id: "dry_shake",
      title: "Dry Shake & Emulsion",
      category: "Technique",
      spec: "Shake room-temp ingredients + egg white/aquafaba without ice 10s • Add ice and shake 8s",
      notes: "Emulsifies hydrophobic albumin protein chains. Produces dense micro-foam that supports aromatic bitters drops."
    },
    {
      id: "vermouth_care",
      title: "Fortified Wine Chemistry",
      category: "Spirits",
      spec: "Refrigerate at 3°C • Vacuum seal or Argon gas • Max shelf life 30 days",
      notes: "Fortified wine oxidizes into acetic and stewed off-flavors once uncorked. Always treat vermouth like perishable wine."
    },
    {
      id: "sensory_acid",
      title: "Citrus Oxidation Diagnosis",
      category: "Sensory",
      spec: "Shelf life: Lime 6-8 hrs • Lemon 10 hrs • Avoid overpressing white pith albedo",
      notes: "Limonin development causes old juice to taste bitter and sharp. Freshly pressed daily citrus is non-negotiable."
    }
  ];

  /* ==========================================================================
     4. BARTENDER RANK SYSTEM
     ========================================================================== */
  const RANKS = [
    { name: "Barback", minXp: 0, badge: "🌱" },
    { name: "Apprentice", minXp: 400, badge: "🥄" },
    { name: "Bartender", minXp: 1200, badge: "🍸" },
    { name: "Senior Bartender", minXp: 2600, badge: "★" },
    { name: "Head Mixologist", minXp: 4800, badge: "👑" },
    { name: "Master of Cocktails", minXp: 8000, badge: "✨" }
  ];

  /* ==========================================================================
     5. PERSISTENT STORAGE CONTROLLER
     ========================================================================== */
  const STORAGE_KEY = "BAR_KNOWLEDGE_CAREER_V1";

  class PersistenceManager {
    static load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return this.getDefaults();
        const parsed = JSON.parse(raw);
        return Object.assign(this.getDefaults(), parsed);
      } catch (err) {
        console.warn("Storage load error:", err);
        return this.getDefaults();
      }
    }

    static save(data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (err) {
        console.warn("Storage save error:", err);
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
        unlockedCards: ["negroni", "daiquiri", "manhattan"],
        soundEnabled: true,
        relaxedTimer: false,
        lastDailyDate: null
      };
    }
  }

  /* ==========================================================================
     6. MAIN GAME ENGINE
     ========================================================================== */
  class BarKnowledgeGame {
    constructor() {
      this.audio = new BarAudioSystem();
      this.profile = PersistenceManager.load();
      this.audio.enabled = this.profile.soundEnabled;

      // Active shift state
      this.activeMode = "standard";
      this.shiftQueue = [];
      this.currentIndex = 0;
      this.shiftScore = 0;
      this.shiftCorrect = 0;
      this.shiftStreak = 0;
      this.shiftPeakStreak = 0;
      this.shiftStartTime = 0;
      this.ticketStartTime = 0;
      this.responseTimes = [];
      this.categoryPerformance = {};

      // Ticket level interaction state
      this.currentConfidence = "guess"; // 'guess' (+100), 'think' (+200), 'certain' (+350)
      this.hasAnswered = false;
      this.timerInterval = null;
      this.timeRemaining = 15;
      this.lifelineSpoons = 1;
      this.lifelineNotes = 1;

      this.cacheDOMElements();
      this.bindEvents();
      this.renderProfile();
      this.updateHeaderUI();
      this.renderCodex();
    }

    cacheDOMElements() {
      // Screens
      this.screens = {
        lobby: document.getElementById("screen-lobby"),
        game: document.getElementById("screen-game"),
        results: document.getElementById("screen-results"),
        codex: document.getElementById("screen-codex"),
        profile: document.getElementById("screen-profile")
      };

      // Header Stats
      this.streakCounter = document.getElementById("streak-counter");
      this.scoreCounter = document.getElementById("score-counter");
      this.rankText = document.getElementById("rank-text");
      this.soundIconOn = document.getElementById("sound-icon-on");
      this.soundIconOff = document.getElementById("sound-icon-off");

      // Game Screen Ticket Elements
      this.ticketNumber = document.getElementById("ticket-number");
      this.multiplierBadge = document.getElementById("multiplier-badge");
      this.timerDisplay = document.getElementById("timer-display");
      this.progressFill = document.getElementById("progress-fill");
      this.categoryPill = document.getElementById("question-category");
      this.difficultyIndicator = document.getElementById("question-difficulty");
      this.ticketStamp = document.getElementById("ticket-stamp");
      this.questionPrompt = document.getElementById("question-prompt");
      this.confidenceBar = document.getElementById("confidence-bar");
      this.confButtons = document.querySelectorAll(".conf-btn");
      this.answersGrid = document.getElementById("answers-grid");
      this.ansButtons = document.querySelectorAll(".ans-btn");

      // Lifelines
      this.btnLifelineSpoon = document.getElementById("btn-lifeline-spoon");
      this.btnLifelineNote = document.getElementById("btn-lifeline-note");
      this.spoonCountSpan = document.getElementById("spoon-count");
      this.noteCountSpan = document.getElementById("note-count");

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
      // Global navigation
      document.getElementById("btn-brand").addEventListener("click", () => this.showScreen("lobby"));
      document.getElementById("btn-open-profile").addEventListener("click", () => this.showScreen("profile"));
      document.getElementById("btn-nav-codex").addEventListener("click", () => this.showScreen("codex"));
      document.getElementById("btn-nav-diagnosis").addEventListener("click", () => {
        this.showScreen("codex");
        this.filterCodex("Sensory");
      });
      document.getElementById("btn-codex-back").addEventListener("click", () => this.showScreen("lobby"));
      document.getElementById("btn-profile-back").addEventListener("click", () => this.showScreen("lobby"));
      document.getElementById("btn-results-home").addEventListener("click", () => this.showScreen("lobby"));
      document.getElementById("btn-results-codex").addEventListener("click", () => this.showScreen("codex"));

      // Audio toggling
      document.getElementById("btn-toggle-sound").addEventListener("click", () => this.toggleSound());

      // Mode Selection
      document.querySelectorAll(".mode-card").forEach((card) => {
        card.addEventListener("click", () => {
          const mode = card.getAttribute("data-mode");
          this.startShift(mode);
        });
      });

      // Answer Choices Click
      this.ansButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const index = parseInt(btn.getAttribute("data-index"), 10);
          this.handleAnswerSelection(index);
        });
      });

      // Confidence Selectors
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

      // Feedback next ticket
      this.btnNextQuestion.addEventListener("click", () => this.advanceToNextTicket());
      this.btnToggleDeep.addEventListener("click", () => {
        this.feedbackDetailBox.classList.toggle("is-hidden");
        this.btnToggleDeep.textContent = this.feedbackDetailBox.classList.contains("is-hidden")
          ? "Read Deep Note"
          : "Hide Note";
      });

      // Results screen restart
      document.getElementById("btn-play-again").addEventListener("click", () => this.startShift(this.activeMode));

      // Codex filtering and search
      this.codexFilters.forEach((tab) => {
        tab.addEventListener("click", () => {
          this.codexFilters.forEach((t) => t.classList.remove("is-active"));
          tab.classList.add("is-active");
          this.filterCodex(tab.getAttribute("data-cat"));
        });
      });

      this.codexSearchInput.addEventListener("input", (e) => {
        this.searchCodex(e.target.value);
      });

      // Settings toggles
      this.checkRelaxedTimer.addEventListener("change", (e) => {
        this.profile.relaxedTimer = e.target.checked;
        PersistenceManager.save(this.profile);
      });

      this.checkSoundToggle.addEventListener("change", (e) => {
        this.profile.soundEnabled = e.target.checked;
        this.audio.enabled = e.target.checked;
        this.updateSoundIcons();
        PersistenceManager.save(this.profile);
      });

      // Reset data button
      document.getElementById("btn-reset-data").addEventListener("click", () => {
        if (confirm("Reset all bartender certifications, XP, and shift records?")) {
          localStorage.removeItem(STORAGE_KEY);
          this.profile = PersistenceManager.getDefaults();
          this.audio.enabled = true;
          this.renderProfile();
          this.updateHeaderUI();
          this.renderCodex();
          this.showScreen("lobby");
          this.showToast("Station sanitized. Records cleared.");
        }
      });

      // Keyboard Controls (Accessibility & Rapid Flow)
      window.addEventListener("keydown", (e) => {
        if (this.screens.game.classList.contains("is-hidden")) return;

        if (!this.hasAnswered) {
          if (e.key === "1") this.handleAnswerSelection(0);
          else if (e.key === "2") this.handleAnswerSelection(1);
          else if (e.key === "3") this.handleAnswerSelection(2);
          else if (e.key === "4") this.handleAnswerSelection(3);
        } else {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            this.advanceToNextTicket();
          }
        }
      });
    }

    showScreen(screenName) {
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
      PersistenceManager.save(this.profile);
      if (this.profile.soundEnabled) this.audio.playClink();
    }

    updateSoundIcons() {
      if (this.profile.soundEnabled) {
        this.soundIconOn.classList.remove("is-hidden");
        this.soundIconOff.classList.add("is-hidden");
      } else {
        this.soundIconOn.classList.add("is-hidden");
        this.soundIconOff.classList.remove("is-hidden");
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
       7. SHIFT GAMEPLAY LIFECYCLE
       ========================================================================== */
    startShift(mode = "standard") {
      this.audio.init();
      this.activeMode = mode;
      this.shiftScore = 0;
      this.shiftCorrect = 0;
      this.shiftStreak = 0;
      this.shiftPeakStreak = 0;
      this.currentIndex = 0;
      this.responseTimes = [];
      this.categoryPerformance = {};
      this.lifelineSpoons = 1;
      this.lifelineNotes = 1;
      this.spoonCountSpan.textContent = "1";
      this.noteCountSpan.textContent = "1";
      this.btnLifelineSpoon.disabled = false;
      this.btnLifelineNote.disabled = false;

      // Question Queue Composition
      let totalQuestions = 10;
      if (mode === "survival") totalQuestions = 30; // Endless sequence
      if (mode === "speed") totalQuestions = 15;

      this.shiftQueue = this.generateAdaptiveQueue(totalQuestions, mode);
      this.shiftStartTime = Date.now();

      this.showScreen("game");
      this.loadTicket(this.currentIndex);
    }

    generateAdaptiveQueue(count, mode) {
      // Prioritize recently missed categories for adaptive difficulty
      const weakPool = Object.keys(this.profile.weakCategories).filter(
        (cat) => this.profile.weakCategories[cat] > 0
      );

      // Clone question bank
      let pool = [...QUESTION_BANK];

      // Shuffle array
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }

      // Prioritize weak questions if available
      if (weakPool.length > 0) {
        pool.sort((a, b) => {
          const aWeak = weakPool.includes(a.category) ? -1 : 1;
          const bWeak = weakPool.includes(b.category) ? -1 : 1;
          return aWeak - bWeak;
        });
      }

      return pool.slice(0, count);
    }

    loadTicket(index) {
      clearInterval(this.timerInterval);
      this.hasAnswered = false;
      this.ticketStartTime = Date.now();

      const ticket = this.shiftQueue[index];
      if (!ticket) {
        this.finishShift();
        return;
      }

      // Track categories in this shift
      if (!this.categoryPerformance[ticket.category]) {
        this.categoryPerformance[ticket.category] = { correct: 0, total: 0 };
      }
      this.categoryPerformance[ticket.category].total++;

      // UI Labels
      const totalDisplay = this.activeMode === "survival" ? "∞" : this.shiftQueue.length;
      this.ticketNumber.textContent = `Ticket ${index + 1} of ${totalDisplay}`;
      this.categoryPill.textContent = ticket.category;
      this.difficultyIndicator.textContent = `● Level ${ticket.difficulty}`;
      this.ticketStamp.textContent = `TICKET #${Math.floor(1000 + Math.random() * 9000)}`;
      this.questionPrompt.textContent = ticket.question;

      // Progress bar percentage
      const pct = ((index) / this.shiftQueue.length) * 100;
      this.progressFill.style.width = `${Math.max(5, pct)}%`;

      // Streak & Multiplier
      this.updateStreakBadge();

      // Reset Answer choices
      this.ansButtons.forEach((btn, i) => {
        btn.classList.remove("is-correct", "is-incorrect", "is-dimmed");
        btn.disabled = false;
        btn.querySelector(".ans-text").textContent = ticket.answers[i] || "";
      });

      // Reset Confidence options to "Guess" or retain preference
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
      this.btnToggleDeep.textContent = "Read Deep Note";

      // Re-enable tools if available
      this.btnLifelineSpoon.disabled = this.lifelineSpoons <= 0;
      this.btnLifelineNote.disabled = this.lifelineNotes <= 0;

      // Timer Setup
      const baseSeconds = this.profile.relaxedTimer ? 30 : (this.activeMode === "speed" ? 10 : 16);
      this.timeRemaining = baseSeconds;
      this.timerDisplay.textContent = `${this.timeRemaining}s`;

      this.timerInterval = setInterval(() => {
        this.timeRemaining--;
        this.timerDisplay.textContent = `${this.timeRemaining}s`;

        if (this.timeRemaining <= 4 && this.timeRemaining > 0) {
          this.audio.playTick();
          this.timerDisplay.style.color = "var(--color-danger)";
        } else {
          this.timerDisplay.style.color = "var(--warm-gold)";
        }

        if (this.timeRemaining <= 0) {
          clearInterval(this.timerInterval);
          this.handleAnswerSelection(-1); // Timeout penalty
        }
      }, 1000);
    }

    updateStreakBadge() {
      let multiplier = 1.0;
      if (this.shiftStreak >= 3) multiplier = 1.5;
      if (this.shiftStreak >= 6) multiplier = 2.0;
      if (this.shiftStreak >= 9) multiplier = 2.5;

      this.multiplierBadge.textContent = `${multiplier.toFixed(1)}x Flow`;
      this.streakCounter.textContent = this.shiftStreak;
    }

    handleAnswerSelection(selectedIndex) {
      if (this.hasAnswered) return;
      this.hasAnswered = true;
      clearInterval(this.timerInterval);

      const responseDuration = (Date.now() - this.ticketStartTime) / 1000;
      this.responseTimes.push(responseDuration);

      const ticket = this.shiftQueue[this.currentIndex];
      const isCorrect = selectedIndex === ticket.correctIndex;

      // Disable buttons
      this.ansButtons.forEach((btn) => (btn.disabled = true));

      // Calculate confidence base & multiplier
      let baseBonus = 100;
      if (this.currentConfidence === "think") baseBonus = 200;
      if (this.currentConfidence === "certain") baseBonus = 350;

      let streakMultiplier = 1.0;
      if (this.shiftStreak >= 3) streakMultiplier = 1.5;
      if (this.shiftStreak >= 6) streakMultiplier = 2.0;
      if (this.shiftStreak >= 9) streakMultiplier = 2.5;

      // Speed bonus if answered in under 4 seconds
      const speedBonus = responseDuration < 4.0 && isCorrect ? 50 : 0;

      if (isCorrect) {
        this.audio.playSuccessChime();
        this.shiftCorrect++;
        this.shiftStreak++;
        if (this.shiftStreak > this.shiftPeakStreak) {
          this.shiftPeakStreak = this.shiftStreak;
        }

        const awardedPoints = Math.round(baseBonus * streakMultiplier) + speedBonus;
        this.shiftScore += awardedPoints;
        this.profile.totalXp += awardedPoints;
        this.categoryPerformance[ticket.category].correct++;

        // Style the tapped button
        this.ansButtons[selectedIndex].classList.add("is-correct");

        // Format feedback drawer
        this.feedbackStatus.className = "feedback-status correct";
        this.feedbackIcon.textContent = "✓";
        this.feedbackTitle.textContent = "Spot On, Barkeep!";
        this.feedbackPoints.textContent = `+${awardedPoints} XP`;

        // Clear category weakness if mastered
        if (this.profile.weakCategories[ticket.category]) {
          this.profile.weakCategories[ticket.category]--;
          if (this.profile.weakCategories[ticket.category] <= 0) {
            delete this.profile.weakCategories[ticket.category];
          }
        }
      } else {
        this.audio.playThud();
        this.shiftStreak = 0; // Streak broken

        // Deduct confidence penalty if 'Certain' was wrong
        if (this.currentConfidence === "certain") {
          this.shiftScore = Math.max(0, this.shiftScore - 100);
        }

        // Highlight incorrect & correct
        if (selectedIndex >= 0) {
          this.ansButtons[selectedIndex].classList.add("is-incorrect");
        }
        this.ansButtons[ticket.correctIndex].classList.add("is-correct");

        // Format feedback drawer
        this.feedbackStatus.className = "feedback-status incorrect";
        this.feedbackIcon.textContent = "✗";
        this.feedbackTitle.textContent = selectedIndex === -1 ? "Service Timeout!" : "Order Off-Spec";
        this.feedbackPoints.textContent = "+0 XP";

        // Register weakness for adaptive practice
        if (!this.profile.weakCategories[ticket.category]) {
          this.profile.weakCategories[ticket.category] = 0;
        }
        this.profile.weakCategories[ticket.category]++;

        // Survival mode strike out condition
        if (this.activeMode === "survival") {
          const totalMistakes = this.currentIndex + 1 - this.shiftCorrect;
          if (totalMistakes >= 3) {
            setTimeout(() => {
              this.showToast("3 Strikes reached on the Night Shift!");
              this.finishShift();
            }, 1200);
            return;
          }
        }
      }

      // Record ticket history
      this.profile.ticketsAnswered++;
      if (isCorrect) this.profile.ticketsCorrect++;
      if (this.shiftPeakStreak > this.profile.bestStreak) {
        this.profile.bestStreak = this.shiftPeakStreak;
      }

      this.updateStreakBadge();
      this.updateHeaderUI();

      // Show Principle and Context
      this.feedbackPrinciple.innerHTML = `<strong>Bartender's Principle:</strong> ${ticket.principle}`;
      this.feedbackDetailText.textContent = ticket.deepContext;
      this.feedbackDrawer.classList.remove("is-hidden");

      // Auto-save persistent profile
      PersistenceManager.save(this.profile);
    }

    advanceToNextTicket() {
      this.currentIndex++;
      if (this.currentIndex >= this.shiftQueue.length) {
        this.finishShift();
      } else {
        this.loadTicket(this.currentIndex);
      }
    }

    /* ==========================================================================
       8. LIFELINE SYSTEMS
       ========================================================================== */
    useLifelineSpoon() {
      if (this.hasAnswered || this.lifelineSpoons <= 0) return;
      this.lifelineSpoons--;
      this.spoonCountSpan.textContent = this.lifelineSpoons;
      this.btnLifelineSpoon.disabled = true;
      this.audio.playClink();

      const ticket = this.shiftQueue[this.currentIndex];
      const wrongIndices = [0, 1, 2, 3].filter((i) => i !== ticket.correctIndex);

      // Randomly eliminate 2 incorrect answers
      for (let i = wrongIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wrongIndices[i], wrongIndices[j]] = [wrongIndices[j], wrongIndices[i]];
      }

      this.ansButtons[wrongIndices[0]].classList.add("is-dimmed");
      this.ansButtons[wrongIndices[0]].disabled = true;
      this.ansButtons[wrongIndices[1]].classList.add("is-dimmed");
      this.ansButtons[wrongIndices[1]].disabled = true;

      this.showToast("50/50 Spoon: 2 incorrect recipes removed.");
    }

    useLifelineNote() {
      if (this.hasAnswered || this.lifelineNotes <= 0) return;
      this.lifelineNotes--;
      this.noteCountSpan.textContent = this.lifelineNotes;
      this.btnLifelineNote.disabled = true;
      this.audio.playTick();

      const ticket = this.shiftQueue[this.currentIndex];
      this.showToast(`Note: ${ticket.principle.slice(0, 75)}...`);
    }

    /* ==========================================================================
       9. SHIFT SUMMARY & RESULTS
       ========================================================================== */
    finishShift() {
      clearInterval(this.timerInterval);
      this.profile.shiftsCompleted++;
      PersistenceManager.save(this.profile);

      const totalTickets = this.currentIndex;
      const accuracy = totalTickets > 0 ? Math.round((this.shiftCorrect / totalTickets) * 100) : 0;

      const avgSpeed = this.responseTimes.length > 0
        ? (this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length).toFixed(1)
        : "0.0";

      // Stamp and Headline
      if (accuracy >= 80) {
        this.resultsStamp.textContent = "SERVICE EXCELLENCE";
        this.resultsHeadline.textContent = "Clean Ticket Board!";
        this.resultsSub.textContent = "Top-tier station flow, precise specifications, and zero cocktail returns.";
      } else if (accuracy >= 60) {
        this.resultsStamp.textContent = "SHIFT PASSED";
        this.resultsHeadline.textContent = "Solid Service";
        this.resultsSub.textContent = "Station completed with good speed. Review off-spec tickets below.";
      } else {
        this.resultsStamp.textContent = "RE-TRAINING REQUIRED";
        this.resultsHeadline.textContent = "Rough Station Run";
        this.resultsSub.textContent = "Several tickets sent back. Check the Bar Codex to sharpen specs.";
      }

      this.resScore.textContent = this.shiftScore.toLocaleString();
      this.resAccuracy.textContent = `${accuracy}%`;
      this.resStreak.textContent = this.shiftPeakStreak;
      this.resSpeed.textContent = `${avgSpeed}s`;

      // Rank Progress Logic
      const currentRank = this.getRankInfo(this.profile.totalXp);
      const nextRank = RANKS[currentRank.index + 1];

      this.resRankName.textContent = currentRank.name;
      if (nextRank) {
        const xpInLevel = this.profile.totalXp - currentRank.minXp;
        const xpNeeded = nextRank.minXp - currentRank.minXp;
        const pct = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));
        this.resRankFill.style.width = `${pct}%`;
        this.resXpToNext.textContent = `${nextRank.minXp - this.profile.totalXp} XP to ${nextRank.name}`;
      } else {
        this.resRankFill.style.width = "100%";
        this.resXpToNext.textContent = "Maximum Certification Attained";
      }

      // Breakdown by Category
      this.resBreakdownList.innerHTML = "";
      Object.keys(this.categoryPerformance).forEach((cat) => {
        const info = this.categoryPerformance[cat];
        const row = document.createElement("div");
        row.className = "breakdown-row";
        row.innerHTML = `
          <span class="breakdown-cat">${cat}</span>
          <span class="breakdown-stat">${info.correct} / ${info.total} (${Math.round((info.correct / info.total) * 100)}%)</span>
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
       10. CODEX & RECIPE VAULT
       ========================================================================== */
    renderCodex(filterCategory = "all", searchQuery = "") {
      this.codexCardsGrid.innerHTML = "";
      const filtered = CODEX_DATA.filter((item) => {
        const matchesCat = filterCategory === "all" || item.category === filterCategory;
        const matchesQuery = !searchQuery || 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.spec.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.notes.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesQuery;
      });

      this.codexCountBadge.textContent = `${filtered.length} of ${CODEX_DATA.length} Entries`;

      filtered.forEach((item) => {
        const card = document.createElement("article");
        card.className = "codex-card";
        card.innerHTML = `
          <div class="codex-card-top">
            <h2 class="codex-card-title">${item.title}</h2>
            <span class="codex-card-cat">${item.category}</span>
          </div>
          <div class="codex-recipe-spec">${item.spec}</div>
          <p class="codex-notes">${item.notes}</p>
        `;
        this.codexCardsGrid.appendChild(card);
      });

      document.getElementById("codex-unlocked-summary").textContent = 
        `${CODEX_DATA.length} Standard Specs Documented`;
    }

    filterCodex(category) {
      this.codexFilters.forEach((tab) => {
        if (tab.getAttribute("data-cat") === category) tab.classList.add("is-active");
        else tab.classList.remove("is-active");
      });
      this.renderCodex(category, this.codexSearchInput.value);
    }

    searchCodex(query) {
      const activeTab = document.querySelector(".filter-tab.is-active");
      const cat = activeTab ? activeTab.getAttribute("data-cat") : "all";
      this.renderCodex(cat, query);
    }

    /* ==========================================================================
       11. BARTENDER PROFILE & DIAGNOSTICS
       ========================================================================== */
    renderProfile() {
      const rank = this.getRankInfo(this.profile.totalXp);
      document.getElementById("prof-badge-icon").textContent = rank.badge;
      document.getElementById("prof-rank-name").textContent = rank.name;

      this.profTotalShifts.textContent = this.profile.shiftsCompleted;
      this.profTotalAnswers.textContent = this.profile.ticketsAnswered;

      const lifetimeAcc = this.profile.ticketsAnswered > 0
        ? Math.round((this.profile.ticketsCorrect / this.profile.ticketsAnswered) * 100)
        : 0;
      this.profLifetimeAcc.textContent = `${lifetimeAcc}%`;
      this.profBestStreak.textContent = this.profile.bestStreak;

      this.checkRelaxedTimer.checked = !!this.profile.relaxedTimer;
      this.checkSoundToggle.checked = !!this.profile.soundEnabled;

      // Render weak spots diagnostic list
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
            <span style="color: var(--burnt-orange); font-weight: bold;">${this.profile.weakCategories[cat]} Misses logged</span>
          `;
          this.weakSpotsList.appendChild(item);
        });
      }
    }
  }

  // Initialize Game on DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    window.barGame = new BarKnowledgeGame();
  });
})();
