import React from 'react';
import "../App.css";
import Footer from './Footer';

const Service = () => {
    return (
        <div>
            <div className="service-banner">
                <img src="../images/bannerservice.png" alt="Banner" className="banner-image"/>
                <div className="search-container">
                    <input type="text" className="service-search" placeholder="Tìm kiếm..."/>
                    <i className="fas fa-search search-icon"></i>
                </div>
            </div>
            <div className="service-container">
                <div className="service-sidebar">
                    <ul>
                        <li>Thể loại</li>
                        <li>Người dùng mới</li>
                        <li>HomeMall</li>
                        <li>Thanh toán</li>
                        <li>Các chủ đề khác</li>
                        <li>Sản phẩm trên Home Shop</li>
                        <li>Quyền riêng tư dữ liệu</li>
                        <li>Phiếu giảm giá & Khuyến mãi</li>
                        <li>Tài khoản của tôi</li>
                        <li>Sản phẩm lựa chọn</li>
                        <li>Hủy/Trả hàng & Hoàn tiền</li>
                        <li>Vận chuyển & Giao hàng</li>
                    </ul>
                </div>
                <div className="service-main-content">
                    <h1 className="service-title">Sản phẩm trên HomeShop</h1>
                    <div className="service-buttons">
                        <button>Thông tin sản phẩm</button>
                        <button>Sản phẩm nước ngoài</button>
                        <button>Thuế GTGT</button>
                        <button>Bảo hành</button>
                        <button>Báo cáo sản phẩm giả mạo/bị cấm</button>
                        <button>eVoucher & MiniApp</button>
                    </div>
                    <ul className="service-list">
                        <li>Kênh mua sắm đồ gia dụng HomeShop</li>
                        <li>Những câu hỏi thường gặp về mua hàng</li>
                        <li>Hoàn tiền lên đến 500K nếu nơi khác rẻ hơn</li>
                        <li>Một số thông tin chung khi khách đặt hàng ở HomeShop</li>
                        <li>Cách thêm thông tin hóa đơn VAT</li>
                        <li>Tôi có thể tìm thấy sản phẩm mới trên HomeShop không?</li>
                        <li>Làm sao để biết được sản phẩm đó có phải là hàng giả không?</li>
                        <li>Điều khoản và điều kiện đảm bảo tính xác thực 100%</li>
                        <li>Đảm bảo 100% hàng chính hãng - Điểm đến mua sắm đáng tin cậy của bạn</li>
                        <li>Những câu hỏi thường gặp về chương trình 'Đảm bảo giá tốt nhất'</li>
                    </ul>
                    <div className="service-pagination">
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Service;
