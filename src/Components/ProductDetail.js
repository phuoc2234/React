import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import Comments from './Comments';
import PropTypes from 'prop-types';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:2300";

function ProductDetail({ addToCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:2300/products");
        const data = await response.json();
        
        if (isSubscribed) {
          const foundProduct = data.find((p) => p.name === productId);
          if (!foundProduct) {
            setError("Sản phẩm không tồn tại");
            return;
          }

          setProduct(sanitizeProduct(foundProduct));

          // Lọc sản phẩm liên quan dựa trên từ khóa trong tên sản phẩm
          const keywords = foundProduct.name.toLowerCase().split(' ');
          const related = data
            .filter(p => {
              // Kiểm tra xem sản phẩm có chứa từ khóa nào trong tên không
              const productName = p.name.toLowerCase();
              return keywords.some(keyword => 
                productName.includes(keyword) && 
                p.name !== foundProduct.name
              );
            })
            .slice(0, 4); // Lấy tối đa 4 sản phẩm liên quan
          
          setRelatedProducts(related);
        }
      } catch (err) {
        if (isSubscribed) {
          console.error('Error fetching product:', err);
          setError(err.message || "Lỗi khi tải dữ liệu sản phẩm");
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    fetchData();
    window.scrollTo(0, 0);

    return () => {
      isSubscribed = false;
    };
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      // Kiểm tra trạng thái đăng nhập
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) {
        // Lưu sản phẩm để thêm vào giỏ sau khi đăng nhập
        localStorage.setItem("productToAdd", JSON.stringify(product));
        localStorage.setItem("returnUrl", window.location.pathname); // Lưu URL hiện tại
  
        navigate("/login"); // Chuyển hướng đến trang đăng nhập
        return;
      }
  
      if (!product.quantity) {
        throw new Error('Sản phẩm đã hết hàng');
      }
  
      addToCart(product);
  
      // Hiển thị thông báo thành công
      const notification = document.createElement('div');
      notification.className = 'add-cart-notification success';
      notification.textContent = 'Đã thêm vào giỏ hàng!';
      document.body.appendChild(notification);
  
      setTimeout(() => {
        notification.remove();
      }, 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
  
      // Hiển thị thông báo lỗi
      const notification = document.createElement('div');
      notification.className = 'add-cart-notification error';
      notification.textContent = error.message || 'Có lỗi xảy ra khi thêm vào giỏ';
      document.body.appendChild(notification);
  
      setTimeout(() => {
        notification.remove();
      }, 2000);
    }
  };
  

  const memoizedRelatedProducts = useMemo(() => {
    if (!product) return [];
    return relatedProducts.filter(p => p.name !== product.name).slice(0, 4);
  }, [product, relatedProducts]);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="not-found">Không tìm thấy sản phẩm</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image-section">
          {imageLoading && <div className="image-loading-skeleton" />}
          <img
            src={product.imageLink}
            alt={product.name}
            className="product-detail-image"
            onLoad={() => setImageLoading(false)}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        </div>
        
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <div className="product-price">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </div>
          
          <div className="product-description">
            <h3>Mô tả sản phẩm</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="product-quantity">
            Số lượng còn lại: <span>{product.quantity}</span>
          </div>

          <div className="button-group">
            <button
              onClick={handleAddToCart}
              className="add-to-cart-button"
              disabled={product.quantity === 0}
              aria-label={`Thêm ${product.name} vào giỏ hàng`}
            >
              <FaShoppingCart aria-hidden="true" /> Thêm vào giỏ
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className="back-button"
            >
              <FaArrowLeft /> Quay lại
            </button>
          </div>
        </div>
      </div>

      {/* Thêm phần comments */}
      <Comments productId={product.name} />

      {/* Phần sản phẩm liên quan */}
      {memoizedRelatedProducts.length > 0 && (
        <div className="related-products">
          <h2>Sản phẩm bạn có thể thích</h2>
          <div className="related-products-grid">
            {memoizedRelatedProducts.map((relatedProduct) => (
              <div 
                key={relatedProduct.name} 
                className="related-product-card"
                onClick={() => navigate(`/product/${relatedProduct.name}`)}
              >
                <img 
                  src={relatedProduct.imageLink} 
                  alt={relatedProduct.name} 
                />
                <h3>{relatedProduct.name}</h3>
                <p className="related-product-price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(relatedProduct.price)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const sanitizeProduct = (product) => {
  return {
    ...product,
    name: product.name.trim(),
    description: product.description.trim(),
    price: Number(product.price),
    quantity: Number(product.quantity)
  };
};

ProductDetail.propTypes = {
  addToCart: PropTypes.func.isRequired
};

export default ProductDetail;