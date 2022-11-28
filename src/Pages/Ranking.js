import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { readStorageRanking } from '../service/localStorageRanking';
import './styleSheet/Ranking.css';

class Ranking extends React.Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const data = readStorageRanking();
    const sorted = data.sort((a, b) => (b.score - a.score));
    this.setState({ ranking: sorted });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <div className="ranking-box">
          { ranking.map((score, index) => (
            <div
              className="ranked-user"
              key={ index }
            >
              <img
                className="ranked-user-image"
                src={ score.picture }
                alt={ `imagem ${score.name}` }
              />
              <h3 data-testid={ `player-name-${index}` }>{ score.name }</h3>
              <h3
                className="ranked-user-score"
                data-testid={ `player-score-${index}` }
              >
                { score.score }
              </h3>
            </div>
          ))}
        </div>
        <Link to="/trybe-trivia-react-redux">
          <button
            className="button-home"
            type="button"
            data-testid="btn-go-home"
          >
            Voltar para o início
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
