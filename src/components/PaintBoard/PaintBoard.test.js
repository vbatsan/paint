import React from "react";
import {act, fireEvent, render} from '@testing-library/react';
import App from "../../App";

const generateInputFile = data => {
    return new File([data], "input.txt", {
        type: "text/plain",
    })
}

const downloadTextFile = () => {
    const link = document.createElement("a");
    link.download = 'output.txt';
    link.click();
};


describe('PainBoard component', () => {
    it('Should render canvases as many as history length', async () => {
        const file = generateInputFile('C 24 4')
        const {findAllByRole, container} = render(<App/>)
        const input = container.querySelector('input')
        await act(async () => {
            fireEvent.drop(input,  {
                target: { files: [file] }
            })
        })
        expect((await findAllByRole('canvas')).length).toEqual(1)
    })
    it('Should render right pixels quantity', async () => {
        const file = generateInputFile('C 10 10')
        const {findAllByRole, container} = render(<App/>)
        const input = container.querySelector('input')
        await act(async () => {
            fireEvent.drop(input,  {
                target: { files: [file] }
            })
        })
        expect((await findAllByRole('pixel')).length).toEqual(100)
    })

    it('Should not render if no canvas provided in input file', async () => {
        const file = generateInputFile('L 1 2 1 5')
        const {queryByRole, container} = render(<App/>)
        const input = container.querySelector('input')
        await act(async () => {
            fireEvent.drop(input,  {
                target: { files: [file] }
            })
        })
        expect((queryByRole('canvas'))).not.toBeInTheDocument()
    })
    it('Should render with error(vertical horizontal line)', async () => {
        const file = generateInputFile('C 10 10 /\n/L 1 1 5 2')
        const {findByText, findAllByRole, container} = render(<App/>)
        const input = container.querySelector('input')
        await act(async () => {
            fireEvent.drop(input,  {
                target: { files: [file] }
            })
        })
        expect((await findAllByRole('canvas')).length).toEqual(1)
        expect(await findByText(/Line 1,1,5,2 should be vertical or horizontal/)).toBeInTheDocument()
    })
    it('Should render with error(no point on canvas)', async () => {
        const file = generateInputFile('C 10 10 /\n/L 20 1 5 1')
        const {findByText, findAllByRole, container} = render(<App/>)
        const input = container.querySelector('input')
        await act(async () => {
            fireEvent.drop(input,  {
                target: { files: [file] }
            })
        })
        expect((await findAllByRole('canvas')).length).toEqual(1)
        expect(await findByText(/Not such point on the canvas 20, 1/)).toBeInTheDocument()
    })
    it('Should fill the canvas', async () => {
        const file = generateInputFile('C 10 10 /\n/L 1 1 5 1/\n/B 1 1 z')
        const {findAllByText, container} = render(<App/>)
        const input = container.querySelector('input')
        await act(async () => {
            fireEvent.drop(input,  {
                target: { files: [file] }
            })
        })
        expect((await findAllByText(/z/)).length).toEqual(5)
    })
    it('Should download file on "download" click', async () => {
        const file = generateInputFile('C 10 10 /\n/L 1 1 5 1/\n/B 1 1 z')
        const {container} = render(<App/>)
        const input = container.querySelector('input')
        await act(async () => {
            fireEvent.drop(input,  {
                target: { files: [file] }
            })
        })
        const link = {
            click: jest.fn()
        };
        jest.spyOn(document, "createElement").mockImplementation(() => link);
        downloadTextFile();
        expect(link.download).toEqual('output.txt')
        expect(link.click).toBeCalled()
    })

})
