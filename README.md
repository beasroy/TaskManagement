# Task Management App

This is a simple Task Management App built with React. It allows users to add, edit, and delete tasks. The project aims to showcase basic React functionality, state management, and local storage usage.

## Project Structure


src/
|-- components/
| |-- TaskForm.js
| |-- TaskList.js
|-- test/
| |-- TaskList.test.js
|-- App.js
|-- index.js


- **components:** Contains React components used in the application.
  - **TaskForm.js:** Component for displaying and handling the task form.
  - **TaskList.js:** Component for displaying the list of tasks.

- **test:** Contains test files for the components.

- **App.js:** Main application component.

- **index.js:** Entry point for rendering the React app.

## Design Choices

- **Functional Components:** The project primarily uses functional components to take advantage of React hooks for state management.

- **Local Storage:** Task data is stored in the local storage of the browser to persist tasks between sessions.

- **Styling:** Basic styling is done using Tailwind CSS for simplicity and ease of customization.

## Additional Features

- **Task Priority:** Tasks can be assigned priorities (low, medium, high).

- **Sorting:** Tasks can be sorted based on priority.

- **Due Date:** Each task can have an associated due date.

## How to Run

1. Clone the repository: `git clone https://github.com/beasroy/TaskManagement.git`
2. Install dependencies: `npm install`
3. Run the app: `npm start`

## How to Test

1. Run tests: `npm test`

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please create an issue or submit a pull request.
## Description

The pictures are attached to have a view of my project.

![When NO task available](images\notask.png)
