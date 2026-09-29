# Booklify Full Stack

Angular frontend + Spring Boot REST API + MongoDB.

## What is included
- MongoDB-backed book catalog with 8 seeded books
- Search and genre filtering
- Register/login with BCrypt + JWT
- Ready-to-use demo account
- Persistent browser cart
- Checkout creates orders in MongoDB and reduces stock
- Contact messages stored in MongoDB
- Angular proxy to Spring Boot

## Demo login
Email: demo@booklify.com
Password: Booklify@123

The demo user is created automatically by `DataSeeder` if it does not already exist.

## MongoDB
The application connects to:
`mongodb://localhost:27017/booklify`

MongoDB Server must be running. MongoDB Compass is only the GUI used to inspect the database.

After starting Spring Boot, refresh Compass. You should see:
- `booklify.books`
- `booklify.users`

`orders` and `contactMessage` collections appear after the first order/contact submission.

## Backend
Open the `backend` folder as a Maven project in Eclipse, then run:
`BooklifyApplication.java`

It runs on `http://localhost:8080`.

## Frontend
```powershell
cd frontend
npm install
npm start
```

Open `http://localhost:4200`.

Keep the Spring Boot backend running while using Angular.
