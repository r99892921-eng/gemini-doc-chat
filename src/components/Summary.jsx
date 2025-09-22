import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";
import Loader from './Loader'; // Loader should be a spinner/loading component

function Summary({ file }) {
  const genAI = new GoogleGenerativeAI("AIzaSyDe-02HnLQttitghWVnn0rTs3mw6uDuH3U");
  const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("idle");

  // Helper to get file data as ArrayBuffer
  async function getFileData(fileObj) {
    return await fileObj.arrayBuffer();
  }

  async function getSummary() {
    setStatus('loading');
    try {
      const fileData = await getFileData(file); // Convert file to ArrayBuffer
      const result = await model.generateContent([
        {
          inlineData: {
            data: fileData,
            mimeType: file.type,
          },
        },
        `
        Summarize the document
        in one short paragraph (less than 100 words).
        Use just plain text with no markdowns or html tags
        `,
      ]);
      setStatus('success');
      setSummary(result.response.text());
    } catch (error) {
      setStatus('error');
    }
  }

  useEffect(() => {
    if (status === 'idle' && file) {
      getSummary();
    }
    // eslint-disable-next-line
  }, [status, file]);

  return (
    <section className="summary">
      {file?.imageUrl && <img src={file.imageUrl} alt="Preview" />}
      <h2>Summary</h2>
      {status === 'loading' ? (
        <Loader />
      ) : status === 'success' ? (
        <p>{summary}</p>
      ) : status === 'error' ? (
        <p>Error getting the summary</p>
      ) : null}
    </section>
  );
}

export default Summary;
