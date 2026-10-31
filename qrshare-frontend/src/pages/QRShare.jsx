import {
  Copy,
  Download,
  Clock,
  ShieldCheck
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function QRShare() {

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-section">

        <Navbar />

        <main className="dashboard">

          <div className="page-heading">

            <div>
              <h1>Share Document</h1>
              <p>Scan the QR code to access your document.</p>
            </div>

          </div>

          <div className="qr-page">

            <div className="qr-card">

              <h2>Resume.pdf</h2>

              <p className="qr-description">
                Anyone with this QR code can access the shared document.
              </p>

              <div className="qr-placeholder">
                <div className="fake-qr">
                  <span>QR</span>
                </div>
              </div>

              <div className="share-link">
                <span>
                  qrshare.local/share/X82kLm91
                </span>

                <button>
                  <Copy size={17} />
                </button>
              </div>

              <div className="qr-actions">

                <button className="primary-button">
                  <Download size={18} />
                  Download QR
                </button>

                <Link
                  to="/documents/1"
                  className="secondary-button"
                >
                  Back to Document
                </Link>

              </div>

            </div>

            <div className="share-settings">

              <h2>Share Settings</h2>

              <div className="setting-item">

                <div className="setting-icon">
                  <Clock size={20} />
                </div>

                <div>
                  <strong>Link expiration</strong>
                  <p>Expires after 24 hours</p>
                </div>

              </div>

              <div className="setting-item">

                <div className="setting-icon">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <strong>Secure access</strong>
                  <p>Only people with this link can access it.</p>
                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default QRShare;