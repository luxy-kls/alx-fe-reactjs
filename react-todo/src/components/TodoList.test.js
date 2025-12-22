import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

test('renders TodoList and initial todos', () => {
  render(<TodoList />);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
  expect(screen.getByText('Build a Project')).toBeInTheDocument();
});

test('allows users to add a new todo', () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText('Add a new todo');
  const addButton = screen.getByText('Add Todo');

  fireEvent.change(input, { target: { value: 'New Test Todo' } });
  fireEvent.click(addButton);

  expect(screen.getByText('New Test Todo')).toBeInTheDocument();
});

test('allows users to toggle a todo completion', () => {
  render(<TodoList />);
  const todoItem = screen.getByText('Learn React');

  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle('text-decoration: line-through');

  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle('text-decoration: none');
});

test('allows users to delete a todo', () => {
  render(<TodoList />);
  const deleteButtons = screen.getAllByText('Delete');
  const todoText = screen.getByText('Learn React');

  fireEvent.click(deleteButtons[0]);
  expect(todoText).not.toBeInTheDocument();
});