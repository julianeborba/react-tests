import React from "react";
import { render, screen } from "@testing-library/react";
import api from "./api";
import App from "./App";

jest.mock("./api");

describe("Requisições para a API", () => {
  it("Exibir lista de transações através da API", async () => { //Pq dentro de transacoes é uma chamada assincrona
    api.listaTransacoes.mockResolvedValue([
      {
        transacao: "saque",
        valor: "20",
        data: "26/09/2020",
        id: 2
      },
    ]);

    render(<App />);

    await screen.findByText('saque'); //A query findBy retorna uma promise que é completada quando o elemento é encontrado, dessa forma nosso teste espera até que o componente esteja disponível.

    expect(screen.getByTestId("transacoes").children.length).toBe(1);
  });
});
