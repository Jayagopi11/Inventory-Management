export const isNotEmpty = (value) => {
    return typeof value === "string" && value.trim() !=="";
}

export const isValidNumber = (value) => {
    return !isNaN(value) && value !== "" && Number(value) >= 0;
};

export const validatePurchaseForm = (form) => {
    const { item, brand, supplier, quantity, cost } = form;

    if(
        !isNotEmpty(item) ||
        !isNotEmpty(brand) ||
        !isNotEmpty(supplier) ||
        !isNotEmpty(quantity) ||
        !isNotEmpty(cost) 
    ) {
        return false;
    }
    return true;
};

export const validateSalesForm = (form) => {
    const {customerName, orderDate, totalAmount} = form;

    if (
        !isNotEmpty(customerName) ||
        !isNotEmpty(orderDate) ||
        !isNotEmpty(totalAmount) 
    ) {
        return false;
    }
    return true;
}