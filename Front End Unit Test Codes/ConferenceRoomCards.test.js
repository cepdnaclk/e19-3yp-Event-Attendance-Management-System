import React from 'react';
import { render } from '@testing-library/react';
import ConferenceRoomCards from '../ConferenceRoomCards';

describe('ConferenceRoomCards', () => {
    it('renders conference room details correctly', () => {
        const room = 1;
        const url = 'https://example.com/conference-room-1.jpg';
        const name = 'John Doe';
        const topic = 'React Testing';
        const Ccapacity = 10;
        const Mcapacity = 20;

        const { getByText, getByAltText } = render(
            <ConferenceRoomCards
                room={room}
                url={url}
                name={name}
                topic={topic}
                Ccapacity={Ccapacity}
                Mcapacity={Mcapacity}
            />
        );

        expect(getByText(`Conference Room ${room}`)).toBeInTheDocument();
        expect(getByAltText('')).toHaveAttribute('src', url);
        expect(getByText(`Speaker: ${name}`)).toBeInTheDocument();
        expect(getByText(`Topic: ${topic}`)).toBeInTheDocument();
        
        // expect(getByText(`Current Capacity: ${Ccapacity}`)).toBeInTheDocument();
        // expect(getByText(`Max Capacity: ${Mcapacity}`)).toBeInTheDocument();
    });
});
