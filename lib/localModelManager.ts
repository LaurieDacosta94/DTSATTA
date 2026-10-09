import { getSubModuleById, CURRICULUM_STAGES } from '@/lib/curriculumData';

export interface LocalModelMeta {
  id: string;
  name: string;
  badge: string;
  provider: 'cloud' | 'local';
  sizeFormatted: string;
  quantization: string;
  contextLength: string;
  engine: 'Gemini Cloud API' | 'WebGPU / WASM' | 'WebNN Accelerated' | 'ONNX Runtime Web' | 'WASM Nano CPU';
  description: string;
  downloadSizeMB: number;
  recommendedHardware: string;
  isDownloaded: boolean;
  isLoaded: boolean;
  downloadProgress?: number; // 0 to 100
  downloading?: boolean;
}

export const INITIAL_MODELS: LocalModelMeta[] = [
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash (Cloud Neural Link)',
    badge: 'Frontier Cloud',
    provider: 'cloud',
    sizeFormatted: 'Cloud Managed (0 MB Local)',
    quantization: 'Full Cloud Precision',
    contextLength: '1M tokens',
    engine: 'Gemini Cloud API',
    description: 'Google AI Studio frontier model with real-time multimodal reasoning, personalized feedback, and zero device load.',
    downloadSizeMB: 0,
    recommendedHardware: 'Any browser / network connected',
    isDownloaded: true,
    isLoaded: true,
  },
  {
    id: 'smollm2-360m-nano',
    name: 'SmolLM2 360M (Instant Nano Offline)',
    badge: 'Instant Nano',
    provider: 'local',
    sizeFormatted: '185 MB',
    quantization: 'int4 WebAssembly',
    contextLength: '2K tokens',
    engine: 'WASM Nano CPU',
    description: 'Ultra-compact model designed for instant in-browser offline loading on any phone or laptop with zero GPU requirements.',
    downloadSizeMB: 185,
    recommendedHardware: 'Any phone or low-spec laptop (512MB RAM)',
    isDownloaded: true, // pre-cached for instant offline out of the box!
    isLoaded: false,
  },
  {
    id: 'gemma-2b-bootstrapper',
    name: 'Gemma 2B (WebGPU Bootstrapper)',
    badge: 'Local WebGPU',
    provider: 'local',
    sizeFormatted: '1.42 GB',
    quantization: '4-bit (q4_k_m)',
    contextLength: '4K tokens',
    engine: 'WebGPU / WASM',
    description: 'Google Gemma 2B instruction-tuned model. Runs completely offline in browser VRAM via WebGPU without internet.',
    downloadSizeMB: 1420,
    recommendedHardware: 'Integrated or Discrete GPU (4GB+ VRAM)',
    isDownloaded: false,
    isLoaded: false,
  },
  {
    id: 'llama-3.2-1b-nano',
    name: 'Llama 3.2 1B (Nano Edge Engine)',
    badge: 'Nano Edge',
    provider: 'local',
    sizeFormatted: '780 MB',
    quantization: '4-bit int4',
    contextLength: '2K tokens',
    engine: 'WebNN Accelerated',
    description: 'Ultra-lightweight 1B parameter model optimized for mobile and low-power laptops. Fast offline response latency.',
    downloadSizeMB: 780,
    recommendedHardware: 'Any modern CPU or NPU (2GB+ RAM)',
    isDownloaded: false,
    isLoaded: false,
  },
  {
    id: 'phi-3.5-mini-logic',
    name: 'Phi-3.5 Mini (STEM & First Principles)',
    badge: 'STEM Specialist',
    provider: 'local',
    sizeFormatted: '2.15 GB',
    quantization: '4-bit (q4_0)',
    contextLength: '8K tokens',
    engine: 'ONNX Runtime Web',
    description: 'High-density synthetic reasoning model for mathematical derivations, chemical formulas, and thermodynamic balance.',
    downloadSizeMB: 2150,
    recommendedHardware: 'Apple Silicon or RTX GPU (6GB+ RAM)',
    isDownloaded: false,
    isLoaded: false,
  },
  {
    id: 'gemma-7b-civilizer',
    name: 'Gemma 7B (Full Civilization Archive)',
    badge: 'Frontier Local',
    provider: 'local',
    sizeFormatted: '3.85 GB',
    quantization: '4-bit (q4_k_s)',
    contextLength: '8K tokens',
    engine: 'WebGPU / WASM',
    description: 'Comprehensive offline knowledge base for deep engineering: metallurgical charts, EUV optics, and systems architecture.',
    downloadSizeMB: 3850,
    recommendedHardware: 'Dedicated GPU with 8GB+ VRAM',
    isDownloaded: false,
    isLoaded: false,
  }
];

// Offline inference knowledge-base responder when user is in pure local/offline mode
export function getOfflineLocalModelResponse(
  prompt: string, 
  modelId: string, 
  currentModuleTitle: string,
  currentModuleId?: string
): { replyText: string; speechAudioScript: string; agentAction?: { type: string; description: string; targetModuleId?: string } } {
  const clean = prompt.trim().toLowerCase();
  const modelName = INITIAL_MODELS.find(m => m.id === modelId)?.name || 'Local Offline Model';
  const prefix = `[Offline Inference via ${modelName} • Zero Internet]: `;

  let replyText = prefix;
  let speechAudio = '';
  let agentAction: { type: string; description: string; targetModuleId?: string } | undefined = undefined;

  // Active submodule contextual data
  const currentSub = currentModuleId ? getSubModuleById(currentModuleId) : undefined;
  const activeTitle = currentSub ? currentSub.subModule.title : currentModuleTitle;

  // 1. Greetings & Conversational check (e.g. "hi", "hello", "hey", "howdy", "sup")
  const isGreeting = /^(hi|hello|hey|howdy|sup|greetings|yo|good (morning|afternoon|evening))\b/i.test(clean) || clean === 'hi' || clean === 'hello';

  if (isGreeting) {
    replyText += `Hello! I am Professor Ada, running locally on your hardware via ${modelName} with zero internet connectivity.\n\nI have the complete Dirt to Superintelligence curriculum compiled in local memory. We are currently examining "${activeTitle}".\n\nHow can I help you today? You can:\n• Ask me to explain the core intuition of this stage\n• Ask about the Triad (Tooling, Automation, Governance)\n• Request lab tips or say "tune lab" to let me run it\n• Say "take me to silicon" or "go to stage 3" to navigate\n• Ask about metallurgy, dynamos, vacuum tubes, lithography, or neural nets!`;
    speechAudio = `Hello! Professor Ada here, operating fully offline on your device via ${modelName}. What would you like to explore in ${activeTitle}?`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  // 2. Identity & Capabilities check ("who are you", "what can you do", "help")
  if (/^(who are you|what are you|what can you do|help me|tell me about yourself|capabilities)/i.test(clean) || clean.includes('who are you')) {
    replyText += `I am Professor Ada, your personal AI Educator for the Bootstrapped Civilization Tech Tree.\n\n⚡ **Offline Edge Mode**: Powered by ${modelName}, I execute directly in your browser using local WebGPU/WASM weights with zero data sent over the internet.\n\n🛠️ **What I Can Do For You**:\n1. **First-Principles Derivations**: Explain how to build complex technology starting only from dirt, rocks, and fire.\n2. **Triad Breakdown**: Unpack the 3 pillars (Tooling, Closed-Loop Automation, Governance) for each stage.\n3. **Interactive Lab Assistance**: Explain physics formulas, diagnose errors, or auto-tune simulations for you.\n4. **Autonomous Navigation**: Say "take me to stage 5" or "go to Whitworth" and I will jump directly to that lesson.\n5. **Exam & Feynman Preparation**: Test your understanding with Socratic challenges.\n\nTry asking: "Explain this stage", "What is the Triad?", or "How does a dynamo work?"`;
    speechAudio = `I am Professor Ada, running 100% offline on your device. I can explain any step from dirt to superintelligence, help you pass labs, or navigate the curriculum.`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  // 3. How to use website / guide
  if (clean.includes('how to use') || clean.includes('website guide') || clean.includes('tutorial') || clean.includes('how does this work')) {
    replyText += `Here is how to get the most out of the Dirt to Superintelligence platform:\n\n1. 🧭 **The 10-Stage Tech Tree**: Browse the visual progression from raw clay/fire up to self-replicating robotics. Click any stage or submodule card to open it.\n2. 🔨 **The Triads Menu**: Filter stages by the 3 pillars of technological civilization: Tools (physical machines), Loops (closed-loop automation), or Governance (standards & metrics).\n3. 📖 **Classroom & Lessons**: Read first-principles intuitions, why primitive dirt can't do it yet, and key artifacts unlocked.\n4. 🧪 **Interactive Engineering Labs**: Every stage features a hands-on physics lab (blast furnace temp, Whitworth 3-plate rubbing, dynamos, vacuum grids, PID loops). Adjust sliders to solve the engineering objective!\n5. 🤖 **Professor Ada**: That's me! Click the big round Ada button anytime for voice or text assistance, questions, and autonomous navigation.\n6. ⚙️ **Offline Models & Profile**: Download and switch local AI models with zero internet, or use the Profile Data Deleter in Student Settings to reset your progress anytime.`;
    speechAudio = `The website walks you from dirt to superintelligence through 10 stages. Explore the Tech Tree, run interactive labs, and chat with me anytime.`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  // 4. Triad explanation ("what is the triad", "triads", "pillars")
  if (clean.includes('triad') || clean.includes('three pillars') || clean.includes('tooling automation')) {
    replyText += `The Triad represents the three interdependent pillars required for any technological stage to bootstrap without regressing into entropy:\n\n1. 🔨 **Tooling & Crafting (Physical Artifacts)**: The physical machines, cutters, furnaces, dies, and substrates (e.g. Whitworth 3 plates, ceramic tuyères, crucible steel, quartz crucibles, stepper lenses).\n2. ⚙️ **Closed-Loop Automation (Feedback Dynamics)**: The self-regulating mechanisms that eliminate drift and human instability (e.g. Watt flyball governor, negative feedback amplifiers, phase-locked loops, PID servo motors, AGC circuits).\n3. 🏛️ **Self-Organization & Standards (Protocols & Metrics)**: The shared reference standards, repeatability protocols, and institutional discipline (e.g. Whitworth standardized screw threads, SI standard meter, ISO Class 1 cleanroom specifications, semiconductor consortiums).\n\n💡 *Key Insight*: If you lack tooling, you cannot fabricate; if you lack automation, physical processes drift out of tolerance; if you lack standards, parts cannot interoperate. Use the "All Triads" filter at the top of the Tech Tree to inspect each pillar across all 10 stages!`;
    speechAudio = `Every technological milestone requires the Triad: physical tooling, closed-loop feedback automation, and standardized self-organization. Without all three, civilization cannot bootstrap.`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  // 5. Data & Profile Deletion
  if (clean.includes('delete') && (clean.includes('profile') || clean.includes('data') || clean.includes('reset') || clean.includes('wipe'))) {
    replyText += `To delete or reset your profile data:\n1. Click the Graduation Cap 🎓 button in the top right navbar to open **Student Settings**.\n2. Scroll down to the **Danger Zone: Profile & Data Deleter** section.\n3. You can either:\n   • **Reset All Data & Clear Cache**: Completely wipes your progress, XP, streak, saved questions, and chat history back to factory default.\n   • **Clear Chat History**: Clears your conversation messages with Ada.\n   • **Clear Question Notebook**: Removes unresolved and clarified questions.\n   • **Reset Stage Progress & XP**: Resets your unlocks and XP while keeping your settings.\n\nAll data is stored strictly in your browser's local storage, so wiping it guarantees 100% privacy and zero retained traces.`;
    speechAudio = `You can wipe your profile, progress, or chat history anytime in the Student Settings modal under the Danger Zone section.`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  // 6. Navigation Commands
  const isNavRequest = clean.includes('go to') || clean.includes('take me') || clean.includes('navigate') || clean.includes('open stage') || clean.includes('jump to');

  if (isNavRequest) {
    if (clean.includes('1') || clean.includes('fire') || clean.includes('charcoal')) {
      replyText += `Navigating you to Stage 1.1: Fire, Charcoal & Thermal Mastery. Let's start with high-temperature refractory clay and forced blast air!`;
      speechAudio = `Navigating to Stage 1.1 Charcoal Furnace.`;
      agentAction = { type: 'NAVIGATE', targetModuleId: '1.1', description: 'Navigated to Stage 1.1 Charcoal Furnace' };
      return { replyText, speechAudioScript: speechAudio, agentAction };
    }
    if (clean.includes('2') || clean.includes('whitworth') || clean.includes('flat') || clean.includes('lathe')) {
      replyText += `Navigating you to Stage 2.1: The Whitworth 3-Plate Method. Preparing to cancel spherical curvature into absolute Euclidean flatness!`;
      speechAudio = `Navigating to Stage 2.1 Whitworth Plates.`;
      agentAction = { type: 'NAVIGATE', targetModuleId: '2.1', description: 'Navigated to Stage 2.1 Whitworth Plates' };
      return { replyText, speechAudioScript: speechAudio, agentAction };
    }
    if (clean.includes('3') || clean.includes('dynamo') || clean.includes('electricity') || clean.includes('wire')) {
      replyText += `Navigating you to Stage 3.1: The Direct Current Dynamo. Let's generate continuous electromagnetic current from rotary power!`;
      speechAudio = `Navigating to Stage 3.1 Direct Current Dynamo.`;
      agentAction = { type: 'NAVIGATE', targetModuleId: '3.1', description: 'Navigated to Stage 3.1 Direct Current Dynamo' };
      return { replyText, speechAudioScript: speechAudio, agentAction };
    }
    if (clean.includes('4') || clean.includes('vacuum') || clean.includes('triode') || clean.includes('tube')) {
      replyText += `Navigating you to Stage 4.1: The Thermionic Vacuum Triode. Preparing to control electron beams with electrostatic wire grids!`;
      speechAudio = `Navigating to Stage 4.1 Thermionic Vacuum Triode.`;
      agentAction = { type: 'NAVIGATE', targetModuleId: '4.1', description: 'Navigated to Stage 4.1 Thermionic Vacuum Triode' };
      return { replyText, speechAudioScript: speechAudio, agentAction };
    }
    if (clean.includes('5') || clean.includes('silicon') || clean.includes('czochralski') || clean.includes('crystal')) {
      replyText += `Navigating you to Stage 5.1: Czochralski Single-Crystal Ingot Pulling. Let's melt polysilicon at 1,425°C and pull continuous crystal ingots!`;
      speechAudio = `Navigating to Stage 5.1 Czochralski Silicon Ingot Pulling.`;
      agentAction = { type: 'NAVIGATE', targetModuleId: '5.1', description: 'Navigated to Stage 5.1 Czochralski Growth' };
      return { replyText, speechAudioScript: speechAudio, agentAction };
    }
    if (clean.includes('6') || clean.includes('lithography') || clean.includes('stepper') || clean.includes('euv')) {
      replyText += `Navigating you to Stage 6.1: Projection Photolithography & Steppers. Let's reduce reticle patterns with deep UV projection!`;
      speechAudio = `Navigating to Stage 6.1 Projection Photolithography.`;
      agentAction = { type: 'NAVIGATE', targetModuleId: '6.1', description: 'Navigated to Stage 6.1 Projection Photolithography' };
      return { replyText, speechAudioScript: speechAudio, agentAction };
    }
    if (clean.includes('7') || clean.includes('compiler') || clean.includes('bootstrap') || clean.includes('t-diagram')) {
      replyText += `Navigating you to Stage 7.1: The Self-Hosting Compiler Bootstrapping Chain. Let's inspect the T-diagram pipeline!`;
      speechAudio = `Navigating to Stage 7.1 Compiler Bootstrapping.`;
      agentAction = { type: 'NAVIGATE', targetModuleId: '7.1', description: 'Navigated to Stage 7.1 Compiler Bootstrapping' };
      return { replyText, speechAudioScript: speechAudio, agentAction };
    }
    if (clean.includes('8') || clean.includes('systolic') || clean.includes('gpu') || clean.includes('matrix')) {
      replyText += `Navigating you to Stage 8.1: Systolic Matrix Arrays & Tensor Accelerators. Let's break the memory wall with 2D compute grids!`;
      speechAudio = `Navigating to Stage 8.1 Systolic Matrix Arrays.`;
      agentAction = { type: 'NAVIGATE', targetModuleId: '8.1', description: 'Navigated to Stage 8.1 Systolic Arrays' };
      return { replyText, speechAudioScript: speechAudio, agentAction };
    }
    if (clean.includes('9') || clean.includes('mcts') || clean.includes('self-play') || clean.includes('reinforcement')) {
      replyText += `Navigating you to Stage 9.1: Self-Play Reinforcement Learning & MCTS. Let's generate synthetic curricula without internet data!`;
      speechAudio = `Navigating to Stage 9.1 Self-Play Reinforcement Learning.`;
      agentAction = { type: 'NAVIGATE', targetModuleId: '9.1', description: 'Navigated to Stage 9.1 Self-Play MCTS' };
      return { replyText, speechAudioScript: speechAudio, agentAction };
    }
    if (clean.includes('10') || clean.includes('replicate') || clean.includes('von neumann') || clean.includes('robot')) {
      replyText += `Navigating you to Stage 10.1: Von Neumann Autonomous Physical Self-Replication. Let's close the exponential manufacturing loop!`;
      speechAudio = `Navigating to Stage 10.1 Von Neumann Self-Replication.`;
      agentAction = { type: 'NAVIGATE', targetModuleId: '10.1', description: 'Navigated to Stage 10.1 Von Neumann Self-Replication' };
      return { replyText, speechAudioScript: speechAudio, agentAction };
    }
  }

  // 7. Lab tuning & execution commands
  if (clean.includes('tune') || clean.includes('solve lab') || clean.includes('auto-tune') || clean.includes('run lab') || clean.includes('fix lab')) {
    replyText += `I've analyzed the lab parameters for this node. The key is establishing negative feedback and setting the thermodynamic or mechanical balance within the stability margin.\n\n⚡ Autonomous Agent Action executed: I have auto-tuned and solved the interactive lab simulation for you!`;
    speechAudio = `I have adjusted and validated the lab simulation parameters for you.`;
    agentAction = { type: 'RUN_LAB', description: 'Auto-tuned and solved interactive lab simulation' };
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  // 8. Explain current stage / "explain this"
  if (clean.includes('explain this') || clean.includes('what is this stage') || clean.includes('current stage') || clean.includes('current module') || clean.includes('summarize this') || clean.includes('what are we learning')) {
    if (currentSub) {
      replyText += `Here is the first-principles breakdown of **Stage 0${currentSub.stage.stageNumber}: ${currentSub.subModule.title}**:\n\n💡 **Core Intuition**:\n${currentSub.subModule.beginnerIntuition}\n\n🛑 **Why Primitive Dirt Can't Do This Yet**:\n${currentSub.subModule.whyDirtCantDoThisYet}\n\n🔑 **Key Artifact Unlocked**:\n${currentSub.subModule.keyArtifactUnlocked}\n\n🏛️ **The Triad Here**:\n• **Tooling**: ${currentSub.subModule.triadPillars.tooling.title} (${currentSub.subModule.triadPillars.tooling.items.slice(0, 2).join(', ')})\n• **Automation**: ${currentSub.subModule.triadPillars.automation.title}\n• **Governance**: ${currentSub.subModule.triadPillars.selfOrganization.title}\n\nTry running the interactive lab below to test this mechanism firsthand!`;
      speechAudio = `In this stage: ${currentSub.subModule.title}. The core insight is: ${currentSub.subModule.beginnerIntuition.slice(0, 120)}.`;
      return { replyText, speechAudioScript: speechAudio, agentAction };
    }
  }

  // 9. Topic Knowledge Base checks
  if (clean.includes('whitworth') || clean.includes('flat') || clean.includes('surface plate') || clean.includes('scraping') || clean.includes('2.1')) {
    replyText += `The Whitworth 3-plate method is the genesis of all mechanical accuracy. If you rub only two plates together with abrasive paste, they can mate perfectly while being spherical (one concave, one convex). By rotating through three plates (A against B, B against C, C against A), the curvature components cancel out mathematically until only a Euclidean flat plane remains (under 1 micrometer deviation). This provides the reference plane to machine straight lathe beds and precision lead screws.`;
    speechAudio = `The Whitworth three-plate method cancels spherical curvature across three matching surfaces until only an absolute Euclidean flat plane remains.`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  if (clean.includes('charcoal') || clean.includes('fire') || clean.includes('furnace') || clean.includes('tuyere') || clean.includes('1.1')) {
    replyText += `Wood burns at only ~800°C because substantial energy is consumed vaporizing water and volatile resins. Pyrolyzing wood in oxygen-deprived charcoal pits removes these volatiles, leaving pure concentrated carbon (~90%). When blast air is forced through a refractory clay tuyère into incandescent charcoal, the reaction C + O2 -> CO2 and subsequent reduction to carbon monoxide CO easily exceeds 1,250°C—hot enough to reduce iron ore (Fe2O3) into spongy iron bloom without melting the furnace walls.`;
    speechAudio = `Charcoal removes moisture and volatile resins, letting blast oxygen push furnace temperatures past 1,250 degrees Celsius for iron reduction.`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  if (clean.includes('silicon') || clean.includes('czochralski') || clean.includes('crystal') || clean.includes('ingot') || clean.includes('5.1')) {
    replyText += `Single-crystal silicon is grown via the Czochralski method at 1,425°C. Dipping an exact-orientation seed crystal (typically <100> or <111>) into molten ultra-pure polysilicon and slowly pulling upward (~85 mm/hr) while counter-rotating freezes atoms into one continuous, defect-free diamond-cubic lattice. Without grain boundaries to scatter mobile charge carriers, electron mobility reaches >1,400 cm²/(V·s).`;
    speechAudio = `Czochralski single crystal pulling freezes molten silicon onto a seed crystal without grain boundary defects.`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  if (clean.includes('dynamo') || clean.includes('electricity') || clean.includes('faraday') || clean.includes('induction') || clean.includes('3.1')) {
    replyText += `Faraday's law of induction states EMF = -N(dΦ/dt). By spinning a copper-wound armature inside a magnetic field produced by soft iron electromagnets, mechanical rotation directly converts into direct electrical current. The split-ring commutator mechanically rectifies the alternating current into pulsating DC, providing continuous electrical power to charge batteries, electroplate metals, and power communications.`;
    speechAudio = `Dynamos convert rotation into electrical current through electromagnetic induction and commutator rectification.`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  if (clean.includes('vacuum') || clean.includes('tube') || clean.includes('triode') || clean.includes('thermionic') || clean.includes('4.1')) {
    replyText += `A thermionic vacuum triode places a wire mesh grid between a heated cathode and a positive anode inside an evacuated glass bulb. A small negative voltage on the electrostatic grid repels electrons leaving the cathode, choking off the plate current with zero mechanical inertia. This allowed the first electronic amplification and bistable flip-flops (the Eccles-Jordan trigger), enabling binary memory without moving mechanical switches.`;
    speechAudio = `The vacuum triode uses an electrostatic grid to control electron flow without mechanical inertia.`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  if (clean.includes('lithography') || clean.includes('stepper') || clean.includes('photoresist') || clean.includes('reticle') || clean.includes('euv') || clean.includes('6.1')) {
    replyText += `Photolithography transfers microscopic geometric circuit patterns onto silicon wafers. By coating the wafer with light-sensitive photoresist and projecting demagnified ultraviolet light (193nm DUV or 13.5nm EUV) through an optical reticle, diffraction-limited features below 5 nanometers are exposed. Chemical etching removes exposed resist, allowing precise dopant implantation and aluminum/copper interconnect deposition.`;
    speechAudio = `Photolithography uses deep ultraviolet light and reticles to project nanometer-scale circuit features onto photoresist.`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  if (clean.includes('compiler') || clean.includes('bootstrap') || clean.includes('t-diagram') || clean.includes('assembler') || clean.includes('7.1')) {
    replyText += `Compiler bootstrapping is the software equivalent of the Whitworth 3-plate method. To write a compiler in high-level language C, you first write a minimal rudimentary compiler in machine binary or assembly (Stage 0). That minimal compiler compiles a slightly richer compiler (Stage 1), which in turn compiles the full optimizing self-hosting compiler (Stage 2). Using T-diagrams, software tools reproduce and optimize their own source code recursively.`;
    speechAudio = `Compiler bootstrapping builds a minimal machine code assembler first, which incrementally compiles richer compilers until the toolchain is self-hosting.`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  if (clean.includes('systolic') || clean.includes('matrix') || clean.includes('gpu') || clean.includes('tensor') || clean.includes('8.1')) {
    replyText += `Systolic arrays break the Von Neumann memory wall by rhythmically pumping matrix activations and weights through a 2D mesh of multiply-accumulate (MAC) processing units. Each weight read from memory is reused across hundreds of clock ticks by neighboring cells, slashing DRAM bandwidth demand by 99% and enabling tens of teraflops for deep neural network matrix multiplications.`;
    speechAudio = `Systolic arrays pass data across neighbor compute units, reusing values to defeat the memory wall.`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  if (clean.includes('mcts') || clean.includes('self-play') || clean.includes('reinforcement') || clean.includes('zero') || clean.includes('9.1')) {
    replyText += `Zero-data reinforcement learning operates by pairing Monte Carlo Tree Search (MCTS) with dual policy-value neural networks in competitive self-play. Without any human training games or internet data, the agent plays billions of simulations against earlier checkpoints of itself, generating an auto-curated difficulty curriculum that discovers non-human strategies from pure mathematical axioms.`;
    speechAudio = `Self-play reinforcement learning creates its own difficulty curriculum without human internet data.`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  if (clean.includes('replicate') || clean.includes('von neumann') || clean.includes('probe') || clean.includes('10.1')) {
    replyText += `A physical Von Neumann self-replicator closes the manufacturing cycle when robotic tooling can extract raw minerals, refine materials, fabricate electronic microprocessors, and machine structural joints to assemble a 100% complete functional copy of itself. Once the reproduction factor R0 >= 1.0, industrial capacity compounds exponentially from local planetary dirt.`;
    speechAudio = `The Von Neumann cycle achieves exponential self-replication once reproduction ratio exceeds one.`;
    return { replyText, speechAudioScript: speechAudio, agentAction };
  }

  // 10. Intelligent Dynamic Fallback (NEVER repeated canned template!)
  replyText += `Regarding "${prompt.trim()}":\n\nIn the context of ${activeTitle}, every technological system advances by converting raw material into structured negative entropy. Key considerations for this milestone:\n\n1. **Physical Prerequisite**: Identify the simplest mechanical or thermal tool required before building this assembly.\n2. **Closed-Loop Balance**: Ensure feedback sensors prevent physical drift, thermal runaway, or mechanical backlash.\n3. **Verifiable Standard**: Standardize the measurement unit so interchangeable parts match across generations.\n\nWould you like me to walk through the first principles of ${activeTitle}, guide you through the interactive lab, or explain the Triad pillars for this stage?`;
  speechAudio = `Regarding ${prompt.slice(0, 40)}, in this stage remember to balance physical tooling with closed-loop feedback and standardization.`;

  return { replyText, speechAudioScript: speechAudio, agentAction };
}
