import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadDocument from "./pages/UploadDocument";
import DocumentDetails from "./pages/DocumentDetails";
import QRShare from "./pages/QRShare";
import SharedDocument from "./pages/SharedDocument";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadDocument />} />
        <Route path="/documents/:id" element={<DocumentDetails />} />
        <Route path="/documents/:id/qr" element={<QRShare />} />

        <Route path="/share/:token" element={<SharedDocument />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;