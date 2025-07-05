import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchPurchasesRequest,
  addPurchaseRequest,
  updatePurchaseRequest,
  deletePurchaseRequest,
  clearNotification,
} from "./PurchaseSlice";
import DataTable from "../../components/DataTable";
import Notification from "../../components/Notification";
import { generateBarcodeValue } from "../../utils/barcodeUtils";

const PurchasePage = () => {
  const dispatch = useDispatch();
  const { purchases, loading, error, notification } = useSelector(
    (state) => state.purchase
  );

  const [form, setForm] = useState({
    productId: "",
    item: "",
    brand: "",
    supplier: "",
    quantity: "",
    cost: "",
    date: "",
  });

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchPurchasesRequest());
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, [dispatch]);

  const brandOptions = Array.from(new Set(products.map((p) => p.brand))).filter(
    (brand) => brand && brand.trim() !== ""
  );

  const filteredProducts = form.brand
    ? products.filter((p) => p.brand === form.brand)
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "brand") {
      setForm((prev) => ({
        ...prev,
        brand: value,
        productId: "",
        item: "",
        cost: "",
      }));
    } else if (name === "productId") {
      const selectedProduct = products.find((p) => p._id === value);
      if (selectedProduct) {
        setForm((prev) => ({
          ...prev,
          productId: value,
          item: selectedProduct.name,
          cost: selectedProduct.price?.toString() || "",
        }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setForm({
      productId: "",
      item: "",
      brand: "",
      supplier: "",
      quantity: "",
      date: "",
      cost: "",
    });
    setEditingId(null);
    setFormError("");
  };

  const handleSubmit = () => {
    const data = {
      productId: form.productId,
      item: form.item.trim(),
      brand: form.brand.trim(),
      supplier: form.supplier.trim(),
      quantity: parseInt(form.quantity),
      cost: parseFloat(form.cost),
      date: form.date || new Date().toISOString().slice(0, 10),
      barcode: generateBarcodeValue(),
    };

    if (
      !data.productId ||
      !data.item ||
      !data.brand ||
      !data.supplier ||
      isNaN(data.quantity) ||
      isNaN(data.cost)
    ) {
      setFormError("Please fill all fields correctly.");
      return;
    }

    if (editingId) {
      dispatch(updatePurchaseRequest({ id: editingId, data }));
    } else {
      dispatch(addPurchaseRequest(data));
    }
    resetForm();
  };

  const handleEdit = (purchase) => {
    setForm({
      productId: purchase.productId,
      item: purchase.item,
      brand: purchase.brand,
      supplier: purchase.supplier,
      quantity: purchase.quantity,
      cost: purchase.cost.toString(),
    });
    setEditingId(purchase._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this purchase?")) {
      dispatch(deletePurchaseRequest(id));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const columns = [
    { header: "Item", accessor: "item" },
    { header: "Brand", accessor: "brand" },
    { header: "Supplier", accessor: "supplier" },
    { header: "Quantity", accessor: "quantity" },
    {
      header: "Cost",
      accessor: "cost",
      render: (row) => `₹${parseFloat(row.cost).toFixed(2)}`,
    },
    { header: "Date", accessor: "date" },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="btn-group">
          <button
            onClick={() => handleEdit(row)}
            className="btn btn-sm btn-warning"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="btn btn-sm btn-danger ms-2"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const filteredPurchases = [...purchases]
    .filter((p) => {
      const term = searchTerm.toLowerCase();
      return (
        (p.item ?? "").toLowerCase().includes(term) ||
        (p.supplier ?? "").toLowerCase().includes(term) ||
        (p.brand ?? "").toLowerCase().includes(term) ||
        (p.date ?? "").toLowerCase().includes(term) ||
        String(p.cost ?? "")
          .toLowerCase()
          .includes(term)
      );
    })
    .sort((a, b) => a.item.localeCompare(b.item));

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary mb-0">Purchase Orders</h2>
        <div style={{ width: "250px" }}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {notification && (
        <Notification
          message={notification}
          onClose={() => dispatch(clearNotification())}
          type="success"
        />
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {formError && <div className="alert alert-warning">{formError}</div>}
      {loading && <div className="alert alert-info">Loading...</div>}

      <div className="card mb-4 shadow-sm">
        <div className="card-header fw-bold">
          {editingId ? "Edit Purchase" : "Add Purchase"}
        </div>
        <div className="card-body row g-3 align-items-end">
          <div className="col-md-3">
            <select
              name="brand"
              className="form-select"
              value={form.brand}
              onChange={handleChange}
            >
              <option value="">Select Brand</option>
              {brandOptions.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <select
              name="productId"
              className="form-select"
              value={form.productId}
              onChange={handleChange}
              disabled={!form.brand}
            >
              <option value="">Select Product</option>
              {filteredProducts.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <input
              type="text"
              name="supplier"
              placeholder="Supplier"
              className="form-control"
              value={form.supplier}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              className="form-control"
              value={form.quantity}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              name="cost"
              placeholder="Cost"
              className="form-control"
              value={form.cost}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              step="0.01"
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              name="date"
              className="form-control"
              value={form.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <button onClick={handleSubmit} className="btn btn-primary w-100">
              {editingId ? "Update" : "Add"}
            </button>
          </div>

          {editingId && (
            <div className="col-md-2">
              <button onClick={resetForm} className="btn btn-secondary w-100">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <DataTable columns={columns} data={filteredPurchases} />
    </div>
  );
};

export default PurchasePage;
