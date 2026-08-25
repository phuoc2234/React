/* eslint-disable react-hooks/exhaustive-deps */
// cách chạy dự án cd server, cd auth-server , node server.js
//npm install json-server
//npm install -g json-server
// cd src chạy lệnh json-server --watch bao.json --port 2300
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./Footer";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeLeft, setTimeLeft] = useState(3600);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    "../images/bannerhome.jpg",
    "../images/banner-home1.jpg",
    "../images/banner-home2.jpg"
  ];
  
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    banners.forEach((banner, index) => {
      const img = new Image();
      img.src = banner;
      img.onload = () => console.log(`Banner ${index + 1} loaded successfully`);
      img.onerror = () => console.error(`Error loading banner ${index + 1}`);
    });
  }, [banners]);

  useEffect(() => {
    fetch("http://localhost:2300/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initially, show all products
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSearch = () => {
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(result);
    setCurrentPage(1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleAddToCart = (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      // Lưu lại sản phẩm vào localStorage để sử dụng sau khi đăng nhập
      localStorage.setItem("productToAdd", JSON.stringify(product));

      // Lưu lại URL return để chuyển hướng về sau khi đăng nhập
      localStorage.setItem("returnUrl", window.location.pathname);

      // Chuyển hướng đến trang đăng nhập
      navigate("/login");
      return;
    }

    addToCart(product);
    setAlertMessage(`${product.name} đã được thêm vào giỏ hàng!`);
    setShowAlert(true);

    setTimeout(() => setShowAlert(false), 3000);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="Home">
      <div className="carousel">
        <div className="carousel-container">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`carousel-item ${index === currentSlide ? "active" : ""}`}
              style={{
                opacity: index === currentSlide ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
        <button className="carousel-prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="carousel-next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      <div className="flash-sale-timer">
        <div className="flash-sale-text">FLASH SALE</div>
        <div className="timer-unit">{formatTime(timeLeft).split(":")[0]}</div>
        <div className="colon">:</div>
        <div className="timer-unit">{formatTime(timeLeft).split(":")[1]}</div>
        <div className="colon">:</div>
        <div className="timer-unit">{formatTime(timeLeft).split(":")[2]}</div>
      </div>

      {showAlert && <div className="alert">{alertMessage}</div>}

      <main className="main">
        <div className="main_search">
          <div className="search_button">
            <input
              type="text"
              placeholder="Search..."
              className="search_in"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                const result = products.filter((product) =>
                  product.name.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setFilteredProducts(result);
                setCurrentPage(1);
              }}
            />
            <input
              type="submit"
              value="Search"
              className="search_sub"
              onClick={handleSearch}
            />
          </div>
          <div className="search_text">
            <h1>DANH SÁCH SẢN PHẨM</h1>
          </div>
        </div>

        <div className="main_products">
          {currentProducts.map((product, index) => (
            <div
              key={index}
              className="main_product"
              onMouseEnter={() => setHoveredProduct(product)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <img
                src={product.imageLink}
                alt={product.name}
                className="product_image"
              />
              <div className="product_min">
                <h3>{product.name}</h3>
                <p>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  type="button"
                  className="main_cart"
                >
                  Thêm vào giỏ
                </button>
                <Link to={`/product/${product.name}`} className="product_link">
                  Xem thông tin
                </Link>
              </div>
              {hoveredProduct === product && (
                <button
                  className="quick_view_button"
                  onClick={() => setQuickViewProduct(product)}
                >
                  Xem nhanh
                </button>
              )}
            </div>
          ))}

          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={index + 1 === currentPage ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 && <h2>KHÔNG TÌM THẤY SẢN PHẨM</h2>}
        </div>
      </main>

      {quickViewProduct && (
        <div className="quick_view_modal">
          <div className="modal_content">
            <button className="close_button" onClick={() => setQuickViewProduct(null)}>
              X
            </button>
            <h2>{quickViewProduct.name}</h2>
            <img
              src={quickViewProduct.imageLink}
              alt={quickViewProduct.name}
              className="product_image"
            />
            <p>{quickViewProduct.description}</p>
            <p>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(quickViewProduct.price)}
            </p>
            <button onClick={() => handleAddToCart(quickViewProduct)} className="add_to_cart_button">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;
