import {
  FileText,
  Download,
  ShieldCheck,
  Clock
} from "lucide-react";

function SharedDocument() {

  return (
    <div className="shared-page">

      <div className="shared-card">

        <div className="shared-logo">
          <div className="logo-icon">QR</div>
          <h1>QRShare</h1>
        </div>

        <div className="shared-file-icon">
          <FileText size={42} />
        </div>

        <h2>Resume.pdf</h2>

        <p className="shared-description">
          This document has been securely shared with you.
        </p>

        <div className="shared-info">

          <div>
            <span>File type</span>
            <strong>PDF</strong>
          </div>

          <div>
            <span>File size</span>
            <strong>1.2 MB</strong>
          </div>

        </div>

        <button className="primary-button shared-download">
          <Download size={19} />
          Download Document
        </button>

        <div className="security-info">

          <div>
            <ShieldCheck size={18} />
            Secure shared document
          </div>

          <div>
            <Clock size={18} />
            Link expires in 23 hours
          </div>

        </div>

        <p className="powered-by">
          Powered by QRShare
        </p>

      </div>

    </div>
  );
}

export default SharedDocument;