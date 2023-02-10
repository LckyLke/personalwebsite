import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const Main: React.FC = () => {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSummarize = async () => {
    setIsLoading(true);

    console.log(
      "Sum up the following text: " +
        '"' +
        inputText +
        '"' +
        " in " +
        selectedLanguage +
        "."
    );

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Translate the following text to " +
        selectedLanguage +
        ": " +
        '"' +
        inputText +
        '"',
      temperature: 0.05,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    setOutputText(() => {
      if (response.data.choices[0].text) {
        return response.data.choices[0].text.trim();
      }
      return "No summary found";
    });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="mb-4 text-2xl font-bold">TextWizard.ai</h1>
      <div className="flex justify-center w-screen mb-4">
        <textarea
          className="block w-1/3 p-4 mr-2 bg-white rounded-lg shadow-lg"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text to summarize"
        />

        <textarea
          className="block w-1/3 p-4 ml-2 bg-white rounded-lg shadow-lg"
          value={outputText}
          readOnly
        />
      </div>
      <div className="w-full max-w-md mb-4">
        <select
          className="block w-full p-4 bg-white rounded-lg shadow-lg"
          value={selectedLanguage}
          onChange={handleSelectChange}
        >
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="spanish">Spanish</option>
        </select>
      </div>
      <button
        className="p-4 font-bold text-white bg-blue-500 rounded-lg shadow-lg"
        onClick={handleSummarize}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Summarize"}
      </button>
    </div>
  );
};

export default Main;
