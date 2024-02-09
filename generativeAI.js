import { GoogleGenerativeAI } from "@google/generative-ai";
import { safetySettings, generationConfig } from './constants.js';

import dotenv from 'dotenv';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export const textOnlyModel = genAI.getGenerativeModel({ model: "gemini-pro", safety_settings: safetySettings, generationConfig });
export const imagesTextModel = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

export async function promptAI(prompt, images) {
    try {
        if (images === undefined || images.length === 0) {
            // Asks the model a question and generates a response
            const result = await textOnlyModel.generateContent(prompt);

            // Wait for it to complete the response
            const response = await result.response;

            // Getting the response as text
            const text = response.text();
            return text;
        } else {
            // Asks the model a question and generates a response
            const result = await imagesTextModel.generateContent([prompt, ...images]);

            // Wait for it to complete the response
            const response = await result.response;

            // Getting the response as text
            const text = response.text();
            return text;
        }
    } catch (err) {
        console.log(err);
        throw "Could Not Prompt AI"
    }
}
