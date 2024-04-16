##E-commerce Get Products API

This Node.js project provides a RESTful API with a single endpoint to retrieve product data.

**Features**

* Filter products by various criteria including featured status, company, name, price range, and rating.
* Sort products by creation date or custom sort criteria.
* Select specific product fields for response optimization.
* Paginate results to retrieve a specific number of products per page.

**Installation**

1. Clone the repository:

```bash
git clone https://github.com/youssef-hilaly/E-commerce-get-products.git
```

2. Install dependencies:

```bash
npm install
```

**.env File**

Create a `.env` file in the project root directory to store any environment variables required by the application (e.g., database connection string).

**API Route**

The API route `/api/v1/products` allows you to retrieve product data. You can use query parameters to filter, sort, select fields, and paginate results.

**Query Parameters**

* `featured`: Filter by featured products (`true` or `false`).
* `company`: Filter by company name.
* `name`: Filter by product name (case-insensitive search using regular expression).
* `sort`: Sort products by a comma-separated list of fields (e.g., `sort=price,-rating`).
* `fields`: Select specific product fields to include in the response (comma-separated list).
* `numericFilters`: Filter products by numeric fields (price, rating) using operators like `>`, `>=`, `<`, `<=`, and `=`. Example: `numericFilters=price>=100,rating<=4`.
* `page`: Specify the current page number (defaults to 1).
* `limit`: Define the number of products per page (defaults to 10).

**Example Usage**

```bash
curl http://localhost:3000/api/v1/products?featured=true&sort=price&limit=5
```

This request retrieves the top 5 featured products sorted by price (ascending).

**Error Handling**

The API utilizes middleware to handle errors and return appropriate responses.

**Dependencies**

* dotenv: Loads environment variables from a `.env` file.
* express: Web framework for building the API.
* express-async-errors: Middleware to handle errors thrown from asynchronous functions.
* mongoose: ODM (Object Document Mapper) for interacting with a MongoDB database (assumed).

**Development**

* Use `nodemon` to start the development server:

```bash
npm run dev
```

This readme.md provides a basic overview of the API functionality, installation instructions, and usage examples.
