import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testKey() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });

    const result = await model.generateContent("Say ONLY the word OK");

    console.log(" Gemini response:");
    console.log(result.response.text());
  } catch (err) {
    console.error(" Gemini error:");
    console.error(err.message || err);
  }
}

testKey();
