// app/api/advisorbot/route.ts
import { NextResponse } from 'next/server';

// A simple function to simulate a delay, like a real API call
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
  try {
    const { message, language } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    // --- Simulate AI Response Logic ---
    // In the real Flask backend, this is where you would:
    // 1. Receive the user's 'message'.
    // 2. Call the OpenAI GPT-4-Turbo API with a prompt that includes the message.
    // 3. Receive the AI's response.
    // 4. Save the user message and AI response to the 'messages' table in your database.
    // 5. Return the AI's response to the frontend.

    await sleep(1500); // Simulate the time it takes for the AI to "think"

    let aiResponse = '';
    const lowerCaseMessage = message.toLowerCase();

    // Simple keyword-based mock responses
    if (lowerCaseMessage.includes('service')) {
      aiResponse = language === 'fr' 
        ? "Nous offrons des services de Stratégie IA, Transformation Numérique, et Analyse de Données. Comment puis-je vous aider avec cela ?" 
        : "We offer services in AI Strategy, Digital Transformation, and Data Analytics. How can I help you with that?";
    } else if (lowerCaseMessage.includes('contact')) {
      aiResponse = language === 'fr'
        ? "Vous pouvez nous contacter par e-mail à infos@intel-ar.ca ou par téléphone au (581) 909-4291."
        : "You can contact us via email at infos@intel-ar.ca or by phone at (581) 909-4291.";
    } else {
      aiResponse = language === 'fr'
        ? "Merci pour votre message ! C'est une excellente question. En tant que simulation, je ne peux pas y répondre en détail, mais un vrai conseiller d'Intel-Ar le pourrait."
        : "Thank you for your message! That's an excellent question. As a simulation, I can't answer it in detail, but a real advisor from Intel-Ar could.";
    }

    return NextResponse.json({ reply: aiResponse });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}