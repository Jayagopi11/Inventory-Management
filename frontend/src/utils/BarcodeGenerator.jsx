import React, { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'
const BarcodeGenerator = ({value, width =2, height = 100}) => {
    const svgRef = useRef(null);

    useEffect(() => {
        if (svgRef.current) {
            JsBarcode(svgRef.current,value,{
                format: "CODE123",
                width,
                height,
                displayValue: true,
            });
        }
    },[value,width, height]);

  return (
    <div>
        <svg ref={svgRef}></svg>;
      
    </div>
  )
}

export default BarcodeGenerator
