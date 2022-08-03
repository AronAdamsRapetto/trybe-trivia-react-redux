import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Login";
import App from "../App";
import tokenResponse from "./mocks/token";
import questionsResponse from "./mocks/questions";

describe("Testa a página de Login", () => {
  it("Testa se os inputs são renderizados na tela", () => {
    renderWithRouterAndRedux(<Login />);

    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();

    expect(name).toHaveValue("");
    expect(email).toHaveValue("");
  });

  it("Testa se o botão é habilitado após preencher os inputs", () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByTestId("btn-play");

    expect(button).toBeDisabled();

    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");

    userEvent.type(name, "meunome");
    userEvent.type(email, "meuemail");

    expect(button).toBeEnabled();
  });

  it("Testa se é feita uma requisição à API para obter o token", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(questionsResponse),
      })
    );

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(tokenResponse),
      })
    );

    const { history } = renderWithRouterAndRedux(<App />);

    const button = screen.getByTestId("btn-play");
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");

    userEvent.type(name, "meunome");
    userEvent.type(email, "meuemail");

    userEvent.click(button);

    await waitFor(() => expect(global.fetch).toBeCalled());

    expect(history.location.pathname).toBe('/game');
  });
});
