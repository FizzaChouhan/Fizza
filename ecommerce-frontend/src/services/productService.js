import api from './api';

// Get all products
const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

// Get product details
const getProductDetails = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

const productService = {
  getProducts,
  getProductDetails,
};

export default productService;