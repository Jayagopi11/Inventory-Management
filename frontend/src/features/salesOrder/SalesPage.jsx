import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSalesOrdersRequest,
  addSalesOrderRequest,
  updateSalesOrderRequest,
  deleteSalesOrderRequest,
  clearNotification,
} from "../salesOrder/SalesSlice";
import { fetchProductsRequest } from "../product/ProductSlice";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import autoTable from "jspdf-autotable";

const SalesPage = () => {
  const dispatch = useDispatch();
  const { salesOrders, notification } = useSelector((state) => state.sales);
  const { products } = useSelector((state) => state.product);

  const [form, setForm] = useState({
    customerName: "",
    address: "",
    orderDate: "",
    productId: "",
    quantity: "",
    price: "",
    status: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    dispatch(fetchSalesOrdersRequest());
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const {
      customerName,
      address,
      orderDate,
      productId,
      quantity,
      price,
      status,
    } = form;
    if (
      !customerName ||
      !address ||
      !orderDate ||
      !productId ||
      !quantity ||
      !price ||
      !status
    ) {
      alert("Fill all fields");
      return;
    }

    const payload = {
      customerName,
      address,
      orderDate,
      productId,
      quantity: Number(quantity),
      price: Number(price),
      status,
    };

    if (isEditing) {
      dispatch(updateSalesOrderRequest({ id: editId, updatedData: payload }));
      setIsEditing(false);
      setEditId(null);
    } else {
      dispatch(addSalesOrderRequest(payload));
    }

    setForm({
      customerName: "",
      address: "",
      orderDate: "",
      productId: "",
      quantity: "",
      price: "",
      status: "",
    });
  };

  const handleEdit = (order) => {
    setIsEditing(true);
    setEditId(order._id);
    setForm({
      customerName: order.customerName,
      address: order.address,
      orderDate: order.orderDate.split("T")[0],
      productId:
        typeof order.productId === "object"
          ? order.productId._id
          : order.productId,
      quantity: order.quantity,
      price: order.price,
      status: order.status,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this sale?")) {
      dispatch(deleteSalesOrderRequest(id));
    }
  };

  // ..... Table Data to show stock ..........//

  const tableData = salesOrders.map((order) => {
    const product =
      typeof order.productId === "object"
        ? order.productId
        : products.find((p) => p._id === order.productId);

    const productName = product?.name || "Unknown";
    const productBrand = product?.brand || "Unknown";
    const productCategory = product?.category || "Unknown";
    const productPrice = product?.price || 0;
    const total = order.quantity * productPrice;

    return {
      ...order,
      productName,
      productBrand,
      productCategory,
      price: productPrice,
      total,
    };
  });

  // ..... Filter The Details ..........//

  const filteredData = tableData.filter((row) => {
    const searchLower = search.toLowerCase();

    const matchesSearch =
      row.customerName.toLowerCase().includes(searchLower) ||
      row.productName.toLowerCase().includes(searchLower) ||
      row.productBrand.toLowerCase().includes(searchLower) ||
      row.status.toLowerCase().includes(searchLower) ||
      row.address?.toLowerCase().includes(searchLower) ||
      new Date(row.orderDate).toLocaleDateString().includes(searchLower) ||
      row.productCategory?.toLowerCase().includes(searchLower); // ✅ Add this

    const matchesCategory =
      categoryFilter === "" ||
      row.productCategory?.toLowerCase() === categoryFilter.toLowerCase(); // ✅ Category match

    return matchesSearch && matchesCategory;
  });

  // ..... Export To PDF Download ..........//

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.text("Sales Report", 14, 10);
    autoTable(doc, {
      head: [
        [
          "Date",
          "Customer",
          "address",
          "Brand",
          "Category",
          "Product",
          "Qty",
          "Unit Price",
          "Total",
          "Status",
        ],
      ],
      body: filteredData.map((row) => [
        new Date(row.orderDate).toLocaleDateString(),
        row.customerName,
        row.address,
        row.productBrand,
        row.productCategory,
        row.productName,
        row.quantity,
        `₹${row.price}`,
        `₹${row.total}`,
        row.status,
      ]),
      startY: 20,
    });

    doc.save("sales-report.pdf");
  };

  // ..... Export To Excel Download ..........//

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredData.map((row) => ({
        Date: new Date(row.orderDate).toLocaleDateString(),
        address: row.address,
        Customer: row.customerName,
        category: row.productCategory,
        Brand: row.productBrand,
        Product: row.productName,
        Quantity: row.quantity,
        "Unit Price": row.price,
        Total: row.total,
        Status: row.status,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
    const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "sales-report.xlsx"
    );
  };

  return (
    <div className="container mt-5 vh-100">
      <h2 className="text-primary mb-1">Sales Orders</h2>

      {notification && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {notification}
          <button
            type="button"
            className="btn-close"
            onClick={() => dispatch(clearNotification())}
          ></button>
        </div>
      )}

      {/* ........Unified Search + Export Buttons ......*/}
      <div className="row mb-3 justify-content-between ">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by customer, product, brand, status, or date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6 d-flex justify-content-end gap-2">
          <button className="btn btn-outline-primary" onClick={exportToPDF}>
            Download PDF
          </button>
          <button className="btn btn-outline-success" onClick={exportToExcel}>
            Download Excel
          </button>
        </div>
      </div>

      {/* .........➕ Sales Form ........*/}
      <div className="card p-4 mb-4 ">
        <h5 className="mb-3">{isEditing ? "Edit Sale" : "Add New Sale"}</h5>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              name="customerName"
              className="form-control"
              placeholder="Customer Name"
              value={form.customerName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              name="orderDate"
              className="form-control"
              value={form.orderDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <select
              name="productId"
              className="form-select"
              value={form.productId}
              onChange={(e) => {
                const product = products.find((p) => p._id === e.target.value);
                setForm((prev) => ({
                  ...prev,
                  productId: product?._id || "",
                  price: product?.price || 0,
                }));
              }}
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.brand} - {p.name} (Stock: {p.quantity})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input
              name="quantity"
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <select
              name="status"
              className="form-select"
              value={form.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              name="price"
              type="number"
              className="form-control"
              placeholder="Unit Price"
              value={form.price}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <input
              name="address"
              className="form-control"
              placeholder="Customer Address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 text-end">
            <button className="btn btn-success" onClick={handleSubmit}>
              {isEditing ? "Update Sale" : "Submit Sale"}
            </button>
          </div>
        </div>
      </div>

      {/* ..........📊 Sales Table.......... */}

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
              <th>Status</th>
              <th>Address</th>
              <th style={{ width: "120px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row._id}>
                <td>{new Date(row.orderDate).toLocaleDateString()}</td>
                <td>{row.customerName}</td>
                <td>{row.productBrand}</td>
                <td>{row.productCategory}</td>
                <td>{row.productName}</td>
                <td>{row.quantity}</td>
                <td>₹{row.price}</td>
                <td>₹{row.total}</td>
                <td>{row.status}</td>
                <td>{row.address}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(row._id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center">
                  No sales records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesPage;
























































{
  /*
  <p className="text-muted mb-2">
        📅 Only sales orders from <strong>today</strong> and future dates are
        displayed.
      </p>
   <tbody>
  {Object.keys(groupedByDate).length === 0 ? (
    <tr>
      <td colSpan="11" className="text-center">No upcoming sales records found.</td>
    </tr>
  ) : (
    Object.entries(groupedByDate).map(([date, orders]) => (
      <React.Fragment key={date}>
        <tr className="table-secondary">
          <td colSpan="11">
            <strong>{date}</strong>
          </td>
        </tr>
        {orders.map((row) => (
          <tr key={row._id}>
            <td>{new Date(row.orderDate).toLocaleDateString()}</td>
            <td>{row.customerName}</td>
            <td>{row.productBrand}</td>
            <td>{row.productCategory}</td>
            <td>{row.productName}</td>
            <td>{row.quantity}</td>
            <td>₹{row.price}</td>
            <td>₹{row.total}</td>
            <td>{row.status}</td>
            <td>{row.address}</td>
            <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleEdit(row)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(row._id)}
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </React.Fragment>
    ))
  )}
</tbody> */
}
