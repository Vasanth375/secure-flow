# Secureflow Authentication

Secureflow Authentication is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project provides a robust solution for user authentication and management, incorporating custom username/email and password authentication as well as Google OAuth integration through Firebase Authentication.

## Features

- **Custom Authentication**: Users can register and login using custom usernames, emails, and passwords, ensuring secure access to the application.
- **Google OAuth Integration**: Seamlessly sign in with Google accounts using Firebase Authentication, enhancing user convenience and security.
- **Efficient State Management**: Utilizes Redux Toolkit for streamlined state management, providing a smooth and responsive user experience.
- **Dynamic Profile Management**: Empowers users to update their profiles, including usernames, emails, passwords, and profile images stored in Firebase Storage.
- **Secure Account Deletion**: Implements safe deletion of user accounts with checks for JSON Web Token cookies, ensuring data privacy and security.
- **CRUD Operations with MongoDB**: Masterful handling of Create, Read, Update, and Delete operations using MongoDB, facilitating effective interaction with the database.
- **Express.js Framework**: Utilizes Express.js for backend routing, enhancing scalability and performance of the application.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd secureflow-authentication`
3. Install dependencies for both frontend and backend:
   - Frontend: `cd client && npm install`
   - Backend: `cd server && npm install`
4. Set up environment variables:
   - Create a `.env` file in the server directory and define variables for MongoDB connection, JWT secret, Firebase configuration, etc.
5. Start the development server:
   - Frontend: `cd client && npm start`
   - Backend: `cd server && npm start`

## Deployment

The application can be deployed using platforms like Render, Heroku, or AWS. Ensure proper configuration of environment variables and MongoDB Atlas for production deployment.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributors

- [Your Name](https://github.com/your-username)
- [Contributor 2](https://github.com/contributor2)

Feel free to contribute by submitting bug reports, feature requests, or pull requests. Contributions are welcomed and appreciated!
