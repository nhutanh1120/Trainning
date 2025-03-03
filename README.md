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
 - 5. Lệnh tạo thư mục upload video
  ```
  docker exec -it my_yii2_container bash
  mkdir -p /app/web/uploads/videos
  chmod -R 775 /app/web/uploads/videos
  chown -R www-data:www-data /app/web/uploads/videos
  
  volumes:
    - ./uploads/videos:/app/web/uploads/videos
  ```
  ## Setup source với xampp

1. Sửa cấu hình php file /xampp/apache/conf/httpd

  ```
  Listen 127.0.0.1:port
  DocumentRoot "path your_app /myapp/web"
  <Directory "path your_app /myapp/web">
  ```

2. Sửa cấu hình mysql file \xampp\mysql\bin\my.ini

  ```
  [client]
  port=:port
  [mysqld]
  port=:port
  ```

  Sửa cấu hình file \xampp\php\php.ini

  ```
  mysql.default_port=:port
  ```

  Sửa cấu hình file \xampp\phpMyAdmin\config.inc.php

  ```
  $cfg['Servers'][$i]['host'] = '127.0.0.1:3307';
  ```

3. Chạy lệnh tạo database

  ```
  CREATE DATABASE yii2app;
  CREATE USER 'yii2user'@'localhost' IDENTIFIED BY 'yii2pass';
  GRANT ALL PRIVILEGES ON yii2app.* TO 'yii2user'@'localhost';
  FLUSH PRIVILEGES;
  EXIT;
  ```

4. Sửa file myapp\config\db.php

  ```
  'dsn' => 'mysql:host=127.0.0.1;port=:port;dbname=yii2app',
  ```

5. Truy cập vào thư mục dự án chạy lệnh

  ```
  php yii migrate/up
  ```

6. Chạy lệnh tạo data

  ```
  php yii fixture/load '*'
  ```
