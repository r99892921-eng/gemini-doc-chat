import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Usage: <Summary docText={theText} apiKey="YOUR_KEY" />
function Summary({ docText,  AIzaSyDe-02HnLQttitghWVnn0rTs3mw6uDuH3U}){
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!docText) return;
    async function fetchSummary() {
      setStatus("loading");
      try {
                        // See https://developers.google.com/apps-script/guides/properties
// for instructions on how to set the API key.
const apiKey = PropertiesService.getScriptProperties().getProperty('AIzaSyDe-02HnLQttitghWVnn0rTs3mw6uDuH3U');

function main() {
  const payload = {
    contents: [
      {
        parts: [
          { text: 'Explain how AI works in a few words' },
        ],
      },
    ],
  };

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
  const options = {
    method: 'POST',
    contentType: 'application/json',
    headers: {
      'x-goog-api-key':AIzaSyDe-02HnLQttitghWVnn0rTs3mw6uDuH3U,
    },
    payload: JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch(url, options);
  const data = JSON.parse(response);
  const content = data['candidates'][0]['content']['parts'][0]['text'];
  console.log(content);
}
        const response = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        setSummary(response);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        console.error("Gemini summary error:", err);
      }
    }
    fetchSummary();
  }, [docText,AIzaSyDe-02HnLQttitghWVnn0rTs3mw6uDuH3U]);

  if (status === "loading") return <p style={{ color: "#3333cc" }}>Summarizing document... Please wait.</p>;
  if (status === "error") return <p style={{ color: "crimson" }}>❗ Error: Unable to summarize file. Please try again.</p>;
  if (status === "success") return <div><h2>Summary</h2><p>{summary}</p></div>;
  return null;
}

export default Summary;
