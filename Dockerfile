FROM php:8.4-apache

# Installer PDO MySQL et autres extensions utiles
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Activer les modules Apache si besoin
RUN a2enmod rewrite
