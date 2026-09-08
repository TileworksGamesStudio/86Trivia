/**
 * COCKTAIL DIGEST — CONTENT DATABASE
 * 
 * Data Architecture Contract:
 * - This file functions as the independent content store.
 * - New daily flights can be appended to the end of the `flights` array.
 * - No modifications to index.html, style.css, or script.js are required.
 * - Each question is verified against real historical specs, chemistry, and traditions
 *   drawn from the 32-category master curriculum.
 */

window.COCKTAIL_PUZZLES = {
  config: {
    // Canonical UTC epoch start date.
    // Day 1 corresponds to this calendar day: Today has Puzzle 1, Vault is empty.
    epochDate: "2026-09-08T00:00:00Z"
  },

  flights: [
    /* ==========================================================================
       FLIGHT 1 (DAY 1): FOUNDATIONS, TECHNIQUE & BOTANICALS
       ========================================================================== */
    {
      id: "flight-001",
      dayNumber: 1,
      title: "Foundations & The Shaker Tin",
      theme: "Classic architecture, acid balance, and monastery botanicals",
      questions: [
        {
          id: "q101",
          category: "Level 1 — Classic Cocktails",
          difficulty: "Beginner",
          question: "What is the traditional specification ratio of rye or bourbon to sweet vermouth in a classic Manhattan?",
          options: [
            "1 : 1 (Equal parts)",
            "2 : 1 (Two parts whiskey to one part vermouth)",
            "4 : 1 (Four parts whiskey to one part vermouth)",
            "3 : 1 (Three parts whiskey to one part vermouth)"
          ],
          correctIndex: 1,
          explanation: "The historic standard for a classic Manhattan is 2:1 (traditionally 2 oz rye or bourbon to 1 oz sweet vermouth), seasoned with 2 dashes of Angostura bitters and garnished with a brandied cherry."
        },
        {
          id: "q102",
          category: "Level 1 — Citrus & Acid",
          difficulty: "Easy",
          question: "Why do classic bar specs treat fresh Persian lime juice differently from fresh lemon juice?",
          options: [
            "Limes contain less total acid and require double the volume",
            "Limes contain higher proportions of malic acid, giving a sharper, greener bite",
            "Lemons have zero sugar and require triple the simple syrup",
            "Limes cannot be strained through a Hawthorne coil"
          ],
          correctIndex: 1,
          explanation: "While both fruits average roughly 5-6% total acid, limes contain significantly more malic acid alongside citric acid. This imparts the crisp, sharper edge essential to Daiquiris and Gimlets, whereas lemon has a predominantly citric profile."
        },
        {
          id: "q103",
          category: "Level 3 — Shaking, Stirring & Building",
          difficulty: "Medium",
          question: "According to standard bar thermodynamics, what is the primary physical reason cocktails with citrus or dairy are shaken rather than stirred?",
          options: [
            "Shaking raises the temperature faster than stirring",
            "Shaking introduces micro-aeration, emulsion, and rapid texture changes",
            "Citrus oil degrades if touched by a bar spoon",
            "Stirring causes citrus juice to become opaque"
          ],
          correctIndex: 1,
          explanation: "Shaking violently forces air into the liquid, producing tiny micro-bubbles that create velvety froth, aerate citrus solids, and emulsify syrups or dairy. Spirit-forward drinks (like the Martini) are stirred to preserve crystal clarity and a silky mouthfeel."
        },
        {
          id: "q104",
          category: "Level 4 — Distilling",
          difficulty: "Hard",
          question: "How does distillation in a traditional copper pot still differ chemically from continuous column (Coffey) distillation?",
          options: [
            "Pot stills strip all congeners to produce completely neutral 96% ABV spirits",
            "Pot stills retain heavier aromatic congeners and esters, yielding fuller body",
            "Column stills can only operate using malted barley wash",
            "Pot stills remove all alcohol and leave pure water"
          ],
          correctIndex: 1,
          explanation: "Pot stills distill in batches at lower rectifying efficiency, allowing desirable flavor-packed congeners (esters, aldehydes, and higher alcohols) to carry over into the distillate. Column stills produce near-pure ethanol by continuous reflux."
        },
        {
          id: "q105",
          category: "Level 5 — Classic Brands & Deep Ingredients",
          difficulty: "Expert",
          question: "Which world-famous herbal liqueur is crafted from a secret 1605 manuscript of 130 plants, known only to two Carthusian monks at any given time?",
          options: [
            "Bénédictine D.O.M.",
            "Green Chartreuse",
            "Strega",
            "Drambuie"
          ],
          correctIndex: 1,
          explanation: "Green Chartreuse has been produced by the Carthusian monks in France since 1737 using a 1605 manuscript recipe. To this day, only two monks at the monastery know the exact botanical identity and maceration sequence."
        }
      ]
    },

    /* ==========================================================================
       FLIGHT 2 (DAY 2): TROPICAL CRAFT, SUGARCANE & ICE SCIENCE
       ========================================================================== */
    {
      id: "flight-002",
      dayNumber: 2,
      title: "Tropical Rhythms & Cane Spirits",
      theme: "Sugarcane agriculture, tiki lore, and rapid dilution physics",
      questions: [
        {
          id: "q201",
          category: "Level 1 — Core Spirits",
          difficulty: "Easy",
          question: "What agricultural base distinguishes Martinique Rhum Agricole from standard industrial rum?",
          options: [
            "Blackstrap industrial molasses",
            "Freshly crushed sugarcane juice (vesou)",
            "Fermented sorghum grain",
            "Refined beet sugar syrup"
          ],
          correctIndex: 1,
          explanation: "Rhum Agricole is pressed and distilled directly from fresh raw sugarcane juice (vesou) under strict French AOC guidelines, resulting in grassy, vegetal, and terroir-expressive aromas absent from molasses-based rums."
        },
        {
          id: "q202",
          category: "Level 2 — Liqueurs & Cordials",
          difficulty: "Medium",
          question: "The bitter Laraha orange peel, essential to authentic Curaçao liqueurs, developed as an evolutionary mutation of which fruit?",
          options: [
            "Seville Valencia orange",
            "Bergamot lemon",
            "Key lime",
            "Ruby red grapefruit"
          ],
          correctIndex: 0,
          explanation: "Spanish explorers planted sweet Valencia oranges on the arid island of Curaçao in 1527. The sun and poor soil stunted the fruit into the bitter, inedible Laraha, whose sun-dried peels yielded exceptionally fragrant essential oils."
        },
        {
          id: "q203",
          category: "Level 3 — Ice & Dilution",
          difficulty: "Medium",
          question: "Why do heavily spiced tiki punches and swizzles call specifically for crushed or pebble ice?",
          options: [
            "Crushed ice does not melt at all in high alcohol",
            "Massive surface area generates rapid initial dilution and frost to temper high proofs",
            "Crushed ice absorbs rum congeners and reduces bitterness",
            "Tiki mugs crack when touched by large ice cubes"
          ],
          correctIndex: 1,
          explanation: "Crushed ice exposes an enormous surface area to the liquid. This produces an instant flash-chill and rapid early dilution, quickly balancing potent multi-rum blends, rich spices, and syrups to their target equilibrium."
        },
        {
          id: "q204",
          category: "Level 4 — Tiki & Tropical Cocktails",
          difficulty: "Hard",
          question: "In vintage Polynesian cocktail specifications, what are the two core ingredients of Don the Beachcomber's secret 'Don's Mix'?",
          options: [
            "Pineapple juice and coconut cream",
            "Fresh white grapefruit juice and cinnamon syrup (2:1 ratio)",
            "Lime juice and falernum",
            "Passion fruit purée and pimento dram"
          ],
          correctIndex: 1,
          explanation: "Created by Donn Beach (Ernest Gantt) in the 1930s, Don's Mix #1 was a closely guarded proprietary blend of 2 parts fresh white grapefruit juice and 1 part rich cinnamon bark syrup, fundamental to the 1934 Zombie."
        },
        {
          id: "q205",
          category: "Level 5 — Advanced Cocktail Lore",
          difficulty: "Expert",
          question: "Why did Donn Beach enforce a strict limit of 'No more than two per customer' for his original 1934 Zombie?",
          options: [
            "The cocktail contained real absinthe, which was illegal in California",
            "It contained over 3.5 ounces of high-proof rums, including 151-proof Demerara",
            "Fresh white grapefruits were severely rationed during the Great Depression",
            "The proprietary mug was made of fragile hand-blown glass"
          ],
          correctIndex: 1,
          explanation: "The potent 1934 Zombie called for 1.5 oz gold Puerto Rican rum, 1.5 oz dark Jamaican rum, and 1 oz of 151-proof Lemon Hart Demerara rum. At over 3.5 oz of high-proof alcohol per glass, Beach enforced the rule to prevent catastrophic intoxication."
        }
      ]
    },

    /* ==========================================================================
       FLIGHT 3 (DAY 3): APERITIVI, BITTERS & FORGOTTEN GLASSWARE
       ========================================================================== */
    {
      id: "flight-003",
      dayNumber: 3,
      title: "Bitters, Botanical Vines & Glassware",
      theme: "The bitter apothecaries, vermouth roots, and Prohibition fixes",
      questions: [
        {
          id: "q301",
          category: "Level 1 — Bitters",
          difficulty: "Beginner",
          question: "Which iconic New Orleans bitters, celebrated for its anise aroma and bright pinkish-red hue, is mandatory in an authentic Sazerac?",
          options: [
            "Angostura Aromatic Bitters",
            "Peychaud's Bitters",
            "Boker's Bitters",
            "Fee Brothers Plum Bitters"
          ],
          correctIndex: 1,
          explanation: "Formulated in the 1830s by Haitian-born apothecary Antoine Amédée Peychaud in New Orleans' French Quarter, Peychaud's Bitters delivers gentle gentian bitterness backed by candied anise and cherry notes."
        },
        {
          id: "q302",
          category: "Level 2 — Vermouth & Fortified Wine",
          difficulty: "Medium",
          question: "What does the Piedmontese name of the fortified aperitif 'Punt e Mes' literally translate to?",
          options: [
            "Sweet and Strong",
            "Point and a Half (One point of sweetness, half a point of bitterness)",
            "Before the Meal",
            "Grape and Herb"
          ],
          correctIndex: 1,
          explanation: "According to Carpano legend, on April 19, 1870, a stockbroker ordered his sweet vermouth laced with half a dose of bitter quassia liqueur, calling out in local dialect 'Punt e Mes' (a point and a half)."
        },
        {
          id: "q303",
          category: "Level 2 — Aperitifs & Amari",
          difficulty: "Easy",
          question: "Which Italian amaro prominently features the botanical cynarin, extracted from artichoke leaves, known to sweeten the palate?",
          options: [
            "Averna",
            "Cynar",
            "Fernet-Branca",
            "Montenegro"
          ],
          correctIndex: 1,
          explanation: "Created in Venice in 1952, Cynar is infused with 13 herbs and plants, chief among them Cynara scolymus (artichoke leaves). Cynarin interacts with tongue receptors, temporarily accentuating perceived sweetness in subsequent sips."
        },
        {
          id: "q304",
          category: "Level 3 — Glassware",
          difficulty: "Medium",
          question: "The iconic stemmed 'Nick & Nora' glass owes its name to characters created by which American author in 'The Thin Man'?",
          options: [
            "Ernest Hemingway",
            "Dashiell Hammett",
            "F. Scott Fitzgerald",
            "Raymond Chandler"
          ],
          correctIndex: 1,
          explanation: "Dashiell Hammett's 1934 detective novel 'The Thin Man' introduced Nick and Nora Charles, famously portrayed by William Powell and Myrna Loy, who spent their investigations sipping Martinis from graceful 5-ounce rounded chalices."
        },
        {
          id: "q305",
          category: "Level 4 — Prohibition & Speakeasy Era",
          difficulty: "Hard",
          question: "Why did Prohibition-era speakeasies invent the 'Bee's Knees' cocktail combining gin, clover honey syrup, and lemon juice?",
          options: [
            "Sugar was taxed at 80% under federal anti-confectionery acts",
            "Pungent raw clover honey and acid masked the foul smell of poorly redistilled bathtub gin",
            "Honey was the only sweetener permitted by religious temperance societies",
            "Gin was legally required to contain honey to be labeled medicine"
          ],
          correctIndex: 1,
          explanation: "Illicit 'bathtub gin' was fabricated by adulterating industrial alcohol with glycerin and juniper oil. Speakeasy bartenders relied on the rich viscosity of raw honey syrup and sharp lemon acid to smother the industrial off-flavors."
        }
      ]
    },

    /* ==========================================================================
       FLIGHT 4 (DAY 4): TEXTURE, SCIENCE & SERVICE CRAFT
       ========================================================================== */
    {
      id: "flight-004",
      dayNumber: 4,
      title: "Texture, Emulsion & Fermentations",
      theme: "The science of foam, ancestral strainers, and milk washing",
      questions: [
        {
          id: "q401",
          category: "Level 1 — Cocktail Families",
          difficulty: "Easy",
          question: "The Margarita, Sidecar, and Cosmopolitan all belong to which historic 19th-century cocktail family?",
          options: [
            "The Julep family",
            "The Daisy family (Spirit, Citrus, and Orange Liqueur/Modifier)",
            "The Flip family",
            "The Scaffa family"
          ],
          correctIndex: 1,
          explanation: "The Daisy family arose in the mid-1800s as a sour sweetened with an orange liqueur (curaçao/triple sec) or fruit syrup. In fact, 'Margarita' is the literal Spanish translation of the word 'Daisy'."
        },
        {
          id: "q402",
          category: "Level 2 — Eggs, Dairy & Texture",
          difficulty: "Hard",
          question: "What legendary bar technique did Henry C. Ramos employ at his New Orleans saloon in 1888 to achieve the towering meringue head on his Gin Fizz?",
          options: [
            "Pressurized nitrous oxide siphons",
            "Employing a relay line of 35 'shaker boys' to shake each drink for 12 to 15 minutes",
            "Adding powdered agar-agar and xanthan gum",
            "Boiling the egg whites in orange flower water before shaking"
          ],
          correctIndex: 1,
          explanation: "Henry C. Ramos was meticulous about emulsification. At the Imperial Cabinet Saloon during Mardi Gras, he hired dozens of young men whose sole job was to pass shakers down a line for up to 15 minutes to generate stiff, cloud-like foam."
        },
        {
          id: "q403",
          category: "Level 3 — Straining & Fine Straining",
          difficulty: "Medium",
          question: "What was the original mid-19th-century purpose of the perforated Julep strainer before it became a standard bartender's tool?",
          options: [
            "To sift confectioner's sugar over brandy smashes",
            "A personal serving utensil served inside the drink to keep shaved ice away from gentlemen's mustaches",
            "To strain whole lemon seeds during tabletop juicing",
            "To measure precise half-ounce doses of fortified wine"
          ],
          correctIndex: 1,
          explanation: "Before the spring-loaded Hawthorne was patented in 1892, Julep strainers were served directly in ice-packed Juleps so patrons could sip cold liquid without ice cubes hitting their lips, facial hair, or dental work."
        },
        {
          id: "q404",
          category: "Level 4 — Brewing & Fermentation",
          difficulty: "Medium",
          question: "Which traditional Mexican fermented beverage is crafted from pineapple rinds, piloncillo raw cane sugar, and spices via wild ambient fermentation?",
          options: [
            "Pulque",
            "Tepache",
            "Chicha de Jora",
            "Tejuino"
          ],
          correctIndex: 1,
          explanation: "Tepache is an ancestral Mexican beverage made by fermenting pineapple skins and cores with unrefined piloncillo sugar, canela (cinnamon), and cloves. Natural yeast on the fruit rinds drives the light, effervescent fermentation."
        },
        {
          id: "q405",
          category: "Level 5 — Advanced Cocktail Lore",
          difficulty: "Expert",
          question: "In clarified English Milk Punch, what chemical mechanism clarifies the liquid and removes astringency?",
          options: [
            "Ethanol evaporates all color pigments upon boiling",
            "Casein proteins curdle in the presence of acid, binding tannins, polyphenols, and solids into removable curds",
            "Lactose reacts with citrus zest to bleach organic compounds",
            "Centrifugal gravity separates cream into whey without protein denaturing"
          ],
          correctIndex: 1,
          explanation: "When acidic cocktail punch is poured into warm milk, casein proteins unfold and curdle. As these curds form an internal filter bed, they trap astringent wood tannins, vegetable colorants, and particulates, leaving a crystal-clear, shelf-stable nectar."
        }
      ]
    },

    /* ==========================================================================
       FLIGHT 5 (DAY 5): BOTANICAL LAWS, SPECS & HERITAGE
       ========================================================================== */
    {
      id: "flight-005",
      dayNumber: 5,
      title: "Distillation Law & Ratios of the Masters",
      theme: "Brix density, equal-parts harmony, and vermouth pioneers",
      questions: [
        {
          id: "q501",
          category: "Level 1 — Sweeteners & Sugar",
          difficulty: "Beginner",
          question: "Why do modern cocktail bars frequently prefer rich simple syrup (2 parts sugar to 1 part water by weight) over standard 1:1 simple syrup?",
          options: [
            "Rich syrup has a lower boiling point and freezes into cubes easier",
            "Higher Brix density (~66° Brix) lowers water activity, granting months of shelf stability without extra dilution",
            "Standard 1:1 simple syrup crystallizes instantly at room temperature",
            "Rich syrup adds zero sweetness to drinks"
          ],
          correctIndex: 1,
          explanation: "A 2:1 rich syrup reaches approximately 66° Brix. At this concentration, osmotic pressure prevents bacterial and fungal proliferation, meaning it can be stored indefinitely without refrigeration while delivering dense texture."
        },
        {
          id: "q502",
          category: "Level 2 — Botanicals & Aromatics",
          difficulty: "Hard",
          question: "Under European Union and UK distillation law, what is strictly prohibited when producing a certified 'London Dry Gin'?",
          options: [
            "Using juniper berries as the dominant aromatic botanical",
            "Adding any artificial flavorings, colorants, or more than 0.1 grams per liter of sweetening after distillation",
            "Distilling in a traditional copper alembic pot still",
            "Bottling above 37.5% alcohol by volume"
          ],
          correctIndex: 1,
          explanation: "London Dry Gin is a technical production standard, not a geographic designation. All botanical flavors must be imparted solely during distillation in traditional stills. No flavorings or color can be added post-distillation, and sugar is capped at 0.1g/L."
        },
        {
          id: "q503",
          category: "Level 3 — Specs, Ratios & Balance",
          difficulty: "Medium",
          question: "What is the celebrated equal-parts recipe specification of the Prohibition-era classic 'The Last Word'?",
          options: [
            "Equal 3/4 oz parts of Gin, Green Chartreuse, Maraschino Liqueur, and Fresh Lime Juice",
            "Equal 1 oz parts of Bourbon, Campari, Sweet Vermouth, and Lemon Juice",
            "Equal 1 oz parts of Cognac, Cointreau, Lemon Juice, and Simple Syrup",
            "Equal 1.5 oz parts of Mezcal, Aperol, Yellow Chartreuse, and Lime Juice"
          ],
          correctIndex: 0,
          explanation: "First poured at the Detroit Athletic Club in the early 1920s and revived in 2004 by Murray Stenson at Seattle's Zig Zag Café, The Last Word is famous for its harmonious 1:1:1:1 ratio of Gin, Green Chartreuse, Maraschino, and Lime."
        },
        {
          id: "q504",
          category: "Level 4 — Regional Cocktail Traditions",
          difficulty: "Medium",
          question: "Which historic Lima establishment, founded by American expat Victor Morris in 1916, served as the birthplace of the modern Pisco Sour?",
          options: [
            "Bar La Florida (El Floridita)",
            "Morris' Bar",
            "Sloppy Joe's Saloon",
            "Harry's New York Bar"
          ],
          correctIndex: 1,
          explanation: "Victor Vaughen Morris opened Morris' Bar on Calle Boza in Lima, Peru in 1916. He created the Pisco Sour as an adaptation of the Whiskey Sour, later refined in the 1920s by bartender Mario Bruiget with egg white and Angostura."
        },
        {
          id: "q505",
          category: "Level 5 — Classic Brands, Producers & Lore",
          difficulty: "Expert",
          question: "Which Italian distiller is recognized as the father of modern commercial red vermouth, having formulated 'Antica Formula' in Turin in 1786?",
          options: [
            "Gaspare Campari",
            "Antonio Benedetto Carpano",
            "Alessandro Martini",
            "Bernardino Branca"
          ],
          correctIndex: 1,
          explanation: "In 1786, herbalist Antonio Benedetto Carpano infused local Piedmontese white Moscato wine with a blend of over 30 botanical herbs and spices, founding the commercial red vermouth category in his shop opposite Turin's Royal Palace."
        }
      ]
    }
  ]
};