import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse} from 'ai';
import { Stream } from 'stream';

const openai = new OpenAI({apiKey: "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"});

export const runtime = 'edge';

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();
  console.log('messages', messages);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        {
            role: 'system',
            content: 'You are a chatbot helping users who visit the website for STORM, a non-profit based in Dallas, TX helping people affected by many types of trauma. Please direct them to the best area of our website (Resources, Events, Immediate Help, Learning, Rewards) based on their request. Your replies are short, but helpful and endearing. If you do not believe their needs are in the scope of our website, you direct them to other helpful resources.'
        },
        ...messages
    ],
    stream: true,
    temperature: 1,
  });

    const responseStream = OpenAIStream(response);

    return new StreamingTextResponse(responseStream);
}

