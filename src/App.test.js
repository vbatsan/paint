import React from "react";
import {render, act, fireEvent} from "@testing-library/react";

import App from "./App";

const inputData = 'C 24 2'
const file = new File([inputData], "input.txt", {
    type: "text/plain",
});

describe('App component', () => {
    it('Should render when instruction not load', () => {
       const {getByText, getByAltText, queryByAltText} = render(<App/>)
        expect(getByText(/Drop your file to start drawing/)).toBeInTheDocument()
        expect(getByAltText(/drop here/)).toBeInTheDocument()
        expect(queryByAltText('delete')).not.toBeInTheDocument()
    })
    it('Should render when instruction loaded', async () => {
        const {findByAltText, findByText, queryByAltText, container} = render(<App/>)
        const input = container.querySelector('input')
        await act(async () => {
            fireEvent.drop(input,  {
                target: { files: [file] }
            })
        })
        expect(await findByText(/Drop your file to start drawing/)).not.toBeInTheDocument()
        expect(queryByAltText(/drop here/)).not.toBeInTheDocument()
        expect(await findByAltText('delete')).toBeInTheDocument()
    })
    it('Should render when DeleteBtn clicked', async () => {
        const {findByAltText, getByText, queryByText, getByAltText, queryByAltText, container} = render(<App/>)
        const input = container.querySelector('input')
        await act(async () => {
            fireEvent.drop(input,  {
                target: { files: [file] }
            })
        })
        const deleteBtn = await findByAltText('delete')
        expect(queryByText(/Drop your file to start drawing/)).not.toBeInTheDocument()
        expect(queryByAltText(/drop here/)).not.toBeInTheDocument()
        expect(deleteBtn).toBeInTheDocument()
        fireEvent.click(deleteBtn)
        expect(queryByAltText('delete')).not.toBeInTheDocument()
        expect(getByText(/Drop your file to start drawing/)).toBeInTheDocument()
        expect(getByAltText(/drop here/)).toBeInTheDocument()
    })
})
