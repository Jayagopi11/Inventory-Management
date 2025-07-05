import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./features/product/ProductPage";
import PurchasePage from "./features/purchaseOrder/PurchasePage";
import SalesPage from "./features/salesOrder/SalesPage";
import StockPage from "./features/stockReport/StockPage";
import ContactPage from "./features/contacts/ContactPage";

const AdminLayout = ({ onLogout }) => (
  <div style={{ display: "flex" }}>
    <Sidebar onLogout={onLogout} />
    <div style={{ flex: 1, padding: "20px" }}>
      <Outlet />
    </div>
  </div>
);

const AdminApp = ({ onLogout }) => (
  <Routes>
    <Route path="/" element={<AdminLayout onLogout={onLogout} />}>
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="products" element={<ProductPage />} />
      <Route path="purchase-orders" element={<PurchasePage />} />
      <Route path="sales-orders" element={<SalesPage />} />
      <Route path="stocks" element={<StockPage />} />
      <Route path="contacts" element={<ContactPage />} />
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Route>
  </Routes>
);

export default AdminApp;
