import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateImage = async (prompt: string) => {
  const res = await openai.images.generate({
    prompt,
    n: 1,
    model: "dall-e-2",
    size: "512x512",
    response_format: "b64_json",
  });
  return res.data[0]?.b64_json;
};