
import { GoogleGenAI, Type } from "@google/genai";
import { Sport, SportDetails } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSportRecommendations = async (sport: Sport): Promise<SportDetails> => {
  const prompt = `Actúa como un entrenador personal de élite. Proporciona un perfil de entrenamiento detallado para un deportista que practica ${sport.name}. 
  La descripción del deporte es: ${sport.description}. 
  Incluye grupos musculares clave, habilidades principales, una lista de 5 ejercicios recomendados con repeticiones sugeridas y beneficios, consejos de prevención de lesiones y un tip nutricional.
  Responde exclusivamente en formato JSON en español.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            keyMuscles: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Lista de grupos musculares clave.'
            },
            mainSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Habilidades principales a desarrollar.'
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  reps: { type: Type.STRING },
                  description: { type: Type.STRING },
                  benefit: { type: Type.STRING }
                },
                required: ['name', 'reps', 'description', 'benefit']
              }
            },
            injuryPrevention: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            nutritionalTip: { type: Type.STRING }
          },
          required: ['keyMuscles', 'mainSkills', 'recommendations', 'injuryPrevention', 'nutritionalTip']
        }
      }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as SportDetails;
  } catch (error) {
    console.error("Error fetching Gemini recommendations:", error);
    throw new Error("No se pudo obtener la información del experto. Intenta de nuevo.");
  }
};
