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