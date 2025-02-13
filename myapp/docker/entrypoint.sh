#!/bin/bash

# Tạo thư mục nếu chưa có
mkdir -p /app/web/uploads/videos

# Cấp quyền đọc, ghi, thực thi cho user và group
chmod -R 775 /app/web/uploads/videos

# Đổi chủ sở hữu thư mục thành www-data
chown -R www-data:www-data /app/web/uploads/videos

# Chạy Apache (lệnh mặc định của container Yii2 PHP)
exec apache2-foreground
