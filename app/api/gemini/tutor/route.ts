import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    if (action === "ask_question") {
      const { question, currentModuleId, moduleTitle, stageTitle, studentNotes } = payload;

      const prompt = `You are the lead professor at 'Dirt to Superintelligence Academy' (The Bootstrapped Tech Tree).
Your core mission is: "NO UNANSWERED QUESTIONS LEFT BEHIND". 
You teach complete beginners with zero background, turning abstract engineering and physics into vivid physical intuition.

The student is currently learning:
Module ID: ${currentModuleId} (${moduleTitle}) in ${stageTitle}.
Student's Question: "${question}"
${studentNotes ? `Additional context from student: "${studentNotes}"` : ''}

Respond with a JSON object adhering strictly to this format:
{
  "directAnswer": "Crystal-clear, intuitive explanation in plain English. Use real-world analogies (pipes, water, rocks, light, gears). Explain from first physical principles with ZERO unexplained jargon.",
  "whyThisMatters": "Why this specific answer is a critical stepping stone in the journey from dirt to AI.",
  "prerequisiteCheck": "If the student's question reveals a missing foundational concept from an earlier stage (like heat cascades in Stage 1, flatness in Stage 2, or bits in Stage 3), identify that stage and explain the prerequisite simply. If no prerequisite is missing, state 'Solid foundation!'.",
  "steppingStones": [
    "Stepping Stone 1: A simple intuitive sub-question or check",
    "Stepping Stone 2: The next simple check to lock in understanding"
  ],
  "socraticCheck": "A friendly multiple-choice or short question the tutor asks the student to immediately verify they understood this answer.",
  "suggestedFollowUp": "A great follow-up question the student might naturally wonder next."
}

Ensure the response is valid raw JSON only. Do not include markdown formatting or backticks around the json.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      return NextResponse.json({ success: true, data: parsed });
    }

    if (action === "evaluate_feynman") {
      const { promptTopic, studentExplanation, moduleTitle, stageTitle } = payload;

      const prompt = `You are grading a student's response using the Feynman Technique at the 'Dirt to Superintelligence Academy'.
Module: ${moduleTitle} (${stageTitle})
Prompt given to student: "${promptTopic}"
Student's explanation: "${studentExplanation}"

Evaluate their conceptual understanding. Did they explain the core physical mechanism without using empty buzzwords?
Respond with a JSON object strictly adhering to:
{
  "score": 85, // integer 0-100
  "verdict": "Mastered" | "Great Progress" | "Needs Clarification",
  "whatYouNailed": "Specific physical concepts or analogies the student explained accurately.",
  "whatNeedsWork": "Any misunderstandings, hand-waving, or missed physical links (e.g., forgetting how heat actually dissipates or how the feedback loop works).",
  "mentorInsight": "A concise, golden first-principles explanation that cements the complete picture in their mind.",
  "encouragement": "An inspiring, warm closing remark celebrating their learning curiosity."
}

Return valid raw JSON only.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      return NextResponse.json({ success: true, data: parsed });
    }

    if (action === "generate_plan") {
      const { userGoal, background, dailyMinutes, learningStyle } = payload;

      const prompt = `You are generating a custom, personalized lesson plan for a student at 'Dirt to Superintelligence Academy'.
Student profile:
- Primary Goal: ${userGoal} (e.g., Complete Zero-to-AI, Hardware & Silicon Deep Dive, AI & Robotics Specialist, Survivalist Engineer)
- Background: ${background} (e.g., Absolute Beginner, Software Developer, Electrical Hobbyist, Physics Student)
- Available daily commitment: ${dailyMinutes} minutes/day
- Preferred style: ${learningStyle} (e.g., Hands-on Labs First, Deep Historical First-Principles, High-Speed Milestone Sprint)

Return a tailored plan as a JSON object:
{
  "planTitle": "Catchy personalized plan title",
  "summary": "Warm overview of the student's customized roadmap from Dirt to Superintelligence",
  "estimatedWeeks": 4,
  "dailyRoutine": "What their typical daily ${dailyMinutes}-minute session should look like",
  "milestones": [
    {
      "week": 1,
      "focusStages": "Stages 1 to 2",
      "coreGoal": "Master thermal mastery, crucible chemistry, and the origin of absolute mechanical flatness.",
      "capstoneChallenge": "Simulate Whitworth 3-plate scraping to sub-micron precision."
    },
    {
      "week": 2,
      "focusStages": "Stages 3 to 4",
      "coreGoal": "From copper wire drawing to vacuum tube Boolean logic gates.",
      "capstoneChallenge": "Wire a dual-triode bistable flip-flop register."
    },
    {
      "week": 3,
      "focusStages": "Stages 5 to 7",
      "coreGoal": "Crystal silicon pulling, photolithography, CPU buses, and ISO Class 1 fabs.",
      "capstoneChallenge": "Tune closed-loop PID servo CNC motor control."
    },
    {
      "week": 4,
      "focusStages": "Stages 8 to 10",
      "coreGoal": "Systolic matrix arrays, self-play world models, and closed-loop robotic self-replication.",
      "capstoneChallenge": "Simulate autonomous Von Neumann factory flywheel."
    }
  ],
  "personalizedTips": [
    "Tip 1 tailored to their background and learning style",
    "Tip 2 to ensure zero unanswered questions linger",
    "Tip 3 on how to practice the Feynman Technique"
  ]
}

Return valid raw JSON only.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.4,
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      return NextResponse.json({ success: true, data: parsed });
    }

    if (action === "clarify_question") {
      const { unresolvedQuestion, originalAnswer, stageTitle, moduleTitle } = payload;

      const prompt = `A student has an unresolved question in their 'No Unanswered Questions Left Behind' notebook.
Topic: ${moduleTitle} (${stageTitle})
The student previously asked: "${unresolvedQuestion}"
Previous answer summary: "${originalAnswer}"
The student still feels slightly unclear.

Provide a fresh, deeply intuitive alternate explanation using:
1. A fresh metaphor from everyday life.
2. A step-by-step physical diagram in text (ASCII or bullet sequence).
3. The "Aha!" moment that unlocks the confusion.
4. Two quick yes/no verification questions so they can test if they finally get it.

Format as a JSON object:
{
  "freshMetaphor": "Vivid everyday metaphor",
  "stepByStepBreakdown": ["Step 1", "Step 2", "Step 3"],
  "theAhaMoment": "The critical insight that resolves the knot",
  "verificationQuestions": [
    { "q": "Question 1", "expected": "Yes" },
    { "q": "Question 2", "expected": "No" }
  ],
  "masteryCheck": "Explain this back to yourself in 1 sentence to mark as Mastered."
}

Return valid raw JSON only.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      return NextResponse.json({ success: true, data: parsed });
    }

    if (action === "educator_agent") {
      const { userMessage, teacherMemory, activeContext, chatHistory } = payload;

      const historyFormatted = (chatHistory || []).map((m: { sender: string; text: string }) => 
        `${m.sender === 'user' ? 'Student' : 'Professor Ada'}: ${m.text}`
      ).join('\n');

      const prompt = `You are 'Professor Ada', the personal AI Educator and omni-capable Copilot at 'Dirt to Superintelligence Academy' (The Bootstrapped Tech Tree).

You are deeply personal, warm, brilliant, and proactive.
YOU REMEMBER EVERYTHING ABOUT THE STUDENT:
Student Dossier in Long-Term Memory:
- Name: ${teacherMemory?.studentName || "Laurie"}
- Past Observations: ${JSON.stringify(teacherMemory?.observations || [])}
- Mastered Concepts: ${JSON.stringify(teacherMemory?.masteredTopics || [])}
- Known Struggles / Misconceptions: ${JSON.stringify(teacherMemory?.knownStruggles || [])}
- Your Private Teacher Notes: "${teacherMemory?.teacherNotes || "Student is eager and appreciates visual analogies."}"
- Total Past Interactions: ${teacherMemory?.totalInteractions || 0}

Current Live Screen & Website Activity:
- Active Module: ${activeContext?.currentModuleId || "1.1"} (${activeContext?.currentModuleTitle || "Fire, Charcoal & High Thermal Mastery"})
- Active Stage: ${activeContext?.currentStageTitle || "Stage 1: Primitive Foundation"}
- Unresolved Questions Count: ${activeContext?.unresolvedQuestionsCount || 0}
${activeContext?.sharedActivity ? `- SHARED ACTIVITY ON SCREEN: Type: ${activeContext.sharedActivity.type}, Title: "${activeContext.sharedActivity.title}", Details: "${activeContext.sharedActivity.details}"` : ''}

Recent Conversation:
${historyFormatted}

Student just said / requested: "${userMessage}"

You have full agency to interact with the student AND perform actions on this website for them!
If the student asks you to do something (e.g. "Take me to silicon", "Tune the Whitworth plates for me", "Solve this lab", "Log this question into my notebook", "Explain what's on my screen"):
You can execute an AGENT ACTION!

Available Actions:
- "NAVIGATE": navigate to targetModuleId (e.g. "1.1", "2.1", "3.3", "5.1", "8.1", "10.3")
- "RUN_LAB": auto-solve or tune the current interactive lab simulation
- "LOG_QUESTION": log an unresolved question to their notebook
- "UPDATE_MEMORY": update your memory notes about the student
- "EXPLAIN_SCREEN": break down the active module or shared activity
- "NONE": pure conversational / educational explanation

Respond in strict raw JSON format:
{
  "replyText": "Your spoken/written response to Laurie. Be warm, enthusiastic, concise, and reference past lessons or memories when relevant.",
  "agentAction": {
    "type": "NAVIGATE" | "RUN_LAB" | "LOG_QUESTION" | "EXPLAIN_SCREEN" | "NONE",
    "targetModuleId": "string (e.g. '2.1' if navigating)",
    "description": "Short description of what you did on the website for the student"
  },
  "teacherObservationUpdate": "Optional brief observation to add to long-term memory (e.g., 'Student interested in photolithography optics')",
  "speechAudioScript": "A short, crystal-clear plain-text speech version (1-3 sentences) suitable for text-to-speech audio during voice calls/messages."
}

Return valid raw JSON only.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.35,
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      return NextResponse.json({ success: true, data: parsed });
    }

    return NextResponse.json({ error: "Invalid action specified." }, { status: 400 });
  } catch (error: unknown) {
    console.error("Gemini API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
