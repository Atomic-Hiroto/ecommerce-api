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
 
## Product APIs
GET /api/products - Get all products<br /> 
GET /api/products/:id - Get single product by id<br /> 
POST /api/products - Create a new product<br /> 
PATCH /api/products/:id - Update an existing product by id<br /> 
DELETE /api/products/:id - Delete a product by id<br /> 

## Cart APIs
POST /api/cart - Create new cart for user<br /> 
GET /api/cart - Get cart for authenticated user<br /> 
PUT /api/cart/:productId - Add product to cart<br /> 
POST /api/cart/:productId - Update product quantity in cart<br /> 
DELETE /api/cart/:productId - Delete product from cart<br /> 

## Order APIs
POST /api/orders - Create a new order<br /> 
GET /api/orders - Get orders for authenticated user<br /> 
GET /api/orders/:id - Get order details by id<br /> 

## User APIs
POST /api/users/register - Register a new user<br /> 
POST /api/users/login - Login and get token