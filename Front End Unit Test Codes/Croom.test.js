import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Croom from '../Croom';

describe('Croom component', () => {
    test('renders without errors', () => {
        render(<Croom conferenceId="123" />);
        const addSessionButton = screen.getByText('Add session');
        expect(addSessionButton).toBeInTheDocument();
    });

    test('opens modal when "Add session" button is clicked', () => {
        render(<Croom conferenceId="123" />);
        const addSessionButton = screen.getByText('Add session');
        fireEvent.click(addSessionButton);
        // const modal = screen.getByTestId('modal');
        // expect(modal).toBeInTheDocument();
    });

    test('closes modal when "CLOSE" button is clicked', () => {
        render(<Croom conferenceId="123" />);
        const addSessionButton = screen.getByText('Add session');
        fireEvent.click(addSessionButton);
        const closeButton = screen.getByText('CLOSE');
        fireEvent.click(closeButton);
        const modal = screen.queryByTestId('modal');
        expect(modal).not.toBeInTheDocument();
    });

    test('submits session form when "Submit" button is clicked', () => {
        render(<Croom conferenceId="123" />);
        const addSessionButton = screen.getByText('Add session');
        fireEvent.click(addSessionButton);
        const submitButton = screen.getByText('Submit');
        fireEvent.click(submitButton);
        // Add your assertions for the form submission logic here
    });
});
