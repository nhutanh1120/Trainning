# Trainning

1. Cài đặt docker
[Docker Installation Guide](https://docs.docker.com/desktop/setup/install/windows-install/)

2. Sử dụng Composer để tạo dự án Yii2:
  ```
  composer create-project --prefer-dist yiisoft/yii2-app-basic myapp
  cd myapp
  ```

3. Setup source chạy lệnh
 - Build Docker container: 
  ```
  docker-compose build
  ```
 - Chạy các container
  ```
  docker-compose up -d
  ```
 - hoặc 
  ```
  docker-compose -p myapp up -d
  ```
 - Lệnh dowload vendor
  ```
  docker exec my-app composer install
  ```

# Note
 - Lệnh chạy lệnh sau để khởi động lại các container và kiểm tra lỗi:
  ```
  docker-compose up --build
  ```
 - Lệnh xóa docker-compose
  ```
  docker-compose down -v
  ```
 - Lệnh kiểm tra các container đang chạy 
  ```
  docker ps  
  ```

## Lệnh truy cập vào container để tạo file migrations
  ```
  docker exec -it your_php_service bash
  php yii migrate/create create_table
  ```
  - hoặc
  ```
  docker exec your_php_service php yii migrate/create create_table
  docker exec your_php_service sh -c "yes | php yii migrate/create create_table"
  ```
## Lệnh tạo table từ file migrations
  ```
  docker exec your_php_service php yii migrate/up 
  docker exec your_php_service sh -c "yes | php yii migrate/up"
  ```

## Lệnh tạo data test
 - 1. Liệt kê các lệnh fixture
  ```
  docker exec your_php_service php yii fixture
  ```
 - 2. Tạo thư mục chứa data test
  ```
  docker exec your_php_service mkdir -p /app/tests/unit/fixtures  
  docker exec your_php_service mkdir -p tests/unit/templates/fixtures
  ```
 - 3. Thực hiện render models tương ứng với table.
  ```
  docker exec your_php_service php yii gii/model \ --tableName=table_name \ --modelClass=model_class \ --ns=app\models
  ```
 - 4. Tạo các file fixtures và data tương ứng, sau đó chạy lệnh bên dưới để render data
  ```
  docker exec your_php_service php yii fixture/load model_class
  docker exec your_php_service sh -c "yes | php yii fixture/load model_class"
  docker exec your_php_service sh -c "yes | php yii fixture/load '*'"
  ```