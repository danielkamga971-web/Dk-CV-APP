import { GoogleGenAI, Type } from "@google/genai";
import { CVData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function processChatCommand(
  message: string,
  currentData: CVData
): Promise<{ updatedData: CVData; response: string }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // Using a stable model for quick processing
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Tu es un expert en recrutement et design de CV. 
              L'utilisateur veut modifier son CV via une commande naturelle.
              
              DONNÉES ACTUELLES DU CV :
              ${JSON.stringify(currentData, null, 2)}
              
              COMMANDE UTILISATEUR :
              "${message}"
              
              INSTRUCTIONS :
              1. Si l'utilisateur demande de changer une couleur, mets à jour theme.primaryColor (format hex).
              2. Si l'utilisateur demande de reformuler une expérience ou le résumé, fais-le de manière professionnelle et impactante.
              3. Si l'utilisateur donne de nouvelles informations (nom, email, etc.), mets à jour les champs correspondants.
              4. Retourne TOUJOURS un objet JSON valide contenant :
                 - "updatedData": l'objet CVData complet mis à jour.
                 - "assistantResponse": un court message confirmant l'action effectuée.
              
              Réponds UNIQUEMENT avec le JSON.`
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            updatedData: { type: Type.OBJECT },
            assistantResponse: { type: Type.STRING }
          },
          required: ["updatedData", "assistantResponse"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      updatedData: result.updatedData || currentData,
      response: result.assistantResponse || "J'ai mis à jour votre CV."
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      updatedData: currentData,
      response: "Désolé, j'ai rencontré une erreur lors de la mise à jour de votre CV."
    };
  }
}
