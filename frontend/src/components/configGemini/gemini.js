const API_KEY = 'AIzaSyCqPZ5yFsQIXcMRWCDY33Ft_rjl-19jDXQ';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const googleGeminiService = {
  generateContent: async (prompt) => {
    try {
      const response = await fetch(`${BASE_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  }
};

export default googleGeminiService;





// import
//    { GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,}
//   from "@google/generative-ai";
  
//   const apiKey = 'AIzaSyCqPZ5yFsQIXcMRWCDY33Ft_rjl-19jDXQ';
//   const genAI = new GoogleGenerativeAI(apiKey);
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };
  
//   async function run(promt) {
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [
//       ],
//     });
  
//     const result = await chatSession.sendMessage(promt);
//     return result.response.text();
//   }
  
//   export default run;