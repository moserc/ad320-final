# *Go Outside Co* API Documentation
*APIs to support Go Outside Co*

## Login
**Request Format:** /api/user/login

**Request Type:** POST

**Returned Data Format**: status code

**Description:** Authenticates a user and creates a session.

**Example Request:** /api/user/login
```
{
    email: test@test.local
    password: password
}
```

**Example Response:** Redirect to root

**Error Handling:**
Returns 500 error on failure.
Returns 400 error on bad email/password.


## Logout
**Request Format:** /api/user/logout

**Request Type:** POST

**Returned Data Format**: status code

**Description:**  Logs out the user by clearing the session cookie.

**Example Request:** /api/user/logout

**Example Response:** Redirect to root

**Error Handling:**
N/A


## Register
**Request Format:** /api/user/register

**Request Type:** POST

**Returned Data Format**: status code

**Description:** Registers a new user.

**Example Request:** /api/user/register
```
{
    email: test@test.local
    password: password
}
```

**Example Response:** Redirect to root

**Error Handling:**
Returns 500 error on failure.


## Post Item Review
**Request Format:** /api/user/review

**Request Type:** POST

**Returned Data Format**: status code

**Description:** Posts a review for a purchased item.

**Example Request:** /api/user/review
```
{
    "transactionId": "123",
    "rating": 5,
    "review_text": "Great product!"
}
```

**Example Response:** Redirect to root

**Error Handling:**
Returns 500 error on failure.
Returns 400 error on bad input data.


## Get Transactions by Customer
**Request Format:** /api/transaction/user/

**Request Type:** GET

**Returned Data Format**: json

**Description:** Retrieves transactions for a specific customer.

**Example Request:** /api/user/review
```
{
    "transactionId": 123,
    "rating": 5,
    "review_text": "Great product!"
}
```

**Example Response:** 
```json
[
    {
        "transaction_id": 123,
        "customer_id": 27,
        "name": "Snowshoes: rolling terrain",
        "checkout": "2023-12-13",
        "checkin": "2023-12-15"
    }
]
```

**Error Handling:**
Returns 500 error on failure.


## Get Transactions by Item
**Request Format:** /api/transaction/item/:item

**Request Type:** GET

**Returned Data Format**: json

**Description:** Retrieves transactions for a specific customer.

**Example Request:** /api/transaction/item/2

**Example Response:** 
```json
[
    {
        "transaction_id": 123,
        "item_id": 2,
        "customer_id": 27,
        "checkout": "2023-12-12T12:00:00",
        "checkin": "2023-12-15T12:00:00"
    }
]
```

**Error Handling:**
Returns 500 error on failure.


## Post Reserve
**Request Format:** /api/transaction/reserve

**Request Type:** POST

**Returned Data Format**: json

**Description:** Posts a review for a purchased item.

**Example Request:** /api/transaction/reserve
```
{
    "itemId": 2,
    "checkout": "2023-12-12T12:00:00",
    "checkin": "2023-12-14T12:00:00"
}
```

**Example Response:** 
```json
{
    "transaction_id": 123
}
```

**Error Handling:**
Returns 500 error on failure.
Returns 400 error on bad input data.


## Get All Items
**Request Format:** /api/item

**Request Type:** GET

**Returned Data Format**: json

**Description:** Retrieves all items with average feedback ratings.

**Example Request:** /api/item/2

**Example Response:** 
```json
[
    {
        "item_id": 7,
        "category": "Bikes",
        "name": "mountain",
        "price": 27.00,
        "brand_name": "Co-op_Cycles",
        "photo_url": "co-op_cycles.png",
        "rating_review": 4
    },
    {
        "item_id": 7,
        "category": "Bikes",
        "name": "road",
        "price": 99.00,
        "brand_name": "Salsa",
        "photo_url": "salsaa.png",
        "rating_review": 3.5
    }
]
```

**Error Handling:**
Returns 500 error on failure.


## Get All Categories
**Request Format:** /api/item/category/

**Request Type:** GET

**Returned Data Format**: json

**Description:** Retrieves all unique item categories.

**Example Request:** /api/item/category/

**Example Response:** 
```json
[
    "Bikes",
    "Camping",
    "Skis",
    "Snow tube",
    "Snowshoes",
    "Water sports"
]
```

**Error Handling:**
Returns 500 error on failure.


## Get Items by Category
**Request Format:** /api/item/category/:category

**Request Type:** GET

**Returned Data Format**: json

**Description:** Retrieves items based on a specific category with average feedback ratings.

**Example Request:** /api/item/category/Bikes

**Example Response:** 
```json
[
    {
        "item_id": 7,
        "category": "Bikes",
        "name": "mountain",
        "price": 27.00,
        "brand_name": "Co-op_Cycles",
        "photo_url": "co-op_cycles.png",
        "rating_review": 4
    },
    {
        "item_id": 7,
        "category": "Bikes",
        "name": "road",
        "price": 99.00,
        "brand_name": "Salsa",
        "photo_url": "salsaa.png",
        "rating_review": 3.5
    }
]
```

**Error Handling:**
Returns 500 error on failure.


## Get Item by ID
**Request Format:** /api/item/id/:id

**Request Type:** GET

**Returned Data Format**: json

**Description:** Retrieves items based on a specific category with average feedback ratings.

**Example Request:** /api/item/id/7

**Example Response:** 
```json
[
    {
        "item_id": 7,
        "category": "Bikes",
        "name": "mountain",
        "price": 27.00,
        "brand_name": "Co-op_Cycles",
        "photo_url": "co-op_cycles.png",
        "rating_review": 4
    }
]
```

**Error Handling:**
Returns 500 error on failure.


## Search Items
**Request Format:** /api/item/search/:query

**Request Type:** GET

**Returned Data Format**: json

**Description:** Searches for items based on a query string in the name, category, or brand name with average feedback ratings.

**Example Request:** /api/item/search/bike

**Example Response:** 
```json
[
    {
        "item_id": 7,
        "category": "Bikes",
        "name": "mountain",
        "price": 27.00,
        "brand_name": "Co-op_Cycles",
        "photo_url": "co-op_cycles.png",
        "rating_review": 4
    },
    {
        "item_id": 7,
        "category": "Bikes",
        "name": "road",
        "price": 99.00,
        "brand_name": "Salsa",
        "photo_url": "salsaa.png",
        "rating_review": 3.5
    }
]
```

**Error Handling:**
Returns 500 error on failure.