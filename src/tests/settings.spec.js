import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testes da página de configurações', () => {

  it('Verifica se elementos são renderizados na tela', () => {
    renderWithRouterAndRedux(<App />);

    userEvent.click(screen.getByRole('button', {
      name: /configurações/i
    }));

    expect(screen.getByLabelText(/categorias/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dificuldade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipos de questão:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /configurações/i})).toBeInTheDocument();
  });

  it('Verifica se é possível interagir com os inputs e clicar no botão', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        trivia_categories: [
          {
            id: 21,
            name: 'Sports',
          }
        ],
      }),
    }));

    userEvent.click(screen.getByRole('button', { name: /configurações/i }));

    const optionCategory = await screen.findByRole('option', {name: /sports/i});

    const inputCategory = screen.getByRole('combobox', { name: /categorias:/i});
    const inputDifficulty = screen.getByLabelText(/dificuldade:/i);
    const inputType = screen.getByLabelText(/tipos de questão:/i);

    userEvent.selectOptions(inputCategory, '&category=21');
    userEvent.selectOptions(inputDifficulty, '&difficulty=medium');
    userEvent.selectOptions(inputType, '&type=boolean');

    expect(optionCategory.selected).toBe(true);
    expect(screen.getByRole('option', {name: /médio/i}).selected).toBe(true);
    expect(screen.getByRole('option', {name: /verdadeiro ou falso/i}).selected).toBe(true);

    const btnSave = screen.getByRole('button', { name: /salvar/i });

    userEvent.click(btnSave);

    expect(history.location.pathname).toBe('/');
  });  
})