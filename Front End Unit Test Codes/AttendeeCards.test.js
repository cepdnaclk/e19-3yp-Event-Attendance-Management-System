import React from 'react';
import { render } from '@testing-library/react';
import AttendeeCards from '../AttendeeCards';

describe('AttendeeCards', () => {
    it('renders the attendee cards with correct props', () => {
        const props = {
            room: 'Room 1',
            name: 'John Doe',
            topic: 'React Testing',
            Ccapacity: 10,
            Mcapacity: 20,
        };

        const { getByText } = render(<AttendeeCards {...props} />);

        expect(getByText('Attendees Room 1')).toBeInTheDocument();
        expect(getByText('Speaker: John Doe')).toBeInTheDocument();
        expect(getByText('Topic: React Testing')).toBeInTheDocument();
        
    });

    it('renders the attendee cards without crashing', () => {
        const props = {
            room: 'Room 2',
            name: 'Jane Smith',
            topic: 'Redux Basics',
            Ccapacity: 5,
            Mcapacity: 15,
        };

        render(<AttendeeCards {...props} />);
    });
});
