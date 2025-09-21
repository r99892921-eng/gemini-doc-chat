import Chat from "./components/Chat";
import Summary from "./components/Summary";
import FileUpload from './components/FileUpload';
import { useState } from 'react';
import Header from './components/Header';


const GEMINI_API_KEY ="AIzaSyDQ7xYdAucgoFGN4hxvsDAFd1_Pc1qBVqM";


function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  <div>
    <button
      style={{
        float: 'right',
        marginBottom: 10,
        background: "#eee",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "4px 12px",
        cursor: "pointer"
      }}
      onClick={() => setSelectedFile(null)}
    >
      Upload New File
    </button>
    <p>File selected: <b>{selectedFile.name}</b></p>
    {selectedFile.imageUrl ? (
      <img
        src={selectedFile.imageUrl}
        alt="preview"
        style={{ maxWidth: '300px', margin: '16px 0' }}
      />
    ) : (
      <div style={{ fontSize: "48px", margin: "16px 0" }}>📄</div>
    )}
    <Summary file={selectedFile} apiKey={"AIzaSyDQ7xYdAucgoFGN4hxvsDAFd1_Pc1qBVqM"} />
    <Chat file={selectedFile} apiKey={"AIzaSyDQ7xYdAucgoFGN4hxvsDAFd1_Pc1qBVqM"} />
    </div>
  )}
  
