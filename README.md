# Employee Management System (MERN)

## Setup

### Server
```bash
cd server
cp .env.example .env
npm install
npm start
```
Runs on http://localhost:5000 (requires MongoDB running locally, or update MONGO_URI in .env)

### Client
```bash
cd client
cp .env.example .env
npm install
npm run dev
```
Runs on http://localhost:5173

## API Endpoints
- GET /employees
- GET /employees/:id
- POST /employees
- PUT /employees/:id
- DELETE /employees/:id
