# Education-Technology-
Education Technology Membership Project
Overview
This project is an Education Technology Platform developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It is designed to offer various educational courses and content to users through a subscription-based model. Users can purchase different membership plans to access exclusive content, including videos, documents, and quizzes.

Key Features
User Authentication & Authorization:

Users can register, log in, and manage their profiles.
Role-based access control is implemented, allowing different views and functionalities for admins and regular users.
Subscription Management:

Users can purchase various membership plans, with details stored in MongoDB.
Integration with Stripe for handling payments and managing subscriptions, including creation, updates, and cancellations.
Dynamic Content Delivery:

Content is dynamically displayed based on the user's active subscriptions.
Admins can upload and manage educational content, including videos and documents, linked to specific plans.
Admin Dashboard:

A dedicated admin layout for managing users, subscriptions, and content.
Admins can view and update user statuses, content details, and subscription information.
JWT Authentication:

Secure user authentication using JSON Web Tokens (JWT), with token expiration management to ensure users stay logged in securely.
Responsive Design:

Built with React, ensuring a responsive and user-friendly interface for both desktop and mobile devices.



Technologies Used
Frontend: React.js, Material-UI (MUI)
Backend: Node.js, Express.js
Database: MongoDB
Payment Processing: Stripe API
Authentication: JWT (JSON Web Tokens)


Installation & Setup
Clone the repository:


Copy code
git clone https://github.com/Sachin-1729/Education-Technology.git
Navigate to the project directory:

cd Education-Technology
Install the necessary dependencies:


npm install
Set up your MongoDB and Stripe configurations in the .env file.

Start the development server:


Copy code
npm start


Future Improvements
Enhance the quiz and assessment features to provide a more engaging learning experience.
Implement more analytics features for users to track their learning progress.
Expand the admin dashboard to include more management functionalities.
