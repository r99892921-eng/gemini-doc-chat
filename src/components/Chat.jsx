import { GoogleGenerativeAI } from "@google/generative-ai";
import './Chat.css';
import { useState } from 'react';

function Chat() {
  const genAI = new GoogleGenerativeAI("AIzaSyDe-02HnLQttitghWVnn0rTs3mw6uDuH3U");
  const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  // Helper to get file data as ArrayBuffer
  async function getFileData(fileObj) {
    return await fileObj.arrayBuffer();
  }

  async function handleSendMessage() {
    if (input && file) {
      let chatMessages = [...messages, {role: "user", text: input}, {role: "loader", text: ""}];
      setInput("");
      setMessages(chatMessages);

      try {
        const fileData = await getFileData(file);
        const result = await model.generateContent([
          {
            inlineData: {
              data: fileData,
              mimeType: file.type,
            },
          },
          `Answer this question about the attached document: ${input}.
           Answer as a chatbot with short messages and text only (no markdowns, tags or symbols)
           Chat history: ${JSON.stringify(messages)}`
        ]);

        chatMessages = [...chatMessages.filter((msg) => msg.role !== 'loader'), {role: "model", text: result.response.text()}];
        setMessages(chatMessages);
      } catch (error) {
        chatMessages = [...chatMessages.filter((msg) => msg.role !== 'loader'), {role: "error", text: "Error sending message, try again."}];
        setMessages(chatMessages);
        console.log('error', error);
      }
    }
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <section className="chat-window">
      <h2>Chat</h2>
      <input type="file" onChange={handleFileChange} />
      {
        messages.length ?
        <div className="chat">
          {
            messages.map((msg, idx) => (
              <div className={msg.role} key={idx}>
                <p>{msg.text}</p>
              </div>
            ))
          }
        </div> : null
      }
      <div className="input-area">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Ask a question about the uploaded document..."
        />
        <button onClick={handleSendMessage} disabled={!file || !input}>Send</button>
      </div>
    </section>
  );
}

export default Chat;

  