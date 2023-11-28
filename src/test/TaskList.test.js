import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TaskList from '../component/TaskList';

// Mock the localStorage
const localStorageMock = (function () {
  let store = {};

  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

test('renders TaskList component', () => {
  render(<TaskList />);
  const addTaskButton = screen.getByText(/Add Task/i);
  expect(addTaskButton).toBeInTheDocument();
});

test('opens TaskForm on Add Task button click', () => {
  render(<TaskList />);
  const addTaskButton = screen.getByText(/Add Task/i);
  fireEvent.click(addTaskButton);

  const taskFormTitle = screen.getByText(/Task Form/i);
  expect(taskFormTitle).toBeInTheDocument();
});

test('submits new task through TaskForm', () => {
  render(<TaskList />);
  const addTaskButton = screen.getByText(/Add Task/i);
  fireEvent.click(addTaskButton);

  const taskNameInput = screen.getByTestId('taskNameInput');
  fireEvent.change(taskNameInput, { target: { value: 'New Task' } });

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  const newTask = screen.getByText(/New Task/i);
  expect(newTask).toBeInTheDocument();
});

test('edits task through TaskForm', () => {
  render(<TaskList />);
  const editTaskButton = screen.getByTestId('editTaskButton-0'); ;
  fireEvent.click(editTaskButton);

  const taskNameInput = screen.getByTestId('taskNameInput');
  fireEvent.change(taskNameInput, { target: { value: 'Edited Task' } });

  const updateButton = screen.getByText(/Update/i);
  fireEvent.click(updateButton);

  const editedTask = screen.queryByTestId('taskItem-0');
  expect(editedTask).not.toBeInTheDocument();
});

test('deletes task', () => {
    
    render(<TaskList />);
    const deleteTaskButton = screen.getByTestId('deleteTaskButton-0'); 
    fireEvent.click(deleteTaskButton);
  
    const deletedTask = screen.queryByTestId('taskItem-0');
    expect(deletedTask).not.toBeInTheDocument();
  });
