# REST API DOCUMENTATION

## E-Commerce Project

---
### GET /products
> Get all products

_response (200)_
```
[
  {
    "id": "<product id>",
    "name": "<product name>",
    "image_url": "<product image url>",
    "price": "<product price>",
    "stock": "<product stock>"
  },
  ...
]
```

_response (401 - No Access)_
```
{
  "message": "didn't have access"
}
```

### POST /products
> Add product

_req headers_
```
{
  "access_token": "<your access_token>" 
}
```

_req body_
```
{
  "name": "<product name>",
  "image_url": "<product image url>",
  "price": "<product price>",
  "stock": "<product stock>"
}
```
_response (201 - Created)_
```
{
  "id": "<product id>",
  "name": "<product name>",
  "image_url": "<product image url>",
  "price": "<product price>",
  "stock": "<product stock>"
}
```

_response (401 - No Access)_
```
{
  "message": "didn't have access"
}
```

_response (400 - Validation Error)_
```
{
  "name": "SequelizeValidationError",
  ...
}
```

### PUT /products/:id
> Edit product

_req headers_
```
{
  "access_token": "<your access_token>"
}
```

_response (200 - Success)_
```
{
  "message": "product updated"
}
```

_response (401 - No Access)_
```
{
  "message": "didn't have access"
}
```

_response (404 - Not Found)_
```
{
  "message": "NOT FOUND"
}
```

### DELETE /products/:id
> Delete product

_req headers_
```
{
  "access_token": "<your access_token>"
}
```

_response (200 - Success)_
```
{
  "message": "product deleted"
}
```

_response (401 - No Access)_
```
{
  "message": "didn't have access"
}
```

_response (404 - Not Found)_
```
{
  "message": "NOT FOUND"
}
```

### POST /admin/register
> Register new admin

_req body_
```
{
  "email": "<your email>",
  "password": "<your password>"
}
```

_response (201 - Created)_
```
{
  "email": "<your email>",
  "password": "<your hashed password>"
}
```

_response (400 - Failed to validate)_
```
{
  "name": "SequelizeValidationError",
  ...
}
```

### POST /customer/register
> Register new customer

_req body_
```
{
  "email": "<your email>",
  "password": "<your password>"
}
```

_response (201 - Created)_
```
{
  "email": "<your email>",
  "password": "<your hashed password>"
}
```

_response (400 - Failed to validate)_
```
{
  "name": "SequelizeValidationError",
  ...
}
```

### POST /login
> Admin or User login

_req body_
```
{
  "email": "<registered email>",
  "password": "<registered password>"
}
```

_response (201 - Created)_
```
{
  "access_token": "<generated access_token>"
}
```

_response (400 - Wrong Email / Password)_
```
{
  "message": "wrong email / password"
}
```

### GET /cart
> Get all cart

_req headers_
```
{
  "access_token": "<your access_token>" 
}
```

_response (200)_
```
[
  {
    "id": "<cart id>",
    "ProductId": "<product id>",
    "UserId": "<User id>",
    "amount": "<product amount>"
  },
  ...
]
```

_response (401 - No Access)_
```
{
  "message": "didn't have access"
}
```

### POST /cart
> Add product

_req headers_
```
{
  "access_token": "<your access_token>" 
}
```

_req body_
```
{
  "ProductId": "<product id>",
  "amount": "<product amount>"
}
```
_response (201 - Created)_
```
{
  "id": "<cart id>",
  "ProductId": "<product id>",
  "UserId": "<User id>",
  "amount": "<product amount>"
}
```

_response (401 - No Access)_
```
{
  "message": "didn't have access"
}
```

_response (400 - Validation Error)_
```
{
  "name": "SequelizeValidationError",
  ...
}
```

### DELETE /cart
> Delete product

_req headers_
```
{
  "access_token": "<your access_token>"
}
```

_req body_
```
{
  "id": "<cart id>"
}
```

_response (200 - Success)_
```
{
  "message": "product deleted"
}
```

_response (401 - No Access)_
```
{
  "message": "didn't have access"
}
```

_response (404 - Not Found)_
```
{
  "message": "NOT FOUND"
}
```
