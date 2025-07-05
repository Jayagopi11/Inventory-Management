// import { useEffect, useState } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import StockBarcodeCard from "../../pages/StockBarcodeCard";

// const StockPage = () => {
//   const [stocks, setStocks] = useState([]);
//   const [search, setSearch] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [statusFilter, setStatusFilter] = useState("All");

//   useEffect(() => {
//     const fetchStocks = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get("http://localhost:5000/api/stocks");
//         const updated = res.data.map((item, idx) => ({
//           ...item,
//           barcode: item.barcode || `BRCD${1000 + idx}`,
//         }));

//         setStocks(updated);
//         if (Array.isArray(res.data)) {
//           setStocks(res.data);
//           setError(null);
//         } else {
//           setError("Invalid data format from server");
//         }
//       } catch (err) {
//         setError("Failed to load stock data");
//       }
//       setLoading(false);
//     };

//     fetchStocks();
//   }, []);

//   // ..... StockStatus to show the stock ..........//

//   const getStockStatus = (remaining) => {
//     if (remaining < 1)
//       return { label: "Out of Stock", className: "text-danger fw-bold" };
//     if (remaining >= 1 && remaining < 10)
//       return { label: "Low Stock", className: "text-warning fw-bold" };
//     return { label: "In Stock", className: "text-success fw-bold" };
//   };

//   // ..... Filter the detail ..........//

//   const filteredStocks = stocks.filter((item) => {
//     const remaining = item.purchased - item.sold;
//     const status = getStockStatus(remaining).label;

//     const searchText = search.trim().toLowerCase();

//     const matchesSearch =
//       item.brand?.toLowerCase().includes(searchText) ||
//       item.name?.toLowerCase().includes(searchText) ||
//       item.Category?.toLowerCase().includes(searchText) ||
//       status.toLowerCase().includes(searchText);

//     const matchesStatus = statusFilter === "All" || status === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   // ..... Export To PDF download ..........//

//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Stock Report", 14, 10);
//     autoTable(doc, {
//       head: [
//         [
//           "Brand",
//           "Product Model",
//           "Category",
//           "Purchased",
//           "Sold",
//           "Remaining",
//           "Status",
//         ],
//       ],
//       body: filteredStocks.map((item) => {
//         const remaining = item.purchased - item.sold;
//         const status = getStockStatus(remaining).label;
//         return [
//           item.brand,
//           item.name,
//           item.Category,
//           item.purchased,
//           item.sold,
//           remaining,
//           status,
//         ];
//       }),
//       startY: 20,
//     });
//     doc.save("stock-report.pdf");
//   };

//   // ..... Export To Excel Download..........//

//   const exportToExcel = () => {
//     const data = filteredStocks.map((item) => {
//       const remaining = item.purchased - item.sold;
//       const status = getStockStatus(remaining).label;
//       return {
//         brand: item.brand,
//         Model: item.name,
//         Category: item.Category,
//         Purchased: item.purchased,
//         Sold: item.sold,
//         Remaining: remaining,
//         Status: status,
//       };
//     });

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Report");

//     const excelBuffer = XLSX.write(workbook, {
//       type: "array",
//       bookType: "xlsx",
//     });
//     const file = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });
//     saveAs(file, "stock-report.xlsx");
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-primary mb-4">Stock Report</h2>

//       <div className="row mb-3 justify-content-between">
//         <div className="col-md-6">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search by brand or model..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <div className="col-md-3">
//           <select
//             className="form-select"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="All">All Statuses</option>
//             <option value="In Stock">In Stock</option>
//             <option value="Low Stock">Low Stock</option>
//             <option value="Out of Stock">Out of Stock</option>
//           </select>
//         </div>

//         <div className="col-md-6 d-flex justify-content-end gap-2">
//           <button
//             className="btn btn-outline-primary mt-3"
//             onClick={exportToPDF}
//           >
//             Download PDF
//           </button>
//           <button
//             className="btn btn-outline-success mt-3"
//             onClick={exportToExcel}
//           >
//             Download Excel
//           </button>
//         </div>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-danger">{error}</p>}
//       {!loading && !error && filteredStocks.length === 0 && (
//         <p>No stock data found.</p>
//       )}

//       {!loading && !error && filteredStocks.length > 0 && (
//         <div className="table-responsive">
//           <table className="table table-bordered table-striped table-hover text-center">
//             <thead className="table-dark">
//               <tr>
//                 <th>Brand</th>
//                 <th>Product Model</th>
//                 <th>Category</th>
//                 <th>Purchased</th>
//                 <th>Sold</th>
//                 <th>Remaining</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredStocks.map((item, index) => {
//                 const remaining = item.purchased - item.sold;
//                 const { label, className } = getStockStatus(remaining);

//                 return (
//                   <tr key={item._id || index}>
//                     <td>{item.brand}</td>
//                     <td>{item.name}</td>
//                     <td>{item.Category || "Unknown"}</td>
//                     <td>{item.purchased}</td>
//                     <td>{item.sold}</td>
//                     <td>{remaining}</td>
//                     <td className={className}>{label}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <div className="container mt-5">
//         <h2 className="text-primary mb-4">Stock Barcodes</h2>

//         <div className="row">
//           {filteredStocks.map((item) => (
//             <div className="col-md-3" key={item._id}>
//               <StockBarcodeCard
//                 value={
//                   item.barcode || `${item.name}-${item.brand} -${item.remaining}`
//                 }
//                 label={
//                   <>
//                     <div>{item.brand}</div>
//                     <div>{item.name}</div>
//                   </>
//                 }
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockPage;

import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import BarcodeCard from "../../pages/StockBarcodeCard";

const StockPage = () => {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/stocks");
        const updated = res.data.map((item, idx) => ({
          ...item,
          barcode: item.barcode || `BRCD${1000 + idx}`,
        }));

        if (Array.isArray(updated)) {
          setStocks(updated);
          setError(null);
        } else {
          setError("Invalid data format from server");
        }
      } catch (err) {
        setError("Failed to load stock data");
      }
      setLoading(false);
    };

    fetchStocks();
  }, []);

  const getStockStatus = (remaining) => {
    if (remaining < 1)
      return { label: "Out of Stock", className: "text-danger fw-bold" };
    if (remaining < 10)
      return { label: "Low Stock", className: "text-warning fw-bold" };
    return { label: "In Stock", className: "text-success fw-bold" };
  };

  const filteredStocks = stocks.filter((item) => {
    const remaining = item.purchased - item.sold;
    const status = getStockStatus(remaining).label;
    const searchText = search.trim().toLowerCase();

    const matchesSearch =
      item.brand?.toLowerCase().includes(searchText) ||
      item.name?.toLowerCase().includes(searchText) ||
      item.Category?.toLowerCase().includes(searchText) ||
      status.toLowerCase().includes(searchText);

    const matchesStatus = statusFilter === "All" || status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Stock Report", 14, 10);
    autoTable(doc, {
      head: [["Brand", "Model", "Category", "Purchased", "Sold", "Remaining", "Status"]],
      body: filteredStocks.map((item) => {
        const remaining = item.purchased - item.sold;
        const status = getStockStatus(remaining).label;
        return [
          item.brand,
          item.name,
          item.Category,
          item.purchased,
          item.sold,
          remaining,
          status,
        ];
      }),
      startY: 20,
    });
    doc.save("stock-report.pdf");
  };

  const exportToExcel = () => {
    const data = filteredStocks.map((item) => {
      const remaining = item.purchased - item.sold;
      const status = getStockStatus(remaining).label;
      return {
        Brand: item.brand,
        Model: item.name,
        Category: item.Category,
        Purchased: item.purchased,
        Sold: item.sold,
        Remaining: remaining,
        Status: status,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Report");

    const excelBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(file, "stock-report.xlsx");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4">Stock Report</h2>

      <div className="row mb-3 justify-content-between">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by brand or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="col-md-6 d-flex justify-content-end gap-2">
          <button className="btn btn-outline-primary mt-3" onClick={exportToPDF}>
            Download PDF
          </button>
          <button className="btn btn-outline-success mt-3" onClick={exportToExcel}>
            Download Excel
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && filteredStocks.length === 0 && (
        <p>No stock data found.</p>
      )}

      {!loading && !error && filteredStocks.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Category</th>
                <th>Purchased</th>
                <th>Sold</th>
                <th>Remaining</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map((item, index) => {
                const remaining = item.purchased - item.sold;
                const { label, className } = getStockStatus(remaining);

                return (
                  <tr key={item._id || `${item.name}-${item.brand}-${index}`}>
                    <td>{item.brand}</td>
                    <td>{item.name}</td>
                    <td>{item.Category || "Unknown"}</td>
                    <td>{item.purchased}</td>
                    <td>{item.sold}</td>
                    <td>{remaining}</td>
                    <td className={className}>{label}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="container mt-5">
        <h2 className="text-primary mb-4">Stock Barcodes</h2>
        <div className="row">
          {filteredStocks.map((item, index) => (
            <div
              className="col-md-3"
              key={item._id || `${item.name}-${item.brand}-${index}`}
            >
              <BarcodeCard
                value={item.barcode}
                label={
                  <div>
                    <div>{item.brand}</div>
                    <div>{item.name}</div>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockPage;

