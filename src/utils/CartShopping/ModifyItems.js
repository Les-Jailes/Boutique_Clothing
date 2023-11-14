let nameLocalStorage = 'cart';
let cart;

if (typeof window !== 'undefined') {
    cart = JSON.parse(localStorage.getItem(nameLocalStorage)) || { products: [] };
} else {
    cart = { products: [] }
}

export const changeQuantity = (newQuantity, id) => {
    let cart = JSON.parse(localStorage.getItem(nameLocalStorage)) || { products: [] };

    if (cart.products && cart.products.length > 0) {
        const productIndex = cart.products.findIndex((item) => item.__id === id);

        if (productIndex !== -1) {
            const updatedCart = { ...cart };
            updatedCart.products = [...cart.products];

            updatedCart.products[productIndex] = {
                ...updatedCart.products[productIndex],
                quantity: newQuantity
            };
            updatedCart.total = updatedCart.products.reduce(
                (acc, item) => acc + parseFloat(item.price) * item.quantity,
                0
            );
            updatedCart.total = parseFloat(updatedCart.total.toFixed(2));

            localStorage.setItem(nameLocalStorage, JSON.stringify(updatedCart));
        }
    }
};
