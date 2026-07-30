import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!ai) {
      // Fallback friendly support responses if key is pending injection
      return NextResponse.json({
        text: "AquaDrop Assistant: Thank you for asking! AquaDrop 20L water cans undergo 7-stage RO + UV + Ozonation testing with TDS < 50 PPM. You can pause or skip your subscription anytime under the Subscriptions tab!"
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction:
          'You are AquaBot, the friendly 24/7 customer support AI assistant for AquaDrop pure water delivery and subscription app. Be concise, polite, helpful, and focused on water delivery, TDS levels, 20L cans, dispensers, subscriptions, payments, and delivery tracking.'
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (err: any) {
    console.error('Gemini chat error:', err);
    return NextResponse.json({
      text: "AquaBot Support: Our customer care team is available 24/7 at 1800-AQUADROP. You can also track your live order in the app!"
    });
  }
}
