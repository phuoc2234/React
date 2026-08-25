import React, { useState, useEffect } from 'react';

const Statistics = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalValue: 0,
    totalQuantity: 0,
    averagePrice: 0,
    topProducts: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productsResponse = await fetch('http://localhost:2300/products');
      const productsData = await productsResponse.json();
      setProducts(productsData);

      const usersResponse = await fetch('http://localhost:2300/user');
      const usersData = await usersResponse.json();
      setUsers(usersData);

      calculateStats(productsData, usersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateStats = (productsData, usersData) => {
    const totalValue = productsData.reduce((sum, product) => sum + Number(product.price), 0);
    const totalQuantity = productsData.reduce((sum, product) => sum + Number(product.quantity), 0);
    const averagePrice = totalValue / productsData.length;

    // Sắp xếp theo giá trị tồn kho (price * quantity)
    const topProducts = [...productsData]
      .sort((a, b) => (b.price * b.quantity) - (a.price * a.quantity))
      .slice(0, 5);

    setStats({
      totalProducts: productsData.length,
      totalUsers: usersData.length,
      totalValue: totalValue,
      totalQuantity: totalQuantity,
      averagePrice: averagePrice,
      topProducts: topProducts
    });
  };

  return (
    <div className="statistics">
      <h1>Thống Kê Hệ Thống</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Tổng Sản Phẩm</h3>
          <p className="stat-value">{stats.totalProducts}</p>
          <i className="fas fa-box stat-icon"></i>
        </div>

        <div className="stat-card">
          <h3>Tổng Số Lượng Tồn Kho</h3>
          <p className="stat-value">{stats.totalQuantity.toLocaleString()}</p>
          <i className="fas fa-warehouse stat-icon"></i>
        </div>

        <div className="stat-card">
          <h3>Tổng Giá Trị Tồn Kho</h3>
          <p className="stat-value">
            {new Intl.NumberFormat('vi-VN', { 
              style: 'currency', 
              currency: 'VND' 
            }).format(stats.totalValue)}
          </p>
          <i className="fas fa-money-bill-wave stat-icon"></i>
        </div>

        <div className="stat-card">
          <h3>Số Người Dùng</h3>
          <p className="stat-value">{stats.totalUsers}</p>
          <i className="fas fa-users stat-icon"></i>
        </div>
      </div>

      <div className="top-products">
        <h2>Top 5 Sản Phẩm Giá Trị Tồn Kho Cao Nhất</h2>
        <div className="products-list">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên Sản Phẩm</th>
                <th>Số Lượng</th>
                <th>Đơn Giá</th>
                <th>Tổng Giá Trị</th>
              </tr>
            </thead>
            <tbody>
              {stats.topProducts.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="product-info">
                      <img src={product.imageLink} alt={product.name} />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{Number(product.quantity).toLocaleString()}</td>
                  <td>
                    {new Intl.NumberFormat('vi-VN', { 
                      style: 'currency', 
                      currency: 'VND' 
                    }).format(product.price)}
                  </td>
                  <td>
                    {new Intl.NumberFormat('vi-VN', { 
                      style: 'currency', 
                      currency: 'VND' 
                    }).format(product.price * product.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="product-inventory">
        <h2>Chi Tiết Tồn Kho</h2>
        <table>
          <thead>
            <tr>
              <th>Sản Phẩm</th>
              <th>Mô Tả</th>
              <th>Số Lượng</th>
              <th>Đơn Giá</th>
              <th>Tổng Giá Trị</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>
                  <div className="product-info">
                    <img src={product.imageLink} alt={product.name} />
                    <span>{product.name}</span>
                  </div>
                </td>
                <td>{product.description}</td>
                <td>{Number(product.quantity).toLocaleString()}</td>
                <td>
                  {new Intl.NumberFormat('vi-VN', { 
                    style: 'currency', 
                    currency: 'VND' 
                  }).format(product.price)}
                </td>
                <td>
                  {new Intl.NumberFormat('vi-VN', { 
                    style: 'currency', 
                    currency: 'VND' 
                  }).format(product.price * product.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;