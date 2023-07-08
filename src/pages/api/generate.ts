import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.query?.prompt;

  if (!prompt) {
    return NextResponse.json({ error: "Prompt missing" }, { status: 400 });
  }

  if (prompt.length > 100) {
    return NextResponse.json({ error: "Prompt too long" }, { status: 400 });
  }

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `provide answers exclusively related to haircare tips and do not answer any question not related to haircare tips.\n Questions: ${prompt}`,
    max_tokens: 500,
    temperature: 0.2,
  });

  const response = completion.data.choices[0].text;

  res.status(200).json({ response });
}
