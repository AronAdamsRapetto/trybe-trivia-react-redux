import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Question from '../Components/Question';
import fetchTriviaQuestions from '../service/fetchTriviaQuestions';
import { actUpdateScore } from '../redux/actions';
import { saveScorePlayer } from '../service/localStorageRanking';
import './styleSheet/Game.css';

class Game extends Component {
  state = {
    questions: [],
    renderIndex: 0,
    isAnswered: false,
  }

  async componentDidMount() {
    const { history, url } = this.props;
    const { results } = await fetchTriviaQuestions(url);
    if (!results.length) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({
      questions: [...results],
    });
  }

  // Evento de próxima questão
  nextQuestion = () => {
    const {
      props: { history },
    } = this;
    const { renderIndex } = this.state;
    const LAST_INDEX = 4;
    if (renderIndex === LAST_INDEX) {
      history.push('/feedback');
      this.addPlayerToStorage();
    } else {
      this.setState((prevState) => ({
        renderIndex: prevState.renderIndex + 1,
        isAnswered: false,
      }));
    }
  }

  addPlayerToStorage = () => {
    const { ranking } = this.props;
    const picture = `https://www.gravatar.com/avatar/${md5(ranking.picture).toString()}`;
    const storeRanking = { ...ranking, picture };
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([storeRanking]));
    } else {
      saveScorePlayer(storeRanking);
    }
  }

  // Evento de resposta do usuário
  handleAnswer = (questionScore) => {
    const { updateScore } = this.props;
    this.setState({ isAnswered: true });

    if (questionScore === 0) {
      updateScore(questionScore, 0);
    } else {
      updateScore(questionScore, 1);
    }
  }

  render() {
    const {
      state: {
        questions,
        renderIndex,
        isAnswered,
      },
      handleAnswer,
      nextQuestion,
    } = this;
    return (
      <main className="game-main-container">
        <Header />
        {
          questions.map((question, index) => (
            <section key={ question.question }>
              {
                renderIndex === index && (
                  <Question
                    handleClick={ handleAnswer }
                    question={ question }
                    isAnswered={ isAnswered }
                    nextQuestion={ nextQuestion }
                  />
                )
              }
            </section>
          ))
        }
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: {
    name: state.player.name,
    score: state.player.score,
    picture: state.player.gravatarEmail,
  },
  url: state.player.urlGame,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score, assertion) => dispatch(actUpdateScore(score, assertion)),
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  updateScore: PropTypes.func.isRequired,
  ranking: PropTypes.shape({
    picture: PropTypes.string,
  }).isRequired,
  url: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
