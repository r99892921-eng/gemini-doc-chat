import Chat from "./components/Chat";
import Summary from "./components/Summary";
import FileUpload from './components/FileUpload';
import { useState } from 'react';
import Header from './components/Header';

const GEMINI_API_KEY ="AIzaSyDQ7xYdAucgoFGN4hxvsDAFd1_Pc1qBVqM";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Header />
      {!selectedFile ? (
        // Show only the upload when there's no file chosen yet
        <FileUpload setFile={setSelectedFile} />
      ) : (
        <>
          <button
            style={{
              float: 'right',
              margin: "10px 0",
              background: "#4094f7",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "7px 20px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
            onClick={() => setSelectedFile(null)}
          >
            Start Over
          </button>
          <div style={{ clear: "both", marginBottom: 16 }}></div>
          {selectedFile.imageUrl ? (
            <img
              src={selectedFile.imageUrl}
              alt="preview"
              style={{ maxWidth: '300px', margin: '16px 0', borderRadius: "14px", boxShadow: "0 4px 16px #e3e4fd" }}
            />
          ) : (
            <div style={{ fontSize: "56px", margin: "24px 0" }}>📄</div>
          )}
          <div style={{ margin: "8px 0 24px 0", color: "#555", fontSize: "18px" }}>
            <b>File:</b> {selectedFile.name}
          </div>
          <Summary file={selectedFile} apiKey={GEMINI_API_KEY} />
          <Chat file={selectedFile} apiKey={GEMINI_API_KEY} />
        </>
      )}
    </div>
  );
}

export default App;



