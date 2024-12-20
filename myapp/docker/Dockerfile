# Sử dụng image PHP với Apache
FROM php:7.4-apache

# Cài đặt các phần mở rộng PHP cần thiết
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-install intl pdo_mysql zip opcache

# Cài đặt Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Cài đặt mã nguồn
WORKDIR /var/www/html
COPY . /var/www/html

# Cấp quyền cho thư mục runtime và web/assets
RUN chown -R www-data:www-data /var/www/html/runtime /var/www/html/web/assets

# Kích hoạt mod_rewrite của Apache
RUN a2enmod rewrite
