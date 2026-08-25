import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail'); // Lấy email người dùng từ localStorage

  useEffect(() => {
    if (userEmail) {
      fetchOrders();
    }
  }, [userEmail]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:2300/orders');
      const data = await response.json();
      // Lọc đơn hàng theo email người dùng
      const userOrders = data.filter(order => order.email === userEmail);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      pending: "Chờ xử lý",
      processing: "Đang xử lý",
      shipping: "Đang giao",
      completed: "Đã hoàn thành",
      cancelled: "Đã hủy"
    };
    return statusMap[status] || status;
  };

  return (
    <div className="my-orders">
      <div className="my-orders-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <i className="fas fa-arrow-left"></i> Quay lại
        </button>
        <h1>Đơn Hàng Của Tôi</h1>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>Bạn chưa có đơn hàng nào</p>
          <button onClick={() => navigate('/')} className="shop-now-btn">
            Mua sắm ngay
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-number">
                  <h3>Mã đơn hàng: {order.orderNumber}</h3>
                  <span className={`status-badge status-${order.status}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>
                <div className="order-date">
                  Ngày đặt: {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                </div>
              </div>

              <div className="order-products">
                {order.products?.map((product, index) => (
                  <div key={index} className="product-item">
                    <div className="product-info">
                      <img 
                        src={product.imageLink} 
                        alt={product.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                      <div className="product-details">
                        <h4>{product.name}</h4>
                        <p>Số lượng: {product.quantity}</p>
                        <p>Giá: {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(product.price)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <strong>Tổng tiền:</strong>
                  <span>{new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(order.total)}</span>
                </div>
                <div className="shipping-info">
                  <p><strong>Địa chỉ:</strong> {order.address}</p>
                  <p><strong>Số điện thoại:</strong> {order.phone}</p>
                </div>
                {order.note && (
                  <div className="order-note">
                    <strong>Ghi chú:</strong> {order.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;