# Giai đoạn build
FROM node:20-alpine AS builder

WORKDIR /app

# Sao chép package.json và cài đặt dependencies
# Giả định bạn đang sử dụng npm. Nếu bạn dùng yarn hoặc pnpm, hãy thay đổi lệnh cài đặt tương ứng.
COPY package.json ./
# Nếu bạn có package-lock.json hoặc yarn.lock, hãy sao chép chúng ở đây
# COPY package-lock.json ./
RUN npm install

# Sao chép toàn bộ mã nguồn của ứng dụng
COPY . .

# Build ứng dụng Nuxt.js
RUN npm run build

# Giai đoạn chạy (production)
FROM node:20-alpine

WORKDIR /app

# Sao chép các file cần thiết từ giai đoạn build
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dev.db ./dev.db

# Expose cổng mà Nuxt.js chạy (mặc định là 3000)
EXPOSE 3000

# Lệnh để khởi động ứng dụng
CMD ["npm", "run", "start"]
