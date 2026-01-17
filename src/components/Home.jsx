import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { listProducts } from '../utils/api';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 10;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, products]);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const data = await listProducts(page, productsPerPage);
      
      // Handle different response structures
      // If data has a products array, use it; otherwise assume data is the array
      const productsList = Array.isArray(data) ? data : (data.products || data.data || []);
      
      setProducts(productsList);
      setFilteredProducts(productsList);
      
      // Extract categories from products if available
      if (productsList.length > 0) {
        const uniqueCategories = [...new Set(productsList.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
      }
      
      // Handle pagination if API returns pagination info
      if (data.total_pages || data.totalPages) {
        setTotalPages(data.total_pages || data.totalPages);
      } else if (data.total && data.per_page) {
        setTotalPages(Math.ceil(data.total / data.per_page));
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
      setProducts([]);
      setFilteredProducts([]);
    }
  };

  const filterProducts = () => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
    // Note: We filter client-side on the current page's products
    // If you need to filter across all products, you'd need to fetch all pages
    // or have the API support category filtering
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Use filtered products directly since API handles pagination
  const currentProducts = filteredProducts;

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="home-container">
      <h1>Products</h1>

      <div className="filter-section">
        <label>Filter by Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => {
            const categoryStr = typeof category === 'string' ? category : String(category);
            return (
              <option key={categoryStr} value={categoryStr}>
                {categoryStr.charAt(0).toUpperCase() + categoryStr.slice(1)}
              </option>
            );
          })}
        </select>
      </div>

      <div className="products-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img 
                src={product.thumbnail || product.image || product.images?.[0] || '/logo192.png'} 
                alt={product.title} 
              />
              <h3>{product.title}</h3>
              <p className="price">${product.price || 'N/A'}</p>
              <p className="description">{product.description || ''}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <div className="no-products">No products found</div>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;

