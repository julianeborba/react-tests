import React from "react";
import { render } from "@testing-library/react";
import Transacao from "./Transacao";
//Snapshot test é um json com o component renderizado. neste caso, ele verifica se a data, tipo e valor tão sempre aparecendo, mesmo com mudanças no código.

describe("Componente de transação do extrato", () => {
  it("O snapsht do component deve permanecer sempre o mesmo", () => {
    const { container } = render(
      <Transacao data="08/09/2020" tipo="saque" valor="20" />
    );

    expect(container.firstChild).toMatchSnapshot(); //firstchild é o elemento já montado html. Container é o elemento do DOM que o render retorna
  });
});
