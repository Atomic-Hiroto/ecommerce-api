# Ecommerce API
This is a backend API for an ecommerce application built with Node, Express and MongoDB.

Features: <br/>
- Product catalog (CRUD)<br/>
- Shopping cart<br/>
- User registration and JWT authentication<br/>
- Order placement<br/>
- Order history<br/>
- Rate limiting to handle high load<br/>
- Secure encryption with bcryptjs<br/>

# Create a .env file in then root and add the following:
```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
PATH=your_port -optional (it defaults to port 5000)
```

# Install Dependencies
```
npm install
```

# Run server
```
npm start
```
# API Documentation
To view the list of available APIs and their usage, go to http://localhost:5000/api-docs

## Category APIs
GET /api/categories - Get all categories<br />
```
Returns a list of categories

Sample Response

[
  {
    "id": "1234",
    "name": "Electronics"
  },
  {
    "id": "1235", 
    "name": "Fashion"
  }
]
```
 
## Product APIs
GET /api/products - Get all products<br /> 
```
Returns an array of all products in the database.

Sample Response

[
  {
    "id": "123",
    "name": "Product 1",
    "description": "Description 1", 
    "price": 29.99
  },
  {
    "id": "456",
    "name": "Product 2",
    "description": "Description 2",
    "price": 39.99
  }
]
```
GET /api/products/:id - Get single product by id<br /> 
```
Returns details of a single product

Sample Response

{
  "id": "123",
  "name": "Product 1",
  "description": "Product 1 description",
  "price": 29.99,
  "category": "Electronics" 
}
```
POST /api/products - Create a new product<br /> 
```
Creates a new product.

Sample Request

{
  "name": "Product Name",
  "description": "Product description",
  "price": 49.99
}

Sample Response

{
  "id": "123",
  "name": "Product Name",
  "description": "Product description", 
  "price": 49.99
}
```
PATCH /api/products/:id - Update an existing product by id<br /> 
```
Updates a product by id

Sample Request

PATCH /api/products/123

{
  "price": 24.99
}

Sample Response

{
  "id": "123",
  "name": "Product 1",
  "price": 24.99 // updated price
}
```
DELETE /api/products/:id - Delete a product by id<br /> 
```
Deletes a product

Sample Response

204 No Content - Product Deleted
```

## Cart APIs
POST /api/cart - Create new cart for user<br /> 
```
Creates a new cart for the authenticated user.

Sample Response

{
  "id": "987",
  "user": "134",
  "items": []
}
```
GET /api/cart - Get cart for authenticated user<br /> 
PUT /api/cart/:productId - Add product to cart<br /> 
```
Adds a product to the authenticated user's cart.

Sample Request

PUT /api/cart/123

Sample Response

{
  "id": "987",
  "user": "134",
  "items": [
    {
      "product": "123",
      "quantity": 1
    }
  ]
}
```
PATCH /api/cart/:productId - Update product quantity in cart<br /> 
```
Updates product quantity in cart.

PATCH /api/cart/123

{
  "quantity": 3  
}

Sample Response

{
  "id": "987",
  "user": "134",
  "items": [
    {
      "product": "123",
      "quantity": 3
    }
  ]
}
```
DELETE /api/cart/:productId - Delete product from cart<br /> 
```
Removes an item from cart

Sample Response

{
  "items": [
    // Remaining cart items 
  ]
}
```

## Order APIs
POST /api/orders - Create a new order<br /> 
```
Creates a new order for authenticated user.

Sample Request

{
  "cart": {
    "items": [
      {
        "product": "123",
        "quantity": 2
      },
      {  
        "product": "456",
        "quantity": 1
      }
    ]
  }
}

Sample Response

{
  "id": "1234",
  "total": 99.98, 
  "items": [
    {
      "product": "123",
      "quantity": 2
    },
    {
      "product": "456", 
      "quantity": 1
    }
  ]
}
```
GET /api/orders - Get orders for authenticated user<br /> 
```
Gets order history for authenticated user. Requires valid JWT token as a Bearer auth token.

Sample Response

[
  {
    "id": "1234",
    "total": 99.98,
    "items": [
      {
        "product": "123",
        "quantity": 2
      }
    ]
  },
  {
    "id": "1235",
    "total": 53.99,
    "items": [
      {
        "product": "456",
        "quantity": 1  
      }
    ]
  }
]
```
GET /api/orders/:id - Get order details by id<br /> 
```
Gets order details by id.

Sample Response

{
  "id": "1234",
  "total": 99.98,
  "items": [
    {
      "product": {
        "id": "123",
        "name": "Product 1" 
      },
      "quantity": 2
    }
  ] 
}
```

## User APIs
POST /api/users/register - Register a new user<br />
```
Sample Request

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123" 
}

Sample Response

On successful registration, returns a 200 OK status code along with the user ID.

{
  "id": "61f59f7b85d3f267252e8a1d" 
}
``` 
POST /api/users/login - Login and get token
```
Logs in a user and returns a JWT token.

Sample Request

{
  "email": "john@email.com",
  "password": "password123"
}

Sample Response

{
  "token": "jwt_token_string" 
}
```