// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// const DashboardPage = () => {
//   const [stockData, setStockData] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchStockData = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/stocks");
//         setStockData(res.data || []);
//       } catch (err) {
//         console.error("Error fetching stock data", err);
//         setError("Failed to load dashboard data");
//       }
//     };
//     fetchStockData();
//   }, []);

//   const COLORS = ["#ff4d4f", "#faad14", "#52c41a"]; ///....... Red, Orange, Green ........ ///

//   const totalPurchased = stockData.reduce(
//     (acc, item) => acc + item.purchased,
//     0
//   );
//   const totalSold = stockData.reduce((acc, item) => acc + item.sold, 0);
//   const totalRemaining = stockData.reduce(
//     (acc, item) => acc + item.remaining,
//     0
//   );

//   const summaryPie = [
//     { name: "Purchased", value: totalPurchased },
//     { name: "Sold", value: totalSold },
//     { name: "Remaining", value: totalRemaining },
//   ];

//   const outOfStock = stockData.filter((item) => item.remaining <= 0);
//   const lowStock = stockData.filter(
//     (item) => item.remaining > 0 && item.remaining <= 20
//   );
//   const inStock = stockData.filter((item) => item.remaining > 20);

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center text-primary mb-5">Inventory Dashboard</h2>

//       {error && <p className="text-danger text-center">{error}</p>}

//       {!error && stockData.length > 0 && (
//         <>
//           <div className="row mb-5">
//             <div className="col-md-6">
//               <h5 className="text-center">Product-wise Stock Levels</h5>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={stockData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="purchased" fill="#8884d8" name="Purchased" />
//                   <Bar dataKey="sold" fill="#82ca9d" name="Sold" />
//                   <Bar dataKey="remaining" fill="#ffc658" name="Remaining" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             <div className="col-md-6">
//               <h5 className="text-center">Inventory Summary</h5>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={summaryPie}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={100}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label={({ name, value }) => `${name}: ${value}`}
//                   >
//                     {summaryPie.map((_, index) => (
//                       <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                     ))}

                    
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="row mb-5 ">
//             <div className="col-md-4 mt-5">
//               <div className="card border-danger">
//                 <div className="card-header bg-danger text-white text-center">
//                   Out of Stock
//                 </div>
//                 <div className="card-body">
//                   {outOfStock.length > 0 ? (
//                     <ul className="list-group list-group-flush">
//                       {outOfStock.map((item) => (
//                         <li key={item._id} className="list-group-item">
//                           {item.brand} -{item.name}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="text-center text-muted">No products</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4 mt-5">
//               <div className="card border-warning">
//                 <div className="card-header bg-warning text-dark text-center">
//                   Low Stock
//                 </div>
//                 <div className="card-body">
//                   {lowStock.length > 0 ? (
//                     <ul className="list-group list-group-flush">
//                       {lowStock.map((item) => (
//                         <li key={item._id} className="list-group-item">
//                           {item.brand} - {item.name} - {item.remaining} left
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="text-center text-muted">No products</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4 mt-5">
//               <div className="card border-success">
//                 <div className="card-header bg-success text-white text-center">
//                   In Stock
//                 </div>
//                 <div className="card-body">
//                   {inStock.length > 0 ? (
//                     <ul className="list-group list-group-flush">
//                       {inStock.map((item) => (
//                         <li key={item._id} className="list-group-item">
//                           {item.brand} - {item.name} - {item.remaining} left
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="text-center text-muted">No products</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default DashboardPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const DashboardPage = () => {
  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stocks");
        // console.log("Fetched stock data:", res.data);
        setStockData(res.data || []);
      } catch (err) {
        console.error("Error fetching stock data", err);
        setError("Failed to load dashboard data");
      }
    };
    fetchStockData();
  }, []);

  const COLORS = ["#ff4d4f", "#faad14", "#52c41a"];

  const totalPurchased = stockData.reduce((acc, item) => acc + item.purchased, 0);
  const totalSold = stockData.reduce((acc, item) => acc + item.sold, 0);
  const totalRemaining = stockData.reduce((acc, item) => acc + item.remaining, 0);

  const summaryPie = [
    { name: "Purchased", value: totalPurchased },
    { name: "Sold", value: totalSold },
    { name: "Remaining", value: totalRemaining },
  ];

  const outOfStock = stockData.filter((item) => item.remaining <= 0);
  const lowStock = stockData.filter((item) => item.remaining > 0 && item.remaining <= 20);
  const inStock = stockData.filter((item) => item.remaining > 20);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-5">Inventory Dashboard</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      {!error && stockData.length > 0 && (
        <>
          <div className="row mb-5">
            <div className="col-md-6">
              <h5 className="text-center">Product-wise Stock Levels</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="purchased" fill="#8884d8" name="Purchased" />
                  <Bar dataKey="sold" fill="#82ca9d" name="Sold" />
                  <Bar dataKey="remaining" fill="#ffc658" name="Remaining" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="col-md-6">
              <h5 className="text-center">Inventory Summary</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={summaryPie}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {summaryPie.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[summaryPie.indexOf(entry) % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-md-4 mt-5">
              <div className="card border-danger">
                <div className="card-header bg-danger text-white text-center">
                  Out of Stock
                </div>
                <div className="card-body">
                  {outOfStock.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {outOfStock.map((item) => (
                        <li key={item._id || `${item.name}-out`} className="list-group-item">
                          {item.brand} - {item.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted">No products</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-5">
              <div className="card border-warning">
                <div className="card-header bg-warning text-dark text-center">
                  Low Stock
                </div>
                <div className="card-body">
                  {lowStock.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {lowStock.map((item) => (
                        <li key={item._id || `${item.name}-low`} className="list-group-item">
                          {item.brand} - {item.name} - {item.remaining} left
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted">No products</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-5">
              <div className="card border-success">
                <div className="card-header bg-success text-white text-center">
                  In Stock
                </div>
                <div className="card-body">
                  {inStock.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {inStock.map((item) => (
                        <li key={item._id || `${item.name}-in`} className="list-group-item">
                          {item.brand} - {item.name} - {item.remaining} left
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted">No products</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;

