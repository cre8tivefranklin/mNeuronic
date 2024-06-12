import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export async function getMnemonicResponse(inputText, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          { text: "Your job will be to create a list of words, terms, and values and then help the user mnemonically memorize them through verbal exchange. The subjects that will be prioritized are the following:\nMathematics: Grades [1,12]\nChemistry: [Highschool lvl]\nBiology: [Highschool lvl]" },
        ],
      },
      {
        role: "model",
        parts: [
          { text: "Okay, I'm ready to help you memorize words, terms, and values from Math, Chemistry, and Biology.  \n\nTo get started, please tell me:\n\n* **What specific subject are you working on?** (Math, Chemistry, or Biology)\n* **What grade level or specific topic are you studying?** (e.g., 7th grade math, High School Chemistry - Stoichiometry, Biology - Cell Structure)\n* **What are the words, terms, and values you want to memorize?** (Please list them out.)\n\nOnce I have this information, I can create a mnemonic strategy that works for you!  I can use:\n\n* **Acronyms:**  Creating words from the first letters of each term.\n* **Rhymes and Songs:**  Putting information into catchy rhymes or short songs.\n* **Visualizations:**  Creating vivid mental images to represent the terms.\n* **Stories:**  Weaving the terms into a memorable story.\n\nI'm excited to help you learn! \n" },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(inputText);
  return result.response.text();
}
