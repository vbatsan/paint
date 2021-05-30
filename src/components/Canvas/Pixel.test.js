import React from "react";
import {render} from '@testing-library/react'

import Pixel from "./Pixel";

describe('Pixel component', () => {
    it('Should render', () => {
        const {getByText} = render(<Pixel view={'x'}/>)
        expect(getByText(/x/i)).toBeInTheDocument()
    })
})
