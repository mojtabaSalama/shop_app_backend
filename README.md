# shop_backend

Welcome to the `shop_backend` repository! This project is the backend for the `shopApp` application, providing APIs for user authentication, product management, order processing, and more. Below you'll find comprehensive details about the project, including setup instructions, API documentation, and contribution guidelines.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)

  - [Authentication](#authentication)
  - [Products](#products)
  - [Orders](#orders)
  - [Cart](#carts)

- [Contact](#contact)

## About

`shop_backend` is the backend service for the `shopApp` application, built with Node.js and Express. It provides RESTful APIs to manage user authentication, products, and orders.

## Features

- User authentication (signup, signin)
- Product management (fetch)
- Order processing (create, list orders)
- Cart management (add, remove, list items, update items amount)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/)
- You have a MongoDB instance running (local or cloud)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mojtabaSalama/shop_backend.git
   cd shop_backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Server

1. Clone the repo and then run `npm install`.
2. add **public** folder in the root file then add **image** file in it .
3. add **.env** file then add your:

```env
DBNAME=
DBUSER=
DBPASSWORD=
DBHOST=
DIALECT=
JWTSECRETADMIN=
JWTSECRETUSER=
```

4. start the sarver by running `npm start`
5. > dont forget to run mysql.

The server will start on `http://localhost:3000`.

## API Documentation

### Authentication

#### Signup a New Customer

- **URL**: `/api/customer/signup`
- **Method**: `POST`
- **Headers**:

  ```json
  {
    "Content-Type": "application/json"
  }
  ```

- **Body**:

  ```json
  {
    "customerName": "John Doe",
    "password": "password123"
  }
  ```

- **Success Response**:

  - **Code**: `201`
  - **Content**:

    ```json
    {
      "token": "token",
      "id": "UUID",
      "customerName": "John Doe"
    }
    ```

#### Signin

- **URL**: `/api/customer/signin`
- **Method**: `POST`
- **Headers**:

  ```json
  {
    "Content-Type": "application/json"
  }
  ```

- **Body**:

  ```json
  {
    "customerName": "John Doe",
    "password": "password123"
  }
  ```

- **Success Response**:

  - **Code**: `200`
  - **Content**:

    ```json
    {
      "token": "token",
      "id": "UUID",
      "customerName": "John Doe"
    }
    ```

### Products

#### Get All Products

- **URL**: `/api/product`
- **Method**: `GET`
- **Headers**:

  ```json
  {
    "Content-Type": "application/json"
  }
  ```

- **Success Response**:

  - **Code**: `200`
  - **Content**:

    ```json
    [
      {
        "id": "product_id",
        "name": "Product Name",
        "description": "Product Description",
        "price": 100,
        "imageUrl": "http://example.com/image.jpg"
      }
    ]
    ```

### Orders

#### Create an Order

- **URL**: `/api/order/create`
- **Method**: `POST`
- **Headers**:

  ```json
  {
    "Content-Type": "application/json",
    "token": "token"
  }
  ```

- **Success Response**:

  - **Code**: `201`
  - **Content**:

    ```json
    {
      "message": "Order completed"
    }
    ```

#### Get All Orders

- **URL**: `/api/order`
- **Method**: `GET`
- **Headers**:

  ```json
  {
    "Content-Type": "application/json",
    "token": "token"
  }
  ```

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:

    ```json
    {
      "orders": [
        {
          "id": "order-id",
          "customerId": "customer_id",
          "productId": "product_id",
          "totalAmount": 1,
          "totalPrice": 99.0,
          "createdAt": "2024-08-06T12:00:00Z",
          "updatedAt": "2024-08-07T14:00:00Z"
        },
        {
          "id": "order_id",
          "customerId": "customer_id",
          "productId": "product_id",
          "totalAmount": 1,
          "totalPrice": 99.0,
          "createdAt": "2024-08-05T10:00:00Z",
          "updatedAt": "2024-08-06T11:00:00Z"
        }
      ]
    }
    ```

#### Get a Single Order

- **URL**: `/api/order/:id`
- **Method**: `GET`
- **Headers**:

  ```json
  {
    "Content-Type": "application/json",
    "token": "token"
  }
  ```

- **Success Response**:

  - **Code**: `200`
  - **Content**:

    ```json
    {
      "order_items": [
        {
          "id": "product_id",
          "name": "Product Name",
          "description": "Product Description",
          "price": 100,
          "imageUrl": "http://example.com/image.jpg"
        },
        {
          "id": "product_id",
          "name": "Product Name",
          "description": "Product Description",
          "price": 100,
          "imageUrl": "http://example.com/image.jpg"
        }
      ]
    }
    ```

    ////////

### Cart

#### Add To Cart

- **URL**: `/api/cart/add/:id`
- **Method**: `POST`
- **Headers**:

  ```json
  {
    "Content-Type": "application/json",
    "token": "token"
  }
  ```

- **Success Response**:

  - **Code**: `201`
  - **Content**:

    ```json
    {
      "message": "Item added to cart successfully"
    }
    ```

#### Get Cart

- **URL**: `/api/cart`
- **Method**: `GET`
- **Headers**:

  ```json
  {
    "Content-Type": "application/json",
    "token": "token"
  }
  ```

- **Success Response**:

  - **Code**: `200`
  - **Content**:

    ```json
    {
      "cart_items": [
        {
          "id": "product_id",
          "name": "Product Name",
          "description": "Product Description",
          "price": 100,
          "imageUrl": "http://example.com/image.jpg"
        },
        {
          "id": "product_id",
          "name": "Product Name",
          "description": "Product Description",
          "price": 100,
          "imageUrl": "http://example.com/image.jpg"
        }
      ],
      "totalPrice": 200
    }
    ```

#### Remove From Cart

- **URL**: `/api/cart/remove/:id`
- **Method**: `POST`
- **Headers**:

  ```json
  {
    "Content-Type": "application/json",
    "token": "token"
  }
  ```

- **Success Response**:

  - **Code**: `200`
  - **Content**:

    ```json
    {
      "message": "Deleted successfully"
    }
    ```

#### Update Cart Item

- **URL**: `/api/cart/update/:id`
- **Method**: `POST`
- **Headers**:

  ```json
  {
    "Content-Type": "application/json",
    "token": "token"
  }
  ```

  - **Content**:

    ```json
    {
      "amount": 2
    }
    ```

- **Success Response**:

  - **Code**: `200`
  - **Content**:

    ```json
    {
      "message": "updated"
    }
    ```

## Contact

For any questions or feedback, please contact me.
