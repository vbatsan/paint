import React from "react";

import App from "../../App";
import {act, fireEvent, render} from "@testing-library/react";

const generateInputFile = data => {
    return new File([data], "input.txt", {
        type: "text/plain",
    })
}

describe('DeleteBtn component', () => {
        it('Should delete canvas on click', async () => {
            const file = generateInputFile('C 10 10 /\n/L 1 1 5 2')
            const {findByAltText, findByRole, queryByRole, container} = render(<App/>)
            const input = container.querySelector('input')
            await act(async () => {
                fireEvent.drop(input,  {
                    target: { files: [file] }
                })
            })
            expect((await findByRole('canvas'))).toBeInTheDocument()
            const btn = await findByAltText('delete')
            await act(async () => {
                fireEvent.click(btn)
            })
            expect(queryByRole('canvas')).not.toBeInTheDocument()
        })
})
