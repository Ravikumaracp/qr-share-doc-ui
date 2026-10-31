import { useState } from "react";

import {
  Upload,
  FileText,
  Image,
  File,
  X
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function UploadDocument() {

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-section">

        <Navbar />

        <main className="dashboard">

          <div className="page-heading">

            <div>
              <h1>Upload Document</h1>
              <p>Add a document to securely share it using QR.</p>
            </div>

          </div>

          <div className="upload-card">

            <div className="upload-area">

              <div className="upload-icon">
                <Upload size={28} />
              </div>

              <h2>Upload your document</h2>

              <p>
                Drag and drop your file here, or browse your computer.
              </p>

              <label className="browse-button">
                Browse Files

                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </label>

              <span className="upload-hint">
                PDF, DOC, DOCX, JPG, PNG · Maximum 10 MB
              </span>

            </div>

            {file && (

              <div className="selected-file">

                <div className="file-icon">
                  <FileText size={20} />
                </div>

                <div>
                  <strong>{file.name}</strong>
                  <span>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>

                <button onClick={() => setFile(null)}>
                  <X size={18} />
                </button>

              </div>

            )}

            <div className="upload-actions">

              <Link
                to="/dashboard"
                className="secondary-button"
              >
                Cancel
              </Link>

              <button
                className="primary-button"
                disabled={!file}
              >
                <Upload size={18} />
                Upload Document
              </button>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default UploadDocument;