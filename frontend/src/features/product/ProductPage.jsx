// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProductsRequest,
//   addProductRequest,
//   updateProductRequest,
//   deleteProductRequest,
//   clearNotification,
// } from "./ProductSlice";
// import DataTable from "../../components/DataTable";
// import Notification from "../../components/Notification";

// const ProductPage = () => {
//   const dispatch = useDispatch();

//   const { products, error, notification } = useSelector(
//     (state) => state.product
//   );

//   const [searchTerm, setSearchTerm] = useState("");

//   const [productForm, setProductForm] = useState({
//     name: "",
//     sku: "",
//     price: "",
//     quantity: "",
//     description: "",
//     brand: "",
//     category: "",
//   });

//   const [editingId, setEditingId] = useState(null);
//   const [formError, setFormError] = useState("");

//   useEffect(() => {
//     dispatch(fetchProductsRequest());
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const resetForm = () => {
//     setProductForm({
//       name: "",
//       sku: "",
//       price: "",
//       quantity: "",
//       description: "",
//       brand: "",
//       category: "",
//     });
//     setEditingId(null);
//     setFormError("");
//   };

//   const handleSubmit = () => {
//     const { name, sku, price, quantity, description, brand, category } =
//       productForm;

//     if (
//       !name ||
//       !sku ||
//       isNaN(price) ||
//       isNaN(quantity) ||
//       !brand ||
//       !category
//     ) {
//       setFormError("Please fill all fields correctly.");
//       return;
//     }

//     const payload = {
//       name: name.trim(),
//       sku: sku.trim(),
//       price: parseFloat(price),
//       quantity: parseInt(quantity),
//       description: description.trim(),
//       brand,
//       category,
//     };

//     if (editingId) {
//       dispatch(updateProductRequest({ id: editingId, data: payload }));
//     } else {
//       dispatch(addProductRequest(payload));
//     }
//     console.log("Payload to submit:", payload);

//     resetForm();
//   };

//   const handleEdit = (product) => {
//     setProductForm({
//       name: product.name || "",
//       sku: product.sku || "",
//       price: product.price || "",
//       quantity: product.quantity || "",
//       description: product.description || "",
//       brand: product.brand || "",
//       category: product.category || "",
//     });
//     setEditingId(product._id);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       dispatch(deleteProductRequest(id));
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSubmit();
//     }
//   };

//   const columns = [
//     { header: "Model", accessor: "name" },
//     { header: "SKU", accessor: "sku" },
//     {
//       header: "Price",
//       accessor: "price",
//       render: (row) => `₹${parseFloat(row.price).toFixed(2)}`,
//     },
//     { header: "Quantity", accessor: "quantity" },
//     { header: "Description", accessor: "description" },
//     { header: "Brand", accessor: "brand" },
//     { header: "Category", accessor: "category" },
//     {
//       header: "Actions",
//       accessor: "actions",
//       render: (row) => (
//         <div className="d-flex gap-2">
//           <button
//             className="btn btn-sm btn-warning"
//             onClick={() => handleEdit(row)}
//           >
//             Edit
//           </button>
//           <button
//             className="btn btn-sm btn-danger"
//             onClick={() => handleDelete(row._id)}
//           >
//             Delete
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const filteredProduct = [...products]
//     .filter((item) => {
//       const term = searchTerm.toLowerCase();
//       return (
//         (item.name ?? "").toLowerCase().includes(term) ||
//         (item.sku ?? "").toLowerCase().includes(term) ||
//         (item.description ?? "").toLowerCase().includes(term) ||
//         (item.category ?? "").toLowerCase().includes(term) ||
//         String(item.price ?? "")
//           .toLowerCase()
//           .includes(term)
//       );
//     })
//     .sort((a, b) => a.name.localeCompare(b.name));

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="text-primary">Product Management</h2>
//         <div style={{ width: "250px" }}>
//           <input
//             type="text"
//             className="form-control form-control-sm"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {notification && (
//         <Notification
//           type="success"
//           message={notification}
//           onClose={() => dispatch(clearNotification())}
//         />
//       )}
//       {error && <div className="alert alert-danger">{error}</div>}
//       {formError && <div className="alert alert-warning">{formError}</div>}

//       <div className="card mb-4 p-3 shadow-sm">
//         <h5 className="mb-3">{editingId ? "Edit Product" : "Add Product"}</h5>
//         <div className="row g-2">
//           <div className="col-md-4">
//             <select
//               name="category"
//               className="form-control"
//               value={productForm.category}
//               onChange={handleChange}
//             >
//               <option value="">Select Category</option>
//               <option value="Electronics">Electronics</option>
//               <option value="Appliances">Appliances</option>
//               <option value="Accessories">Accessories</option>
//               <option value="Laptops">Laptops</option>
//               <option value="Mobiles">Mobiles</option>
             
//             </select>
//           </div>

//           <div className="col-md-4">
//             <select
//               name="brand"
//               className="form-control"
//               value={productForm.brand}
//               onChange={handleChange}
//             >
//               <option value="">Select Brand</option>
//               <option value="Apple">Apple</option>
//               <option value="Samsung">Samsung</option>
//               <option value="Sony">Sony</option>
//               <option value="LG">LG</option>
//               <option value="Dell">Dell</option>
//                <option value="Infinix">infinix</option>
//               {/* <option value="Other">Other</option> */}
//             </select>
//           </div>

//           <div className="col-md-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Model"
//               className="form-control"
//               value={productForm.name}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//             />
//           </div>

//           <div className="col-md-4">
//             <input
//               type="text"
//               name="sku"
//               placeholder="SKU"
//               className="form-control"
//               value={productForm.sku}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//             />
//           </div>

//           <div className="col-md-4">
//             <input
//               type="number"
//               name="price"
//               placeholder="Price"
//               className="form-control"
//               value={productForm.price}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               step="0.01"
//             />
//           </div>

//           <div className="col-md-4">
//             <input
//               type="number"
//               name="quantity"
//               placeholder="Quantity"
//               className="form-control"
//               value={productForm.quantity}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//             />
//           </div>

//           <div className="col-md-4">
//             <input
//               type="text"
//               name="description"
//               placeholder="Description"
//               className="form-control"
//               value={productForm.description}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//             />
//           </div>

//           <div className="col-12 d-flex justify-content-end gap-2">
//             <button className="btn btn-primary" onClick={handleSubmit}>
//               {editingId ? "Update" : "Add"} Product
//             </button>
//             {editingId && (
//               <button className="btn btn-secondary" onClick={resetForm}>
//                 Cancel
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <DataTable columns={columns} data={filteredProduct} />
//     </div>
//   );
// };

// export default ProductPage;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsRequest,
  addProductRequest,
  updateProductRequest,
  deleteProductRequest,
  clearNotification,
} from "./ProductSlice";
import DataTable from "../../components/DataTable";
import Notification from "../../components/Notification";

const ProductPage = () => {
  const dispatch = useDispatch();

  const { products, error, notification } = useSelector(
    (state) => state.product
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [productForm, setProductForm] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
    description: "",
    brand: "",
    category: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setProductForm({
      name: "",
      sku: "",
      price: "",
      quantity: "",
      description: "",
      brand: "",
      category: "",
    });
    setEditingId(null);
    setFormError("");
  };

  const handleSubmit = () => {
    const { name, sku, price, quantity, description, brand, category } =
      productForm;

    if (
      !name ||
      !sku ||
      isNaN(price) ||
      isNaN(quantity) ||
      !brand ||
      !category
    ) {
      setFormError("Please fill all fields correctly.");
      return;
    }

    const payload = {
      name: name.trim(),
      sku: sku.trim(),
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description: description.trim(),
      brand,
      category,
    };

    if (editingId) {
      dispatch(updateProductRequest({ id: editingId, data: payload }));
    } else {
      const existingProduct = products.find(
        (prod) =>
          prod.name.trim().toLowerCase() === payload.name.toLowerCase() ||
          prod.sku.trim().toLowerCase() === payload.sku.toLowerCase()
      );

      if (existingProduct) {
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + payload.quantity,
          price: payload.price, 
          description: payload.description,
          brand: payload.brand,
          category: payload.category,
        };

        dispatch(
          updateProductRequest({ id: existingProduct._id, data: updatedProduct })
        );
      } else {
        dispatch(addProductRequest(payload));
      }
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setProductForm({
      name: product.name || "",
      sku: product.sku || "",
      price: product.price || "",
      quantity: product.quantity || "",
      description: product.description || "",
      brand: product.brand || "",
      category: product.category || "",
    });
    setEditingId(product._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductRequest(id));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const columns = [
    { header: "Model", accessor: "name" },
    { header: "SKU", accessor: "sku" },
    {
      header: "Price",
      accessor: "price",
      render: (row) => `₹${parseFloat(row.price).toFixed(2)}`,
    },
    { header: "Quantity", accessor: "quantity" },
    { header: "Description", accessor: "description" },
    { header: "Brand", accessor: "brand" },
    { header: "Category", accessor: "category" },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-warning"
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
        </div>
      ),
    },
  ];

  const filteredProduct = [...products]
    .filter((item) => {
      const term = searchTerm.toLowerCase();
      return (
        (item.name ?? "").toLowerCase().includes(term) ||
        (item.sku ?? "").toLowerCase().includes(term) ||
        (item.description ?? "").toLowerCase().includes(term) ||
        (item.category ?? "").toLowerCase().includes(term) ||
        String(item.price ?? "")
          .toLowerCase()
          .includes(term)
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="container vh-100 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Product Management</h2>
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
          type="success"
          message={notification}
          onClose={() => dispatch(clearNotification())}
        />
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {formError && <div className="alert alert-warning">{formError}</div>}

      <div className="card mb-4 p-3 shadow-sm">
        <h5 className="mb-3">{editingId ? "Edit Product" : "Add Product"}</h5>
        <div className="row g-2">
          <div className="col-md-4">
            <select
              name="category"
              className="form-control"
              value={productForm.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Appliances">Appliances</option>
              <option value="Accessories">Accessories</option>
              <option value="Laptops">Laptops</option>
              <option value="Mobiles">Mobiles</option>
            </select>
          </div>

          <div className="col-md-4">
            <select
              name="brand"
              className="form-control"
              value={productForm.brand}
              onChange={handleChange}
            >
              <option value="">Select Brand</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Sony">Sony</option>
              <option value="LG">LG</option>
              <option value="Dell">Dell</option>
              <option value="Infinix">Infinix</option>
            </select>
          </div>

          <div className="col-md-4">
            <input
              type="text"
              name="name"
              placeholder="Model"
              className="form-control"
              value={productForm.name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="col-md-4">
            <input
              type="text"
              name="sku"
              placeholder="SKU"
              className="form-control"
              value={productForm.sku}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="form-control"
              value={productForm.price}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              step="0.01"
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              className="form-control"
              value={productForm.quantity}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="col-md-4">
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="form-control"
              value={productForm.description}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="col-12 d-flex justify-content-end gap-2">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editingId ? "Update" : "Add"} Product
            </button>
            {editingId && (
              <button className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <DataTable columns={columns} data={filteredProduct} />
    </div>
  );
};

export default ProductPage;
