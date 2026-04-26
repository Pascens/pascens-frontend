export const fetchProductInfo = async (barcode: string) => {
  return fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}.json`)
    .then((response) => response.json())
    .then((json) => json.product.product_name || "Producto desconocido")
    .catch(() => "Error de conexión");
};
