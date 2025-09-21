import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Summary({ file,IzaSyDe-02HnLQttitghWVnn0rTs3mw6uDuH3U}) {
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!file) return;
    async function fetchSummary() {
      setStatus("loading");
      try {
      from google import genai
      from google.genai import types

      client = genai.Client()

      response = client.models.generate_content(
          model="gemini-2.5-flash",
          contents="Explain how AI works in a few words",
          config=types.GenerateContentConfig(
          thinking_config=types.ThinkingConfig(thinking_budget=0) # Disables thinking
       ),
     )
        print(response.text)  
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
