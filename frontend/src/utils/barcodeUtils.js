export const generateBarcodeValue = () => {
    const prefix = "INV";
    const unique = Date.now().toString(36).toUpperCase().slice(-6);
    const random = Math.floor(100+ Math.random()* 900);
    return `${prefix}-${unique}-${random}`;
};