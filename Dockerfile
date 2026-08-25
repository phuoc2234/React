# Giai đoạn 1: Build ứng dụng React
FROM node:18-alpine AS builder

# Thư mục làm việc trong container
WORKDIR /app

# Copy file package trước
COPY package*.json ./

# Cài đặt thư viện
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build React
RUN npm run build


# Giai đoạn 2: Chạy bằng Nginx
FROM nginx:alpine

# Copy kết quả build từ giai đoạn builder
COPY --from=builder /app/build /usr/share/nginx/html

# Mở port 80
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]