# NOTEPAD-APP

# PROJECT OVERVIEW
The app is a multi-user Notepad application.
 It allows users to create, edit, and manage their own notes under different accounts.
  The main goal is to provide a secure platform that protects user data while covering the essential note functions: create, delete, and edit.

  # FEATURES
 Users can easily interact with and access the app

    User registration (username + password)

Includes basic error messages

One account per user, accessed through secure authentication

# TECH STACK
 JavaScript – main programming language

 HTML – structure of the frontend pages

CSS – styling for the frontend 

 Mongodb and Mongoose – database and data modeling

 Node.js and Express – backend framework
 
 CORS – handling cross-origin requests

dotenv – environment variable management

JWT – authentication tokens

bcrypt – password encryption


# PROJECT STRUCTURE
project/
│
├── controllers/
│   ├── note.controller.js       # Handles CRUD operations for notes
│   └── user.controller.js       # Handles registraton and login
│
├── middleware/
│   └── authMiddleware.js        #Protects routes with authentication
│
├── models/
│   ├── note.model.js            # Note schema
│   └── user.model.js            # User schema
│
├── public/                      #Frontend files
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── login.css
│   ├── register.css
|   ├── style.css
|   ├── login.js
|   ├── register.js
│   └── script.js
│
├── routes/n     
│   ├── user.route.js         #Routes for login and registeration
│   └── note.route.js         # Routes for notes CRUD

│
├── server.js
├── README.md                  # Project documentation
├── package.json               # Project dependencies and scripts
└── package-lock.json          # Exact versions of installed packages
