import {
  FileText,
  Share2,
  Download,
  Upload,
  MoreVertical,
  QrCode
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {

  const documents = [
    {
      id: 1,
      name: "Resume.pdf",
      type: "PDF",
      size: "1.2 MB",
      date: "Today"
    },
    {
      id: 2,
      name: "Degree Certificate.pdf",
      type: "PDF",
      size: "850 KB",
      date: "Yesterday"
    },
    {
      id: 3,
      name: "Profile Photo.jpg",
      type: "JPG",
      size: "420 KB",
      date: "18 Sep 2026"
    }
  ];

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-section">

        <Navbar />

        <main className="dashboard">

          <div className="page-heading">

            <div>
              <h1>Welcome back, Ravi 👋</h1>
              <p>Manage and securely share your documents.</p>
            </div>

            <Link to="/upload" className="primary-button">
              <Upload size={18} />
              Upload Document
            </Link>

          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon blue">
                <FileText size={21} />
              </div>

              <div>
                <span>Total Documents</span>
                <strong>12</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">
                <Share2 size={21} />
              </div>

              <div>
                <span>Active Shares</span>
                <strong>8</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <Download size={21} />
              </div>

              <div>
                <span>Total Downloads</span>
                <strong>24</strong>
              </div>
            </div>

          </div>

          <div className="section-header">

            <div>
              <h2>My Documents</h2>
              <p>Your recently uploaded files</p>
            </div>

            <Link to="/dashboard" className="view-link">
              View all
            </Link>

          </div>

          <div className="documents-container">

            {documents.map((document) => (

              <div className="document-row" key={document.id}>

                <div className="document-info">

                  <div className="file-icon">
                    <FileText size={21} />
                  </div>

                  <div>
                    <h3>{document.name}</h3>

                    <p>
                      {document.type} · {document.size} · {document.date}
                    </p>
                  </div>

                </div>

                <div className="document-actions">

                  <Link
                    to={`/documents/${document.id}/qr`}
                    className="action-button"
                    title="Share with QR"
                  >
                    <QrCode size={18} />
                  </Link>

                  <Link
                    to={`/documents/${document.id}`}
                    className="action-button"
                    title="More"
                  >
                    <MoreVertical size={18} />
                  </Link>

                </div>

              </div>

            ))}

          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;