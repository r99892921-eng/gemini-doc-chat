import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Summary({ file,  AIzaSyDe-02HnLQttitghWVnn0rTs3mw6uDuH3U}) {
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!file) return;
    async function fetchSummary() {
      setStatus("loading");
      try {
        const genAI = new GoogleGenerativeAI(AIzaSyDe-02HnLQttitghWVnn0rTs3mw6uDuH3U);
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        const geminiPrompt = {
          contents: [{
            parts: [
              {
                inlineData: {
                  mimeType: file.type,
                  data: file.base64,
                }
              },
              {
                text: "Summarize this document or image in a short, clear paragraph. Respond in plain text."
              }
            ]
          }]
        };

        const result = await model.generateContent(geminiPrompt);
        const response = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        setSummary(response);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        console.error("Gemini summary error:", err);
      }
    }
    fetchSummary();
  }, [file,AIzaSyDe-02HnLQttitghWVnn0rTs3mw6uDuH3U]);

  if (status === "loading") return <p style={{ color: "#3333cc" }}>Summarizing document... Please wait.</p>;
  if (status === "error") return <p style={{ color: "crimson" }}>❗ Error: Unable to summarize file. Please try again.</p>;
  if (status === "success") return <div><h2>Summary</h2><p>{summary}</p></div>;
  return null;
}

export default Summary;
