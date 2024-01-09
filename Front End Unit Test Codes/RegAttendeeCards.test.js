import React from 'react';
import { render } from '@testing-library/react';
import RegAttendeeCards from '../RegAttendeeCards';

describe('RegAttendeeCards', () => {
    it('renders the component with the provided props', () => {
        const sessionId = '123';
        const regCapacity = 50;

        const { getByText } = render(
            <RegAttendeeCards sessionId={sessionId} regCapacity={regCapacity} />
        );

        expect(getByText(`Attendees ${sessionId}`)).toBeInTheDocument();
        expect(getByText(`Registered Capacity: ${regCapacity}`)).toBeInTheDocument();
    });

    it('renders the component with default props if not provided', () => {
        const { getByText } = render(<RegAttendeeCards />);

        expect(getByText('Attendees')).toBeInTheDocument();
        expect(getByText('Registered Capacity:')).toBeInTheDocument();
    });
});
