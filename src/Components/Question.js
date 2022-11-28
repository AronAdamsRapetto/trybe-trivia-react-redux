import React from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import './styleSheet/Question.css';

class Question extends React.Component {
  state = {
    answersList: [],
    correctAnswerIndex: 0,
    time: 30,
    isTimeOut: false,
    intervalId: 0,
  }

  componentDidMount() {
    const {
      question: {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      },
    } = this.props;
    const shuffle = 0.5;

    const answersList = [...incorrectAnswers]
      .sort(() => shuffle - Math.random());

    const randomIndex = Math.round(Math.random() * incorrectAnswers.length);
    answersList.splice(randomIndex, 0, correctAnswer);

    this.setState({
      answersList,
      correctAnswerIndex: randomIndex,
    });
  }

  // Função para atualizar o Timer
  updateTimer = () => {
    const ONE_SECOND = 1000;
    const intervalId = setInterval(
      () => this.setState((prevState) => ({ time: prevState.time - 1 }), () => {
        const { time } = this.state;
        if (time === 0) this.setState({ isTimeOut: true });
      }),
      ONE_SECOND,
    );
    this.setState({ intervalId });
  }

  calculateScore = (isCorrect) => {
    const {
      props: {
        handleClick,
        question: { difficulty },
      },
      state: { time },
    } = this;
    const BASE_SCORE = 10;
    const difficultyScore = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const TOTAL_SCORE = isCorrect === true
      ? BASE_SCORE + (time * difficultyScore[difficulty])
      : 0;
    handleClick(TOTAL_SCORE);
  }

  render() {
    const {
      props: {
        question: {
          category,
          difficulty,
          question,
        },
        isAnswered,
        nextQuestion,
      },
      state: {
        answersList,
        correctAnswerIndex,
        time,
        intervalId,
        isTimeOut,
      },
      calculateScore,
    } = this;
    return (
      <section className="question-container">
        <div className="question-header-container">
          <div className="question-info-container">
            <h4 data-testid="question-category">{ category }</h4>
            <h4>{ `( ${difficulty} )` }</h4>
          </div>
          <Timer
            time={ time }
            intervalId={ intervalId }
            isAnswered={ isAnswered }
            updateTimer={ this.updateTimer }
          />
        </div>
        <h2
          data-testid="question-text"
          dangerouslySetInnerHTML={ { __html: question } }
        />
        <div className="answers-container" data-testid="answer-options">
          {
            answersList.map((answer, index) => {
              if (index === correctAnswerIndex) {
                return (
                  <button
                    data-testid="correct-answer"
                    type="button"
                    key={ answer }
                    onClick={ () => calculateScore(true) }
                    className={ isAnswered ? 'correct' : 'no-border' }
                    disabled={ isTimeOut }
                    dangerouslySetInnerHTML={ { __html: answer } }
                  >
                    {/* { answer } */}
                  </button>
                );
              }
              return (
                <button
                  data-testid={ `wrong-answer-${index}` }
                  type="button"
                  key={ answer }
                  onClick={ () => calculateScore(false) }
                  className={ isAnswered ? 'wrong' : 'no-border' }
                  disabled={ isTimeOut }
                  dangerouslySetInnerHTML={ { __html: answer } }
                >
                  {/* { answer } */}
                </button>
              );
            })
          }
        </div>
        <div>
          {
            (isAnswered || isTimeOut) && (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ nextQuestion }
                className="next-button"
              >
                Next
              </button>
            )
          }
        </div>
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

export default Question;
