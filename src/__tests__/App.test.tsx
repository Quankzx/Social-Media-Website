import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders header and dashboard', () => {
  render(<App />);
  expect(screen.getByText(/Social Portal/i)).toBeInTheDocument();
  expect(screen.getByText(/Tổng quan Dashboard/i)).toBeInTheDocument();
});
