// import React, { useEffect, useRef } from "react";
// import JsBarcode from "jsbarcode";

// const BarcodeCard = ({ value, label }) => {
//   const svgRef = useRef(null);

//   useEffect(() => {
//     if (svgRef.current && value) {
//       try {
//         JsBarcode(svgRef.current, String(value), {
//           format: "CODE128",
//           lineColor: "#000",
//           width: 1,
//           height: 30,
//           margin: 1,
//           displayValue: false,
//         });
//       } catch (error) {
//         console.error("JsBarcode Error:", error);
//       }
//     }
//   }, [value]);

//   return (
//     <div
//       className="card p-2 m-2 d-flex align-items-center justify-content-center text-center"
//       style={{ width: "300px", height: "150px" }}
//     >
//       <svg ref={svgRef} style={{ maxWidth: "100%", height: "auto" }}></svg>
//       <p className="mt-2 fw-bold" style={{ fontSize: "15px" }}>
//         {label}
//       </p>
//     </div>
//   );
// };

// export default BarcodeCard;

import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

const BarcodeCard = ({ value, label }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && value) {
      try {
        JsBarcode(svgRef.current, String(value), {
          format: "CODE128",
          lineColor: "#000",
          width: 1,
          height: 30,
          margin: 1,
          displayValue: false,
        });
      } catch (error) {
        console.error("JsBarcode Error:", error);
      }
    }
  }, [value]);

  return (
    <div
      className="card p-2 m-2 d-flex align-items-center justify-content-center text-center"
      style={{ width: "300px", height: "150px" }}
    >
      <svg ref={svgRef} style={{ maxWidth: "100%", height: "auto" }}></svg>
      <div className="mt-2 fw-bold" style={{ fontSize: "15px" }}>
        {label}
      </div>
    </div>
  );
};

export default BarcodeCard;
