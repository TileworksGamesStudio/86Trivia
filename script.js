/**
 * BAR KNOWLEDGE: THE BARTENDER'S CRAFT & SERVICE GAME
 * Clean Vanilla ES6 Architecture
 * Synthesized Web Audio Sound Engine (Zero external assets)
 * Neubrutalist Lounge Sleek Edition
 */

(function () {
  "use strict";

  /* ==========================================================================
     1. IN-SCRIPT CONTENT DATABASE: EXACTLY 5 PLAYABLE CRAFT CHALLENGES
     ========================================================================== */
  const CHALLENGES = [
  // --- ORIGINAL 01 TO 05 ---
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
  },

  // --- NEW 06 TO 30 ---
  {
    id: "ticket-06-stirred-thermo",
    title: "The Classic Dry Martini Equilibrium",
    category: "Ice & Thermodynamics",
    difficulty: 2,
    question: "When stirring a Classic Dry Martini with cracked, high-surface-area ice versus dense 1.25-inch cubes, what thermodynamic trade-off occurs during a standard 30-second stir?",
    answers: [
      "Cracked ice chills the drink slower due to excessive boundary layer meltwater insulation",
      "Cracked ice reaches the target temperature (-3°C to -4°C) faster but carries a high risk of rapid over-dilution beyond 25%",
      "Dense cubes generate higher friction, heating the ethanol and preventing the drink from dropping below 0°C",
      "Dense cubes prevent vermouth botanicals from integrating with gin terpene hydrocarbons"
    ],
    correctIndex: 1,
    principle: "Dilution and chilling are inextricably linked in cocktail physics: chilling cannot occur without ice melting (latent heat of fusion).",
    deepContext: "Dave Arnold's law of cocktail thermodynamics states that chilling is strictly proportional to dilution. Small or cracked ice provides immense surface area, cooling the drink rapidly within 15 seconds, but quickly surges past the ideal 20-24% dilution threshold if stirred for 30-40 seconds.",
    spec: "2.5 oz London Dry Gin • 0.5 oz Dry Vermouth • 1 dash Orange Bitters • Stir to -3.5°C (approx. 22% dilution) • Chilled Nick & Nora • Lemon twist expressed and discarded",
    hint: "Think about surface area to volume ratio: more surface area means faster heat transfer and faster melting."
  },
  {
    id: "ticket-07-clarification",
    title: "Casein Precipitation in Clarified Milk Punch",
    category: "Bar Chemistry & Clarification",
    difficulty: 3,
    question: "During the production of an English Milk Punch, what is the precise chemical mechanism responsible for removing turbidity and harsh wood tannins?",
    answers: [
      "Alcohol reacts with lactose sugars to synthesize insoluble cellulose esters that capture particles",
      "Ethanol denatures dairy whey proteins, forming hydrophobic bonds that evaporate during resting",
      "Low pH induces casein micelle coagulation into curds, which trap suspended solids and polyphenolic tannins within a protein filter bed",
      "Calcium ions in whole milk bind directly to volatile acids, causing them to convert into precipitate salts"
    ],
    correctIndex: 2,
    principle: "Acid drops the milk's pH below its isoelectric point (pH ~4.6), causing casein proteins to precipitate into curds that adsorb astringent polyphenols and trap particulate.",
    deepContext: "Dating back to Aphra Behn (1670s) and Benjamin Franklin (1763), Milk Punch relies on casein curdling. Pouring the acidic, alcoholic base into the milk (never milk into acid) prevents localized premature clumping, yielding a microscopic curd bed that filters out tannins while leaving silky whey proteins behind.",
    spec: "4:1 Punch Base to Whole Milk ratio • Add room-temp punch into cold milk • Rest 4 hours • Strain through curd bed twice • Bottle brilliant and crystal clear",
    hint: "Consider how acid alters the structural charge of dairy casein proteins to build a natural physical filter."
  },
  {
    id: "ticket-08-carbonation",
    title: "The Japanese Highball & Henry's Law",
    category: "Carbonation & Effervescence",
    difficulty: 2,
    question: "Why does an authentic Tokyo-style Whisky Highball mandate a sub-zero chilled glass, freezing spirits (-15°C), and no direct stirring of the club soda?",
    answers: [
      "Carbon dioxide solubility in water is inversely proportional to liquid temperature; high temperatures and physical agitation trigger rapid nucleation and gas loss",
      "Stirring soda water creates centrifugal cavitation that converts dissolved CO2 directly into carbon monoxide",
      "Chilling whiskey below freezing breaks long-chain fatty acids, making the spirit transparent to sparkling water",
      "Soda water molecules form ionic bonds with whiskey ethanol only when kinetic energy is kept near zero"
    ],
    correctIndex: 0,
    principle: "Henry's Law dictates that gas solubility increases as liquid temperature drops; any physical disturbance or warm surface acts as a kinetic nucleation trigger.",
    deepContext: "The Japanese Highball methodology treats carbonation as a delicate structural ingredient. By matching the whiskey's density and temperature closely to ice-cold soda, pouring down a spiraled barspoon, and using a single gentle vertical lift, the drink preserves over 7.0 g/L of dissolved CO2.",
    spec: "1.5 oz Japanese Whisky (kept at -18°C) • 4.5 oz High-carbonation Club Soda (chilled to 1°C) • Hand-carved clear ice pillar • Collins glass • 1 single gentle lift with barspoon",
    hint: "Recall how temperature affects gas solubility in liquids: cold liquids trap dissolved gases, heat releases them."
  },
  {
    id: "ticket-09-aroma-rinse",
    title: "The Sazerac & The Absinthe Cavitation Coat",
    category: "Classic Cocktails",
    difficulty: 2,
    question: "Why does the canonical New Orleans Sazerac call for an absinthe rinse/atomization in a frozen glass rather than incorporating 5 ml of absinthe directly into the stirred whiskey base?",
    answers: [
      "Absinthe will chemically curdle the sugar cube's sucrose matrix if stirred together directly",
      "Rye whiskey tannins oxidize and turn brown-black when coming into contact with wormwood thujone",
      "Stirring absinthe with ice destroys its delicate green chlorophyll compounds via cold-temperature bleaching",
      "Absinthe's anethole terpenes are highly volatile; coating the glass rim provides immediate retro-nasal aromatics without dominating the palate"
    ],
    correctIndex: 3,
    principle: "Aromatic washes exploit surface-area volatilization: the olfactory system perceives top notes on approach, preserving the mid-palate balance of spirit and bitters.",
    deepContext: "Invented by Antoine Amédée Peychaud and codified in late-19th-century New Orleans, the Sazerac is built in one glass and strained into a chilled second glass coated with absinthe. Anethole from anise and fennel possesses a remarkably low sensory threshold; 5 ml stirred inside the drink completely eclipses rye's rye-bread spice.",
    spec: "2.0 oz Straight Rye Whiskey (or Cognac) • 1 barspoon Rich Demerara Syrup • 3 dashes Peychaud's Bitters • 1 dash Angostura Bitters • Absinthe rinse in frozen rocks glass • Lemon peel expressed and discarded • Served neat (no ice)",
    hint: "Think about olfactory perception vs. palate weight: where do you want anise aromatics to sit during the drinking experience?"
  },
  {
    id: "ticket-10-acid-balancing",
    title: "Acid Adjustment: The Chemistry of Super Juice",
    category: "Acid & Sugar Balancing",
    difficulty: 3,
    question: "When formulating an acid-adjusted 'Orange Super Juice' to mathematically mimic the functional tartness and preservative life of fresh Persian lime juice in cocktails, what acids must be added?",
    answers: [
      "Acetic acid and lactic acid in a 5:1 ratio",
      "Citric acid and malic acid adjusted to approximately 6.0% total titratable acidity with a 2:1 citric-to-malic ratio",
      "Tartaric acid and ascorbic acid brought to pH 1.2",
      "Phosphoric acid and succinic acid blended at 10% volume by weight"
    ],
    correctIndex: 1,
    principle: "Replicating citrus profile requires matching both the titratable acidity percentage (~6%) and the specific organic acid ratio (citric provides sharp bite; malic provides lingering green-apple sharpness).",
    deepContext: "Pioneered by Nick Fisher and refined by bar scientists, citrus super juice extracts peel essential oils via oleo-citrate (using dry acids instead of sugar) before blending with juice and water. Lime juice naturally contains ~4.0% citric acid and ~2.0% malic acid. Orange juice sits around ~1.0% acid, requiring substantial supplementation.",
    spec: "Lime Profile: 40g Citric Acid • 20g Malic Acid • 1000g Water • Peels of 8 limes (macerated 2 hours) • Blend, strain, bottle",
    hint: "Identify the two primary organic fruit acids found in fresh limes, matching their natural ~6% total acid concentration."
  },
  {
    id: "ticket-11-sensory-flaw",
    title: "The Aviation Soap Trap: Crème de Violette Volatiles",
    category: "Sensory & Diagnosis",
    difficulty: 2,
    question: "A bartender creates an Aviation cocktail that guests repeatedly complain tastes 'like grandmother's bath soap and perfume.' What technical adjustment corrects this profile?",
    answers: [
      "Reduce Crème de Violette to a strict 1 barspoon (approx. 0.15 - 0.25 oz) measure and balance with Maraschino",
      "Switch from London Dry Gin to an Old Tom gin with high residual sucrose",
      "Add two dashes of aromatic bitters to suppress volatile ionone flower compounds",
      "Shake with large clear ice cubes for at least 45 seconds to burn off volatile esters"
    ],
    correctIndex: 0,
    principle: "Beta-ionone compounds in violet liqueurs have an extraordinarily low sensory threshold; an excess of even 5 ml overpowers citrus and botanical harmonies.",
    deepContext: "First published in Hugo Ensslin's 1916 'Recipes for Mixed Drinks', the Aviation's sky-blue hue comes from Crème de Violette. Over-pouring creates an aggressive chemical-floral off-flavor. Modern mixologists treat Violette primarily as a coloring and top-note aromatic, keeping it under 0.25 oz alongside Luxardo Maraschino.",
    spec: "2.0 oz London Dry Gin • 0.75 oz Fresh Lemon Juice • 0.5 oz Luxardo Maraschino Liqueur • 0.15-0.25 oz Crème de Violette • Shake vigorously • Fine strain into chilled coupe • Brandied cherry",
    hint: "Consider the dosing potency of concentrated violet floral liqueurs containing intense beta-ionone molecules."
  },
  {
    id: "ticket-12-fat-washing",
    title: "Lipid Partitioning in Fat-Washed Spirits",
    category: "Bar Chemistry & Clarification",
    difficulty: 3,
    question: "What physical and chemical process allows a bartender to infuse the flavor of rendered bacon fat or smoked butter into bourbon without leaving greasy lipids in the finished bottle?",
    answers: [
      "Centrifugal force causes animal fat to react with ethanol, creating soluble acetate salts",
      "High-proof alcohol acts as a solvent extracting hydrophobic, non-polar aroma compounds; sub-zero freezing solidifies triglycerides for clean physical filtration",
      "Alcohol breaks the peptide bonds in melted fat, transforming oil into gaseous volatile esters",
      "Freezing bourbon at -18°C causes water ice to absorb the liquid fat lipids"
    ],
    correctIndex: 1,
    principle: "Ethanol acts as an amphiphilic solvent, dissolving fat-soluble volatile compounds (lactones, aldehydes, pyrazines) while triglycerides solidify when chilled for easy mechanical filtration.",
    deepContext: "Invented by Don Lee at PDT in 2007 (Benton's Old Fashioned), fat washing exploits lipid solubility. Saturated fats solidify cleanly between -10°C and -18°C, forming a hardened disc at the neck of the container, while the spirit retains all non-polar aromatics and mouthfeel-altering trace fatty acids.",
    spec: "Rendered fat 120g • 750ml Bourbon (45-50% ABV) • Infuse warm 4 hours at room temp • Freeze at -18°C for 12 hours • Remove solid lipid puck • Pass through fine paper coffee filter",
    hint: "Think about how non-polar aromatic molecules dissolve into ethanol and how saturated fats behave at sub-zero temperatures."
  },
  {
    id: "ticket-13-brix-dynamics",
    title: "Refractometric Brix & Water Activity in Bar Syrups",
    category: "Acid & Sugar Balancing",
    difficulty: 2,
    question: "Why does a 2:1 Rich Simple Syrup (approx. 66° Brix) offer profound operational and sensory advantages over 1:1 Simple Syrup (approx. 50° Brix)?",
    answers: [
      "1:1 syrup is too sweet, while 2:1 syrup has a lower perceived sugar level due to sucrose crystallization",
      "2:1 syrup lowers water activity (aw < 0.85), inhibiting microbial growth without refrigeration, and adds less dilution per unit of sweetness",
      "1:1 syrup freezes at room temperature when coming into contact with cold metal jiggers",
      "2:1 syrup reduces cocktail viscosity, speeding up shaking and straining times"
    ],
    correctIndex: 1,
    principle: "Higher sucrose concentrations bind free water molecules, dropping water activity ($a_w$) below the threshold required for microbial mitosis, while increasing liquid viscosity.",
    deepContext: "A 1:1 simple syrup requires refrigeration and spoils within 3-4 weeks from mold. 2:1 rich cane syrup is shelf-stable for months due to osmotic pressure on bacteria. Crucially, when balancing high-proof spirits, 2:1 provides sweetening power without introducing unwanted excess water volume into the shaker.",
    spec: "Rich Syrup: 1000g White Cane Sucrose : 500g Boiling Distilled Water • Dissolve completely (no boil) • Yield: 66.5° Brix • Stable at ambient room temperature",
    hint: "Think about how sugar concentration affects microbial shelf-life and how much unchilled water you introduce into a jigger."
  },
  {
    id: "ticket-14-equal-parts",
    title: "The Corpse Reviver No. 2 Architecture",
    category: "Classic Cocktails",
    difficulty: 2,
    question: "The Corpse Reviver No. 2 is an iconic 1:1:1:1 cocktail from Harry Craddock's 1930 Savoy Cocktail Book. What exact recipe constitutes this canonical morning cure?",
    answers: [
      "Equal parts: Gin, Cointreau, Lillet Blanc (or Kina Lillet), and Fresh Lemon Juice, with an Absinthe rinse",
      "Equal parts: Cognac, Calvados, Sweet Vermouth, and Lime Juice, with a Pastis wash",
      "Equal parts: London Dry Gin, Maraschino Liqueur, Green Chartreuse, and Lime Juice",
      "Equal parts: Blanco Tequila, Mezcal, Yellow Chartreuse, and Grapefruit Juice"
    ],
    correctIndex: 0,
    principle: "The Corpse Reviver No. 2 is the benchmark for balancing equal-parts citrus, botanical spirit, triple sec, and aromatized fortified wine, punctuated by an anise rinse.",
    deepContext: "Published by Harry Craddock with the famous quip: 'Four of these taken in swift succession will unrevive the corpse again.' Modern bartenders often replace defunct Kina Lillet with Cocchi Americano to restore the quinine bitterness intended in the 1930 spec.",
    spec: "0.75 oz London Dry Gin • 0.75 oz Cointreau • 0.75 oz Cocchi Americano (or Lillet Blanc) • 0.75 oz Fresh Lemon Juice • Absinthe rinse in chilled coupe • Lemon twist (discarded)",
    hint: "Identify the quartet featuring gin, orange liqueur, quinquina/aromatized wine, and fresh lemon juice."
  },
  {
    id: "ticket-15-enzymes",
    title: "Pectinase De-pectinization in Fruit Juices",
    category: "Bar Chemistry & Clarification",
    difficulty: 3,
    question: "When clarifying fresh Granny Smith apple or pineapple juice using a benchtop centrifuge, why is the enzymatic addition of Pectinex Ultra SP-L mandatory before spinning?",
    answers: [
      "Pectinase raises the sugar Brix level, forcing fruit pulp to precipitate naturally within minutes",
      "It converts liquid malic acid into volatile gas bubbles that lift suspended matter to the surface",
      "It hydrolyzes structural pectin polymers that hold fruit pulp in colloidal suspension, allowing solids to pellet densely under centrifugal G-force",
      "It neutralizes high ethanol concentrations that would otherwise melt polycarbonate centrifuge buckets"
    ],
    correctIndex: 2,
    principle: "Pectin is a structural polysaccharide that forms a colloidal mesh, preventing suspended solids from separating under gravity or standard centrifugation.",
    deepContext: "Pectinex Ultra SP-L is a polygalacturonase enzyme preparation. Adding 1-2 ml per liter of fresh fruit juice breaks down the alpha-1,4-D-galacturonan bonds of pectin within 15 minutes at room temperature. Once hydrolyzed, spinning at 4000 RPM cleanly drops all insoluble solids into a dense dry puck, leaving crystal-clear, intensely flavored juice.",
    spec: "1000g Fresh Juice • 1.5g Pectinex Ultra SP-L • Rest 20 mins at 20°C • Centrifuge at 4000 RPM (approx. 3000g) for 10 mins • Decant clear liquid",
    hint: "Pectin creates a jelly-like colloidal suspension; what happens when an enzyme dismantles that structural web?"
  },
  {
    id: "ticket-16-herb-mechanics",
    title: "Mint Cellular Extraction in the Mint Julep & Mojito",
    category: "Technique & Texture",
    difficulty: 1,
    question: "Why must a bartender never violently pulverize or shred spearmint leaves with a spiked muddler when building a Mint Julep or Mojito?",
    answers: [
      "Muddling breaks open internal cell walls, liberating bitter polyphenols, chlorophyll, and vegetative tannins into the liquid",
      "Shredded mint leaves consume all dissolved oxygen, causing the rum or bourbon to spontaneously oxidize and turn grey",
      "Torn mint leaves react with sucrose to form insoluble menthol crystals that irritate the throat",
      "Pulverized mint binds to ethanol molecules and halts the cooling transfer of crushed ice"
    ],
    correctIndex: 0,
    principle: "Essential mint oils (menthol, menthone) reside in fragile glandular trichomes on the leaf surface; cellular rupture releases bitter intracellular chlorophyll.",
    deepContext: "The aromatic magic of mint comes from surface oil glands. A gentle press, slap between palms, or rolling with a smooth wooden muddler releases sweet essential oils without tearing the cell membrane. Macerating the leaf exposes polyphenol oxidase and chlorophyll, turning drinks vegetal, muddy, and bitter.",
    spec: "8-10 Fresh Spearmint leaves • 0.5 oz 2:1 Demerara Syrup • Gently press mint in base of Julep cup • 2.0 oz High-proof Bourbon • Fill with crushed pebble ice • Swizzle • Crown with lavish slapped mint bouquet",
    hint: "Where are the pleasant aroma oils located on the leaf versus the bitter green compounds inside the plant cells?"
  },
  {
    id: "ticket-17-float-physics",
    title: "Density Layering in the Modern Penicillin",
    category: "Classic Cocktails",
    difficulty: 2,
    question: "In Sam Ross's modern classic Penicillin cocktail, what hydrodynamic principle ensures that the peated Islay Scotch sits cleanly atop the drink as a float rather than sinking?",
    answers: [
      "The peated Scotch contains dense peat particulates that ride across surface tension waves",
      "Chilled honey syrup bonds with the peated Scotch, pulling it directly to the surface of the glass",
      "The blended Scotch base was shaken with ice and honey-ginger syrup, creating a dense, cold sugar-water matrix with a higher specific gravity than neat high-proof peated whisky",
      "The presence of fresh lemon juice creates a magnetic polarity barrier that repels Islay malt molecules"
    ],
    correctIndex: 2,
    principle: "Liquids layer strictly according to specific gravity (relative density); chilled solutions loaded with dissolved sucrose have a much higher density than room-temperature neat spirits.",
    deepContext: "Created in 2005 at Milk & Honey NYC by Sam Ross, the Penicillin combines blended Scotch, fresh lemon, and ginger-honey syrup. Shaken with ice, the base drink has high density (cold water + concentrated honey syrup). Floating neat Islay malt (lower density, high ethanol, ambient temp) over the back of a barspoon creates an aromatic olfactory vapor shield.",
    spec: "2.0 oz Blended Scotch • 0.75 oz Fresh Lemon Juice • 0.375 oz Honey Syrup • 0.375 oz Ginger Syrup • Shake with ice • Strain over large rock • Float 0.25 oz Peated Islay Single Malt • Candied ginger garnish",
    hint: "Compare the physical weight/density of cold, sugar-rich shaken cocktail liquid versus room-temperature high-proof whisky."
  },
  {
    id: "ticket-18-neuro-saline",
    title: "Saline Solution (20%) Sensory Neurobiology",
    category: "Sensory & Diagnosis",
    difficulty: 3,
    question: "What neurological and sensory effect occurs when adding 2 to 4 drops of a 20% saline solution (sodium chloride) to a bitter-forward cocktail or citrus sour?",
    answers: [
      "Sodium ions selectively block human TAS2R bitter taste receptors, effectively suppressing bitterness while heightening perceived sweetness and citrus brightness",
      "Chloride ions destroy volatile ethanol vapors, reducing the burn of 100-proof spirits on the trigeminal nerve",
      "Salt molecules bind directly with citrus pectin, increasing shaken cocktail viscosity by 30%",
      "Saline raises the liquid's freezing point, keeping the drink ice cold for double the service time"
    ],
    correctIndex: 0,
    principle: "Sodium ($Na^+$) acts as an allosteric inhibitor of bitter taste receptors (TAS2Rs) on the tongue, diminishing perceived bitterness and enhancing sweetness contrast.",
    deepContext: "Neurobiology proves that salt is a universal flavor modifier. In drinks like a Cynar Sour, Ti' Punch, or Negroni, a micro-dose of saline suppresses harsh quinine/gentian astringency without making the drink taste 'salty'. It simultaneously triggers salivary glands, delivering a rounder, fuller mouthfeel.",
    spec: "20% Saline Solution: 20g Non-iodized fine sea salt dissolved in 80g Distilled water • Dose: 2-4 drops per drink via dropper bottle",
    hint: "Focus on how sodium ions interact with the taste buds responsible for registering bitterness on the tongue."
  },
  {
    id: "ticket-19-rapid-infusion",
    title: "Nitrous Oxide (N₂O) Cavitation Infusion",
    category: "Bar Chemistry & Clarification",
    difficulty: 3,
    question: "When performing a 2-minute rapid botanical spirit infusion using an iSi cream whipper charged with nitrous oxide (N₂O), what physical mechanism drives the extraction?",
    answers: [
      "Nitrous oxide sparks a rapid chemical combustion that flash-cooks botanical plant tissues",
      "N₂O freezes the spirit into micro-crystals, shattering aromatic oil vesicles across the chamber",
      "Under high pressure (approx. 4-8 bar), N₂O forces solvent ethanol into the plant cells; rapid venting causes dissolved N₂O gas bubbles to boil violently, rupturing cell walls and expelling flavors into the spirit",
      "High atmospheric pressure converts the spirit's water content into a pure acid that dissolves cellulose"
    ],
    correctIndex: 2,
    principle: "Pressurized gas dissolves into the solvent matrix and penetrates cellular matter; instantaneous depressurization creates rapid bubble cavitation that tears cell structures from within.",
    deepContext: "Pioneered by Dave Arnold in 'Liquid Intelligence', rapid nitrous infusion bypasses months of traditional maceration. Nitrous oxide is highly soluble in ethanol under pressure. Venting the whipper instantaneously induces flash cavitation, blasting cacao, coffee, or hard wood cell structures open without extracting heat-damaged off-notes.",
    spec: "200ml High-proof Spirit • 30g Cacao nibs or fresh herbs • Seal in iSi Whipper • Charge with 2 chargers N₂O • Agitate 60s • Vent instantly with exhaust cup • Strain through fine mesh",
    hint: "Think about what happens inside plant tissues when high-pressure dissolved gas suddenly expands upon venting."
  },
  {
    id: "ticket-20-chartreuse-balance",
    title: "The Last Word: High-Proof Herbal Dynamics",
    category: "Classic Cocktails",
    difficulty: 2,
    question: "Why does the equal-parts ratio (1:1:1:1) of The Last Word succeed structurally despite featuring Green Chartreuse at a towering 55% ABV (110 proof)?",
    answers: [
      "Green Chartreuse loses its alcohol content when shaken against lime juice",
      "The immense sugar content of both Maraschino liqueur and Green Chartreuse counterweights the 55% ABV ethanol and lime acid, while botanical terpenes merge seamlessly with gin",
      "Gin and Chartreuse form an azeotrope that neutralizes alcohol heat on the palate",
      "Maraschino cherries in the garnish absorb all excess ethanol fumes from the glass"
    ],
    correctIndex: 1,
    principle: "High ethanol levels require equally substantial structural anchors: heavy sugar density and sharp citric acid balance out potent alcohol warmth.",
    deepContext: "Devised at the Detroit Athletic Club in 1916 and resurrected by Murray Stenson at the Zig Zag Café in Seattle (2004). Green Chartreuse contains 130 botanicals and over 200g/L sugar. Luxardo Maraschino contributes rich cherry-stone sweetness. The 0.75 oz fresh lime provides the necessary acid knife to slice through this massive sugar-proof matrix.",
    spec: "0.75 oz London Dry Gin • 0.75 oz Green Chartreuse (55% ABV) • 0.75 oz Luxardo Maraschino • 0.75 oz Fresh Lime Juice • Hard shake with dense ice • Fine strain into chilled coupe • Brandied cherry",
    hint: "Look at the balance between high proof, heavy liqueur sugar content, and sharp citrus acidity."
  },
  {
    id: "ticket-21-oleo-osmosis",
    title: "Oleo Saccharum: Osmotic Flavedo Extraction",
    category: "Technique & Texture",
    difficulty: 2,
    question: "What thermodynamic and chemical mechanism occurs when dry granulated sucrose is tossed with fresh lemon or orange peel flavedo to create an Oleo Saccharum?",
    answers: [
      "Sucrose acts as an abrasive scrub that mechanically grinds the peel into liquid pulp",
      "Granulated sucrose is intensely hygroscopic; through osmotic pressure, it draws moisture and dissolved essential terpene oils out of the flavedo oil glands",
      "Sugar ferments the peel oils into an alcoholic tincture within 30 minutes at room temperature",
      "Sucrose triggers cellular respiration, making the peel emit aromatic carbon dioxide gas that liquefies"
    ],
    correctIndex: 1,
    principle: "Dry sugar creates an extreme osmotic gradient across botanical cell walls, extracting moisture and rupturing essential oil pockets (limonene, pinene) into a rich syrup.",
    deepContext: "Recorded in punch literature as early as 1670, Oleo Saccharum ('oil sugar') is the bedrock of classic punch. Sugar crystals pull oil directly from the flavedo (the colored outer rind) without dragging along the bitter, acrid flavonoids of the spongy white albedo pith.",
    spec: "Peels of 6 Lemons (flavedo only, no white pith) • 150g Granulated White Cane Sugar • Muddle lightly • Vac-seal or seal in glass jar for 4 to 12 hours • Strain aromatic oil-rich syrup",
    hint: "Recall how dry sugar attracts water and extracts liquids through cellular membranes via osmosis."
  },
  {
    id: "ticket-22-mai-tai-emulsion",
    title: "The 1944 Mai Tai & Orgeat Emulsification",
    category: "Classic Cocktails",
    difficulty: 2,
    question: "In Victor 'Trader Vic' Bergeron's canonical 1944 Mai Tai, what role does almond orgeat syrup play beyond simple sweetening?",
    answers: [
      "It adds dairy lactose that alters the rum's alcohol classification",
      "Almond oils and natural emulsifiers in the orgeat create a micro-emulsion with the rum's heavy congeners, producing a rich, opaque mouthfeel and rounding sharp citrus bite",
      "It reacts with orange curaçao to make the cocktail change color from green to amber",
      "It neutralizes all rum proof, reducing the final cocktail ABV to under 5%"
    ],
    correctIndex: 1,
    principle: "Orgeat is an oil-in-water emulsion; when shaken, its fatty lipid droplets and hydrocolloids coat the palate, softening the bite of high-ester Jamaican rum and lime acid.",
    deepContext: "Created in 1944 in Oakland, California, using 17-year-old J. Wray & Nephew Jamaican pot-still rum. The combination of Martinique and high-ester Jamaican rum produces intense fruit and funk (esters like ethyl butyrate). The rich lipid structure of real almond orgeat binds these intense aromatics into a creamy, cohesive palate experience.",
    spec: "2.0 oz Aged Jamaican Funk Rum (or split with Rhum Agricole) • 0.75 oz Fresh Lime Juice • 0.5 oz Pierre Ferrand Dry Curaçao • 0.25 oz Rich Orgeat (Almond Syrup) • 0.25 oz 2:1 Demerara Syrup • Shake hard with crushed ice • Spend lime shell & fresh mint bouquet garnish",
    hint: "Think about the fat and oil content of real almonds and how emulsions affect the physical texture and mouthfeel of a cocktail."
  },
  {
    id: "ticket-23-draft-kegging",
    title: "Direct Carbonation: Draft & Bottled Cocktails",
    category: "Carbonation & Effervescence",
    difficulty: 3,
    question: "When pre-batching and carbonating a cocktail for draft dispense or custom crown-capped glass bottles, what critical step must be executed before applying CO₂ head pressure?",
    answers: [
      "The batch must be diluted with water to account for lack of ice melt, and chilled to -1°C to 1°C; all suspended particles must be clarified out to prevent nucleation points",
      "The batch must be heated to 60°C to activate the spirits' ester bonds",
      "The batch must contain 15% egg white powder to hold carbon dioxide bubbles in place",
      "Carbon dioxide pressure must be applied at a minimum of 90 PSI at room temperature"
    ],
    correctIndex: 0,
    principle: "Carbonation requires cold liquid (gas solubility increases at low temps), precise pre-dilution (simulating shake/stir water melt), and zero suspended particulates (which trigger wild, catastrophic foaming).",
    deepContext: "Attempting to carbonate an unchilled batch wastes CO2. Warm liquids cannot absorb sufficient volumes of gas. Furthermore, any microscopic particulate (unclarified citrus pulp, spice grounds) acts as a violent nucleation site, instantly releasing all dissolved gas the moment the bottle is uncapped or the draft tap opened.",
    spec: "Batch: Spirit + Modifier + Acid + 20% Water Dilution • Clarify to <10 NTU turbidity • Chill batch to 0°C • Connect CO2 at 35-42 PSI in carbonation rig • Shake tank under pressure • Rest cold 24h",
    hint: "Identify the requirements of gas solubility: temperature, target dilution without ice, and eliminating fizz-triggering particles."
  },
  {
    id: "ticket-24-boulevardier-congeners",
    title: "The Boulevardier: Congeners and Proof Re-balancing",
    category: "Classic Cocktails",
    difficulty: 2,
    question: "When pivoting from a classic Gin Negroni to a Bourbon Boulevardier, why do top craft cocktail bars frequently modify the canonical 1:1:1 ratio to a 1.5:1:1 or 2:1:1 ratio?",
    answers: [
      "Gin has twice the alcohol density of bourbon, requiring smaller amounts",
      "Bourbon contains heavy oak congeners, vanillin, and wood sweetness; a 1:1:1 ratio causes the sweet vermouth to completely bury the whiskey's structure",
      "Campari chemically coagulates with corn whiskey unless the whiskey is the absolute dominant component",
      "Sweet vermouth oxidizes 10 times faster when touching American oak spirits"
    ],
    correctIndex: 1,
    principle: "A spirit with high sweetness, vanilla congeners, and low herbal cut requires increased volume and proof to stand up against aggressive bittering and sweet fortified wines.",
    deepContext: "Created in late 1920s Paris by Erskine Gwynne (editor of 'The Boulevardier' magazine). While London Dry Gin is crisp, dry, and botanical—cutting cleanly through sweet vermouth and Campari in equal measures—corn-heavy bourbon contains sweet lactones and vanillin. Increasing the whiskey to 1.5 oz or 2.0 oz restores spirit dominance and backbone.",
    spec: "1.5 oz Straight Bourbon or High-Rye Rye (100 Proof) • 1.0 oz Campari • 1.0 oz Sweet Red Vermouth (Carpano Antica or Cocchi di Torino) • Stir with dense ice • Chilled rocks glass over big rock • Orange twist",
    hint: "Consider the inherent sweetness and wood notes of bourbon compared to the sharp, dry botanical profile of gin."
  },
  {
    id: "ticket-25-sub-zero-viscosity",
    title: "Sub-Zero Freezer Martinis: Viscosity vs. Volatilization",
    category: "Ice & Thermodynamics",
    difficulty: 3,
    question: "A high-end bar stores bottled Martinis in a freezer at -18°C for direct table service. Why MUST water be added directly to the bottle during prep, and what sensory compromise occurs at this temperature?",
    answers: [
      "Water prevents the bottle from exploding; the extreme cold enhances floral aromatics beyond control",
      "Without ice stirring, zero meltwater dilution occurs; at -18°C, ethanol viscosity feels luxurious, but volatile aromatic esters are physically suppressed until warmed on the palate",
      "Water lowers the spirit's proof so that it turns into a thick frozen slush",
      "Freezer storage destroys gin terpenes unless water is added to hydrolyze the juniper oils"
    ],
    correctIndex: 1,
    principle: "Freezer cocktails undergo zero kinetic melting; water must be calculated and added during batching. Lower temperatures dramatically reduce vapor pressure, muting aromatic volatile compounds.",
    deepContext: "A stirred Martini relies on ice for ~20-25% water dilution and cooling to -3°C. Pouring neat gin from a -18°C freezer is searingly hot with ethanol proof. Pre-diluting the batch with ~22% filtered water brings it to proper drinking balance. At sub-zero temps, liquid viscosity increases (creamy velvet texture), but aromatics are locked down until the liquid meets oral body heat.",
    spec: "Batch: 500ml Gin • 100ml Dry Vermouth • 150ml Distilled Water (23% dilution) • 5 dashes Bitters • Store at -18°C for at least 12h • Pour directly into frozen stemware",
    hint: "If you don't stir over ice, where does the necessary dilution come from? And what does freezing cold do to evaporating scent molecules?"
  },
  {
    id: "ticket-26-flip-lecithin",
    title: "The Flip & Whole Egg Lecithin Emulsification",
    category: "Technique & Texture",
    difficulty: 2,
    question: "What biochemical component within the egg yolk enables a traditional Flip cocktail (Spirit, Sugar, Whole Egg) to produce a rich, uniform custard texture that never separates?",
    answers: [
      "Albumin alone, which stiffens only when cold",
      "Lecithin, an amphiphilic phospholipid that acts as a powerful surfactant, binding fat molecules and aqueous ethanol into a stable colloidal emulsion",
      "Keratin proteins that dissolve in high-proof brandy",
      "Enzymatic glucose oxidase that converts spirit ethanol into whipped cream"
    ],
    correctIndex: 1,
    principle: "Egg yolk contains high concentrations of lecithin, a phospholipid with a hydrophilic head and hydrophobic tail that permanently stabilizes water-in-oil and oil-in-water mixtures.",
    deepContext: "Dating back to the late 1600s as a hot tavern drink heated with a loggerhead iron, the modern cold Flip uses whole eggs. While the white provides airy albumin foam, the yolk provides dense lipids and lecithin. Shaking hard emulsifies the spirit and melted ice with yolk fats, yielding a creamy, velvety custard mouthfeel with zero dairy milk.",
    spec: "2.0 oz Cognac or Dark Rum • 0.5 oz Rich Demerara Syrup • 1 Whole Fresh Egg • Dry shake vigorously 15s • Shake with dense ice 10s • Strain into chilled goblet • Lavish freshly grated nutmeg on top",
    hint: "Identify the famous natural fat-and-water binding compound abundant in egg yolks used in mayonnaise and cocktails."
  },
  {
    id: "ticket-27-agar-syneresis",
    title: "Agar-Agar Freeze-Thaw Gelation for Clarification",
    category: "Bar Chemistry & Clarification",
    difficulty: 3,
    question: "When clarifying citrus or berry juices using Agar-Agar via the freeze-thaw method, what process releases the crystal-clear liquid from the agar gel network?",
    answers: [
      "Syneresis: as the frozen agar matrix slowly thaws, the polysaccharide network contracts and expels trapped free water and dissolved flavors while retaining insoluble particulates",
      "Sublimation: water turns directly into vapor, leaving clear syrup behind",
      "Centrifugal lysis: agar dissolves in ethanol when frozen, melting clear fruit juices instantly",
      "Oxidation: cold air consumes the fruit fibers, bleaching out all colors and cloudiness"
    ],
    correctIndex: 0,
    principle: "Agar forms a complex hydrocolloid polymer mesh; freezing and slow thawing induces syneresis, forcing the gel to squeeze out clear liquid while trapping pulp and suspended matter.",
    deepContext: "Derived from red algae, agar-agar hydrates at 85°C and gels at 32-40°C. In the quick-thaw technique, juice is incorporated into a 0.2% agar hydrated base, set in a pan, frozen solid, and allowed to thaw over a fine mesh filter in a refrigerator. The thawing ice collapses the agar sponge, releasing luminous, particle-free clarified nectar.",
    spec: "750g Juice • Hydrate 1.5g Agar-agar (0.2%) in 100g boiling water • Whisk juice into warm agar • Chill to set • Freeze solid • Thaw over cheesecloth in fridge • Decant brilliant juice",
    hint: "Recall the culinary term for the weeping or expulsion of liquid from a contracting gel network."
  },
  {
    id: "ticket-28-french-75-thermo",
    title: "The French 75: Effervescent Volatile Dynamics",
    category: "Carbonation & Effervescence",
    difficulty: 2,
    question: "Why must the gin, lemon juice, and simple syrup base of a French 75 be hard-shaken with ice and fine-strained into the flute BEFORE topping with cold Champagne?",
    answers: [
      "Champagne cannot be shaken, and adding warm unshaken ingredients directly to Champagne causes thermal degassing, instantly collapsing carbonation and warming the drink",
      "Gin and Champagne chemically react if shaken together, creating an unpalatable chalky precipitate",
      "The lemon juice acids must be neutralized by ice water before coming into contact with wine sulfites",
      "Shaking Champagne releases too much pure nitrogen, which over-pressurizes cocktail glassware"
    ],
    correctIndex: 0,
    principle: "Pouring warm or unshaken citrus/sweet base into chilled sparkling wine triggers rapid nucleation, violently degassing the Champagne and yielding a warm, flat cocktail.",
    deepContext: "Named after the French 75mm field gun in WWI for its kick. Champagne serves as the sparkling, dry lengthener. Chilling and pre-diluting the gin-lemon-sugar sour base to -3°C ensures that when cold Champagne (approx. 3-4°C) is layered in, there is zero thermal shock, preserving tiny, persistent CO2 bubbles.",
    spec: "1.0 oz London Dry Gin (or Cognac) • 0.5 oz Fresh Lemon Juice • 0.5 oz Simple Syrup • Hard shake with ice • Fine strain into chilled Champagne flute • Top with 2.5-3.0 oz Brut Champagne • Lemon ribbon express",
    hint: "Think about how temperature differences and lack of pre-chilling impact carbonation when pouring fizzy wine."
  },
  {
    id: "ticket-29-barrel-aging",
    title: "Barrel-Aged Cocktails: Lignin, Lactones & Oxidation",
    category: "Technique & Texture",
    difficulty: 3,
    question: "During a 6-week barrel aging cycle of a pre-batched Negroni in a small charred new American oak cask (5 Liters), what complex physical and chemical transformations take place?",
    answers: [
      "Alcohol proof climbs from 24% ABV to over 65% ABV through atmospheric condensation",
      "Micro-oxygenation through oak staves softens spirit harshness; alcohol extracts wood vanillin (from lignin), coconut lactones, and wood tannins while vermouth esters subtly oxidize",
      "Charcoal eliminates all bitter Campari flavor compounds, rendering the Negroni crystal clear",
      "The oak staves absorb all water, concentrating the cocktail into a thick liqueur"
    ],
    correctIndex: 1,
    principle: "Wood aging facilitates additive extraction (vanillin, oak lactones), subtractive adsorption (charcoal filtering), and oxidative maturation via semi-permeable wood pores.",
    deepContext: "Popularized by Jeffrey Morgenthaler in 2010. Small casks (3-5L) have a massive surface-area-to-volume ratio compared to 200L commercial barrels. In just 4-6 weeks, the porous wood allows controlled micro-oxidation that melds the pungent botanicals of vermouth and Campari, rounding edges and infusing sweet oak tannins.",
    spec: "5-Liter Charred American Oak Barrel • Fill with 5L batched Negroni (equal parts Gin, Campari, Sweet Vermouth) • Rotate weekly • Taste every 7 days • Empty and fine strain once tannin-vanilla balance peaks",
    hint: "Consider what wood extraction, stave porousness, and oxygen contact do to spirits over time."
  },
  {
    id: "ticket-30-oxidation-kinetics",
    title: "Aromatized Wine Oxidation: Vermouth Degradation",
    category: "Sensory & Diagnosis",
    difficulty: 1,
    question: "A guest orders a Manhattan, takes one sip, and complains that it tastes like 'stale cardboard, cooked vinegar, and stewed prunes.' What is the operational failure?",
    answers: [
      "The bartender used sweet vermouth that had been left uncapped at room temperature on the back bar for two months, allowing ethanol to oxidize into acetaldehyde and terpenes to degrade",
      "The bartender stirred the Manhattan with ice cubes that were frozen for more than 48 hours",
      "The rye whiskey was shaken instead of stirred, aerating the rye grain into vinegar",
      "Angostura bitters curdled the maraschino cherry juice at the bottom of the glass"
    ],
    correctIndex: 0,
    principle: "Fortified aromatized wines contain delicate wine bases that rapidly oxidize into acetaldehyde, acetic acid, and off-flavored oxidized quinones when exposed to warm air.",
    deepContext: "Vermouth is wine fortified with neutral spirit and macerated with botanicals (artemisia, gentian, citrus). Because its ABV is only 15-18%, it cannot self-preserve like 40% spirits. Once uncapped, air rapidly degrades monoterpenes and oxidizes wine polyphenols. Open vermouth must be vacuum-sealed, kept refrigerated, and discarded after 3-4 weeks.",
    spec: "Manhattan: 2.0 oz Rye Whiskey • 1.0 oz Fresh, Refrigerated Sweet Vermouth • 2 dashes Angostura Bitters • Stir over dense ice 30s to -3°C • Chilled coupe • Brandied cherry",
    hint: "Fortified wine is still wine: what happens to an opened bottle of wine left warm on a back bar shelf?"
  }
];

  /* ==========================================================================
     2. DATA VALIDATION SUBSYSTEM
     ========================================================================== */
  function validateChallenges(dataset) {
    if (!Array.isArray(dataset) || dataset.length !== 5) {
      console.error("BarKnowledge: Expected exactly 5 playable challenges, found", dataset ? dataset.length : 0);
      return false;
    }
    const seenIds = new Set();
    for (let i = 0; i < dataset.length; i++) {
      const item = dataset[i];
      if (!item.id || typeof item.id !== "string" || seenIds.has(item.id)) return false;
      seenIds.add(item.id);
      if (!item.question || typeof item.question !== "string") return false;
      if (!Array.isArray(item.answers) || item.answers.length !== 4) return false;
      if (typeof item.correctIndex !== "number" || item.correctIndex < 0 || item.correctIndex > 3) return false;
      if (!item.principle || !item.spec || !item.hint) return false;
    }
    return true;
  }

  /* ==========================================================================
     3. AUDIO SYNTHESIS SYSTEM (WEB AUDIO API)
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
      const notes = [523.25, 659.25, 783.99, 1046.5];

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
  const STORAGE_KEY = "BAR_KNOWLEDGE_CAREER_V3";

  class StorageManager {
    static load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return this.getDefaults();
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") return this.getDefaults();
        return Object.assign(this.getDefaults(), parsed);
      } catch (e) {
        return this.getDefaults();
      }
    }

    static save(data) {
      try {
        data.version = 3;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        // Fallback safely if storage is disabled or restricted
      }
    }

    static getDefaults() {
      return {
        version: 3,
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
      this.isContentValid = validateChallenges(CHALLENGES);
      this.challenges = [...CHALLENGES];

      this.audio = new BarAudioSystem();
      this.profile = StorageManager.load();
      this.audio.enabled = !!this.profile.soundEnabled;

      // Navigation State
      this.currentScreen = "lobby";
      this.previousScreen = "lobby";

      // Active Shift State
      this.isShiftActive = false;
      this.activeMode = "standard";
      this.currentTicketIndex = 0;
      this.displayedCorrectIndex = 0;
      this.ticketsFacedInShift = 0;
      this.shiftScore = 0;
      this.shiftCorrect = 0;
      this.shiftStreak = 0;
      this.shiftPeakStreak = 0;
      this.shiftStartTime = 0;
      this.ticketStartTime = 0;
      this.responseTimes = [];
      this.categoryPerformance = {};

      // Ticket State
      this.currentConfidence = "guess";
      this.hasAnswered = false;
      this.timerInterval = null;
      this.timeRemaining = 16;
      this.lifelineSpoons = 1;
      this.lifelineNotes = 1;
      this.isMasterStrikeOut = false;

      this.cacheElements();
      this.bindEvents();
      this.renderProfile();
      this.updateHeaderUI();
      this.renderCodex();
    }

    cacheElements() {
      this.screens = {
        lobby: document.getElementById("screen-lobby"),
        game: document.getElementById("screen-game"),
        results: document.getElementById("screen-results"),
        codex: document.getElementById("screen-codex"),
        profile: document.getElementById("screen-profile")
      };

      this.streakCounter = document.getElementById("streak-counter");
      this.scoreCounter = document.getElementById("score-counter");
      this.rankText = document.getElementById("rank-text");
      this.soundIconOn = document.getElementById("sound-icon-on");
      this.soundIconOff = document.getElementById("sound-icon-off");
      this.btnToggleSound = document.getElementById("btn-toggle-sound");

      this.btnAbandonShift = document.getElementById("btn-abandon-shift");
      this.ticketTracker = document.getElementById("ticket-tracker");
      this.multiplierBadge = document.getElementById("multiplier-badge");
      this.timerDisplay = document.getElementById("timer-display");
      this.progressBarTrack = document.getElementById("progress-bar-track");
      this.progressFill = document.getElementById("progress-fill");
      this.categoryPill = document.getElementById("question-category");
      this.difficultyIndicator = document.getElementById("question-difficulty");
      this.ticketStamp = document.getElementById("ticket-stamp");
      this.questionPrompt = document.getElementById("question-prompt");
      this.confButtons = document.querySelectorAll(".conf-btn");
      this.ansButtons = document.querySelectorAll(".ans-btn");
      this.recipeHintBox = document.getElementById("recipe-hint-box");
      this.recipeHintText = document.getElementById("recipe-hint-text");

      this.btnLifelineSpoon = document.getElementById("btn-lifeline-spoon");
      this.btnLifelineNote = document.getElementById("btn-lifeline-note");
      this.spoonCount = document.getElementById("spoon-count");
      this.noteCount = document.getElementById("note-count");

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

      this.btnCodexBack = document.getElementById("btn-codex-back");
      this.codexCountBadge = document.getElementById("codex-count-badge");
      this.codexCardsGrid = document.getElementById("codex-cards-grid");
      this.codexSearchInput = document.getElementById("codex-search-input");
      this.codexFilters = document.querySelectorAll(".filter-tab");

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
      document.getElementById("btn-brand").addEventListener("click", () => {
        if (this.isShiftActive) {
          if (window.confirm("Step away from the current service ticket and return to Lobby? Progress in this shift will reset.")) {
            this.abandonShift();
          }
        } else {
          this.showScreen("lobby");
        }
      });

      this.btnAbandonShift.addEventListener("click", () => {
        if (window.confirm("Abandon current shift and return to Bar Lobby?")) {
          this.abandonShift();
        }
      });

      document.getElementById("btn-open-profile").addEventListener("click", () => {
        if (this.isShiftActive) {
          if (!window.confirm("Review Career Log? Current active ticket shift will be abandoned.")) {
            return;
          }
          this.abandonShift();
        }
        this.renderProfile();
        this.showScreen("profile");
      });

      document.getElementById("btn-nav-codex").addEventListener("click", () => {
        this.previousScreen = "lobby";
        this.btnCodexBack.textContent = "← Back to Lobby";
        this.showScreen("codex");
      });

      document.getElementById("btn-nav-diagnosis").addEventListener("click", () => {
        this.previousScreen = "lobby";
        this.btnCodexBack.textContent = "← Back to Lobby";
        this.showScreen("codex");
        this.filterCodex("Sensory & Diagnosis");
      });

      this.btnCodexBack.addEventListener("click", () => {
        this.showScreen(this.previousScreen || "lobby");
      });

      document.getElementById("btn-profile-back").addEventListener("click", () => this.showScreen("lobby"));
      document.getElementById("btn-results-home").addEventListener("click", () => this.showScreen("lobby"));
      
      document.getElementById("btn-results-codex").addEventListener("click", () => {
        this.previousScreen = "results";
        this.btnCodexBack.textContent = "← Back to Debrief";
        this.showScreen("codex");
      });

      this.btnToggleSound.addEventListener("click", () => this.toggleSound());

      document.querySelectorAll(".mode-card").forEach((btn) => {
        btn.addEventListener("click", () => {
          const mode = btn.getAttribute("data-mode");
          this.startShift(mode);
        });
      });

      this.ansButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-index"), 10);
          this.handleAnswerSelection(idx);
        });
      });

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

      this.btnLifelineSpoon.addEventListener("click", () => this.useLifelineSpoon());
      this.btnLifelineNote.addEventListener("click", () => this.useLifelineNote());

      this.btnNextQuestion.addEventListener("click", () => this.advanceToNextTicket());
      this.btnToggleDeep.addEventListener("click", () => {
        this.feedbackDetailBox.classList.toggle("is-hidden");
        this.btnToggleDeep.textContent = this.feedbackDetailBox.classList.contains("is-hidden")
          ? "Read Deep Context"
          : "Hide Context";
      });

      document.getElementById("btn-play-again").addEventListener("click", () => this.startShift(this.activeMode));

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

      document.getElementById("btn-reset-data").addEventListener("click", () => {
        if (window.confirm("Reset all bartender certification records, XP, and shift statistics?")) {
          localStorage.removeItem(STORAGE_KEY);
          this.profile = StorageManager.getDefaults();
          this.audio.enabled = true;
          this.renderProfile();
          this.updateHeaderUI();
          this.renderCodex();
          this.showScreen("lobby");
          this.showToast("Career log wiped. Station reset to Apprentice Barback.");
        }
      });

      window.addEventListener("keydown", (e) => {
        if (this.screens.game.classList.contains("is-hidden")) return;

        if (!this.hasAnswered) {
          if (e.key === "1") this.handleAnswerSelection(0);
          else if (e.key === "2") this.handleAnswerSelection(1);
          else if (e.key === "3") this.handleAnswerSelection(2);
          else if (e.key === "4") this.handleAnswerSelection(3);
        } else {
          if (e.key === "Enter" || e.key === " ") {
            if (e.target && e.target.tagName !== "BUTTON") {
              e.preventDefault();
              this.advanceToNextTicket();
            }
          }
        }
      });
    }

    showScreen(screenName) {
      clearInterval(this.timerInterval);
      this.currentScreen = screenName;
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

    abandonShift() {
      clearInterval(this.timerInterval);
      this.isShiftActive = false;
      this.showScreen("lobby");
      this.showToast("Shift abandoned. Station reset.");
    }

    /* ==========================================================================
       7. SHIFT GAMEPLAY FLOW
       ========================================================================== */
    startShift(mode = "standard") {
      this.audio.init();
      this.isShiftActive = true;
      this.activeMode = mode;
      this.currentTicketIndex = 0;
      this.ticketsFacedInShift = 0;
      this.shiftScore = 0;
      this.shiftCorrect = 0;
      this.shiftStreak = 0;
      this.shiftPeakStreak = 0;
      this.responseTimes = [];
      this.categoryPerformance = {};
      this.shiftStartTime = Date.now();
      this.isMasterStrikeOut = false;

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
      this.currentConfidence = "guess";

      const ticket = this.challenges[index];
      if (!ticket) {
        this.finishShift();
        return;
      }

      this.ticketsFacedInShift = index + 1;

      if (!this.categoryPerformance[ticket.category]) {
        this.categoryPerformance[ticket.category] = { correct: 0, total: 0 };
      }
      this.categoryPerformance[ticket.category].total++;

      this.ticketTracker.textContent = `Ticket ${index + 1} of 5`;
      this.categoryPill.textContent = ticket.category;
      this.difficultyIndicator.textContent = `LEVEL ${ticket.difficulty}`;
      this.ticketStamp.textContent = `TICKET #${101 + index}`;
      this.questionPrompt.textContent = ticket.question;

      const shuffledAnswers = ticket.answers.map((answer, answerIndex) => ({
        answer,
        originalIndex: answerIndex
      }));
      for (let answerIndex = shuffledAnswers.length - 1; answerIndex > 0; answerIndex -= 1) {
        const swapIndex = Math.floor(Math.random() * (answerIndex + 1));
        [shuffledAnswers[answerIndex], shuffledAnswers[swapIndex]] = [
          shuffledAnswers[swapIndex],
          shuffledAnswers[answerIndex]
        ];
      }
      this.displayedCorrectIndex = shuffledAnswers.findIndex(
        ({ originalIndex }) => originalIndex === ticket.correctIndex
      );

      const progressPercent = ((index + 1) / 5) * 100;
      this.progressFill.style.width = `${progressPercent}%`;
      this.progressBarTrack.setAttribute("aria-valuenow", progressPercent);

      this.recipeHintBox.classList.add("is-hidden");
      this.recipeHintText.textContent = "";

      this.updateStreakBadge();

      this.ansButtons.forEach((btn, i) => {
        btn.classList.remove("is-correct", "is-incorrect", "is-dimmed");
        btn.disabled = false;
        btn.querySelector(".ans-text").textContent = shuffledAnswers[i]?.answer || "";
      });

      this.confButtons.forEach((b) => {
        const isGuess = b.getAttribute("data-conf") === "guess";
        b.classList.toggle("active", isGuess);
        b.setAttribute("aria-checked", isGuess ? "true" : "false");
      });

      this.feedbackDrawer.classList.add("is-hidden");
      this.feedbackDetailBox.classList.add("is-hidden");
      this.btnToggleDeep.textContent = "Read Deep Context";
      this.btnNextQuestion.textContent = "Next Ticket →";
      this.btnNextQuestion.disabled = false;

      this.btnLifelineSpoon.disabled = this.lifelineSpoons <= 0;
      this.btnLifelineNote.disabled = this.lifelineNotes <= 0;

      let seconds = 16;
      if (this.activeMode === "rush") {
        seconds = this.profile.relaxedTimer ? 12 : 8;
      } else if (this.profile.relaxedTimer) {
        seconds = 25;
      }

      this.timeRemaining = seconds;
      this.timerDisplay.textContent = `${this.timeRemaining}s`;
      this.timerDisplay.style.color = "var(--warm-gold-bright)";

      this.timerInterval = setInterval(() => {
        this.timeRemaining--;
        this.timerDisplay.textContent = `${this.timeRemaining}s`;

        if (this.timeRemaining <= 3 && this.timeRemaining > 0) {
          this.audio.playTick();
          this.timerDisplay.style.color = "#f85149";
        } else {
          this.timerDisplay.style.color = "var(--warm-gold-bright)";
        }

        if (this.timeRemaining <= 0) {
          clearInterval(this.timerInterval);
          this.handleAnswerSelection(-1);
        }
      }, 1000);
    }

    updateStreakBadge() {
      let multiplier = 1.0;
      if (this.shiftStreak >= 2) multiplier = 1.5;
      if (this.shiftStreak >= 4) multiplier = 2.0;

      this.multiplierBadge.textContent = `${multiplier.toFixed(1)}x FLOW`;
      this.streakCounter.textContent = this.shiftStreak;
    }

    handleAnswerSelection(selectedIndex) {
      if (this.hasAnswered) return;
      if (selectedIndex >= 0 && this.ansButtons[selectedIndex].disabled) return;

      this.hasAnswered = true;
      clearInterval(this.timerInterval);

      const responseDuration = Math.max(0.5, (Date.now() - this.ticketStartTime) / 1000);
      this.responseTimes.push(responseDuration);

      const ticket = this.challenges[this.currentTicketIndex];
      const isCorrect = selectedIndex === this.displayedCorrectIndex;

      this.ansButtons.forEach((btn) => (btn.disabled = true));

      let baseBonus = 100;
      if (this.currentConfidence === "solid") baseBonus = 200;
      if (this.currentConfidence === "certain") baseBonus = 350;

      let flowMultiplier = 1.0;
      if (this.shiftStreak >= 2) flowMultiplier = 1.5;
      if (this.shiftStreak >= 4) flowMultiplier = 2.0;

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

        this.ansButtons[selectedIndex].classList.add("is-correct");

        this.feedbackStatus.className = "feedback-status correct";
        this.feedbackIcon.textContent = "✓";
        this.feedbackTitle.textContent = "Spot On, Barkeep!";
        this.feedbackPoints.textContent = `+${earnedPoints} XP`;

        if (this.profile.weakCategories[ticket.category]) {
          this.profile.weakCategories[ticket.category]--;
          if (this.profile.weakCategories[ticket.category] <= 0) {
            delete this.profile.weakCategories[ticket.category];
          }
        }
      } else {
        this.audio.playThud();
        this.shiftStreak = 0;

        if (this.currentConfidence === "certain") {
          this.shiftScore = Math.max(0, this.shiftScore - 100);
        }

        if (selectedIndex >= 0) {
          this.ansButtons[selectedIndex].classList.add("is-incorrect");
        }
        this.ansButtons[this.displayedCorrectIndex].classList.add("is-correct");

        this.feedbackStatus.className = "feedback-status incorrect";
        this.feedbackIcon.textContent = "✗";
        this.feedbackTitle.textContent = selectedIndex === -1 ? "Service Timeout!" : "Order Off-Spec";
        this.feedbackPoints.textContent = "+0 XP";

        if (!this.profile.weakCategories[ticket.category]) {
          this.profile.weakCategories[ticket.category] = 0;
        }
        this.profile.weakCategories[ticket.category]++;

        if (this.activeMode === "master") {
          this.isMasterStrikeOut = true;
          this.btnNextQuestion.textContent = "View Exam Debrief →";
        }
      }

      this.profile.ticketsAnswered++;
      if (isCorrect) this.profile.ticketsCorrect++;
      if (this.shiftPeakStreak > this.profile.bestStreak) {
        this.profile.bestStreak = this.shiftPeakStreak;
      }

      this.updateStreakBadge();
      this.updateHeaderUI();

      this.feedbackPrinciple.innerHTML = `<strong>Bartender's Principle:</strong> ${ticket.principle}`;
      this.feedbackDetailText.textContent = ticket.deepContext;
      this.feedbackDrawer.classList.remove("is-hidden");

      StorageManager.save(this.profile);
    }

    advanceToNextTicket() {
      if (!this.hasAnswered) return;

      if (this.isMasterStrikeOut) {
        this.showToast("Exam Terminated: Zero-tolerance off-spec ticket.");
        this.finishShift();
        return;
      }

      this.currentTicketIndex++;
      if (this.currentTicketIndex >= this.challenges.length) {
        this.finishShift();
      } else {
        this.loadTicket(this.currentTicketIndex);
      }
    }

    /* ==========================================================================
       8. LIFELINES
       ========================================================================== */
    useLifelineSpoon() {
      if (this.hasAnswered || this.lifelineSpoons <= 0) return;
      this.lifelineSpoons--;
      this.spoonCount.textContent = "0";
      this.btnLifelineSpoon.disabled = true;
      this.audio.playClink();

      const incorrectIndices = [0, 1, 2, 3].filter((i) => i !== this.displayedCorrectIndex);
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
      this.isShiftActive = false;
      this.profile.shiftsCompleted++;
      StorageManager.save(this.profile);

      const effectiveTotal = Math.max(1, this.ticketsFacedInShift);
      const accuracy = Math.round((this.shiftCorrect / effectiveTotal) * 100);

      const avgSpeed = this.responseTimes.length > 0
        ? (this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length).toFixed(1)
        : "0.0";

      if (this.isMasterStrikeOut) {
        this.resultsStamp.textContent = "STRIKE-OUT DEBRIEF";
        this.resultsHeadline.textContent = "Station Exam Concluded";
        this.resultsSub.textContent = `Off-spec call on ticket #${100 + this.ticketsFacedInShift}. Master certification requires 100% precision.`;
      } else if (accuracy >= 80) {
        this.resultsStamp.textContent = "SERVICE EXCELLENCE";
        this.resultsHeadline.textContent = "Clean Ticket Board!";
        this.resultsSub.textContent = "Flawless craft knowledge, pristine dilution control, and crisp station pacing.";
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
      this.streakCounter.textContent = this.shiftStreak;
      this.updateSoundIcons();
    }

    /* ==========================================================================
       10. CODEX & RECIPE VAULT
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

      if (filtered.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-state-card";
        empty.textContent = "No matching bar formulas found for current filter or search criteria.";
        this.codexCardsGrid.appendChild(empty);
        return;
      }

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

      const summaryEl = document.getElementById("codex-unlocked-summary");
      if (summaryEl) {
        summaryEl.textContent = `${this.challenges.length} Curated Craft Formulas`;
      }
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

      this.profTotalShifts.textContent = this.profile.shiftsCompleted.toLocaleString();
      this.profTotalAnswers.textContent = this.profile.ticketsAnswered.toLocaleString();

      const accuracy = this.profile.ticketsAnswered > 0
        ? Math.round((this.profile.ticketsCorrect / this.profile.ticketsAnswered) * 100)
        : 0;
      this.profLifetimeAcc.textContent = `${accuracy}%`;
      this.profBestStreak.textContent = this.profile.bestStreak;

      this.checkRelaxedTimer.checked = !!this.profile.relaxedTimer;
      this.checkSoundToggle.checked = !!this.profile.soundEnabled;

      this.weakSpotsList.innerHTML = "";
      const weakKeys = Object.keys(this.profile.weakCategories).filter(
        (k) => this.profile.weakCategories[k] > 0
      );

      if (weakKeys.length === 0) {
        this.weakSpotsList.innerHTML = `
          <div class="empty-state-card">Station clean. Zero recurrent knowledge blindspots logged.</div>
        `;
      } else {
        weakKeys.forEach((cat) => {
          const item = document.createElement("div");
          item.className = "weak-item";
          item.innerHTML = `
            <span>${cat}</span>
            <span style="color: var(--burnt-orange-bright); font-weight: 900;">${this.profile.weakCategories[cat]} OFF-SPEC</span>
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