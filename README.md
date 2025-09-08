# VetClinic_backend
This is the backend for the fullstack store app. It provides APIs for authentication, products, and user carts.


## 🏗️ Tech Stack

- Node.js + Express
- PostgreSQL (via `pg`)
- `dotenv`, `cors`, `morgan`


## 🚀 Getting Started

```bash
# 1. Install dependencies
cd store-server
npm install

# 2. Create a PostgreSQL database (e.g., `storedb`)

# 3. Start PostgreSQL and create DB
psql -d storedb -f schema.sql

# 4. Start the server
node server.js
```

## 📂 Project Structure
vetclinic_backend/

│- Routes/
│   
├──   |-auth.js          
│   
├──   |-users.js         
│   
├──   |-appointments.js  
│── middleware/
│   └── adminAuth.js     
│── db.js                
│── server.js            
│── .env                 



## 📡 API Endpoints

The API will run on: http://localhost:5000


### 🔐 Auth Routes

**Base URL**: `/api/auth`

| Method | Endpoint     | Description        |
|--------|--------------|--------------------|
| POST   | `/signup`    | Create new user (email, password, role)  |
| POST   | `/login`     | Log in existing user |


**Base URL**: `/api/users`
| Method | Endpoint     | Description        |
|--------|--------------|--------------------|
|POST |/users → |Add user (email, username, password) 
|GET |/users/:email → |Retrieve user by email



**Base URL**: `/api/appointments`

| Method | Endpoint     | Description        |
|--------|--------------|--------------------|
GET |/user/:user_id |Get appointments for a specific user
|POST |/  |Book new appointment
|PUT |/:id  |Update appointment (date, mobile, etc.)
|DELETE |/user/:id |Cancel appointment (by owner)
|DELETE |/:id |Delete appointment (admin only)

# 🔒 Admin-only (Header: x-role: admin) request must include:
{"x-role": "admin"}
| Method | Endpoint     | Description        |
|--------|--------------|--------------------|
|GET |/ |Get all appointments
|PUT |/:id/status |Approve/decline appointment
|DELETE	|/:id |Delete appointment