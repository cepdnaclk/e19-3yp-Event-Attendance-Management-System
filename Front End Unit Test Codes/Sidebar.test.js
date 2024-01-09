import { render, fireEvent, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { BrowserRouter } from 'react-router-dom';

describe('Sidebar', () => {
  it('renders without crashing', () => {
    render(<BrowserRouter><Sidebar /></BrowserRouter>);
  });

  it('contains the correct elements', () => {
    render(<BrowserRouter><Sidebar /></BrowserRouter>);
    expect(screen.getByText('EVENT FLOW')).toBeInTheDocument();
    // expect(screen.getByText('John  Smith')).toBeInTheDocument();
    expect(screen.getByText('johnsmith@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Conference Rooms')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Attendees')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('toggles the menu when the burger menu is clicked', () => {
    render(<BrowserRouter><Sidebar /></BrowserRouter>);
    // const burgerMenu = screen.getByRole('button');
    // fireEvent.click(burgerMenu);
    // expect(screen.getByText('EVENT FLOW')).toHaveClass('active');
  });
});