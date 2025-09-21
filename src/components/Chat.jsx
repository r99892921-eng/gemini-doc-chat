import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Chat({ file,AIzaSyDe-02HnLQttitghWVnn0rTs3mw6uDuH3U}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setIsLoading(true);
    setInput("");

    try {
      const genAI = new GoogleGenerativeAI(AIzaSyDe-02HnLQttitghWVnn0rTs3mw6uDuH3U);
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const geminiPrompt = {
  contents: [
    {
      parts: [
        {
          inlineData: {
            mimeType: file.type,
            data: file.base64
          }
        },
        {
          text: "Summarize this document or image in a short, clear paragraph. Respond in plain text."
        }
      ]
    }
  ]
};

const result = await model.generateContent(geminiPrompt);

      const aiText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      setMessages((msgs) => [
        ...msgs,
        { role: "ai", text: aiText }
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        {
          role: "ai",
          text: "❗ Error: AI could not answer your question. Try again!"
        }
      ]);
      console.error("Gemini chat error:", err);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Ask Questions About Your File</h2>
      <div style={{
        minHeight: "100px", marginBottom: "12px",
        border: "1px solid #ccc", padding: "10px"
      }}>
        {messages.map((m, i) => (
          <div key={i}
            style={{
              color: m.role === "ai" ? "slateblue" : "black",
              marginBottom: "8px",
            }}>
            <b>{m.role === "ai" ? "Gemini:" : "You:"}</b> {m.text}
          </div>
        ))}
        {isLoading && (<div style={{ color: "#3333cc" }}>Gemini is thinking...</div>)}
        {messages.length === 0 && !isLoading && (
          <div style={{ color: "#888" }}>
            Type a question about your uploaded file above!
          </div>
        )}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a question about your file..."
          style={{ width: "80%" }}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()} style={{ marginLeft: "8px" }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;

