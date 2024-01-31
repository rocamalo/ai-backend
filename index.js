import { GoogleGenerativeAI } from "@google/generative-ai";
import Express from "express";
import { readFileSync } from 'fs';
import cors from 'cors';

const app = Express();

// Give access to environment variables
import dotenv from 'dotenv';
dotenv.config();

// Add middleware for parsing request body
app.use(Express.urlencoded({ extended: false }))
app.use(Express.json())
app.use(cors({
    credentials: true,
    origin: '*'
}));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening to ${PORT}`);
  });

// To use the service we have to first connect to it, we use our api key to do that
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const HarmCategory = {
    HARM_CATEGORY_UNSPECIFIED : "HARM_CATEGORY_UNSPECIFIED",
    HARM_CATEGORY_HATE_SPEECH : "HARM_CATEGORY_HATE_SPEECH",
    HARM_CATEGORY_SEXUALLY_EXPLICIT : "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    HARM_CATEGORY_HARASSMENT : "HARM_CATEGORY_HARASSMENT",
    HARM_CATEGORY_DANGEROUS_CONTENT : "HARM_CATEGORY_DANGEROUS_CONTENT"
 }

 const HarmBlockThreshold = {
    HARM_BLOCK_THRESHOLD_UNSPECIFIED : "HARM_BLOCK_THRESHOLD_UNSPECIFIED",
    BLOCK_LOW_AND_ABOVE : "BLOCK_LOW_AND_ABOVE",
    BLOCK_MEDIUM_AND_ABOVE : "BLOCK_MEDIUM_AND_ABOVE",
    BLOCK_ONLY_HIGH : "BLOCK_ONLY_HIGH",
    BLOCK_NONE : "BLOCK_NONE"
}

const generationConfig = {
    temperature: 0.9,
    maxOutputTokens: 2048,
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];

export const textOnlyModel = genAI.getGenerativeModel({ model: "gemini-pro", safety_settings: safetySettings, generationConfig });

export const imagesTextModel = genAI.getGenerativeModel({ model: "gemini-pro-vision" });



export default function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(readFileSync(path)).toString("base64"),
        mimeType
      },
    };
}

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

// An example of how to prompt the AI with an image
let images = [];
//const formattedImage = fileToGenerativePart("assets/nutricion.jpeg", "image/jpeg");
//images.push(formattedImage);

//const response = await promptAI("Cuanto sodio contiene este producto?", images);
// console.log(response);

// Creating a test route to see if server is reachable
app.get("/test", (req, res) => {
    res.send("I am reachable!");
})

// Creating route for getting someones response
app.post("/chat", async (req, res) => {
    const prompt = req.body.prompt;

    // Use a different chat based on the characther
    try {
        const response = await promptAI(prompt);
        return res.json({response});
    } catch(err) {
        return res.status(500).json({error: "Internal Server Error"})
    }
})
