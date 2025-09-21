import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Summary({ file, AIzaSyDQ7xYdAucgoFGN4hxvsDAFd1_Pc1qBVqM }) {
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  useEffect(() => {
    async function fetchSummary() {
      setStatus("loading");
      try {
        const genAI = new GoogleGenerativeAI(AIzaSyDQ7xYdAucgoFGN4hxvsDAFd1_Pc1qBVqM);
        const model = genAI.getGenerativeModel({
          model: "gemini-pro-vision",
        });

        const input = [
          {
            mimeType: file.type,
            data: file.base64,
          },
          "Summarize this document or image in a short, clear paragraph. Respond in plain text.",
        ];

        const result = await model.generateContent(input);
        const response =
          result.response.candidates[0]?.content?.parts[0]?.text || "";
        setSummary(response);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    }

    fetchSummary();
  }, [file, apiKey]);

  if (status === "loading")
    return (
      <p style={{ color: "#3333cc" }}>
        Summarizing document... Please wait.
      </p>
    );

  if (status === "error")
    return (
      <p style={{ color: "crimson" }}>
        ❗ Error: Unable to summarize file. Please try again.
      </p>
    );

  if (status === "success")
    return (
      <div>
        <h2>Summary</h2>
        <p>{summary}</p>
      </div>
    );

  return null;
}

export default Summary;

