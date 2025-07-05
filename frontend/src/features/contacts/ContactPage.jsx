import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContactRequest,
  clearNotification,
  deleteContactRequest,
  fetchContactsRequest,
  updateContactRequest,
} from "./ContactSlice";
import Notification from "../../components/Notification";
import DataTable from "../../components/DataTable";

const ContactPage = () => {
  const dispatch = useDispatch();
  const { contact, loading, error, notification } = useSelector(
  (state) => state.contacts
);

  const [form, setForm] = useState({
    name: "",
    type: "supplier",
    phone: "",
    email: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchContactsRequest());
  }, [dispatch]);

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Form data being submitted:", form);

  if (editId) {
    dispatch(updateContactRequest({ ...form, _id: editId }));
  } else {
    dispatch(addContactRequest(form));
  }

  setForm({ name: "", type: "supplier", phone: "", email: "" });
  setEditId(null);
};

  const handleEdit = (contact) => {
    setForm({
      name: contact.name,
      type: contact.type,
      phone: contact.phone,
      email: contact.email,
    });
    setEditId(contact._id);
  };

  const handleDelete = (id) => {
    dispatch(deleteContactRequest(id));
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Type", accessor: "type" },
    { header: "Phone", accessor: "phone" },
    { header: "Email", accessor: "email" },
    {
      header: "Action",
      accessor: "action",
      render: (row) => (
        <>
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-4 vh-100">
      <h2 className="text-primary mb-4">Supplier & Customer Management</h2>

      {notification && (
        <Notification
          type="success"
          message={notification}
          onClose={() => dispatch(clearNotification())}
        />
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Name"
              value={form.name}
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="supplier">Supplier</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Phone"
              value={form.phone}
              required
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Email"
              value={form.email}
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={columns} data={contact || []} />
      )}
    </div>
  );
};

export default ContactPage;
