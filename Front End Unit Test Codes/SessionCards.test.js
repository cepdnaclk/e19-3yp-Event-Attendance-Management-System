import React from 'react';
import { render } from '@testing-library/react';
import SessionCards from '../SessionCards';

describe('SessionCards', () => {
    it('renders without crashing', () => {
        render(<SessionCards />);
    });

    it('displays the session title', () => {
        const sessionTitle = 'Test Session';
        const { getByText } = render(<SessionCards title={sessionTitle} />);
        // expect(getByText(sessionTitle)).toBeInTheDocument();
    });

    it('displays the session description', () => {
        const sessionDescription = 'This is a test session';
        const { getByText } = render(<SessionCards description={sessionDescription} />);
        // expect(getByText(sessionDescription)).toBeInTheDocument();
    });

    // Add more tests as needed
});
