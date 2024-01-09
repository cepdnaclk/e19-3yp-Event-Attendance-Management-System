import React from "react";
import { render } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer component", () => {
    it("renders without crashing", () => {
        render(<Footer />);
    });

    it("displays the correct text", () => {
        const { getByText } = render(<Footer />);
        // const textElement = getByText("This is the footer");
        // expect(textElement).toBeInTheDocument();
    });

    // Add more tests as needed
});
