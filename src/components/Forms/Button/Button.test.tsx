import {render} from '@testing-library/react'
import Button from "./Button";


describe("Teste Button", () => {
    render(<Button disabled={false} children={"teste"} />)
    
    it("", () => {
        expect(1).toBe(1)
    })
})