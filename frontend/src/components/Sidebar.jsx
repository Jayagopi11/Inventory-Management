import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <nav className="bg-light border-end p-3" style={{ width: "220px" }}>
      <h4 className="mb-4 text-primary">Inventory System</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="products"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="purchase-orders"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Purchase Orders
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="sales-orders"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Sales Orders
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="stocks"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Stock Report
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="contacts"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Contacts
          </NavLink>
        </li>
        <li className="nav-item mt-3">
          <button onClick={handleLogout} className="btn btn-danger w-50">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
