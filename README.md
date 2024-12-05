// Dinamo MEA Technical Assignment + React TypeScript CRUD Application with JSONPlaceholder API
This project is a simple web application built using React and TypeScript that demonstrates my ability to interact with a public API, display data in a UI, and handle common operations like fetching, displaying, and manipulating data. The application integrates with the JSONPlaceholder API and uses Ant Design for the UI framework.

Task Overview
The project consists of the following tasks:

Core Tasks (Must-Have)
Fetch and Display Data

Fetched data from the /posts endpoint of the JSONPlaceholder API in => PostsPage Component.
Displayed the fetched data in a table using Ant Design’s Table component in => PostsTable Component.
Form for Adding Data in => AddPostForm Component.

Created a form using Ant Design to add a new post.
Fields include title and body.
On form submission, made a POST request to /posts to simulate adding data.
Error Handling

Implemented basic error handling for API requests.
Used Ant Design’s notification component to display errors to the user.
TypeScript Usage

Optional Tasks (Bonus)::

1- Defined TypeScript interfaces/types for the fetched data.
Ensured type safety and followed best practices.

2- Form for Updating Data: Added an "Edit" button for each table row.
Clicking the button opens a form pre-filled with the title and body of the selected post.
On form submission, a PUT request is made to /posts/{id} to simulate updating the post.
Delete Data

3- Added a "Delete" button for each row in the table.
Clicking the button makes a DELETE request to /posts/{id} to simulate deleting the post.

Using JSON Server to Simulate Server-Side Rendering (SSR).
