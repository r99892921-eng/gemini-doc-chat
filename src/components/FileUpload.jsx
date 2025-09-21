import React from "react";

function FileUpload({ setFile }) {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check type
    if (!["application/pdf", "image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      alert("❗ Unsupported file type! Please upload a PDF or JPG/PNG image.");
      return;
    }

    // Check size
    if (file.size > MAX_SIZE) {
      alert("❗ File is too large! Maximum size allowed is 10MB.");
      return;
    }

    // File to base64
    const reader = new FileReader();
    reader.onload = function (evt) {
      const base64String = evt.target.result.split(',')[1]; // Remove data:...base64,
      
      // Image preview, if image
      let imageUrl = null;
      if (file.type.startsWith('image')) {
        imageUrl = URL.createObjectURL(file);
      }

      // Send up file info
      setFile({
        name: file.name,
        type: file.type,
        base64: base64String,
        imageUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <section>
      <h2>Get Started</h2>
      <input
        type="file"
        accept="application/pdf, image/png, image/jpeg, image/jpg"
        onChange={handleFileUpload}
      />
    </section>
  );
}

export default FileUpload;
