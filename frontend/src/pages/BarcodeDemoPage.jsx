import React, { useState } from 'react'
import { generateBarcodeValue } from '../utils/barcodeUtils';
import BarcodeGenerator from '../utils/BarcodeGenerator';

const BarcodeDemoPage = () => {
    const [barcode,setBarcode] = useState('');

    const handleGenerate = () => {
        const newCode = generateBarcodeValue();
        setBarcode(newCode);
    };

  return (
    <div className='container mt-5 text-center'>
        <h2 className='mb-4'>Barcode Generator Demo</h2>
        <button className='btn btn-primary mb-4' onClick={handleGenerate}>Generate Barcode</button>

        {barcode && (
            <div>
                <h5>Generated Code:{barcode}</h5>
                <BarcodeGenerator value={barcode} />
                </div>
        )}      
    </div>
  );
};

export default BarcodeDemoPage;
