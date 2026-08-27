"use client";

import { useState } from "react";
import { useCompletion } from "@ai-sdk/react";


export default function GeneratePage() {
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [temperature, setTemperature] = useState<number>(0.7);
  const [maxTokens, setMaxTokens] = useState<number>(1000);
  const [format, setFormat] = useState<string>("markdown");

  // Connects form submission directly to /api/generate
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    complete,
  } = useCompletion({
    api: "/api/generate",
    body: {
      model: selectedModel,
      temperature,
      maxTokens,
      format,
    },
  });

  return (
    
    <div className="grid grid-cols-2 gap-6 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 border p-4 rounded-xl">
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your prompt..."
          className="w-full h-40 p-2 bg-transparent border rounded"
        />
        
        {isLoading ? (
          <button
            type="button"
            onClick={stop}
            className="bg-red-600 text-white py-2 px-4 rounded"
          >
            Stop Generating
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-indigo-600 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Generate
          </button>
        )}
      </form>

      {/* Real-time Streamed Output */}
      <div className="border p-4 rounded-xl">
        <h3 className="font-bold mb-2">Output Stream</h3>
        <pre className="whitespace-pre-wrap font-sans">{completion}</pre>
      </div>
    </div>
  );
}