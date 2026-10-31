import {
  FileText,
  Download,
  QrCode,
  Trash2,
  Share2
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DocumentDetails() {

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-section">

        <Navbar />

        <main className="dashboard">

          <div className="page-heading">
            <div>
              <h1>Document Details</h1>
              <p>View information and sharing options.</p>
            </div>
          </div>

          <div className="details-card">

            <div className="details-file">

              <div className="large-file-icon">
                <FileText size={38} />
              </div>

              <div>
                <h2>Resume.pdf</h2>
                <p>PDF Document · 1.2 MB</p>
              </div>

            </div>

            <div className="details-divider" />

            <div className="details-grid">

              <div>
                <span>Uploaded</span>
                <strong>18 September 2026</strong>
              </div>

              <div>
                <span>File Size</span>
                <strong>1.2 MB</strong>
              </div>

              <div>
                <span>File Type</span>
                <strong>PDF</strong>
              </div>

              <div>
                <span>Downloads</span>
                <strong>4</strong>
              </div>

            </div>

            <div className="details-actions">

              <Link
                to="/documents/1/qr"
                className="primary-button"
              >
                <QrCode size={18} />
                Generate QR
              </Link>

              <button className="secondary-button">
                <Download size={18} />
                Download
              </button>

              <button className="danger-button">
                <Trash2 size={18} />
                Delete
              </button>

            </div>

          </div>

          <div className="sharing-card">

            <div className="sharing-header">
              <div>
                <h2>Sharing</h2>
                <p>Control access to this document.</p>
              </div>

              <Share2 size={24} />
            </div>

            <div className="share-status">
              <span className="status-dot" />
              <div>
                <strong>Active sharing link</strong>
                <p>Expires in 23 hours</p>
              </div>
            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default DocumentDetails;