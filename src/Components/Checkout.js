import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  if (!formData) {
    navigate("/");
    return null;
  }

  return (
    <div className="checkout">
      <div className="checkout-message">
        <h2>Đặt Hàng Thành Công!</h2>
        <p className="order-number">Mã đơn hàng: {formData.orderNumber}</p>

        <div className="order-details">
          <h3>Thông tin người nhận</h3>
          <p><strong>Họ và tên:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Địa chỉ giao hàng:</strong> {formData.address}</p>
          <p><strong>Số điện thoại:</strong> {formData.phone}</p>
          {formData.note && <p><strong>Ghi chú:</strong> {formData.note}</p>}
        </div>

        <div className="payment-info">
          <h3>Thông tin thanh toán</h3>
          <p><strong>Phương thức thanh toán:</strong> {formData.paymentMethod}</p>
        </div>

        <div className="order-status">
          <p>Trạng thái đơn hàng: <span className="status-pending">Chờ xử lý</span></p>
        </div>

        <div className="next-steps">
          <h4>Các bước tiếp theo:</h4>
          <ol>
            <li>Chúng tôi sẽ xử lý đơn hàng của bạn</li>
            <li>Bạn sẽ nhận được email xác nhận đơn hàng</li>
            <li>Chúng tôi sẽ liên hệ khi đơn hàng được giao</li>
          </ol>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate("/")} className="back-to-home">
            Quay về trang chủ
          </button>
          <button onClick={() => navigate("/myorders")} className="view-orders">
            Xem đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
