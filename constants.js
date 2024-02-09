export const HarmCategory = {
    HARM_CATEGORY_UNSPECIFIED : "HARM_CATEGORY_UNSPECIFIED",
    HARM_CATEGORY_HATE_SPEECH : "HARM_CATEGORY_HATE_SPEECH",
    HARM_CATEGORY_SEXUALLY_EXPLICIT : "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    HARM_CATEGORY_HARASSMENT : "HARM_CATEGORY_HARASSMENT",
    HARM_CATEGORY_DANGEROUS_CONTENT : "HARM_CATEGORY_DANGEROUS_CONTENT"
};

export const HarmBlockThreshold = {
    HARM_BLOCK_THRESHOLD_UNSPECIFIED : "HARM_BLOCK_THRESHOLD_UNSPECIFIED",
    BLOCK_LOW_AND_ABOVE : "BLOCK_LOW_AND_ABOVE",
    BLOCK_MEDIUM_AND_ABOVE : "BLOCK_MEDIUM_AND_ABOVE",
    BLOCK_ONLY_HIGH : "BLOCK_ONLY_HIGH",
    BLOCK_NONE : "BLOCK_NONE"
};

export const generationConfig = {
    temperature: 0.9,
    maxOutputTokens: 2048,
};

export const safetySettings = [
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