# Web App with Passport Authentication

This web application demonstrates user authentication using Passport.js and session management. It allows users to log in securely and maintains their session throughout their interaction with the application.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Passport.js
- Express-Session
- Pug.js

## Features

- User registration and login functionality
- Secure password hashing using bcrypt
- Session management using Express-Session
- User authentication with Passport.js
- Protected routes accessible only to authenticated users
- MongoDB integration for storing user data

## Installation

1. Clone the repository: git clone https://github.com/evangelopolot/PassportAuth-Web-App.git
2. Navigate to the project directory
3. Install the dependencies: `npm install`
4. Set up environment variables
5. Start the application: `npm start`
6. Open your web browser and visit `http://localhost:8000` to access the application.

## Usage

- Register a new user account by providing a username, email, and password.
- Log in with your registered credentials.
<!-- - Access protected routes that require authentication.
- Log out to end your session. -->

## Project Structure

- `config/`: Contains configuration files for the database and Passport.js.
- `models/`: Defines the MongoDB schema for the User model.
- `routes/`: Contains route handlers for authentication and other application routes.
- `views/`: Contains EJS templates for rendering HTML views.
- `.env`: Stores environment variables (not included in version control).
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `app.js`: The main entry point of the application.
- `package.json`: Manages project dependencies and scripts.
- `README.md`: Provides information and instructions for the project.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
