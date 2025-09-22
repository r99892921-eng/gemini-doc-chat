import { useRef } from 'react';

function FileUpload({ setFile }) {
  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const fileObj = e.target.files[0];
    if (fileObj) {
      // For preview image (optional)
      let imageUrl = null;
      if (fileObj.type.startsWith('image/')) {
        imageUrl = URL.createObjectURL(fileObj);
      }
      // Pass the actual File object and extra preview URL to parent
      setFile({
        file: fileObj,      // The real File object
        type: fileObj.type, // MIME type
        imageUrl: imageUrl  // Preview (for images only)
      });
    }
  }

  return (
    <section className="file-upload">
      <h2>Upload a document</h2>
      <input 
        type="file" 
        onChange={handleFileChange}
        ref={fileInputRef} 
        accept=".pdf, .doc, .docx, .txt, .png, .jpg, .jpeg, .webp"
      />
    </section>
  );
}

export default FileUpload;
