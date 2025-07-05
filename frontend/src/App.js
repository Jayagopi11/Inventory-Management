import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminApp from "./AdminApp";
import "./App.css";
import BarcodeDemoPage from "./pages/BarcodeDemoPage";
import PaymentsPage from "./features/payments/PaymentsPage";
import ReportsPage from "./features/reports/ReportsPage";
import NotificationsPage from "./features/notifications/NotificationsPage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/barcode-demo" element={<BarcodeDemoPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
