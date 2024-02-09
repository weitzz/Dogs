import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Teste Button", () => {
  test("Button visível", () => {
    render(<Button disabled={false} children={"Enviar"} />);
    const button = screen.getByText("Enviar");
    expect(button).toBeVisible;
    expect(button).toBeEnabled;
    expect(button).toBeInTheDocument();
  });

  test("texto Cadastrar", () => {
    render(<Button disabled={false} children={"Cadastrar"} />);
    const button = screen.getByText("Cadastrar");
    expect(button).toBeVisible;
    expect(button).toBeEnabled;
    expect(button).toBeInTheDocument();
  });

  test("Evento Onclick", () => {
    const onclick = jest.fn();
    render(<Button disabled={false} children={"Enviar"} onClick={onclick} />);
    const button = screen.getByText("Enviar");
    fireEvent.click(button);
    expect(onclick).toHaveBeenCalledTimes(1);
  });

  test("Botao desabilitado", () => {
    render(<Button disabled={true} children={"Carregando..."} />);
    const button = screen.getByText("Carregando...");
    expect(button).toBeDisabled();
  });
});
