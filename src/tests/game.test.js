import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import questionsResponse from './mocks/questions';
import invalidTokenQuestionsResponse from './mocks/invalidQuestions';

describe('Testes da página de Game', () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(questionsResponse),
      })
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('Testa se os elementos são renderizados corretamente', async () => {
    jest.useFakeTimers();
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    await waitFor(() => expect(global.fetch).toBeCalled());

    expect(screen.getByRole('heading', { name: /geography/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /easy/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { 
      name: /The Republic of Malta is the smallest microstate worldwide./i 
    })).toBeInTheDocument();
    expect(screen.getByText('True')).toBeInTheDocument();
    expect(screen.getByTestId('correct-answer')).toHaveTextContent('False');
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
    expect(screen.getByTestId('timer-question')).toHaveTextContent('30');

    jest.advanceTimersByTime(30000);

    expect(screen.getByTestId('timer-question')).toHaveTextContent('0');
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('Testa se ao clicar em uma resposta o botão de próximo é habilitado', async () => {
    jest.useFakeTimers();
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    await waitFor(() => expect(global.fetch).toBeCalled());

    userEvent.click(screen.getByTestId('correct-answer'));

    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('Testa se na quinta resposta o usuário é redirecionado para a tela de feedback', async () => {
    jest.useFakeTimers();
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    await waitFor(() => expect(global.fetch).toBeCalled());

    questionsResponse.results.forEach(() => {
      userEvent.click(screen.getByTestId('correct-answer'));
      userEvent.click(screen.getByRole('button', { name: /next/i }));
    });
    expect(history.location.pathname).toBe('/feedback');
  });

  it('Testa se ao receber uma lista de perguntas vazias volta para a página de login', async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(invalidTokenQuestionsResponse),
      })
    );
    
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    await waitFor(() => expect(global.fetch).toBeCalled());

    expect(history.location.pathname).toBe('/');
  });

  it('Testa se a contagem de pontos é feita corretamente', async () => {
    const ranking = [
      {
        name: 'jogador1',
        score: 100,
        picture:
          'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e',
      },
      {
        name: 'jogador2',
        score: 120,
        picture:
          'https://www.gravatar.com/avatar/9e1f151bf326b5774f0b86cec01a9259',
      },
      {
        name: 'jogador3',
        score: 50,
        picture:
          'https://www.gravatar.com/avatar/86717b5175f8f51878eda44d435a756d',
      },
    ];

    localStorage.setItem('ranking', JSON.stringify([ranking]));

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    await waitFor(() => expect(global.fetch).toBeCalled());

    userEvent.click(screen.getByText('True'));

    expect(screen.getByTestId('header-score')).toHaveTextContent('0');

    userEvent.click(screen.getByRole('button', { name: /next/i }));
    userEvent.click(screen.getByTestId('correct-answer'));

    expect(screen.getByTestId('header-score')).toHaveTextContent('100');

    userEvent.click(screen.getByRole('button', { name: /next/i }));
    userEvent.click(screen.getByTestId('correct-answer'));

    expect(screen.getByTestId('header-score')).toHaveTextContent('170');

    userEvent.click(screen.getByRole('button', { name: /next/i }));
    userEvent.click(screen.getByTestId('correct-answer'));

    expect(screen.getByTestId('header-score')).toHaveTextContent('210');

    userEvent.click(screen.getByRole('button', { name: /next/i }));
    userEvent.click(screen.getByTestId('correct-answer'));

    expect(screen.getByTestId('header-score')).toHaveTextContent('310');

    userEvent.click(screen.getByRole('button', { name: /next/i }));
  });
});