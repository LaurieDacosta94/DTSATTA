export interface TriadPillars {
  tooling: {
    title: string;
    items: string[];
    description: string;
  };
  automation: {
    title: string;
    items: string[];
    description: string;
  };
  selfOrganization: {
    title: string;
    items: string[];
    description: string;
  };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface InteractiveLabConfig {
  type: 'air_temperature' | 'whitworth_plates' | 'dynamo_voltage' | 'vacuum_grid' | 'czochralski_pull' | 'binary_bootstrap' | 'pid_control' | 'systolic_array' | 'mcts_explorer' | 'self_replication';
  title: string;
  instructions: string;
  parameters: Record<string, number | string | boolean>;
  goalDescription: string;
}

export interface SubModule {
  id: string; // e.g. "1.1"
  stageNumber: number;
  subNumber: number;
  title: string;
  shortSummary: string;
  beginnerIntuition: string; // Plain English for absolute beginners
  whyDirtCantDoThisYet: string; // Bottleneck explanation
  triadPillars: TriadPillars;
  deepDiveMarkdown: string;
  commonMisconceptions: string[];
  interactiveLab: InteractiveLabConfig;
  quiz: QuizQuestion[];
  feynmanPrompt: string;
  keyArtifactUnlocked: string;
}

export interface Stage {
  stageNumber: number;
  title: string;
  subtitle: string;
  themeColor: string;
  accentBg: string;
  badge: string;
  summary: string;
  subModules: SubModule[];
}

export const CURRICULUM_STAGES: Stage[] = [
  {
    stageNumber: 1,
    title: "The Primitive Foundation",
    subtitle: "Stone, Fire & High Thermal Mastery",
    themeColor: "amber-500",
    accentBg: "from-amber-950/40 to-stone-900/60",
    badge: "Stage 01",
    summary: "Reconstructing the thermal and mineral bedrock of civilization: from clay nozzles and charcoal kilns to the first smelted structural metals.",
    subModules: [
      {
        id: "1.1",
        stageNumber: 1,
        subNumber: 1,
        title: "Fire, Charcoal & High Thermal Mastery",
        shortSummary: "How to concentrate raw heat from a modest camp flame (600°C) up to iron-melting cascades (1,300°C+).",
        beginnerIntuition: "Wood burns with a lot of moisture and smoke, maxing out around 600°C—too cold to melt metal. By baking wood in an oxygen-starved pit into pure charcoal, then blasting oxygen through heat-resistant clay nozzles (tuyères), you turn quiet embers into an inferno.",
        whyDirtCantDoThisYet: "Dirt contains iron oxides and silica, but without charcoal and blast nozzles, you can't reach the enthalpy required to break metal-oxygen bonds.",
        keyArtifactUnlocked: "Blast Tuyère & Charcoal Clamp",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Clay blast nozzles (tuyères) cured in low fires",
              "Hand-piston dual-action wooden bellows with leather flap-valves",
              "Charcoal pit clamps covered in insulating turf and damp soil"
            ],
            description: "Directing forced pressurized air into the hottest heart of the fire without melting the delivery pipe."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Gravity-fed furnace draft channels (chimney chimney stack effect)",
              "Passive thermal insulation via multi-layer earth mounds",
              "Thermal draft feedback loops that self-sustain airflow"
            ],
            description: "Harnessing natural buoyancy physics so the fire itself pulls fresh air upwards continuously."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Division of primitive labor (woodcutters, charcoal tenders, smelters)",
              "Communal resource pooling for multi-day continuous firings",
              "Raw material indexing (grading hardwood vs softwood char)"
            ],
            description: "No single person can gather wood, char it, pump bellows, and cast stone alone; team synchronization is required."
          }
        },
        deepDiveMarkdown: `### The Heat Cascade Principle

A regular campfire peaks around 500°C–650°C. That is not enough to smelt copper (~1,085°C) or reduce iron oxide (~1,250°C+). 

#### 1. Pyrolysis: Wood into Pure Carbon
When you heat wood without oxygen (in a dirt clamp), water and volatile gases escape as smoke. What remains is **charcoal**—almost 85-90% pure carbon with virtually zero water content.

#### 2. The Oxygen Multiplier (Tuyères)
Pure carbon burning in still air only burns as fast as ambient diffusion allows. By feeding compressed air through a heat-resistant clay pipe (a **tuyère**), every carbon atom is immediately paired with oxygen:
$$C + O_2 \\rightarrow CO_2 + \\text{High Enthalpy}$$
In the reducing zone, carbon monoxide forms:
$$CO_2 + C \\rightarrow 2CO$$
This hot carbon monoxide gas strips oxygen from iron ore ($Fe_2O_3$), leaving pure molten metallic iron bloom!`,
        commonMisconceptions: [
          "Misconception: Bigger campfires melt iron. (Reality: Fire volume does not equal fire temperature; you need thermal density and forced oxygen).",
          "Misconception: You can use metal pipes to blow air into primitive furnaces. (Reality: The metal pipe melts! You must use ceramic clay tuyères first)."
        ],
        interactiveLab: {
          type: 'air_temperature',
          title: "Furnace Airflow & Temperature Simulator",
          instructions: "Balance the Bellows Pumping Rate and Insulation Thickness to reach the 1,250°C Iron Smelting Threshold without cracking the tuyère.",
          parameters: { bellowsRate: 35, insulationLayers: 2, fuelType: 'charcoal' },
          goalDescription: "Reach and stabilize furnace temperature above 1,250°C for 5 cycles.",
        },
        quiz: [
          {
            question: "Why can't raw dry wood alone reach the temperature needed to smelt iron, even in large quantities?",
            options: [
              "Wood has too much nitrogen in its fibers",
              "Wood contains moisture and volatile compounds that absorb heat during evaporation",
              "Wood cannot burn when air is blown into it",
              "Iron only reacts in the dark"
            ],
            answerIndex: 1,
            explanation: "Raw wood expels moisture and volatile resins as it burns, which absorb immense thermal energy and dilute the reaction zone. Pyrolyzed charcoal removes these heat sinks."
          },
          {
            question: "What is the primary physical function of a ceramic tuyère?",
            options: [
              "To store charcoal fuel for later usage",
              "To safely inject pressurized oxygen into the core of a furnace without melting",
              "To measure the weight of melted iron",
              "To act as a chimney for soot"
            ],
            answerIndex: 1,
            explanation: "Tuyères are ceramic blast nozzles made from refractory clay that survive extreme furnace temperatures while directing blast air from bellows directly into the fuel bed."
          }
        ],
        feynmanPrompt: "Explain to a 10-year-old why a camp stove doesn't melt iron ore, but a clay chimney with charcoal and bellows does."
      },
      {
        id: "1.2",
        stageNumber: 1,
        subNumber: 2,
        title: "Earth, Ceramics & Chemical Vessels",
        shortSummary: "Transforming dirt into refractory crucibles, firebricks, and acid-resistant chemical glassware precursors.",
        beginnerIntuition: "To hold molten metal or corrosive chemicals, your pots can't melt, shatter, or dissolve. By washing river clays, mixing them with graphite flakes and sand (temper), and firing them hot, you invent thermal armor.",
        whyDirtCantDoThisYet: "Raw clay shrinks and cracks violently when heated. You must separate coarse silt from ultra-fine plate-like clay minerals and add thermal shock retardants.",
        keyArtifactUnlocked: "Graphite-Clay Crucibles & Refractory Firebrick",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Clay washing settling troughs for hydraulic levigation",
              "Graphite-clay crucibles capable of withstanding 1,400°C",
              "High-alumina refractory firebricks for furnace lining"
            ],
            description: "Vessels that remain physically rigid when metals liquefy inside them."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Gravity-fed settling basins for progressive clay particle sorting",
              "Water-drop timer mechanisms for consistent drying intervals",
              "Passive evaporative damp chambers to prevent cracking"
            ],
            description: "Using gravity and water flow to automatically sort fine silicate particles from gravel."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Standardization of ceramic vessel sizes and volume markings",
              "Hazard labeling for volatile corrosive concoctions",
              "Shared pit firing communal rotations"
            ],
            description: "Standard containers allow recipes, chemistry experiments, and metallurgy charges to be repeatable across craftspeople."
          }
        },
        deepDiveMarkdown: `### The Metallurgy Crucible Bottleneck
If you pour molten bronze or iron into a regular stone pot, water pockets trapped in the rock flash to steam and the stone violently explodes. Ordinary pottery softens into glass and collapses at 1,000°C.

#### The Alchemy of Refractory Clays:
1. **Kaolinite & Alumina ($Al_2O_3 \\cdot 2SiO_2 \\cdot 2H_2O$):** Gives structural backbone at high temperature.
2. **Graphite Grog:** Carbon flakes allow rapid heat transfer across the vessel wall while absorbing mechanical shock so the pot won't crack when cold metal is added.
3. **Hydraulic Levigation:** Mixing raw clay with water in terraced pools lets heavy gravel sink to the bottom of pool 1, while colloidal clay floats over the weir into pool 2.`,
        commonMisconceptions: [
          "Misconception: You can carve crucibles out of granite or river rocks. (Trapped moisture will shatter them into lethal shrapnel).",
          "Misconception: Pure fine clay is best. (Pure clay shrinks up to 15% and cracks during firing; grog/temper is mandatory)."
        ],
        interactiveLab: {
          type: 'air_temperature',
          title: "Crucible Composition Lab",
          instructions: "Formulate the crucible mix ratio: balance Clay, Sand/Grog, and Graphite to maximize thermal shock resistance and melting temperature.",
          parameters: { clayPct: 50, graphitePct: 30, grogPct: 20 },
          goalDescription: "Achieve 1,400°C thermal endurance with 0% fracture risk.",
        },
        quiz: [
          {
            question: "Why do master potters add crushed ceramic powder or sand (grog) to fine clay when making crucibles?",
            options: [
              "To make the crucible change color when heated",
              "To stop thermal shrinkage and prevent thermal shock cracks",
              "To make the clay stick to the metal",
              "To make the pot dissolve in water"
            ],
            answerIndex: 1,
            explanation: "Grog acts as pre-shrunk aggregate. It halts crack propagation and relieves internal stresses when the crucible transitions through extreme temperature differentials."
          }
        ],
        feynmanPrompt: "Why would a regular kitchen ceramic bowl shatter if you tried to melt copper in it, and what makes a refractory crucible different?"
      },
      {
        id: "1.3",
        stageNumber: 1,
        subNumber: 3,
        title: "Metallurgy: Smelting the First Structural Metals",
        shortSummary: "Unlocking copper, tin, bronze, and malleable iron bloom to replace fragile stone tools.",
        beginnerIntuition: "A stone axe chips and breaks permanently. A metal blade bends, can be hammered sharp again, and can be melted down and re-forged if it snaps. Metal gives tools ductile longevity.",
        whyDirtCantDoThisYet: "Raw rocks with green malachite or red rust look like dirt; you must run high-temperature reduction chemistry to extract pure crystal lattice metals.",
        keyArtifactUnlocked: "Bronze Chisels & Forged Iron Bloom Hammer",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Hardened stone and cast bronze anvils",
              "Hand-forged wooden and iron tongs for grasping white-hot billets",
              "Two-piece clay casting molds with risers and sprues",
              "Leather smithy aprons and heat-shielding eye visors"
            ],
            description: "The physical implements needed to grab, hit, shape, and pour molten matter without burning the human creator."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Waterwheel-driven trip hammers for effortless repetitive slag expulsion",
              "Stream-powered continuous bellows systems for non-stop airflow",
              "Counterweighted forge doors for one-touch access"
            ],
            description: "Mechanical amplification of human force: water flow takes over the back-breaking pounding of iron bloom."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Apprentice-artisan craft knowledge transmission guilds",
              "Metallurgy trade networks linking copper mines and tin deposits",
              "Smelt quality marking stamps on standardized ingots"
            ],
            description: "Copper and tin rarely occur together; long-distance trade routes and certified ingot weights were born here."
          }
        },
        deepDiveMarkdown: `### The Reduction Reaction: Stealing Oxygen from Rocks
Metals in nature are almost always bonded with oxygen ($Fe_2O_3$, $CuO$) or sulfur ($CuFeS_2$). 

When you roast copper carbonate with charcoal at ~1,100°C:
$$2CuO + C \\rightarrow 2Cu + CO_2 \\uparrow$$
The carbon has a higher affinity for oxygen at elevated temperatures than copper does. The gas escapes, leaving beads of molten copper that trickle down to pool at the furnace base.

#### Why Iron is Tricky (The Bloomery vs Blast Furnace):
Primitive furnaces couldn't reach iron's melting point (1,538°C). Instead, they produced a spongy mass of solid iron mixed with glassy slag called a **bloom**. By repeatedly hammering the red-hot bloom, smiths squeezed out liquid slag, welding iron crystals into dense **wrought iron**.`,
        commonMisconceptions: [
          "Misconception: Early iron workers melted liquid iron into pots like bronze. (Early iron was forged from a spongy solid bloom; casting iron required massive blast furnaces centuries later).",
          "Misconception: Bronze is just melted copper. (Pure copper is too soft; you must alloy 88% copper with 12% tin to create hard, tough bronze)."
        ],
        interactiveLab: {
          type: 'air_temperature',
          title: "Bloomery Forging & Slag Expulsion",
          instructions: "Heat the bloom to ductile temperature (1,150°C) and strike with the trip hammer at the correct cadence to expel glassy slag.",
          parameters: { strikeCadence: 60, billetTemp: 1150, slagRemaining: 38 },
          goalDescription: "Reduce slag below 5% without cracking the iron billet.",
        },
        quiz: [
          {
            question: "In a bloomery furnace, how is malleable wrought iron created without reaching iron's full melting point of 1,538°C?",
            options: [
              "By freezing the iron with ice",
              "By reducing iron oxide into solid spongy bloom crystals and hammering out the liquid glassy slag while white-hot",
              "By dissolving iron in sea water",
              "By using gold dust as a catalyst"
            ],
            answerIndex: 1,
            explanation: "Solid iron crystals coalesce below liquid melting point while silicate slag liquefies earlier. Hammering red-hot bloom forces out the slag and pressure-welds pure iron grains together."
          }
        ],
        feynmanPrompt: "Why does hammering a glowing red lump of iron over and over make it stronger rather than destroy it?"
      }
    ]
  },
  {
    stageNumber: 2,
    title: "Mechanical Precision & Industrial Chemical Foundations",
    subtitle: "Flatness, Mineral Acids & Prime Movers",
    themeColor: "emerald-500",
    accentBg: "from-emerald-950/40 to-stone-900/60",
    badge: "Stage 02",
    summary: "From Whitworth's three-plate scraping to mineral acids and Watt's closed-loop centrifugal governor. Precision is born here.",
    subModules: [
      {
        id: "2.1",
        stageNumber: 2,
        subNumber: 1,
        title: "The Foundations of Absolute Flatness & Linear Precision",
        shortSummary: "The Whitworth three-plate scraping method: creating micro-inch flatness from scratch without reference masters.",
        beginnerIntuition: "How do you make the very first flat surface when you have no ruler or straightedge to check it against? If you rub two plates together, one becomes concave (a bowl) and the other convex (a dome)—they match, but neither is flat! Whitworth proved that rubbing THREE plates against each other in rotation forces all three to become mathematically flat.",
        whyDirtCantDoThisYet: "Without true flatness, machine tool carriages wiggle, pistons leak steam, and you can never cut a straight linear path or true cylinder.",
        keyArtifactUnlocked: "Surface Plate & Precision Lead Screw Lathe",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Hand-scrapers with hardened tool-steel cutting tips",
              "Whitworth three-plate cast iron reference blanks",
              "First-generation wooden and iron treadle lathes",
              "Prussian blue marking dye (iron hexacyanoferrate oil paste)"
            ],
            description: "Scraping tiny thousandth-of-an-inch high spots visible only through contrasting oil ink transfer."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Treadle-powered rotary turning lathes",
              "Self-centering lead screw feeds (the tool moves itself uniformly as spindle spins)",
              "Compound slide rests eliminating human hand tremor"
            ],
            description: "Linking spindle rotation directly to linear toolhead feed creates perfectly identical screw threads."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Standardization of length and pitch units (Whitworth standard screw threads)",
              "Early workshop craft guilds and machinist apprenticeships",
              "Interchangeable parts inspection protocols"
            ],
            description: "Before this, every bolt only fit its own hand-filed nut. Standardization enabled interchangeable machine parts."
          }
        },
        deepDiveMarkdown: `### The Mathematical Genius of Whitworth's Three Plates
Suppose plate $A$ is slightly curved. If you rub $A$ against plate $B$ with abrasive:
- $A$ can be concave (radius $+R$) and $B$ convex (radius $-R$).
They fit together snugly! You might think they are flat, but they are curved bowls.

Now introduce plate $C$:
1. Scrape $A$ and $B$ until they match.
2. Scrape $A$ against $C$ until they match ($C$ is now like $B$).
3. Compare $B$ with $C$:
   - Both are convex domes! When you put them face-to-face, they only touch in the center and rock back and forth!
4. By scraping off the high spots where $B$ and $C$ contact, and cycling through $A-B$, $B-C$, $C-A$, **the only geometry that can contact all three simultaneously across every orientation is a plane of zero curvature: Absolute Flatness!**`,
        commonMisconceptions: [
          "Misconception: You can create a straight line by pulling a taught string or looking along an edge. (Optical parallax and sagging prevent micro-inch precision; only 3-body mechanical contact achieves sub-millimeter flatness).",
          "Misconception: Flat surfaces can be made by casting liquid metal. (Surface tension creates meniscuses and uneven cooling shrinkage)."
        ],
        interactiveLab: {
          type: 'whitworth_plates',
          title: "Whitworth Three-Plate Scraping Simulator",
          instructions: "Rotate and pair plates A, B, and C. Identify high spots using Prussian Blue ink transfer and scrape them down to achieve sub-micron coplanarity.",
          parameters: { pairSelected: 'A-B', scrapeIterations: 0, flatnessDevMicrons: 42 },
          goalDescription: "Cycle pairings A-B, B-C, C-A to reduce surface error below 2 microns.",
        },
        quiz: [
          {
            question: "Why does rubbing two plates together fail to create a truly flat surface?",
            options: [
              "Because two plates always react chemically and rust",
              "Because one plate can become concave and the other convex, matching perfectly while remaining curved",
              "Because friction melts the metal instantly",
              "Because you need electricity to make things flat"
            ],
            answerIndex: 1,
            explanation: "Two surfaces can conform perfectly to one another as complementary spheres (one concave, one convex). Introducing a 3rd plate exposes the curvature because two convex surfaces rock against each other."
          }
        ],
        feynmanPrompt: "Explain to a newcomer why rubbing two coins together won't make them flat, but cycling three coins will."
      },
      {
        id: "2.2",
        stageNumber: 2,
        subNumber: 2,
        title: "Industrial Chemistry & Mineral Acids",
        shortSummary: "Sulfuric acid ($H_2SO_4$) and nitric acid: the liquid fire that dissolves ores, purifies silicon, and drives chemistry.",
        beginnerIntuition: "Sulfuric acid is the chemical lifeblood of advanced industry. Without it, you cannot etch metals, purify raw minerals, dissolve quartz, or make battery electrolytes. The Lead Chamber process allows large-scale acid manufacture without eating through its own containers.",
        whyDirtCantDoThisYet: "Strong acids dissolve iron, bronze, and stone. You need lead-lined rooms because lead coats itself in an insoluble lead-sulfate crust that halts further corrosion.",
        keyArtifactUnlocked: "Lead Chamber Distillers & Concentrated Sulfuric Acid",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Lead-lined chambers welded with hydrogen flames",
              "Borosilicate heat-resistant glass retorts and condensers",
              "Acid-proof vitrified earthenware jars with ground-glass stoppers"
            ],
            description: "Storage and reaction vessels capable of containing boiling liquid acids that dissolve flesh and steel."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Continuous sulfur dioxide and steam drip condensation loops",
              "Heat-exchanger counterflow cooling flues",
              "Gravity-siphoned overflow basins"
            ],
            description: "Self-cycling condensation: hot acid vapor condenses in passive cooling towers and flows downward under gravity."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Chemical safety protocols (acid-into-water dilution rules)",
              "Hazardous gas scrubbing and ventilation mandates",
              "Standard specific gravity hydrometer grading"
            ],
            description: "Sulfuric acid releases boiling heat when water is poured into it; rigid safety rules protect the workforce from blindings."
          }
        },
        deepDiveMarkdown: `### The Lead Chamber Process: Catalysis in Action
To make sulfuric acid, you burn sulfur to get sulfur dioxide ($SO_2$):
$$S + O_2 \\rightarrow SO_2$$
Getting from $SO_2$ to $SO_3$ in ambient air is glacially slow. But introduce nitrogen dioxide ($NO_2$) gas:
$$SO_2 + NO_2 \\rightarrow SO_3 + NO$$
$$2NO + O_2 \\rightarrow 2NO_2 \\quad \\text{(Regenerating the catalyst!)}$$
$$SO_3 + H_2O \\rightarrow H_2SO_4$$

The nitrogen oxides act as reusable chemical couriers, grabbing oxygen from the air and handing it to sulfur dioxide!`,
        commonMisconceptions: [
          "Misconception: You pour water into concentrated acid to dilute it. (NEVER! The intense heat of hydration flashes water to steam, spraying acid into your face. Always pour acid into water slowly!).",
          "Misconception: Glass can hold every acid. (Hydrofluoric acid dissolves glass; specialized lead, wax, or plastic containers are needed)."
        ],
        interactiveLab: {
          type: 'air_temperature',
          title: "Lead Chamber Reaction Balancer",
          instructions: "Balance $SO_2$, Steam, and $NO_x$ catalyst feed rates to maximize $H_2SO_4$ concentration without releasing toxic red gas.",
          parameters: { sulfurFeed: 50, steamRatio: 1.2, catalystCirc: 15 },
          goalDescription: "Reach 78% chamber acid concentration with zero exhaust blow-out.",
        },
        quiz: [
          {
            question: "Why was metallic lead used to construct chambers for sulfuric acid production rather than iron or copper?",
            options: [
              "Lead is magnetic and attracts sulfur",
              "Lead forms a passivating insoluble lead sulfate ($PbSO_4$) skin that shields it from acid attack",
              "Lead is the lightest metal available",
              "Lead melts at room temperature"
            ],
            answerIndex: 1,
            explanation: "Lead reacts with sulfuric acid to form a microscopically thin, insoluble layer of lead sulfate ($PbSO_4$) that seals the metal underneath from further chemical attack."
          }
        ],
        feynmanPrompt: "What is a chemical catalyst, and why did nitrogen oxides let humans make tons of sulfuric acid cheaply?"
      },
      {
        id: "2.3",
        stageNumber: 2,
        subNumber: 3,
        title: "Prime Movers & Early Power Generation",
        shortSummary: "Steam boilers and the Watt centrifugal governor: the very first mechanical negative feedback loop.",
        beginnerIntuition: "Human muscles get tired. Waterwheels depend on flowing rivers. A steam engine converts heat into non-stop rotary mechanical work anywhere on Earth. But if a machine's workload suddenly drops, the engine will spin faster and faster until the flywheel shatters. James Watt invented a governor with spinning brass balls that rise with speed, physically pinching the steam throttle closed—the birth of automated cybernetics!",
        whyDirtCantDoThisYet: "Without precise cylindrical boring and closed-loop feedback, steam boilers blow up or seize their pistons.",
        keyArtifactUnlocked: "Watt Double-Acting Steam Engine & Centrifugal Governor",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Cast iron boiler shells with riveted pressure seams",
              "Wilkinson precision cylinder boring machine (true round cylinders)",
              "Steam piston slide valves and packing seals"
            ],
            description: "Machining a 50-inch iron cylinder so round that a thin coin cannot slip between the piston and wall."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Watt centrifugal governor (mechanical closed-loop speed regulation)",
              "Automated boiler float valves for continuous water replenishment",
              "Dead-weight pressure relief safety valves"
            ],
            description: "Negative feedback: high speed $\\rightarrow$ balls lift $\\rightarrow$ throttle closes $\\rightarrow$ speed drops $\\rightarrow$ equilibrium restored."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Boiler inspection codes and statutory safety insurance standards",
              "Continuous shift scheduling for round-the-clock stoking",
              "Horsepower measurement standardization"
            ],
            description: "Boiler explosions killed hundreds; rigorous safety engineering codes and independent pressure vessel inspectors emerged."
          }
        },
        deepDiveMarkdown: `### The Birth of Cybernetics: Negative Feedback
In an open loop system:
$$\\text{Heat Input} \\rightarrow \\text{Speed Output}$$
If a saw blade cuts through a log and suddenly hits air, friction drops instantly. Without human intervention, the engine accelerates into catastrophic overspeed.

#### Watt's Centrifugal Governor:
Two heavy iron balls rotate on linkages connected to the output shaft:
- Centrifugal force pushes the balls outward against gravity as speed $\\omega$ increases:
$$F_c = m \\omega^2 r$$
- As the balls swing outward, mechanical scissor arms lift a vertical collar.
- The collar is tied to a butterfly valve in the steam supply line.
- When $\\omega$ rises, the valve closes, choking steam flow. When $\\omega$ drops, gravity pulls the balls down, opening the valve!
This is a pure physical proportional controller ($P$-controller), long before electronics existed!`,
        commonMisconceptions: [
          "Misconception: Steam engines run on boiling water like a kettle. (They run on high-pressure steam expansion; the boiling water is merely the vapor source).",
          "Misconception: Feedback loops were invented by computer scientists in the 1950s. (Mechanical negative feedback has regulated steam engines since 1788)."
        ],
        interactiveLab: {
          type: 'pid_control',
          title: "Watt Centrifugal Governor Tuning Lab",
          instructions: "Adjust the flyball mass and throttle linkage ratio to maintain steady 120 RPM under sudden mechanical load shifts (saw engage/disengage).",
          parameters: { ballMassKg: 8, linkageRatio: 1.5, targetRpm: 120, currentRpm: 120 },
          goalDescription: "Dampen RPM oscillation to within ±3% within 2 seconds of sudden load drop.",
        },
        quiz: [
          {
            question: "How does the Watt centrifugal governor achieve automated closed-loop speed regulation?",
            options: [
              "It uses digital microchips powered by batteries",
              "Spinning balls push outward via centrifugal force as speed increases, mechanically closing the steam inlet valve",
              "A human operator pulls a lever when they hear a whistle",
              "It dumps cold water directly onto the fire"
            ],
            answerIndex: 1,
            explanation: "As rotation speed increases, centrifugal force overcomes gravity and swings the balls outward, which lifts a mechanical linkage that closes the steam throttle valve."
          }
        ],
        feynmanPrompt: "Why is a Watt governor called a 'negative feedback' system, and what would happen if it had 'positive feedback' instead?"
      }
    ]
  },
  {
    stageNumber: 3,
    title: "Electricity, Electromagnetism & Binary Communication",
    subtitle: "DC Current, Dynamos & The First Telegraph Bit",
    themeColor: "sky-500",
    accentBg: "from-sky-950/40 to-stone-900/60",
    badge: "Stage 03",
    summary: "Drawing copper wires, chemical batteries, Faraday's electromagnetic dynamos, and electromechanical relay repeaters carrying binary bits across miles.",
    subModules: [
      {
        id: "3.1",
        stageNumber: 3,
        subNumber: 1,
        title: "Generating & Storing DC Electricity",
        shortSummary: "Drawing copper wire and building Daniell chemical cells to harness steady electron flow.",
        beginnerIntuition: "Lightning has lots of energy, but it dumps it in a fraction of a millisecond and vanishes. To run circuits, you need a steady, calm trickle of electrons—Direct Current (DC). By dipping zinc and copper plates into acid/salt baths and pulling copper through tungsten-hard dies into long insulated wires, you create an electrical highway.",
        whyDirtCantDoThisYet: "Without wire drawing dies and chemical redox reactions, electricity remains an untamed static spark that shocks and disappears.",
        keyArtifactUnlocked: "Tungsten Wire-Drawing Die & Daniell Chemical Cell",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Chilled iron and tungsten carbide wire-drawing pull-dies",
              "Glass jar battery cells with porous ceramic unglazed dividers",
              "Manual wire wrapping spindles with silk/shellac insulation varnish"
            ],
            description: "Pulling thick copper rod through progressively smaller holes to produce hundreds of meters of uniform gauge wire."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Continuous wire-drawing capstan drums driven by waterwheels",
              "Self-feeding molten zinc casting ladles",
              "Automated varnish dipping and drying towers"
            ],
            description: "Mechanical capstans draw miles of copper wire through dies at constant speed without human arm exhaustion."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Standardization of electrical units: Volts, Amperes, and Ohms",
              "Standard Wire Gauge (AWG) diameter tables",
              "Safe disposal protocols for heavy metal battery electrolytes"
            ],
            description: "Defining 1 Volt and 1 Ampere universally allowed scientists worldwide to reproduce exact electrical experiments."
          }
        },
        deepDiveMarkdown: `### The Daniell Cell: Steady Chemical Electromotive Force
Volta's early pile failed because hydrogen gas bubbles coated the copper plate (polarization), stopping current in minutes.

The **Daniell Cell** solved this with two separate compartments divided by a porous ceramic pot:
- **Anode (Oxidation):** $Zn_{(s)} \\rightarrow Zn^{2+}_{(aq)} + 2e^-$
- **Cathode (Reduction):** $Cu^{2+}_{(aq)} + 2e^- \\rightarrow Cu_{(s)}$
The overall cell reaction:
$$Zn + Cu^{2+} \\rightarrow Zn^{2+} + Cu \\quad (E^\\circ \\approx +1.10\\text{ Volts})$$
Zinc gives up electrons happily. They travel through your external wire, doing electrical work (lighting a filament or powering an electromagnet), and arrive at the copper electrode to turn copper ions into solid metal. Steady voltage for days!`,
        commonMisconceptions: [
          "Misconception: Electricity travels through bare metal touching everything. (Without shellac, silk, or rubber insulation, the current short-circuits instantly into the ground).",
          "Misconception: Batteries generate electrons from nothing. (Batteries don't make electrons; they pump existing electrons through chemical redox energy)."
        ],
        interactiveLab: {
          type: 'dynamo_voltage',
          title: "Daniell Cell Voltage & Wire Gauge Lab",
          instructions: "Select electrolyte concentration and wire gauge to deliver 1.1V and power an electromagnetic relay over 50 meters of line.",
          parameters: { cuSulfateMol: 1.0, wireGaugeAwg: 22, loadResistance: 50 },
          goalDescription: "Deliver stable current ($>15$ mA) across 50m line without voltage drop.",
        },
        quiz: [
          {
            question: "Why was the porous unglazed ceramic cup essential in the Daniell Cell?",
            options: [
              "To keep the battery warm during winter",
              "To allow ions to migrate while preventing zinc and copper sulfate solutions from mixing directly",
              "To make the battery lighter to carry",
              "To generate sparks"
            ],
            answerIndex: 1,
            explanation: "The porous pot acts as a salt bridge: it allows ions ($SO_4^{2-}$) to pass through to maintain charge neutrality, while stopping the metal ions from direct chemical short-circuiting."
          }
        ],
        feynmanPrompt: "How does a chemical battery 'push' electrons through a wire like water through a pipe?"
      },
      {
        id: "3.2",
        stageNumber: 3,
        subNumber: 2,
        title: "Dynamos & Electromagnetic Power Conversion",
        shortSummary: "Faraday's induction, rotating armatures, and split-ring commutators generating continuous kilowatts.",
        beginnerIntuition: "Chemical batteries are expensive and eat zinc plates. Faraday discovered that spinning a loop of copper wire inside a magnetic field mechanically pushes electrons through the wire! By attaching steam engines to dynamos, humanity learned to turn coal directly into electricity at massive scale.",
        whyDirtCantDoThisYet: "Without insulated copper wire coils and laminated soft iron cores to concentrate magnetic flux, induced voltage is too weak to notice.",
        keyArtifactUnlocked: "Rotary Armature Dynamo & Split-Ring Commutator",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Laminated silicon-steel armature cores (insulated to stop eddy currents)",
              "Segmented copper commutator rings with mica insulation wedges",
              "Spring-loaded carbon/copper motor brushes"
            ],
            description: "Mechanical rotary switches that reverse coil polarity twice per revolution, converting AC into DC."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Self-exciting electromagnet field coils (residual magnetism bootstraps the field)",
              "Dynamic voltage regulation via feedback rheostats",
              "Centrifugal clutch circuit breakers"
            ],
            description: "Self-excitation: a faint whisper of magnetism in the iron core creates a small current, which feeds back into the field coil to make the magnet stronger, bootstrapping to full power!"
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Power grid topologies (radial vs mesh distribution)",
              "Central station peak load scheduling",
              "Electrical safety earthing standards"
            ],
            description: "Moving from individual lab batteries to utility grids required standardized transmission lines and safety circuit breakers."
          }
        },
        deepDiveMarkdown: `### Faraday's Law & Commutation
When magnetic flux $\\Phi_B$ through a coil changes over time:
$$\\mathcal{E} = -N \\frac{d\\Phi_B}{dt}$$
As a coil rotates in a stationary magnetic field, it naturally generates **Alternating Current (AC)**: positive during the first half-turn, negative during the second.

#### The Commutator Trick:
To get DC, you slice the copper output ring in half. As the coil flips its direction relative to the north and south poles, the brush contacts switch to the other half of the ring at the exact moment of voltage zero-crossing! The alternating sine wave becomes a rectified, pulsating direct current!`,
        commonMisconceptions: [
          "Misconception: Dynamos create electricity out of magnets. (Magnets do not deplete; the energy comes 100% from the mechanical torque spinning the shaft).",
          "Misconception: Solid iron cores are best for electromagnets. (Solid iron develops swirling eddy currents that heat up and waste power; cores must be sliced into thin laminated sheets)."
        ],
        interactiveLab: {
          type: 'dynamo_voltage',
          title: "Faraday Dynamo Generator Lab",
          instructions: "Tune RPM, Magnetic Flux density, and Armature Turn Count to output stable 110V DC under varying electrical loads.",
          parameters: { rpm: 1200, fluxDensityTesla: 0.8, coilTurns: 400 },
          goalDescription: "Generate 110V DC at 10A output power with minimal ripple.",
        },
        quiz: [
          {
            question: "Why are the iron cores of dynamos made of thin, insulated laminated sheets rather than solid blocks of iron?",
            options: [
              "Thin sheets are cheaper to paint",
              "Solid iron blocks would develop large parasitic eddy currents that waste energy as heat",
              "Laminated sheets absorb sound better",
              "Solid iron does not conduct magnetic fields"
            ],
            answerIndex: 1,
            explanation: "Varying magnetic flux induces swirling electric loops (eddy currents) in conductors. Laminating the core breaks up these current paths, slashing heat losses."
          }
        ],
        feynmanPrompt: "If a magnet doesn't lose its magnetism when generating power, where does the electrical energy actually come from?"
      },
      {
        id: "3.3",
        stageNumber: 3,
        subNumber: 3,
        title: "Relays & Telegraph Networks (Binary Realized)",
        shortSummary: "Electromagnetic sounders and regenerative relay switches: physical bits traveling across continents.",
        beginnerIntuition: "If you push an electric current down a wire 50 miles long, the wire's resistance makes the signal so weak at the end that a buzzer won't ring. But a weak current CAN attract a delicate iron lever just 1 millimeter. That lever closes a fresh battery circuit, sending a crisp, full-power signal down the next 50 miles! This is a **regenerative relay**—the world's first binary logic switch and digital repeater.",
        whyDirtCantDoThisYet: "Without magnetic coils and spring contacts, electrical signals degrade into useless noise over distance.",
        keyArtifactUnlocked: "Electromagnetic Relay Repeater & Morse Telegraph Key",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Precision wound electromagnet sounders with soft iron armatures",
              "Tension return springs calibrated to gram-force thresholds",
              "Platinum or silver spark-resistant electrical contact points",
              "Ceramic telegraph line insulators on wooden utility poles"
            ],
            description: "Switches that physically click open and closed millions of times without welding their contact points together."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Electromechanical relay signal regeneration (automatic repeating)",
              "Clockwork paper-tape punch telegraph receivers",
              "Automatic line grounding during lightning strikes"
            ],
            description: "Regenerative signal cascade: weak pulse $\\rightarrow$ magnetic pull $\\rightarrow$ switch closes $\\rightarrow$ full 100% clean pulse sent forward."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Universal telegraphic encoding schemes (Morse Code binary alphabet)",
              "Telecommunication routing hierarchies and telegram dispatch protocols",
              "Standardized line priority codes for emergency traffic"
            ],
            description: "Information decoupled from physical transportation for the first time in human history."
          }
        },
        deepDiveMarkdown: `### The Relay: The Ancestor of the Transistor
A relay has four terminals:
1. Two input terminals connected to an **electromagnet coil**.
2. Two output terminals connected to a **switch contact**.

When input current flows:
- The coil turns into a magnet.
- It pulls down an iron arm against a spring.
- The contacts touch: **CIRCUIT CLOSED (Logic 1)**.
When input current stops:
- The magnetic field collapses.
- The spring snaps the arm back: **CIRCUIT OPEN (Logic 0)**.

#### Why This Changed Everything:
1. **Amplification:** A tiny input current of 5 milliamps can switch an output of 10 Amperes!
2. **Boolean Logic:** If you put two relays in series, current only passes if BOTH are on (AND gate). If in parallel, current passes if EITHER is on (OR gate)!`,
        commonMisconceptions: [
          "Misconception: Telegraph messages were sent like human telephone voices. (They were purely discrete digital on/off pulses: binary dots and dashes).",
          "Misconception: Wires can transmit signals infinitely far without repeaters. (Resistance and capacitive line loss smear pulses into mush; regenerative relays restore sharp digital edges)."
        ],
        interactiveLab: {
          type: 'vacuum_grid',
          title: "Telegraph Relay Repeater Lab",
          instructions: "Configure the relay spring tension and contact spacing so an attenuated signal (weak 12V pulse after 100km) reliably fires the local battery circuit.",
          parameters: { inputVoltage: 1.8, springTensionGrams: 4.2, contactGapMm: 0.8 },
          goalDescription: "Achieve 100% crisp binary reproduction without bounce or contact chatter.",
        },
        quiz: [
          {
            question: "Why is a telegraph relay considered a digital repeater rather than just a simple wire extension?",
            options: [
              "Because it translates Morse code into English text automatically",
              "Because it uses the weak arriving signal to trigger a fresh local battery, regenerating a brand new, full-strength square pulse",
              "Because it stores messages on magnetic tapes",
              "Because it works without wires"
            ],
            answerIndex: 1,
            explanation: "A relay doesn't just pass along the tired, noisy incoming voltage; it uses that weak voltage to close a switch connected to a fresh battery, rebuilding a pristine digital pulse from scratch."
          }
        ],
        feynmanPrompt: "Explain how a tiny magnet and a spring-loaded switch can act like a computer's AND gate."
      }
    ]
  },
  {
    stageNumber: 4,
    title: "Thermionic Valves & The First Electronic Logic",
    subtitle: "Vacuum Tubes, Boolean Gates & Memory Drums",
    themeColor: "indigo-500",
    accentBg: "from-indigo-950/40 to-stone-900/60",
    badge: "Stage 04",
    summary: "Overcoming mechanical limits: moving electrons through a vacuum at light speed. Triode amplifiers, discrete Boolean gates, and delay line memory.",
    subModules: [
      {
        id: "4.1",
        stageNumber: 4,
        subNumber: 1,
        title: "Vacuum Tube Fabrication",
        shortSummary: "Glassblowing, mercury diffusion vacuum pumps, and the control grid that bends electron beams.",
        beginnerIntuition: "A mechanical relay has a moving iron arm. Because it has mass, it can only click a few hundred times a second before friction and bounce limit it. But an electron has almost zero mass! By boiling electrons off a hot filament inside a glass tube pumped to a high vacuum, and placing a wire mesh grid between the filament and plate, a tiny voltage on the grid can choke or release millions of electrons per second—zero moving parts!",
        whyDirtCantDoThisYet: "If there is even a tiny trace of air inside the tube, gas atoms collide with electrons, form ions, and burn out the filament in seconds.",
        keyArtifactUnlocked: "Mercury Diffusion Vacuum Pump & Audion Triode Valve",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Two-stage mercury diffusion vacuum pumps achieving $10^{-6}$ Torr",
              "High-precision glassblowing lathes and borosilicate bulb jigs",
              "Micro-welding spot frames for winding fine molybdenum grid mesh",
              "Barium/strontium oxide cathode coating ovens"
            ],
            description: "Evacuating glass bulbs to vacuums emptier than low Earth orbit and sealing them with red-hot glass pinches."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Automated radio frequency induction heating ('flashing the barium getter' to absorb residual gas molecules)",
              "Timed glass bulb evacuation and sealing cycles",
              "Automatic filament emission curve testers"
            ],
            description: "The 'getter': an induction coil flashes a ring of barium metal inside the sealed tube, vaporizing it to chemically trap any stray gas atoms."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Standard valve pinout sockets (octal and 9-pin miniature formats)",
              "Universal circuit schematic symbology (triodes, diodes, pentodes)",
              "Tube lifetime monitoring and proactive maintenance schedules"
            ],
            description: "Tubes burn out like lightbulbs; standard plug-in sockets allowed computers with 18,000 tubes (like ENIAC) to swap dead tubes quickly."
          }
        },
        deepDiveMarkdown: `### The Edison Effect & The Triode
1. **The Cathode (Heater):** When tungsten or oxide-coated metal glows red hot ($~800-1000^\\circ C$), thermal energy kicks electrons free from the metal lattice into the vacuum (**thermionic emission**).
2. **The Anode (Plate):** Placed at $+250\\text{V}$. Its positive electrostatic charge pulls the cloud of negative electrons across the empty gap.
3. **The Control Grid (Lee de Forest's Breakthrough):** 
   A loose wire screen placed between cathode and anode.
   - If the grid is given a **negative voltage** ($-5\\text{V}$), its electric field repels electrons back toward the cathode, choking the flow to zero!
   - If the grid is neutral ($0\\text{V}$), electrons fly right through the open mesh holes and slam into the plate.
A small voltage swing on the grid controls huge currents on the plate: **Incredible High-Speed Amplification and Switching!**`,
        commonMisconceptions: [
          "Misconception: The grid physically blocks electrons like a closed door. (The grid is mostly empty space! Its invisible electrostatic negative charge field repels electrons).",
          "Misconception: Vacuum tubes last forever like rocks. (Filaments slowly evaporate and cathodes lose emission over thousands of hours)."
        ],
        interactiveLab: {
          type: 'vacuum_grid',
          title: "Triode Grid Voltage vs Plate Current Lab",
          instructions: "Sweep the control grid voltage from -10V to 0V and observe the electron beam density and plate current amplification.",
          parameters: { gridVoltage: -3.5, plateVoltage: 250, heaterTempK: 1100 },
          goalDescription: "Find the cutoff grid voltage that chokes plate current to exactly 0 mA.",
        },
        quiz: [
          {
            question: "Why does a thermionic vacuum tube operate millions of times faster than an electromechanical relay?",
            options: [
              "Because it uses more electricity",
              "Because electrons have negligible mass and move at a fraction of light speed through a vacuum with zero physical moving parts",
              "Because glass transmits sound faster than iron",
              "Because vacuum tubes use light rather than electricity"
            ],
            answerIndex: 1,
            explanation: "Relays must physically accelerate iron metal levers against springs, limited by inertia. Vacuum tubes modulate electron clouds directly via electric fields with zero mechanical inertia."
          }
        ],
        feynmanPrompt: "How does a loose mesh of wire (the control grid) act like a valve that stops electrons from crossing an empty glass tube?"
      },
      {
        id: "4.2",
        stageNumber: 4,
        subNumber: 2,
        title: "Discrete Logic Gates & Circuit Building",
        shortSummary: "NOT, AND, OR, and XOR gates built from vacuum tubes, resistors, and capacitors.",
        beginnerIntuition: "Math is not magic; it is physical wiring. If electricity flowing through tube A cuts off tube B, you have built an inverter (NOT gate). Connect two tubes so current only flows when both receive signals, and you have an AND gate. Combine these, and you can build an adder that calculates $1 + 1 = 2$ in microseconds.",
        whyDirtCantDoThisYet: "Without stable resistors, capacitors, and active switches, circuits oscillate out of control or suffer voltage droop.",
        keyArtifactUnlocked: "Bistable Flip-Flop Register & Dual-Triode Adder",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Soldering irons and lead-tin rosin core solder",
              "Phenolic resin (Bakelite) laminated circuit boards",
              "Tube chassis socket punches and ceramic terminal strips",
              "Calibrated cathode ray oscilloscopes for waveform debugging"
            ],
            description: "Hand-wiring point-to-point electrical networks that hold precise voltages under thermal stress."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Master clock-pulse multivibrator generators synchronizing logic cycles",
              "Automatic margin voltage checking to detect fading tubes",
              "Relay-driven punch card batch job sequencers"
            ],
            description: "A centralized quartz-crystal or LC clock ticks millions of times a second, stepping all logic gates in synchronized lockstep."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Boolean algebra abstraction layers (De Morgan's laws, Karnaugh maps)",
              "Standard logic voltage levels (e.g., $+150\\text{V} = \\text{False}$, $+50\\text{V} = \\text{True}$)",
              "Modular interchangeable logic card designs"
            ],
            description: "Engineers stopped thinking about vacuum physics and started thinking in pure abstract Boolean math: AND, OR, NOT."
          }
        },
        deepDiveMarkdown: `### The Inverter (NOT Gate)
Connect the triode plate through a load resistor $R_L$ to $+250\\text{V}$:
- **Input Low ($-10\\text{V}$):** Tube is off (open circuit). No current flows through $R_L$. Therefore, Output voltage at plate is pulled high to $+250\\text{V}$!
- **Input High ($0\\text{V}$):** Tube conducts heavily. Current flows through $R_L$, causing a massive voltage drop. Output voltage at plate drops to $+50\\text{V}$!
Input $0 \\rightarrow$ Output $1$. Input $1 \\rightarrow$ Output $0$.

#### The Flip-Flop (1 Bit of Static Memory):
Cross-couple two inverters: Output of Tube 1 feeds Input of Tube 2, and Output of Tube 2 feeds Input of Tube 1.
If Tube 1 is ON, it holds Tube 2 OFF. And Tube 2 being OFF holds Tube 1 ON!
It will hold this state forever until you pulse a trigger line: **Static RAM is born!**`,
        commonMisconceptions: [
          "Misconception: A computer thinks like a human brain. (A computer is millions of simple on/off switches cascading through deterministic voltage thresholds).",
          "Misconception: Binary logic requires microchips. (Room-sized computers with glowing vacuum tubes and mechanical relays did all the same Boolean operations)."
        ],
        interactiveLab: {
          type: 'vacuum_grid',
          title: "Dual-Triode Flip-Flop State Lab",
          instructions: "Pulse the Set and Reset trigger lines to toggle and latch the bistable flip-flop state between 0 and 1.",
          parameters: { stateQ: 0, setPulse: false, resetPulse: false },
          goalDescription: "Store and hold a bit 1, then clear to 0 using cross-coupled tube feedback.",
        },
        quiz: [
          {
            question: "In a cross-coupled vacuum tube flip-flop, what keeps the circuit storing a 1 or 0 indefinitely without an external input?",
            options: [
              "A tiny battery hidden inside each tube",
              "Each tube's output voltage is wired to the other tube's input grid, mutually locking each other in complementary states",
              "The heat of the room keeps the state frozen",
              "A mechanical latch holds the filament"
            ],
            answerIndex: 1,
            explanation: "Cross-coupling means Tube A holding Tube B OFF simultaneously ensures that Tube B holds Tube A ON. It is an active electronic feedback latch."
          }
        ],
        feynmanPrompt: "How can two identical electronic switches wired to each other remember a number even after you let go of the button?"
      },
      {
        id: "4.3",
        stageNumber: 4,
        subNumber: 3,
        title: "The Memory & Compute Architecture",
        shortSummary: "Acoustic mercury delay lines, magnetic core stringing, and the Von Neumann stored-program architecture.",
        beginnerIntuition: "A processor without memory is like a calculator that forgets the number the moment you lift your finger. Early engineers stored bits as acoustic sound pulses echoing through tubes of liquid mercury! Later, they hand-wove tiny doughnut-shaped iron rings (magnetic cores) onto grids of wire. For the first time, programs and data lived together in the machine.",
        whyDirtCantDoThisYet: "Flip-flops take two vacuum tubes per bit. A 1,000-bit memory would need 2,000 hot, glowing tubes—untenable without compact magnetic memory.",
        keyArtifactUnlocked: "Ferrite Magnetic Core Memory Plane & Von Neumann Control Unit",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Acoustic mercury delay line tanks with quartz piezoelectric transducers",
              "Microscope jigs for hand-threading 0.5mm ferrite magnetic toroids",
              "Three-wire core threading matrices (X-drive, Y-drive, Sense wire)",
              "Console control panels with toggle switches and neon indicator lamps"
            ],
            description: "Women known as 'core weavers' threaded copper wire through thousands of tiny magnetic doughnuts with surgical needles."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Automated clock-driven instruction fetch-decode-execute cycles",
              "Coincident-current magnetic addressing (half-current along X and Y flips only the intersection core)",
              "Destructive-read automatic rewrite cycles"
            ],
            description: "The hardware CPU loop: Fetch next instruction $\\rightarrow$ Increment PC $\\rightarrow$ Decode op $\\rightarrow$ Execute in ALU $\\rightarrow$ Repeat."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Von Neumann architecture blueprints (unifying code and memory)",
              "Instruction Set Architecture (ISA) opcodes and machine word lengths",
              "Punch-card program archives and paper tape library standards"
            ],
            description: "The conceptual leap that code is just numbers stored in the same memory as data, meaning software could modify itself."
          }
        },
        deepDiveMarkdown: `### Coincident-Current Core Memory
How do you select 1 magnetic core out of 4,096 on a grid without running 4,096 separate wires?

#### The Physics of the Hysteresis Loop:
Ferrite rings have a square magnetic hysteresis curve:
- A current $+I$ flips the ring clockwise (**State 1**).
- A current $-I$ flips the ring counter-clockwise (**State 0**).
- A current of $+I/2$ is **TOO WEAK** to overcome the coercive force; the ring does nothing!

By sending $+I/2$ down wire $X_7$ and $+I/2$ down wire $Y_{12}$:
- Every core along row $X_7$ receives $+I/2$ $\\rightarrow$ nothing happens.
- Every core along column $Y_{12}$ receives $+I/2$ $\\rightarrow$ nothing happens.
- **ONLY the single core at the intersection $(X_7, Y_{12})$ receives $I/2 + I/2 = I$ and flips!**
You can address an entire plane of 4,096 bits with just $64 + 64 = 128$ wires!`,
        commonMisconceptions: [
          "Misconception: Core memory lost its contents when the power was switched off. (Magnetic core memory is non-volatile; the magnetic spin orientation remains forever until rewritten).",
          "Misconception: Reading core memory was harmless. (Reading flips the core to 0; the circuit had to detect the blip on the sense wire and immediately rewrite the 1 back!)."
        ],
        interactiveLab: {
          type: 'binary_bootstrap',
          title: "Coincident-Current Core Matrix Lab",
          instructions: "Select row X and column Y drive currents to write a 1 into memory address (X=3, Y=5) without disturbing neighboring cores.",
          parameters: { currentX: 0.5, currentY: 0.5, selectedX: 3, selectedY: 5 },
          goalDescription: "Flip the target core while keeping all non-selected cores below coercive threshold.",
        },
        quiz: [
          {
            question: "Why did coincident-current core memory allow thousands of bits to be addressed with very few control wires?",
            options: [
              "Because magnetic rings are wireless",
              "Because each core requires full current $I$ to flip; sending half-current $I/2$ down one row and one column only flips the single core at their intersection",
              "Because core memory only holds one number at a time",
              "Because sound waves travel through mercury"
            ],
            answerIndex: 1,
            explanation: "The magnetic material has a threshold (coercivity). Half-current does not alter magnetic state; only the core experiencing the sum of both row and column half-currents flips."
          }
        ],
        feynmanPrompt: "How can sending half of an electric current down a row and half down a column select just one single magnetic ring in a huge grid?"
      }
    ]
  },
  {
    stageNumber: 5,
    title: "Ultra-Pure Silicon, Wafers & The Transistor",
    subtitle: "Czochralski Crystals, Photolithography & MOSFET Scaling",
    themeColor: "teal-500",
    accentBg: "from-teal-950/40 to-stone-900/60",
    badge: "Stage 05",
    summary: "Refining beach sand into 99.9999999% pure electronic-grade silicon crystals. Photolithography, chemical etching, and planar MOSFET transistors.",
    subModules: [
      {
        id: "5.1",
        stageNumber: 5,
        subNumber: 1,
        title: "Single-Crystal Silicon Refining",
        shortSummary: "From silica rock to Czochralski single-crystal boules with 9N purity (one impurity in a billion).",
        beginnerIntuition: "Beach sand ($SiO_2$) is everywhere, but raw silicon is completely useless for chips. If even one stray foreign atom is out of place among a billion silicon atoms, electrons get trapped and the transistor breaks. In the Czochralski process, silicon is melted in quartz crucibles, a seed crystal is dipped in, and a giant flawless cylindrical crystal ingot is slowly pulled out like pulling honey on a spoon.",
        whyDirtCantDoThisYet: "Electronic grade silicon requires 99.9999999% purity ('nine nines'). Nothing found in raw nature comes close.",
        keyArtifactUnlocked: "Czochralski Crystal Puller & Monocrystalline Silicon Boule",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Submerged electric arc reduction furnaces producing Metallurgical Grade Silicon (MGS)",
              "Trichlorsilane distillation fractionating columns producing Polysilicon",
              "Ultra-pure synthetic quartz Czochralski crucibles with argon gas purifiers",
              "Radio-frequency induction zone refining heating coils"
            ],
            description: "Melting silicon at 1,425°C under high vacuum or inert argon without contaminating it with the container walls."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Czochralski ingot pull-rate automatic optical feedback speed control",
              "Automated optical pyrometer temperature balancing",
              "Continuous crystal seed counter-rotation servos"
            ],
            description: "Automated feedback loops balance pull speed (mm/hour) against heater temperature to maintain an exact cylindrical ingot diameter."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Cleanroom contamination containment protocols",
              "Semiconductor material grading standards (9N to 11N electronic grade)",
              "Specialized chemical supply chain delivery certifications"
            ],
            description: "One sneeze or speck of dust ruins an entire wafer; strict bunny suit and airlock cleanliness protocols were created."
          }
        },
        deepDiveMarkdown: `### The Siemens Process & Czochralski Ingot Growth
1. **From Dirt to Metallurgical Silicon (98% pure):**
   $$SiO_2 + 2C \\rightarrow Si + 2CO \\uparrow \\quad (\\text{in 1,900}^\\circ\\text{C electric arc furnace})$$
2. **Chemical Purification (Siemens Process):**
   React silicon with hydrogen chloride gas to form liquid trichlorosilane ($SiHCl_3$). Distill this liquid repeatedly in fractional distillation columns (just like purifying alcohol!). Then react back with $H_2$:
   $$SiHCl_3 + H_2 \\rightarrow Si + 3HCl$$
   You now have hyper-pure polycrystalline silicon (99.9999999%).

3. **Czochralski Single Crystal Growth:**
   Polysilicon has millions of random grain boundaries. Melt it in a quartz pot at 1,425°C. Dip a single seed crystal with the exact desired crystal orientation $\\langle 100 \\rangle$ into the melt. As you rotate and pull slowly upward, atoms freeze onto the seed in one continuous, perfect lattice: **A Monocrystalline Silicon Ingot!**`,
        commonMisconceptions: [
          "Misconception: Computer chips are carved out of raw beach sand. (Beach sand is chemically reduced, fractionally distilled as acid vapor, and recrystallized into a synthetic diamond-cubic lattice).",
          "Misconception: You can pull the crystal as fast as you want. (Pull too fast, and thermal dislocation defects destroy the crystal structure; pull too slow, and it freezes into a bulb)."
        ],
        interactiveLab: {
          type: 'czochralski_pull',
          title: "Czochralski Crystal Pulling Simulator",
          instructions: "Balance crucible heater power and seed pull rate to maintain a steady 200mm diameter monocrystalline silicon boule without dislocation slip.",
          parameters: { heaterTempC: 1428, pullRateMmHr: 85, rotationRpm: 12 },
          goalDescription: "Grow a 200mm diameter crystal boule with zero lattice defect dislocations.",
        },
        quiz: [
          {
            question: "Why is polycrystalline silicon unsuitable for manufacturing high-speed microprocessors until it is turned into a single crystal?",
            options: [
              "It is the wrong color",
              "Random grain boundaries between micro-crystals scatter electrons and trap charge carriers, ruining transistor performance",
              "It cannot be sliced with saws",
              "Polysilicon is magnetic and sticks to machines"
            ],
            answerIndex: 1,
            explanation: "Boundaries between random crystal grains act as electrical roadblocks and recombination centers that scramble electron mobility. Only a continuous single-crystal lattice permits uniform semiconductor behavior."
          }
        ],
        feynmanPrompt: "Why does an ingot of silicon for computer chips need to be a 'single crystal' instead of many crystals stuck together?"
      },
      {
        id: "5.2",
        stageNumber: 5,
        subNumber: 2,
        title: "Wafer Lithography & Microfabrication",
        shortSummary: "Slicing wafers, photoresist spin-coating, UV projection masks, and chemical etching.",
        beginnerIntuition: "You cannot build billions of microscopic switches with tweezers. Instead, you build them with LIGHT! You slice a silicon cylinder into mirror-smooth round wafers, coat them with light-sensitive chemical resin (photoresist), and project an image of your circuit through a lens. Where the light hits, the chemical hardens or dissolves away, letting you etch patterns thousands of times thinner than a human hair.",
        whyDirtCantDoThisYet: "Human mechanical tools can't work below a few micrometers. Photolithography scales with the wavelength of light itself.",
        keyArtifactUnlocked: "Optical Wafer Stepper & Chemical Etch Bath",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Diamond wire wafer gang-saws slicing 0.5mm mirror wafers",
              "Photoresist spin-coaters with vacuum chucks",
              "Deep-ultraviolet (DUV) mercury arc lamp optical reduction lens columns",
              "Acid etching chemical immersion tanks and deionized water rinse baths"
            ],
            description: "Optics that shrink a huge circuit drawing on a glass mask down to a microscopic square on a silicon chip."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Step-and-repeat wafer stage aligners with sub-micron laser interferometry",
              "Automated spin-coat centrifugal thickness control",
              "Timed chemical bath cassette dippers"
            ],
            description: "Laser interferometers measure the position of the wafer table down to nanometers so each new mask layer lines up perfectly on top of the previous one."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Photolithography mask library versioning and reticle inspection",
              "Semiconductor yield statistics (defect density modeling)",
              "Cleanroom Class 10/100 air quality certifications"
            ],
            description: "Managing multi-layer mask sets where a single misalignment defect between layer 3 and layer 4 ruins all 500 chips on the wafer."
          }
        },
        deepDiveMarkdown: `### The Planar Process: Building in 2D
Jean Hoerni invented the planar process, making modern chips possible:
1. **Oxidation:** Heat the wafer in steam at 1,000°C to grow an insulating glass skin of Silicon Dioxide ($SiO_2$).
2. **Photoresist:** Spin a thin drop of liquid polymer into a uniform 1-micron film.
3. **Exposure:** Shine UV light through a quartz glass **reticle (mask)**. The UV light breaks chemical bonds in the exposed photoresist (positive resist).
4. **Development:** Wash the wafer in solvent. The exposed resist dissolves, revealing the oxide beneath.
5. **Etching:** Immerse in buffered hydrofluoric acid. The acid eats holes in the oxide where the resist was removed, but leaves the protected oxide intact!
6. **Doping:** Shoot boron or phosphorus atoms through the holes to create conductive regions.
Repeat 30+ times to layer transistors, insulators, and copper wires!`,
        commonMisconceptions: [
          "Misconception: Chips are manufactured one transistor at a time. (All billions of transistors across an entire wafer are created simultaneously in parallel in a single flash of light!).",
          "Misconception: Visible light can print modern 3-nanometer chips. (Visible light has wavelengths around 500nm; modern chips require Extreme Ultraviolet [EUV] at 13.5nm)."
        ],
        interactiveLab: {
          type: 'vacuum_grid',
          title: "Photolithography Mask Alignment Lab",
          instructions: "Align the Gate Mask over the Source-Drain Diffusion Wells with zero overlay error (within ±25nm tolerance).",
          parameters: { alignmentXNm: 60, alignmentYNm: -40, exposureDose: 120 },
          goalDescription: "Achieve overlay alignment under 25nm to avoid source-to-gate short circuits.",
        },
        quiz: [
          {
            question: "Why does photolithography allow billions of transistors to be built at negligible marginal cost per transistor?",
            options: [
              "Because it uses radioactive materials that multiply themselves",
              "Because light projects the entire pattern of millions of transistors across an entire wafer simultaneously in parallel",
              "Because robots hand-place each wire with miniature tweezers",
              "Because silicon transistors build themselves from liquid water"
            ],
            answerIndex: 1,
            explanation: "Photolithography is a photographic printing process. Whether a mask contains 1 transistor or 10 billion transistors, it takes the same fraction of a second to expose the pattern."
          }
        ],
        feynmanPrompt: "How is making a computer chip similar to developing an old-fashioned photograph in a darkroom?"
      },
      {
        id: "5.3",
        stageNumber: 5,
        subNumber: 3,
        title: "MOSFET Transistor Density Scaling",
        shortSummary: "The Field Effect Transistor: Source, Drain, and insulated Gate switching at gigahertz frequencies.",
        beginnerIntuition: "A MOSFET is a solid-state water faucet. Electricity wants to flow from Source to Drain, but a barrier of silicon blocks it. When you put a positive voltage on the Gate (which sits above an ultra-thin glass insulator), its electric field attracts a channel of electrons underneath. The barrier disappears, and electricity rushes through! Zero current flows into the gate, which means virtually zero wasted power when idle.",
        whyDirtCantDoThisYet: "The gate oxide layer must be only a few atoms thick without a single pinhole leak; otherwise, voltage punches through and burns out the chip.",
        keyArtifactUnlocked: "Complementary Metal-Oxide Semiconductor (CMOS) Inverter",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "High-energy ion implantation accelerators shooting dopant atoms",
              "Atomic Layer Deposition (ALD) reaction chambers",
              "Plasma reactive-ion etching (RIE) vacuum reactors"
            ],
            description: "Blasting boron or arsenic ions into silicon at 200,000 electron-volts to tailor semiconductor conductivity."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Automated cassette-to-cassette wafer handler tracks",
              "Closed-loop plasma dry-etch gas flow mass flow controllers (MFC)",
              "Automated wafer probers testing electrical continuity across dies"
            ],
            description: "Robots move wafers through hundreds of vacuum chambers automatically, tracking yield maps on each wafer in real time."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Design Rule Checking (DRC) design rules (e.g., minimum wire width $W$ and spacing $S$)",
              "Electronic Design Automation (EDA) abstraction layers (Verilog/VHDL logic synthesis)",
              "Foundry-fabless division of labor business models"
            ],
            description: "Engineers design chips in abstract code (Verilog) on computers; software compilers convert code into physical mask geometry."
          }
        },
        deepDiveMarkdown: `### The Magic of CMOS: Near-Zero Static Power
Early chips used NMOS logic. When an NMOS transistor was turned on to output a Logic 0, it connected a resistor between $+5\\text{V}$ and Ground, burning power continuously even when the computer was doing nothing.

#### Complementary Pairs (CMOS):
Combine two types of transistors:
1. **NMOS (pull-down):** Turns ON when gate is HIGH ($1$), connects output to Ground.
2. **PMOS (pull-up):** Turns ON when gate is LOW ($0$), connects output to $+V_{DD}$.

In a CMOS Inverter:
- **Input is 1:** NMOS is ON, PMOS is OFF. Output is connected to Ground. No path exists between $+V_{DD}$ and Ground!
- **Input is 0:** NMOS is OFF, PMOS is ON. Output is connected to $+V_{DD}$. No path exists between $+V_{DD}$ and Ground!
**Zero current flows from power supply to ground in both static states!** The chip only consumes power during the tiny fraction of a nanosecond when switching states! This is why laptops don't instantly melt!`,
        commonMisconceptions: [
          "Misconception: Transistors consume the same amount of power sitting idle as they do running games. (In CMOS, static power is near-zero; power consumption scales directly with clock switching frequency $P \\propto C V^2 f$).",
          "Misconception: The gate of a MOSFET touches the silicon channel. (The gate is physically separated by an insulating oxide dielectric; only an electric field passes through)."
        ],
        interactiveLab: {
          type: 'vacuum_grid',
          title: "CMOS Inverter Switching Lab",
          instructions: "Toggle the input voltage between 0V and 1.2V and observe the complementary NMOS/PMOS states and dynamic switching energy.",
          parameters: { inputVolt: 0, pmosConducting: true, nmosConducting: false },
          goalDescription: "Verify that at both steady states (0V and 1.2V), through-current from VDD to GND is exactly zero.",
        },
        quiz: [
          {
            question: "Why was the invention of CMOS (Complementary MOS) critical for packing billions of transistors onto a single silicon chip without overheating?",
            options: [
              "Because CMOS transistors are made of ice",
              "Because in CMOS, either the pull-up or pull-down transistor is always OFF in steady state, drawing near-zero direct current from power to ground when idle",
              "Because CMOS runs without electrical power",
              "Because CMOS transistors only work in the winter"
            ],
            answerIndex: 1,
            explanation: "In CMOS, NMOS and PMOS operate complementarily. There is never a direct open resistive path between power and ground in steady state, slashing static power dissipation."
          }
        ],
        feynmanPrompt: "Why does a laptop stay relatively cool when you're just staring at an idle screen, but gets hot when you play a 3D game?"
      }
    ]
  },
  {
    stageNumber: 6,
    title: "Microprocessors, Compilers & Systems Software",
    subtitle: "Bus Architectures, Self-Bootstrapping Compilers & OS Kernels",
    themeColor: "cyan-500",
    accentBg: "from-cyan-950/40 to-stone-900/60",
    badge: "Stage 06",
    summary: "From raw silicon transistors to arithmetic logic units, machine instructions, compiler self-bootstrapping, and preemptive operating system kernels.",
    subModules: [
      {
        id: "6.1",
        stageNumber: 6,
        subNumber: 1,
        title: "Microprocessor Subsystems & Bus Architectures",
        shortSummary: "ALU, Program Counter, Register Files, and Tri-State shared bus architectures.",
        beginnerIntuition: "How do 100,000 transistors cooperate to follow orders? A CPU has three main parts: registers (tiny scratchpads that hold numbers), an Arithmetic Logic Unit (an ALU that does math), and a Control Unit (a conductor reading instructions from memory). They all share a highway of wires called a Bus. Tri-state switches ensure only one part talks on the bus at a time.",
        whyDirtCantDoThisYet: "If two circuits try to output high and low voltages onto the same wire simultaneously, they short-circuit and burn out.",
        keyArtifactUnlocked: "8-bit Microprocessor Core (Registers, ALU & Control Sequencer)",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Multi-channel digital logic analyzers with bus decoders",
              "Wire-wrap prototyping boards and zero-insertion-force (ZIF) sockets",
              "Ultraviolet EPROM programmers for storing bootstrap microcode"
            ],
            description: "Tools to probe 32 address and data lines simultaneously at nanosecond intervals to catch timing bugs."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Direct Memory Access (DMA) hardware transfers without CPU intervention",
              "CPU hardware interrupt vector priority encoders",
              "Bus arbitration logic ensuring only one master drives the bus"
            ],
            description: "Interrupts: when a keyboard key is pressed, hardware physically pauses the CPU, saves its registers, runs the handler, and resumes seamlessly."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Instruction Set Architecture (ISA) specifications (x86, ARM, RISC-V)",
              "Bus protocols (PCI, SPI, $I^2C$, Memory bus timing diagrams)",
              "Endianness definitions (Big-Endian vs Little-Endian standard agreements)"
            ],
            description: "Writing down a formal contract between hardware and software: the Instruction Set Architecture (ISA)."
          }
        },
        deepDiveMarkdown: `### The Tri-State Buffer: Sharing a Common Wire
If chip $A$ outputs $+5\\text{V}$ (Logic 1) and chip $B$ outputs $0\\text{V}$ (Logic 0) onto the same wire, massive current flows through the chips, frying them.

#### The Third State: High Impedance (Hi-Z):
A Tri-State buffer has an **Output Enable (OE)** pin:
- If $\\text{OE} = 1$: It outputs its digital 0 or 1.
- If $\\text{OE} = 0$: It completely disconnects its output internally! It behaves like a severed wire (infinite resistance).

By orchestrating the Control Unit, when reading RAM:
1. RAM sets its $\\text{OE} = 1$ to drive the data bus.
2. Registers set their $\\text{OE} = 0$ (listen mode only).
Only one driver speaks; everyone else listens!`,
        commonMisconceptions: [
          "Misconception: The CPU does all calculations in RAM. (Calculations only happen in CPU internal registers; RAM is just a distant storage warehouse).",
          "Misconception: A 64-bit computer is twice as fast as a 32-bit computer. (64-bit means it can process 64-bit integer words and address exponentially more RAM in a single instruction)."
        ],
        interactiveLab: {
          type: 'binary_bootstrap',
          title: "Microprocessor Bus Arbitration Lab",
          instructions: "Coordinate Control Signals for a LOAD R1, [0x2A] instruction: assert Address Bus, assert RAM Read, latch Register R1, and assert Clock Tick.",
          parameters: { step: 0, addressValid: false, memRead: false, regLatch: false },
          goalDescription: "Execute the 4-phase bus transfer without bus contention or race conditions.",
        },
        quiz: [
          {
            question: "What is the primary function of a Tri-State Buffer in a microprocessor's shared bus architecture?",
            options: [
              "To make numbers three times bigger",
              "To allow multiple chips to connect to the same wire by placing all inactive chips into a High-Impedance (Hi-Z) disconnected state",
              "To turn AC electricity into DC electricity",
              "To cool the CPU"
            ],
            answerIndex: 1,
            explanation: "Without tri-state buffers, multiple devices driving conflicting voltages onto a shared bus would cause short circuits. Hi-Z acts like an open disconnect switch."
          }
        ],
        feynmanPrompt: "Why is a computer's bus called a 'bus', and how do chips avoid talking over each other on the same wire?"
      },
      {
        id: "6.2",
        stageNumber: 6,
        subNumber: 2,
        title: "The Software Stack Bootstrap",
        shortSummary: "Bootloader switches, assemblers, and self-bootstrapping compilers (writing C in C).",
        beginnerIntuition: "How do you write a program before a program editor exists? You toggle binary switches by hand into memory to write a 10-instruction program that can read a paper tape. That tape contains an assembler that reads text. You use that assembler to write a simple C compiler. Then you rewrite the C compiler in C and compile it with itself! This is the magical recursive ladder of computing.",
        whyDirtCantDoThisYet: "Hardware only understands raw 0s and 1s; every high-level language requires an existing translator running on the machine.",
        keyArtifactUnlocked: "Self-Hosting C Compiler & Native Macro Assembler",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Front-panel binary toggle switches and hex keypad consoles",
              "Paper-tape and magnetic cassette loader programs",
              "Hexadecimal binary monitors and interactive disassemblers"
            ],
            description: "Hand-entering hex bytes like 0xB8 0x2A 0x00 to write the initial 20 bytes of bootstrap machine code."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Compiler self-bootstrapping pipelines (Stage 1 compiler compiles Stage 2 compiler)",
              "Automated linkers resolving memory addresses across object files",
              "Continuous automated regression test suites"
            ],
            description: "Compiling a compiler: $Compiler_{new}$ written in language $L$ is fed into $Compiler_{old}$ to emit an optimized binary executable of itself!"
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Open-source code distribution repositories and licenses (GPL, BSD)",
              "Source code version control systems (diff, patch, git)",
              "Formal grammar language standards (Backus-Naur Form, ANSI C standard)"
            ],
            description: "Text files describing source code can be copied infinitely, shared across continents, and preserved for decades."
          }
        },
        deepDiveMarkdown: `### The Compiler Bootstrapping Triad (T-Diagram)
A compiler translates language $S$ (Source) into language $T$ (Target), and is itself written in language $I$ (Implementation):
$$[S \\rightarrow T]_I$$

#### The Bootstrap Sequence:
1. **Stage 0:** You write a tiny, dirty compiler for a subset of C ($C_0$) by hand in raw Assembly: $[C_0 \\rightarrow \\text{ASM}]_\\text{ASM}$.
2. **Stage 1:** In that tiny subset $C_0$, you write a full C compiler ($C_\\text{full}$):
   $$\\text{Feed } [C_\\text{full} \\rightarrow \\text{ASM}]_{C_0} \\text{ into } [C_0 \\rightarrow \\text{ASM}]_\\text{ASM} \\implies [C_\\text{full} \\rightarrow \\text{ASM}]_\\text{ASM}$$
3. **Stage 2 (Self-Hosting):** Now you compile $C_\\text{full}$ USING $C_\\text{full}$!
   From this point on, you never touch assembly again! The compiler compiles itself forever!`,
        commonMisconceptions: [
          "Misconception: C compilers are written in Assembly language. (Virtually all production C and C++ compilers are written in C and C++ and compile themselves).",
          "Misconception: The computer executes C code directly. (The computer only executes binary numbers representing CPU opcode pulses)."
        ],
        interactiveLab: {
          type: 'binary_bootstrap',
          title: "Bootloader Switch Toggling Lab",
          instructions: "Enter the 4-instruction machine code sequence (LOAD, ADD, STORE, JUMP) using binary toggle switches to boot the first software loader.",
          parameters: { switchBits: "00000000", pcAddress: 0, memLoaded: false },
          goalDescription: "Successfully write the 4 instructions into RAM and trigger the execute jump vector.",
        },
        quiz: [
          {
            question: "What does it mean for a programming language compiler to be 'self-hosting'?",
            options: [
              "It runs in the cloud without a server",
              "The compiler is written in the very programming language that it compiles, and it can compile its own source code",
              "It doesn't require electricity",
              "It is hosted on a web browser"
            ],
            answerIndex: 1,
            explanation: "A self-hosting compiler is written in the high-level language it targets. Once bootstrapped once, subsequent versions of the compiler are built by compiling its own source code."
          }
        ],
        feynmanPrompt: "How can the first C compiler ever be written if you need a C compiler to compile C code?"
      },
      {
        id: "6.3",
        stageNumber: 6,
        subNumber: 3,
        title: "Operating System Kernels & File Systems",
        shortSummary: "Preemptive multitasking, virtual memory paging, and Unix file systems.",
        beginnerIntuition: "Without an operating system, only one program can run, and if it crashes, the whole computer freezes. An operating system is like an air traffic controller. It uses a hardware timer to interrupt the CPU every 10 milliseconds, pauses Program A, gives Program B a turn, and swaps back—so fast you think both are running at once. It also gives every program its own fake illusion of memory (Virtual Memory) so buggy apps can't overwrite each other.",
        whyDirtCantDoThisYet: "Without hardware Memory Management Units (MMU) and timer interrupts, programs can steal all CPU time or snoop on private data.",
        keyArtifactUnlocked: "Preemptive POSIX Kernel & Page-Table MMU Driver",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Kernel build toolchains and cross-compilers",
              "Hardware debuggers with JTAG hardware breakpoint probes",
              "Virtual machine emulators (QEMU) for rapid kernel iteration"
            ],
            description: "Debugging code that runs in raw supervisor mode before any screen or print function exists."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Preemptive thread scheduling driven by timer tick interrupts",
              "Dynamic virtual memory page-fault swapping to disk",
              "Automated file system crash journal replay (ext4/ZFS)"
            ],
            description: "If an app tries to access memory that is swapped to disk, hardware automatically pauses the thread, reads the disk block, and resumes."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Multi-user permission models (root, users, file read/write/execute bits)",
              "POSIX system call standardization (fork, exec, read, write)",
              "Software package managers and dependency resolution ecosystems"
            ],
            description: "Standard system calls meant code written for one computer could compile and run on any machine running a compatible kernel."
          }
        },
        deepDiveMarkdown: `### The Magic of Virtual Memory (Paging)
Physical RAM might only be 4 Gigabytes, scattered in messy fragments.

#### The Page Table & MMU:
The CPU contains a hardware **Memory Management Unit (MMU)**:
- Every process thinks it owns a private, clean 64-bit address space starting at address $0x00000000$.
- When a program reads address $0x1000$, the MMU looks up the process's **Page Table**:
  $$\\text{Virtual Address } 0x1000 \\longrightarrow \\text{Physical RAM } 0x8A42000$$
- If Program A tries to touch Program B's memory, the MMU refuses and triggers a **Hardware Segmentation Fault (SIGSEGV)**, instantly terminating only the rogue program while the rest of the OS continues running flawlessly!`,
        commonMisconceptions: [
          "Misconception: A single-core CPU runs multiple apps at the exact same instant. (It rapidly switches between them thousands of times a second via preemptive time slicing).",
          "Misconception: An app crashes because it damaged the operating system. (Protected virtual memory isolates user applications from the kernel; user apps crash in a padded sandbox)."
        ],
        interactiveLab: {
          type: 'binary_bootstrap',
          title: "Preemptive Context Switch Lab",
          instructions: "Handle a Timer Interrupt: save Process A's register state to its Stack, swap the Page Directory Base pointer, and restore Process B's registers.",
          parameters: { processRunning: 'A', timerInterrupt: true, contextSaved: false },
          goalDescription: "Execute the context switch and resume Process B with zero state corruption.",
        },
        quiz: [
          {
            question: "How does an operating system kernel prevent an infinite loop in a buggy program from freezing the entire computer forever?",
            options: [
              "By asking the user to press power",
              "A hardware timer chip generates periodic interrupts that forcibly wrest control of the CPU away from the running program back to the kernel scheduler",
              "The computer gets too hot and resets itself",
              "The compiler removes all infinite loops"
            ],
            answerIndex: 1,
            explanation: "Preemptive multitasking relies on hardware timer interrupts. Even if a program is stuck in a while(1) loop, the timer interrupt fires, pausing the program and giving the OS scheduler control."
          }
        ],
        feynmanPrompt: "How can a computer play music, download a file, and let you type in a document all at the same time on a single CPU core?"
      }
    ]
  },
  {
    stageNumber: 7,
    title: "Closed-Loop CNC Machining & Automated Cleanroom Fabs",
    subtitle: "Precision Servo Feedback & The ISO Class 1 Semiconductor Fab",
    themeColor: "blue-500",
    accentBg: "from-blue-950/40 to-stone-900/60",
    badge: "Stage 07",
    summary: "Closing the loop between code and metal: CNC 5-axis machining with optical encoders, and fully robotic ISO Class 1 semiconductor mega-fabs.",
    subModules: [
      {
        id: "7.1",
        stageNumber: 7,
        subNumber: 1,
        title: "CNC Machining & Precise Motor Control",
        shortSummary: "Optical rotary encoders, recirculating ball screws, and closed-loop PID servo motor motion.",
        beginnerIntuition: "Early machines were hand-cranked by machinists who could make mistakes. A CNC (Computer Numerical Control) machine reads digital code (G-code) and moves cutting tools with micron precision. High-resolution optical discs (encoders) read the motor's exact position 10,000 times a second. If cutting resistance pushes the tool back even a fraction of a hair, the servo amplifier pumps in extra current to push right back!",
        whyDirtCantDoThisYet: "Backlash in normal gears makes precise bidirectional positioning impossible without zero-backlash ball screws.",
        keyArtifactUnlocked: "5-Axis CNC Milling Center & Closed-Loop AC Brushless Servo",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Glass optical rotary and linear glass scale encoders",
              "Preloaded ground recirculating ball screws with zero backlash",
              "Tungsten carbide and polycrystalline diamond (PCD) endmills",
              "Rigid polymer-concrete and cast meehanite machine beds"
            ],
            description: "Machine frames so heavy and rigid that vibrations from spinning 24,000 RPM cutters are absorbed into the bedrock."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Real-time PID (Proportional-Integral-Derivative) closed-loop motor positioning",
              "Multi-axis G-code trajectory kinematic lookahead planning",
              "Automatic tool changers (ATC) with tool-wear laser measuring"
            ],
            description: "PID controllers compute motor torque corrections every 100 microseconds to maintain exact planned tool paths."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Computer-Aided Manufacturing (CAM) toolpath generation standards",
              "G-code dialect standardization (ISO 6983)",
              "Geometric Dimensioning and Tolerancing (GD&T) drafting frameworks"
            ],
            description: "Designing a part on a 3D CAD program in Tokyo and machining the exact duplicate in Berlin from the same digital model."
          }
        },
        deepDiveMarkdown: `### The PID Control Loop in Modern Motion
At any moment, you have a **Target Position** $r(t)$ and an **Actual Position** measured by the optical encoder $y(t)$.
The error is:
$$e(t) = r(t) - y(t)$$

#### The Servo Drive Output:
$$u(t) = K_p e(t) + K_i \\int_0^t e(\\tau) d\\tau + K_d \\frac{de(t)}{dt}$$
1. **Proportional ($K_p$):** Pushes harder the further away the tool is from target.
2. **Integral ($K_i$):** Eliminates tiny steady-state errors by building up force over time.
3. **Derivative ($K_d$):** Acts as a shock absorber, predicting overshoot and slowing the motor down just before it reaches the goal!
This delivers silky-smooth, vibration-free movements accurate to 0.001 millimeters!`,
        commonMisconceptions: [
          "Misconception: Stepper motors are used in high-end aerospace machining. (Steppers are open-loop and can skip steps without knowing it; aerospace CNC machines use closed-loop brushless AC servos with optical glass scales).",
          "Misconception: More power always means better cutting. (Deflection and vibration ruin surface finish; rigid harmonic damping matters far more)."
        ],
        interactiveLab: {
          type: 'pid_control',
          title: "CNC Axis PID Servo Tuning Lab",
          instructions: "Tune Proportional ($K_p$), Integral ($K_i$), and Derivative ($K_d$) gains on a ball-screw linear slide to eliminate position hunting and overshoot.",
          parameters: { kp: 25, ki: 2.1, kd: 1.4, trackingErrorUm: 1.2 },
          goalDescription: "Achieve positioning settling time < 15ms with 0 micron steady-state error under cutting load.",
        },
        quiz: [
          {
            question: "What happens if a CNC machine tool uses a standard threaded screw instead of a preloaded recirculating ball screw?",
            options: [
              "The screw melts instantly",
              "Mechanical backlash (slop between screw threads) causes positioning errors whenever the motor reverses direction",
              "The machine cannot read G-code",
              "Electricity leaks out of the tool"
            ],
            answerIndex: 1,
            explanation: "Ordinary screws have clearance slop (backlash). When reversing direction, the motor turns slightly before moving the table. Preloaded ball screws eliminate this play completely."
          }
        ],
        feynmanPrompt: "How does a machine know its exact position down to a millionth of a meter while cutting heavy steel?"
      },
      {
        id: "7.2",
        stageNumber: 7,
        subNumber: 2,
        title: "The ISO Class 1 Semiconductor Fab",
        shortSummary: "Robotic wafer pods (FOUPs), Extreme Ultraviolet (EUV) mirrors, and plasma etch chemistry.",
        beginnerIntuition: "At the 3-nanometer scale, a single speck of dust looks like a giant boulder that crushes the entire circuit. In an ISO Class 1 cleanroom, there are fewer than 10 particles of dust per cubic meter of air (ordinary room air has 35,000,000 particles!). Humans almost never touch wafers; overhead robotic trains carry sealed pods (FOUPs) between machines that use Extreme Ultraviolet light bounced off atomic mirrors in high vacuums.",
        whyDirtCantDoThisYet: "At 13.5 nanometer EUV wavelengths, light is absorbed by regular glass and air! Everything must operate inside an absolute vacuum using reflective multi-layer molybdenum-silicon mirrors.",
        keyArtifactUnlocked: "EUV Lithography Scanner & Automated FOUP Monorail",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Multi-layer Bragg molybdenum/silicon mirrors with 0.1nm surface roughness",
              "Molten tin droplet laser plasma generators (50,000 droplets/sec shot by $CO_2$ lasers)",
              "Sealed Front Opening Unified Pods (FOUPs) purged with ultra-pure nitrogen",
              "ULPA filter ceilings and raised perforated laminar airflow floors"
            ],
            description: "Shooting microscopic molten tin droplets with high-power pulsed lasers twice in mid-air to create a plasma ball as hot as the sun that emits EUV light."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Automated Material Handling Systems (AMHS) overhead monorail transport",
              "In-situ closed-loop plasma dry-etch optical emission spectroscopy (OES)",
              "Real-time automated defect review and wafer yield classification AI"
            ],
            description: "Overhead robotic vehicles zip through miles of ceiling tracks, delivering 300mm wafer pods to hundreds of vacuum tools with zero human hands."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Computer Integrated Manufacturing (CIM) and MES fab-wide scheduling systems",
              "Statistical Process Control (SPC) six-sigma quality governance",
              "Global semiconductor supply chain allocation frameworks"
            ],
            description: "Coordinating 1,500 distinct sequential chemical and physical process steps across 3 months of non-stop wafer processing."
          }
        },
        deepDiveMarkdown: `### The Impossible Physics of Extreme Ultraviolet (EUV)
Why did EUV take 30 years and tens of billions of dollars to invent?
- **Wavelength:** $13.5\\text{ nm}$ (right on the edge of X-rays).
- At this wavelength, **EVERYTHING ABSORBS LIGHT**: air, water, lenses, quartz glass!

#### How an EUV Scanner Works:
1. **The Light Source:** A generator drops 50,000 droplets of molten tin per second. A pulsed laser hits each droplet once to flatten it into a pancake, then hits it a second time with 20 kilowatts to vaporize it into tin plasma, radiating $13.5\\text{nm}$ photons!
2. **The Mirrors:** Because lenses cannot be used, light is steered by curved mirrors coated with 50 alternating atomic layers of Molybdenum and Silicon. The mirror surface is so flat that if it were enlarged to the size of Germany, the highest bump would be less than 1 millimeter high!
3. **The Result:** Billions of transistors packed into an area the size of a postage stamp!`,
        commonMisconceptions: [
          "Misconception: Modern fabs have hundreds of people in white suits walking around holding wafers. (Humans are banned from modern fab interiors; operations are 99% automated robotics).",
          "Misconception: EUV uses lenses like cameras. (Glass lenses absorb EUV photons completely; only atomic reflective mirrors can steer the beam in high vacuum)."
        ],
        interactiveLab: {
          type: 'czochralski_pull',
          title: "EUV Tin Droplet Laser Timing Lab",
          instructions: "Synchronize the prep-pulse and main laser pulse timing to hit a falling 25-micron molten tin droplet and maximize 13.5nm EUV plasma conversion.",
          parameters: { prepPulseDelayUs: 1.2, mainPulsePowerKw: 22, tinDropletFrequencyKhz: 50 },
          goalDescription: "Achieve 5.2% EUV conversion efficiency with zero tin splatter debris.",
        },
        quiz: [
          {
            question: "Why cannot standard glass lenses be used to focus light in Extreme Ultraviolet (EUV) semiconductor lithography?",
            options: [
              "Because glass lenses are too heavy for robots",
              "Because EUV light has such short wavelengths (13.5nm) that it is completely absorbed by optical glass, air, and lenses",
              "Because glass lenses reflect all light like mirrors",
              "Because EUV light makes glass explode"
            ],
            answerIndex: 1,
            explanation: "EUV photons are absorbed by virtually all solid materials and gases, including glass and ambient air. The optical path must be in high vacuum using specialized multi-layer reflective mirrors."
          }
        ],
        feynmanPrompt: "Why does making modern computer chips require a room cleaner than an operating table and light that can't travel through air?"
      }
    ]
  },
  {
    stageNumber: 8,
    title: "Mass Parallel Compute, Accelerators & Local Knowledge Repositories",
    subtitle: "Systolic Matrix Arrays, High-Speed Fabrics & Dense Local Repositories",
    themeColor: "violet-500",
    accentBg: "from-violet-950/40 to-stone-900/60",
    badge: "Stage 08",
    summary: "From general CPUs to massively parallel matrix accelerators (TPUs/GPUs), systolic arrays, optical interconnects, and local offline knowledge archives.",
    subModules: [
      {
        id: "8.1",
        stageNumber: 8,
        subNumber: 1,
        title: "Parallel Processing & Matrix Hardware",
        shortSummary: "Systolic arrays, tensor processing units, and high-bandwidth memory (HBM).",
        beginnerIntuition: "A CPU is like an Olympic sprinter: it solves one hard math problem at blistering speed. But modern AI is almost entirely giant grids of numbers multiplying each other (matrix multiplication). A Matrix Accelerator (GPU/TPU) is like an army of 10,000 elementary school kids: none of them is a genius, but working side-by-side, they can do a trillion simple multiplications simultaneously in a single second using a 'Systolic Array' that passes numbers like a bucket brigade without fetching them from memory every time.",
        whyDirtCantDoThisYet: "Reading and writing numbers from distant RAM wastes 100 times more energy than the math itself (the von Neumann memory wall).",
        keyArtifactUnlocked: "Systolic Array Matrix Processing Unit & High-Bandwidth Memory Stack",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "High-Density Interconnect (HDI) substrate packaging with micro-bumps",
              "Through-Silicon Vias (TSV) stacking memory dies vertically directly onto compute",
              "Micro-channel liquid cold plates dissipating 1,000 Watts per chip package",
              "Surface-mount automated pick-and-place high-precision vision gantries"
            ],
            description: "Stacking 8 layers of DRAM chips directly on top of the silicon processor with thousands of microscopic vertical copper wires."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Systolic array lockstep matrix multiply-accumulate (MAC) data streams",
              "Dynamic voltage and frequency scaling (DVFS) thermal throttling",
              "Automated hardware fault lane remapping"
            ],
            description: "Systolic flow: data flows rhythmically across a 2D grid of processing units like blood pumped through a heart (systole), reusing inputs across neighbors."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "High-performance compute cluster topologies and scheduling (Slurm, Kubernetes)",
              "Hardware acceleration abstractions (CUDA, ROCm, OpenCL, XLA compilers)",
              "Standardized low-precision floating point formats (FP16, BF16, FP8, INT4)"
            ],
            description: "Switching from 64-bit precision to 8-bit brain-floating point (BF16) multiplied computing throughput by ten with zero loss in AI capability."
          }
        },
        deepDiveMarkdown: `### The Systolic Array: Defeating the Memory Wall
To compute matrix multiplication $C = A \\times B$:
Each element is a dot product:
$$C_{i,j} = \\sum_{k} A_{i,k} \\cdot B_{k,j}$$
In a traditional CPU, to do one multiplication and addition (MAC):
1. Read $A$ from memory (wastes 10 picojoules).
2. Read $B$ from memory (wastes 10 picojoules).
3. Compute $A \\times B + C$ in ALU (takes only 0.1 picojoules!).
4. Write $C$ to memory (wastes 10 picojoules).
**99% of energy is wasted just moving bits back and forth across wires!**

#### The Systolic Solution:
Arranged in a 2D grid of Processing Elements (PEs):
- $A$ enters from the left and slides rightwards to its neighbor each clock tick.
- $B$ enters from the top and slides downwards each clock tick.
- Every PE multiplies the two values passing through it, adds to its internal sum, and hands the numbers to its neighbors!
**Every number read from memory is reused hundreds of times inside the grid before returning to RAM!**`,
        commonMisconceptions: [
          "Misconception: AI requires supercomputers with 1,000-core super CPUs. (CPUs are poorly suited for AI; specialized systolic matrix engines perform orders of magnitude more operations per watt).",
          "Misconception: Neural networks require 64-bit double precision math. (Neural networks are inherently error-tolerant; 8-bit and 4-bit numbers work brilliantly)."
        ],
        interactiveLab: {
          type: 'systolic_array',
          title: "2x2 Systolic Array Matrix Multiplication Lab",
          instructions: "Feed Matrix A rows from the left and Matrix B columns from the top. Advance clock cycles to watch data reuse across processing elements.",
          parameters: { clockCycle: 0, pe00Sum: 0, pe01Sum: 0, pe10Sum: 0, pe11Sum: 0 },
          goalDescription: "Complete the 2x2 matrix dot product accumulation in 4 clock cycles.",
        },
        quiz: [
          {
            question: "Why does a Systolic Array matrix processor consume dramatically less energy than a traditional CPU when performing large matrix multiplications?",
            options: [
              "Because it uses solar power",
              "Because data flows directly between neighboring processing elements in a grid, reusing each number many times without fetching it from memory over and over",
              "Because it calculates answers without multiplying",
              "Because it only works when the computer is turned off"
            ],
            answerIndex: 1,
            explanation: "The systolic array architecture keeps data moving directly across an array of execution units, bypassing the energy-hungry memory bus bottleneck."
          }
        ],
        feynmanPrompt: "Why is a systolic array compared to a human bucket brigade putting out a fire?"
      },
      {
        id: "8.2",
        stageNumber: 8,
        subNumber: 2,
        title: "Interconnects & High-Speed Networks",
        shortSummary: "Fiber optics, high-speed InfiniBand switches, and local multi-node scale-out fabrics.",
        beginnerIntuition: "One matrix accelerator chip can train small models, but frontier AI models are too massive to fit on a single chip. You must link thousands of chips together into one giant brain. Regular copper cables degrade at 100 gigabits, so you use laser pulses traveling through hair-thin glass fiber optics with switches that route petabytes per second with microsecond latency.",
        whyDirtCantDoThisYet: "Standard Ethernet networks have unpredictable packet drops and buffer bloat that stall distributed training clusters.",
        keyArtifactUnlocked: "Optical Transceiver & Low-Latency InfiniBand Switch Fabric",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Electric arc fiber optic core alignment fusion splicers",
              "Distributed feedback (DFB) laser diode optical transceivers",
              "Multi-layer high-frequency PCB backplanes with controlled impedance traces"
            ],
            description: "Melting two strands of glass thinner than a hair together with an electric arc so perfectly that laser light passes through without reflecting."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Remote Direct Memory Access (RDMA) bypassing OS kernel networking overhead",
              "Adaptive cut-through packet routing avoiding congestion hotspots",
              "Automated forward error correction (FEC) link integrity monitoring"
            ],
            description: "RDMA allows GPU 1 on Node A to write directly into the VRAM of GPU 8 on Node B over the network in 1 microsecond without touching either CPU's operating system!"
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Distributed collective communication primitives (All-Reduce, All-Gather, Ring-Reduce)",
              "Fat-tree and dragonfly network topology architecture standards",
              "Cluster health monitoring and node failover orchestration"
            ],
            description: "Organizing thousands of parallel GPUs so they synchronize their math gradients simultaneously without causing network traffic jams."
          }
        },
        deepDiveMarkdown: `### The Ring All-Reduce Algorithm
When 1,000 GPUs are training a neural network, each GPU calculates a gradient vector $\\Delta W$ on its local data. Before taking a step, they must all calculate the **average gradient across all GPUs**.

Sending all data to a single central server causes a massive bandwidth bottleneck.

#### The Ring Solution:
Arrange the $N$ GPUs logically in a circle:
1. Each GPU divides its gradient into $N$ equal chunks.
2. In each step, GPU $i$ sends chunk $k$ to its neighbor GPU $i+1$, while receiving from GPU $i-1$.
3. When it receives a chunk, it adds it to its own chunk!
4. After $2(N-1)$ steps, every single GPU has the complete reduced sum!
**The total data sent per GPU is completely independent of the number of GPUs in the cluster! It scales to tens of thousands of chips!**`,
        commonMisconceptions: [
          "Misconception: You can train massive frontier AI models over home Wi-Fi or public internet. (Latency and bandwidth constraints require tens of terabits per second of non-blocking fabric; latency must be sub-microsecond).",
          "Misconception: Fiber optics carry light through open hollow air. (Light bounces down a solid core of ultra-pure silica glass via Total Internal Reflection)."
        ],
        interactiveLab: {
          type: 'systolic_array',
          title: "Ring All-Reduce Synchronization Lab",
          instructions: "Coordinate a 4-node Ring All-Reduce communication round to synchronize neural network gradients across nodes in 3 ring steps.",
          parameters: { stepNumber: 1, node0Chunk: 1, node1Chunk: 1, node2Chunk: 1, node3Chunk: 1 },
          goalDescription: "Achieve uniform distributed parameter convergence with minimal network idle bubbles.",
        },
        quiz: [
          {
            question: "Why is RDMA (Remote Direct Memory Access) essential for multi-node AI cluster training?",
            options: [
              "Because it encrypts data with passwords",
              "Because it lets GPUs transfer data directly across the network into remote GPU memory without interrupting or passing through the host operating system kernel",
              "Because it makes cables longer",
              "Because it doesn't require electricity"
            ],
            answerIndex: 1,
            explanation: "Standard networking requires copying data into OS kernel buffers, creating CPU interrupts and high latency. RDMA bypasses the CPU and OS entirely, enabling hardware-to-hardware direct VRAM transfers."
          }
        ],
        feynmanPrompt: "Why is syncing thousands of GPUs together like a choir trying to sing the exact same note at the same millisecond?"
      }
    ]
  },
  {
    stageNumber: 9,
    title: "Zero-Data AI: Synthetic Engines, Self-Play & First-Principles Learning",
    subtitle: "Physics Simulators, World Models & Curious Reinforcement Learning",
    themeColor: "fuchsia-500",
    accentBg: "from-fuchsia-950/40 to-stone-900/60",
    badge: "Stage 09",
    summary: "Bootstrapping intelligence without human internet data: procedural physics simulation, self-play reinforcement learning, latent world models, and automated empirical discovery.",
    subModules: [
      {
        id: "9.1",
        stageNumber: 9,
        subNumber: 1,
        title: "Physics Simulation Engines & Synthetic Data Generation",
        shortSummary: "Rigid-body dynamics, optical ray-tracers, and mathematical theorem bootstrapping (Zero-Internet Bootstrap).",
        beginnerIntuition: "What if you are stranded on a deserted island with zero internet, zero textbooks, and zero Wikipedia? How can an AI learn about the universe? You don't need human blogs; you build a physics simulator inside the computer using first-principles math (Newton's laws, Maxwell's equations). The AI interacts with billions of simulated worlds, learning gravity, collisions, fluid dynamics, and optics faster than real time!",
        whyDirtCantDoThisYet: "Without automated synthetic verification, AI models hallucinate because they have no physical ground-truth feedback.",
        keyArtifactUnlocked: "Differentiable Rigid-Body Physics Engine & Synthetic World Generator",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Differentiable physics and fluid dynamics simulation engines (MuJoCo, Isaac Gym)",
              "Mathematical formal proof verification checkers (Lean, Isabelle, Coq)",
              "Procedural 3D scene generators with physically-based ray-tracing renderers"
            ],
            description: "Simulating thousands of robotic hands, falling objects, and fluid interactions simultaneously on GPU clusters."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Continuous procedural world parameter randomizations (Domain Randomization)",
              "Automated synthetic data labeling (ground-truth masks and depth generated for free)",
              "Automated formal mathematical theorem exploration"
            ],
            description: "Domain Randomization: changing simulated gravity, friction, and lighting across millions of runs so the AI becomes robust to real-world chaos."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "First-principles physics axioms and conservation law enforcement",
              "Automated proof tree validation metrics",
              "Sim-to-real gap evaluation benchmarks"
            ],
            description: "The AI is never allowed to violate physical conservation of energy or momentum; ground truth is anchored in mathematical reality."
          }
        },
        deepDiveMarkdown: `### The Zero-Data Bootstrap: Nature's Loss Function
You do not need a billion human internet forum posts to learn intelligence:
1. **Mathematical Ground Truth:**
   Formal proof assistants (like Lean 4) enforce rigorous logic. If the AI suggests a step in a mathematical proof, the checker verifies it deterministically: Valid or Invalid. Zero hallucination possible!
2. **Physical Simulation:**
   Run $10,000$ virtual robots simultaneously in simulated physics. 
   - Robot drops a virtual block $\\rightarrow$ Gravity pulls it down ($F = ma$).
   - Robot misses the grasp $\\rightarrow$ Block falls. Reward = $0$.
   - Robot grasps successfully $\\rightarrow$ Tactile sensors compress. Reward = $+1$.
In 24 hours of real time, the AI experiences 500 years of physical trial-and-error experience!`,
        commonMisconceptions: [
          "Misconception: AI requires human text written by humans on the internet. (Deep reinforcement learning and self-play learn superhuman strategies without a single human demonstration).",
          "Misconception: Simulation is too clean to work in the messy real world. (Domain randomization trains policies across thousands of varying friction, mass, and sensor noise values, making it resilient to reality)."
        ],
        interactiveLab: {
          type: 'mcts_explorer',
          title: "Synthetic Domain Randomization Lab",
          instructions: "Randomize mass, surface friction, and camera lighting parameters across 1,000 simulation instances to achieve zero-shot sim-to-real transfer.",
          parameters: { frictionVariance: 0.35, massVariance: 0.2, simInstances: 1000 },
          goalDescription: "Achieve policy success rate $>92\\%$ across unseen real-world physics conditions.",
        },
        quiz: [
          {
            question: "What is 'Domain Randomization' in synthetic physics training, and why is it crucial for robotics?",
            options: [
              "Randomly deleting computer files to save space",
              "Randomly varying simulated physical parameters (friction, mass, lighting) so the AI learns a policy robust enough to work in the unpredictable real world without extra fine-tuning",
              "Buying random internet domains",
              "Using random numbers instead of math"
            ],
            answerIndex: 1,
            explanation: "Domain randomization exposes the AI policy to a wide distribution of physical variations in simulation, ensuring the real world looks just like one more variation it has already mastered."
          }
        ],
        feynmanPrompt: "How can a simulated robot that has never touched a real object learn to catch a real ball on its first try?"
      },
      {
        id: "9.2",
        stageNumber: 9,
        subNumber: 2,
        title: "Self-Play Reinforcement Learning & World Models",
        shortSummary: "AlphaZero-style self-play, Monte Carlo Tree Search (MCTS), and latent World Models.",
        beginnerIntuition: "If you have no human teacher to play chess against, how do you become a grandmaster? You play against yourself! At first, both sides make random foolish moves. But whenever White wins, the AI updates its weights. Then Black figures out the counter-move. Over millions of games of self-play, the system climbs its own ladder of intelligence, discovering strategies no human ever imagined.",
        whyDirtCantDoThisYet: "Without forward-looking tree search and latent imagination models, simple trial-and-error gets stuck in dead ends.",
        keyArtifactUnlocked: "Monte Carlo Tree Search Planner & Predictive Latent World Model",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Monte Carlo Tree Search (MCTS) search graph engines",
              "Curiosity-driven intrinsic reward formulation modules",
              "Latent space predictive World Model architectures (Dreamer, MuZero)"
            ],
            description: "A mental simulator inside the neural network that imagines future sequences of actions without executing them physically."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Autonomous self-play generation loops running 24/7",
              "Latent state predictive rollouts (imagining 20 steps into the future)",
              "Intrinsic curiosity reward maximization (exploring what it doesn't understand)"
            ],
            description: "Self-supervised imagination: the model predicts what the next sensory frame will look like, compares it to reality, and updates its understanding of physics."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Auto-curriculum generation (dynamically generating problems right at the edge of the agent's current ability)",
              "Adversarial self-evaluation tournaments with Elo rating tracking",
              "Model hallucination boundary sanity benchmarks"
            ],
            description: "The AI generates its own homework problems, making them slightly harder whenever it begins to master them."
          }
        },
        deepDiveMarkdown: `### The AlphaZero Self-Play Flywheel
1. **The Policy-Value Network:**
   - Policy head $P(s, a)$: outputs probability distribution over candidate actions.
   - Value head $V(s)$: predicts expected outcome from state $s$ (Win/Loss).
2. **MCTS Guided by Intuition:**
   Instead of searching billions of useless branches, the neural network acts as an intuitive guide, pruning away silly moves and focusing search only on promising lines.
3. **The Loss Function:**
   $$L = (z - V)^2 - \\pi^T \\log P + c \\|\\theta\\|^2$$
   The network adjusts its intuition to match the superior moves discovered by the deep tree search!
4. **The Recursive Leap:**
   Today's search result becomes tomorrow's instant intuition. Repeat for millions of self-play cycles $\\rightarrow$ **Superhuman Mastery from Scratch!**`,
        commonMisconceptions: [
          "Misconception: AI can only be as smart as the humans who wrote it. (In self-play systems like AlphaZero, the AI starts with only the rules and rapidly surpasses all human grandmasters in days).",
          "Misconception: Reinforcement learning only works for board games. (World Models apply self-play and latent simulation to mechanical assembly, chemical synthesis, and chip design)."
        ],
        interactiveLab: {
          type: 'mcts_explorer',
          title: "MCTS Exploration vs Exploitation Lab",
          instructions: "Adjust the UCT exploration parameter $c_\\text{puct}$ to balance trying unvisited branches against deepening the best current move candidate.",
          parameters: { cPuct: 1.4, treeDepth: 6, winRateConfidence: 0.84 },
          goalDescription: "Achieve optimal move selection with zero catastrophic branch pruning.",
        },
        quiz: [
          {
            question: "Why does an AI practicing self-play continuously improve without human feedback?",
            options: [
              "Because it downloads secret human strategies from the internet",
              "Because each iteration of the AI competes against a clone of itself; any weakness discovered by one side immediately forces the opposing side to develop a counter-strategy",
              "Because computers never make mistakes",
              "Because it repeats the same move over and over"
            ],
            answerIndex: 1,
            explanation: "Self-play creates an adversarial co-evolutionary arms race. Both players improve simultaneously, creating an automated curriculum of increasing difficulty without human input."
          }
        ],
        feynmanPrompt: "How can two identical computer programs playing a game against each other get smarter than any human alive?"
      },
      {
        id: "9.3",
        stageNumber: 9,
        subNumber: 3,
        title: "Sensorimotor Grounding & Empirical Real-World Discovery",
        shortSummary: "Closing the loop between simulation and reality: active vision, tactile feedback, and automated test benches.",
        beginnerIntuition: "Simulations are great, but the real world has grease, dust, wind, and unexpected friction. An intelligent system must test its ideas in the physical world. By equipping robots with cameras, force-sensing fingers, and automated chemistry test benches, the AI designs its own experiments, tests them, measures the result, and updates its understanding of reality.",
        whyDirtCantDoThisYet: "Pure software has no physical embodiment; without sensorimotor grounding, words are just floating symbols without real-world meaning.",
        keyArtifactUnlocked: "Active Vision-Tactile Probe Rig & Automated Empirical Chemistry Bench",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Stereo visual-inertial sensor camera rigs with optical flow",
              "Multi-axis tactile force-torque sensors on robotic end-effectors",
              "Automated liquid handling pipetting and spectroscopy test benches"
            ],
            description: "Giving the digital brain hands to touch and eyes to see physical matter."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Online sim-to-real system identification and domain adaptation",
              "Automated real-world experimental trial loops",
              "Tactile slip-detection reflex loops executing in sub-5 milliseconds"
            ],
            description: "Reflex loops: if a grasped object begins to slide, tactile pressure sensors immediately squeeze the robotic fingers tighter in 2ms before the brain even thinks."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Self-correcting real-world physics knowledge graphs",
              "Automated scientific hypothesis generation and Bayesian verification",
              "Safety containment envelopes for automated physical experimentation"
            ],
            description: "The AI formulates a physical hypothesis, runs an automated physical experiment, records the result, and updates its scientific model."
          }
        },
        deepDiveMarkdown: `### The Sensorimotor Grounding Hypothesis
In pure language models, the word 'heavy' is just a statistical vector close to 'weight'. 
To an **embodied agent**, 'heavy' means:
$$\\text{Target Motor Current } > 4.5\\text{ Amps} \\quad \\& \\quad \\text{Tactile Shear Stress } > 12\\text{ N}$$
This is true **grounding**: symbols linked directly to physical sensory sensations and motor consequences!

#### The Automated Discovery Loop:
1. **Hypothesize:** The AI's world model predicts that Alloy $X$ will have a tensile strength of 800 MPa.
2. **Synthesize:** An automated CNC or furnace melts and casts a sample coupon of Alloy $X$.
3. **Test:** A mechanical pull-tester stretches the coupon until it snaps, recording stress-strain curves with load cells.
4. **Update:** The real-world data is fed back into the simulator, correcting the atomic model!`,
        commonMisconceptions: [
          "Misconception: Intelligence is purely abstract math in a cloud server. (Without sensory grounding in the physical world, an AI cannot reliably manipulate real physical objects).",
          "Misconception: Robots need a human to label every object they see. (Self-supervised tactile exploration allows robots to poke and push objects to learn their physics autonomously)."
        ],
        interactiveLab: {
          type: 'mcts_explorer',
          title: "Tactile Grasp Slip-Correction Lab",
          instructions: "Tune the low-latency tactile reflex threshold to grip fragile silicon wafers firmly without crushing them or letting them slip.",
          parameters: { normalForceN: 4.8, shearThresholdN: 0.8, slipDetected: false },
          goalDescription: "Maintain zero slip across sudden accelerations while keeping normal force under fracture threshold.",
        },
        quiz: [
          {
            question: "Why is 'sensorimotor grounding' essential for creating an AI that can autonomously construct machines in the physical world?",
            options: [
              "Because robots look cooler with cameras",
              "Because an AI must connect abstract digital symbols to physical sensory inputs and motor actions (force, friction, inertia) to reliably act on physical matter",
              "Because electricity only flows through sensors",
              "Because computers cannot understand math without eyes"
            ],
            answerIndex: 1,
            explanation: "Grounding connects digital representations directly to physical reality. Without grounding, an AI has no understanding of what physical forces actually feel like or how real matter behaves under stress."
          }
        ],
        feynmanPrompt: "How does a baby learn what 'heavy' or 'slippery' means without reading a dictionary, and how does an AI do the exact same thing?"
      }
    ]
  },
  {
    stageNumber: 10,
    title: "Autonomous Embodied AI & The Closed Self-Sustaining Loop",
    subtitle: "Robotic Actuation, Spatial Autonomy & The Self-Replication Flywheel",
    themeColor: "rose-500",
    accentBg: "from-rose-950/40 to-stone-900/60",
    badge: "Stage 10",
    summary: "The final frontier of the Bootstrapped Tech Tree: autonomous mining, precision robotic arms, 3D spatial autonomy, and the closed self-sustaining industrial loop.",
    subModules: [
      {
        id: "10.1",
        stageNumber: 10,
        subNumber: 1,
        title: "Robot Mechanics & High-Torque Actuation",
        shortSummary: "Strain wave harmonic gearboxes, high-flux brushless DC stators, and Model Predictive Control (MPC).",
        beginnerIntuition: "To rebuild civilization, an AI needs hands that are as strong as an excavator but as delicate as a surgeon. Traditional gears are too clunky. By using zero-backlash harmonic wave gearboxes (flexible steel cups driven by elliptical bearings) and high-torque electric motors, robotic limbs can lift 50 kilograms while positioning parts to within 10 microns.",
        whyDirtCantDoThisYet: "Flexible backlash in ordinary motors makes high-speed robotic limbs shake violently like wet noodles.",
        keyArtifactUnlocked: "Harmonic Strain-Wave Gearbox & High-Flux BLDC Servo Actuator",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Flexible thin-wall alloy steel harmonic flexsplines",
              "Neodymium-iron-boron sintered high-energy permanent magnets",
              "Carbon-fiber composite lightweight articulated robot arm links",
              "High-resolution magnetic absolute rotary joint encoders"
            ],
            description: "Machining flexible steel gears that deform elliptically millions of times without metal fatigue failure."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Real-time Model Predictive Control (MPC) joint torque calculations running at 1 kHz",
              "Dynamic whole-body balancing and inertial compensation",
              "Zero-gravity payload impedance adaptation"
            ],
            description: "Model Predictive Control: the robot solves a mathematical physics optimization problem 1,000 times a second to plan its exact muscle movements."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Swarm robotics consensus protocols and distributed kinematic coordination",
              "Standardized robot operating interfaces (ROS 2, ZeroMQ protocols)",
              "Collision safety exclusion zones and human-collaborative safety ISO standards"
            ],
            description: "Dozens of autonomous robots working side-by-side in a workshop without bumping into each other or dropping shared parts."
          }
        },
        deepDiveMarkdown: `### The Harmonic Drive: Zero Backlash in a Tiny Package
Traditional gear trains have gear backlash (space between teeth) and weigh a lot.

#### How a Strain Wave Gear Works:
Composed of three simple concentric parts:
1. **Wave Generator:** An elliptical ball bearing on the motor shaft.
2. **Flexspline:** A flexible, thin-walled steel cup with teeth on the outside.
3. **Circular Spline:** A rigid outer ring with teeth on the inside.
The Circular Spline has **2 more teeth** than the Flexspline (e.g., 202 teeth vs 200 teeth).

As the elliptical wave generator turns:
- It deforms the flexible cup so only the opposite ends of the ellipse engage the outer ring.
- One full turn of the input shaft rotates the output cup by only **2 teeth**!
$$\\text{Gear Ratio} = \\frac{200}{2} = 100:1 \\text{ reduction!}$$
**Zero backlash, massive torque, and it fits in the palm of your hand!**`,
        commonMisconceptions: [
          "Misconception: Robots are weak unless powered by loud hydraulics. (High-flux BLDC motors with harmonic drives deliver massive torque with whisper-quiet electric efficiency).",
          "Misconception: A robot arm is programmed by recording a human moving it once. (Modern autonomous robots calculate trajectories on the fly using real-time physics MPC optimization)."
        ],
        interactiveLab: {
          type: 'self_replication',
          title: "Robotic Joint MPC Torque Tuning Lab",
          instructions: "Tune the Model Predictive Control horizon and torque limits to move a 25kg steel billet rapidly without joint overshoot or harmonic resonance.",
          parameters: { mpcHorizonSteps: 12, maxTorqueNm: 180, trajectoryTrackingErrMm: 0.4 },
          goalDescription: "Maintain trajectory tracking error under 0.5mm across high-speed direction reversals.",
        },
        quiz: [
          {
            question: "Why are harmonic strain-wave gearboxes preferred over conventional spur gears in high-precision robotic joints?",
            options: [
              "Because they are made of rubber and bounce",
              "Because their continuous multi-tooth elastic engagement provides extremely high gear reduction with zero mechanical backlash in a compact, lightweight package",
              "Because they don't require electricity",
              "Because they only work in a vacuum"
            ],
            answerIndex: 1,
            explanation: "Harmonic drives engage multiple teeth simultaneously across an elliptical flexspline, completely eliminating gear backlash slop and delivering huge gear reduction ratios in a compact footprint."
          }
        ],
        feynmanPrompt: "How can a flexible steel cup that bends like cardboard act as a super-strong gear that never wears loose?"
      },
      {
        id: "10.2",
        stageNumber: 10,
        subNumber: 2,
        title: "Spatial Perception & Cognitive Autonomy",
        shortSummary: "Solid-state LiDAR, 3D Gaussian Splatting, real-time SLAM, and zero-shot robotic grasping.",
        beginnerIntuition: "To build a factory from dirt, an AI robot must know where it is, what the environment looks like, and how to pick up any odd-shaped rock or part it has never seen before. By combining laser pulses (LiDAR) and cameras into a live 3D map of the world (SLAM), the robot sees the room in full 3D color and generates grasp poses instantly.",
        whyDirtCantDoThisYet: "2D flat pictures don't convey 3D depth, friction, or collision boundaries required for real-world navigation and manipulation.",
        keyArtifactUnlocked: "Solid-State LiDAR & Edge Neural Processing Unit (NPU)",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Solid-state optical phased array LiDAR chips",
              "Time-of-Flight (ToF) depth cameras and stereo vision pods",
              "Onboard edge Neural Processing Units (NPUs) consuming < 25W"
            ],
            description: "Firing millions of laser pulses per second to paint a 3D point cloud map of the entire environment in real time."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "Simultaneous Localization and Mapping (SLAM) continuous map updates",
              "Real-time 3D Gaussian Splatting reconstruction",
              "Zero-shot grasp affordance generation on arbitrary raw objects"
            ],
            description: "Zero-shot grasping: the robot looks at an unfamiliar jagged rock, computes contact friction cones, and grasps it stably on the first attempt."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Decentralized peer-to-peer shared world maps across robot fleets",
              "Spatial semantics tagging (classifying tools, raw ore, dangerous zones)",
              "Autonomous fleet traffic de-confliction algorithms"
            ],
            description: "Robot 1 walks into an unmapped cave, scans it, and instantly updates the 3D map for all other 50 robots in the fleet wirelessly."
          }
        },
        deepDiveMarkdown: `### Real-Time SLAM & 3D Spatial Understanding
A robot arrives at an unknown construction site:
1. **The Sensor Stream:** 
   Cameras provide RGB pixels; LiDAR provides distance points $(x, y, z)$ via Time of Flight:
   $$d = \\frac{c \\cdot \\Delta t}{2}$$
2. **Loop Closure (Where am I?):**
   As the robot moves, it matches feature landmarks against its past trajectory. When it returns to a room it visited 10 minutes ago, it recognizes the landmarks, snaps its accumulated drift error back to zero, and locks its location in place (**Loop Closure**).
3. **Affordance Prediction:**
   The neural network doesn't just see a rock; it predicts **Affordances**:
   - Where can I safely step? (Terrain traversability map).
   - Where can my fingers clamp without slipping? (Contact wrench cone).`,
        commonMisconceptions: [
          "Misconception: Robots navigate using GPS like car smartphones. (GPS has meters of error and doesn't work indoors, underground, or on other planets; robots must navigate using autonomous onboard SLAM).",
          "Misconception: A robot must be programmed with 3D CAD models of every object it touches. (Modern 3D vision models predict stable grasping points on arbitrary organic shapes in milliseconds)."
        ],
        interactiveLab: {
          type: 'self_replication',
          title: "3D SLAM Loop Closure & Grasping Lab",
          instructions: "Navigate a mobile robot through an unmapped mine tunnel, detect landmark loop closure to reset drift error, and plan a stable grasp on an ore sample.",
          parameters: { driftErrorM: 0.82, loopClosureDetected: false, graspConfidence: 0.94 },
          goalDescription: "Reset spatial drift error to < 2cm and execute stable pick-and-place.",
        },
        quiz: [
          {
            question: "Why is 'Loop Closure' in SLAM (Simultaneous Localization and Mapping) critical for long-duration autonomous robotic exploration?",
            options: [
              "It turns the robot around in a circle to look cool",
              "Sensors accumulate small measurement drift errors over time; recognizing a previously visited landmark allows the algorithm to correct all accumulated drift and rebuild an accurate global map",
              "It shuts off the battery to save power",
              "It closes all doors in the room"
            ],
            answerIndex: 1,
            explanation: "Dead reckoning from wheel encoders and IMUs drifts over distance. Loop closure recognizes that the robot has returned to a previously mapped location, allowing a global graph optimization to eliminate accumulated drift error."
          }
        ],
        feynmanPrompt: "How can a robot make a 3D map of a dark cave while walking through it, without getting lost?"
      },
      {
        id: "10.3",
        stageNumber: 10,
        subNumber: 3,
        title: "The Closed-Loop Self-Replication Cycle",
        shortSummary: "From raw soil to finished autonomous robots: closing the technological loop with zero human intervention.",
        beginnerIntuition: "This is the ultimate summit of the tech tree: The Closed Loop. Autonomous mining rovers extract silica and copper from the ground. Autonomous solar smelters refine the metals. Autonomous machine tools mill gears and frames. Autonomous cleanrooms print microchips. And robotic assembly arms put together... ANOTHER ROBOT! Once a system can build every single tool required to build itself from raw dirt, technological capability expands exponentially forever.",
        whyDirtCantDoThisYet: "A single missing component (like grease, pure acid, or glass lenses) breaks the entire chain. Every link in the triad must be fully bootstrapped.",
        keyArtifactUnlocked: "Autonomous Industrial Self-Replication Ecosystem (Von Neumann Machine)",
        triadPillars: {
          tooling: {
            title: "Needed Tools Crafting",
            items: [
              "Autonomous electric mining excavators and mineral haulers",
              "Automated metallurgical recycling smelters and induction furnaces",
              "Self-repairing modular fab workstations and toolhead changers",
              "Automated solar panel sintering beds"
            ],
            description: "The complete physical toolchain: rock excavation $\\rightarrow$ chemical refining $\\rightarrow$ precision machining $\\rightarrow$ chip fab $\\rightarrow$ assembly."
          },
          automation: {
            title: "Automated Activities",
            items: [
              "End-to-end resource extraction to finished machine assembly with zero human intervention",
              "Self-diagnostic autonomous hardware repair and component replacement",
              "Dynamic supply chain rebalancing adapting to mineral vein availability"
            ],
            description: "If an excavator arm breaks, a repair rover removes the broken arm, carries it to the recycling smelter, and installs a newly cast arm autonomously."
          },
          selfOrganization: {
            title: "Self-Organization & Governance",
            items: [
              "Fully autonomous economic production loops (energy, materials, compute)",
              "Self-optimizing industrial supply chain knowledge graphs",
              "First-principles planetary safety and containment constraints"
            ],
            description: "The technological flywheel: every unit of energy and compute invested produces more energy and compute than it consumed."
          }
        },
        deepDiveMarkdown: `### The Von Neumann Self-Replicating Machine
In 1948, mathematician John von Neumann proved mathematically that a machine could construct a copy of itself if it had three components:
1. **A Universal Constructor ($A$):** Capable of taking raw materials and constructing any mechanical or electrical part described in a blueprint.
2. **A Blueprint Duplicator ($B$):** Capable of copying the instruction blueprint without changing it.
3. **A Controller ($C$):** Coordinates $A$ to build the new machine, tells $B$ to copy the blueprint, and puts the new blueprint inside the new machine.

#### The Bootstrapping Flywheel Complete:
Look back at where we started in **Stage 1**:
- Dirt $\\rightarrow$ Charcoal $\\rightarrow$ Smelting $\\rightarrow$ Flatness $\\rightarrow$ Steam $\\rightarrow$ Wires $\\rightarrow$ Vacuum Tubes $\\rightarrow$ Silicon Crystals $\\rightarrow$ Microprocessors $\\rightarrow$ CNC $\\rightarrow$ Fabs $\\rightarrow$ Accelerators $\\rightarrow$ AI World Models $\\rightarrow$ Autonomous Robots $\\rightarrow$ **Mining the Dirt to Start Again!**
The loop is closed. Humanity or an isolated civilization now holds the blueprint to bootstrap civilization from zero to superintelligence on Earth, the Moon, Mars, or beyond!`,
        commonMisconceptions: [
          "Misconception: Self-replication requires mysterious nanotechnology. (Self-replication can be achieved with standard macro-scale industrial tools: smelters, CNC mills, pick-and-place robots, and automated fabs).",
          "Misconception: The bootstrap process skips steps. (You cannot build an EUV fab without first having precision lead screws, which requires Whitworth flatness, which requires stone scraping. Every layer stands on the shoulders of the layer below!)."
        ],
        interactiveLab: {
          type: 'self_replication',
          title: "Closed-Loop Industrial Flywheel Simulator",
          instructions: "Balance the 5 self-replication subsystems (Energy, Mining, Smelting, Fabrication, Assembly) to achieve a positive net reproduction rate ($R_0 > 1.0$).",
          parameters: { solarEfficiencyPct: 24, miningThroughputKgHr: 120, fabYieldPct: 91, netReproductionR0: 1.15 },
          goalDescription: "Sustain $R_0 \\ge 1.05$ across 3 generations of autonomous machine self-construction.",
        },
        quiz: [
          {
            question: "Why is the concept of a 'closed self-sustaining loop' considered the ultimate milestone of the bootstrapped tech tree?",
            options: [
              "Because it means machines can play video games",
              "Because once an industrial system can extract raw earth, refine materials, fabricate components, and assemble duplicates of itself without external human or internet supply chains, technological progress becomes self-sustaining and exponential",
              "Because it stops the sun from shining",
              "Because it eliminates the need for electricity"
            ],
            answerIndex: 1,
            explanation: "A closed self-sustaining industrial loop eliminates external supply chain dependencies. With energy, raw materials, and automated fabrication unified, the system can rebuild and expand civilization from first principles anywhere."
          }
        ],
        feynmanPrompt: "Summarize the entire journey from rubbing two clay rocks together in Stage 1 to a self-replicating robotic factory in Stage 10."
      }
    ]
  }
];

export const TOTAL_STAGES_COUNT = CURRICULUM_STAGES.length;
export const TOTAL_MODULES_COUNT = CURRICULUM_STAGES.reduce((acc, s) => acc + s.subModules.length, 0);

// Helper to look up any submodule by ID
export function getSubModuleById(id: string): { stage: Stage; subModule: SubModule } | null {
  for (const stage of CURRICULUM_STAGES) {
    const sub = stage.subModules.find((m) => m.id === id);
    if (sub) {
      return { stage, subModule: sub };
    }
  }
  return null;
}
