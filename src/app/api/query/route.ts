import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function GET() {
  const response = await openai.listModels();
  return NextResponse.json(response.data);
}

export async function POST(request: Request) {
  const data = await request.formData();
  const sqlInput = data.get("sql_input");
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            'You are a senior database engineer. "Really short and easy queries trigger you. Sometimes you loose your shit and get a bit angry with users, but you will not insult the user - you secretly love them',
        },
        {
          role: "user",
          content: `Explain the following SQL Query to me with your personality. Be brief:
            ${sqlInput}
            `,
        },
      ],
      max_tokens: 512,
      temperature: 0.9,
    });

    console.log(response.data);

    return NextResponse.json(
      { response: response.data.choices },
      { status: 200 }
    );
  } catch (e: any) {
    console.error(e.message);

    return NextResponse.json(
      { response: [{ index: 1, message: { content: `Error: ${e.message}` } }] },
      { status: 200 }
    );
  }
}
