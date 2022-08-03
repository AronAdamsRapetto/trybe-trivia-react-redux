import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Feedback from '../pages/Feedback';
import App from '../App';

describe('Teste a página de Feedback', () => {
  it('01 - Renderiza a página de Feedback', () => {
    renderWithRouterAndRedux(<Feedback />);
    const feedbackPage = screen.getByText(/feedback/i);
    expect(feedbackPage).toHaveTextContent('Feedback');
  });

  it('02 - Renderiza na tela nome, gravatar e score do jogador', () => {
    renderWithRouterAndRedux(<Feedback />);
    expect(screen.getByTestId("header-profile-picture")).toBeInTheDocument();
    expect(screen.getByTestId("header-player-name")).toBeInTheDocument();
    expect(screen.getByTestId("header-score")).toBeInTheDocument();
  });

  it('03 - Renderiza na tela mensagem de feedback para jogador', () => {
    renderWithRouterAndRedux(<Feedback />);
    expect(screen.getByTestId("feedback-text")).toBeInTheDocument();
  });

  it('04 - Renderiza na tela o número de acertos e pontuação do jogador', () => {
    renderWithRouterAndRedux(<Feedback />);
    expect(screen.getByTestId("feedback-total-score")).toBeInTheDocument();
    expect(screen.getByTestId("feedback-total-question")).toBeInTheDocument();
  });

  it('05 - Renderiza na tela os botões de \'Ranking\' e \'Jogar Novamente\'', () => {
    renderWithRouterAndRedux(<Feedback />);
    expect(screen.getByTestId("btn-ranking")).toBeInTheDocument();
    expect(screen.getByTestId("btn-play-again")).toBeInTheDocument();
  });

  it('06 - Testa se ao clicar no botão \'Ranking\' a navegação acontece normalmente', () => {
    localStorage.setItem('ranking', JSON.stringify([{ name: "Usuário", score: 100, picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"}]));

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const rankingPage = screen.getByTestId(/btn-ranking/i);

    userEvent.click(rankingPage);

    const backBtn = screen.getByTestId(/btn-go-home/i);
    expect(backBtn).toBeInTheDocument();
    expect(history.location.pathname).toBe('/ranking');
  });

  it('07 - Testa se ao clicar no botão \'Jogar Novamente\' a navegação acontece normalmente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const goBack = screen.getByTestId(/btn-play-again/i);
    userEvent.click(goBack);
    const inputs = screen.getByRole('button', {name: /play/i});
    expect(inputs).toBeInTheDocument();
  });

  it('08 - Testa se a mensagem de feedback é renderizada corretamente', () => {
    const initialReduxState = {
      player: {
        name: '',
        assertions: 3,
        score: 100,
        gravatarEmail: '',
        urlGame: '',
      }
    }
    const { history } = renderWithRouterAndRedux(<App />, initialReduxState);
    history.push('/feedback');
    
    expect(screen.getByRole('heading', { name: /well done!/i })).toBeInTheDocument();
  })
});