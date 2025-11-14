
import { GoogleGenAI, Modality } from "@google/genai";
import { ImageStyle, AspectRatio } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const correctPrompt = async (prompt: string): Promise<string> => {
    try {
        const fullPrompt = `Rewrite this rough idea into a detailed, high-quality, AI-friendly prompt for an image generation model. Make it evocative and descriptive. The rewritten prompt should be a single paragraph. Rough idea: "${prompt}"`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error correcting prompt:", error);
        return prompt; // Return original prompt on error
    }
};

interface GenerateImageParams {
    prompt: string;
    style: ImageStyle;
    ratio: AspectRatio;
    baseImage?: File;
}

export const generateOrEditImage = async ({ prompt, style, ratio, baseImage }: GenerateImageParams): Promise<string | null> => {
    try {
        const fullPrompt = `${prompt}, in the style of ${style}, ${ratio} aspect ratio.`;
        
        const parts = [];
        if (baseImage) {
            const imagePart = await fileToGenerativePart(baseImage);
            parts.push(imagePart);
            parts.push({ text: prompt }); // For editing, a simpler prompt is better.
        } else {
            parts.push({ text: fullPrompt });
        }
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: parts },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
            }
        }
        return null;
    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image. Please check your API key and try again.");
    }
};
