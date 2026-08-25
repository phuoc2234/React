// Hello.js
import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Trang Quản Trị</h1>
        <p>Chào mừng đến với hệ thống quản lý</p>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <i className="fas fa-users"></i>
          <h3>Người Dùng</h3>
          <p>Quản lý tài khoản người dùng</p>
          <Link to="/usermanagement" className="card-link">
            Xem chi tiết
          </Link>
        </div>

        <div className="stat-card">
          <i className="fas fa-box"></i>
          <h3>Sản Phẩm</h3>
          <p>Quản lý danh sách sản phẩm</p>
          <Link to="/productmanagement" className="card-link">
            Xem chi tiết
          </Link>
        </div>

        <div className="stat-card">
          <i className="fas fa-shopping-cart"></i>
          <h3>Đơn Hàng</h3>
          <p>Quản lý đơn hàng</p>
          <Link to="/ordermanagement" className="card-link">
            Xem chi tiết
          </Link>
        </div>

        <div className="stat-card">
          <i className="fas fa-chart-bar"></i>
          <h3>Thống Kê</h3>
          <p>Báo cáo và thống kê</p>
          <Link to="/statistics" className="card-link">
            Xem chi tiết
          </Link>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Thao Tác Nhanh</h2>
        <div className="action-buttons">
          <button className="action-btn">
            <i className="fas fa-plus"></i>
            Thêm Sản Phẩm Mới
          </button>
          <button className="action-btn">
            <i className="fas fa-user-plus"></i>
            Thêm Người Dùng
          </button>
          <button className="action-btn">
            <i className="fas fa-sync"></i>
            Cập Nhật Hệ Thống
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;

