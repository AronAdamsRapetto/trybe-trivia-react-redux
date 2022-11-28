import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import './styleSheet/Header.css';
import logo from '../img/trivia.png';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <header>
        <img src={ logo } className="header-logo" alt="logo" />
        <div className="player-contaniner">
          <div className="player-info-container">
            {/* Funciona tchê */}
            <p data-testid="header-player-name">
              { name }
            </p>
            <span>Pontuação:</span>
            <span data-testid="header-score">
              { score }
            </span>
          </div>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
            alt="imagem usuario"
            className="player-image"
          />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
