import React, { useRef } from "react";

function FileUpload({ setFile }) {
  const inputRef = useRef();
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  const onFile = async (file) => {
    if (!file) return;

    if (!["application/pdf", "image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      alert("❗ Unsupported file type! Please upload a PDF or JPG/PNG image.");
      return;
    }
    if (file.size > MAX_SIZE) {
      alert("❗ File too large! Max 10MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = function (evt) {
      const base64String = evt.target.result.split(",")[1];
      let imageUrl = null;
      if (file.type.startsWith("image")) {
        imageUrl = URL.createObjectURL(file);
      }
      setFile({
        name: file.name,
        type: file.type,
        base64: base64String,
        imageUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    onFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  return (
    <section>
      <h2>Upload your file</h2>
      <div
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: "2px dashed #4094f7",
          borderRadius: "16px",
          padding: "40px",
          textAlign: "center",
          background: "#f8faff",
          color: "#123b56",
          cursor: "pointer",
          transition: "border 0.3s",
        }}
      >
        <p style={{ fontSize: "28px", margin: "0 0 10px" }}>📄</p>
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
          Click or drag & drop to upload
        </div>
        <input
          type="file"
          accept="application/pdf, image/png, image/jpeg, image/jpg"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={handleChange}
        />
      </div>
    </section>
  );
}

export default FileUpload;
