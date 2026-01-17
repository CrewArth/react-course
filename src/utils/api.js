import postmanCollection from '../postman-collection.json';

// Get base URL from Postman collection
const getBaseUrl = () => {
  const urlVariable = postmanCollection.variable?.find(v => v.key === 'url');
  return urlVariable?.value || 'https://interview-api.kodecreators.com/api';
};

const BASE_URL = getBaseUrl();

// API Functions for Authentication

/**
 * Login user
 * @param {string} username - Username or email
 * @param {string} password - User password
 * @returns {Promise} Response data with token and user info
 */
export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// API Functions for Products

/**
 * List products with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} perPage - Items per page (default: 10)
 * @returns {Promise} Response data
 */
export const listProducts = async (page = 1, perPage = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/products/list?page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Create a new product
 * @param {Object} productData - Product data
 * @param {string} productData.title - Product title (required)
 * @param {string} productData.description - Product description (required)
 * @param {string} productData.price - Product price (optional)
 * @param {File[]} productData.images - Array of image files (optional)
 * @returns {Promise} Response data
 */
export const createProduct = async (productData) => {
  try {
    const formData = new FormData();
    
    // Add required fields
    formData.append('title', productData.title);
    formData.append('description', productData.description);
    
    // Add optional fields
    if (productData.price) {
      formData.append('price', productData.price);
    }
    
    // Add images if provided
    if (productData.images && Array.isArray(productData.images)) {
      productData.images.forEach((image, index) => {
        if (image) {
          formData.append(`images[${index}]`, image);
        }
      });
    }
    
    const response = await fetch(`${BASE_URL}/products/create`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Edit an existing product
 * @param {number} productId - Product ID
 * @param {Object} productData - Product data
 * @param {string} productData.title - Product title (required)
 * @param {string} productData.description - Product description (required)
 * @param {string} productData.price - Product price (optional)
 * @returns {Promise} Response data
 */
export const editProduct = async (productId, productData) => {
  try {
    const formData = new FormData();
    
    // Add required fields
    formData.append('title', productData.title);
    formData.append('description', productData.description);
    
    // Add optional fields
    if (productData.price) {
      formData.append('price', productData.price);
    }
    
    const response = await fetch(`${BASE_URL}/products/${productId}/edit`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error editing product:', error);
    throw error;
  }
};

/**
 * Delete a product
 * @param {number} productId - Product ID
 * @returns {Promise} Response data
 */
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}/delete`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export default {
  login,
  listProducts,
  createProduct,
  editProduct,
  deleteProduct,
  BASE_URL,
};
