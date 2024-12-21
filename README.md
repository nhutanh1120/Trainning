# Trainning

1. Cài đặt docker
https://docs.docker.com/desktop/setup/install/windows-install/

2. Sử dụng Composer để tạo dự án Yii2:
composer create-project --prefer-dist yiisoft/yii2-app-basic myapp
cd myapp

3. Setup source chạy lệnh
 - Build Docker container: 
  docker-compose build
 - Chạy các container
  docker-compose up -d
  hoặc 
  docker-compose -p myapp up -d
#Note
 - Lệnh chạy lệnh sau để khởi động lại các container và kiểm tra lỗi:
  docker-compose up --build
 - Lệnh xóa docker-compose
  docker-compose down -v
 - Lệnh kiểm tra các container đang chạy 
  docker ps  