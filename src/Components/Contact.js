/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../App.css";
import Footer from "./Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý form submit ở đây
    alert('Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-container">
      {/* Banner Section */}
      <div className="contact-banner">
        <h1>Liên Hệ Với Chúng Tôi</h1>
        <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
      </div>

      {/* Contact Info Section */}
      <div className="contact-info-section">
        <div className="contact-info-card">
          <FaPhone className="contact-icon" />
          <h3>Điện thoại</h3>
          <p>1900 1234</p>
          <p>0123 456 789</p>
        </div>

        <div className="contact-info-card">
          <FaEnvelope className="contact-icon" />
          <h3>Email</h3>
          <p>support@homeshop.com</p>
          <p>sales@homeshop.com</p>
        </div>

        <div className="contact-info-card">
          <FaMapMarkerAlt className="contact-icon" />
          <h3>Địa chỉ</h3>
          <p>123 Đường ABC, Quận XYZ</p>
          <p>TP. Hồ Chí Minh, Việt Nam</p>
        </div>
      </div>

      {/* Contact Form & Map Section */}
      <div className="contact-main-section">
        <div className="contact-form-container">
          <h2>Gửi tin nhắn cho chúng tôi</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Họ và tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Tin nhắn</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Gửi tin nhắn</button>
          </form>
        </div>

        <div className="map-container">
          <iframe
            title="location-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197956!2d106.65842325081287!3d10.773374892323556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec3c161a3fb%3A0xef77cd47a1cc691e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1647916217525!5m2!1svi!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <h2>Về HomeShop</h2>
        <p>
          HomeShop là điểm đến lý tưởng cho mọi gia đình hiện đại, cung cấp các sản phẩm 
          gia dụng chất lượng cao từ nồi cơm điện, tủ lạnh đến dụng cụ làm bếp.
        </p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
