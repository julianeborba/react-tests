import React from "react";
import App, { calcularNovoSaldo } from "./App";
import { fireEvent, render, screen } from "@testing-library/react"; //Utilizado pra fazer com que  react consiga achar o texto

describe("Componente principal do site", () => {
  //Describe vai descrever o que o teste vai fazer

  describe("Quando eu abro o app do banco", () => {
    //pode usar um describe dentro de outro pra ficar mais organziado

    it("O nome é exibido", () => {
      //Pode usar it ou test para descrever o test
      render(<App />); //renderiza o componente App
      //Dentro colocamos os casos de testes, para isso usamos it
      expect(screen.getByText("ByteBank")).toBeInTheDocument(); //internamente coloca o teste de fato
    });

    it("O botão de transação é exibido", () => {
      render(<App />);
      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });

    it("O saldo é exibido", () => {
      render(<App />);
      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });
  });
});

describe("Quando realizo uma transação", () => {
  it("Quando for um saque, o valor vai diminuir", () => {
    //Nesse caso nao renderizou componente, pois está etstando uma função específica.

    const valores = {
      transacao: "saque",
      valor: 50,
    };
    const novoSaldo = calcularNovoSaldo(valores, 150);
    expect(novoSaldo).toBe(100);
  });

  it("Quando for um saque, a transação deve ser realizada", () => {
    const { getByText, getByLabelText, getByTestId } = render(<App />); //Passamos as funções que queremos utilizar

    const saldo = getByText("R$ 1000");
    const transacao = getByLabelText("Saque");
    const valor = getByTestId("valor");
    const botaoTransacao = getByText("Realizar operação");

    fireEvent.click(transacao, { target: {value: 'saque'}}); //Fire event Simula no DOM o evento de click
    fireEvent.change(valor, {target: {value: 10}});
    fireEvent.click(botaoTransacao);
    expect(saldo.textContent).toBe('R$ 990');
  });


  it("2Quando for um saque, a transação deve ser realizada", () => {
   render(<App />); //Passamos as funções que queremos utilizar

    const saldo = screen.getByText("R$ 1000"); //Com o screen vc acessa todas propriedades e funcoes do render e nao precisa passar em uma const como anteriormente
    const transacao = screen.getByLabelText("Saque");
    const valor = screen.getByTestId("valor");
    const botaoTransacao = screen.getByText("Realizar operação");

    fireEvent.click(transacao, { target: {value: 'saque'}}); //Simula no DOM o evento de click
    fireEvent.change(valor, {target: {value: 10}});
    fireEvent.click(botaoTransacao);
    expect(saldo.textContent).toBe('R$ 990');
  });
});
/*Para não dar problemas de porta ERROR:Cannot ready property body of null
Deve-se subir a API em uma porta: npm run backend
Rodar a aplicação npm start e rodar o npm test*/
