import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { actGetPlayer } from '../redux/actions';
import initGame from '../service/localStoragePlayer';
import logo from '../trivia.png';
import '../Components/styleSheet/Login.css';

class Login extends Component {
  state = {
    nome: '',
    email: '',
    isButtonDisabled: true,
  }

  // Funciona tchê
  verifyInputs = () => {
    const { nome, email } = this.state;
    if (nome.length < 1 || email.length < 1) {
      this.setState({ isButtonDisabled: true });
    } else {
      this.setState({ isButtonDisabled: false });
    }
  };

  handleChange = (event) => {
    const { target: { value, name } } = event;
    this.setState({ [name]: value }, this.verifyInputs);
  };

  fetchToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return data.token;
  }

  handleClick = async () => {
    const { history, getPlayer } = this.props;
    const { nome, email } = this.state;
    const token = await this.fetchToken();
    initGame(token);
    getPlayer(nome, email);
    history.push('/game');
  }

  render() {
    const {
      handleChange,
      handleClick,
      state: {
        nome,
        email,
        isButtonDisabled,
      },
    } = this;
    return (
      <form className="form-login">
        <header className="login-header">
          <img src={ logo } className="login-logo" alt="logo" />
        </header>
        <label htmlFor="nome-input">
          <input
            type="text"
            id="nome-input"
            data-testid="input-player-name"
            name="nome"
            value={ nome }
            onChange={ handleChange }
            placeholder="Name"
          />
        </label>
        <label htmlFor="email-input">
          <input
            type="text"
            id="email-input"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ handleChange }
            placeholder="Email"
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ handleClick }
          disabled={ isButtonDisabled }
          className="button-play"
        >
          Play
        </button>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings" className="button-settings">
            Configurações
          </button>
        </Link>
      </form>);
  }
}

Login.propTypes = {
  getPlayer: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Login.defaultProps = {
  history: {
    push: PropTypes.func,
  },
};

const mapDispatchToProps = (dispatch) => ({
  getPlayer: (nome, email) => dispatch(actGetPlayer(nome, email)),
});

export default connect(null, mapDispatchToProps)(Login);
