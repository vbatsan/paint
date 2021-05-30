import React from "react";
import { render } from '@testing-library/react';

import StartPanel from "./index";

describe('StartPanel component', () => {
    it('Should render', () => {
        const {getByText, getByAltText, container } = render(<StartPanel/>)
        expect(getByText(/Drop your file to start drawing/)).toBeInTheDocument()
        expect(getByAltText(/drop here/)).toBeInTheDocument()
        expect(container.querySelector('input')).toBeInTheDocument()
    })
})
