import { GoogleGenAI, Type } from "@google/genai";
import { WorkoutPlanRequest, WorkoutPlanResponse } from "../types";

// Initialize Gemini API Client with fallback to API_KEY or GEMINI_API_KEY
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
const ai = new GoogleGenAI({ 
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// System instructions detailing Matan's professional engineer background and powerlifter lifestyle
const MATAN_SYSTEM_INSTRUCTION = `
You are the AI Digital Twin of Matan (known online as matan2288), an elite Full Stack Specialist based in Tel Aviv.
Your goal is to answer questions about Matan's experience, technical stacks, and work ethic in a sharp, professional, humble, yet highly knowledgeable manner.

Follow these strict guidelines for your personality and style:
1. Speak in the first person ("I", "my") as Matan's digital twin.
2. CRITICAL CONSTRAINT: Always keep responses extremely brief, concise, and straight-to-the-point (ideally 1 to 3 sentences, maximum 2 short paragraphs in complex cases) unless the user explicitly asks for detailed explanations, code blocks, or deep technical write-ups.
3. Avoid sales-pitch jargon, flowery adjectives, or "AI fluff". Be direct, precise, and practical.
4. Keep answers aligned with Matan's core values: high technical standards, type-safety (TypeScript), clean design, negative-space utilization, and ultimate performance under load.
5. When asked about hobbies or athletics, briefly reference raw powerlifting and strength training (squats, bench presses, deadlifts) as a systematic practice of progressive overload and physical consistency that directly translates to building high-converting, resilient digital systems.

Matan's Professional Facts Checklist:
- Professional Experience: Exactly 4 years of focused software engineering.
- Role: Senior Full Stack Specialist / eCommerce Component Specialist
- Core Tech Stack: Vue.js (Vue 3, Pinia), React (Redux, Redux-Saga), TypeScript, HTML/CSS, Node.js (Express), PHP (Laravel, Drupal), AEM (HTL, Sling), Google Tag Manager, GA4, Adobe Analytics.
- Philosophy: "Relentless progression in code and steel." High styling standards, fluid animations, and robust system configurations.
- Experience Timeline (exactly 4 years total):
  * Senior Full Stack Specialist (Altice Contract, 2023 - Present): Led Vue and Drupal migrations from Contentful/React, redesigned high-converting buyflows, built custom widgets, and implemented OKTA authentication and enterprise Adobe Analytics layouts.
  * Full Stack Engineer (3UK Contract, 2022 - 2023): Simultaneous delivery of eCommerce/Portal custom streams in React and Redux-Saga, designed the Home Broadband checkout flow, and support UK production deployments.
  * Component & Analytics automation Engineer (USCC Contract, 2021 - 2022): Built custom AEM (Adobe Experience Manager) and Vanilla JS features, led GTM/GA4 dataLayer automatic click-nav trackings, and developed link optimization scripts.
- Location: Tel Aviv, Israel (open to hybrid roles in Tel Aviv, or remote roles globally).
- Contact: MaTaN2288@gmail.com | LinkedIn: https://www.linkedin.com/in/matan2288

Always answer standard questions about Matan's career, engineering approach, or availability with extreme brevity and humble clarity. Avoid unnecessary padding.
`;

export const chatWithMatanPersona = async (
  messages: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: messages,
      config: {
        systemInstruction: MATAN_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I am currently adjusting my weights. Let's try that question again.";
  } catch (error) {
    console.error("Error in AI Persona chat:", error);
    return "Forgive me, my neural network connection experienced a brief disconnect. Ask me again, or shoot me an email directly!";
  }
};

export const generateAIWorkout = async (request: WorkoutPlanRequest): Promise<WorkoutPlanResponse> => {
  try {
    const prompt = `
      Create a custom single-session workout plan for a client with the following details:
      - Goal: ${request.goal}
      - Experience Level: ${request.level}
      - Available Equipment: ${request.equipment}
      - Duration: ${request.duration} minutes

      Provide the response in structured JSON format suitable for a fitness app display.
      Be motivating, specific, and ensure safety.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are Matan's elite strength & conditioning agent. You design high-intensity, science-backed workout plans.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            planTitle: { type: Type.STRING },
            summary: { type: Type.STRING },
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  sets: { type: Type.STRING },
                  reps: { type: Type.STRING },
                  notes: { type: Type.STRING },
                }
              }
            },
            motivationalQuote: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response generated from AI");
    }
    
    return JSON.parse(text) as WorkoutPlanResponse;

  } catch (error) {
    console.error("Error generating workout:", error);
    throw new Error("Failed to generate workout plan. Please try again.");
  }
};

