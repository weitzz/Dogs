import Input from "./Input";
import { fireEvent, render, screen } from '@testing-library/react'

// visivel
// types
// error
// onchange
describe("Teste Input", () => {
    it("Input visivel", () => {
        render(<Input label="Nome" type="text" />)
        const input = screen.getByText('Nome');
        expect(input).toBeVisible
        expect(input).toBeInTheDocument
    })

    it("Label visivel", () => {
        render(<Input label="Nome" type="text" />)
        const input = screen.getByLabelText('Nome');
        fireEvent.change(input, { target: { value: 'João' } })
        expect(input).toHaveValue('João');
    })

      it("Onchange", () => {
        render(<Input label="Nome" type="text" />)
        const input = screen.getByLabelText('Nome');
        fireEvent.change(input, { target: { value: 'João' } })
        expect(input).toHaveValue('João');
    })
})